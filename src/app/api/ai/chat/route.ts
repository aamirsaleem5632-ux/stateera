import { NextResponse } from "next/server";
import { MOCK_PROPERTIES } from "@/data/mockProperties";

// Per-IP rate limiter: max 20 requests per 60 seconds
const aiRateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkAiRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = aiRateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    aiRateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 20;
}

function buildCatalogContext(): string {
  return MOCK_PROPERTIES.map(
    (p) =>
      `- [${p.id}] ${p.title} (${p.city}, ${p.country}) | Category: ${p.category} | Share Price: $${p.sharePrice} | Net Yield: ${p.netYield}% | Gross Yield: ${p.grossYield}% | Occupancy: ${p.occupancyRate}% | Available Shares: ${p.availableShares}/${p.totalShares}`
  ).join("\n");
}

function findReferencedProperty(reply: string, query: string) {
  const combined = `${query} ${reply}`.toLowerCase();
  return MOCK_PROPERTIES.find((p) => combined.includes(p.title.toLowerCase()));
}

function sanitizeAndGroundReply(reply: string): string {
  // Prevent prohibited investment guarantees
  const guaranteePattern = /\b(guaranteed\s+returns?|risk-free|100%\s+safe|guaranteed\s+profit)\b/gi;
  let cleaned = reply.replace(guaranteePattern, "target (non-guaranteed) returns");
  if (cleaned.length > 1200) {
    cleaned = `${cleaned.slice(0, 1197)}...`;
  }
  return cleaned;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (checkAiRateLimit(ip)) {
    return NextResponse.json(
      {
        mode: "fallback",
        reason: "RATE_LIMITED",
        error: "Too many AI requests. Please wait a minute and try again.",
      },
      { status: 429 }
    );
  }

  let body: { message?: unknown; pathname?: unknown; walletBalance?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 600) {
    return NextResponse.json(
      { error: "Message must be a non-empty string up to 600 characters." },
      { status: 400 }
    );
  }

  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();

  if (!geminiKey && !openaiKey) {
    return NextResponse.json({
      mode: "fallback",
      reason: "AI_CREDENTIALS_UNCONFIGURED",
    });
  }

  const pathname = typeof body.pathname === "string" ? body.pathname.slice(0, 100) : "/";
  const walletBalance =
    typeof body.walletBalance === "number" && Number.isFinite(body.walletBalance)
      ? body.walletBalance
      : null;

  const systemPrompt = [
    "You are StateEra AI, a factual educational assistant for the StateEra fractional real estate platform.",
    "STRICT GROUNDING RULES:",
    "1. Only quote property names, cities, share prices, net/gross yields, occupancy rates, and share availability from the AUTHORITATIVE CATALOG below.",
    "2. Never invent properties, prices, yields, or availability.",
    "3. Never guarantee investment returns or claim real estate is risk-free.",
    "4. Keep answers concise (3-6 sentences or bullet points) and easy to understand.",
    `Current page: ${pathname}${walletBalance !== null ? ` | Practice wallet balance: $${walletBalance}` : ""}`,
    "AUTHORITATIVE CATALOG:",
    buildCatalogContext(),
  ].join("\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    let rawReply = "";
    let provider = "";

    if (geminiKey) {
      provider = "gemini";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(
          geminiKey
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: message }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 350 },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Gemini API HTTP ${res.status}`);
      }
      const data = await res.json();
      rawReply =
        data?.candidates?.[0]?.content?.parts
          ?.map((part: { text?: string }) => part.text || "")
          .join("")
          .trim() || "";
    } else if (openaiKey) {
      provider = "openai";
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.2,
          max_tokens: 350,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`OpenAI API HTTP ${res.status}`);
      }
      const data = await res.json();
      rawReply = data?.choices?.[0]?.message?.content?.trim() || "";
    }

    if (!rawReply) {
      return NextResponse.json({
        mode: "fallback",
        reason: "EMPTY_MODEL_RESPONSE",
      });
    }

    const reply = sanitizeAndGroundReply(rawReply);
    const matchedProp = findReferencedProperty(reply, message);

    return NextResponse.json({
      mode: "ai",
      provider,
      reply,
      action: matchedProp
        ? { label: `Inspect ${matchedProp.title}`, path: `/property/${matchedProp.id}` }
        : undefined,
    });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "AbortError";
    return NextResponse.json({
      mode: "fallback",
      reason: isTimeout ? "AI_TIMEOUT" : "AI_PROVIDER_ERROR",
    });
  } finally {
    clearTimeout(timeout);
  }
}

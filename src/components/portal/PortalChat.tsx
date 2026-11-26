"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Send, MessageSquare, Radio } from "lucide-react";

export interface PortalChatMessage {
  id: string;
  senderRole: "tenant" | "manager";
  senderName: string;
  text: string;
  timestamp: string;
}

const CHAT_STORAGE_KEY = "stateera-portal-chat-v1";
const CHAT_CHANNEL_NAME = "stateera-portal-chat";

const INITIAL_MESSAGES: PortalChatMessage[] = [
  {
    id: "chat-seed-1",
    senderRole: "manager",
    senderName: "Building Operations",
    text: "Welcome to the resident & operations channel. Reach out anytime for lease or maintenance updates.",
    timestamp: "09:00",
  },
];

const chatListeners = new Set<() => void>();
let cachedChatRaw: string | null = null;
let cachedChatParsed: PortalChatMessage[] = INITIAL_MESSAGES;

function getChatSnapshot(): PortalChatMessage[] {
  if (typeof window === "undefined") return INITIAL_MESSAGES;
  const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
  if (raw === cachedChatRaw) return cachedChatParsed;
  cachedChatRaw = raw;
  if (!raw) {
    cachedChatParsed = INITIAL_MESSAGES;
    return cachedChatParsed;
  }
  try {
    const parsed = JSON.parse(raw);
    cachedChatParsed = Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MESSAGES;
  } catch {
    cachedChatParsed = INITIAL_MESSAGES;
  }
  return cachedChatParsed;
}

function getChatServerSnapshot(): PortalChatMessage[] {
  return INITIAL_MESSAGES;
}

function subscribeChat(cb: () => void): () => void {
  chatListeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CHAT_STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  let channel: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel(CHAT_CHANNEL_NAME);
    channel.onmessage = () => cb();
  }
  return () => {
    chatListeners.delete(cb);
    window.removeEventListener("storage", onStorage);
    channel?.close();
  };
}

function appendChatMessage(msg: PortalChatMessage) {
  if (typeof window === "undefined") return;
  const current = getChatSnapshot();
  const next = [...current, msg].slice(-50);
  const serialized = JSON.stringify(next);
  window.localStorage.setItem(CHAT_STORAGE_KEY, serialized);
  cachedChatRaw = serialized;
  cachedChatParsed = next;
  if (typeof BroadcastChannel !== "undefined") {
    const ch = new BroadcastChannel(CHAT_CHANNEL_NAME);
    ch.postMessage({ type: "chat_updated" });
    ch.close();
  }
  chatListeners.forEach((cb) => cb());
}

interface PortalChatProps {
  currentRole: "tenant" | "manager";
  senderName: string;
}

export const PortalChat: React.FC<PortalChatProps> = ({ currentRole, senderName }) => {
  const messages = useSyncExternalStore(subscribeChat, getChatSnapshot, getChatServerSnapshot);
  const [draft, setDraft] = useState("");
  const endRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    appendChatMessage({
      id: `chat-${Date.now()}`,
      senderRole: currentRole,
      senderName,
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    setDraft("");
  };

  return (
    <div className="glass rounded-3xl p-5 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EADCDD] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#3B0F18] text-white flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1A080C]">
              Tenant ↔ Property Manager Live Channel
            </h3>
            <p className="text-[11px] text-[#5E4A4E]">
              Cross-tab real-time sync via BroadcastChannel &amp; local persistence
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>Live Sync</span>
        </span>
      </div>

      <div className="h-60 overflow-y-auto space-y-2.5 pr-1">
        {messages.map((m) => {
          const isMine = m.senderRole === currentRole;
          return (
            <div key={m.id} className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs border ${
                  isMine
                    ? "bg-[#3B0F18] text-white border-transparent"
                    : "bg-[#FAF5F5] text-[#1A080C] border-[#EADCDD]"
                }`}
              >
                <div className={`text-[10px] font-bold mb-0.5 ${isMine ? "text-white/80" : "text-[#3B0F18]"}`}>
                  {m.senderName} • {m.senderRole === "manager" ? "Manager" : "Tenant"}
                </div>
                <p className="leading-relaxed">{m.text}</p>
              </div>
              <span className="text-[10px] text-[#8C7B7F] mt-0.5 px-1">{m.timestamp}</span>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-[#EADCDD]">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Message ${currentRole === "tenant" ? "Property Manager" : "Tenant"}...`}
          className="input flex-1 text-xs py-2.5"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="btn btn-primary text-xs px-4 py-2.5 inline-flex items-center gap-1.5 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

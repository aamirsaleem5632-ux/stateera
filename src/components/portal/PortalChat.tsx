"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Send, MessageSquare, Radio, AlertCircle, CheckCheck, RefreshCw } from "lucide-react";
import {
  chatService,
  DbPortalConversation,
  DbPortalMessage,
} from "@/lib/services/chatService";

export interface PortalChatMessage {
  id: string;
  senderRole: "tenant" | "manager" | "admin";
  senderName: string;
  text: string;
  timestamp: string;
  readAt?: string | null;
}

const CHAT_STORAGE_KEY = "stateera-portal-chat-v1";
const CHAT_CHANNEL_NAME = "stateera-portal-chat";

const INITIAL_DEMO_MESSAGES: PortalChatMessage[] = [
  {
    id: "chat-seed-1",
    senderRole: "manager",
    senderName: "Building Operations",
    text: "Welcome to the resident & operations demo channel. Reach out anytime for lease or maintenance updates.",
    timestamp: "09:00",
  },
];

const chatListeners = new Set<() => void>();
let cachedChatRaw: string | null = null;
let cachedChatParsed: PortalChatMessage[] = INITIAL_DEMO_MESSAGES;

function getChatSnapshot(): PortalChatMessage[] {
  if (typeof window === "undefined") return INITIAL_DEMO_MESSAGES;
  const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
  if (raw === cachedChatRaw) return cachedChatParsed;
  cachedChatRaw = raw;
  if (!raw) {
    cachedChatParsed = INITIAL_DEMO_MESSAGES;
    return cachedChatParsed;
  }
  try {
    const parsed = JSON.parse(raw);
    cachedChatParsed =
      Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_MESSAGES;
  } catch {
    cachedChatParsed = INITIAL_DEMO_MESSAGES;
  }
  return cachedChatParsed;
}

function getChatServerSnapshot(): PortalChatMessage[] {
  return INITIAL_DEMO_MESSAGES;
}

function subscribeDemoChat(cb: () => void): () => void {
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

function appendDemoChatMessage(msg: PortalChatMessage) {
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
  isDemo?: boolean;
  propertyId?: string;
  unitNumber?: string;
}

export const PortalChat: React.FC<PortalChatProps> = ({
  currentRole,
  senderName,
  isDemo = true,
  propertyId,
  unitNumber,
}) => {
  const demoMessages = useSyncExternalStore(
    subscribeDemoChat,
    getChatSnapshot,
    getChatServerSnapshot
  );

  // Live Supabase persistent state (when isDemo === false)
  const [conversations, setConversations] = useState<DbPortalConversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [liveMessages, setLiveMessages] = useState<DbPortalMessage[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loadingLive, setLoadingLive] = useState(false);
  const [sending, setSending] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [realtimeStatus, setRealtimeStatus] = useState<string>("CONNECTING");

  const [draft, setDraft] = useState("");
  const endRef = React.useRef<HTMLDivElement>(null);

  // Load live conversations when authenticated (!isDemo)
  useEffect(() => {
    if (isDemo) return;
    let active = true;

    async function initLiveChat() {
      setLoadingLive(true);
      setLiveError(null);
      try {
        const uid = await chatService.getCurrentUserId();
        if (!active) return;
        setCurrentUserId(uid);

        if (!uid) {
          setLiveError("Please sign in to access persistent cross-device messaging.");
          setLoadingLive(false);
          return;
        }

        let convList = await chatService.getConversations();
        if (!active) return;

        if (convList.length === 0 && currentRole === "tenant" && propertyId) {
          const ensured = await chatService.ensureTenantConversation(
            propertyId,
            unitNumber || "Unit"
          );
          if (ensured && active) {
            convList = [ensured];
          }
        }

        if (!active) return;
        setConversations(convList);
        if (convList.length > 0) {
          setSelectedConvId((prev) => prev || convList[0].id);
        }
      } catch (err) {
        if (!active) return;
        setLiveError(
          err instanceof Error
            ? err.message
            : "Unable to connect to persistent portal chat."
        );
      } finally {
        if (active) setLoadingLive(false);
      }
    }

    initLiveChat();
    return () => {
      active = false;
    };
  }, [isDemo, currentRole, propertyId, unitNumber]);

  // Load messages + subscribe to Supabase Realtime for selected conversation
  useEffect(() => {
    if (isDemo || !selectedConvId) return;
    let active = true;

    async function loadThread(convId: string) {
      setLiveError(null);
      try {
        const history = await chatService.getMessages(convId);
        if (!active) return;
        setLiveMessages(history);
        await chatService.markConversationRead(convId);
        if (active) {
          setConversations((prev) =>
            prev.map((c) => (c.id === convId ? { ...c, unreadCount: 0 } : c))
          );
        }
      } catch (err) {
        if (!active) return;
        setLiveError(
          err instanceof Error ? err.message : "Failed to load conversation messages."
        );
      }
    }

    loadThread(selectedConvId);

    const unsubscribe = chatService.subscribeToConversation(
      selectedConvId,
      (newMsg) => {
        setLiveMessages((prev) => {
          if (prev.some((m) => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        if (currentUserId && newMsg.senderId !== currentUserId) {
          chatService.markConversationRead(selectedConvId).catch(() => {});
        }
      },
      (updatedMsg) => {
        setLiveMessages((prev) =>
          prev.map((m) => (m.id === updatedMsg.id ? updatedMsg : m))
        );
      },
      (status) => {
        if (active) setRealtimeStatus(status);
      }
    );

    return () => {
      active = false;
      unsubscribe();
    };
  }, [isDemo, selectedConvId, currentUserId]);

  const displayedMessages: PortalChatMessage[] = isDemo
    ? demoMessages
    : liveMessages.map((m) => ({
        id: m.id,
        senderRole: m.senderRole,
        senderName: m.senderName,
        text: m.content,
        timestamp: new Date(m.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        readAt: m.readAt,
      }));

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessages.length]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || sending) return;

    if (isDemo) {
      appendDemoChatMessage({
        id: `chat-${Date.now()}`,
        senderRole: currentRole,
        senderName,
        text: trimmed,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setDraft("");
      return;
    }

    if (!selectedConvId) {
      setLiveError("No active conversation thread selected.");
      return;
    }

    setSending(true);
    setLiveError(null);
    try {
      const sent = await chatService.sendMessage(
        selectedConvId,
        currentRole,
        senderName,
        trimmed
      );
      setLiveMessages((prev) =>
        prev.some((m) => m.id === sent.id) ? prev : [...prev, sent]
      );
      setDraft("");
    } catch (err) {
      setLiveError(
        err instanceof Error ? err.message : "Message could not be delivered."
      );
    } finally {
      setSending(false);
    }
  };

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <div className="glass rounded-3xl p-5 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EADCDD] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#3B0F18] text-white flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1A080C]">
              Tenant ↔ Property Manager Channel
            </h3>
            <p className="text-[11px] text-[#5E4A4E]">
              {isDemo
                ? "Demo Sandbox (same-browser BroadcastChannel sync)"
                : "Cross-device persistent messaging via Supabase Realtime"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isDemo && totalUnread > 0 && (
            <span className="text-[11px] font-bold bg-[#3B0F18] text-white px-2.5 py-1 rounded-full">
              {totalUnread} Unread
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              isDemo
                ? "text-[#3B0F18] bg-[#FAF5F5] border-[#EADCDD]"
                : realtimeStatus === "SUBSCRIBED"
                ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                : "text-amber-700 bg-amber-50 border-amber-200"
            }`}
          >
            <Radio
              className={`w-3 h-3 ${
                isDemo || realtimeStatus === "SUBSCRIBED" ? "animate-pulse" : ""
              }`}
            />
            <span>
              {isDemo
                ? "Sandbox Sync"
                : realtimeStatus === "SUBSCRIBED"
                ? "Realtime Live"
                : realtimeStatus === "CHANNEL_ERROR" || realtimeStatus === "CLOSED"
                ? "Disconnected"
                : "Connecting"}
            </span>
          </span>
        </div>
      </div>

      {/* Conversation selector for live authenticated users */}
      {!isDemo && conversations.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => setSelectedConvId(conv.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border whitespace-nowrap transition-colors ${
                selectedConvId === conv.id
                  ? "bg-[#3B0F18] text-white border-[#3B0F18]"
                  : "bg-[#FAF5F5] text-[#1A080C] border-[#EADCDD] hover:border-[#3B0F18]"
              }`}
            >
              {conv.propertyTitle} ({conv.unitNumber})
              {conv.unreadCount > 0 ? ` • ${conv.unreadCount}` : ""}
            </button>
          ))}
        </div>
      )}

      {!isDemo && liveError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{liveError}</span>
        </div>
      )}

      <div className="h-60 overflow-y-auto space-y-2.5 pr-1">
        {!isDemo && loadingLive ? (
          <div className="h-full flex items-center justify-center text-xs text-[#5E4A4E] gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#3B0F18]" />
            <span>Loading persistent conversation history...</span>
          </div>
        ) : displayedMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-[#5E4A4E] text-center px-4">
            {isDemo
              ? "Send a message to test same-browser tab sync."
              : "No messages yet in this thread. Send a message to your building counterparty."}
          </div>
        ) : (
          displayedMessages.map((m) => {
            const isMine = m.senderRole === currentRole;
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs border ${
                    isMine
                      ? "bg-[#3B0F18] text-white border-transparent"
                      : "bg-[#FAF5F5] text-[#1A080C] border-[#EADCDD]"
                  }`}
                >
                  <div
                    className={`text-[10px] font-bold mb-0.5 ${
                      isMine ? "text-white/80" : "text-[#3B0F18]"
                    }`}
                  >
                    {m.senderName} •{" "}
                    {m.senderRole === "manager"
                      ? "Manager"
                      : m.senderRole === "admin"
                      ? "Admin"
                      : "Tenant"}
                  </div>
                  <p className="leading-relaxed break-words">{m.text}</p>
                </div>
                <span className="text-[10px] text-[#8C7B7F] mt-0.5 px-1 inline-flex items-center gap-1">
                  <span>{m.timestamp}</span>
                  {!isDemo && isMine && (
                    <CheckCheck
                      className={`w-3 h-3 ${
                        m.readAt ? "text-emerald-600" : "text-[#8C7B7F]"
                      }`}
                    />
                  )}
                </span>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 pt-2 border-t border-[#EADCDD]"
      >
        <input
          type="text"
          value={draft}
          maxLength={2000}
          disabled={!isDemo && (!selectedConvId || sending)}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Message ${
            currentRole === "tenant" ? "Property Manager" : "Tenant"
          }...`}
          className="input flex-1 text-xs py-2.5 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!draft.trim() || sending || (!isDemo && !selectedConvId)}
          className="btn btn-primary text-xs px-4 py-2.5 inline-flex items-center gap-1.5 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{sending ? "Sending..." : "Send"}</span>
        </button>
      </form>
    </div>
  );
};

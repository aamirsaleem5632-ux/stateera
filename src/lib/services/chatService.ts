import { createClient } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

export interface DbPortalConversation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantId: string;
  managerId: string | null;
  unitNumber: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface DbPortalMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: "tenant" | "manager" | "admin";
  senderName: string;
  content: string;
  readAt: string | null;
  createdAt: string;
}

export const chatService = {
  async getCurrentUserId(): Promise<string | null> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id || null;
  },

  async getConversations(): Promise<DbPortalConversation[]> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: convs, error } = await supabase
      .from("portal_conversations")
      .select("*, properties(title)")
      .order("last_message_at", { ascending: false });

    if (error || !convs) {
      throw new Error(error?.message || "Unable to load conversations.");
    }

    const convIds = convs.map((c: any) => c.id);
    const unreadMap = new Map<string, number>();

    if (convIds.length > 0) {
      const { data: unreadRows } = await supabase
        .from("portal_messages")
        .select("conversation_id")
        .in("conversation_id", convIds)
        .neq("sender_id", user.id)
        .is("read_at", null);

      if (unreadRows) {
        for (const row of unreadRows as { conversation_id: string }[]) {
          unreadMap.set(row.conversation_id, (unreadMap.get(row.conversation_id) || 0) + 1);
        }
      }
    }

    return convs.map((c: any) => ({
      id: c.id,
      propertyId: c.property_id,
      propertyTitle: c.properties?.title || "Property Thread",
      tenantId: c.tenant_id,
      managerId: c.manager_id,
      unitNumber: c.unit_number || "Unit",
      lastMessageAt: c.last_message_at,
      unreadCount: unreadMap.get(c.id) || 0,
    }));
  },

  async ensureTenantConversation(
    propertyId: string,
    unitNumber: string
  ): Promise<DbPortalConversation | null> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: existing } = await supabase
      .from("portal_conversations")
      .select("*, properties(title)")
      .eq("property_id", propertyId)
      .eq("tenant_id", user.id)
      .maybeSingle();

    if (existing) {
      return {
        id: existing.id,
        propertyId: existing.property_id,
        propertyTitle: existing.properties?.title || "Property Thread",
        tenantId: existing.tenant_id,
        managerId: existing.manager_id,
        unitNumber: existing.unit_number || unitNumber,
        lastMessageAt: existing.last_message_at,
        unreadCount: 0,
      };
    }

    const { data: created, error } = await supabase
      .from("portal_conversations")
      .insert({
        property_id: propertyId,
        tenant_id: user.id,
        unit_number: unitNumber || "Unit",
      })
      .select("*, properties(title)")
      .single();

    if (error || !created) {
      throw new Error(error?.message || "Unable to create conversation.");
    }

    return {
      id: created.id,
      propertyId: created.property_id,
      propertyTitle: created.properties?.title || "Property Thread",
      tenantId: created.tenant_id,
      managerId: created.manager_id,
      unitNumber: created.unit_number || unitNumber,
      lastMessageAt: created.last_message_at,
      unreadCount: 0,
    };
  },

  async getMessages(conversationId: string): Promise<DbPortalMessage[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("portal_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .limit(100);

    if (error) {
      throw new Error(error.message || "Unable to load message history.");
    }

    return (data || []).map((m: any) => ({
      id: m.id,
      conversationId: m.conversation_id,
      senderId: m.sender_id,
      senderRole: m.sender_role,
      senderName: m.sender_name,
      content: m.content,
      readAt: m.read_at,
      createdAt: m.created_at,
    }));
  },

  async sendMessage(
    conversationId: string,
    senderRole: "tenant" | "manager" | "admin",
    senderName: string,
    content: string
  ): Promise<DbPortalMessage> {
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > 2000) {
      throw new Error("Message must be between 1 and 2000 characters.");
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("You must be signed in to send messages.");
    }

    const { data, error } = await supabase
      .from("portal_messages")
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        sender_role: senderRole,
        sender_name: senderName.slice(0, 80) || "Participant",
        content: trimmed,
      })
      .select("*")
      .single();

    if (error || !data) {
      throw new Error(error?.message || "Failed to send message.");
    }

    return {
      id: data.id,
      conversationId: data.conversation_id,
      senderId: data.sender_id,
      senderRole: data.sender_role,
      senderName: data.sender_name,
      content: data.content,
      readAt: data.read_at,
      createdAt: data.created_at,
    };
  },

  async markConversationRead(conversationId: string): Promise<void> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("portal_messages")
      .update({ read_at: new Date().toISOString() })
      .eq("conversation_id", conversationId)
      .neq("sender_id", user.id)
      .is("read_at", null);
  },

  subscribeToConversation(
    conversationId: string,
    onInsert: (msg: DbPortalMessage) => void,
    onUpdate: (msg: DbPortalMessage) => void,
    onStatus?: (status: string) => void
  ): () => void {
    const supabase = createClient();
    const channel: RealtimeChannel = supabase
      .channel(`portal-conv-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "portal_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const m: any = payload.new;
          if (!m) return;
          onInsert({
            id: m.id,
            conversationId: m.conversation_id,
            senderId: m.sender_id,
            senderRole: m.sender_role,
            senderName: m.sender_name,
            content: m.content,
            readAt: m.read_at,
            createdAt: m.created_at,
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "portal_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const m: any = payload.new;
          if (!m) return;
          onUpdate({
            id: m.id,
            conversationId: m.conversation_id,
            senderId: m.sender_id,
            senderRole: m.sender_role,
            senderName: m.sender_name,
            content: m.content,
            readAt: m.read_at,
            createdAt: m.created_at,
          });
        }
      )
      .subscribe((status) => {
        onStatus?.(status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  },
};

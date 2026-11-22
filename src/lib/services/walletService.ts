import { createClient } from "@/lib/supabase/client";

export interface WalletState {
  balance: number;
  currency: string;
}

export interface HoldingRecord {
  id: string;
  propertyId: string;
  sharesOwned: number;
  averagePurchasePrice: number;
  updatedAt: string;
}

export interface TransactionRecord {
  id: string;
  propertyId: string | null;
  type: "DEPOSIT" | "WITHDRAWAL" | "BUY" | "SELL" | "DIVIDEND";
  amount: number;
  shares?: number;
  fee: number;
  status: "Pending" | "Completed" | "Failed" | "Cancelled";
  referenceCode: string;
  createdAt: string;
}

/**
 * Service for authenticated Investor financial operations backed by Supabase PostgreSQL.
 * All mutations call atomic stored procedures (PL/pgSQL) using row locks.
 */
export const walletService = {
  async getWalletBalance(): Promise<number> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return 0;

    const { data, error } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", user.id)
      .single();

    if (error || !data) return 0;
    return Number(data.balance) || 0;
  },

  async getHoldings(): Promise<HoldingRecord[]> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("holdings")
      .select("id, property_id, shares_owned, average_purchase_price, updated_at")
      .eq("user_id", user.id)
      .gt("shares_owned", 0);

    if (error || !data) return [];
    return data.map((d: any) => ({
      id: d.id,
      propertyId: d.property_id,
      sharesOwned: Number(d.shares_owned) || 0,
      averagePurchasePrice: Number(d.average_purchase_price) || 0,
      updatedAt: d.updated_at,
    }));
  },

  async getTransactions(): Promise<TransactionRecord[]> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("transactions")
      .select("id, property_id, type, amount, shares, fee, status, reference_code, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map((d: any) => ({
      id: d.id,
      propertyId: d.property_id,
      type: d.type,
      amount: Number(d.amount) || 0,
      shares: d.shares ? Number(d.shares) : undefined,
      fee: Number(d.fee) || 0,
      status: d.status,
      referenceCode: d.reference_code,
      createdAt: d.created_at,
    }));
  },

  async buyShares(
    propertyId: string,
    shares: number,
    orderType: string = "Market",
    limitPrice?: number
  ): Promise<{ success: boolean; message: string; newBalance?: number }> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase.rpc("execute_buy_shares", {
        p_property_id: propertyId,
        p_shares: Math.floor(shares),
        p_order_type: orderType,
        p_limit_price: limitPrice && limitPrice > 0 ? limitPrice : null,
      });

      if (error) {
        return { success: false, message: error.message || "Failed to execute share purchase." };
      }

      const res = data as any;
      return {
        success: res.success ?? true,
        message: res.message || "Purchase executed successfully.",
        newBalance: res.new_balance,
      };
    } catch (err: any) {
      return { success: false, message: err.message || "An unexpected error occurred." };
    }
  },

  async sellShares(
    propertyId: string,
    shares: number
  ): Promise<{ success: boolean; message: string; newBalance?: number }> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase.rpc("execute_sell_shares", {
        p_property_id: propertyId,
        p_shares: Math.floor(shares),
      });

      if (error) {
        return { success: false, message: error.message || "Failed to execute share sale." };
      }

      const res = data as any;
      return {
        success: res.success ?? true,
        message: res.message || "Shares sold successfully.",
        newBalance: res.new_balance,
      };
    } catch (err: any) {
      return { success: false, message: err.message || "An unexpected error occurred." };
    }
  },

  async depositFunds(
    amount: number
  ): Promise<{ success: boolean; message: string; newBalance?: number }> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase.rpc("execute_deposit_funds", {
        p_amount: amount,
      });

      if (error) {
        return { success: false, message: error.message || "Failed to deposit funds." };
      }

      const res = data as any;
      return {
        success: res.success ?? true,
        message: res.message || "Funds deposited successfully.",
        newBalance: res.new_balance,
      };
    } catch (err: any) {
      return { success: false, message: err.message || "An unexpected error occurred." };
    }
  },

  async withdrawFunds(
    amount: number
  ): Promise<{ success: boolean; message: string; newBalance?: number }> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase.rpc("execute_withdraw_funds", {
        p_amount: amount,
      });

      if (error) {
        return { success: false, message: error.message || "Failed to withdraw funds." };
      }

      const res = data as any;
      return {
        success: res.success ?? true,
        message: res.message || "Funds withdrawn successfully.",
        newBalance: res.new_balance,
      };
    } catch (err: any) {
      return { success: false, message: err.message || "An unexpected error occurred." };
    }
  },
};

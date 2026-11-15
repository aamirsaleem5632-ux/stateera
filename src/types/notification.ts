export type NotificationCategory = "PAYOUT" | "TRANSACTION" | "MAINTENANCE" | "LEASE" | "DUE_DILIGENCE" | "ADMIN";

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  severity: "info" | "success" | "warning" | "alert";
}

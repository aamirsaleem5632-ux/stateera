"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Property } from "@/types/property";
import { ShareHolding, Transaction, RentalPayoutRecord, InvestorStatement } from "@/types/investor";
import { LeaseAgreement, TenantRentPayment, MaintenanceRequest } from "@/types/tenant";
import { AccountingLedgerEntry } from "@/types/accounting";
import { UserRole } from "@/types/admin";
import { NotificationItem } from "@/types/notification";
import { ExpertAppointment, CommunityProposal } from "@/types/community";
import { MOCK_PROPERTIES } from "@/data/mockProperties";
import { createClient } from "@/lib/supabase/client";
import { getStorageItem, setStorageItem, removeStorageItem } from "@/lib/storageStore";

interface DemoContextType {
  // Role
  role: UserRole;
  setRole: (role: UserRole) => void;

  // Properties
  properties: Property[];
  watchlist: string[];
  toggleWatchlist: (propertyId: string) => void;
  isWatchlisted: (propertyId: string) => boolean;

  // Wallet & Portfolio
  walletBalance: number;
  holdings: ShareHolding[];
  transactions: Transaction[];
  payoutHistory: RentalPayoutRecord[];
  
  // Computed Portfolio Totals
  totalPortfolioValue: number;
  totalInvested: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  monthlyEstimatedIncome: number;
  averageAnnualYield: number;

  // Actions
  buyShares: (
    propertyId: string,
    quantity: number,
    orderType?: "Market" | "Limit",
    limitPrice?: number
  ) => { success: boolean; message: string };
  sellShares: (propertyId: string, quantity: number) => { success: boolean; message: string };
  depositFunds: (amount: number) => { success: boolean; message: string };
  withdrawFunds: (amount: number) => { success: boolean; message: string };
  simulateMonthlyDividendPayout: () => { success: boolean; totalDistributed: number; message: string };
  resetDemoData: () => void;

  // Tenant & Leasing
  leases: LeaseAgreement[];
  rentPayments: TenantRentPayment[];
  maintenanceRequests: MaintenanceRequest[];
  submitMaintenanceRequest: (req: Omit<MaintenanceRequest, "id" | "createdAt" | "status">) => void;
  payTenantRent: (leaseId: string) => { success: boolean; message: string };
  updateMaintenanceStatus: (id: string, status: MaintenanceRequest["status"], actualCost?: number) => void;

  // Accounting & Admin
  accountingLedger: AccountingLedgerEntry[];
  addLedgerEntry: (entry: Omit<AccountingLedgerEntry, "id" | "referenceNo">) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Demo walkthrough state
  isDemoTourActive: boolean;
  demoTourStep: number;
  setDemoTourStep: (step: number) => void;
  startDemoTour: () => void;
  endDemoTour: () => void;

  // Expert Consultations
  appointments: ExpertAppointment[];
  bookAppointment: (apt: Omit<ExpertAppointment, "id" | "status" | "createdAt">) => { success: boolean; message: string; appointment?: ExpertAppointment };
  cancelAppointment: (id: string) => { success: boolean; message: string };

  // Community Governance Proposals
  proposals: CommunityProposal[];
  submitProposal: (
    prop: Omit<CommunityProposal, "id" | "votes" | "hasVoted" | "commentsCount" | "createdAt" | "status" | "author"> & {
      status?: CommunityProposal["status"];
      author?: string;
    }
  ) => { success: boolean; message: string; proposal?: CommunityProposal };
  voteProposal: (id: string) => { success: boolean; message: string; hasVoted?: boolean; votes?: number };
}

const INITIAL_WALLET_BALANCE = 25000;

const INITIAL_HOLDINGS: ShareHolding[] = [
  {
    propertyId: "prop-dubai-marina-tower",
    propertyTitle: "Marina Horizon Luxury Tower",
    sharesOwned: 50,
    averagePurchasePrice: 96.0,
    currentSharePrice: 100.0,
    totalInvested: 4800,
    currentValue: 5000,
    unrealizedGain: 200,
    unrealizedGainPercent: 4.17,
    monthlyEstimatedRentalIncome: 46.65,
    netYield: 9.4,
    lastPayoutAmount: 39.8,
  },
  {
    propertyId: "prop-nyc-manhattan-penthouse",
    propertyTitle: "One Madison Glass Penthouse Suites",
    sharesOwned: 25,
    averagePurchasePrice: 121.0,
    currentSharePrice: 125.0,
    totalInvested: 3025,
    currentValue: 3125,
    unrealizedGain: 100,
    unrealizedGainPercent: 3.31,
    monthlyEstimatedRentalIncome: 25.5,
    netYield: 8.2,
    lastPayoutAmount: 21.42,
  },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-init-01",
    timestamp: "2026-10-15 14:32:10",
    type: "DEPOSIT",
    amount: 25000,
    fee: 0,
    status: "Completed",
    referenceCode: "DEP-98214-DEMO",
  },
  {
    id: "tx-init-02",
    timestamp: "2026-10-18 10:14:02",
    type: "BUY",
    propertyId: "prop-dubai-marina-tower",
    propertyTitle: "Marina Horizon Luxury Tower",
    shares: 50,
    pricePerShare: 96.0,
    amount: 4800,
    fee: 0,
    status: "Completed",
    referenceCode: "BUY-44910-HORIZON",
  },
  {
    id: "tx-init-03",
    timestamp: "2026-10-22 16:45:29",
    type: "BUY",
    propertyId: "prop-nyc-manhattan-penthouse",
    propertyTitle: "One Madison Glass Penthouse Suites",
    shares: 25,
    pricePerShare: 121.0,
    amount: 3025,
    fee: 0,
    status: "Completed",
    referenceCode: "BUY-88201-MADISON",
  },
  {
    id: "tx-init-04",
    timestamp: "2026-11-01 00:05:00",
    type: "RENT_PAYOUT",
    propertyId: "prop-dubai-marina-tower",
    propertyTitle: "Marina Horizon Luxury Tower",
    shares: 50,
    amount: 39.8,
    status: "Completed",
    referenceCode: "DIV-2026-11-DXB",
  },
  {
    id: "tx-init-05",
    timestamp: "2026-11-01 00:05:01",
    type: "RENT_PAYOUT",
    propertyId: "prop-nyc-manhattan-penthouse",
    propertyTitle: "One Madison Glass Penthouse Suites",
    shares: 25,
    amount: 21.42,
    status: "Completed",
    referenceCode: "DIV-2026-11-NYC",
  },
];

const INITIAL_PAYOUTS: RentalPayoutRecord[] = [
  {
    id: "pay-101",
    payoutDate: "2026-11-01",
    propertyId: "prop-dubai-marina-tower",
    propertyTitle: "Marina Horizon Luxury Tower",
    sharesEligible: 50,
    grossRentCollected: 78400,
    operatingExpenses: 5800,
    maintenanceReserve: 2100,
    managementFee: 3650,
    netDistributableRent: 66850,
    payoutPerShare: 0.796,
    totalReceived: 39.8,
    referenceId: "DIST-2026-11-A",
  },
  {
    id: "pay-102",
    payoutDate: "2026-11-01",
    propertyId: "prop-nyc-manhattan-penthouse",
    propertyTitle: "One Madison Glass Penthouse Suites",
    sharesEligible: 25,
    grossRentCollected: 102000,
    operatingExpenses: 8200,
    maintenanceReserve: 3400,
    managementFee: 4700,
    netDistributableRent: 85700,
    payoutPerShare: 0.857,
    totalReceived: 21.42,
    referenceId: "DIST-2026-11-B",
  },
];

const INITIAL_LEASES: LeaseAgreement[] = [
  {
    id: "lease-001",
    propertyId: "prop-dubai-marina-tower",
    propertyTitle: "Marina Horizon Luxury Tower",
    unitNumber: "Suite 1402",
    tenantName: "Alexander Wright (Corporate)",
    monthlyRent: 4800,
    securityDeposit: 9600,
    startDate: "2026-01-01",
    endDate: "2027-12-31",
    status: "Active",
    paymentDueDay: 1,
  },
  {
    id: "lease-002",
    propertyId: "prop-nyc-manhattan-penthouse",
    propertyTitle: "One Madison Glass Penthouse Suites",
    unitNumber: "Penthouse 48B",
    tenantName: "Sophia Lin (Tech Executive)",
    monthlyRent: 8500,
    securityDeposit: 17000,
    startDate: "2025-06-01",
    endDate: "2027-05-31",
    status: "Active",
    paymentDueDay: 1,
  },
];

const INITIAL_RENT_PAYMENTS: TenantRentPayment[] = [
  {
    id: "rent-p-01",
    leaseId: "lease-001",
    propertyTitle: "Marina Horizon Luxury Tower",
    unitNumber: "Suite 1402",
    month: "November 2026",
    amount: 4800,
    paidDate: "2026-11-01",
    status: "Paid",
    receiptId: "REC-2026-11-001",
  },
  {
    id: "rent-p-02",
    leaseId: "lease-002",
    propertyTitle: "One Madison Glass Penthouse Suites",
    unitNumber: "Penthouse 48B",
    month: "November 2026",
    amount: 8500,
    paidDate: "2026-11-01",
    status: "Paid",
    receiptId: "REC-2026-11-002",
  },
];

const INITIAL_MAINTENANCE: MaintenanceRequest[] = [
  {
    id: "maint-01",
    propertyId: "prop-dubai-marina-tower",
    propertyTitle: "Marina Horizon Luxury Tower",
    unitNumber: "Suite 1402",
    title: "Smart Thermostat Calibration & Sensor Replacement",
    category: "HVAC",
    priority: "Medium",
    status: "Completed",
    description: "Living area climate sensor needed firmware update and recalibration for optimal cooling efficiency.",
    createdAt: "2026-10-28",
    estimatedCost: 280,
    actualCost: 250,
    assignedVendor: "CoolBreeze Tech UAE",
    completionDate: "2026-10-30",
  },
  {
    id: "maint-02",
    propertyId: "prop-nyc-manhattan-penthouse",
    propertyTitle: "One Madison Glass Penthouse Suites",
    unitNumber: "Penthouse 48B",
    title: "Balcony Storm Seal Periodic Inspection",
    category: "Structural",
    priority: "Low",
    status: "In Progress",
    description: "Scheduled pre-winter architectural seal inspection on exterior glass sliding partitions.",
    createdAt: "2026-11-05",
    estimatedCost: 450,
    assignedVendor: "Manhattan Glass & Facade Corp",
  },
];

const INITIAL_LEDGER: AccountingLedgerEntry[] = [
  {
    id: "led-01",
    date: "2026-11-01",
    propertyTitle: "Marina Horizon Luxury Tower",
    category: "Rent Revenue",
    description: "Monthly tenant rent collections for 41 occupied units",
    type: "INCOME",
    amount: 78400,
    vendorOrTenant: "Dubai Master Escrow",
    reconciled: true,
    referenceNo: "REV-2026-11-MARINA",
  },
  {
    id: "led-02",
    date: "2026-11-01",
    propertyTitle: "Marina Horizon Luxury Tower",
    category: "Management Fee",
    description: "Emaar asset management fee for operational oversight",
    type: "EXPENSE",
    amount: 3650,
    vendorOrTenant: "Apex Prime Real Estate",
    reconciled: true,
    referenceNo: "EXP-2026-11-MGT",
  },
  {
    id: "led-03",
    date: "2026-11-01",
    propertyTitle: "One Madison Glass Penthouse Suites",
    category: "Rent Revenue",
    description: "Monthly executive lease payments",
    type: "INCOME",
    amount: 102000,
    vendorOrTenant: "Commercial Escrow Account NY",
    reconciled: true,
    referenceNo: "REV-2026-11-MADISON",
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    category: "PAYOUT",
    title: "Monthly Rental Dividend Credited",
    message: "$61.22 in simulated net rental distributions deposited to your wallet.",
    timestamp: "2 hours ago",
    read: false,
    actionUrl: "/wallet",
    severity: "success",
  },
  {
    id: "notif-2",
    category: "DUE_DILIGENCE",
    title: "Due Diligence Audit Verified",
    message: "Title Certificate & Bureau Veritas Structural Audit renewed for Marina Horizon.",
    timestamp: "1 day ago",
    read: false,
    actionUrl: "/property/prop-dubai-marina-tower",
    severity: "info",
  },
  {
    id: "notif-3",
    category: "TRANSACTION",
    title: "Order Executed Successfully",
    message: "Purchased 25 shares of One Madison Glass Penthouse Suites at $121.00.",
    timestamp: "3 days ago",
    read: true,
    actionUrl: "/dashboard",
    severity: "info",
  },
];

const INITIAL_APPOINTMENTS: ExpertAppointment[] = [
  {
    id: "apt-101",
    expertName: "Adv. Bilal Hassan, LL.M",
    expertRole: "Senior Property Legal Counsel",
    date: "2026-11-20",
    time: "10:30 AM",
    type: "Video Consultation",
    status: "Confirmed",
    purpose: "Title deed validation & overseas Pakistani tax structure review",
    createdAt: "2026-11-15 09:00:00",
  },
];

const INITIAL_PROPOSALS: CommunityProposal[] = [
  {
    id: "prop-lab-01",
    title: "Solar-Powered Student Housing Hub near NUST",
    city: "Islamabad",
    country: "Pakistan",
    category: "student",
    estimatedCost: "$1.8M",
    author: "Farhan Qureshi (Community Member)",
    votes: 184,
    hasVoted: false,
    status: "Feasibility Study",
    rationale: "Over 8,000 university students struggle to find safe, high-speed fiber-equipped student accommodation near Sector H-12. A purpose-built student block with rooftop solar can deliver steady 10%+ net rental yield.",
    commentsCount: 38,
    createdAt: "2026-11-01 10:00:00",
  },
  {
    id: "prop-lab-02",
    title: "Biophilic Co-Living & Creative Studios in Shoreditch",
    city: "London",
    country: "United Kingdom",
    category: "residential",
    estimatedCost: "$4.5M",
    author: "Elena Rostova (Investor Circle)",
    votes: 142,
    hasVoted: false,
    status: "Due Diligence",
    rationale: "High demand from European tech founders and creative designers for flexible 3-to-12 month serviced suites with communal podcast studios and garden terraces.",
    commentsCount: 29,
    createdAt: "2026-11-04 14:30:00",
  },
  {
    id: "prop-lab-03",
    title: "Cold-Chain Logistics Terminal for Mango & Citrus Exports",
    city: "Multan",
    country: "Pakistan",
    category: "logistics",
    estimatedCost: "$2.6M",
    author: "Malik Shahzad (Agri-Logistics)",
    votes: 119,
    hasVoted: false,
    status: "Community Voting",
    rationale: "Export agricultural processors in Southern Punjab face 25% post-harvest spoilage. A climate-controlled cold storage warehouse along M-4 Motorway guarantees year-round long-term corporate leases.",
    commentsCount: 22,
    createdAt: "2026-11-07 16:15:00",
  },
  {
    id: "prop-lab-04",
    title: "Affordable Healthcare Professional Housing near Dubai Healthcare City",
    city: "Dubai",
    country: "United Arab Emirates",
    category: "affordable",
    estimatedCost: "$3.9M",
    author: "Dr. Ayesha Rehman",
    votes: 95,
    hasVoted: false,
    status: "Under Review",
    rationale: "Mid-level nursing and healthcare technicians commute 90 minutes daily. Developing dedicated affordable community apartments creates immediate 100% occupancy with long-term hospital leases.",
    commentsCount: 17,
    createdAt: "2026-11-10 11:45:00",
  },
];

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>("investor");
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [watchlist, setWatchlist] = useState<string[]>(["prop-dubai-marina-tower", "prop-london-mayfair-commercial"]);
  const [walletBalance, setWalletBalance] = useState<number>(INITIAL_WALLET_BALANCE);
  const [holdings, setHoldings] = useState<ShareHolding[]>(INITIAL_HOLDINGS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [payoutHistory, setPayoutHistory] = useState<RentalPayoutRecord[]>(INITIAL_PAYOUTS);

  const [leases, setLeases] = useState<LeaseAgreement[]>(INITIAL_LEASES);
  const [rentPayments, setRentPayments] = useState<TenantRentPayment[]>(INITIAL_RENT_PAYMENTS);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(INITIAL_MAINTENANCE);
  const [accountingLedger, setAccountingLedger] = useState<AccountingLedgerEntry[]>(INITIAL_LEDGER);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Experts & Community Lab persistent state
  const [appointments, setAppointments] = useState<ExpertAppointment[]>(INITIAL_APPOINTMENTS);
  const [proposals, setProposals] = useState<CommunityProposal[]>(INITIAL_PROPOSALS);

  // Guided Walkthrough
  const [isDemoTourActive, setIsDemoTourActive] = useState<boolean>(false);
  const [demoTourStep, setDemoTourStep] = useState<number>(0);

  // Authenticated user ID tracking, sequence counter & active user ref for cancellation checks
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const authSequenceRef = useRef<number>(0);
  const authUserIdRef = useRef<string | null>(null);

  // Helper to scope localStorage by authenticated user with guest fallback
  const getStorageKey = useCallback((key: string, userId: string | null) => {
    return userId ? `stateera_${userId}_${key}` : `stateera_guest_${key}`;
  }, []);

  // Synchronously update both ref and state to eliminate render-timing gaps
  const updateAuthUserId = useCallback((userId: string | null) => {
    authUserIdRef.current = userId;
    setAuthUserId(userId);
  }, []);

  // Load from user-scoped localStorage with strict isolation between authenticated and guest accounts
  const restoreStorageForUser = useCallback((userId: string | null) => {
    try {
      if (userId) {
        // Authenticated user: strictly read user-scoped keys. NEVER fall back to guest or legacy unscoped data.
        const scopedWalletKey = `stateera_${userId}_wallet_balance`;
        const savedWallet = getStorageItem(scopedWalletKey);
        setWalletBalance(savedWallet ? JSON.parse(savedWallet) : INITIAL_WALLET_BALANCE);

        const scopedHoldingsKey = `stateera_${userId}_holdings`;
        const savedHoldings = getStorageItem(scopedHoldingsKey);
        setHoldings(savedHoldings ? JSON.parse(savedHoldings) : INITIAL_HOLDINGS);

        const scopedTransactionsKey = `stateera_${userId}_transactions`;
        const savedTransactions = getStorageItem(scopedTransactionsKey);
        setTransactions(savedTransactions ? JSON.parse(savedTransactions) : INITIAL_TRANSACTIONS);

        const scopedWatchlistKey = `stateera_${userId}_watchlist`;
        const savedWatchlist = getStorageItem(scopedWatchlistKey);
        setWatchlist(savedWatchlist ? JSON.parse(savedWatchlist) : ["prop-dubai-marina-tower", "prop-london-mayfair-commercial"]);

        const scopedRoleKey = `stateera_${userId}_role`;
        const savedRole = getStorageItem(scopedRoleKey) as UserRole | null;
        setRole(savedRole && ["investor", "manager", "tenant", "admin"].includes(savedRole) ? savedRole : "investor");

        const scopedAppointmentsKey = `stateera_${userId}_appointments`;
        const savedAppointments = getStorageItem(scopedAppointmentsKey);
        if (savedAppointments) {
          try {
            const parsedApt = JSON.parse(savedAppointments);
            if (Array.isArray(parsedApt)) setAppointments(parsedApt);
          } catch {}
        }

        const scopedProposalsKey = `stateera_${userId}_proposals`;
        const savedProposals = getStorageItem(scopedProposalsKey);
        if (savedProposals) {
          try {
            const parsedProp = JSON.parse(savedProposals);
            if (Array.isArray(parsedProp)) setProposals(parsedProp);
          } catch {}
        }
      } else {
        // Guest user: read guest-scoped keys with legacy unscoped fallback
        const savedWallet = getStorageItem("stateera_guest_wallet_balance") ?? getStorageItem("stateera_wallet_balance");
        setWalletBalance(savedWallet ? JSON.parse(savedWallet) : INITIAL_WALLET_BALANCE);

        const savedHoldings = getStorageItem("stateera_guest_holdings") ?? getStorageItem("stateera_holdings");
        setHoldings(savedHoldings ? JSON.parse(savedHoldings) : INITIAL_HOLDINGS);

        const savedTransactions = getStorageItem("stateera_guest_transactions") ?? getStorageItem("stateera_transactions");
        setTransactions(savedTransactions ? JSON.parse(savedTransactions) : INITIAL_TRANSACTIONS);

        const savedWatchlist = getStorageItem("stateera_guest_watchlist") ?? getStorageItem("stateera_watchlist");
        setWatchlist(savedWatchlist ? JSON.parse(savedWatchlist) : ["prop-dubai-marina-tower", "prop-london-mayfair-commercial"]);

        const savedRole = (getStorageItem("stateera_guest_role") ?? getStorageItem("stateera_role")) as UserRole | null;
        setRole(savedRole && ["investor", "manager", "tenant", "admin"].includes(savedRole) ? savedRole : "investor");

        const savedAppointments = getStorageItem("stateera_guest_appointments") ?? getStorageItem("stateera_appointments");
        if (savedAppointments) {
          try {
            const parsedApt = JSON.parse(savedAppointments);
            if (Array.isArray(parsedApt)) setAppointments(parsedApt);
          } catch {}
        }

        const savedProposals = getStorageItem("stateera_guest_proposals") ?? getStorageItem("stateera_proposals");
        if (savedProposals) {
          try {
            const parsedProp = JSON.parse(savedProposals);
            if (Array.isArray(parsedProp)) setProposals(parsedProp);
          } catch {}
        }
      }
    } catch {
      // In restricted environments or if parsing fails, restore clean defaults
      setWalletBalance(INITIAL_WALLET_BALANCE);
      setHoldings(INITIAL_HOLDINGS);
      setTransactions(INITIAL_TRANSACTIONS);
      setWatchlist(["prop-dubai-marina-tower", "prop-london-mayfair-commercial"]);
      setRole("investor");
      setAppointments(INITIAL_APPOINTMENTS);
      setProposals(INITIAL_PROPOSALS);
    }
  }, []);

  const isRestoredRef = useRef<boolean>(false);

  // Synchronous non-blocking auth session subscriber (with sequence race guard)
  useEffect(() => {
    const supabase = createClient();
    const requestSeq = authSequenceRef.current;

    // Check initial active session with race-condition sequence guard
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Discard delayed getSession if onAuthStateChange already fired a newer event while in-flight
      if (authSequenceRef.current !== requestSeq) return;

      const uid = session?.user?.id ?? null;
      updateAuthUserId(uid);
      restoreStorageForUser(uid);
      isRestoredRef.current = true;
    }).catch(() => {
      // Graceful offline fallback
      if (authSequenceRef.current !== requestSeq) return;
      updateAuthUserId(null);
      restoreStorageForUser(null);
      isRestoredRef.current = true;
    });

    // Purely synchronous auth event listener - zero async database calls inside callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Increment sequence counter so any in-flight getSession resolution is discarded
      authSequenceRef.current += 1;

      if (event === "SIGNED_OUT" || !session?.user) {
        updateAuthUserId(null);
        restoreStorageForUser(null);
        setRole("investor");
        removeStorageItem("stateera_role");
        isRestoredRef.current = true;
      } else if (session?.user) {
        updateAuthUserId(session.user.id);
        restoreStorageForUser(session.user.id);
        isRestoredRef.current = true;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [updateAuthUserId, restoreStorageForUser]);

  // Decoupled asynchronous profile role synchronization (runs outside auth event loop with cancellation checks)
  useEffect(() => {
    if (!authUserId) return;

    let isMounted = true;
    const targetUserId = authUserId;

    const syncProfileRole = async () => {
      try {
        const supabase = createClient();
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role, role_approval_status")
          .eq("id", targetUserId)
          .single();

        // Cancellation & identity checks: discard result if unmounted or targetUser is outdated
        if (!isMounted || targetUserId !== authUserIdRef.current) {
          return;
        }

        if (!error && profile) {
          // Authoritative profile returned from database
          if (profile.role_approval_status === "Approved") {
            const approvedRole = profile.role as UserRole;
            if (["admin", "manager", "tenant", "investor"].includes(approvedRole)) {
              setRole(approvedRole);
              return;
            }
          }
          // Explicitly unapproved (Pending or Rejected): fail-closed to investor role
          setRole("investor");
          return;
        }

        if (error) {
          const errCode = error.code || "";
          const errMsg = (error.message || "").toLowerCase();
          const errDetails = (error.details || "").toLowerCase();

          const isSchemaError =
            errCode === "PGRST204" ||
            errCode === "42703" ||
            errMsg.includes("role_approval_status") ||
            errDetails.includes("role_approval_status") ||
            (errMsg.includes("column") && errMsg.includes("does not exist"));

          if (isSchemaError) {
            // Check base profile role to verify record existence without destructive deletion
            const { data: baseProfile, error: baseErr } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", targetUserId)
              .single();

            if (!isMounted || targetUserId !== authUserIdRef.current) return;

            if (!baseErr && baseProfile) {
              // Base profile exists; because approval status cannot be verified due to missing column,
              // restrict active client role to "investor" (fails closed) without wiping stored state
              setRole("investor");
              return;
            }
          } else if (errCode === "PGRST116") {
            // Zero rows returned: profile genuinely missing from public.profiles
            setRole("investor");
            return;
          }

          // Network or unexpected temporary failure: do NOT destructively wipe storage
          // Keep active role fail-closed to investor without corrupting user-scoped storage
          setRole("investor");
        }
      } catch {
        // Network or runtime exception: fail-closed gracefully without destructive deletion
        if (isMounted && targetUserId === authUserIdRef.current) {
          setRole("investor");
        }
      }
    };

    syncProfileRole();

    return () => {
      isMounted = false;
    };
  }, [authUserId]);

  // Sync state changes to user-scoped localStorage
  useEffect(() => {
    // Prevent premature overwrite before initial auth/storage restoration completes
    if (!isRestoredRef.current) return;

    try {
      setStorageItem(getStorageKey("wallet_balance", authUserId), JSON.stringify(walletBalance));
      setStorageItem(getStorageKey("holdings", authUserId), JSON.stringify(holdings));
      setStorageItem(getStorageKey("transactions", authUserId), JSON.stringify(transactions));
      setStorageItem(getStorageKey("watchlist", authUserId), JSON.stringify(watchlist));
      setStorageItem(getStorageKey("role", authUserId), role);
      setStorageItem(getStorageKey("appointments", authUserId), JSON.stringify(appointments));
      setStorageItem(getStorageKey("proposals", authUserId), JSON.stringify(proposals));
    } catch {
      // Local storage write error
    }
  }, [walletBalance, holdings, transactions, watchlist, role, appointments, proposals, authUserId, getStorageKey]);

  // Computed Portfolio Totals (Division-by-zero & non-finite protected)
  const { totalPortfolioValue, totalInvested, totalGainLoss, totalGainLossPercent, monthlyEstimatedIncome, averageAnnualYield } = useMemo(() => {
    let portVal = 0;
    let invTotal = 0;
    let monthInc = 0;
    let weightedYieldSum = 0;

    holdings.forEach((h) => {
      portVal += h.currentValue;
      invTotal += h.totalInvested;
      monthInc += h.monthlyEstimatedRentalIncome;
      weightedYieldSum += h.netYield * h.currentValue;
    });

    const gainLoss = portVal - invTotal;
    const rawGainLossPct = invTotal > 0 ? (gainLoss / invTotal) * 100 : 0;
    const gainLossPct = Number.isFinite(rawGainLossPct) ? rawGainLossPct : 0;
    const rawAvgYield = portVal > 0 ? weightedYieldSum / portVal : 0;
    const avgYield = Number.isFinite(rawAvgYield) ? rawAvgYield : 0;

    return {
      totalPortfolioValue: Number(portVal.toFixed(2)),
      totalInvested: Number(invTotal.toFixed(2)),
      totalGainLoss: Number(gainLoss.toFixed(2)),
      totalGainLossPercent: Number(gainLossPct.toFixed(2)),
      monthlyEstimatedIncome: Number(monthInc.toFixed(2)),
      averageAnnualYield: Number(avgYield.toFixed(2)),
    };
  }, [holdings]);

  // Watchlist helpers
  const toggleWatchlist = (propertyId: string) => {
    setWatchlist((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const isWatchlisted = (propertyId: string) => watchlist.includes(propertyId);

  // Buy fractional shares
  const buyShares = (
    propertyId: string,
    quantity: number,
    orderType: "Market" | "Limit" = "Market",
    limitPrice?: number
  ) => {
    if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
      return { success: false, message: "Please enter a valid whole number of shares greater than 0." };
    }

    const prop = properties.find((p) => p.id === propertyId);
    if (!prop) {
      return { success: false, message: "Property listing not found." };
    }

    if (quantity > prop.availableShares) {
      return { success: false, message: `Only ${prop.availableShares} shares are currently available.` };
    }

    // Determine execution price based on order type
    let executionPrice = prop.sharePrice;
    if (orderType === "Limit") {
      if (limitPrice === undefined || !Number.isFinite(limitPrice) || limitPrice <= 0) {
        return { success: false, message: "Please specify a valid limit price greater than $0." };
      }
      if (limitPrice < prop.sharePrice) {
        return {
          success: false,
          message: `Limit price ($${limitPrice.toFixed(2)}) is below the current market asking price ($${prop.sharePrice.toFixed(2)}). In instant demo execution, buy orders only fill when limit price meets or exceeds the market price.`,
        };
      }
      executionPrice = limitPrice;
    }

    const totalCost = Number((quantity * executionPrice).toFixed(2));
    if (totalCost > walletBalance) {
      return {
        success: false,
        message: `Insufficient demo wallet balance. Required: $${totalCost.toLocaleString()}, Available: $${walletBalance.toLocaleString()}`,
      };
    }

    // Deduct wallet balance
    setWalletBalance((prev) => Number((prev - totalCost).toFixed(2)));

    // Update Property available shares & funded %
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === propertyId) {
          const newAvailable = p.availableShares - quantity;
          const funded = ((p.totalShares - newAvailable) / p.totalShares) * 100;
          return { ...p, availableShares: newAvailable, fundedPercentage: Number(funded.toFixed(1)) };
        }
        return p;
      })
    );

    // Update Holdings
    setHoldings((prev) => {
      const existing = prev.find((h) => h.propertyId === propertyId);
      const estMonthlyRent = quantity * prop.monthlyPerShareRent;

      if (existing) {
        const newShares = existing.sharesOwned + quantity;
        const newTotalInvested = existing.totalInvested + totalCost;
        const newAvgPrice = newShares > 0 ? newTotalInvested / newShares : executionPrice;
        const newCurrentVal = newShares * prop.sharePrice;
        const unrealGain = newCurrentVal - newTotalInvested;
        const unrealPct = newTotalInvested > 0 ? (unrealGain / newTotalInvested) * 100 : 0;

        return prev.map((h) =>
          h.propertyId === propertyId
            ? {
                ...h,
                sharesOwned: newShares,
                totalInvested: Number(newTotalInvested.toFixed(2)),
                averagePurchasePrice: Number(newAvgPrice.toFixed(2)),
                currentValue: Number(newCurrentVal.toFixed(2)),
                unrealizedGain: Number(unrealGain.toFixed(2)),
                unrealizedGainPercent: Number(Number.isFinite(unrealPct) ? unrealPct.toFixed(2) : 0),
                monthlyEstimatedRentalIncome: Number((newShares * prop.monthlyPerShareRent).toFixed(2)),
              }
            : h
        );
      } else {
        const newHolding: ShareHolding = {
          propertyId: prop.id,
          propertyTitle: prop.title,
          sharesOwned: quantity,
          averagePurchasePrice: executionPrice,
          currentSharePrice: prop.sharePrice,
          totalInvested: totalCost,
          currentValue: totalCost,
          unrealizedGain: 0,
          unrealizedGainPercent: 0,
          monthlyEstimatedRentalIncome: Number(estMonthlyRent.toFixed(2)),
          netYield: prop.netYield,
          lastPayoutAmount: 0,
        };
        return [...prev, newHolding];
      }
    });

    // Add transaction record
    const newTx: Transaction = {
      id: `tx-buy-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type: "BUY",
      propertyId: prop.id,
      propertyTitle: prop.title,
      shares: quantity,
      pricePerShare: executionPrice,
      amount: totalCost,
      fee: 0,
      status: "Completed",
      referenceCode: `BUY-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "TRANSACTION",
      title: "Share Purchase Executed",
      message: `Successfully acquired ${quantity} shares of ${prop.title} for $${totalCost.toLocaleString()} (${orderType} order at $${executionPrice.toFixed(2)}/share).`,
      timestamp: "Just now",
      read: false,
      actionUrl: "/dashboard",
      severity: "success",
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return {
      success: true,
      message: `Successfully purchased ${quantity} shares of ${prop.title} for $${totalCost.toLocaleString()} (${orderType} order)!`,
    };
  };

  // Sell fractional shares
  const sellShares = (propertyId: string, quantity: number) => {
    if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
      return { success: false, message: "Please enter a valid whole number of shares to sell." };
    }

    const holding = holdings.find((h) => h.propertyId === propertyId);
    if (!holding || holding.sharesOwned < quantity) {
      return {
        success: false,
        message: `You only own ${holding ? holding.sharesOwned : 0} shares of this property.`,
      };
    }

    const prop = properties.find((p) => p.id === propertyId);
    const sharePrice = prop ? prop.sharePrice : holding.currentSharePrice;
    const saleProceeds = Number((quantity * sharePrice).toFixed(2));

    // Credit wallet balance
    setWalletBalance((prev) => Number((prev + saleProceeds).toFixed(2)));

    // Update Property available shares
    if (prop) {
      setProperties((prev) =>
        prev.map((p) =>
          p.id === propertyId ? { ...p, availableShares: p.availableShares + quantity } : p
        )
      );
    }

    // Update Holdings
    setHoldings((prev) => {
      return prev
        .map((h) => {
          if (h.propertyId === propertyId) {
            const remainingShares = h.sharesOwned - quantity;
            if (remainingShares <= 0) return null;
            const newTotalInvested = h.sharesOwned > 0 ? h.totalInvested * (remainingShares / h.sharesOwned) : 0;
            const newCurrentVal = remainingShares * sharePrice;
            const unrealGain = newCurrentVal - newTotalInvested;
            const unrealPct = newTotalInvested > 0 ? (unrealGain / newTotalInvested) * 100 : 0;

            return {
              ...h,
              sharesOwned: remainingShares,
              totalInvested: Number(newTotalInvested.toFixed(2)),
              currentValue: Number(newCurrentVal.toFixed(2)),
              unrealizedGain: Number(unrealGain.toFixed(2)),
              unrealizedGainPercent: Number(Number.isFinite(unrealPct) ? unrealPct.toFixed(2) : 0),
              monthlyEstimatedRentalIncome: Number(
                (remainingShares * (prop ? prop.monthlyPerShareRent : 0.8)).toFixed(2)
              ),
            };
          }
          return h;
        })
        .filter(Boolean) as ShareHolding[];
    });

    // Add transaction record
    const newTx: Transaction = {
      id: `tx-sell-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type: "SELL",
      propertyId,
      propertyTitle: holding.propertyTitle,
      shares: quantity,
      pricePerShare: sharePrice,
      amount: saleProceeds,
      fee: 0,
      status: "Completed",
      referenceCode: `SEL-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "TRANSACTION",
      title: "Share Sale Completed",
      message: `Sold ${quantity} shares of ${holding.propertyTitle} for $${saleProceeds.toLocaleString()}. Proceeds added to your demo wallet.`,
      timestamp: "Just now",
      read: false,
      actionUrl: "/wallet",
      severity: "info",
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return { success: true, message: `Successfully sold ${quantity} shares for $${saleProceeds.toLocaleString()}!` };
  };

  // Deposit demo cash
  const depositFunds = (amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { success: false, message: "Please enter a valid deposit amount greater than $0." };
    }

    const cleanAmount = Number(amount.toFixed(2));
    setWalletBalance((prev) => Number((prev + cleanAmount).toFixed(2)));

    const newTx: Transaction = {
      id: `tx-dep-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type: "DEPOSIT",
      amount: cleanAmount,
      fee: 0,
      status: "Completed",
      referenceCode: `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    return { success: true, message: `Deposited $${cleanAmount.toLocaleString()} demo cash into your wallet (practice funds)!` };
  };

  // Withdraw demo cash
  const withdrawFunds = (amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { success: false, message: "Please enter a valid withdrawal amount greater than $0." };
    }
    const cleanAmount = Number(amount.toFixed(2));
    if (cleanAmount > walletBalance) {
      return {
        success: false,
        message: `Withdrawal amount ($${cleanAmount.toLocaleString()}) exceeds available wallet balance ($${walletBalance.toLocaleString()}).`,
      };
    }

    setWalletBalance((prev) => Number((prev - cleanAmount).toFixed(2)));

    const newTx: Transaction = {
      id: `tx-wdr-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type: "WITHDRAW",
      amount: cleanAmount,
      fee: 0,
      status: "Completed",
      referenceCode: `WDR-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    return { success: true, message: `Withdrew $${cleanAmount.toLocaleString()} demo cash successfully (practice funds)!` };
  };

  // Simulate monthly rental dividend distributions across owned shares
  const simulateMonthlyDividendPayout = () => {
    if (holdings.length === 0) {
      return { success: false, totalDistributed: 0, message: "You do not own any fractional shares yet. Buy shares first to earn monthly rental yield!" };
    }

    const currentPeriod = new Date().toISOString().substring(0, 7); // e.g. "2026-11"
    const isAlreadyPaid = payoutHistory.some((p) => p.payoutDate.startsWith(currentPeriod));
    if (isAlreadyPaid) {
      return {
        success: false,
        totalDistributed: 0,
        message: `Simulated rental dividend for period ${currentPeriod} has already been distributed. Monthly distributions can only be triggered once per calendar month cycle in the demo.`,
      };
    }

    let totalPayout = 0;
    const newPayoutRecords: RentalPayoutRecord[] = [];
    const newTxs: Transaction[] = [];

    holdings.forEach((h) => {
      const prop = properties.find((p) => p.id === h.propertyId);
      const payoutPerShare = prop ? prop.monthlyPerShareRent * 0.85 : 0.8; // after maintenance & fees
      const propPayout = Number((h.sharesOwned * payoutPerShare).toFixed(2));
      totalPayout += propPayout;

      const record: RentalPayoutRecord = {
        id: `pay-${Date.now()}-${h.propertyId}`,
        payoutDate: new Date().toISOString().substring(0, 10),
        propertyId: h.propertyId,
        propertyTitle: h.propertyTitle,
        sharesEligible: h.sharesOwned,
        grossRentCollected: prop ? prop.estimatedMonthlyRent : 75000,
        operatingExpenses: prop ? Math.round(prop.estimatedMonthlyRent * 0.08) : 6000,
        maintenanceReserve: prop ? Math.round(prop.estimatedMonthlyRent * 0.03) : 2250,
        managementFee: prop ? Math.round(prop.estimatedMonthlyRent * 0.04) : 3000,
        netDistributableRent: prop ? Math.round(prop.estimatedMonthlyRent * 0.85) : 63750,
        payoutPerShare: Number(payoutPerShare.toFixed(3)),
        totalReceived: propPayout,
        referenceId: `DIST-${Math.floor(10000 + Math.random() * 90000)}`,
      };
      newPayoutRecords.push(record);

      newTxs.push({
        id: `tx-div-${Date.now()}-${h.propertyId}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        type: "RENT_PAYOUT",
        propertyId: h.propertyId,
        propertyTitle: h.propertyTitle,
        shares: h.sharesOwned,
        amount: propPayout,
        status: "Completed",
        referenceCode: record.referenceId,
      });
    });

    setWalletBalance((prev) => Number((prev + totalPayout).toFixed(2)));
    setPayoutHistory((prev) => [...newPayoutRecords, ...prev]);
    setTransactions((prev) => [...newTxs, ...prev]);

    const notif: NotificationItem = {
      id: `notif-div-${Date.now()}`,
      category: "PAYOUT",
      title: "Simulated Rental Yield Distributed",
      message: `Credited $${totalPayout.toFixed(2)} simulated rental dividend across ${holdings.length} properties directly to your demo wallet.`,
      timestamp: "Just now",
      read: false,
      actionUrl: "/wallet",
      severity: "success",
    };
    setNotifications((prev) => [notif, ...prev]);

    return {
      success: true,
      totalDistributed: Number(totalPayout.toFixed(2)),
      message: `Simulated rental dividend of $${totalPayout.toFixed(2)} distributed across your portfolio for ${currentPeriod}!`,
    };
  };

  // Reset demo data to defaults
  const resetDemoData = () => {
    setWalletBalance(INITIAL_WALLET_BALANCE);
    setHoldings(INITIAL_HOLDINGS);
    setTransactions(INITIAL_TRANSACTIONS);
    setPayoutHistory(INITIAL_PAYOUTS);
    setWatchlist(["prop-dubai-marina-tower", "prop-london-mayfair-commercial"]);
    setRole("investor");
    setProperties(MOCK_PROPERTIES);
    setLeases(INITIAL_LEASES);
    setRentPayments(INITIAL_RENT_PAYMENTS);
    setMaintenanceRequests(INITIAL_MAINTENANCE);
    setAccountingLedger(INITIAL_LEDGER);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAppointments(INITIAL_APPOINTMENTS);
    setProposals(INITIAL_PROPOSALS);

    try {
      const scopedWalletKey = getStorageKey("wallet_balance", authUserId);
      const scopedHoldingsKey = getStorageKey("holdings", authUserId);
      const scopedTxKey = getStorageKey("transactions", authUserId);
      const scopedWatchlistKey = getStorageKey("watchlist", authUserId);
      const scopedRoleKey = getStorageKey("role", authUserId);
      const scopedAppointmentsKey = getStorageKey("appointments", authUserId);
      const scopedProposalsKey = getStorageKey("proposals", authUserId);

      removeStorageItem(scopedWalletKey);
      removeStorageItem(scopedHoldingsKey);
      removeStorageItem(scopedTxKey);
      removeStorageItem(scopedWatchlistKey);
      removeStorageItem(scopedRoleKey);
      removeStorageItem(scopedAppointmentsKey);
      removeStorageItem(scopedProposalsKey);

      removeStorageItem("stateera_wallet_balance");
      removeStorageItem("stateera_holdings");
      removeStorageItem("stateera_transactions");
      removeStorageItem("stateera_watchlist");
      removeStorageItem("stateera_role");
      removeStorageItem("stateera_guest_appointments");
      removeStorageItem("stateera_guest_proposals");
      removeStorageItem("stateera_appointments");
      removeStorageItem("stateera_proposals");
    } catch {
      // Ignore
    }
  };

  // Tenant operations
  const submitMaintenanceRequest = (req: Omit<MaintenanceRequest, "id" | "createdAt" | "status">) => {
    const newReq: MaintenanceRequest = {
      ...req,
      id: `maint-${Date.now()}`,
      createdAt: new Date().toISOString().substring(0, 10),
      status: "Reported",
    };
    setMaintenanceRequests((prev) => [newReq, ...prev]);

    const notif: NotificationItem = {
      id: `notif-maint-${Date.now()}`,
      category: "MAINTENANCE",
      title: "New Maintenance Work Order Logged",
      message: `${newReq.title} for ${newReq.propertyTitle} (${newReq.unitNumber}) submitted.`,
      timestamp: "Just now",
      read: false,
      actionUrl: "/demo/manager",
      severity: "warning",
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateMaintenanceStatus = (id: string, status: MaintenanceRequest["status"], actualCost?: number) => {
    setMaintenanceRequests((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status, actualCost: actualCost ?? m.actualCost } : m))
    );
  };

  const payTenantRent = (leaseId: string) => {
    const lease = leases.find((l) => l.id === leaseId);
    if (!lease) return { success: false, message: "Lease not found." };

    const payment: TenantRentPayment = {
      id: `rent-p-${Date.now()}`,
      leaseId,
      propertyTitle: lease.propertyTitle,
      unitNumber: lease.unitNumber,
      month: "December 2026",
      amount: lease.monthlyRent,
      paidDate: new Date().toISOString().substring(0, 10),
      status: "Paid",
      receiptId: `REC-${Date.now().toString().slice(-6)}`,
    };
    setRentPayments((prev) => [payment, ...prev]);

    // Add to ledger
    const ledgerEntry: AccountingLedgerEntry = {
      id: `led-${Date.now()}`,
      date: payment.paidDate,
      propertyTitle: lease.propertyTitle,
      category: "Rent Revenue",
      description: `Tenant rent collection for ${lease.unitNumber} (${lease.tenantName})`,
      type: "INCOME",
      amount: lease.monthlyRent,
      vendorOrTenant: lease.tenantName,
      reconciled: true,
      referenceNo: payment.receiptId,
    };
    setAccountingLedger((prev) => [ledgerEntry, ...prev]);

    return { success: true, message: `Rent payment of $${lease.monthlyRent.toLocaleString()} processed!` };
  };

  // Accounting Ledger
  const addLedgerEntry = (entry: Omit<AccountingLedgerEntry, "id" | "referenceNo">) => {
    if (!Number.isFinite(entry.amount) || entry.amount <= 0) return;
    const newEntry: AccountingLedgerEntry = {
      ...entry,
      amount: Number(entry.amount.toFixed(2)),
      id: `led-${Date.now()}`,
      referenceNo: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setAccountingLedger((prev) => [newEntry, ...prev]);
  };

  // Notifications
  const unreadNotificationCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Tour
  const startDemoTour = () => {
    setIsDemoTourActive(true);
    setDemoTourStep(0);
  };
  const endDemoTour = () => {
    setIsDemoTourActive(false);
  };

  // Expert Appointments
  const bookAppointment = (apt: Omit<ExpertAppointment, "id" | "status" | "createdAt">): { success: boolean; message: string; appointment?: ExpertAppointment } => {
    if (!apt.expertName || !apt.expertName.trim()) {
      return { success: false, message: "Please select a valid expert advisor." };
    }
    if (!apt.date || !apt.date.trim()) {
      return { success: false, message: "Please choose a valid consultation date." };
    }
    if (!apt.time || !apt.time.trim()) {
      return { success: false, message: "Please choose a valid consultation time slot." };
    }
    if (!apt.purpose || apt.purpose.trim().length < 5) {
      return { success: false, message: "Please provide consultation case notes (minimum 5 characters)." };
    }

    // Duplicate check: Same expert on identical date and time slot
    const isDuplicate = appointments.some(
      (a) =>
        a.status !== "Cancelled" &&
        a.expertName.trim().toLowerCase() === apt.expertName.trim().toLowerCase() &&
        a.date === apt.date &&
        a.time === apt.time
    );

    if (isDuplicate) {
      return {
        success: false,
        message: `You already have an active consultation scheduled with ${apt.expertName} on ${apt.date} at ${apt.time}.`,
      };
    }

    const newApt: ExpertAppointment = {
      ...apt,
      id: `apt-${Date.now()}`,
      status: "Confirmed",
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 19),
    };

    setAppointments((prev) => [newApt, ...prev]);

    // Dispatch persistent confirmation notification
    const notif: NotificationItem = {
      id: `notif-apt-${Date.now()}`,
      category: "DUE_DILIGENCE",
      title: "Expert Consultation Confirmed",
      message: `Confirmed ${apt.type} with ${apt.expertName} for ${apt.date} at ${apt.time}.`,
      timestamp: "Just now",
      read: false,
      actionUrl: "/experts",
      severity: "success",
    };
    setNotifications((prev) => [notif, ...prev]);

    return {
      success: true,
      message: `Consultation confirmed with ${apt.expertName}!`,
      appointment: newApt,
    };
  };

  const cancelAppointment = (id: string): { success: boolean; message: string } => {
    const target = appointments.find((a) => a.id === id);
    if (!target) {
      return { success: false, message: "Appointment record not found." };
    }

    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" as const } : a))
    );

    return { success: true, message: `Consultation with ${target.expertName} has been cancelled.` };
  };

  // Community Governance Proposals
  const submitProposal = (
    prop: Omit<CommunityProposal, "id" | "votes" | "hasVoted" | "commentsCount" | "createdAt" | "status" | "author"> & {
      status?: CommunityProposal["status"];
      author?: string;
    }
  ): { success: boolean; message: string; proposal?: CommunityProposal } => {
    if (!prop.title || prop.title.trim().length < 5) {
      return { success: false, message: "Proposal title must be at least 5 characters." };
    }
    if (!prop.city || !prop.city.trim()) {
      return { success: false, message: "Please specify a target city for the property proposal." };
    }
    if (!prop.rationale || prop.rationale.trim().length < 10) {
      return { success: false, message: "Please provide a clear investment rationale (minimum 10 characters)." };
    }

    // Duplicate check: Same proposal title
    const isDuplicate = proposals.some(
      (p) => p.title.trim().toLowerCase() === prop.title.trim().toLowerCase()
    );

    if (isDuplicate) {
      return {
        success: false,
        message: "A community proposal with this title already exists in the Community Lab.",
      };
    }

    const created: CommunityProposal = {
      ...prop,
      id: `prop-lab-${Date.now()}`,
      author: prop.author || "You (Active Contributor)",
      estimatedCost: prop.estimatedCost || "$2.0M",
      votes: 1,
      hasVoted: true,
      status: prop.status || "Under Review",
      commentsCount: 0,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 19),
    };

    setProposals((prev) => [created, ...prev]);

    const notif: NotificationItem = {
      id: `notif-prop-${Date.now()}`,
      category: "DUE_DILIGENCE",
      title: "Community Proposal Submitted",
      message: `"${created.title}" in ${created.city} submitted for community voting.`,
      timestamp: "Just now",
      read: false,
      actionUrl: "/community-lab",
      severity: "info",
    };
    setNotifications((prev) => [notif, ...prev]);

    return {
      success: true,
      message: "Property proposal successfully submitted to Community Lab!",
      proposal: created,
    };
  };

  const voteProposal = (id: string): { success: boolean; message: string; hasVoted?: boolean; votes?: number } => {
    const target = proposals.find((p) => p.id === id);
    if (!target) {
      return { success: false, message: "Proposal not found." };
    }

    const nextHasVoted = !target.hasVoted;
    const nextVotes = nextHasVoted ? target.votes + 1 : Math.max(0, target.votes - 1);

    setProposals((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, hasVoted: nextHasVoted, votes: nextVotes } : p
      )
    );

    return {
      success: true,
      message: nextHasVoted ? "Upvote recorded!" : "Vote withdrawn.",
      hasVoted: nextHasVoted,
      votes: nextVotes,
    };
  };

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        properties,
        watchlist,
        toggleWatchlist,
        isWatchlisted,
        walletBalance,
        holdings,
        transactions,
        payoutHistory,
        totalPortfolioValue,
        totalInvested,
        totalGainLoss,
        totalGainLossPercent,
        monthlyEstimatedIncome,
        averageAnnualYield,
        buyShares,
        sellShares,
        depositFunds,
        withdrawFunds,
        simulateMonthlyDividendPayout,
        resetDemoData,
        leases,
        rentPayments,
        maintenanceRequests,
        submitMaintenanceRequest,
        payTenantRent,
        updateMaintenanceStatus,
        accountingLedger,
        addLedgerEntry,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isDemoTourActive,
        demoTourStep,
        setDemoTourStep,
        startDemoTour,
        endDemoTour,
        appointments,
        bookAppointment,
        cancelAppointment,
        proposals,
        submitProposal,
        voteProposal,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = (): DemoContextType => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};

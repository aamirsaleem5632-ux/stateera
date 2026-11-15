"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Property } from "@/types/property";
import { ShareHolding, Transaction, RentalPayoutRecord, InvestorStatement } from "@/types/investor";
import { LeaseAgreement, TenantRentPayment, MaintenanceRequest } from "@/types/tenant";
import { AccountingLedgerEntry } from "@/types/accounting";
import { UserRole } from "@/types/admin";
import { NotificationItem } from "@/types/notification";
import { MOCK_PROPERTIES } from "@/data/mockProperties";

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
  buyShares: (propertyId: string, quantity: number, orderType?: "Market" | "Limit") => { success: boolean; message: string };
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

  // Guided Walkthrough
  const [isDemoTourActive, setIsDemoTourActive] = useState<boolean>(false);
  const [demoTourStep, setDemoTourStep] = useState<number>(0);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedWallet = localStorage.getItem("stateera_wallet_balance");
      if (savedWallet) setWalletBalance(JSON.parse(savedWallet));

      const savedHoldings = localStorage.getItem("stateera_holdings");
      if (savedHoldings) setHoldings(JSON.parse(savedHoldings));

      const savedTransactions = localStorage.getItem("stateera_transactions");
      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));

      const savedWatchlist = localStorage.getItem("stateera_watchlist");
      if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));

      const savedRole = localStorage.getItem("stateera_role") as UserRole;
      if (savedRole) setRole(savedRole);
    } catch {
      // Local storage read error
    }
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("stateera_wallet_balance", JSON.stringify(walletBalance));
      localStorage.setItem("stateera_holdings", JSON.stringify(holdings));
      localStorage.setItem("stateera_transactions", JSON.stringify(transactions));
      localStorage.setItem("stateera_watchlist", JSON.stringify(watchlist));
      localStorage.setItem("stateera_role", role);
    } catch {
      // Local storage write error
    }
  }, [walletBalance, holdings, transactions, watchlist, role]);

  // Computed Portfolio Totals
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
    const gainLossPct = invTotal > 0 ? (gainLoss / invTotal) * 100 : 0;
    const avgYield = portVal > 0 ? weightedYieldSum / portVal : 0;

    return {
      totalPortfolioValue: portVal,
      totalInvested: invTotal,
      totalGainLoss: gainLoss,
      totalGainLossPercent: gainLossPct,
      monthlyEstimatedIncome: monthInc,
      averageAnnualYield: avgYield,
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
  const buyShares = (propertyId: string, quantity: number, orderType: "Market" | "Limit" = "Market") => {
    if (quantity <= 0) {
      return { success: false, message: "Please enter a valid share quantity greater than 0." };
    }

    const prop = properties.find((p) => p.id === propertyId);
    if (!prop) {
      return { success: false, message: "Property listing not found." };
    }

    if (quantity > prop.availableShares) {
      return { success: false, message: `Only ${prop.availableShares} shares are currently available.` };
    }

    const totalCost = quantity * prop.sharePrice;
    if (totalCost > walletBalance) {
      return {
        success: false,
        message: `Insufficient demo wallet balance. Required: $${totalCost.toLocaleString()}, Available: $${walletBalance.toLocaleString()}`,
      };
    }

    // Deduct wallet balance
    setWalletBalance((prev) => prev - totalCost);

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
        const newAvgPrice = newTotalInvested / newShares;
        const newCurrentVal = newShares * prop.sharePrice;
        const unrealGain = newCurrentVal - newTotalInvested;
        const unrealPct = (unrealGain / newTotalInvested) * 100;

        return prev.map((h) =>
          h.propertyId === propertyId
            ? {
                ...h,
                sharesOwned: newShares,
                totalInvested: newTotalInvested,
                averagePurchasePrice: Number(newAvgPrice.toFixed(2)),
                currentValue: newCurrentVal,
                unrealizedGain: unrealGain,
                unrealizedGainPercent: Number(unrealPct.toFixed(2)),
                monthlyEstimatedRentalIncome: Number((newShares * prop.monthlyPerShareRent).toFixed(2)),
              }
            : h
        );
      } else {
        const newHolding: ShareHolding = {
          propertyId: prop.id,
          propertyTitle: prop.title,
          sharesOwned: quantity,
          averagePurchasePrice: prop.sharePrice,
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
      pricePerShare: prop.sharePrice,
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
      message: `Successfully acquired ${quantity} shares of ${prop.title} for $${totalCost.toLocaleString()}.`,
      timestamp: "Just now",
      read: false,
      actionUrl: "/dashboard",
      severity: "success",
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return { success: true, message: `Successfully purchased ${quantity} shares of ${prop.title}!` };
  };

  // Sell fractional shares
  const sellShares = (propertyId: string, quantity: number) => {
    if (quantity <= 0) {
      return { success: false, message: "Please enter a valid share quantity to sell." };
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
    const saleProceeds = quantity * sharePrice;

    // Credit wallet balance
    setWalletBalance((prev) => prev + saleProceeds);

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
            if (remainingShares === 0) return null;
            const newTotalInvested = h.totalInvested * (remainingShares / h.sharesOwned);
            const newCurrentVal = remainingShares * sharePrice;
            const unrealGain = newCurrentVal - newTotalInvested;
            const unrealPct = (unrealGain / newTotalInvested) * 100;

            return {
              ...h,
              sharesOwned: remainingShares,
              totalInvested: Number(newTotalInvested.toFixed(2)),
              currentValue: newCurrentVal,
              unrealizedGain: Number(unrealGain.toFixed(2)),
              unrealizedGainPercent: Number(unrealPct.toFixed(2)),
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
    if (amount <= 0) return { success: false, message: "Please enter a valid amount." };

    setWalletBalance((prev) => prev + amount);

    const newTx: Transaction = {
      id: `tx-dep-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type: "DEPOSIT",
      amount,
      fee: 0,
      status: "Completed",
      referenceCode: `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    return { success: true, message: `Deposited $${amount.toLocaleString()} into your demo wallet!` };
  };

  // Withdraw demo cash
  const withdrawFunds = (amount: number) => {
    if (amount <= 0) return { success: false, message: "Please enter a valid withdrawal amount." };
    if (amount > walletBalance) return { success: false, message: "Withdrawal amount exceeds available wallet balance." };

    setWalletBalance((prev) => prev - amount);

    const newTx: Transaction = {
      id: `tx-wdr-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type: "WITHDRAW",
      amount,
      fee: 0,
      status: "Completed",
      referenceCode: `WDR-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    return { success: true, message: `Withdrew $${amount.toLocaleString()} demo cash successfully!` };
  };

  // Simulate monthly rental dividend distributions across owned shares
  const simulateMonthlyDividendPayout = () => {
    if (holdings.length === 0) {
      return { success: false, totalDistributed: 0, message: "You do not own any fractional shares yet. Buy shares first to earn monthly rental yield!" };
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

    setWalletBalance((prev) => prev + totalPayout);
    setPayoutHistory((prev) => [...newPayoutRecords, ...prev]);
    setTransactions((prev) => [...newTxs, ...prev]);

    const notif: NotificationItem = {
      id: `notif-div-${Date.now()}`,
      category: "PAYOUT",
      title: "Monthly Rental Yield Distributed",
      message: `Credited $${totalPayout.toFixed(2)} across ${holdings.length} properties directly to your demo wallet.`,
      timestamp: "Just now",
      read: false,
      actionUrl: "/wallet",
      severity: "success",
    };
    setNotifications((prev) => [notif, ...prev]);

    return {
      success: true,
      totalDistributed: Number(totalPayout.toFixed(2)),
      message: `Simulated rental dividend of $${totalPayout.toFixed(2)} distributed across your portfolio!`,
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

    try {
      localStorage.removeItem("stateera_wallet_balance");
      localStorage.removeItem("stateera_holdings");
      localStorage.removeItem("stateera_transactions");
      localStorage.removeItem("stateera_watchlist");
      localStorage.removeItem("stateera_role");
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
      actionUrl: "/manager",
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
    const newEntry: AccountingLedgerEntry = {
      ...entry,
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

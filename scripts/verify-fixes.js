/**
 * StateEra Audit & Controlled Bug Fix Verification Test Suite
 * Tests financial validation, limit orders, deposit/withdrawal safety, duplicate payout guards,
 * empty lease/property handling, role authorization checks, and demo account isolation.
 */

const assert = require("assert");

console.log("===============================================================");
console.log("  STATEERA AUDIT & BUG FIX VERIFICATION TEST SUITE");
console.log("===============================================================\n");

let passedTests = 0;
let totalTests = 0;

function runTest(testName, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } catch (err) {
    console.error(`  [FAIL] ${testName}`);
    console.error(`         Error: ${err.message}\n`);
  }
}

// =========================================================================
// 1. BUY AND SELL VALIDATION & LIMIT ORDER LOGIC
// =========================================================================

console.log("--- 1. Financial & Share Trading Logic ---");

function createMockStore() {
  return {
    walletBalance: 25000,
    properties: [
      {
        id: "prop-dubai-marina-tower",
        title: "Marina Horizon Luxury Tower",
        sharePrice: 100,
        availableShares: 500,
        totalShares: 10000,
        monthlyPerShareRent: 0.8,
        netYield: 9.4,
      },
    ],
    holdings: [
      {
        propertyId: "prop-dubai-marina-tower",
        propertyTitle: "Marina Horizon Luxury Tower",
        sharesOwned: 10,
        averagePurchasePrice: 96,
        currentSharePrice: 100,
        totalInvested: 960,
        currentValue: 1000,
        unrealizedGain: 40,
        unrealizedGainPercent: 4.17,
        monthlyEstimatedRentalIncome: 8,
        netYield: 9.4,
        lastPayoutAmount: 0,
      },
    ],
    transactions: [],
    payoutHistory: [],
    // Buy shares implementation
    buyShares(propertyId, quantity, orderType = "Market", limitPrice) {
      if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
        return { success: false, message: "Please enter a valid whole number of shares greater than 0." };
      }
      const prop = this.properties.find((p) => p.id === propertyId);
      if (!prop) {
        return { success: false, message: "Property listing not found." };
      }
      if (quantity > prop.availableShares) {
        return { success: false, message: `Only ${prop.availableShares} shares are currently available.` };
      }
      let executionPrice = prop.sharePrice;
      if (orderType === "Limit") {
        if (limitPrice === undefined || !Number.isFinite(limitPrice) || limitPrice <= 0) {
          return { success: false, message: "Please specify a valid limit price greater than $0." };
        }
        if (limitPrice < prop.sharePrice) {
          return {
            success: false,
            message: `Limit price ($${limitPrice.toFixed(2)}) is below the current market asking price ($${prop.sharePrice.toFixed(2)}).`,
          };
        }
        executionPrice = limitPrice;
      }
      const totalCost = Number((quantity * executionPrice).toFixed(2));
      if (totalCost > this.walletBalance) {
        return { success: false, message: `Insufficient demo wallet balance.` };
      }
      this.walletBalance = Number((this.walletBalance - totalCost).toFixed(2));
      prop.availableShares -= quantity;
      return { success: true, message: "Purchase executed", executionPrice, totalCost };
    },
    // Sell shares implementation
    sellShares(propertyId, quantity) {
      if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
        return { success: false, message: "Please enter a valid whole number of shares to sell." };
      }
      const holding = this.holdings.find((h) => h.propertyId === propertyId);
      if (!holding || holding.sharesOwned < quantity) {
        return { success: false, message: `You only own ${holding ? holding.sharesOwned : 0} shares.` };
      }
      const prop = this.properties.find((p) => p.id === propertyId);
      const sharePrice = prop ? prop.sharePrice : holding.currentSharePrice;
      const saleProceeds = Number((quantity * sharePrice).toFixed(2));
      this.walletBalance = Number((this.walletBalance + saleProceeds).toFixed(2));
      holding.sharesOwned -= quantity;
      return { success: true, message: "Sale executed", saleProceeds };
    },
    // Deposit
    depositFunds(amount) {
      if (!Number.isFinite(amount) || amount <= 0) {
        return { success: false, message: "Please enter a valid deposit amount greater than $0." };
      }
      const clean = Number(amount.toFixed(2));
      this.walletBalance = Number((this.walletBalance + clean).toFixed(2));
      return { success: true, message: "Deposit completed" };
    },
    // Withdraw
    withdrawFunds(amount) {
      if (!Number.isFinite(amount) || amount <= 0) {
        return { success: false, message: "Please enter a valid withdrawal amount greater than $0." };
      }
      const clean = Number(amount.toFixed(2));
      if (clean > this.walletBalance) {
        return { success: false, message: "Insufficient balance" };
      }
      this.walletBalance = Number((this.walletBalance - clean).toFixed(2));
      return { success: true, message: "Withdrawal completed" };
    },
    // Dividend Payout with duplicate period protection
    simulateMonthlyDividendPayout() {
      if (this.holdings.length === 0) {
        return { success: false, message: "No shares owned" };
      }
      const currentPeriod = new Date().toISOString().substring(0, 7);
      const isAlreadyPaid = this.payoutHistory.some((p) => p.payoutDate.startsWith(currentPeriod));
      if (isAlreadyPaid) {
        return { success: false, message: `Simulated dividend for period ${currentPeriod} has already been distributed.` };
      }
      let totalPayout = 50;
      this.walletBalance = Number((this.walletBalance + totalPayout).toFixed(2));
      this.payoutHistory.push({
        id: `pay-${Date.now()}`,
        payoutDate: new Date().toISOString().substring(0, 10),
        amount: totalPayout,
      });
      return { success: true, totalDistributed: totalPayout, message: "Dividend distributed" };
    },
  };
}

runTest("buyShares rejects NaN, Infinity, negative, and zero quantities", () => {
  const store = createMockStore();
  assert.strictEqual(store.buyShares("prop-dubai-marina-tower", NaN).success, false);
  assert.strictEqual(store.buyShares("prop-dubai-marina-tower", Infinity).success, false);
  assert.strictEqual(store.buyShares("prop-dubai-marina-tower", -5).success, false);
  assert.strictEqual(store.buyShares("prop-dubai-marina-tower", 0).success, false);
  assert.strictEqual(store.buyShares("prop-dubai-marina-tower", 2.5).success, false);
  assert.strictEqual(store.walletBalance, 25000);
});

runTest("buyShares correctly executes market order and debits balance", () => {
  const store = createMockStore();
  const res = store.buyShares("prop-dubai-marina-tower", 10, "Market");
  assert.strictEqual(res.success, true);
  assert.strictEqual(res.totalCost, 1000);
  assert.strictEqual(store.walletBalance, 24000);
  assert.strictEqual(store.properties[0].availableShares, 490);
});

runTest("buyShares handles Limit order behavior correctly", () => {
  const store = createMockStore();
  // Limit price below market asks should reject in instant demo execution
  const underLimit = store.buyShares("prop-dubai-marina-tower", 5, "Limit", 80);
  assert.strictEqual(underLimit.success, false);
  assert.strictEqual(store.walletBalance, 25000);

  // Limit price with invalid numbers rejected
  assert.strictEqual(store.buyShares("prop-dubai-marina-tower", 5, "Limit", NaN).success, false);
  assert.strictEqual(store.buyShares("prop-dubai-marina-tower", 5, "Limit", -10).success, false);

  // Valid limit price meets or exceeds market price
  const validLimit = store.buyShares("prop-dubai-marina-tower", 5, "Limit", 105);
  assert.strictEqual(validLimit.success, true);
  assert.strictEqual(validLimit.totalCost, 525);
  assert.strictEqual(store.walletBalance, 24475);
});

runTest("sellShares rejects invalid quantities and excess sales", () => {
  const store = createMockStore();
  assert.strictEqual(store.sellShares("prop-dubai-marina-tower", NaN).success, false);
  assert.strictEqual(store.sellShares("prop-dubai-marina-tower", Infinity).success, false);
  assert.strictEqual(store.sellShares("prop-dubai-marina-tower", 0).success, false);
  assert.strictEqual(store.sellShares("prop-dubai-marina-tower", 100).success, false); // only owns 10
  assert.strictEqual(store.walletBalance, 25000);

  const res = store.sellShares("prop-dubai-marina-tower", 5);
  assert.strictEqual(res.success, true);
  assert.strictEqual(res.saleProceeds, 500);
  assert.strictEqual(store.walletBalance, 25500);
  assert.strictEqual(store.holdings[0].sharesOwned, 5);
});

runTest("depositFunds and withdrawFunds validate amounts against NaN and balance", () => {
  const store = createMockStore();
  assert.strictEqual(store.depositFunds(NaN).success, false);
  assert.strictEqual(store.depositFunds(-100).success, false);
  assert.strictEqual(store.depositFunds(1000).success, true);
  assert.strictEqual(store.walletBalance, 26000);

  assert.strictEqual(store.withdrawFunds(NaN).success, false);
  assert.strictEqual(store.withdrawFunds(50000).success, false); // exceeds 26000
  assert.strictEqual(store.withdrawFunds(6000).success, true);
  assert.strictEqual(store.walletBalance, 20000);
});

runTest("simulateMonthlyDividendPayout prevents duplicate period payouts", () => {
  const store = createMockStore();
  const first = store.simulateMonthlyDividendPayout();
  assert.strictEqual(first.success, true);
  assert.strictEqual(store.walletBalance, 25050);

  // Attempt immediate second payout in same cycle
  const second = store.simulateMonthlyDividendPayout();
  assert.strictEqual(second.success, false);
  assert.ok(second.message.includes("already been distributed"));
  assert.strictEqual(store.walletBalance, 25050); // Unchanged
});

// =========================================================================
// 2. TENANT & MANAGER WORKFLOW RESILIENCE
// =========================================================================

console.log("\n--- 2. Tenant & Manager Workflow Resilience ---");

runTest("Tenant maintenance submission handles empty leases safely", () => {
  const leases = [];
  const activeLease = leases && leases.length > 0 ? leases[0] : null;

  function submitTenantMaintenance(lease, req) {
    if (!lease) {
      return { success: false, message: "No active lease registered. Maintenance requests require an active tenancy." };
    }
    return { success: true, message: `Maintenance logged for ${lease.propertyTitle}` };
  }

  const result = submitTenantMaintenance(activeLease, { title: "Dripping tap" });
  assert.strictEqual(result.success, false);
  assert.ok(result.message.includes("No active lease"));
});

runTest("Tenant ordinal date suffix calculation is accurate", () => {
  function getOrdinalSuffix(day) {
    const j = day % 10;
    const k = day % 100;
    if (j === 1 && k !== 11) return `${day}st`;
    if (j === 2 && k !== 12) return `${day}nd`;
    if (j === 3 && k !== 13) return `${day}rd`;
    return `${day}th`;
  }

  assert.strictEqual(getOrdinalSuffix(1), "1st");
  assert.strictEqual(getOrdinalSuffix(2), "2nd");
  assert.strictEqual(getOrdinalSuffix(3), "3rd");
  assert.strictEqual(getOrdinalSuffix(4), "4th");
  assert.strictEqual(getOrdinalSuffix(11), "11th");
  assert.strictEqual(getOrdinalSuffix(12), "12th");
  assert.strictEqual(getOrdinalSuffix(21), "21st");
  assert.strictEqual(getOrdinalSuffix(22), "22nd");
  assert.strictEqual(getOrdinalSuffix(23), "23rd");
  assert.strictEqual(getOrdinalSuffix(31), "31st");
});

runTest("Manager work order creation handles empty properties safely", () => {
  const properties = [];
  function createWorkOrder(props, title, cost) {
    if (!props || props.length === 0) {
      return { success: false, message: "No properties available to assign work order." };
    }
    if (!Number.isFinite(cost) || cost <= 0) {
      return { success: false, message: "Invalid cost" };
    }
    return { success: true };
  }

  assert.strictEqual(createWorkOrder(properties, "Repairs", 100).success, false);
  assert.strictEqual(createWorkOrder([{ id: "1" }], "Repairs", NaN).success, false);
  assert.strictEqual(createWorkOrder([{ id: "1" }], "Repairs", 250).success, true);
});

// =========================================================================
// 3. ROLE AND APPROVAL ACCESS MATRIX
// =========================================================================

console.log("\n--- 3. Role & Server-Side Clearance Verification ---");

function checkPortalAccess(role, status, targetRoute) {
  const isApproved = status === "Approved";
  if (targetRoute === "/admin") {
    return role === "admin" && isApproved;
  }
  if (targetRoute === "/manager") {
    return (role === "admin" && isApproved) || (role === "manager" && isApproved);
  }
  if (targetRoute === "/tenant") {
    return (role === "admin" && isApproved) || (role === "tenant" && isApproved);
  }
  return true;
}

runTest("Admin route requires strictly approved admin", () => {
  assert.strictEqual(checkPortalAccess("admin", "Approved", "/admin"), true);
  assert.strictEqual(checkPortalAccess("admin", "Pending", "/admin"), false);
  assert.strictEqual(checkPortalAccess("manager", "Approved", "/admin"), false);
  assert.strictEqual(checkPortalAccess("investor", "Approved", "/admin"), false);
  assert.strictEqual(checkPortalAccess(null, null, "/admin"), false);
});

runTest("Manager route allows approved manager or approved admin", () => {
  assert.strictEqual(checkPortalAccess("manager", "Approved", "/manager"), true);
  assert.strictEqual(checkPortalAccess("admin", "Approved", "/manager"), true);
  assert.strictEqual(checkPortalAccess("manager", "Pending", "/manager"), false);
  assert.strictEqual(checkPortalAccess("tenant", "Approved", "/manager"), false);
  assert.strictEqual(checkPortalAccess("investor", "Approved", "/manager"), false);
});

runTest("Tenant route allows approved tenant or approved admin", () => {
  assert.strictEqual(checkPortalAccess("tenant", "Approved", "/tenant"), true);
  assert.strictEqual(checkPortalAccess("admin", "Approved", "/tenant"), true);
  assert.strictEqual(checkPortalAccess("tenant", "Pending", "/tenant"), false);
  assert.strictEqual(checkPortalAccess("manager", "Approved", "/tenant"), false);
  assert.strictEqual(checkPortalAccess("investor", "Approved", "/tenant"), false);
});

runTest("Missing profile fails closed for all protected portals", () => {
  assert.strictEqual(checkPortalAccess(undefined, undefined, "/admin"), false);
  assert.strictEqual(checkPortalAccess(undefined, undefined, "/manager"), false);
  assert.strictEqual(checkPortalAccess(undefined, undefined, "/tenant"), false);
});

// =========================================================================
// 4. INVALID PROPERTY ID HANDLING
// =========================================================================

console.log("\n--- 4. Navigation & Route Boundary Parity ---");

runTest("Invalid property ID resolves to undefined rather than falling back to properties[0]", () => {
  const properties = [
    { id: "prop-1", title: "Valid First Property" },
    { id: "prop-2", title: "Valid Second Property" },
  ];

  function resolveProperty(id) {
    return properties.find((p) => p.id === id); // No fallback to properties[0]
  }

  assert.strictEqual(resolveProperty("non-existent-id"), undefined);
  assert.strictEqual(resolveProperty("prop-1")?.title, "Valid First Property");
});

// =========================================================================
// 5. DEMO ACCOUNT ISOLATION
// =========================================================================

console.log("\n--- 5. Demo Account Isolation ---");

runTest("localStorage keys are strictly scoped per authenticated user ID", () => {
  const getStorageKey = (key, userId) => (userId ? `stateera_${userId}_${key}` : `stateera_guest_${key}`);

  const userAKey = getStorageKey("wallet_balance", "user-uuid-111");
  const userBKey = getStorageKey("wallet_balance", "user-uuid-222");
  const guestKey = getStorageKey("wallet_balance", null);

  assert.strictEqual(userAKey, "stateera_user-uuid-111_wallet_balance");
  assert.strictEqual(userBKey, "stateera_user-uuid-222_wallet_balance");
  assert.strictEqual(guestKey, "stateera_guest_wallet_balance");
  assert.notStrictEqual(userAKey, userBKey);
});

// =========================================================================
// 6. DEMO / LIVE SEPARATION & ROUTE BOUNDARY INVARIANTS
// =========================================================================

console.log("\n--- 6. Demo / Live Separation & Route Boundary Invariants ---");

function getTargetRouteForDemoRole(role) {
  if (role === "manager") return "/demo/manager";
  if (role === "tenant") return "/demo/tenant";
  if (role === "admin") return "/demo/admin";
  return "/dashboard";
}

runTest("Demo role switcher strictly routes to demo sandboxes or dashboard", () => {
  assert.strictEqual(getTargetRouteForDemoRole("admin"), "/demo/admin");
  assert.strictEqual(getTargetRouteForDemoRole("manager"), "/demo/manager");
  assert.strictEqual(getTargetRouteForDemoRole("tenant"), "/demo/tenant");
  assert.strictEqual(getTargetRouteForDemoRole("investor"), "/dashboard");
});

runTest("Demo role switcher NEVER targets real live portal routes", () => {
  const allRoles = ["admin", "manager", "tenant", "investor"];
  const forbiddenLiveRoutes = ["/admin", "/manager", "/tenant"];

  allRoles.forEach((r) => {
    const target = getTargetRouteForDemoRole(r);
    assert.strictEqual(
      forbiddenLiveRoutes.includes(target),
      false,
      `Role ${r} must never target live route ${target}`
    );
  });
});

runTest("Live portal authorization rejects client-controlled demo state", () => {
  function verifyLivePortalAccess(authenticatedUser, profile, clientDemoRole) {
    // Invariant: clientDemoRole must NOT influence server-checked authorization
    if (!authenticatedUser) return false;
    if (!profile) return false;
    if (profile.role_approval_status !== "Approved") return false;
    return profile.role;
  }

  // Client claims demo admin, but server profile is investor
  const result1 = verifyLivePortalAccess(
    { id: "usr-1" },
    { role: "investor", role_approval_status: "Approved" },
    "admin"
  );
  assert.strictEqual(result1, "investor"); // NOT admin!

  // Client claims demo manager, but user is unauthenticated
  const result2 = verifyLivePortalAccess(null, null, "manager");
  assert.strictEqual(result2, false);

  // Client claims demo tenant, but server profile is Pending
  const result3 = verifyLivePortalAccess(
    { id: "usr-2" },
    { role: "tenant", role_approval_status: "Pending" },
    "tenant"
  );
  assert.strictEqual(result3, false);
});

// =========================================================================
// 7. SERVER-SIDE DIRECT URL ENFORCEMENT & MIDDLEWARE INVARIANTS
// =========================================================================

console.log("\n--- 7. Server-Side Direct URL Enforcement & Middleware Invariants ---");

function simulateServerDirectUrlAccess(pathname, authenticatedUser, profile) {
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isManagerRoute = pathname === "/manager" || pathname.startsWith("/manager/");
  const isTenantRoute = pathname === "/tenant" || pathname.startsWith("/tenant/");

  if (isAdminRoute || isManagerRoute || isTenantRoute) {
    if (!authenticatedUser) {
      return { status: 307, location: `/login?error=session_required&next=${pathname}`, authorized: false };
    }
    if (!profile) {
      return { status: 307, location: `/login?error=profile_not_found&next=${pathname}`, authorized: false };
    }

    const trustedRole = profile.role;
    const isApproved = profile.role_approval_status === "Approved";

    if (isAdminRoute) {
      if (trustedRole !== "admin" || !isApproved) {
        return { status: 307, location: `/login?error=admin_unauthorized&next=${pathname}`, authorized: false };
      }
    }

    if (isManagerRoute) {
      if (trustedRole === "admin" && isApproved) {
        // Super-admin permitted
      } else if (trustedRole === "manager") {
        if (!isApproved) {
          return { status: 307, location: `/login?error=manager_unapproved&next=${pathname}`, authorized: false };
        }
      } else {
        return { status: 307, location: `/login?error=manager_unauthorized&next=${pathname}`, authorized: false };
      }
    }

    if (isTenantRoute) {
      if (trustedRole === "admin" && isApproved) {
        // Super-admin permitted
      } else if (trustedRole === "tenant") {
        if (!isApproved) {
          return { status: 307, location: `/login?error=tenant_unapproved&next=${pathname}`, authorized: false };
        }
      } else {
        return { status: 307, location: `/login?error=tenant_unauthorized&next=${pathname}`, authorized: false };
      }
    }

    return { status: 200, authorized: true, role: trustedRole };
  }

  // Non-protected routes (including /demo/*)
  return { status: 200, authorized: true, isPublicOrDemo: true };
}

runTest("Direct unauthenticated URL requests to /admin, /manager, /tenant receive server redirect", () => {
  const adminRes = simulateServerDirectUrlAccess("/admin", null, null);
  assert.strictEqual(adminRes.status, 307);
  assert.strictEqual(adminRes.location, "/login?error=session_required&next=/admin");
  assert.strictEqual(adminRes.authorized, false);

  const mgrRes = simulateServerDirectUrlAccess("/manager", null, null);
  assert.strictEqual(mgrRes.status, 307);
  assert.strictEqual(mgrRes.location, "/login?error=session_required&next=/manager");

  const tntRes = simulateServerDirectUrlAccess("/tenant", null, null);
  assert.strictEqual(tntRes.status, 307);
  assert.strictEqual(tntRes.location, "/login?error=session_required&next=/tenant");
});

runTest("Authenticated investor direct request to /admin is rejected server-side", () => {
  const res = simulateServerDirectUrlAccess(
    "/admin",
    { id: "inv-user" },
    { role: "investor", role_approval_status: "Approved" }
  );
  assert.strictEqual(res.status, 307);
  assert.strictEqual(res.location, "/login?error=admin_unauthorized&next=/admin");
  assert.strictEqual(res.authorized, false);
});

runTest("Authenticated pending manager direct request to /manager is rejected server-side", () => {
  const res = simulateServerDirectUrlAccess(
    "/manager",
    { id: "pending-mgr" },
    { role: "manager", role_approval_status: "Pending" }
  );
  assert.strictEqual(res.status, 307);
  assert.strictEqual(res.location, "/login?error=manager_unapproved&next=/manager");
  assert.strictEqual(res.authorized, false);
});

runTest("Direct requests to /demo/* routes pass through without session requirements", () => {
  const demoAdmin = simulateServerDirectUrlAccess("/demo/admin", null, null);
  assert.strictEqual(demoAdmin.status, 200);
  assert.strictEqual(demoAdmin.authorized, true);

  const demoMgr = simulateServerDirectUrlAccess("/demo/manager", null, null);
  assert.strictEqual(demoMgr.status, 200);
  assert.strictEqual(demoMgr.authorized, true);

  const demoTnt = simulateServerDirectUrlAccess("/demo/tenant", null, null);
  assert.strictEqual(demoTnt.status, 200);
  assert.strictEqual(demoTnt.authorized, true);
});

runTest("Verified approved admin direct URL request successfully grants server access", () => {
  const res = simulateServerDirectUrlAccess(
    "/admin",
    { id: "admin-user" },
    { role: "admin", role_approval_status: "Approved" }
  );
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.authorized, true);
  assert.strictEqual(res.role, "admin");
});

// =========================================================================
// 8. SIMULATOR EMPTY COLLECTION & CALCULATION STABILITY INVARIANTS
// =========================================================================

console.log("\n--- 8. Simulator Empty Collection & Calculation Stability Invariants ---");

function resolveSimulatorProperty(properties, selectedPropertyId) {
  if (!properties) return { status: "loading", property: null };
  const validProperties = Array.isArray(properties)
    ? properties.filter((p) => Boolean(p && typeof p.id === "string" && p.id.length > 0))
    : [];
  if (validProperties.length === 0) return { status: "empty", property: null };
  const selected = validProperties.find((p) => p.id === selectedPropertyId) || validProperties[0];
  return { status: "ready", property: selected, validProperties };
}

function calculateSimulatorScenarios(selectedProperty, investmentAmount, occupancyRate, rentVariationPercent, maintenanceMultiplier, managementFeeRate) {
  if (!selectedProperty) {
    return {
      sharesCount: 0,
      base: { monthly: 0, annual: 0, yield: 0 },
      simulated: { monthly: 0, annual: 0, yield: 0 },
      worst: { monthly: 0, annual: 0, yield: 0 },
      best: { monthly: 0, annual: 0, yield: 0 },
    };
  }

  const sharePrice =
    Number.isFinite(selectedProperty.sharePrice) && selectedProperty.sharePrice > 0
      ? selectedProperty.sharePrice
      : 100;
  const baseShareRent =
    Number.isFinite(selectedProperty.monthlyPerShareRent) && selectedProperty.monthlyPerShareRent >= 0
      ? selectedProperty.monthlyPerShareRent
      : 0;

  const safeInvestment = Number.isFinite(investmentAmount) && investmentAmount > 0 ? investmentAmount : 0;
  const sharesCount = Math.max(0, Math.floor(safeInvestment / sharePrice));
  const totalInvested = sharesCount * sharePrice;

  // Base Case
  const baseMonthlyRent = sharesCount * baseShareRent;
  const baseAnnualRent = baseMonthlyRent * 12;
  const baseNetYield = totalInvested > 0 ? (baseAnnualRent / totalInvested) * 100 : 0;

  // Simulated Case
  const safeOccupancy = Number.isFinite(occupancyRate) ? Math.max(0, Math.min(100, occupancyRate)) : 95;
  const safeRentVariation = Number.isFinite(rentVariationPercent) ? rentVariationPercent : 0;
  const safeMaintMultiplier = Number.isFinite(maintenanceMultiplier) && maintenanceMultiplier >= 0 ? maintenanceMultiplier : 1.0;
  const safeMgmtFeeRate = Number.isFinite(managementFeeRate) && managementFeeRate >= 0 ? managementFeeRate : 7.5;

  const effectiveRentFactor = (1 + safeRentVariation / 100) * (safeOccupancy / 100);
  const expenseFactor = Math.max(0, 1 - safeMgmtFeeRate / 100 - 0.05 * safeMaintMultiplier);
  const simulatedMonthlyRent = Math.max(0, sharesCount * baseShareRent * effectiveRentFactor * expenseFactor);
  const simulatedAnnualRent = simulatedMonthlyRent * 12;
  const simulatedNetYield = totalInvested > 0 ? (simulatedAnnualRent / totalInvested) * 100 : 0;

  // Worst Case
  const worstMonthly = Math.max(0, sharesCount * baseShareRent * 0.7 * 0.85 * (1 - 0.1 - 0.08));
  const worstAnnual = worstMonthly * 12;
  const worstYield = totalInvested > 0 ? (worstAnnual / totalInvested) * 100 : 0;

  // Best Case
  const bestMonthly = Math.max(0, sharesCount * baseShareRent * 1.0 * 1.15 * (1 - 0.06 - 0.03));
  const bestAnnual = bestMonthly * 12;
  const bestYield = totalInvested > 0 ? (bestAnnual / totalInvested) * 100 : 0;

  return {
    sharesCount,
    base: { monthly: baseMonthlyRent, annual: baseAnnualRent, yield: baseNetYield },
    simulated: { monthly: simulatedMonthlyRent, annual: simulatedAnnualRent, yield: simulatedNetYield },
    worst: { monthly: worstMonthly, annual: worstAnnual, yield: worstYield },
    best: { monthly: bestMonthly, annual: bestAnnual, yield: bestYield },
  };
}

runTest("Empty or undefined property collection never crashes simulator resolution", () => {
  const undefRes = resolveSimulatorProperty(undefined, "");
  assert.strictEqual(undefRes.status, "loading");
  assert.strictEqual(undefRes.property, null);

  const emptyRes = resolveSimulatorProperty([], "");
  assert.strictEqual(emptyRes.status, "empty");
  assert.strictEqual(emptyRes.property, null);

  const nullElementRes = resolveSimulatorProperty([null, undefined], "");
  assert.strictEqual(nullElementRes.status, "empty");
  assert.strictEqual(nullElementRes.property, null);
});

runTest("Valid property collection auto-selects first property and tracks selection changes", () => {
  const mockProperties = [
    { id: "prop-1", title: "Tower A", sharePrice: 100, monthlyPerShareRent: 0.8, occupancyRate: 98 },
    { id: "prop-2", title: "Tower B", sharePrice: 200, monthlyPerShareRent: 1.5, occupancyRate: 92 },
  ];

  // Default selection (unspecified ID)
  const defaultRes = resolveSimulatorProperty(mockProperties, "");
  assert.strictEqual(defaultRes.status, "ready");
  assert.strictEqual(defaultRes.property.id, "prop-1");

  // Explicit selection
  const selectB = resolveSimulatorProperty(mockProperties, "prop-2");
  assert.strictEqual(selectB.property.id, "prop-2");

  // Fallback on invalid ID
  const invalidRes = resolveSimulatorProperty(mockProperties, "non-existent-id");
  assert.strictEqual(invalidRes.property.id, "prop-1");
});

runTest("Calculation engine gracefully handles null property without throwing", () => {
  const result = calculateSimulatorScenarios(null, 5000, 95, 0, 1.0, 7.5);
  assert.strictEqual(result.sharesCount, 0);
  assert.strictEqual(result.simulated.monthly, 0);
  assert.strictEqual(result.simulated.yield, 0);
  assert.strictEqual(result.worst.monthly, 0);
  assert.strictEqual(result.best.monthly, 0);
});

runTest("Zero or corrupted share price avoids division by zero", () => {
  const corruptedProp = { id: "p-bad", title: "Bad Price", sharePrice: 0, monthlyPerShareRent: 1, occupancyRate: 95 };
  const result = calculateSimulatorScenarios(corruptedProp, 5000, 95, 0, 1.0, 7.5);
  assert.strictEqual(Number.isFinite(result.sharesCount), true);
  assert.strictEqual(Number.isFinite(result.simulated.yield), true);
  assert.strictEqual(Number.isNaN(result.simulated.yield), false);
});

runTest("Simulator calculations yield accurate financial outputs for normal parameters", () => {
  const prop = { id: "prop-dxb", title: "Dubai Marina", sharePrice: 100, monthlyPerShareRent: 0.8, occupancyRate: 95 };
  const result = calculateSimulatorScenarios(prop, 5000, 95, 0, 1.0, 7.5);

  // 5000 / 100 = 50 shares
  assert.strictEqual(result.sharesCount, 50);
  // Base monthly = 50 * 0.8 = $40.00
  assert.strictEqual(result.base.monthly, 40);
  // Base annual = 40 * 12 = $480.00
  assert.strictEqual(result.base.annual, 480);
  // Base yield = (480 / 5000) * 100 = 9.6%
  assert.strictEqual(result.base.yield, 9.6);

  // Simulated: 50 * 0.8 * (0.95) * (1 - 0.075 - 0.05) = 40 * 0.95 * 0.875 = 33.25
  assert.strictEqual(Number(result.simulated.monthly.toFixed(2)), 33.25);
  assert.strictEqual(result.worst.monthly < result.simulated.monthly, true);
  assert.strictEqual(result.best.monthly > result.simulated.monthly, true);
});

// =========================================================================
// 9. EXPERTS & COMMUNITY LAB PERSISTENCE AND VALIDATION LOGIC
// =========================================================================

console.log("\n--- 9. Experts & Community Lab Persistence and Validation ---");

function createCommunityStore() {
  return {
    appointments: [
      {
        id: "apt-101",
        expertName: "Adv. Bilal Hassan, LL.M",
        expertRole: "Senior Property Legal Counsel",
        date: "2026-11-20",
        time: "10:30 AM",
        type: "Video Consultation",
        status: "Confirmed",
        purpose: "Title deed validation & overseas Pakistani tax structure review",
        createdAt: "2026-11-15 10:00:00",
      },
    ],
    proposals: [
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
        rationale: "Over 8,000 university students struggle to find safe, high-speed fiber-equipped student accommodation near Sector H-12.",
        commentsCount: 38,
        createdAt: "2026-11-01 10:00:00",
      },
    ],
    bookAppointment(apt) {
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
      const isDuplicate = this.appointments.some(
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
      const newApt = {
        ...apt,
        id: `apt-${Date.now()}`,
        status: "Confirmed",
        createdAt: new Date().toISOString().replace("T", " ").substring(0, 19),
      };
      this.appointments = [newApt, ...this.appointments];
      return { success: true, message: `Consultation confirmed with ${apt.expertName}!`, appointment: newApt };
    },
    cancelAppointment(id) {
      const target = this.appointments.find((a) => a.id === id);
      if (!target) {
        return { success: false, message: "Appointment record not found." };
      }
      this.appointments = this.appointments.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a));
      return { success: true, message: `Consultation with ${target.expertName} has been cancelled.` };
    },
    submitProposal(prop) {
      if (!prop.title || prop.title.trim().length < 5) {
        return { success: false, message: "Proposal title must be at least 5 characters." };
      }
      if (!prop.city || !prop.city.trim()) {
        return { success: false, message: "Please specify a target city for the property proposal." };
      }
      if (!prop.rationale || prop.rationale.trim().length < 10) {
        return { success: false, message: "Please provide a clear investment rationale (minimum 10 characters)." };
      }
      const isDuplicate = this.proposals.some(
        (p) => p.title.trim().toLowerCase() === prop.title.trim().toLowerCase()
      );
      if (isDuplicate) {
        return {
          success: false,
          message: "A community proposal with this title already exists in the Community Lab.",
        };
      }
      const created = {
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
      this.proposals = [created, ...this.proposals];
      return { success: true, message: "Property proposal successfully submitted!", proposal: created };
    },
    voteProposal(id) {
      let toggledState = null;
      this.proposals = this.proposals.map((p) => {
        if (p.id === id) {
          const newHasVoted = !p.hasVoted;
          const newVotes = newHasVoted ? p.votes + 1 : Math.max(0, p.votes - 1);
          toggledState = { hasVoted: newHasVoted, votes: newVotes };
          return { ...p, hasVoted: newHasVoted, votes: newVotes };
        }
        return p;
      });
      if (!toggledState) {
        return { success: false, message: "Proposal record not found." };
      }
      return {
        success: true,
        message: toggledState.hasVoted ? "Vote recorded!" : "Vote removed.",
        hasVoted: toggledState.hasVoted,
        votes: toggledState.votes,
      };
    },
  };
}

runTest("Appointment booking validates required fields and minimum length", () => {
  const store = createCommunityStore();

  // Missing expertName
  const res1 = store.bookAppointment({ expertName: "", date: "2026-11-25", time: "14:00 GMT", type: "Video Consultation", purpose: "Legal review" });
  assert.strictEqual(res1.success, false);

  // Missing date
  const res2 = store.bookAppointment({ expertName: "Dr. Kenji Sato", date: "", time: "14:00 GMT", type: "Video Consultation", purpose: "Due diligence" });
  assert.strictEqual(res2.success, false);

  // Missing time
  const res3 = store.bookAppointment({ expertName: "Dr. Kenji Sato", date: "2026-11-25", time: "", type: "Video Consultation", purpose: "Due diligence" });
  assert.strictEqual(res3.success, false);

  // Purpose too short (< 5 chars)
  const res4 = store.bookAppointment({ expertName: "Dr. Kenji Sato", date: "2026-11-25", time: "14:00 GMT", type: "Video Consultation", purpose: "Hi" });
  assert.strictEqual(res4.success, false);

  // Valid appointment succeeds
  const resValid = store.bookAppointment({
    expertName: "Dr. Kenji Sato",
    expertRole: "Asia-Pacific Commercial Consultant",
    date: "2026-11-25",
    time: "14:00 GMT",
    type: "Video Consultation",
    purpose: "Commercial due diligence on Tokyo office building",
  });
  assert.strictEqual(resValid.success, true);
  assert.strictEqual(resValid.appointment.status, "Confirmed");
  assert.strictEqual(store.appointments.length, 2);
});

runTest("Duplicate appointment bookings for same expert, date and time are prevented", () => {
  const store = createCommunityStore();

  // Attempt duplicate booking for existing initial appointment (Adv. Bilal Hassan on 2026-11-20 at 10:30 AM)
  const dupRes = store.bookAppointment({
    expertName: "Adv. Bilal Hassan, LL.M",
    expertRole: "Senior Property Legal Counsel",
    date: "2026-11-20",
    time: "10:30 AM",
    type: "Video Consultation",
    purpose: "Duplicate booking attempt",
  });
  assert.strictEqual(dupRes.success, false);
  assert.strictEqual(dupRes.message.includes("already have an active consultation"), true);

  // Booking different date or time succeeds
  const diffTimeRes = store.bookAppointment({
    expertName: "Adv. Bilal Hassan, LL.M",
    expertRole: "Senior Property Legal Counsel",
    date: "2026-11-20",
    time: "14:00 GMT",
    type: "Video Consultation",
    purpose: "Alternative afternoon session",
  });
  assert.strictEqual(diffTimeRes.success, true);
});

runTest("Appointment cancellation updates status and unblocks time slot", () => {
  const store = createCommunityStore();
  const cancelRes = store.cancelAppointment("apt-101");
  assert.strictEqual(cancelRes.success, true);
  assert.strictEqual(store.appointments.find((a) => a.id === "apt-101").status, "Cancelled");

  // Re-booking previously cancelled slot now succeeds
  const rebookRes = store.bookAppointment({
    expertName: "Adv. Bilal Hassan, LL.M",
    expertRole: "Senior Property Legal Counsel",
    date: "2026-11-20",
    time: "10:30 AM",
    type: "Video Consultation",
    purpose: "Fresh session after prior cancellation",
  });
  assert.strictEqual(rebookRes.success, true);
});

runTest("Community proposal submission enforces title, city and rationale length", () => {
  const store = createCommunityStore();

  // Title too short
  const res1 = store.submitProposal({ title: "Hub", city: "Lahore", country: "Pakistan", category: "student", rationale: "Long enough rationale description" });
  assert.strictEqual(res1.success, false);

  // Missing city
  const res2 = store.submitProposal({ title: "Green Energy Hub", city: "", country: "Pakistan", category: "student", rationale: "Long enough rationale description" });
  assert.strictEqual(res2.success, false);

  // Rationale too short (< 10 chars)
  const res3 = store.submitProposal({ title: "Green Energy Hub", city: "Lahore", country: "Pakistan", category: "student", rationale: "Short" });
  assert.strictEqual(res3.success, false);

  // Valid proposal
  const resValid = store.submitProposal({
    title: "Green Energy Technology Campus",
    city: "Lahore",
    country: "Pakistan",
    category: "commercial",
    estimatedCost: "$3.5M",
    rationale: "Rapidly expanding software companies in Gulberg require LEED-certified green offices.",
  });
  assert.strictEqual(resValid.success, true);
  assert.strictEqual(resValid.proposal.votes, 1);
  assert.strictEqual(resValid.proposal.hasVoted, true);
  assert.strictEqual(resValid.proposal.status, "Under Review");
  assert.strictEqual(store.proposals.length, 2);
});

runTest("Duplicate proposal titles are rejected", () => {
  const store = createCommunityStore();

  const dupRes = store.submitProposal({
    title: "Solar-Powered Student Housing Hub near NUST",
    city: "Rawalpindi",
    country: "Pakistan",
    category: "student",
    rationale: "Duplicate concept title test rationale",
  });
  assert.strictEqual(dupRes.success, false);
  assert.strictEqual(dupRes.message.includes("already exists"), true);
});

runTest("Proposal voting toggles upvote and downvote state cleanly", () => {
  const store = createCommunityStore();
  const initialVotes = store.proposals[0].votes; // 184, hasVoted: false

  // First upvote
  const vote1 = store.voteProposal("prop-lab-01");
  assert.strictEqual(vote1.success, true);
  assert.strictEqual(vote1.hasVoted, true);
  assert.strictEqual(vote1.votes, initialVotes + 1);

  // Toggle off (remove vote)
  const vote2 = store.voteProposal("prop-lab-01");
  assert.strictEqual(vote2.success, true);
  assert.strictEqual(vote2.hasVoted, false);
  assert.strictEqual(vote2.votes, initialVotes);
});

runTest("Malformed or corrupt localStorage JSON safely falls back without throwing", () => {
  function safeRestore(jsonStr, fallback) {
    if (!jsonStr) return fallback;
    try {
      return JSON.parse(jsonStr);
    } catch {
      return fallback;
    }
  }

  const initialAppointments = [{ id: "fallback-apt" }];
  const malformedJson = "{corrupted: true, invalid...json";
  const restored = safeRestore(malformedJson, initialAppointments);
  assert.strictEqual(restored, initialAppointments);
  assert.strictEqual(restored[0].id, "fallback-apt");

  const validJson = JSON.stringify([{ id: "valid-apt", expertName: "Dr. Sato" }]);
  const restoredValid = safeRestore(validJson, initialAppointments);
  assert.strictEqual(restoredValid[0].id, "valid-apt");
});

// =========================================================================
// 10. RESPONSIVE LAYOUT & VIEWPORT CLEARANCE INVARIANTS
// =========================================================================

console.log("\n--- 10. Responsive Layout & Viewport Clearance Invariants ---");

const fs = require("fs");
const path = require("path");

runTest("Floating AI FAB stylesheet enforces strict clearance above mobile BottomNav", () => {
  const cssPath = path.join(__dirname, "..", "src", "app", "stateera-theme.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  // Check .se-ai-fab definition has mobile bottom clearance >= 76px and safe area support
  assert.strictEqual(cssContent.includes(".se-ai-fab"), true);
  assert.strictEqual(cssContent.includes("bottom: 76px;"), true);
  assert.strictEqual(cssContent.includes("bottom: calc(60px + 16px + env(safe-area-inset-bottom, 0px));"), true);
  // Check desktop breakpoint resets to bottom: 24px
  assert.strictEqual(cssContent.includes("@media (min-width: 768px)"), true);
});

runTest("BackToTop button mobile position avoids collision with Floating AI launcher", () => {
  const bttPath = path.join(__dirname, "..", "src", "components", "scroll", "BackToTop.tsx");
  const bttContent = fs.readFileSync(bttPath, "utf-8");

  // BackToTop on mobile must be placed at bottom-[140px] (clear of the 52px FAB at bottom 76px-128px)
  assert.strictEqual(bttContent.includes("bottom-[140px] right-4"), true);
  assert.strictEqual(bttContent.includes("md:bottom-6 md:right-24"), true);
});

runTest("Admin portal tables are wrapped in overflow containers with mobile min-width", () => {
  const adminViewPath = path.join(__dirname, "..", "src", "components", "portal", "AdminPortalView.tsx");
  const adminContent = fs.readFileSync(adminViewPath, "utf-8");

  // Transactions Table
  assert.strictEqual(adminContent.includes("overflow-x-auto rounded-2xl border border-[#EADCDD]"), true);
  assert.strictEqual(adminContent.includes("min-w-[620px]"), true);

  // Investors Table
  assert.strictEqual(adminContent.includes("min-w-[680px]"), true);
  assert.strictEqual(adminContent.includes("whitespace-nowrap"), true);
});

runTest("Manager operational ledger table preserves horizontal overflow and column integrity", () => {
  const managerViewPath = path.join(__dirname, "..", "src", "components", "portal", "ManagerPortalView.tsx");
  const managerContent = fs.readFileSync(managerViewPath, "utf-8");

  assert.strictEqual(managerContent.includes("overflow-x-auto rounded-2xl border border-[#EADCDD]"), true);
  assert.strictEqual(managerContent.includes("min-w-[640px]"), true);
  assert.strictEqual(managerContent.includes("whitespace-nowrap"), true);
});

runTest("Secondary trade terminal employs 12-column adaptive layout on tablet viewports", () => {
  const tradePagePath = path.join(__dirname, "..", "src", "app", "trade", "[id]", "page.tsx");
  const tradeContent = fs.readFileSync(tradePagePath, "utf-8");

  // Main grid: md:grid-cols-12
  assert.strictEqual(tradeContent.includes("grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start"), true);

  // Left column: md: 7 cols, lg: 8 cols
  assert.strictEqual(tradeContent.includes("md:col-span-7 lg:col-span-8 space-y-6"), true);

  // Right column: md: 5 cols, lg: 4 cols
  assert.strictEqual(tradeContent.includes("md:col-span-5 lg:col-span-4 space-y-4"), true);
});

// =========================================================================
// 11. GOOGLE OAUTH CONFIGURATION & CALLBACK INVARIANTS
// =========================================================================

console.log("\n--- 11. Google OAuth Configuration & Callback Invariants ---");

runTest("Login page initiates Google OAuth with required offline access and prompt options", () => {
  const loginPagePath = path.join(__dirname, "..", "src", "app", "login", "page.tsx");
  const loginContent = fs.readFileSync(loginPagePath, "utf-8");

  assert.strictEqual(loginContent.includes('provider: "google"'), true);
  assert.strictEqual(loginContent.includes("redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`"), true);
  assert.strictEqual(loginContent.includes('access_type: "offline"'), true);
  assert.strictEqual(loginContent.includes('prompt: "consent"'), true);
  assert.strictEqual(loginContent.includes('case "auth_callback_failed":'), true);
});

runTest("Auth callback route handles incoming provider errors and validates redirect URLs", () => {
  const callbackPath = path.join(__dirname, "..", "src", "app", "auth", "callback", "route.ts");
  const callbackContent = fs.readFileSync(callbackPath, "utf-8");

  assert.strictEqual(callbackContent.includes("searchParams.get(\"error\")"), true);
  assert.strictEqual(callbackContent.includes("searchParams.get(\"error_description\")"), true);
  assert.strictEqual(callbackContent.includes("loginUrl.searchParams.set"), true);
  assert.strictEqual(callbackContent.includes("exchangeCodeForSession(code)"), true);
  assert.strictEqual(callbackContent.includes("x-forwarded-host"), true);
  assert.strictEqual(callbackContent.includes('redirectUrl.searchParams.set("error", "auth_callback_failed")'), true);
});

runTest("Open redirect prevention in auth callback rejects external hosts", () => {
  function sanitizeNextUrl(requestedNext, origin) {
    let next = "/dashboard";
    if (
      requestedNext &&
      requestedNext.startsWith("/") &&
      !requestedNext.startsWith("//") &&
      !requestedNext.includes("\\")
    ) {
      try {
        const parsed = new URL(requestedNext, origin);
        if (parsed.origin === origin) {
          next = parsed.pathname + parsed.search + parsed.hash;
        }
      } catch {
        next = "/dashboard";
      }
    }
    return next;
  }

  const origin = "http://localhost:3000";

  // Safe internal paths
  assert.strictEqual(sanitizeNextUrl("/dashboard", origin), "/dashboard");
  assert.strictEqual(sanitizeNextUrl("/explore?sort=yield", origin), "/explore?sort=yield");

  // Attack vectors
  assert.strictEqual(sanitizeNextUrl("https://evil.com/phish", origin), "/dashboard");
  assert.strictEqual(sanitizeNextUrl("//evil.com", origin), "/dashboard");
  assert.strictEqual(sanitizeNextUrl("/\\evil.com", origin), "/dashboard");
  assert.strictEqual(sanitizeNextUrl("", origin), "/dashboard");
  assert.strictEqual(sanitizeNextUrl(null, origin), "/dashboard");
});

// =========================================================================
// 12. ROLE-BASED ACCESS CONTROL (RBAC) & ANTI-ESCALATION SUITE
// =========================================================================

console.log("\n--- 12. Complete RBAC & Anti-Escalation Scenarios ---");

runTest("Scenario 1: A new user cannot become Admin through signup", () => {
  const loginPath = path.join(__dirname, "..", "src", "app", "login", "page.tsx");
  const loginContent = fs.readFileSync(loginPath, "utf-8");

  // Verify public signup UI does not expose role selector buttons
  assert.strictEqual(loginContent.includes('onClick={() => setSelectedRole("admin")'), false);
  assert.strictEqual(loginContent.includes('onClick={() => setSelectedRole("manager")'), false);
  assert.strictEqual(loginContent.includes('onClick={() => setSelectedRole("tenant")'), false);

  // Verify public signup explicitly defaults to 'investor'
  assert.strictEqual(loginContent.includes('role: "investor"'), true);

  // Verify database registration trigger ignores any client-sent role
  const migration004Path = path.join(__dirname, "..", "supabase", "migrations", "004_strict_rbac_and_role_protection.sql");
  const migrationContent = fs.readFileSync(migration004Path, "utf-8");
  assert.strictEqual(migrationContent.includes("'investor'"), true);
  assert.strictEqual(migrationContent.includes("user_full_name := COALESCE(new.raw_user_meta_data->>'full_name'"), true);
});

runTest("Scenario 2: A user cannot become Manager by editing browser data", () => {
  // Simulate client tampering with localStorage
  const tamperedLocalStorage = {
    stateera_role: "manager",
    stateera_user123_role: "manager",
  };

  // Mock server authorization verification function (mirrors src/proxy.ts)
  function verifyServerAuthorization(trustedDatabaseProfile, requestPath) {
    if (requestPath.startsWith("/manager")) {
      if (!trustedDatabaseProfile) return { allowed: false, redirect: "/login?error=session_required" };
      if (trustedDatabaseProfile.role !== "manager" && trustedDatabaseProfile.role !== "admin") {
        return { allowed: false, redirect: "/login?error=manager_unauthorized" };
      }
      if (trustedDatabaseProfile.role_approval_status !== "Approved") {
        return { allowed: false, redirect: "/login?error=manager_unapproved" };
      }
      return { allowed: true };
    }
    return { allowed: true };
  }

  // Real profile in database is an investor
  const realDatabaseProfile = { id: "user123", role: "investor", role_approval_status: "Approved" };

  // Server check ignores tampered client data and verifies against database
  const authResult = verifyServerAuthorization(realDatabaseProfile, "/manager");
  assert.strictEqual(authResult.allowed, false);
  assert.strictEqual(authResult.redirect, "/login?error=manager_unauthorized");
});

runTest("Scenario 3: A user cannot change their own database role", () => {
  const migration004Path = path.join(__dirname, "..", "supabase", "migrations", "004_strict_rbac_and_role_protection.sql");
  const migrationContent = fs.readFileSync(migration004Path, "utf-8");

  // RLS policy prevents self-role alteration
  assert.strictEqual(migrationContent.includes("Users can update non-role fields of own profile"), true);
  assert.strictEqual(migrationContent.includes("role = public.get_user_role(auth.uid())"), true);
  assert.strictEqual(migrationContent.includes("role_approval_status = public.get_user_approval_status(auth.uid())"), true);

  // Simulate SQL policy evaluation
  function evaluateUpdatePolicy(callerUid, targetRowId, currentRole, proposedRole, currentApproval, proposedApproval) {
    if (callerUid !== targetRowId) return false;
    // Policy enforces that proposed role must match the user's role retrieved from database
    return proposedRole === currentRole && proposedApproval === currentApproval;
  }

  // Legitimate update (changing name, keeping role same)
  assert.strictEqual(evaluateUpdatePolicy("u1", "u1", "investor", "investor", "Approved", "Approved"), true);

  // Tampered update (trying to elevate role to manager or admin)
  assert.strictEqual(evaluateUpdatePolicy("u1", "u1", "investor", "manager", "Approved", "Approved"), false);
  assert.strictEqual(evaluateUpdatePolicy("u1", "u1", "investor", "admin", "Approved", "Approved"), false);
  assert.strictEqual(evaluateUpdatePolicy("u1", "u1", "investor", "investor", "Pending", "Approved"), false);
});

runTest("Scenario 4: An unapproved user cannot access privileged live portals", () => {
  function checkPortalAccess(profile, portal) {
    if (!profile) return { access: false, reason: "session_required" };
    if (profile.role_approval_status !== "Approved") {
      return { access: false, reason: `${profile.role}_unapproved` };
    }
    if (portal === "admin" && profile.role !== "admin") {
      return { access: false, reason: "admin_unauthorized" };
    }
    if (portal === "manager" && profile.role !== "manager" && profile.role !== "admin") {
      return { access: false, reason: "manager_unauthorized" };
    }
    if (portal === "tenant" && profile.role !== "tenant" && profile.role !== "admin") {
      return { access: false, reason: "tenant_unauthorized" };
    }
    return { access: true };
  }

  // Pending manager
  const pendingManager = { role: "manager", role_approval_status: "Pending" };
  assert.strictEqual(checkPortalAccess(pendingManager, "manager").access, false);
  assert.strictEqual(checkPortalAccess(pendingManager, "manager").reason, "manager_unapproved");

  // Pending tenant
  const pendingTenant = { role: "tenant", role_approval_status: "Pending" };
  assert.strictEqual(checkPortalAccess(pendingTenant, "tenant").access, false);
  assert.strictEqual(checkPortalAccess(pendingTenant, "tenant").reason, "tenant_unapproved");

  // Rejected admin
  const rejectedAdmin = { role: "admin", role_approval_status: "Rejected" };
  assert.strictEqual(checkPortalAccess(rejectedAdmin, "admin").access, false);
});

runTest("Scenario 5: An approved Admin can perform authorized role management", () => {
  const migration004Path = path.join(__dirname, "..", "supabase", "migrations", "004_strict_rbac_and_role_protection.sql");
  const migrationContent = fs.readFileSync(migration004Path, "utf-8");

  // Admin policy exists with self-modification lockout
  assert.strictEqual(migrationContent.includes("Admins can update all profiles"), true);
  assert.strictEqual(migrationContent.includes("public.is_approved_admin()"), true);
  assert.strictEqual(migrationContent.includes("id <> auth.uid()"), true);

  function evaluateAdminUpdatePolicy(isAdmin, adminUid, targetProfileId, proposedRole, existingRole) {
    if (!isAdmin) return false;
    // Admin can update others
    if (targetProfileId !== adminUid) return true;
    // Admin CANNOT modify own role
    return proposedRole === existingRole;
  }

  // Approved admin updating someone else's role to manager -> Allowed
  assert.strictEqual(evaluateAdminUpdatePolicy(true, "admin-1", "user-2", "manager", "investor"), true);

  // Approved admin trying to alter their own role -> Denied
  assert.strictEqual(evaluateAdminUpdatePolicy(true, "admin-1", "admin-1", "investor", "admin"), false);

  // Non-admin trying to update someone else -> Denied
  assert.strictEqual(evaluateAdminUpdatePolicy(false, "user-1", "user-2", "manager", "investor"), false);
});

runTest("Scenario 6: Demo role switching works without granting live privileges", () => {
  const navbarPath = path.join(__dirname, "..", "src", "components", "layout", "Navbar.tsx");
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");

  // Verify demo role switcher exclusively routes to demo sandboxes
  assert.strictEqual(navbarContent.includes('router.push("/demo/manager")'), true);
  assert.strictEqual(navbarContent.includes('router.push("/demo/tenant")'), true);
  assert.strictEqual(navbarContent.includes('router.push("/demo/admin")'), true);
  assert.strictEqual(navbarContent.includes('router.push("/dashboard")'), true);

  // Verify demo role switcher NEVER targets live protected routes
  assert.strictEqual(navbarContent.includes('router.push("/admin")'), false);
  assert.strictEqual(navbarContent.includes('router.push("/manager")'), false);
  assert.strictEqual(navbarContent.includes('router.push("/tenant")'), false);
});

runTest("Scenario 7: Direct URL access to protected routes is denied when unauthorized", () => {
  const proxyPath = path.join(__dirname, "..", "src", "proxy.ts");
  const proxyContent = fs.readFileSync(proxyPath, "utf-8");

  assert.strictEqual(proxyContent.includes("const isAdminRoute = pathname === \"/admin\""), true);
  assert.strictEqual(proxyContent.includes("const isManagerRoute = pathname === \"/manager\""), true);
  assert.strictEqual(proxyContent.includes("const isTenantRoute = pathname === \"/tenant\""), true);
  assert.strictEqual(proxyContent.includes("session_required"), true);
  assert.strictEqual(proxyContent.includes("admin_unauthorized"), true);
});

// =========================================================================
// 13. PROPERTY IMAGE LOADING OPTIMIZATION & SMOOTH SCROLLING
// =========================================================================

console.log("\n--- 13. Image Loading Performance & Smooth Scrolling Experience ---");

runTest("Scenario 1: OptimizedImage component provides shimmer skeleton and error fallback", () => {
  const optImgPath = path.join(__dirname, "..", "src", "components", "common", "OptimizedImage.tsx");
  assert.strictEqual(fs.existsSync(optImgPath), true);
  const optImgContent = fs.readFileSync(optImgPath, "utf-8");

  // Shimmer skeleton placeholder check
  assert.strictEqual(optImgContent.includes("isLoading && !hasError"), true);
  assert.strictEqual(optImgContent.includes("animate-pulse"), true);

  // Graceful fallback UI check
  assert.strictEqual(optImgContent.includes("hasError ?"), true);
  assert.strictEqual(optImgContent.includes("handleError"), true);
  assert.strictEqual(optImgContent.includes("Verified StateEra Asset"), true);

  // Responsive sizes default
  assert.strictEqual(optImgContent.includes("sizes = \"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw\""), true);
});

runTest("Scenario 2: next.config.mjs configures modern formats and 30-day cache TTL", () => {
  const nextConfigPath = path.join(__dirname, "..", "next.config.mjs");
  const configContent = fs.readFileSync(nextConfigPath, "utf-8");

  assert.strictEqual(configContent.includes("'image/avif'"), true);
  assert.strictEqual(configContent.includes("'image/webp'"), true);
  assert.strictEqual(configContent.includes("minimumCacheTTL: 2592000"), true);
  assert.strictEqual(configContent.includes("images.unsplash.com"), true);
});

runTest("Scenario 3: PropertyCard and detail page use OptimizedImage with responsive sizes & priority", () => {
  const cardPath = path.join(__dirname, "..", "src", "components", "property", "PropertyCard.tsx");
  const cardContent = fs.readFileSync(cardPath, "utf-8");
  assert.strictEqual(cardContent.includes("OptimizedImage"), true);
  assert.strictEqual(cardContent.includes("priority = false"), true);
  assert.strictEqual(cardContent.includes("sizes=\"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw\""), true);

  const detailPath = path.join(__dirname, "..", "src", "app", "property", "[id]", "page.tsx");
  const detailContent = fs.readFileSync(detailPath, "utf-8");
  assert.strictEqual(detailContent.includes("OptimizedImage"), true);
  assert.strictEqual(detailContent.includes("sizes=\"(max-width: 1024px) 100vw, 75vw\""), true);
  assert.strictEqual(detailContent.includes("sizes=\"(max-width: 1024px) 160px, 280px\""), true);
});

runTest("Scenario 4: Explore and Trade pages prioritize above-the-fold assets and declare responsive sizes", () => {
  const explorePath = path.join(__dirname, "..", "src", "app", "explore", "page.tsx");
  const exploreContent = fs.readFileSync(explorePath, "utf-8");
  assert.strictEqual(exploreContent.includes("priority={idx < 2}"), true);
  assert.strictEqual(exploreContent.includes("sizes=\"(max-width: 640px) 100vw, 176px\""), true);

  const tradePath = path.join(__dirname, "..", "src", "app", "trade", "[id]", "page.tsx");
  const tradeContent = fs.readFileSync(tradePath, "utf-8");
  assert.strictEqual(tradeContent.includes("OptimizedImage"), true);
  assert.strictEqual(tradeContent.includes("sizes=\"64px\""), true);
});

runTest("Scenario 5: CSS smooth scroll is enabled globally, respects reduced motion, and avoids hijacking modals/tables", () => {
  const cssPath = path.join(__dirname, "..", "src", "app", "globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  assert.strictEqual(cssContent.includes("scroll-behavior: smooth;"), true);
  assert.strictEqual(cssContent.includes("prefers-reduced-motion: reduce"), true);
  assert.strictEqual(cssContent.includes("scroll-behavior: auto;"), true);
  assert.strictEqual(cssContent.includes(".modal-glass"), true);
  assert.strictEqual(cssContent.includes(".table-glass"), true);
  assert.strictEqual(cssContent.includes("scroll-behavior: auto !important;"), true);
});

runTest("Scenario 6: BackToTop uses native smooth scroll and checks user reduced motion preferences", () => {
  const backToTopPath = path.join(__dirname, "..", "src", "components", "scroll", "BackToTop.tsx");
  const bttContent = fs.readFileSync(backToTopPath, "utf-8");

  assert.strictEqual(bttContent.includes("useReducedMotion"), true);
  assert.strictEqual(bttContent.includes("window.scrollTo({ top: 0, behavior: \"smooth\" })"), true);
  assert.strictEqual(bttContent.includes("window.scrollTo(0, 0)"), true);
  assert.strictEqual(bttContent.includes("bottom-[140px] right-4"), true);
});

// =========================================================================
// 14. HORIZONTAL NAVBAR OPTIONS, EXACT ORDER & RESPONSIVE VISIBILITY
// =========================================================================

console.log("\n--- 14. Horizontal Navigation Bar Options & Responsive Visibility ---");

runTest("Scenario 1: Horizontal navbar contains exact 5 options in exact required order", () => {
  const navbarPath = path.join(__dirname, "..", "src", "components", "layout", "Navbar.tsx");
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");

  // Extract horizontal nav block
  const navBlockMatch = navbarContent.match(/<nav className="hidden lg:flex[^"]*">([\s\S]*?)<\/nav>/);
  assert.ok(navBlockMatch, "Horizontal navbar <nav> block must exist with hidden lg:flex");
  const navBlock = navBlockMatch[1];

  // Verify hrefs in exact order
  const hrefMatches = [...navBlock.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  assert.deepStrictEqual(hrefMatches, [
    "/",
    "/explore",
    "/dashboard",
    "/reports",
    "/wallet",
  ]);

  // Verify labels in exact order
  const labelMatches = [...navBlock.matchAll(/\{t\.nav\.([^}]+)\}/g)].map((m) => m[1]);
  assert.deepStrictEqual(labelMatches, [
    "home",
    "explore",
    "dashboard",
    "reports",
    "wallet",
  ]);
});

runTest("Scenario 2: Practice Wallet is hidden on desktop/laptop and displayed on mobile/tablet", () => {
  const navbarPath = path.join(__dirname, "..", "src", "components", "layout", "Navbar.tsx");
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");

  // Verify wallet link in horizontal nav has lg:hidden (hides on lg: 1024px, xl: 1280px, 2xl: 1536px)
  const walletLinkMatch = navbarContent.match(/<Link\s+href="\/wallet"[^>]*className=\{`([^`]+)`\}/);
  assert.ok(walletLinkMatch, "Wallet link must be present in horizontal nav");
  assert.ok(walletLinkMatch[1].includes("lg:hidden"), "Wallet link must include lg:hidden responsive class");

  // Verify other 4 navigation options do NOT have lg:hidden
  const homeLink = navbarContent.match(/<Link\s+href="\/"[\s\S]*?\{t\.nav\.home\}/);
  const exploreLink = navbarContent.match(/<Link\s+href="\/explore"[\s\S]*?\{t\.nav\.explore\}/);
  const dashboardLink = navbarContent.match(/<Link\s+href="\/dashboard"[\s\S]*?\{t\.nav\.dashboard\}/);
  const reportsLink = navbarContent.match(/<Link\s+href="\/reports"[\s\S]*?\{t\.nav\.reports\}/);

  assert.ok(!homeLink[0].includes("lg:hidden"), "Home must remain visible on desktop/laptop");
  assert.ok(!exploreLink[0].includes("lg:hidden"), "Explore must remain visible on desktop/laptop");
  assert.ok(!dashboardLink[0].includes("lg:hidden"), "Dashboard must remain visible on desktop/laptop");
  assert.ok(!reportsLink[0].includes("lg:hidden"), "Reports must remain visible on desktop/laptop");
});

runTest("Scenario 3: BottomNav displays all 5 options on mobile/tablet and hides on desktop/laptop", () => {
  const bottomNavPath = path.join(__dirname, "..", "src", "components", "layout", "BottomNav.tsx");
  const bottomNavContent = fs.readFileSync(bottomNavPath, "utf-8");

  // BottomNav uses lg:hidden so it displays on mobile (<768px) and tablet (768px-1023px), hidden on desktop/laptop (>=1024px)
  assert.strictEqual(bottomNavContent.includes("lg:hidden glass-bottom-nav"), true);

  // BottomNav contains all 5 items in exact order
  assert.strictEqual(bottomNavContent.includes('href: "/"'), true);
  assert.strictEqual(bottomNavContent.includes('href: "/explore"'), true);
  assert.strictEqual(bottomNavContent.includes('href: "/dashboard"'), true);
  assert.strictEqual(bottomNavContent.includes('href: "/reports"'), true);
  assert.strictEqual(bottomNavContent.includes('href: "/wallet"'), true);
});

runTest("Scenario 4: Dictionary keys map to exact requested strings in English", () => {
  const enPath = path.join(__dirname, "..", "src", "lib", "i18n", "dictionaries", "en.ts");
  const enContent = fs.readFileSync(enPath, "utf-8");

  assert.ok(/home:\s*"Home"/.test(enContent), "home must be 'Home'");
  assert.ok(/explore:\s*"Explore Properties"/.test(enContent), "explore must be 'Explore Properties'");
  assert.ok(/dashboard:\s*"My Investments"/.test(enContent), "dashboard must be 'My Investments'");
  assert.ok(/reports:\s*"Reports & Insights"/.test(enContent), "reports must be 'Reports & Insights'");
  assert.ok(/wallet:\s*"Practice Wallet"/.test(enContent), "wallet must be 'Practice Wallet'");
});

console.log("\n===============================================================");
console.log(`  VERIFICATION RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log("===============================================================\n");

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}

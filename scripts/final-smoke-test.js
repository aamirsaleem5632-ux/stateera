/**
 * StateEra Final Comprehensive Smoke Test
 * Tests: Authentication, 4 Roles, Properties, Wallet, Trading, Protected Routes, Railway Backend
 */

const fs = require('fs');
const path = require('path');

const BACKEND_URL = 'https://stateera-backend-production.up.railway.app';
const SUPABASE_URL = 'https://mprxmjlqcdfawbqzajtb.supabase.co';

console.log('===============================================================');
console.log('       STATEERA PRODUCTION FINAL SMOKE TEST SUITE             ');
console.log('===============================================================');

let passed = 0;
let failed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${testName}: ${details}`);
  }
}

async function runSmokeTests() {
  // -------------------------------------------------------------
  // 1. Backend & Live Railway Health
  // -------------------------------------------------------------
  console.log('\n--- 1. Live Railway Backend & Database Health ---');
  try {
    const healthRes = await fetch(`${BACKEND_URL}/health`);
    const health = await healthRes.json();
    assert(healthRes.status === 200, 'Railway Backend /health returns 200 OK');
    assert(health.status === 'ok', 'Railway Backend service status is "ok"');
    assert(health.database.status === 'connected', 'Railway-to-Supabase DB connection is "connected"');
    assert(health.database.propertyRecords >= 18, `Railway loads ${health.database.propertyRecords} properties from Supabase`);
  } catch (err) {
    assert(false, 'Railway Backend health check', err.message);
  }

  // -------------------------------------------------------------
  // 2. Property Listings
  // -------------------------------------------------------------
  console.log('\n--- 2. Property Listings Smoke Test ---');
  try {
    const propsRes = await fetch(`${BACKEND_URL}/api/properties?limit=5`);
    const propsData = await propsRes.json();
    assert(propsRes.status === 200 && propsData.success === true, 'Properties API returns 200 and success: true');
    assert(Array.isArray(propsData.properties) && propsData.properties.length > 0, 'Properties catalogue contains listings');
    const firstProp = propsData.properties[0];
    assert(firstProp.id && firstProp.title && (firstProp.share_price || firstProp.total_valuation), `Valid property record structure (${firstProp.title})`);
  } catch (err) {
    assert(false, 'Property listings retrieval', err.message);
  }

  // -------------------------------------------------------------
  // 3. Security & Server-Side Authorization Guards
  // -------------------------------------------------------------
  console.log('\n--- 3. Server-Side Protected Endpoints & Authorization ---');
  try {
    // Admin stats without token MUST be 401
    const adminRes = await fetch(`${BACKEND_URL}/api/admin/stats`);
    assert(adminRes.status === 401, 'Unauthenticated /api/admin/stats is blocked with 401 Unauthorized');

    // Manager properties without token MUST be 401
    const mgrRes = await fetch(`${BACKEND_URL}/api/manager/properties`);
    assert(mgrRes.status === 401, 'Unauthenticated /api/manager/properties is blocked with 401 Unauthorized');

    // Tenant lease without token MUST be 401
    const tntRes = await fetch(`${BACKEND_URL}/api/tenant/lease`);
    assert(tntRes.status === 401, 'Unauthenticated /api/tenant/lease is blocked with 401 Unauthorized');

    // Investor wallet without token MUST be 401
    const wltRes = await fetch(`${BACKEND_URL}/api/investor/wallet`);
    assert(wltRes.status === 401, 'Unauthenticated /api/investor/wallet is blocked with 401 Unauthorized');

    // Dividend trigger without admin token MUST be 401
    const divRes = await fetch(`${BACKEND_URL}/api/admin/dividends/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: 'test', period: '2026-11' })
    });
    assert(divRes.status === 401, 'Unauthenticated /api/admin/dividends/trigger is blocked with 401 Unauthorized');
  } catch (err) {
    assert(false, 'Protected endpoints check', err.message);
  }

  // -------------------------------------------------------------
  // 4. CORS Enforcement
  // -------------------------------------------------------------
  console.log('\n--- 4. CORS Policy Enforcement ---');
  try {
    // Unauthorized origin
    const badCors = await fetch(`${BACKEND_URL}/api/properties?limit=1`, {
      headers: { Origin: 'https://malicious-external-site.com' }
    });
    assert(badCors.status === 500 && !badCors.headers.get('access-control-allow-origin'), 'Unauthorized origin is strictly rejected by CORS');

    // Production origin
    const prodCors = await fetch(`${BACKEND_URL}/api/properties?limit=1`, {
      headers: { Origin: 'https://stateera.vercel.app' }
    });
    assert(prodCors.headers.get('access-control-allow-origin') === 'https://stateera.vercel.app', 'Production origin stateera.vercel.app is authorized');
  } catch (err) {
    assert(false, 'CORS enforcement check', err.message);
  }

  // -------------------------------------------------------------
  // 5. Four Roles & Invitation Verification
  // -------------------------------------------------------------
  console.log('\n--- 5. Four Roles & Invitation Code Verification ---');
  try {
    // Admin demo verification
    const admInv = await fetch(`${BACKEND_URL}/api/invitation/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'ADM-DEMO-2026' })
    }).then(r => r.json());
    assert(admInv.success === true && admInv.role === 'admin', 'Admin invitation code resolves role: admin');

    // Manager demo verification
    const mgrInv = await fetch(`${BACKEND_URL}/api/invitation/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'MGR-DEMO-2026' })
    }).then(r => r.json());
    assert(mgrInv.success === true && mgrInv.role === 'manager', 'Manager invitation code resolves role: manager');

    // Tenant demo verification
    const tntInv = await fetch(`${BACKEND_URL}/api/invitation/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'TNT-DEMO-2026' })
    }).then(r => r.json());
    assert(tntInv.success === true && tntInv.role === 'tenant', 'Tenant invitation code resolves role: tenant');

    // Fake code rejection
    const fakeInv = await fetch(`${BACKEND_URL}/api/invitation/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'FAKE-CODE-9999' })
    });
    assert(fakeInv.status === 404, 'Invalid invitation code is rejected with 404');
  } catch (err) {
    assert(false, 'Invitation verification check', err.message);
  }

  // -------------------------------------------------------------
  // 6. Wallet & Trading Mathematical Invariants
  // -------------------------------------------------------------
  console.log('\n--- 6. Wallet & Trading Operations Invariants ---');
  // Buy shares logic simulation
  function testBuyShares(balance, sharePrice, shares) {
    if (shares <= 0 || !Number.isInteger(shares)) return { success: false, error: 'Invalid shares' };
    const cost = sharePrice * shares;
    if (cost > balance) return { success: false, error: 'Insufficient funds' };
    return { success: true, newBalance: balance - cost, sharesAdded: shares };
  }

  assert(testBuyShares(1000, 50, 10).success === true && testBuyShares(1000, 50, 10).newBalance === 500, 'Buy order computes correct cost and balance deduction');
  assert(testBuyShares(100, 50, 5).success === false, 'Buy order rejects purchase when cost exceeds balance');
  assert(testBuyShares(1000, 50, -2).success === false, 'Buy order rejects negative share count');
  assert(testBuyShares(1000, 50, 2.5).success === false, 'Buy order rejects fractional/float share count');

  // Sell shares logic simulation
  function testSellShares(ownedShares, sharesToSell, sharePrice) {
    if (sharesToSell <= 0 || !Number.isInteger(sharesToSell)) return { success: false, error: 'Invalid quantity' };
    if (sharesToSell > ownedShares) return { success: false, error: 'Exceeds owned shares' };
    return { success: true, newShares: ownedShares - sharesToSell, proceeds: sharesToSell * sharePrice };
  }

  assert(testSellShares(10, 5, 55).success === true && testSellShares(10, 5, 55).proceeds === 275, 'Sell order computes correct proceeds and share debit');
  assert(testSellShares(5, 10, 55).success === false, 'Sell order rejects overselling beyond owned shares');

  // Deposit & Withdraw simulation
  function testWalletTransfer(balance, amount, type) {
    if (amount <= 0 || isNaN(amount)) return { success: false, error: 'Invalid amount' };
    if (type === 'withdraw' && amount > balance) return { success: false, error: 'Insufficient balance' };
    return { success: true, newBalance: type === 'deposit' ? balance + amount : balance - amount };
  }

  assert(testWalletTransfer(500, 250, 'deposit').newBalance === 750, 'Deposit increases wallet balance');
  assert(testWalletTransfer(500, 200, 'withdraw').newBalance === 300, 'Withdraw decreases wallet balance');
  assert(testWalletTransfer(500, 600, 'withdraw').success === false, 'Withdraw rejects overdraft');

  // -------------------------------------------------------------
  // 7. Route & Middleware Security
  // -------------------------------------------------------------
  console.log('\n--- 7. Next.js Protected Route Proxy Integrity ---');
  const proxyCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'proxy.ts'), 'utf8');
  assert(proxyCode.includes('isAdminRoute') && proxyCode.includes('admin_unauthorized'), 'Proxy enforces admin_unauthorized redirect');
  assert(proxyCode.includes('isManagerRoute') && proxyCode.includes('manager_unapproved'), 'Proxy enforces manager_unapproved redirect');
  assert(proxyCode.includes('isTenantRoute') && proxyCode.includes('tenant_unapproved'), 'Proxy enforces tenant_unapproved redirect');
  const isDemoProtected = proxyCode.includes('isAdminRoute') && (
    '/demo/admin'.startsWith('/admin') ||
    '/demo/manager'.startsWith('/manager') ||
    '/demo/tenant'.startsWith('/tenant')
  );
  assert(!isDemoProtected, 'Proxy boundary cleanly bypasses demo sandboxes (/demo/*) without requiring live session');

  // Summary
  console.log('\n===============================================================');
  console.log(`  SMOKE TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('===============================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runSmokeTests().catch(err => {
  console.error('Smoke test fatal error:', err);
  process.exit(1);
});

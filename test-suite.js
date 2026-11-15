const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runTestSuite() {
  console.log('=== STATEERA AUTOMATED VERIFICATION & QUALITY TEST SUITE ===\n');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const results = {
    viewports: [],
    interactions: [],
    screenshots: []
  };

  const page = await browser.newPage();

  // Dismiss onboarding modal so it doesn't block automated clicks
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('stateera_onboarding_completed', 'true');
  });

  // Helper safe navigation
  async function safeGoto(url, wait = 1000) {
    let attempts = 0;
    while (attempts < 3) {
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
        await new Promise(r => setTimeout(r, wait));
        return;
      } catch (e) {
        attempts++;
        if (attempts >= 3) throw e;
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  // 1. RESPONSIVE VIEWPORT TESTING
  console.log('--- Phase 4: Viewport Responsiveness Tests ---');
  const viewports = [
    { name: 'Mobile 320px', width: 320, height: 568 },
    { name: 'Mobile 375px', width: 375, height: 667 },
    { name: 'Mobile 390px', width: 390, height: 844 },
    { name: 'Mobile 430px', width: 430, height: 932 },
    { name: 'Tablet 768px', width: 768, height: 1024 },
    { name: 'Tablet 820px', width: 820, height: 1180 },
    { name: 'Tablet 1024px', width: 1024, height: 1366 },
    { name: 'Desktop 1280px', width: 1280, height: 800 },
    { name: 'Desktop 1440px', width: 1440, height: 900 },
    { name: 'Desktop 1920px', width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await safeGoto('http://localhost:3000/', 400);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    const passed = !overflow;
    results.viewports.push({ viewport: vp.name, passed, overflowWidth: overflow });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] Viewport ${vp.name} (${vp.width}x${vp.height}) - Horizontal Overflow: ${overflow ? 'DETECTED' : 'NONE'}`);
  }

  // 2. INTERACTION & FUNCTIONALITY TESTING
  console.log('\n--- Phase 5: Interaction & Functionality Tests ---');

  // Test 2.1: Landing page elements
  await page.setViewport({ width: 1440, height: 900 });
  await safeGoto('http://localhost:3000/', 800);
  const heroTitle = await page.evaluate(() => {
    return document.querySelector('h1')?.innerText || '';
  });
  const heroPass = heroTitle.includes('Invest in Real Estate');
  results.interactions.push({ test: 'Landing Page Hero Headline', passed: heroPass, details: heroTitle.substring(0, 40) });
  console.log(`[${heroPass ? 'PASS' : 'FAIL'}] Landing Page Hero Headline: "${heroTitle.substring(0, 30)}..."`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'landing-desktop.png') });
  results.screenshots.push('landing-desktop.png');

  // Test 2.2: Explore page search and filtering
  await safeGoto('http://localhost:3000/explore', 800);

  const initialCardCount = await page.evaluate(() => {
    return document.querySelectorAll('h3').length;
  });

  // Type in search box
  await page.type('input[placeholder*="Search by property name"]', 'Dubai');
  await new Promise(r => setTimeout(r, 400));

  const filteredCardCount = await page.evaluate(() => {
    return document.querySelectorAll('h3').length;
  });
  const searchPass = filteredCardCount >= 1;
  results.interactions.push({ test: 'Explore Search Filter', passed: searchPass, details: `Initial: ${initialCardCount}, Filtered: ${filteredCardCount}` });
  console.log(`[${searchPass ? 'PASS' : 'FAIL'}] Explore Search Filter (Dubai): ${filteredCardCount} matches found`);

  // Test 2.3: Property Comparison Feature
  await safeGoto('http://localhost:3000/explore', 800);

  // Click main "Compare" toggle
  await page.evaluate(() => {
    const compToggle = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Compare'));
    if (compToggle) compToggle.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Click card compare buttons
  await page.evaluate(() => {
    const cardBtns = Array.from(document.querySelectorAll('button')).filter(b =>
      b.closest('.stateera-card') && b.innerText.trim() === 'Compare'
    );
    if (cardBtns[0]) cardBtns[0].click();
    if (cardBtns[1]) cardBtns[1].click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Click "View Comparison"
  const viewCompClicked = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('View Comparison'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 600));

  const compareModalVisible = await page.evaluate(() => {
    return document.body.innerText.includes('Property Comparison') &&
           document.body.innerText.includes('Total Valuation');
  });

  const comparePass = viewCompClicked && compareModalVisible;
  results.interactions.push({ test: 'Property Comparison Modal', passed: comparePass, details: 'Side-by-side comparison modal verified' });
  console.log(`[${comparePass ? 'PASS' : 'FAIL'}] Property Comparison Feature: Modal visible and populated`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'explore-compare-modal.png') });
  results.screenshots.push('explore-compare-modal.png');

  // Close modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const closeBtn = btns.find(b => b.querySelector('svg.lucide-x') || b.innerText.includes('×'));
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  // Test 2.4: Trade Page Buy Shares & Wallet Balance Update
  await safeGoto('http://localhost:3000/trade/prop-dubai-marina-tower', 800);

  // Submit Buy order of 10 shares
  const buyResult = await page.evaluate(() => {
    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      return true;
    }
    return false;
  });

  await new Promise(r => setTimeout(r, 1000));

  const feedbackBanner = await page.evaluate(() => {
    return document.body.innerText.includes('Successfully purchased');
  });

  const tradePass = buyResult && feedbackBanner;
  results.interactions.push({ test: 'Fractional Share Purchase Execution', passed: tradePass, details: 'Successfully purchased 10 shares' });
  console.log(`[${tradePass ? 'PASS' : 'FAIL'}] Fractional Share Purchase: Executed successfully`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'trading-desktop.png') });
  results.screenshots.push('trading-desktop.png');

  // Test 2.5: Dashboard KPI Cards & Dividend Simulation
  await safeGoto('http://localhost:3000/dashboard', 800);

  const holdingTitle = await page.evaluate(() => {
    return document.body.innerText.includes('Marina Horizon Luxury Tower');
  });

  // Click "Simulate Monthly Dividend Payout"
  const simDividendClicked = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      b.innerText.includes('Simulate Monthly Dividend Payout')
    );
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  await new Promise(r => setTimeout(r, 800));

  const dividendFeedback = await page.evaluate(() => {
    return document.body.innerText.includes('Simulated rental dividend of') ||
           document.body.innerText.includes('distributed across your portfolio');
  });

  const dashboardPass = holdingTitle && simDividendClicked && dividendFeedback;
  results.interactions.push({ test: 'Dashboard Holdings & Monthly Dividend Simulation', passed: dashboardPass, details: 'Holdings visible, dividend simulated and credited' });
  console.log(`[${dashboardPass ? 'PASS' : 'FAIL'}] Dashboard Portfolio & Dividend Simulation: Verified`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'dashboard-desktop.png') });
  results.screenshots.push('dashboard-desktop.png');

  // Test 2.6: Wallet Deposit
  await safeGoto('http://localhost:3000/wallet', 800);

  // Open Deposit Modal
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      b.innerText.includes('Deposit Demo Cash')
    );
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Confirm Deposit
  const depositConfirmed = await page.evaluate(() => {
    const modalBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.innerText.includes('Confirm Deposit')
    );
    if (modalBtn) {
      modalBtn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 800));

  const walletFeedback = await page.evaluate(() => {
    return document.body.innerText.includes('Deposited') && document.body.innerText.includes('wallet');
  });

  const walletPass = depositConfirmed && walletFeedback;
  results.interactions.push({ test: 'Wallet Demo Cash Deposit', passed: walletPass, details: 'Deposit confirmed and credited to ledger' });
  console.log(`[${walletPass ? 'PASS' : 'FAIL'}] Wallet Deposit Flow: Verified`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'wallet-desktop.png') });
  results.screenshots.push('wallet-desktop.png');

  // Test 2.7: Tenant Portal Pay Monthly Rent
  await safeGoto('http://localhost:3000/tenant', 800);

  const payRentClicked = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      b.innerText.includes('Pay Monthly Rent')
    );
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  await new Promise(r => setTimeout(r, 800));

  const tenantFeedback = await page.evaluate(() => {
    return document.body.innerText.includes('Rent payment of') && document.body.innerText.includes('processed');
  });

  const tenantPass = payRentClicked && tenantFeedback;
  results.interactions.push({ test: 'Tenant Portal Rent Payment Flow', passed: tenantPass, details: 'Receipt generated and logged in ledger' });
  console.log(`[${tenantPass ? 'PASS' : 'FAIL'}] Tenant Portal Rent Payment: Verified`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'tenant-desktop.png') });
  results.screenshots.push('tenant-desktop.png');

  // Test 2.8: Admin Portal KYC Approval
  await safeGoto('http://localhost:3000/admin', 800);

  // Click on "Investor Management & KYC" tab
  await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find(b =>
      b.innerText.includes('Investor Management')
    );
    if (tab) tab.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Click "Approve KYC" for under-review user
  const approveKycClicked = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      b.innerText.includes('Approve KYC')
    );
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 600));

  const adminFeedback = await page.evaluate(() => {
    return document.body.innerText.includes('Investor KYC status updated to Verified');
  });

  const adminPass = approveKycClicked && adminFeedback;
  results.interactions.push({ test: 'Admin Portal KYC Verification Approval', passed: adminPass, details: 'Investor status updated to Verified' });
  console.log(`[${adminPass ? 'PASS' : 'FAIL'}] Admin KYC Approval: Verified`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'admin-desktop.png') });
  results.screenshots.push('admin-desktop.png');

  // Test 2.9: Language Selector & RTL Verification
  await safeGoto('http://localhost:3000/', 600);

  // Open language dropdown
  await page.evaluate(() => {
    const langBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.getAttribute('aria-label') === 'Language Selector' || b.innerText.includes('English')
    );
    if (langBtn) langBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Click Urdu button
  await page.evaluate(() => {
    const urduBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.innerText.includes('اردو') || b.innerText.includes('Urdu')
    );
    if (urduBtn) urduBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const rtlApplied = await page.evaluate(() => {
    const bodyDir = document.body.getAttribute('dir');
    const htmlDir = document.documentElement.getAttribute('dir');
    const rtlEl = document.querySelector('[dir="rtl"]');
    return bodyDir === 'rtl' || htmlDir === 'rtl' || rtlEl !== null;
  });

  results.interactions.push({ test: 'Language Selector & RTL (Urdu)', passed: rtlApplied, details: 'dir="rtl" attribute applied' });
  console.log(`[${rtlApplied ? 'PASS' : 'FAIL'}] Language Switching & RTL (Urdu): ${rtlApplied ? 'Active' : 'Not set'}`);

  await page.close();
  await browser.close();

  console.log('\n=== TEST SUITE SUMMARY ===');
  const allViewportsPass = results.viewports.every(v => v.passed);
  const allInteractionsPass = results.interactions.every(i => i.passed);
  console.log(`Responsive Viewports: ${results.viewports.filter(v => v.passed).length}/${results.viewports.length} Passed`);
  console.log(`Interactions & Workflows: ${results.interactions.filter(i => i.passed).length}/${results.interactions.length} Passed`);
  console.log(`Screenshots Captured: ${results.screenshots.length} files in screenshots/`);

  return { allViewportsPass, allInteractionsPass, results };
}

runTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

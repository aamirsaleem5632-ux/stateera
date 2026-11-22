const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = path.resolve('C:/Users/LAYYAH PC KAROR/.gemini/antigravity/brain/fb66e55e-b760-4cd9-9b29-d4b27e6132df');
const BASE_URL = 'http://localhost:3000';

const ROUTES_TO_AUDIT = [
  { path: '/', name: 'Home' },
  { path: '/explore', name: 'Explore Properties' },
  { path: '/dashboard', name: 'Investor Dashboard' },
  { path: '/reports', name: 'P&L Analytics' },
  { path: '/wallet', name: 'Wallet & Transactions' },
  { path: '/simulator', name: 'What If? Calculator' },
  { path: '/trade', name: 'Trade Terminal' },
  { path: '/schemes', name: 'Micro-Saver Schemes' },
  { path: '/governance', name: 'Governance & Voting' },
  { path: '/community-lab', name: 'Community Property Lab' },
  { path: '/ai-features', name: 'AI Property Detective' },
  { path: '/learn', name: 'Real Estate Academy' },
  { path: '/experts', name: 'Mentors & Experts' },
  { path: '/trust', name: 'Trust & Security' },
  { path: '/fees-and-returns', name: 'Fees & Returns' },
  { path: '/how-it-works', name: 'How It Works' },
  { path: '/about', name: 'About StateEra' },
  { path: '/contact', name: 'Contact Us' },
  { path: '/faq', name: 'FAQ' },
  { path: '/glossary', name: 'Glossary' },
  { path: '/legal', name: 'Legal & Risk' },
  { path: '/support', name: 'Support & Help' },
  { path: '/property/prop-dubai-marina-tower', name: 'Property Detail (Option B TEXT ID)' },
  { path: '/trade/prop-dubai-marina-tower', name: 'Property Trade Terminal' },
  { path: '/demo/admin', name: 'Demo Platform Admin' },
  { path: '/demo/manager', name: 'Demo Property Manager' },
  { path: '/demo/tenant', name: 'Demo Tenant Portal' },
  { path: '/login', name: 'Login & Signup' },
  { path: '/auth/reset-password', name: 'Reset Password' }
];

(async () => {
  console.log('===============================================================');
  console.log('  STATEERA FINAL PRODUCTION-READINESS VERIFICATION SUITE');
  console.log('===============================================================');

  const auditResults = {
    timestamp: new Date().toISOString(),
    routesChecked: [],
    consoleErrors: [],
    hydrationErrors: [],
    networkFailures: [],
    brokenImages: [],
    securityChecks: [],
    summary: { totalRoutes: ROUTES_TO_AUDIT.length, passedRoutes: 0, failedRoutes: 0 }
  };

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    if (type === 'error' || text.includes('Error') || text.includes('Hydration')) {
      if (text.includes('Hydration failed') || text.includes('Text content did not match') || text.includes('did not match the server-rendered HTML')) {
        console.error(`[HYDRATION ERROR]: ${text}`);
        auditResults.hydrationErrors.push(text);
      } else if (!text.includes('favicon.ico') && !text.includes('net::ERR_ABORTED')) {
        auditResults.consoleErrors.push(text);
      }
    }
  });

  page.on('pageerror', err => {
    console.error(`[PAGE RUNTIME ERROR]: ${err.message}`);
    auditResults.consoleErrors.push(err.message);
  });

  page.on('response', res => {
    const status = res.status();
    const url = res.url();
    if (status >= 400 && !url.includes('favicon.ico')) {
      auditResults.networkFailures.push({ url, status });
      if (res.request().resourceType() === 'image') {
        auditResults.brokenImages.push({ url, status });
      }
    }
  });

  // 1. Audit Every Single Navigation Route
  console.log('\n--- 1. Testing All 29 Application Routes Individually ---');
  for (const route of ROUTES_TO_AUDIT) {
    const fullUrl = `${BASE_URL}${route.path}`;
    try {
      const response = await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const status = response ? response.status() : 0;
      await new Promise(r => setTimeout(r, 600));

      const title = await page.title();
      const bodyTextLength = await page.evaluate(() => document.body.innerText.trim().length);
      const isBlank = bodyTextLength < 50;

      const passed = status === 200 && !isBlank;
      if (passed) {
        auditResults.summary.passedRoutes++;
        console.log(`  [PASS ${status}] ${route.name.padEnd(35)} (${route.path}) - Title: "${title.slice(0, 30)}..." BodyLen: ${bodyTextLength}`);
      } else {
        auditResults.summary.failedRoutes++;
        console.error(`  [FAIL ${status}] ${route.name.padEnd(35)} (${route.path}) - Blank: ${isBlank}`);
      }

      auditResults.routesChecked.push({
        path: route.path,
        name: route.name,
        status,
        title,
        bodyTextLength,
        passed
      });
    } catch (e) {
      auditResults.summary.failedRoutes++;
      console.error(`  [ERROR] Route ${route.path} threw: ${e.message}`);
      auditResults.routesChecked.push({
        path: route.path,
        name: route.name,
        status: 'EXCEPTION',
        error: e.message,
        passed: false
      });
    }
  }

  // 2. Audit Server-Side Route Protection (Live Portals without Auth)
  console.log('\n--- 2. Testing Live Portal Server-Side Security Protection ---');
  const protectedRoutes = ['/admin', '/manager', '/tenant'];
  for (const pRoute of protectedRoutes) {
    const res = await page.goto(`${BASE_URL}${pRoute}`, { waitUntil: 'domcontentloaded' });
    const currentUrl = page.url();
    const redirectedToLogin = currentUrl.includes('/login');
    console.log(`  Live Portal [${pRoute}] -> Redirected to Login: ${redirectedToLogin} (${currentUrl})`);
    auditResults.securityChecks.push({
      portal: pRoute,
      redirectedToLogin,
      currentUrl
    });
  }

  // 3. Four-Role Interactive Workflow Verification
  console.log('\n--- 3. Testing Four-Role Workflow Interactions ---');

  // 3A. Investor Workflow (/demo/admin or /dashboard)
  await page.goto(`${BASE_URL}/wallet`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const walletButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean);
  });
  console.log(`  Investor Wallet Action Buttons: ${walletButtons.slice(0, 5).join(', ')}`);

  // 3B. Property Manager Workflow (/demo/manager)
  await page.goto(`${BASE_URL}/demo/manager`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const managerSections = await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2, h3')).map(h => h.innerText.trim());
    return h2s.filter(h => h.length > 0 && h.length < 50);
  });
  console.log(`  Property Manager Portal Sections: ${managerSections.slice(0, 5).join(' | ')}`);

  // 3C. Tenant Workflow (/demo/tenant)
  await page.goto(`${BASE_URL}/demo/tenant`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const tenantHeadings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText.trim()).filter(Boolean);
  });
  console.log(`  Tenant Portal Headings: ${tenantHeadings.slice(0, 4).join(' | ')}`);

  // 3D. Platform Admin Workflow (/demo/admin)
  await page.goto(`${BASE_URL}/demo/admin`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const adminHeadings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h1, h2, h3, button')).map(h => h.innerText.trim()).filter(Boolean);
  });
  console.log(`  Platform Admin Portal Controls: ${adminHeadings.slice(0, 6).join(' | ')}`);

  await browser.close();

  // Save detailed JSON artifact
  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'final_production_readiness_audit.json'),
    JSON.stringify(auditResults, null, 2)
  );

  console.log('\n===============================================================');
  console.log(`  FINAL AUDIT SUMMARY:`);
  console.log(`    Total Routes Tested:   ${auditResults.summary.totalRoutes}`);
  console.log(`    Passed Routes:         ${auditResults.summary.passedRoutes}`);
  console.log(`    Failed Routes:         ${auditResults.summary.failedRoutes}`);
  console.log(`    Hydration Errors:      ${auditResults.hydrationErrors.length}`);
  console.log(`    Console Errors:        ${auditResults.consoleErrors.length}`);
  console.log(`    Broken Images:         ${auditResults.brokenImages.length}`);
  console.log(`    504 Gateway Timeouts:  ${auditResults.networkFailures.filter(n => n.status === 504).length}`);
  console.log('===============================================================');
})();
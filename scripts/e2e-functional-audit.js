const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';
const ARTIFACT_DIR = path.resolve('C:/Users/LAYYAH PC KAROR/.gemini/antigravity/brain/fb66e55e-b760-4cd9-9b29-d4b27e6132df');
const SCREENSHOT_DIR = path.join(ARTIFACT_DIR, 'audit_evidence');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// 22 Navigation Routes + Key Platform Routes
const ROUTES_TO_AUDIT = [
  // Left Column
  { id: 'home', path: '/', name: 'Home' },
  { id: 'explore', path: '/explore', name: 'Explore Properties' },
  { id: 'schemes', path: '/schemes', name: 'Micro-Saver Schemes' },
  { id: 'ai-features', path: '/ai-features', name: 'AI Property Detective' },
  { id: 'community-lab', path: '/community-lab', name: 'Community Property Lab' },
  { id: 'reports', path: '/reports', name: 'P&L Analytics' },
  { id: 'simulator', path: '/simulator', name: 'What If? Calculator' },
  { id: 'glossary', path: '/glossary', name: 'Simple Guide & Terms' },
  { id: 'faq', path: '/faq', name: 'FAQ' },
  { id: 'demo-manager', path: '/demo/manager', name: 'Property Manager Demo' },
  { id: 'demo-admin', path: '/demo/admin', name: 'Admin Portal Demo' },
  { id: 'wallet', path: '/wallet', name: 'Practice Wallet' },

  // Right Column
  { id: 'how-it-works', path: '/how-it-works', name: 'How It Works' },
  { id: 'trust', path: '/trust', name: 'Trust Centre' },
  { id: 'experts', path: '/experts', name: 'Human Expert Network' },
  { id: 'dashboard', path: '/dashboard', name: 'My Investments' },
  { id: 'learn', path: '/learn', name: 'Learn Centre' },
  { id: 'governance', path: '/governance', name: 'Owner Updates & Voting' },
  { id: 'about', path: '/about', name: 'About Us' },
  { id: 'support', path: '/support', name: 'Support Desk' },
  { id: 'demo-tenant', path: '/demo/tenant', name: 'Tenant Portal Demo' },
  { id: 'login', path: '/login', name: 'Live Portal Login' },

  // Core Functional Extensions
  { id: 'property-detail', path: '/property/prop-dubai-marina-tower', name: 'Property Detail (Dubai Marina)' },
  { id: 'trade-terminal', path: '/trade/prop-dubai-marina-tower', name: 'Secondary Trade Terminal' },
  { id: 'fees-and-returns', path: '/fees-and-returns', name: 'Fees & Returns Schedule' },
  { id: 'contact', path: '/contact', name: 'Contact Us' },
  { id: 'legal', path: '/legal', name: 'Legal Centre' },
];

(async () => {
  console.log('===============================================================');
  console.log('  STATEERA COMPLETE FUNCTIONAL & VISUAL AUDIT ENGINE');
  console.log('===============================================================');
  console.log(`Target: ${BASE_URL}`);
  console.log(`Chrome Executable: ${CHROME_PATH}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const auditResults = [];
  let totalImagesAudited = 0;
  let totalImagesRendered = 0;
  let totalImagesBroken = 0;

  for (const route of ROUTES_TO_AUDIT) {
    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error' || msg.text().includes('Hydration') || msg.text().includes('Warning:')) {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      pageErrors.push(err.message);
    });

    try {
      await page.setViewport({ width: 1440, height: 900 });
      const response = await page.goto(`${BASE_URL}${route.path}`, {
        waitUntil: 'networkidle2',
        timeout: 20000
      });

      const httpStatus = response ? response.status() : 'NO_RESPONSE';
      const pageTitle = await page.title();

      // Check Images
      const imageStats = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        let rendered = 0;
        let broken = 0;
        const brokenSrcs = [];

        for (const img of imgs) {
          // If complete and naturalWidth > 0, it actually painted pixels
          if (img.complete && img.naturalWidth > 0) {
            rendered++;
          } else {
            broken++;
            brokenSrcs.push(img.src);
          }
        }
        return { total: imgs.length, rendered, broken, brokenSrcs };
      });

      totalImagesAudited += imageStats.total;
      totalImagesRendered += imageStats.rendered;
      totalImagesBroken += imageStats.broken;

      // Check Buttons & Links
      const interactionStats = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button').length;
        const links = document.querySelectorAll('a').length;
        const inputs = document.querySelectorAll('input, select, textarea').length;
        const textContent = document.body.innerText || '';
        const hasPlaceholder = /lorem ipsum|placeholder|todo|tbd/i.test(textContent);
        return { buttons, links, inputs, hasPlaceholder, textLength: textContent.length };
      });

      // Desktop Screenshot
      const screenshotName = `${route.id}_desktop.png`;
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, screenshotName), fullPage: false });

      // Mobile Viewport Check (375x812)
      await page.setViewport({ width: 375, height: 812 });
      await page.reload({ waitUntil: 'networkidle2' });
      const mobileScreenshotName = `${route.id}_mobile.png`;
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, mobileScreenshotName), fullPage: false });

      const result = {
        id: route.id,
        name: route.name,
        path: route.path,
        httpStatus,
        pageTitle,
        consoleErrors: consoleErrors.length,
        pageErrors: pageErrors.length,
        imageStats,
        interactionStats,
        desktopScreenshot: screenshotName,
        mobileScreenshot: mobileScreenshotName,
        status: (httpStatus === 200 && consoleErrors.length === 0 && imageStats.broken === 0) ? 'WORKING' : 'PARTIALLY_WORKING'
      };

      auditResults.push(result);
      console.log(`[ROUTE AUDIT] ${route.name.padEnd(30)} | ${route.path.padEnd(35)} | HTTP ${httpStatus} | Imgs: ${imageStats.rendered}/${imageStats.total} | Err: ${consoleErrors.length}`);

    } catch (err) {
      console.log(`[ROUTE FAILED] ${route.name}: ${err.message}`);
      auditResults.push({
        id: route.id,
        name: route.name,
        path: route.path,
        httpStatus: 'FAILED',
        error: err.message,
        status: 'BROKEN'
      });
    } finally {
      await page.close();
    }
  }

  // Write JSON report
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'full_routes_audit_report.json'), JSON.stringify(auditResults, null, 2));

  console.log('\n--- TOTAL IMAGE RENDERING SUMMARY ---');
  console.log(`Total Images Evaluated Across All Pages: ${totalImagesAudited}`);
  console.log(`Images Successfully Rendered (naturalWidth > 0): ${totalImagesRendered}`);
  console.log(`Broken Images Detected (naturalWidth === 0): ${totalImagesBroken}`);

  await browser.close();
  console.log('\n--- BROWSER AUDIT COMPLETE ---');
})();

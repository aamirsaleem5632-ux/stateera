const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleMessages.push({ type, text });
    if (type === 'error' || text.toLowerCase().includes('hydration') || text.toLowerCase().includes('mismatch')) {
      console.log(`[BROWSER ${type.toUpperCase()}] ${text}`);
    }
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message);
    console.log(`[PAGE ERROR] ${err.message}`);
  });

  console.log('Navigating to http://localhost:3000 on desktop viewport (1280x800)...');
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Check hydration / console errors
  const hydrationErrors = consoleMessages.filter(m =>
    m.text.toLowerCase().includes('hydration') || m.text.toLowerCase().includes('did not match')
  );
  console.log(`Hydration errors count: ${hydrationErrors.length}`);
  console.log(`Total page errors count: ${pageErrors.length}`);

  // Test "All Pathways" desktop dropdown
  const allPathwaysButton = await page.$('button ::-p-text(All Pathways)');
  if (allPathwaysButton) {
    console.log('[OK] Found "All Pathways" button in desktop navbar. Clicking to open...');
    await allPathwaysButton.click();
    await new Promise(r => setTimeout(r, 400));

    // Verify left and right column links
    const links = await page.$$eval('div.grid-cols-2 a', elements => elements.map(el => ({ text: el.textContent.trim(), href: el.getAttribute('href') })));
    console.log(`Found ${links.length} total pathway links in desktop dropdown.`);
    const hasHome = links.some(l => l.href === '/' && l.text === 'Home');
    const hasExplore = links.some(l => l.href === '/explore');
    const hasHowItWorks = links.some(l => l.href === '/how-it-works' && l.text === 'How It Works');
    console.log(`Left Column sample (Home): ${hasHome}`);
    console.log(`Right Column sample (How It Works): ${hasHowItWorks}`);

    const artifactDir = path.resolve('C:/Users/LAYYAH PC KAROR/.gemini/antigravity/brain/fb66e55e-b760-4cd9-9b29-d4b27e6132df');
    await page.screenshot({ path: path.join(artifactDir, 'desktop_all_pathways_dropdown.png') });
    console.log('[SAVED] desktop_all_pathways_dropdown.png');
  } else {
    console.log('[WARN] "All Pathways" button not found by text query.');
  }

  // Switch to mobile viewport (375x812)
  console.log('\nSwitching to mobile viewport (375x812)...');
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const hamburgerButton = await page.$('button[aria-label="Toggle Navigation Menu"]');
  if (hamburgerButton) {
    console.log('[OK] Found mobile hamburger button. Clicking to open drawer...');
    await hamburgerButton.click();
    await new Promise(r => setTimeout(r, 400));

    const mobileLinks = await page.$$eval('div.lg\\:hidden a', elements => elements.map(el => ({ text: el.textContent.trim(), href: el.getAttribute('href') })));
    console.log(`Found ${mobileLinks.length} pathway links in mobile navigation drawer.`);

    const artifactDir = path.resolve('C:/Users/LAYYAH PC KAROR/.gemini/antigravity/brain/fb66e55e-b760-4cd9-9b29-d4b27e6132df');
    await page.screenshot({ path: path.join(artifactDir, 'mobile_navigation_drawer.png') });
    console.log('[SAVED] mobile_navigation_drawer.png');
  } else {
    console.log('[WARN] Hamburger button not found.');
  }

  await browser.close();
  console.log('\n--- VERIFICATION FINISHED SUCCESSFULLY ---');
})();

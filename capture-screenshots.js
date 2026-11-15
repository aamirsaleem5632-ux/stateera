const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const pages = [
    { name: 'landing-desktop', url: 'http://localhost:3000/', width: 1440, height: 900 },
    { name: 'landing-mobile', url: 'http://localhost:3000/', width: 375, height: 812 },
    { name: 'explore-desktop', url: 'http://localhost:3000/explore', width: 1440, height: 900 },
    { name: 'property-details', url: 'http://localhost:3000/property/prop-dubai-marina-tower', width: 1440, height: 900 },
    { name: 'trading-desktop', url: 'http://localhost:3000/trade/prop-dubai-marina-tower', width: 1440, height: 900 },
    { name: 'dashboard-desktop', url: 'http://localhost:3000/dashboard', width: 1440, height: 900 },
    { name: 'wallet-desktop', url: 'http://localhost:3000/wallet', width: 1440, height: 900 },
    { name: 'manager-desktop', url: 'http://localhost:3000/manager', width: 1440, height: 900 },
    { name: 'tenant-desktop', url: 'http://localhost:3000/tenant', width: 1440, height: 900 },
    { name: 'admin-desktop', url: 'http://localhost:3000/admin', width: 1440, height: 900 },
  ];

  for (const p of pages) {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: p.width, height: p.height });
      await page.goto(p.url, { waitUntil: 'networkidle0', timeout: 15000 });
      // wait extra 1s for animations to settle
      await new Promise(r => setTimeout(r, 1000));
      const filePath = path.join(OUTPUT_DIR, `${p.name}.png`);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Captured: ${p.name}.png (${p.width}x${p.height})`);
      await page.close();
    } catch (err) {
      console.error(`Error capturing ${p.name}:`, err.message);
    }
  }

  await browser.close();
}

capture().catch(console.error);

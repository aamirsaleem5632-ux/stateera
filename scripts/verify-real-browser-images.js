const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = path.resolve('C:/Users/LAYYAH PC KAROR/.gemini/antigravity/brain/fb66e55e-b760-4cd9-9b29-d4b27e6132df');
const SCREENSHOT_DIR = path.join(ARTIFACT_DIR, 'rendered_images_evidence');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

(async () => {
  console.log('===============================================================');
  console.log('  STATEERA REAL BROWSER IMAGE RENDERING VERIFICATION');
  console.log('===============================================================');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const failedRequests = [];

  page.on('response', res => {
    if (res.status() >= 400 && res.request().resourceType() === 'image') {
      failedRequests.push({ url: res.url(), status: res.status() });
      console.log(`[IMAGE NETWORK FAIL ${res.status()}] ${res.url()}`);
    }
  });

  // Helper: auto-scroll page to trigger lazy loading of images
  async function autoScroll(p, maxScroll = 4000) {
    await p.evaluate(async (max) => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight || totalHeight >= max) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 120);
      });
    }, maxScroll);
    await new Promise(r => setTimeout(r, 1500));
  }

  // 1. Verify Home Page Hero Image (Desktop)
  console.log('\n--- 1. Testing Home Page Images (Desktop 1440x900) ---');
  await page.setViewport({ width: 1440, height: 900 });
  const homeStart = Date.now();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('img[alt="Manhattan Luxury Glass Tower"]', { timeout: 8000 });
  
  // Wait 1.5s for initial paint
  await new Promise(r => setTimeout(r, 1500));
  await autoScroll(page, 2000);

  const homeImageStats = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      alt: img.alt || 'no-alt',
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      visible: img.offsetWidth > 0 && img.offsetHeight > 0
    }));
  });

  console.log(`Home Page Images Found: ${homeImageStats.length}`);
  homeImageStats.forEach((img, i) => {
    const isOk = img.complete && img.naturalWidth > 0;
    console.log(`  Img #${i + 1} [${isOk ? 'OK 200' : 'FAIL'}]: ${img.alt} (${img.naturalWidth}x${img.naturalHeight}) src: ${img.src.slice(0, 80)}...`);
  });

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'home_hero_rendered.png') });
  console.log('[SAVED SCREENSHOT] home_hero_rendered.png in', Date.now() - homeStart, 'ms');

  // 2. Verify Explore Page Images (Desktop)
  console.log('\n--- 2. Testing Explore Properties Page (Desktop 1440x900) ---');
  const exploreStart = Date.now();
  await page.goto('http://localhost:3000/explore', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('img[alt]', { timeout: 8000 });
  
  // Auto-scroll to trigger lazy loading across the property grid
  await autoScroll(page, 3500);

  const exploreImageStats = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    const rendered = imgs.filter(img => img.complete && img.naturalWidth > 0);
    const broken = imgs.filter(img => !img.complete || img.naturalWidth === 0);
    return {
      total: imgs.length,
      renderedCount: rendered.length,
      brokenCount: broken.length,
      sampleRendered: rendered.slice(0, 5).map(img => ({
        alt: img.alt,
        dimensions: `${img.naturalWidth}x${img.naturalHeight}`,
        src: img.src.slice(0, 80)
      })),
      brokenList: broken.map(img => img.src)
    };
  });

  console.log(`Explore Page Total Images: ${exploreImageStats.total}`);
  console.log(`Explore Page Rendered Images: ${exploreImageStats.renderedCount}`);
  console.log(`Explore Page Broken Images: ${exploreImageStats.brokenCount}`);
  console.log('Sample Rendered Property Cards:');
  exploreImageStats.sampleRendered.forEach(s => console.log(`  - ${s.alt} (${s.dimensions})`));

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'explore_properties_rendered_desktop.png') });
  console.log('[SAVED SCREENSHOT] explore_properties_rendered_desktop.png in', Date.now() - exploreStart, 'ms');

  // 3. Verify Explore Page on Mobile (375x812)
  console.log('\n--- 3. Testing Explore Properties Page (Mobile 375x812) ---');
  await page.setViewport({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('img[alt]', { timeout: 8000 });
  await autoScroll(page, 2500);

  const mobileExploreStats = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    const rendered = imgs.filter(img => img.complete && img.naturalWidth > 0);
    return { total: imgs.length, renderedCount: rendered.length };
  });

  console.log(`Mobile Explore Images: ${mobileExploreStats.renderedCount}/${mobileExploreStats.total} rendered`);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'explore_properties_rendered_mobile.png') });
  console.log('[SAVED SCREENSHOT] explore_properties_rendered_mobile.png');

  // 4. Verify Property Detail Page & Gallery (Desktop)
  console.log('\n--- 4. Testing Property Detail Page & Gallery (Desktop 1440x900) ---');
  await page.setViewport({ width: 1440, height: 900 });
  const detailStart = Date.now();
  await page.goto('http://localhost:3000/property/prop-dubai-marina-tower', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  const detailImageStats = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      alt: img.alt || 'no-alt',
      complete: img.complete,
      dimensions: `${img.naturalWidth}x${img.naturalHeight}`,
      src: img.src.slice(0, 80)
    }));
  });

  console.log(`Property Detail Images Count: ${detailImageStats.length}`);
  detailImageStats.forEach((img, i) => {
    console.log(`  Img #${i + 1}: ${img.alt} (${img.dimensions})`);
  });

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'property_detail_rendered_desktop.png') });
  console.log('[SAVED SCREENSHOT] property_detail_rendered_desktop.png in', Date.now() - detailStart, 'ms');

  // 5. Test Gallery Thumbnail Click Interaction
  console.log('\n--- 5. Testing Gallery Thumbnail Switching Interaction ---');
  const thumbnailButtons = await page.$$('button img');
  if (thumbnailButtons.length > 1) {
    console.log(`Found ${thumbnailButtons.length} gallery thumbnails. Clicking 2nd thumbnail...`);
    const initialMainSrc = await page.$eval('div.aspect-\\[16\\/10\\] img', el => el.src);
    
    // Click parent button of second thumbnail
    const secondThumbParent = await page.evaluateHandle(el => el.closest('button'), thumbnailButtons[1]);
    await secondThumbParent.click();
    await new Promise(r => setTimeout(r, 600));

    const updatedMainSrc = await page.$eval('div.aspect-\\[16\\/10\\] img', el => el.src);
    const mainImgComplete = await page.$eval('div.aspect-\\[16\\/10\\] img', el => el.complete && el.naturalWidth > 0);
    console.log(`Initial Main Image: ${initialMainSrc.slice(0, 60)}...`);
    console.log(`Updated Main Image: ${updatedMainSrc.slice(0, 60)}...`);
    console.log(`Image Switched Successfully: ${initialMainSrc !== updatedMainSrc}`);
    console.log(`New Main Image Rendered OK: ${mainImgComplete}`);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'property_detail_gallery_switched.png') });
    console.log('[SAVED SCREENSHOT] property_detail_gallery_switched.png');
  }

  // 6. Verify Property Detail on Mobile (375x812)
  console.log('\n--- 6. Testing Property Detail Page (Mobile 375x812) ---');
  await page.setViewport({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  const mobileDetailImg = await page.$eval('div.aspect-\\[16\\/10\\] img', el => ({
    alt: el.alt,
    complete: el.complete,
    dimensions: `${el.naturalWidth}x${el.naturalHeight}`
  }));
  console.log(`Mobile Detail Main Image: ${mobileDetailImg.alt} (${mobileDetailImg.dimensions}) [${mobileDetailImg.complete ? 'OK' : 'FAIL'}]`);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'property_detail_rendered_mobile.png') });
  console.log('[SAVED SCREENSHOT] property_detail_rendered_mobile.png');

  // Summary Report
  const report = {
    timestamp: new Date().toISOString(),
    failedNetworkRequestsCount: failedRequests.length,
    failedNetworkRequests: failedRequests,
    homeImages: homeImageStats,
    exploreImages: exploreImageStats,
    detailImages: detailImageStats,
  };

  fs.writeFileSync(path.join(ARTIFACT_DIR, 'real_browser_image_verification_report.json'), JSON.stringify(report, null, 2));

  await browser.close();
  console.log('\n===============================================================');
  console.log('  REAL BROWSER IMAGE VERIFICATION FINISHED SUCCESSFULLY');
  console.log('===============================================================');
})();

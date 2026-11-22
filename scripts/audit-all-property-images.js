const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('src/data/mockProperties.ts', 'utf8');

// Match each property
// Each starts with id: "prop-..."
const propRegex = /id:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?coverImage:\s*"([^"]+)",[\s\S]*?galleryImages:\s*\[([\s\S]*?)\]/g;

const properties = [];
let match;
while ((match = propRegex.exec(content)) !== null) {
  const id = match[1];
  const title = match[2];
  const coverImage = match[3];
  const galleryRaw = match[4];
  const gallery = [];
  const gRegex = /"([^"]+)"/g;
  let gm;
  while ((gm = gRegex.exec(galleryRaw)) !== null) {
    gallery.push(gm[1]);
  }
  properties.push({ id, title, coverImage, gallery });
}

console.log(`Successfully extracted ${properties.length} properties from mockProperties.ts.`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = https.request(parsed, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve({ url, status: res.statusCode });
      });
      req.on('error', (err) => resolve({ url, status: 'ERR: ' + err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
      req.end();
    } catch (e) {
      resolve({ url, status: 'PARSE_ERR' });
    }
  });
}

async function run() {
  const allUrls = new Set();
  for (const p of properties) {
    if (p.coverImage) allUrls.add(p.coverImage);
    for (const g of p.gallery) allUrls.add(g);
  }

  console.log(`Total unique image URLs across ${properties.length} properties: ${allUrls.size}`);
  
  const results = {};
  const urlList = Array.from(allUrls);
  console.log('Checking all URLs against Unsplash...');
  for (let i = 0; i < urlList.length; i += 15) {
    const chunk = urlList.slice(i, i + 15);
    const chunkRes = await Promise.all(chunk.map(checkUrl));
    for (const cr of chunkRes) {
      results[cr.url] = cr.status;
    }
    process.stdout.write(`Checked ${Math.min(i + 15, urlList.length)}/${urlList.length}...\r`);
  }

  console.log('\n\n--- PROPERTY IMAGE AUDIT REPORT ---');
  let brokenProps = 0;
  const brokenPropertiesList = [];
  for (const p of properties) {
    const mainStatus = results[p.coverImage];
    const brokenGallery = p.gallery.filter(g => results[g] !== 200 && results[g] !== 301 && results[g] !== 302);
    if (mainStatus !== 200 || brokenGallery.length > 0) {
      brokenProps++;
      const item = {
        id: p.id,
        title: p.title,
        coverImage: p.coverImage,
        coverStatus: mainStatus,
        brokenGallery
      };
      brokenPropertiesList.push(item);
      console.log(`[BROKEN PROPERTY] ${p.id} ("${p.title}"):`);
      if (mainStatus !== 200) console.log(`  - coverImage (${mainStatus}): ${p.coverImage}`);
      if (brokenGallery.length > 0) console.log(`  - gallery broken:`, brokenGallery);
    }
  }

  if (brokenProps === 0) {
    console.log(`ALL ${properties.length} property images and galleries are 100% valid HTTP 200!`);
  } else {
    console.log(`Found ${brokenProps} properties with broken images!`);
  }

  fs.writeFileSync('scripts/broken_property_images.json', JSON.stringify(brokenPropertiesList, null, 2));
}

run();

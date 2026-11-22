const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('src/data/mockProperties.ts', 'utf8');

// Match all property blocks by finding each `id: "prop-...` or `"id": "prop-...`
const propSplits = content.split(/\n\s*(?:id:\s*|"id":\s*)"(prop-[^"]+)"/);
// propSplits[0] is preamble
// Then for each: propSplits[1] is id, propSplits[2] is property body, etc.

const properties = [];
for (let i = 1; i < propSplits.length; i += 2) {
  const id = propSplits[i];
  const body = propSplits[i + 1];

  const titleMatch = body.match(/(?:title:\s*|"title":\s*)"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : id;

  const coverMatch = body.match(/(?:coverImage:\s*|"coverImage":\s*)"([^"]+)"/);
  const coverImage = coverMatch ? coverMatch[1] : null;

  const galleryMatch = body.match(/(?:galleryImages:\s*|"galleryImages":\s*)\[([\s\S]*?)\]/);
  const gallery = [];
  if (galleryMatch) {
    const gUrls = galleryMatch[1].match(/"(https:\/\/[^"]+)"/g);
    if (gUrls) {
      for (const u of gUrls) gallery.push(u.replace(/"/g, ''));
    }
  }

  properties.push({ id, title, coverImage, gallery });
}

console.log(`Parsed ${properties.length} properties.`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = https.request(parsed, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Range': 'bytes=0-1024'
        },
        timeout: 8000
      }, (res) => {
        resolve({ url, status: res.statusCode });
        req.destroy();
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

  console.log(`Checking ${allUrls.size} unique image URLs across 136 properties...`);
  const urlList = Array.from(allUrls);
  const results = {};

  for (let i = 0; i < urlList.length; i += 15) {
    const chunk = urlList.slice(i, i + 15);
    const chunkRes = await Promise.all(chunk.map(checkUrl));
    for (const cr of chunkRes) {
      results[cr.url] = cr.status;
      if (cr.status !== 200 && cr.status !== 206 && cr.status !== 301 && cr.status !== 302) {
        console.log(`[BROKEN ${cr.status}] ${cr.url}`);
      }
    }
    process.stdout.write(`Checked ${Math.min(i + 15, urlList.length)}/${urlList.length}...\r`);
  }

  console.log('\n\n--- BROKEN PROPERTY IMAGES REPORT ---');
  const brokenProperties = [];
  for (const p of properties) {
    const coverStatus = results[p.coverImage];
    const coverOk = coverStatus === 200 || coverStatus === 206 || coverStatus === 301 || coverStatus === 302;
    const brokenGallery = p.gallery.filter(g => results[g] !== 200 && results[g] !== 206 && results[g] !== 301 && results[g] !== 302);
    if (!coverOk || brokenGallery.length > 0) {
      brokenProperties.push({
        id: p.id,
        title: p.title,
        coverImage: p.coverImage,
        coverStatus,
        brokenGallery
      });
      console.log(`Property "${p.id}" (${p.title}):`);
      if (!coverOk) console.log(`  - coverImage BROKEN (${coverStatus}): ${p.coverImage}`);
      if (brokenGallery.length > 0) console.log(`  - gallery broken (${brokenGallery.length}):`, brokenGallery);
    }
  }

  console.log(`\nTotal broken properties: ${brokenProperties.length} out of ${properties.length}`);
  fs.writeFileSync('scripts/broken_136_report.json', JSON.stringify(brokenProperties, null, 2));
}

run();

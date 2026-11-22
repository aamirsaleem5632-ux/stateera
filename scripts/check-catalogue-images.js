const fs = require('fs');
const https = require('https');

const files = ['scripts/expand-catalogue.js', 'scripts/generate-full-catalogue.js'];
const allUrls = new Set();
const urlRegex = /https:\/\/images\.unsplash\.com\/[^\s"'`]+/g;

for (const f of files) {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    let m;
    while ((m = urlRegex.exec(c)) !== null) {
      allUrls.add(m[0]);
    }
  }
}

console.log(`Found ${allUrls.size} unique Unsplash URLs in catalogue scripts.`);

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
  const urlList = Array.from(allUrls);
  const broken = [];
  for (let i = 0; i < urlList.length; i += 10) {
    const chunk = urlList.slice(i, i + 10);
    const chunkRes = await Promise.all(chunk.map(checkUrl));
    for (const r of chunkRes) {
      if (r.status !== 200 && r.status !== 301 && r.status !== 302) {
        broken.push(r);
        console.log(`[BROKEN ${r.status}] ${r.url}`);
      }
    }
  }
  console.log(`\nChecked ${urlList.length} catalogue script URLs. Broken: ${broken.length}`);
}

run();

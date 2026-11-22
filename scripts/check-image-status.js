const fs = require('fs');
const https = require('https');
const http = require('http');

const data = JSON.parse(fs.readFileSync('scripts/extracted_images.json', 'utf8'));
const urls = data.unsplash;

console.log(`Testing ${urls.length} Unsplash URLs for HTTP status...`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = https.request(parsed, { method: 'HEAD', timeout: 6000 }, (res) => {
        resolve({ url, status: res.statusCode });
      });
      req.on('error', (err) => resolve({ url, status: 'ERROR: ' + err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
      req.end();
    } catch (e) {
      resolve({ url, status: 'PARSE_ERROR: ' + e.message });
    }
  });
}

async function main() {
  const results = [];
  const broken = [];
  // Run with concurrency of 10
  for (let i = 0; i < urls.length; i += 10) {
    const chunk = urls.slice(i, i + 10);
    const chunkResults = await Promise.all(chunk.map(checkUrl));
    for (const r of chunkResults) {
      results.push(r);
      if (r.status !== 200 && r.status !== 301 && r.status !== 302) {
        broken.push(r);
        console.log(`[BROKEN IMAGE ${r.status}] ${r.url}`);
      }
    }
    process.stdout.write(`Checked ${Math.min(i + 10, urls.length)}/${urls.length}...\r`);
  }

  console.log(`\n\nDONE! Checked ${urls.length} images.`);
  console.log(`Valid: ${urls.length - broken.length}`);
  console.log(`Broken / 404: ${broken.length}`);

  fs.writeFileSync('scripts/broken_images.json', JSON.stringify(broken, null, 2));
}

main();

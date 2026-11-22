const fs = require('fs');
const path = require('path');
const https = require('https');

const imageRegex = /https:\/\/images\.unsplash\.com\/[^\s"'`]+/g;
const localImgRegex = /["'](\/images\/[^\s"'`]+)["']/g;
const foundUnsplash = new Set();
const foundLocal = new Set();

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      let m;
      while ((m = imageRegex.exec(content)) !== null) {
        foundUnsplash.add(m[0]);
      }
      while ((m = localImgRegex.exec(content)) !== null) {
        foundLocal.add(m[1]);
      }
    }
  }
}

walk('src');
console.log(`Found ${foundUnsplash.size} unique Unsplash URLs.`);
console.log(`Found ${foundLocal.size} unique local image paths.`);

for (const p of foundLocal) {
  const fullPath = path.join('public', p);
  console.log(`Local image ${p} exists:`, fs.existsSync(fullPath));
}

// Write to json
fs.writeFileSync('scripts/extracted_images.json', JSON.stringify({
  unsplash: Array.from(foundUnsplash),
  local: Array.from(foundLocal)
}, null, 2));

console.log('Saved to scripts/extracted_images.json');

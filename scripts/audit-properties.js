const fs = require('fs');

const content = fs.readFileSync('src/data/mockProperties.ts', 'utf8');
const idMatches = content.match(/id:\s*["']([^"']+)["']/g);
console.log('Total property IDs in mockProperties.ts:', idMatches ? idMatches.length : 0);

// Extract all imageUrl and galleryImage entries from mockProperties.ts
const imageRegex = /(?:imageUrl|images):\s*["']([^"']+)["']/g;
const galleryRegex = /["'](https:\/\/images\.unsplash\.com\/[^"']+)["']/g;

const allImages = new Set();
let m;
while ((m = galleryRegex.exec(content)) !== null) {
  allImages.add(m[1]);
}
console.log('Total Unsplash images in mockProperties.ts:', allImages.size);

// Check if any property has missing or broken images
// Also check if any properties have specific image IDs
const imageIds = [];
for (const img of allImages) {
  const match = img.match(/photo-([a-zA-Z0-9-]+)/);
  if (match) imageIds.push(match[1]);
}
console.log('Sample image IDs (first 10):', imageIds.slice(0, 10));

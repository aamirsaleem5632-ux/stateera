const fs = require('fs');

const content = fs.readFileSync('src/data/mockProperties.ts', 'utf8');
const lines = content.split('\n');
let count = 0;
const ids = [];
for (const l of lines) {
  const m = l.match(/\bid:\s*["'](prop-[^"']+)["']/);
  if (m) {
    count++;
    ids.push(m[1]);
  }
}
console.log('Total property IDs matching prop-*: ' + count);
console.log('Sample IDs (first 10):', ids.slice(0, 10));
console.log('Sample IDs (last 10):', ids.slice(-10));

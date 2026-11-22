const fs = require('fs');
const content = fs.readFileSync('src/data/mockProperties.ts', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('1574362848149') || lines[i].includes('1555854877')) {
    let foundId = 'unknown';
    for (let j = i; j >= Math.max(0, i - 50); j--) {
      if (lines[j].includes('id:')) {
        foundId = lines[j].trim();
        break;
      }
    }
    console.log(`Line ${i + 1} [${foundId}]: ${lines[i].trim().slice(0, 100)}`);
  }
}

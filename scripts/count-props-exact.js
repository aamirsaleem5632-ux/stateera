const fs = require('fs');

const content = fs.readFileSync('src/data/mockProperties.ts', 'utf8');

// Match every "id": "prop-..." or id: "prop-..."
const propRegex = /(?:id:\s*["']|"id":\s*["'])(prop-[^"']+)["']/g;
const props = [];
let m;
while ((m = propRegex.exec(content)) !== null) {
  props.push(m[1]);
}

console.log('Total properties in MOCK_PROPERTIES:', props.length);
console.log('Unique property IDs:', new Set(props).size);
console.log('First 5:', props.slice(0, 5));
console.log('Last 5:', props.slice(-5));

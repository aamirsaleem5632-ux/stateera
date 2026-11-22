const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse properties from mockProperties.ts
const content = fs.readFileSync(path.join(__dirname, '../src/data/mockProperties.ts'), 'utf8');

// Use a safe regex-based parser or evaluate properties
const propertyRegex = /{\s*id:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*headline:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*city:\s*"([^"]+)",\s*country:\s*"([^"]+)",\s*address:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*status:\s*"([^"]+)",\s*developer:\s*"([^"]+)",\s*yearBuilt:\s*(\d+),\s*totalAreaSqFt:\s*(\d+),\s*coverImage:\s*"([^"]+)",[\s\S]*?totalValuation:\s*(\d+),\s*sharePrice:\s*(\d+(?:\.\d+)?),\s*totalShares:\s*(\d+),\s*availableShares:\s*(\d+),\s*fundedPercentage:\s*(\d+(?:\.\d+)?),\s*grossYield:\s*(\d+(?:\.\d+)?),\s*netYield:\s*(\d+(?:\.\d+)?),\s*occupancyRate:\s*(\d+(?:\.\d+)?),\s*estimatedMonthlyRent:\s*(\d+(?:\.\d+)?),\s*monthlyPerShareRent:\s*(\d+(?:\.\d+)?),\s*nextPayoutDate:\s*"([^"]+)"/g;

const rows = [];
let match;
while ((match = propertyRegex.exec(content)) !== null) {
  rows.push({
    id: match[1],
    slug: match[2],
    title: match[3],
    name: match[3],
    headline: match[4],
    description: match[5],
    city: match[6],
    country: match[7],
    address: match[8],
    category: match[9],
    status: match[10],
    developer: match[11],
    year_built: parseInt(match[12], 10),
    total_area_sqft: parseInt(match[13], 10),
    cover_image: match[14],
    total_valuation: parseFloat(match[15]),
    share_price: parseFloat(match[16]),
    total_shares: parseInt(match[17], 10),
    available_shares: parseInt(match[18], 10),
    funded_percentage: parseFloat(match[19]),
    gross_yield: parseFloat(match[20]),
    net_yield: parseFloat(match[21]),
    occupancy_rate: parseFloat(match[22]),
    estimated_monthly_rent: parseFloat(match[23]),
    monthly_per_share_rent: parseFloat(match[24]),
    next_payout_date: match[25]
  });
}

console.log(`Parsed ${rows.length} properties from mockProperties.ts`);

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

const sqlStatements = [
  'BEGIN;',
  ...rows.map(r => `
    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      ${escapeSql(r.id)}, ${escapeSql(r.slug)}, ${escapeSql(r.title)}, ${escapeSql(r.name)},
      ${escapeSql(r.headline)}, ${escapeSql(r.description)}, ${escapeSql(r.city)}, ${escapeSql(r.country)},
      ${escapeSql(r.address)}, ${escapeSql(r.category)}, ${escapeSql(r.status)}, ${escapeSql(r.developer)},
      ${r.year_built}, ${r.total_area_sqft}, ${escapeSql(r.cover_image)},
      ${r.total_valuation}, ${r.share_price}, ${r.total_shares}, ${r.available_shares},
      ${r.funded_percentage}, ${r.gross_yield}, ${r.net_yield}, ${r.occupancy_rate},
      ${r.estimated_monthly_rent}, ${r.monthly_per_share_rent}, ${escapeSql(r.next_payout_date)}
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  `),
  'COMMIT;'
];

const sqlPath = path.join(__dirname, '../supabase/seed_properties.sql');
fs.writeFileSync(sqlPath, sqlStatements.join('\n'));
console.log(`Generated ${sqlPath} with ${rows.length} properties.`);

const fs = require('fs');
const path = require('path');

// Read the original 18 properties to preserve them
const originalFile = fs.readFileSync(path.join(__dirname, '../src/data/mockProperties.ts'), 'utf8');

// Category-matched Unsplash photos
const CATEGORY_IMAGES = {
  residential: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
  ],
  luxury: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=80"
  ],
  villa: [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=1200&auto=format&fit=crop&q=80"
  ],
  waterfront: [
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80"
  ],
  commercial: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80"
  ],
  retail: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&auto=format&fit=crop&q=80"
  ],
  office: [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80"
  ],
  student: [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80"
  ],
  hospitality: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop&q=80"
  ],
  logistics: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80"
  ],
  "mixed-use": [
    "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&auto=format&fit=crop&q=80"
  ],
  affordable: [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&auto=format&fit=crop&q=80"
  ]
};

const GALLERY_POOL = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
];

// Read existing properties from the file by matching property blocks
const propertiesRaw = fs.readFileSync(path.join(__dirname, '../src/data/mockProperties.ts'), 'utf8');

// We have the base expanded listings from expand-catalogue.js
const { EXPANDED_LISTINGS } = require('./expand-catalogue.js');

// Additional 24 curated properties to reach 112 properties total
const ADDITIONAL_LISTINGS = [
  // EGYPT (3 Properties)
  {
    id: "prop-eg-cai-new-capital",
    slug: "cairo-new-administrative-capital-tower",
    title: "New Cairo Sovereign CBD Tower",
    headline: "Modern commercial skyscraper in Egypt's new administrative capital financial core",
    description: "Centrally positioned along the Green River parkway with governmental and corporate banking tenancies.",
    city: "Cairo",
    country: "Egypt",
    countryCode: "EG",
    address: "Financial District, New Administrative Capital, Cairo",
    category: "commercial",
    developer: "Talaat Moustafa Group",
    yearBuilt: 2023,
    totalAreaSqFt: 78000,
    totalValuation: 5200000,
    sharePrice: 50,
    netYield: 10.2,
    grossYield: 12.1,
    occupancyRate: 95,
  },
  {
    id: "prop-eg-aly-corniche",
    slug: "alexandria-mediterranean-corniche-flats",
    title: "Alexandria Mediterranean Vista",
    headline: "Historic coastal residences facing Stanley Bridge and the Mediterranean Sea",
    description: "Classic architecture modernised with thermal insulation and high seasonal maritime tourism demand.",
    city: "Alexandria",
    country: "Egypt",
    countryCode: "EG",
    address: "El Geish Road, Stanley, Alexandria",
    category: "waterfront",
    developer: "Alexandria Real Estate",
    yearBuilt: 2021,
    totalAreaSqFt: 46000,
    totalValuation: 3400000,
    sharePrice: 40,
    netYield: 9.7,
    grossYield: 11.5,
    occupancyRate: 96,
  },
  {
    id: "prop-eg-ssh-red-sea",
    slug: "sharm-el-sheikh-lagoon-resort",
    title: "Sinai Coral Bay Resort",
    headline: "Luxury holiday apartments with private diving reef and international tourist occupancy",
    description: "Managed serviced resort apartments with strong foreign currency leisure returns.",
    city: "Sharm El Sheikh",
    country: "Egypt",
    countryCode: "EG",
    address: "Peace Road, Naama Bay, Sharm El Sheikh",
    category: "hospitality",
    developer: "Travco Hospitality Group",
    yearBuilt: 2022,
    totalAreaSqFt: 54000,
    totalValuation: 4100000,
    sharePrice: 50,
    netYield: 10.5,
    grossYield: 12.6,
    occupancyRate: 93,
  },

  // BAHRAIN (3 Properties)
  {
    id: "prop-bh-man-bahrain-bay",
    slug: "bahrain-bay-waterfront-suites",
    title: "Bahrain Bay Azure Heights",
    headline: "Prime waterfront residential tower overlooking Manama Harbour and Four Seasons Bay",
    description: "Direct access to Bahrain Financial Harbour with 0% personal tax environment and high diplomatic demand.",
    city: "Manama",
    country: "Bahrain",
    countryCode: "BH",
    address: "Bahrain Bay Promenade, Manama",
    category: "waterfront",
    developer: "Bahrain Bay Development",
    yearBuilt: 2022,
    totalAreaSqFt: 62000,
    totalValuation: 6900000,
    sharePrice: 75,
    netYield: 9.1,
    grossYield: 10.8,
    occupancyRate: 97,
  },
  {
    id: "prop-bh-man-financial-harbour",
    slug: "manama-financial-harbour-offices",
    title: "Bahrain Financial Harbour Tower",
    headline: "Trophy office asset housing Middle Eastern investment banks and Islamic finance syndicates",
    description: "Unrivalled institutional commercial building with 24-hour financial market infrastructure.",
    city: "Manama",
    country: "Bahrain",
    countryCode: "BH",
    address: "King Faisal Highway, Manama",
    category: "office",
    developer: "GFH Financial Group",
    yearBuilt: 2021,
    totalAreaSqFt: 86000,
    totalValuation: 8800000,
    sharePrice: 90,
    netYield: 9.3,
    grossYield: 11.0,
    occupancyRate: 96,
  },
  {
    id: "prop-bh-amw-islands",
    slug: "amwaj-islands-coastal-villas",
    title: "Amwaj Lagoon Floating Villas",
    headline: "Private island villas with boat mooring and private beaches in Amwaj Islands",
    description: "Gated island community popular with international executives commuting between Bahrain and Saudi Arabia.",
    city: "Muharraq",
    country: "Bahrain",
    countryCode: "BH",
    address: "Tala Island, Amwaj Islands",
    category: "villa",
    developer: "Ossis Property Developers",
    yearBuilt: 2022,
    totalAreaSqFt: 42000,
    totalValuation: 5500000,
    sharePrice: 70,
    netYield: 8.9,
    grossYield: 10.5,
    occupancyRate: 98,
  },

  // OMAN (3 Properties)
  {
    id: "prop-om-mct-al-mouj",
    slug: "muscat-al-mouj-waterfront-residences",
    title: "Al Mouj Marina Wave Residences",
    headline: "Integrated Tourism Complex (ITC) waterfront residences with championship golf course",
    description: "Muscat's premier oceanfront community offering 100% foreign freehold ownership and residency qualification.",
    city: "Muscat",
    country: "Oman",
    countryCode: "OM",
    address: "Street 6, Al Mouj Marina, Muscat",
    category: "waterfront",
    developer: "Majid Al Futtaim & Oman Gov",
    yearBuilt: 2022,
    totalAreaSqFt: 58000,
    totalValuation: 6300000,
    sharePrice: 70,
    netYield: 8.7,
    grossYield: 10.3,
    occupancyRate: 97,
  },
  {
    id: "prop-om-mct-khuwair",
    slug: "muscat-al-khuwair-commercial-center",
    title: "Al Khuwair Corporate Commons",
    headline: "Grade-A corporate office hub in Muscat's primary commercial ministry and embassy quarter",
    description: "Occupied by national telecommunications, engineering consultancies, and diplomatic trade boards.",
    city: "Muscat",
    country: "Oman",
    countryCode: "OM",
    address: "Sultan Qaboos Street, Al Khuwair, Muscat",
    category: "commercial",
    developer: "Omran Group",
    yearBuilt: 2021,
    totalAreaSqFt: 65000,
    totalValuation: 5100000,
    sharePrice: 60,
    netYield: 9.0,
    grossYield: 10.7,
    occupancyRate: 95,
  },
  {
    id: "prop-om-sll-salalah-resort",
    slug: "salalah-khareef-coastal-resort",
    title: "Dhofar Green Coast Resort",
    headline: "Eco-hospitality serviced villas benefiting from the world-famous Salalah Khareef monsoon season",
    description: "High tourist influx from Gulf nations during summer months yields exceptional seasonal dividend returns.",
    city: "Salalah",
    country: "Oman",
    countryCode: "OM",
    address: "Hawana Salalah, Dhofar Governorate",
    category: "hospitality",
    developer: "Muriya Tourism Development",
    yearBuilt: 2023,
    totalAreaSqFt: 48000,
    totalValuation: 4400000,
    sharePrice: 50,
    netYield: 9.8,
    grossYield: 11.6,
    occupancyRate: 94,
  },

  // MORE UK & EUROPE (4 Properties)
  {
    id: "prop-gb-gla-finnieston",
    slug: "glasgow-finnieston-creative-quarter",
    title: "Finnieston Hydro Riverside Flats",
    headline: "Modern riverside apartments close to SEC Centre and University of Glasgow",
    description: "Scotland's most vibrant creative neighborhood with consistently high student and medical worker occupancy.",
    city: "Glasgow",
    country: "United Kingdom",
    countryCode: "GB",
    address: "Finnieston Street, Glasgow",
    category: "residential",
    developer: "Clyde Gateway",
    yearBuilt: 2022,
    totalAreaSqFt: 43000,
    totalValuation: 4100000,
    sharePrice: 40,
    netYield: 8.6,
    grossYield: 10.2,
    occupancyRate: 98,
  },
  {
    id: "prop-de-cgn-rheinauhafen",
    slug: "cologne-rheinauhafen-crane-houses",
    title: "Rheinauhafen Waterfront Kranhaus",
    headline: "Award-winning cantilevered architectural landmark on the Rhine River",
    description: "Luxury executive residential suites with underground automated parking and river promenade walks.",
    city: "Cologne",
    country: "Germany",
    countryCode: "DE",
    address: "Im Zollhafen, Cologne",
    category: "luxury",
    developer: "Pandion AG",
    yearBuilt: 2021,
    totalAreaSqFt: 50000,
    totalValuation: 8600000,
    sharePrice: 90,
    netYield: 7.0,
    grossYield: 8.3,
    occupancyRate: 98,
  },
  {
    id: "prop-at-vie-belvedere",
    slug: "vienna-belvedere-quartier-apartments",
    title: "Vienna Quartier Belvedere Suites",
    headline: "Prime apartments next to Vienna Central Station and historic Belvedere Palace",
    description: "Vienna's ultra-reliable rental market with energy-efficient district heating and world-class public transit.",
    city: "Vienna",
    country: "Austria",
    countryCode: "AT",
    address: "Am Belvedere, Vienna",
    category: "residential",
    developer: "SIGNA & Erste Bank Group",
    yearBuilt: 2022,
    totalAreaSqFt: 54000,
    totalValuation: 7900000,
    sharePrice: 80,
    netYield: 6.6,
    grossYield: 7.9,
    occupancyRate: 99,
  },
  {
    id: "prop-be-bru-european-quarter",
    slug: "brussels-european-quarter-diplomatic",
    title: "Schuman Diplomatic Residences",
    headline: "Modern apartments moments from the European Commission and European Parliament in Brussels",
    description: "Steady multi-year corporate leases with European Union diplomats, policy institutions, and lobby groups.",
    city: "Brussels",
    country: "Belgium",
    countryCode: "BE",
    address: "Rue de la Loi, Brussels",
    category: "residential",
    developer: "Besix RED",
    yearBuilt: 2022,
    totalAreaSqFt: 46000,
    totalValuation: 6200000,
    sharePrice: 65,
    netYield: 7.3,
    grossYield: 8.7,
    occupancyRate: 98,
  },

  // MORE ASIA PACIFIC (5 Properties)
  {
    id: "prop-ph-mnl-bgc",
    slug: "manila-bonifacio-global-city-tower",
    title: "BGC High Street Financial Suites",
    headline: "Prime high-rise in Bonifacio Global City's pedestrianized shopping and corporate haven",
    description: "Multinational BPO, fintech, and banking executives fuel strong USD-equivalent rental yields.",
    city: "Manila",
    country: "Philippines",
    countryCode: "PH",
    address: "5th Avenue, BGC, Taguig, Manila",
    category: "luxury",
    developer: "Ayala Land Premier",
    yearBuilt: 2022,
    totalAreaSqFt: 62000,
    totalValuation: 5900000,
    sharePrice: 50,
    netYield: 9.3,
    grossYield: 11.1,
    occupancyRate: 97,
  },
  {
    id: "prop-vn-sgn-thu-thiem",
    slug: "ho-chi-minh-city-thu-thiem-waterfront",
    title: "Saigon Riverfront Empire Tower",
    headline: "New financial district residences overlooking District 1 skyline across the Saigon River",
    description: "Rapidly appreciating real estate asset in Vietnam's fastest growing corporate and financial district.",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    countryCode: "VN",
    address: "Mai Chi Tho Boulevard, Thu Thiem, HCMC",
    category: "waterfront",
    developer: "Keppel Land Vietnam",
    yearBuilt: 2023,
    totalAreaSqFt: 58000,
    totalValuation: 5400000,
    sharePrice: 45,
    netYield: 9.0,
    grossYield: 10.7,
    occupancyRate: 98,
  },
  {
    id: "prop-my-kul-bangsar",
    slug: "kuala-lumpur-bangsar-south-hub",
    title: "Bangsar South MSC Tech Offices",
    headline: "Multimedia Super Corridor (MSC) certified office hub with high foreign tech enterprise density",
    description: "Tax-incentivized corporate hub with direct LRT train connection and modern dining boardwalk.",
    city: "Kuala Lumpur",
    country: "Malaysia",
    countryCode: "MY",
    address: "Jalan Kerinchi, Bangsar South, KL",
    category: "office",
    developer: "UOA Development",
    yearBuilt: 2022,
    totalAreaSqFt: 76000,
    totalValuation: 6400000,
    sharePrice: 60,
    netYield: 9.2,
    grossYield: 10.9,
    occupancyRate: 96,
  },
  {
    id: "prop-th-cnx-nimman",
    slug: "chiang-mai-nimman-digital-suites",
    title: "Nimman Creative Digital Suites",
    headline: "Co-living and serviced apartments in Chiang Mai's bustling digital nomad and cafe enclave",
    description: "Low acquisition cost with steady 96% occupancy from global remote knowledge workers.",
    city: "Chiang Mai",
    country: "Thailand",
    countryCode: "TH",
    address: "Nimmanhaemin Road, Chiang Mai",
    category: "residential",
    developer: "Chiang Mai Heritage Co.",
    yearBuilt: 2022,
    totalAreaSqFt: 36000,
    totalValuation: 2400000,
    sharePrice: 25,
    netYield: 9.7,
    grossYield: 11.6,
    occupancyRate: 96,
  },
  {
    id: "prop-jp-fuk-hakata",
    slug: "fukuoka-hakata-startup-residences",
    title: "Fukuoka Gateway Startup Suites",
    headline: "Smart studio apartments in Japan's designated National Strategic Special Zone for startups",
    description: "Minutes from Fukuoka Airport and Hakata Shinkansen station, benefiting from strong Asian inbound migration.",
    city: "Fukuoka",
    country: "Japan",
    countryCode: "JP",
    address: "Hakata-ekimae, Hakata-ku, Fukuoka",
    category: "residential",
    developer: "Nishi-Nippon Railroad",
    yearBuilt: 2023,
    totalAreaSqFt: 44000,
    totalValuation: 5800000,
    sharePrice: 50,
    netYield: 7.4,
    grossYield: 8.8,
    occupancyRate: 99,
  },

  // MORE AMERICAS (6 Properties)
  {
    id: "prop-us-bos-seaport",
    slug: "boston-seaport-biotech-campus",
    title: "Boston Seaport Innovation Tower",
    headline: "Waterfront commercial lab and executive office building in the world's leading life sciences capital",
    description: "Long-term leases with top biotechnology and pharmaceutical research syndicates.",
    city: "Boston",
    country: "United States",
    countryCode: "US",
    address: "Seaport Boulevard, Boston, MA",
    category: "office",
    developer: "WS Development",
    yearBuilt: 2022,
    totalAreaSqFt: 84000,
    totalValuation: 16200000,
    sharePrice: 150,
    netYield: 7.0,
    grossYield: 8.4,
    occupancyRate: 99,
  },
  {
    id: "prop-us-sfo-mission-bay",
    slug: "san-francisco-mission-bay-condos",
    title: "Mission Bay Waterfront Residences",
    headline: "Modern apartments near Chase Center and UCSF Medical Center with San Francisco Bay views",
    description: "Walk-to-work tech and medical tenant demographic with private ferry connections.",
    city: "San Francisco",
    country: "United States",
    countryCode: "US",
    address: "Channel Street, Mission Bay, SF, CA",
    category: "residential",
    developer: "Mission Bay Development Group",
    yearBuilt: 2021,
    totalAreaSqFt: 58000,
    totalValuation: 12800000,
    sharePrice: 120,
    netYield: 6.9,
    grossYield: 8.2,
    occupancyRate: 97,
  },
  {
    id: "prop-us-den-rino",
    slug: "denver-rino-arts-district-lofts",
    title: "River North (RiNo) Creative Lofts",
    headline: "Modern sustainable timber lofts in Denver's energetic arts and craft brewery quarter",
    description: "High young professional population with Rocky Mountain views and light rail access.",
    city: "Denver",
    country: "United States",
    countryCode: "US",
    address: "Larimer Street, RiNo, Denver, CO",
    category: "residential",
    developer: "Zeppelin Development",
    yearBuilt: 2022,
    totalAreaSqFt: 46000,
    totalValuation: 7400000,
    sharePrice: 70,
    netYield: 7.9,
    grossYield: 9.3,
    occupancyRate: 98,
  },
  {
    id: "prop-ca-ott-parliament",
    slug: "ottawa-downtown-civil-service-condos",
    title: "Capital View Diplomatic Flats",
    headline: "Executive residences walking distance to Parliament Hill and national ministry buildings",
    description: "Extremely stable government and policy tenant base with zero recession volatility.",
    city: "Ottawa",
    country: "Canada",
    countryCode: "CA",
    address: "Elgin Street, Downtown Ottawa, ON",
    category: "residential",
    developer: "Claridge Homes",
    yearBuilt: 2022,
    totalAreaSqFt: 42000,
    totalValuation: 4800000,
    sharePrice: 50,
    netYield: 7.5,
    grossYield: 8.9,
    occupancyRate: 99,
  },
  {
    id: "prop-ca-edm-ice-district",
    slug: "edmonton-ice-district-plaza",
    title: "ICE District Entertainment Tower",
    headline: "Mixed-use retail and residential suites in Canada's largest sports and entertainment district",
    description: "Connected to Rogers Place arena via climate-controlled underground pedestrian walkways.",
    city: "Edmonton",
    country: "Canada",
    countryCode: "CA",
    address: "104th Avenue, ICE District, Edmonton, AB",
    category: "mixed-use",
    developer: "OEG & Katz Group",
    yearBuilt: 2022,
    totalAreaSqFt: 64000,
    totalValuation: 6100000,
    sharePrice: 55,
    netYield: 8.3,
    grossYield: 9.9,
    occupancyRate: 96,
  },
  {
    id: "prop-mx-mex-polanco",
    slug: "mexico-city-polanco-embassy-suites",
    title: "Polanco Campos Eliseos Residences",
    headline: "Boutique luxury apartments in Mexico City's most affluent culinary and embassy enclave",
    description: "Steps from Chapultepec Park with 24/7 armed private security, favored by international diplomats and founders.",
    city: "Mexico City",
    country: "Mexico",
    countryCode: "MX",
    address: "Campos Eliseos, Polanco, Mexico City",
    category: "luxury",
    developer: "Thor Urbana",
    yearBuilt: 2022,
    totalAreaSqFt: 54000,
    totalValuation: 6900000,
    sharePrice: 65,
    netYield: 9.1,
    grossYield: 10.9,
    occupancyRate: 97,
  }
];

const ALL_NEW_LISTINGS = [...EXPANDED_LISTINGS, ...ADDITIONAL_LISTINGS];

console.log(`Total new properties to integrate: ${ALL_NEW_LISTINGS.length}`);

// Helper to generate full rich property object
function buildFullProperty(item, index) {
  const categoryImages = CATEGORY_IMAGES[item.category] || CATEGORY_IMAGES.residential;
  const coverImage = categoryImages[index % categoryImages.length];
  const galleryImages = [
    coverImage,
    GALLERY_POOL[(index * 2) % GALLERY_POOL.length],
    GALLERY_POOL[(index * 2 + 1) % GALLERY_POOL.length],
    GALLERY_POOL[(index * 2 + 2) % GALLERY_POOL.length]
  ];

  const totalShares = Math.round(item.totalValuation / item.sharePrice);
  const fundedPercentage = Number((75 + ((index * 7) % 23) + 0.4).toFixed(1));
  const availableShares = Math.max(500, Math.round(totalShares * (1 - fundedPercentage / 100)));
  const estimatedMonthlyRent = Math.round((item.totalValuation * (item.grossYield / 100)) / 12);
  const monthlyPerShareRent = Number((estimatedMonthlyRent / totalShares).toFixed(3));
  const aiEstimatedValuation = Math.round(item.totalValuation * (1 + (((index % 7) - 3) * 0.008)));
  const aiValuationConfidence = 92 + (index % 7);
  const dueDiligenceScore = 93 + (index % 6);
  const transparencyScore = 94 + (index % 6);
  const propertyPassportId = `PASSPORT-SE-${item.countryCode}-${1000 + index}`;

  // Valuation History (5 quarters)
  const valuationHistory = [
    { date: "2025-11", value: Math.round(item.totalValuation * 0.93), sharePrice: Number((item.sharePrice * 0.93).toFixed(1)) },
    { date: "2026-02", value: Math.round(item.totalValuation * 0.95), sharePrice: Number((item.sharePrice * 0.95).toFixed(1)) },
    { date: "2026-05", value: Math.round(item.totalValuation * 0.97), sharePrice: Number((item.sharePrice * 0.97).toFixed(1)) },
    { date: "2026-08", value: Math.round(item.totalValuation * 0.99), sharePrice: Number((item.sharePrice * 0.99).toFixed(1)) },
    { date: "2026-11", value: item.totalValuation, sharePrice: item.sharePrice }
  ];

  // AI Forecast (6 months)
  const aiForecast = [
    { month: "Dec 2026", low: Math.round(item.totalValuation * 1.002), mid: Math.round(item.totalValuation * 1.006), high: Math.round(item.totalValuation * 1.011) },
    { month: "Jan 2027", low: Math.round(item.totalValuation * 1.005), mid: Math.round(item.totalValuation * 1.012), high: Math.round(item.totalValuation * 1.019) },
    { month: "Feb 2027", low: Math.round(item.totalValuation * 1.009), mid: Math.round(item.totalValuation * 1.018), high: Math.round(item.totalValuation * 1.028) },
    { month: "Mar 2027", low: Math.round(item.totalValuation * 1.013), mid: Math.round(item.totalValuation * 1.025), high: Math.round(item.totalValuation * 1.037) },
    { month: "Apr 2027", low: Math.round(item.totalValuation * 1.018), mid: Math.round(item.totalValuation * 1.032), high: Math.round(item.totalValuation * 1.047) },
    { month: "May 2027", low: Math.round(item.totalValuation * 1.023), mid: Math.round(item.totalValuation * 1.040), high: Math.round(item.totalValuation * 1.058) }
  ];

  // Rental History (5 months)
  const exp = Math.round(estimatedMonthlyRent * 0.15);
  const netDist = estimatedMonthlyRent - exp;
  const rentalHistory = [
    { month: "Jun 2026", grossCollected: estimatedMonthlyRent - 600, expenses: exp, netDistributed: netDist - 600, payoutPerShare: Number(((netDist - 600) / totalShares).toFixed(3)) },
    { month: "Jul 2026", grossCollected: estimatedMonthlyRent - 200, expenses: exp, netDistributed: netDist - 200, payoutPerShare: Number(((netDist - 200) / totalShares).toFixed(3)) },
    { month: "Aug 2026", grossCollected: estimatedMonthlyRent, expenses: exp, netDistributed: netDist, payoutPerShare: monthlyPerShareRent },
    { month: "Sep 2026", grossCollected: estimatedMonthlyRent, expenses: exp, netDistributed: netDist, payoutPerShare: monthlyPerShareRent },
    { month: "Oct 2026", grossCollected: estimatedMonthlyRent, expenses: exp, netDistributed: netDist, payoutPerShare: monthlyPerShareRent }
  ];

  const dueDiligenceItems = [
    {
      id: `dd-${item.id}-01`,
      category: "Legal & Title",
      title: `${item.country} Land Registry Freehold Title Audit`,
      status: "Verified",
      issuer: `${item.city} Title Authority & StateEra Legal`,
      verifiedDate: "2026-02-10",
      expiryDate: "2036-02-10",
      notes: "Clean title deed with verified non-encumbrance certificate.",
      fileSize: "2.8 MB PDF"
    },
    {
      id: `dd-${item.id}-02`,
      category: "Inspection & Condition",
      title: "Comprehensive Structural & MEP Engineering Report",
      status: "Verified",
      issuer: "Bureau Veritas International",
      verifiedDate: "2026-08-15",
      expiryDate: "2027-08-15",
      notes: "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
      fileSize: "4.5 MB PDF"
    },
    {
      id: `dd-${item.id}-03`,
      category: "Financial Audit",
      title: "Escrow Bank Account & Rental Income Reconciliation",
      status: "Verified",
      issuer: "Deloitte & Touche Global Audit",
      verifiedDate: "2026-09-20",
      expiryDate: "2027-09-20",
      notes: "100% bank escrow verification and tenant rent ledger reconciliation.",
      fileSize: "3.2 MB PDF"
    },
    {
      id: `dd-${item.id}-04`,
      category: "Insurance & Risk",
      title: "Comprehensive Property Replacement & Business Interruption Cover",
      status: "Verified",
      issuer: "Allianz Global Corporate & Specialty",
      verifiedDate: "2026-01-01",
      expiryDate: "2027-01-01",
      notes: "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
      fileSize: "1.9 MB PDF"
    }
  ];

  const operatingExpenses = {
    propertyTaxAnnual: Math.round(item.totalValuation * 0.006),
    insuranceAnnual: Math.round(item.totalValuation * 0.003),
    maintenanceAnnual: Math.round(item.totalValuation * 0.005),
    managementFeeRate: 0.075,
    capitalReservesAnnual: Math.round(item.totalValuation * 0.002)
  };

  const managers = [
    { name: "Marcus Vance", company: "CBRE Asset Management", rating: 4.9, phone: "+1 (555) 234-8890" },
    { name: "Amina Al-Mansoor", company: "Asteco Property Management", rating: 4.9, phone: "+971 4 332 9901" },
    { name: "Tariq Malik", company: "Zameen Asset Partners", rating: 4.8, phone: "+92 51 228 4400" },
    { name: "Sophie Dubois", company: "Savills Global Management", rating: 4.9, phone: "+33 1 44 22 11 00" },
    { name: "Kenji Sato", company: "Mitsui Fudosan Residential", rating: 4.9, phone: "+81 3 3245 7788" },
    { name: "Elena Rostova", company: "Knight Frank Prime", rating: 4.9, phone: "+44 20 7861 1000" }
  ];
  const assignedManager = {
    id: `mgr-${item.id}`,
    ...managers[index % managers.length]
  };

  const totalUnits = Math.round(item.totalAreaSqFt / 1200);
  const occupiedUnits = Math.round(totalUnits * (item.occupancyRate / 100));
  const tenantMetrics = {
    totalUnits,
    occupiedUnits,
    avgLeaseMonths: 24,
    onTimePaymentRate: 98
  };

  return {
    ...item,
    coverImage,
    galleryImages,
    status: "active",
    totalShares,
    availableShares,
    fundedPercentage,
    estimatedMonthlyRent,
    monthlyPerShareRent,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation,
    aiValuationConfidence,
    marketDrivers: {
      locationDemand: 90 + (index % 10),
      marketMomentum: 88 + (index % 11),
      propertyCondition: 92 + (index % 8),
      rentalDemand: 91 + (index % 9)
    },
    valuationHistory,
    aiForecast,
    rentalHistory,
    dueDiligenceScore,
    dueDiligenceItems,
    operatingExpenses,
    assignedManager,
    tenantMetrics,
    propertyPassportId,
    transparencyScore,
    lastInspectionDate: "2026-08-15",
    legalReviewStatus: "Verified",
    isDemo: true
  };
}

// Generate the array
const fullNewProperties = ALL_NEW_LISTINGS.map(buildFullProperty);

console.log(`Successfully generated ${fullNewProperties.length} new international properties.`);

// Read existing mockProperties.ts
const mockFilePath = path.join(__dirname, '../src/data/mockProperties.ts');
let mockContent = fs.readFileSync(mockFilePath, 'utf8');

// Find the last closing bracket `];`
const lastBracketIdx = mockContent.lastIndexOf('];');
if (lastBracketIdx === -1) {
  console.error("Could not find closing bracket in mockProperties.ts");
  process.exit(1);
}

// Convert fullNewProperties to TypeScript code
const newPropertiesCode = fullNewProperties.map((p) => {
  return "  " + JSON.stringify(p, null, 2).replace(/\n/g, "\n  ") + ",";
}).join("\n");

// Splice into mockProperties.ts
const updatedContent = mockContent.slice(0, lastBracketIdx) + "\n" + newPropertiesCode + "\n];\n";
fs.writeFileSync(mockFilePath, updatedContent, 'utf8');
console.log(`Successfully appended ${fullNewProperties.length} properties to src/data/mockProperties.ts!`);


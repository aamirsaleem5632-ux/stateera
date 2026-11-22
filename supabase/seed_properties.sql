BEGIN;

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-dubai-marina-tower', 'marina-horizon-luxury-tower', 'Marina Horizon Luxury Tower', 'Marina Horizon Luxury Tower',
      'Ultra-luxury waterfront residential tower with private marina berths & sky pool', 'Located along the prestigious Dubai Marina waterfront, Marina Horizon comprises 42 luxury apartments offering unobstructed Arabian Gulf views. Managed by Emaar Hospitality partners, the asset boasts 98% year-round occupancy, premium concierge services, and stable foreign currency denominated rental yields.', 'Dubai', 'United Arab Emirates',
      'Waterfront Walk, Dubai Marina, Dubai, UAE', 'waterfront', 'active', 'Emaar & Sovereign Properties',
      2022, 64500, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
      8400000, 100, 84000, 14200,
      83.1, 11.2, 9.4, 98,
      78400, 0.933, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-nyc-manhattan-penthouse', 'one-madison-luxury-penthouse-suites', 'One Madison Glass Penthouse Suites', 'One Madison Glass Penthouse Suites',
      'Prime Manhattan glass residential condominium overlooking Madison Square Park', 'An architectural icon in Manhattan''s Flatiron District. Floor-to-ceiling glass walls frame panoramic Empire State and skyline views. The asset features blue-chip corporate executive tenancies on multi-year master leases, providing high credit security.', 'New York', 'United States',
      '23 E 22nd Street, Flatiron District, New York, NY 10010', 'luxury', 'active', 'Related Companies',
      2021, 38200, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
      12500000, 125, 100000, 22400,
      77.6, 9.8, 8.2, 100,
      102000, 1.02, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-london-mayfair-commercial', 'mayfair-heritage-commercial-hub', 'Mayfair Heritage Chambers & Offices', 'Mayfair Heritage Chambers & Offices',
      'Grade-II listed corporate commercial headquarters in central London', 'Situated on Berkeley Square, Mayfair Heritage Chambers pairs classical Georgian architecture with high-tech boutique office fit-outs. Leased to private equity and international wealth management firms with 7-year indexed lease agreements.', 'London', 'United Kingdom',
      '14 Berkeley Square, Mayfair, London W1J 6BQ', 'commercial', 'active', 'Grosvenor Heritage Estates',
      2019, 52000, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      16800000, 200, 84000, 9800,
      88.3, 10.4, 8.8, 100,
      145600, 1.733, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-zurich-lakeview-villas', 'zurich-lakeside-residences-and-villas', 'Lake Zurich Alpine Panorama Villas', 'Lake Zurich Alpine Panorama Villas',
      'Private lakeside luxury estate with private boat dock and geothermal heating', 'Nestled along the golden coast of Lake Zurich (Zürichsee), this sustainable luxury villa estate delivers high-yield Swiss Franc rental revenues. Designed with Swiss passive-house energy standards and private infinity pools.', 'Zurich', 'Switzerland',
      'Seestrasse 188, 8700 Küsnacht, Zurich, Switzerland', 'villa', 'active', 'Helvetia Alpine Development',
      2023, 29800, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80',
      9600000, 150, 64000, 11200,
      82.5, 8.9, 7.6, 96,
      71200, 1.112, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-singapore-marina-bay', 'marina-one-residences-singapore', 'Marina One Garden Penthouse', 'Marina One Garden Penthouse',
      'Futuristic biodiversity garden complex in Singapore''s financial core', 'Marina One is an internationally celebrated integrated urban development in Marina South, featuring the ''Green Heart'' bio-diverse garden. High-density multinational tech and financial executives make this an evergreen rental yield asset.', 'Singapore', 'Singapore',
      '21 Marina Way, Marina South, Singapore 018978', 'residential', 'active', 'M+S Pte Ltd (Khazanah & Temasek)',
      2020, 44000, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&auto=format&fit=crop&q=80',
      14200000, 100, 142000, 31000,
      78.2, 9.6, 8.3, 98,
      113600, 0.8, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-paris-champs-elysees', 'haussmann-prestige-apartments-paris', 'Champs-Élysées Haussmannian Mansions', 'Champs-Élysées Haussmannian Mansions',
      'Restored 19th-century limestone palace with high ceilings and herringbone parquet', 'Located in the 8th arrondissement of Paris steps from the Arc de Triomphe, this magnificent Haussmannian building hosts luxury diplomatic residences and high-end creative agency showrooms with long-tenure institutional covenants.', 'Paris', 'France',
      '28 Avenue des Champs-Élysées, 75008 Paris, France', 'commercial', 'active', 'Paris Prestige Patrimoine',
      2018, 36000, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80',
      11400000, 120, 95000, 16700,
      82.4, 9.2, 7.9, 97,
      87400, 0.92, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-miami-biscayne-bay', 'biscayne-waterfront-villa-estate', 'Biscayne Bay Coastal Haven', 'Biscayne Bay Coastal Haven',
      'Ultra-luxury modern waterfront villa with private yacht dock and solar microgrid', 'Located on Venetian Islands in Miami Beach, this architectural masterpiece features 120 feet of deep water frontage, floor-to-ceiling hurricane glass, and vacation rental permits yielding premium seasonal distributions.', 'Miami', 'United States',
      '420 Venetian Way, San Marino Island, Miami Beach, FL 33139', 'waterfront', 'active', 'Coastal Modern Architectural Builders',
      2023, 18400, 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
      7200000, 80, 90000, 24300,
      73, 11.8, 9.8, 95,
      70800, 0.786, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-tokyo-ginza-residences', 'tokyo-ginza-luxury-lofts', 'Ginza Skyward Urban Lofts', 'Ginza Skyward Urban Lofts',
      'Minimalist Japanese high-efficiency residential suites in prime Chuo-ku', 'Located near Ginza Six, this high-yield Japanese residential development provides seismic-isolated luxury lofts for multinational executives and diplomats in central Tokyo.', 'Tokyo', 'Japan',
      '6-10-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan', 'residential', 'active', 'Mori Building Co. & Nomura Real Estate',
      2022, 31200, 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80',
      6900000, 75, 92000, 18400,
      80, 8.7, 7.5, 99,
      50025, 0.543, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-dha-karachi-tower', 'dha-karachi-ocean-residences', 'DHA Karachi Ocean Residences', 'DHA Karachi Ocean Residences',
      'Premium sea-facing apartments in Defence Housing Authority, Karachi — Phase VIII', 'Strategically located along the Karachi coastline in DHA Phase VIII, Ocean Residences comprises 56 fully furnished apartments managed by a RERA-registered operator. The project enjoys 95% occupancy year-round driven by corporate tenants and expatriate demand. Net rental yields are supported by scarce sea-view inventory in one of Pakistan''s most coveted gated communities. PKR 185,000,000 total asset value underwritten by independent valuation.', 'Karachi', 'Pakistan',
      'Phase VIII, DHA Defence, Karachi, Sindh 75500', 'waterfront', 'active', 'Arif Habib Corporation & DHA Developers',
      2023, 48000, 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&auto=format&fit=crop&q=80',
      660000, 33, 20000, 4800,
      76, 12.4, 10.2, 95,
      5610, 0.281, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-gulberg-lahore-plaza', 'gulberg-galleria-commercial-plaza', 'Gulberg Galleria Commercial Plaza', 'Gulberg Galleria Commercial Plaza',
      'Triple-A grade office & retail complex in Lahore''s premier business district', 'Gulberg Galleria is a modern mixed-use commercial development in Lahore''s Gulberg III business corridor — Pakistan''s answer to central business districts. The 9-storey tower hosts multinational corporate tenants on 3-year leases and houses a retail ground floor with anchor F&B brands. High demand from blue-chip tenants drives exceptional rental stability and above-market yields. PKR 350,000,000 independently appraised.', 'Lahore', 'Pakistan',
      'Main Boulevard Gulberg III, Lahore, Punjab 54660', 'commercial', 'active', 'Packages Mall Developers & Lahore Commerce Group',
      2022, 72000, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      1250000, 50, 25000, 7500,
      70, 13.8, 11.4, 97,
      11875, 0.475, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-bahria-town-islamabad', 'bahria-heights-islamabad-residences', 'Bahria Heights Islamabad Residences', 'Bahria Heights Islamabad Residences',
      'Smart gated apartment community with 24/7 amenities in Bahria Town Islamabad', 'Bahria Heights is a 120-unit gated residential complex inside Bahria Town Islamabad — Pakistan''s most iconic master-planned community. Units are equipped with smart home systems, backed-up power, and fibre internet. The project serves young professionals and families relocating to the capital, maintaining 94% occupancy with consistent rental growth of 11% year-on-year. PKR 280,000,000 appraised value.', 'Islamabad', 'Pakistan',
      'Sector E-8, Bahria Town, Islamabad Capital Territory 44000', 'residential', 'active', 'Bahria Town (Pvt) Ltd',
      2021, 95000, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80',
      1000000, 25, 40000, 11200,
      72, 11.6, 9.8, 94,
      8167, 0.204, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-emaar-dha-karachi-mall', 'emaar-coral-towers-karachi', 'Emaar Coral Towers Karachi', 'Emaar Coral Towers Karachi',
      'Iconic twin-tower luxury residential complex on Karachi''s Clifton beach front', 'Co-developed with Emaar Properties, Coral Towers is a landmark twin-tower luxury project overlooking Clifton Beach. The 180-unit complex features hotel-branded serviced apartments attracting international business visitors and high-net-worth Karachi residents. With an international hotel operator managing the asset, occupancy and rental consistency are exceptionally high. PKR 520,000,000 total appraised value.', 'Karachi', 'Pakistan',
      'Clifton Block 5, Karachi, Sindh 75600', 'luxury', 'active', 'Emaar Pakistan & HBL Properties',
      2024, 142000, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
      1860000, 62, 30000, 8100,
      73, 12.9, 10.8, 93,
      16740, 0.558, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-faisal-town-islamabad-villas', 'faisal-town-islamabad-garden-villas', 'Faisal Town Islamabad Garden Villas', 'Faisal Town Islamabad Garden Villas',
      'Exclusive 4-bedroom gated villas with private gardens near Islamabad Expressway', 'A collection of 28 premium 4-bedroom villas inside Faisal Town, one of Islamabad''s most prestigious gated communities. Each villa features a private garden, rooftop terrace, and 3-car garage. Proximity to Islamabad International Airport and CPEC economic zones drives sustained demand from diplomats, senior government officials, and corporate executives. PKR 420,000,000 total appraised value.', 'Islamabad', 'Pakistan',
      'Block C, Faisal Town, Islamabad Capital Territory 44220', 'villa', 'active', 'Faisal Town Developers Pvt Ltd',
      2020, 56000, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      1500000, 75, 20000, 6000,
      70, 10.4, 8.7, 92,
      10875, 0.544, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-pcw-peshawar-business', 'peshawar-city-walk-commercial-centre', 'Peshawar City Walk Commercial Centre', 'Peshawar City Walk Commercial Centre',
      'Modern retail & office complex at the gateway to KPK''s fastest-growing city', 'Peshawar City Walk is a 6-floor mixed-use commercial development in University Town, Peshawar''s most upscale neighbourhood. The building hosts technology companies, educational institutes, and established retail brands benefiting from KPK''s rapid CPEC-driven economic growth. High foot traffic and scarce Grade-A supply create strong rental demand. PKR 165,000,000 appraised value.', 'Peshawar', 'Pakistan',
      'University Town, Peshawar, Khyber Pakhtunkhwa 25000', 'commercial', 'active', 'Frontier Works Organization & KPK Builders',
      2022, 42000, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=80',
      590000, 29.5, 20000, 7400,
      63, 14.2, 11.9, 90,
      5856, 0.293, '2026-12-15'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-mall-road-lahore-boutique', 'mall-road-lahore-boutique-residences', 'Mall Road Lahore Boutique Residences', 'Mall Road Lahore Boutique Residences',
      'Heritage-view luxury apartments overlooking Lahore''s iconic Mall Road and Lawrence Gardens', 'A 36-unit boutique residential development offering panoramic views of the historic Mall Road, Lawrence Gardens, and Lahore Museum. Steps from the High Court and Government offices, the building attracts high-income lawyers, senior judges, and executives seeking premium Lahore addresses. The colonial-era neighbourhood commands a consistent 15% rent premium over comparable areas. PKR 240,000,000 appraised value.', 'Lahore', 'Pakistan',
      'Mall Road, Civil Lines, Lahore, Punjab 54000', 'residential', 'active', 'Civil Lines Property Development Ltd',
      2023, 32000, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&auto=format&fit=crop&q=80',
      860000, 43, 20000, 6600,
      67, 11.8, 9.9, 96,
      7097, 0.355, '2026-12-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-multan-agri-warehouse', 'multan-southern-logistics-park', 'Multan Southern Logistics Park', 'Multan Southern Logistics Park',
      'High-yield industrial warehouse & cold storage complex serving South Punjab''s agricultural belt', 'Strategically located 8 km from Multan International Airport, Southern Logistics Park is a 180,000 sq ft industrial complex offering temperature-controlled cold storage and dry warehousing to agri-exporters, FMCG distributors, and pharmaceutical companies. Pakistan''s $5B agri-export boom drives exceptional demand for modern cold storage. 10-year anchor lease signed with a leading food conglomerate. PKR 310,000,000 appraised.', 'Multan', 'Pakistan',
      'Industrial Zone, Sher Shah Road, Multan, Punjab 60000', 'commercial', 'active', 'South Punjab Industrial Estates & FWBL',
      2021, 180000, 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&auto=format&fit=crop&q=80',
      1110000, 37, 30000, 10500,
      65, 15.6, 13.1, 100,
      12128, 0.404, '2026-12-15'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-ncp-rawalpindi-apartments', 'new-city-plaza-rawalpindi-apartments', 'New City Plaza Rawalpindi Apartments', 'New City Plaza Rawalpindi Apartments',
      'Affordable high-yield furnished apartments near Rawalpindi''s Saddar commercial hub', 'New City Plaza offers 80 fully furnished studio and 1-bedroom apartments in Rawalpindi''s Saddar district, a bustling commercial and transit hub directly connected to Islamabad Metro. The complex targets young professionals, students at nearby universities, and short-stay business travellers. Consistent 97% occupancy with rising rents driven by metro-linked demand. PKR 160,000,000 appraised value.', 'Rawalpindi', 'Pakistan',
      'Saddar Bazaar Road, Rawalpindi, Punjab 46000', 'residential', 'active', 'Rawalpindi Real Estate Ventures',
      2022, 44000, 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1200&auto=format&fit=crop&q=80',
      572000, 28.6, 20000, 9000,
      55, 13.4, 11.2, 97,
      5341, 0.267, '2026-12-15'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  

    INSERT INTO public.properties (
      id, slug, title, name, headline, description, city, country, address,
      category, status, developer, year_built, total_area_sqft, cover_image,
      total_valuation, share_price, total_shares, available_shares,
      funded_percentage, gross_yield, net_yield, occupancy_rate,
      estimated_monthly_rent, monthly_per_share_rent, next_payout_date
    ) VALUES (
      'prop-pk-hyderabad-tech-hub', 'hyderabad-tech-valley-offices', 'Hyderabad Tech Valley Office Park', 'Hyderabad Tech Valley Office Park',
      'Modern IT park & co-working hub in Pakistan''s Silicon Valley — Hyderabad''s tech corridor', 'Hyderabad Tech Valley is a purpose-built IT office park on Qasimabad''s emerging technology corridor, home to Pakistan''s growing IT export industry. The park hosts 14 established software houses with 5-year leases, benefiting from government IT zone incentives and 24/7 fibre connectivity. Pakistan''s IT exports surpassing $3B annually create exceptional demand for Grade-A tech office space. PKR 195,000,000 appraised value.', 'Hyderabad', 'Pakistan',
      'IT Park Road, Qasimabad, Hyderabad, Sindh 71000', 'commercial', 'coming_soon', 'Sindh IT Board & Tech Valley Developers',
      2024, 58000, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
      697000, 34.85, 20000, 18000,
      10, 14.8, 12.4, 100,
      7205, 0.36, '2027-03-01'
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      name = EXCLUDED.name,
      total_valuation = EXCLUDED.total_valuation,
      share_price = EXCLUDED.share_price,
      total_shares = EXCLUDED.total_shares,
      available_shares = EXCLUDED.available_shares,
      monthly_per_share_rent = EXCLUDED.monthly_per_share_rent;
  
COMMIT;
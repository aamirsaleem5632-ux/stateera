import { Property } from "@/types/property";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-dubai-marina-tower",
    slug: "marina-horizon-luxury-tower",
    title: "Marina Horizon Luxury Tower",
    headline: "Ultra-luxury waterfront residential tower with private marina berths & sky pool",
    description: "Located along the prestigious Dubai Marina waterfront, Marina Horizon comprises 42 luxury apartments offering unobstructed Arabian Gulf views. Managed by Emaar Hospitality partners, the asset boasts 98% year-round occupancy, premium concierge services, and stable foreign currency denominated rental yields.",
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Waterfront Walk, Dubai Marina, Dubai, UAE",
    category: "waterfront",
    status: "active",
    developer: "Emaar & Sovereign Properties",
    yearBuilt: 2022,
    totalAreaSqFt: 64500,
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 8400000,
    sharePrice: 100,
    totalShares: 84000,
    availableShares: 14200,
    fundedPercentage: 83.1,
    grossYield: 11.2,
    netYield: 9.4,
    occupancyRate: 98,
    estimatedMonthlyRent: 78400,
    monthlyPerShareRent: 0.933,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 8650000,
    aiValuationConfidence: 96,
    marketDrivers: {
      locationDemand: 96,
      marketMomentum: 91,
      propertyCondition: 98,
      rentalDemand: 94,
    },
    valuationHistory: [
      { date: "2025-11", value: 7800000, sharePrice: 92.8 },
      { date: "2026-02", value: 7950000, sharePrice: 94.6 },
      { date: "2026-05", value: 8150000, sharePrice: 97.0 },
      { date: "2026-08", value: 8300000, sharePrice: 98.8 },
      { date: "2026-11", value: 8400000, sharePrice: 100.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 8420000, mid: 8460000, high: 8510000 },
      { month: "Jan 2027", low: 8460000, mid: 8520000, high: 8590000 },
      { month: "Feb 2027", low: 8500000, mid: 8590000, high: 8680000 },
      { month: "Mar 2027", low: 8550000, mid: 8650000, high: 8760000 },
      { month: "Apr 2027", low: 8600000, mid: 8710000, high: 8840000 },
      { month: "May 2027", low: 8650000, mid: 8780000, high: 8930000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 77200, expenses: 11400, netDistributed: 65800, payoutPerShare: 0.783 },
      { month: "Jul 2026", grossCollected: 78000, expenses: 11500, netDistributed: 66500, payoutPerShare: 0.791 },
      { month: "Aug 2026", grossCollected: 78100, expenses: 11500, netDistributed: 66600, payoutPerShare: 0.792 },
      { month: "Sep 2026", grossCollected: 78400, expenses: 11600, netDistributed: 66800, payoutPerShare: 0.795 },
      { month: "Oct 2026", grossCollected: 78400, expenses: 11550, netDistributed: 66850, payoutPerShare: 0.796 },
    ],
    dueDiligenceScore: 98,
    dueDiligenceItems: [
      {
        id: "dd-101",
        category: "Legal & Title",
        title: "Dubai Land Department Freehold Title Certificate",
        status: "Verified",
        issuer: "Dubai Land Department (DLD)",
        verifiedDate: "2026-01-15",
        expiryDate: "2036-01-15",
        notes: "Clean title deed without third-party encumbrances or mortgages.",
        fileSize: "2.4 MB PDF",
      },
      {
        id: "dd-102",
        category: "Inspection & Condition",
        title: "Independent Structural & MEP Engineering Audit",
        status: "Verified",
        issuer: "Bureau Veritas International",
        verifiedDate: "2026-08-10",
        expiryDate: "2027-08-10",
        notes: "Grade-A building structural integrity with zero seismic or MEP defects.",
        fileSize: "5.1 MB PDF",
      },
      {
        id: "dd-103",
        category: "Financial Audit",
        title: "Historical Rental Cashflow & Escrow Audit",
        status: "Verified",
        issuer: "KPMG Middle East",
        verifiedDate: "2026-09-30",
        expiryDate: "2027-09-30",
        notes: "Validated 100% bank escrow deposit reconciliation and tax filings.",
        fileSize: "3.8 MB PDF",
      },
      {
        id: "dd-104",
        category: "Insurance & Risk",
        title: "Comprehensive All-Risk Property & Loss of Rent Insurance",
        status: "Verified",
        issuer: "Zurich Global Corporate Insurance",
        verifiedDate: "2026-04-01",
        expiryDate: "2027-04-01",
        notes: "Full replacement value coverage with $15M policy ceiling.",
        fileSize: "1.9 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 34000,
      insuranceAnnual: 22000,
      maintenanceAnnual: 38000,
      managementFeeRate: 0.075,
      capitalReservesAnnual: 25000,
    },
    assignedManager: {
      id: "mgr-01",
      name: "Tariq Al-Mansoor",
      company: "Apex Prime Real Estate Asset Management",
      rating: 4.9,
      phone: "+971 4 382 9100",
    },
    tenantMetrics: {
      totalUnits: 42,
      occupiedUnits: 41,
      avgLeaseMonths: 24,
      onTimePaymentRate: 99.1,
    },
  },
  {
    id: "prop-nyc-manhattan-penthouse",
    slug: "one-madison-luxury-penthouse-suites",
    title: "One Madison Glass Penthouse Suites",
    headline: "Prime Manhattan glass residential condominium overlooking Madison Square Park",
    description: "An architectural icon in Manhattan's Flatiron District. Floor-to-ceiling glass walls frame panoramic Empire State and skyline views. The asset features blue-chip corporate executive tenancies on multi-year master leases, providing high credit security.",
    city: "New York",
    country: "United States",
    address: "23 E 22nd Street, Flatiron District, New York, NY 10010",
    category: "luxury",
    status: "active",
    developer: "Related Companies",
    yearBuilt: 2021,
    totalAreaSqFt: 38200,
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 12500000,
    sharePrice: 125,
    totalShares: 100000,
    availableShares: 22400,
    fundedPercentage: 77.6,
    grossYield: 9.8,
    netYield: 8.2,
    occupancyRate: 100,
    estimatedMonthlyRent: 102000,
    monthlyPerShareRent: 1.02,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 12850000,
    aiValuationConfidence: 94,
    marketDrivers: {
      locationDemand: 98,
      marketMomentum: 88,
      propertyCondition: 97,
      rentalDemand: 96,
    },
    valuationHistory: [
      { date: "2025-11", value: 11900000, sharePrice: 119.0 },
      { date: "2026-02", value: 12100000, sharePrice: 121.0 },
      { date: "2026-05", value: 12300000, sharePrice: 123.0 },
      { date: "2026-08", value: 12450000, sharePrice: 124.5 },
      { date: "2026-11", value: 12500000, sharePrice: 125.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 12520000, mid: 12580000, high: 12640000 },
      { month: "Jan 2027", low: 12580000, mid: 12670000, high: 12760000 },
      { month: "Feb 2027", low: 12640000, mid: 12760000, high: 12890000 },
      { month: "Mar 2027", low: 12700000, mid: 12850000, high: 13010000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 101000, expenses: 16200, netDistributed: 84800, payoutPerShare: 0.848 },
      { month: "Jul 2026", grossCollected: 101500, expenses: 16300, netDistributed: 85200, payoutPerShare: 0.852 },
      { month: "Aug 2026", grossCollected: 102000, expenses: 16400, netDistributed: 85600, payoutPerShare: 0.856 },
      { month: "Sep 2026", grossCollected: 102000, expenses: 16350, netDistributed: 85650, payoutPerShare: 0.856 },
      { month: "Oct 2026", grossCollected: 102000, expenses: 16300, netDistributed: 85700, payoutPerShare: 0.857 },
    ],
    dueDiligenceScore: 97,
    dueDiligenceItems: [
      {
        id: "dd-201",
        category: "Legal & Title",
        title: "New York County Register Title Deed & Title Insurance",
        status: "Verified",
        issuer: "First American Title Insurance Co.",
        verifiedDate: "2026-02-14",
        expiryDate: "2036-02-14",
        notes: "Fee-simple condominium ownership recorded in ACRIS.",
        fileSize: "4.2 MB PDF",
      },
      {
        id: "dd-202",
        category: "Financial Audit",
        title: "HOA Reserve Fund Financial Audit",
        status: "Verified",
        issuer: "Deloitte New York",
        verifiedDate: "2026-07-15",
        expiryDate: "2027-07-15",
        notes: "Fully funded condo reserve with zero upcoming capital assessments.",
        fileSize: "2.8 MB PDF",
      },
      {
        id: "dd-203",
        category: "Insurance & Risk",
        title: "Master Commercial Liability & Flood Insurance",
        status: "Verified",
        issuer: "Chubb North America",
        verifiedDate: "2026-05-01",
        expiryDate: "2027-05-01",
        notes: "Comprehensive umbrella liability and replacement endorsement.",
        fileSize: "3.1 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 92000,
      insuranceAnnual: 34000,
      maintenanceAnnual: 42000,
      managementFeeRate: 0.08,
      capitalReservesAnnual: 30000,
    },
    assignedManager: {
      id: "mgr-02",
      name: "Marcus Vance",
      company: "Vance & Hudson Property Advisors LLC",
      rating: 4.95,
      phone: "+1 (212) 840-7700",
    },
    tenantMetrics: {
      totalUnits: 18,
      occupiedUnits: 18,
      avgLeaseMonths: 36,
      onTimePaymentRate: 100,
    },
  },
  {
    id: "prop-london-mayfair-commercial",
    slug: "mayfair-heritage-commercial-hub",
    title: "Mayfair Heritage Chambers & Offices",
    headline: "Grade-II listed corporate commercial headquarters in central London",
    description: "Situated on Berkeley Square, Mayfair Heritage Chambers pairs classical Georgian architecture with high-tech boutique office fit-outs. Leased to private equity and international wealth management firms with 7-year indexed lease agreements.",
    city: "London",
    country: "United Kingdom",
    address: "14 Berkeley Square, Mayfair, London W1J 6BQ",
    category: "commercial",
    status: "active",
    developer: "Grosvenor Heritage Estates",
    yearBuilt: 2019,
    totalAreaSqFt: 52000,
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 16800000,
    sharePrice: 200,
    totalShares: 84000,
    availableShares: 9800,
    fundedPercentage: 88.3,
    grossYield: 10.4,
    netYield: 8.8,
    occupancyRate: 100,
    estimatedMonthlyRent: 145600,
    monthlyPerShareRent: 1.733,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 17200000,
    aiValuationConfidence: 95,
    marketDrivers: {
      locationDemand: 99,
      marketMomentum: 87,
      propertyCondition: 95,
      rentalDemand: 93,
    },
    valuationHistory: [
      { date: "2025-11", value: 16100000, sharePrice: 191.6 },
      { date: "2026-02", value: 16350000, sharePrice: 194.6 },
      { date: "2026-05", value: 16550000, sharePrice: 197.0 },
      { date: "2026-08", value: 16700000, sharePrice: 198.8 },
      { date: "2026-11", value: 16800000, sharePrice: 200.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 16850000, mid: 16920000, high: 17050000 },
      { month: "Jan 2027", low: 16920000, mid: 17040000, high: 17180000 },
      { month: "Feb 2027", low: 17000000, mid: 17150000, high: 17300000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 144000, expenses: 21000, netDistributed: 123000, payoutPerShare: 1.464 },
      { month: "Jul 2026", grossCollected: 145000, expenses: 21100, netDistributed: 123900, payoutPerShare: 1.475 },
      { month: "Aug 2026", grossCollected: 145000, expenses: 21200, netDistributed: 123800, payoutPerShare: 1.474 },
      { month: "Sep 2026", grossCollected: 145600, expenses: 21250, netDistributed: 124350, payoutPerShare: 1.480 },
      { month: "Oct 2026", grossCollected: 145600, expenses: 21200, netDistributed: 124400, payoutPerShare: 1.481 },
    ],
    dueDiligenceScore: 99,
    dueDiligenceItems: [
      {
        id: "dd-301",
        category: "Legal & Title",
        title: "HM Land Registry Official Copy of Register Title",
        status: "Verified",
        issuer: "HM Land Registry UK",
        verifiedDate: "2026-03-01",
        expiryDate: "2036-03-01",
        notes: "Absolute freehold title registered under Title No. NGL98240.",
        fileSize: "3.5 MB PDF",
      },
      {
        id: "dd-302",
        category: "Inspection & Condition",
        title: "Commercial EPC & Heritage Conservation Compliance",
        status: "Verified",
        issuer: "Historic England & Cundall Engineering",
        verifiedDate: "2026-06-20",
        expiryDate: "2031-06-20",
        notes: "EPC Rating B (top 5% for heritage commercial assets in Westminster).",
        fileSize: "4.7 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 84000,
      insuranceAnnual: 48000,
      maintenanceAnnual: 52000,
      managementFeeRate: 0.07,
      capitalReservesAnnual: 40000,
    },
    assignedManager: {
      id: "mgr-03",
      name: "Eleanor Sterling",
      company: "Savills Commercial Portfolio Management",
      rating: 4.92,
      phone: "+44 20 7499 8644",
    },
    tenantMetrics: {
      totalUnits: 12,
      occupiedUnits: 12,
      avgLeaseMonths: 84,
      onTimePaymentRate: 100,
    },
  },
  {
    id: "prop-zurich-lakeview-villas",
    slug: "zurich-lakeside-residences-and-villas",
    title: "Lake Zurich Alpine Panorama Villas",
    headline: "Private lakeside luxury estate with private boat dock and geothermal heating",
    description: "Nestled along the golden coast of Lake Zurich (Zürichsee), this sustainable luxury villa estate delivers high-yield Swiss Franc rental revenues. Designed with Swiss passive-house energy standards and private infinity pools.",
    city: "Zurich",
    country: "Switzerland",
    address: "Seestrasse 188, 8700 Küsnacht, Zurich, Switzerland",
    category: "villa",
    status: "active",
    developer: "Helvetia Alpine Development",
    yearBuilt: 2023,
    totalAreaSqFt: 29800,
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 9600000,
    sharePrice: 150,
    totalShares: 64000,
    availableShares: 11200,
    fundedPercentage: 82.5,
    grossYield: 8.9,
    netYield: 7.6,
    occupancyRate: 96,
    estimatedMonthlyRent: 71200,
    monthlyPerShareRent: 1.112,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 9850000,
    aiValuationConfidence: 97,
    marketDrivers: {
      locationDemand: 98,
      marketMomentum: 89,
      propertyCondition: 99,
      rentalDemand: 95,
    },
    valuationHistory: [
      { date: "2025-11", value: 9150000, sharePrice: 143.0 },
      { date: "2026-02", value: 9300000, sharePrice: 145.3 },
      { date: "2026-05", value: 9450000, sharePrice: 147.6 },
      { date: "2026-08", value: 9550000, sharePrice: 149.2 },
      { date: "2026-11", value: 9600000, sharePrice: 150.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 9620000, mid: 9670000, high: 9740000 },
      { month: "Jan 2027", low: 9660000, mid: 9730000, high: 9820000 },
      { month: "Feb 2027", low: 9710000, mid: 9810000, high: 9930000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 70000, expenses: 9500, netDistributed: 60500, payoutPerShare: 0.945 },
      { month: "Jul 2026", grossCollected: 71000, expenses: 9600, netDistributed: 61400, payoutPerShare: 0.959 },
      { month: "Aug 2026", grossCollected: 71200, expenses: 9600, netDistributed: 61600, payoutPerShare: 0.962 },
      { month: "Sep 2026", grossCollected: 71200, expenses: 9650, netDistributed: 61550, payoutPerShare: 0.961 },
      { month: "Oct 2026", grossCollected: 71200, expenses: 9600, netDistributed: 61600, payoutPerShare: 0.962 },
    ],
    dueDiligenceScore: 98,
    dueDiligenceItems: [
      {
        id: "dd-401",
        category: "Legal & Title",
        title: "Swiss Cantonal Land Registry Deed (Grundbuchauszug)",
        status: "Verified",
        issuer: "Notariat & Grundbuchamt Küsnacht",
        verifiedDate: "2026-01-20",
        expiryDate: "2036-01-20",
        notes: "Full unencumbered title registration in the Canton of Zurich.",
        fileSize: "2.1 MB PDF",
      },
      {
        id: "dd-402",
        category: "Inspection & Condition",
        title: "Swiss Minergie-P Eco-Certification",
        status: "Verified",
        issuer: "Minergie Association Switzerland",
        verifiedDate: "2026-04-12",
        expiryDate: "2031-04-12",
        notes: "Net-zero operational emissions with geothermal heat pumps.",
        fileSize: "3.4 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 28000,
      insuranceAnnual: 18000,
      maintenanceAnnual: 24000,
      managementFeeRate: 0.065,
      capitalReservesAnnual: 20000,
    },
    assignedManager: {
      id: "mgr-04",
      name: "Hans-Peter Weber",
      company: "Zurich Swiss Alpine Wealth & Property AG",
      rating: 4.88,
      phone: "+41 44 215 9000",
    },
    tenantMetrics: {
      totalUnits: 6,
      occupiedUnits: 6,
      avgLeaseMonths: 48,
      onTimePaymentRate: 100,
    },
  },
  {
    id: "prop-singapore-marina-bay",
    slug: "marina-one-residences-singapore",
    title: "Marina One Garden Penthouse",
    headline: "Futuristic biodiversity garden complex in Singapore's financial core",
    description: "Marina One is an internationally celebrated integrated urban development in Marina South, featuring the 'Green Heart' bio-diverse garden. High-density multinational tech and financial executives make this an evergreen rental yield asset.",
    city: "Singapore",
    country: "Singapore",
    address: "21 Marina Way, Marina South, Singapore 018978",
    category: "residential",
    status: "active",
    developer: "M+S Pte Ltd (Khazanah & Temasek)",
    yearBuilt: 2020,
    totalAreaSqFt: 44000,
    coverImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 14200000,
    sharePrice: 100,
    totalShares: 142000,
    availableShares: 31000,
    fundedPercentage: 78.2,
    grossYield: 9.6,
    netYield: 8.3,
    occupancyRate: 98,
    estimatedMonthlyRent: 113600,
    monthlyPerShareRent: 0.80,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 14600000,
    aiValuationConfidence: 96,
    marketDrivers: {
      locationDemand: 99,
      marketMomentum: 92,
      propertyCondition: 98,
      rentalDemand: 97,
    },
    valuationHistory: [
      { date: "2025-11", value: 13500000, sharePrice: 95.0 },
      { date: "2026-02", value: 13750000, sharePrice: 96.8 },
      { date: "2026-05", value: 13950000, sharePrice: 98.2 },
      { date: "2026-08", value: 14100000, sharePrice: 99.3 },
      { date: "2026-11", value: 14200000, sharePrice: 100.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 14240000, mid: 14310000, high: 14400000 },
      { month: "Jan 2027", low: 14300000, mid: 14420000, high: 14550000 },
      { month: "Feb 2027", low: 14380000, mid: 14530000, high: 14690000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 112000, expenses: 14800, netDistributed: 97200, payoutPerShare: 0.684 },
      { month: "Jul 2026", grossCollected: 113000, expenses: 14900, netDistributed: 98100, payoutPerShare: 0.690 },
      { month: "Aug 2026", grossCollected: 113500, expenses: 15000, netDistributed: 98500, payoutPerShare: 0.693 },
      { month: "Sep 2026", grossCollected: 113600, expenses: 15000, netDistributed: 98600, payoutPerShare: 0.694 },
      { month: "Oct 2026", grossCollected: 113600, expenses: 14950, netDistributed: 98650, payoutPerShare: 0.694 },
    ],
    dueDiligenceScore: 99,
    dueDiligenceItems: [
      {
        id: "dd-501",
        category: "Legal & Title",
        title: "Singapore SLA Subsidiary Strata Certificate of Title",
        status: "Verified",
        issuer: "Singapore Land Authority (SLA)",
        verifiedDate: "2026-02-18",
        expiryDate: "2036-02-18",
        notes: "Clean title deed under Singapore Strata Titles Board.",
        fileSize: "2.9 MB PDF",
      },
      {
        id: "dd-502",
        category: "Inspection & Condition",
        title: "BCA Green Mark Platinum Building Audit",
        status: "Verified",
        issuer: "Building and Construction Authority (BCA)",
        verifiedDate: "2026-05-30",
        expiryDate: "2029-05-30",
        notes: "Top-tier environmental rating for energy and water conservation.",
        fileSize: "4.1 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 68000,
      insuranceAnnual: 28000,
      maintenanceAnnual: 36000,
      managementFeeRate: 0.07,
      capitalReservesAnnual: 32000,
    },
    assignedManager: {
      id: "mgr-05",
      name: "Cheryl Lim",
      company: "Far East Commercial Asset Management",
      rating: 4.96,
      phone: "+65 6738 8800",
    },
    tenantMetrics: {
      totalUnits: 24,
      occupiedUnits: 24,
      avgLeaseMonths: 24,
      onTimePaymentRate: 99.5,
    },
  },
  {
    id: "prop-paris-champs-elysees",
    slug: "haussmann-prestige-apartments-paris",
    title: "Champs-Élysées Haussmannian Mansions",
    headline: "Restored 19th-century limestone palace with high ceilings and herringbone parquet",
    description: "Located in the 8th arrondissement of Paris steps from the Arc de Triomphe, this magnificent Haussmannian building hosts luxury diplomatic residences and high-end creative agency showrooms with long-tenure institutional covenants.",
    city: "Paris",
    country: "France",
    address: "28 Avenue des Champs-Élysées, 75008 Paris, France",
    category: "commercial",
    status: "active",
    developer: "Paris Prestige Patrimoine",
    yearBuilt: 2018,
    totalAreaSqFt: 36000,
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 11400000,
    sharePrice: 120,
    totalShares: 95000,
    availableShares: 16700,
    fundedPercentage: 82.4,
    grossYield: 9.2,
    netYield: 7.9,
    occupancyRate: 97,
    estimatedMonthlyRent: 87400,
    monthlyPerShareRent: 0.92,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 11750000,
    aiValuationConfidence: 95,
    marketDrivers: {
      locationDemand: 98,
      marketMomentum: 86,
      propertyCondition: 96,
      rentalDemand: 92,
    },
    valuationHistory: [
      { date: "2025-11", value: 10900000, sharePrice: 114.7 },
      { date: "2026-02", value: 11100000, sharePrice: 116.8 },
      { date: "2026-05", value: 11250000, sharePrice: 118.4 },
      { date: "2026-08", value: 11350000, sharePrice: 119.5 },
      { date: "2026-11", value: 11400000, sharePrice: 120.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 11430000, mid: 11490000, high: 11570000 },
      { month: "Jan 2027", low: 11480000, mid: 11580000, high: 11690000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 86000, expenses: 11800, netDistributed: 74200, payoutPerShare: 0.781 },
      { month: "Jul 2026", grossCollected: 87000, expenses: 11900, netDistributed: 75100, payoutPerShare: 0.790 },
      { month: "Aug 2026", grossCollected: 87400, expenses: 12000, netDistributed: 75400, payoutPerShare: 0.793 },
      { month: "Sep 2026", grossCollected: 87400, expenses: 12000, netDistributed: 75400, payoutPerShare: 0.793 },
      { month: "Oct 2026", grossCollected: 87400, expenses: 11950, netDistributed: 75450, payoutPerShare: 0.794 },
    ],
    dueDiligenceScore: 97,
    dueDiligenceItems: [
      {
        id: "dd-601",
        category: "Legal & Title",
        title: "French Cadastre & Notarial Deed of Ownership",
        status: "Verified",
        issuer: "Chambre des Notaires de Paris",
        verifiedDate: "2026-03-11",
        expiryDate: "2036-03-11",
        notes: "Full legal notarial deed without servitudes or liens.",
        fileSize: "3.2 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 54000,
      insuranceAnnual: 24000,
      maintenanceAnnual: 34000,
      managementFeeRate: 0.07,
      capitalReservesAnnual: 28000,
    },
    assignedManager: {
      id: "mgr-06",
      name: "Jean-Luc Dubois",
      company: "Dubois & Associés Gestion Immobilière",
      rating: 4.89,
      phone: "+33 1 42 68 55 00",
    },
    tenantMetrics: {
      totalUnits: 14,
      occupiedUnits: 14,
      avgLeaseMonths: 36,
      onTimePaymentRate: 98.8,
    },
  },
  {
    id: "prop-miami-biscayne-bay",
    slug: "biscayne-waterfront-villa-estate",
    title: "Biscayne Bay Coastal Haven",
    headline: "Ultra-luxury modern waterfront villa with private yacht dock and solar microgrid",
    description: "Located on Venetian Islands in Miami Beach, this architectural masterpiece features 120 feet of deep water frontage, floor-to-ceiling hurricane glass, and vacation rental permits yielding premium seasonal distributions.",
    city: "Miami",
    country: "United States",
    address: "420 Venetian Way, San Marino Island, Miami Beach, FL 33139",
    category: "waterfront",
    status: "active",
    developer: "Coastal Modern Architectural Builders",
    yearBuilt: 2023,
    totalAreaSqFt: 18400,
    coverImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 7200000,
    sharePrice: 80,
    totalShares: 90000,
    availableShares: 24300,
    fundedPercentage: 73.0,
    grossYield: 11.8,
    netYield: 9.8,
    occupancyRate: 95,
    estimatedMonthlyRent: 70800,
    monthlyPerShareRent: 0.786,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 7500000,
    aiValuationConfidence: 94,
    marketDrivers: {
      locationDemand: 97,
      marketMomentum: 94,
      propertyCondition: 99,
      rentalDemand: 96,
    },
    valuationHistory: [
      { date: "2025-11", value: 6600000, sharePrice: 73.3 },
      { date: "2026-02", value: 6850000, sharePrice: 76.1 },
      { date: "2026-05", value: 7050000, sharePrice: 78.3 },
      { date: "2026-08", value: 7150000, sharePrice: 79.4 },
      { date: "2026-11", value: 7200000, sharePrice: 80.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 7230000, mid: 7290000, high: 7370000 },
      { month: "Jan 2027", low: 7280000, mid: 7380000, high: 7490000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 69000, expenses: 10400, netDistributed: 58600, payoutPerShare: 0.651 },
      { month: "Jul 2026", grossCollected: 70000, expenses: 10500, netDistributed: 59500, payoutPerShare: 0.661 },
      { month: "Aug 2026", grossCollected: 70500, expenses: 10600, netDistributed: 59900, payoutPerShare: 0.665 },
      { month: "Sep 2026", grossCollected: 70800, expenses: 10600, netDistributed: 60200, payoutPerShare: 0.668 },
      { month: "Oct 2026", grossCollected: 70800, expenses: 10550, netDistributed: 60250, payoutPerShare: 0.669 },
    ],
    dueDiligenceScore: 96,
    dueDiligenceItems: [
      {
        id: "dd-701",
        category: "Legal & Title",
        title: "Miami-Dade County Warranty Deed",
        status: "Verified",
        issuer: "Miami-Dade Clerk of Courts",
        verifiedDate: "2026-02-05",
        expiryDate: "2036-02-05",
        notes: "Warranty deed free of contractor liens.",
        fileSize: "2.7 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 48000,
      insuranceAnnual: 32000,
      maintenanceAnnual: 26000,
      managementFeeRate: 0.08,
      capitalReservesAnnual: 20000,
    },
    assignedManager: {
      id: "mgr-07",
      name: "Carlos Delgado",
      company: "Miami Coastal Asset Partners",
      rating: 4.91,
      phone: "+1 (305) 920-4400",
    },
    tenantMetrics: {
      totalUnits: 4,
      occupiedUnits: 4,
      avgLeaseMonths: 18,
      onTimePaymentRate: 97.5,
    },
  },
  {
    id: "prop-tokyo-ginza-residences",
    slug: "tokyo-ginza-luxury-lofts",
    title: "Ginza Skyward Urban Lofts",
    headline: "Minimalist Japanese high-efficiency residential suites in prime Chuo-ku",
    description: "Located near Ginza Six, this high-yield Japanese residential development provides seismic-isolated luxury lofts for multinational executives and diplomats in central Tokyo.",
    city: "Tokyo",
    country: "Japan",
    address: "6-10-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan",
    category: "residential",
    status: "active",
    developer: "Mori Building Co. & Nomura Real Estate",
    yearBuilt: 2022,
    totalAreaSqFt: 31200,
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 6900000,
    sharePrice: 75,
    totalShares: 92000,
    availableShares: 18400,
    fundedPercentage: 80.0,
    grossYield: 8.7,
    netYield: 7.5,
    occupancyRate: 99,
    estimatedMonthlyRent: 50025,
    monthlyPerShareRent: 0.543,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 7120000,
    aiValuationConfidence: 98,
    marketDrivers: {
      locationDemand: 99,
      marketMomentum: 88,
      propertyCondition: 99,
      rentalDemand: 98,
    },
    valuationHistory: [
      { date: "2025-11", value: 6500000, sharePrice: 70.6 },
      { date: "2026-02", value: 6650000, sharePrice: 72.3 },
      { date: "2026-05", value: 6780000, sharePrice: 73.7 },
      { date: "2026-08", value: 6860000, sharePrice: 74.5 },
      { date: "2026-11", value: 6900000, sharePrice: 75.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 6920000, mid: 6960000, high: 7020000 },
      { month: "Jan 2027", low: 6960000, mid: 7030000, high: 7110000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 49500, expenses: 6400, netDistributed: 43100, payoutPerShare: 0.468 },
      { month: "Jul 2026", grossCollected: 49800, expenses: 6450, netDistributed: 43350, payoutPerShare: 0.471 },
      { month: "Aug 2026", grossCollected: 50000, expenses: 6500, netDistributed: 43500, payoutPerShare: 0.473 },
      { month: "Sep 2026", grossCollected: 50025, expenses: 6500, netDistributed: 43525, payoutPerShare: 0.473 },
      { month: "Oct 2026", grossCollected: 50025, expenses: 6480, netDistributed: 43545, payoutPerShare: 0.473 },
    ],
    dueDiligenceScore: 99,
    dueDiligenceItems: [
      {
        id: "dd-801",
        category: "Legal & Title",
        title: "Tokyo Legal Affairs Bureau Land Registry Certificate (Touhon)",
        status: "Verified",
        issuer: "Tokyo Legal Affairs Bureau",
        verifiedDate: "2026-01-12",
        expiryDate: "2036-01-12",
        notes: "Absolute registered ownership verified by Tokyo notary.",
        fileSize: "2.5 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 24000,
      insuranceAnnual: 14000,
      maintenanceAnnual: 22000,
      managementFeeRate: 0.06,
      capitalReservesAnnual: 18000,
    },
    assignedManager: {
      id: "mgr-08",
      name: "Kenji Takahashi",
      company: "Tokyo Urban Asset Management K.K.",
      rating: 4.97,
      phone: "+81 3 5555 0199",
    },
    tenantMetrics: {
      totalUnits: 32,
      occupiedUnits: 32,
      avgLeaseMonths: 24,
      onTimePaymentRate: 100,
    },
  },

  // ─────────────────────────────────────────────
  //  PAKISTAN PROPERTIES  (10 new listings)
  // ─────────────────────────────────────────────

  {
    id: "prop-pk-dha-karachi-tower",
    slug: "dha-karachi-ocean-residences",
    title: "DHA Karachi Ocean Residences",
    headline: "Premium sea-facing apartments in Defence Housing Authority, Karachi — Phase VIII",
    description: "Strategically located along the Karachi coastline in DHA Phase VIII, Ocean Residences comprises 56 fully furnished apartments managed by a RERA-registered operator. The project enjoys 95% occupancy year-round driven by corporate tenants and expatriate demand. Net rental yields are supported by scarce sea-view inventory in one of Pakistan's most coveted gated communities. PKR 185,000,000 total asset value underwritten by independent valuation.",
    city: "Karachi",
    country: "Pakistan",
    address: "Phase VIII, DHA Defence, Karachi, Sindh 75500",
    category: "waterfront",
    status: "active",
    developer: "Arif Habib Corporation & DHA Developers",
    yearBuilt: 2023,
    totalAreaSqFt: 48000,
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 660000,
    sharePrice: 33,
    totalShares: 20000,
    availableShares: 4800,
    fundedPercentage: 76.0,
    grossYield: 12.4,
    netYield: 10.2,
    occupancyRate: 95,
    estimatedMonthlyRent: 5610,
    monthlyPerShareRent: 0.281,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 685000,
    aiValuationConfidence: 91,
    marketDrivers: {
      locationDemand: 93,
      marketMomentum: 87,
      propertyCondition: 96,
      rentalDemand: 92,
    },
    valuationHistory: [
      { date: "2025-11", value: 610000, sharePrice: 30.5 },
      { date: "2026-02", value: 630000, sharePrice: 31.5 },
      { date: "2026-05", value: 645000, sharePrice: 32.25 },
      { date: "2026-08", value: 655000, sharePrice: 32.75 },
      { date: "2026-11", value: 660000, sharePrice: 33.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 662000, mid: 668000, high: 675000 },
      { month: "Jan 2027", low: 666000, mid: 674000, high: 684000 },
      { month: "Feb 2027", low: 670000, mid: 681000, high: 694000 },
      { month: "Mar 2027", low: 675000, mid: 690000, high: 706000 },
      { month: "Apr 2027", low: 680000, mid: 698000, high: 718000 },
      { month: "May 2027", low: 686000, mid: 707000, high: 731000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 5500, expenses: 820, netDistributed: 4680, payoutPerShare: 0.234 },
      { month: "Jul 2026", grossCollected: 5550, expenses: 830, netDistributed: 4720, payoutPerShare: 0.236 },
      { month: "Aug 2026", grossCollected: 5580, expenses: 835, netDistributed: 4745, payoutPerShare: 0.237 },
      { month: "Sep 2026", grossCollected: 5600, expenses: 840, netDistributed: 4760, payoutPerShare: 0.238 },
      { month: "Oct 2026", grossCollected: 5610, expenses: 838, netDistributed: 4772, payoutPerShare: 0.239 },
    ],
    dueDiligenceScore: 92,
    dueDiligenceItems: [
      {
        id: "dd-pk01-1",
        category: "Legal & Title",
        title: "SBCA Approved Building Plan & Registered Title Deed",
        status: "Verified",
        issuer: "Sindh Building Control Authority",
        verifiedDate: "2026-02-10",
        expiryDate: "2036-02-10",
        notes: "Clean freehold title registered under DHA Karachi land registry.",
        fileSize: "3.1 MB PDF",
      },
      {
        id: "dd-pk01-2",
        category: "Financial Audit",
        title: "Annual Rental Cashflow & Escrow Verification",
        status: "Verified",
        issuer: "KPMG Pakistan",
        verifiedDate: "2026-09-15",
        expiryDate: "2027-09-15",
        notes: "Full bank escrow reconciliation verified with zero discrepancies.",
        fileSize: "2.8 MB PDF",
      },
      {
        id: "dd-pk01-3",
        category: "Inspection & Condition",
        title: "Structural Safety & MEP Systems Audit",
        status: "Verified",
        issuer: "SGS Pakistan",
        verifiedDate: "2026-07-20",
        expiryDate: "2027-07-20",
        notes: "Grade-A structural integrity with no seismic vulnerabilities detected.",
        fileSize: "4.2 MB PDF",
      },
      {
        id: "dd-pk01-4",
        category: "Insurance & Risk",
        title: "Comprehensive Property & Loss of Rent Insurance",
        status: "Verified",
        issuer: "EFU General Insurance",
        verifiedDate: "2026-05-01",
        expiryDate: "2027-05-01",
        notes: "Full replacement value policy with PKR 200M coverage ceiling.",
        fileSize: "1.6 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 8200,
      insuranceAnnual: 4800,
      maintenanceAnnual: 11000,
      managementFeeRate: 0.08,
      capitalReservesAnnual: 7000,
    },
    assignedManager: {
      id: "mgr-pk01",
      name: "Zubair Ahmed Khan",
      company: "Prime Property Management Karachi",
      rating: 4.7,
      phone: "+92 21 3456 7890",
    },
    tenantMetrics: {
      totalUnits: 56,
      occupiedUnits: 53,
      avgLeaseMonths: 18,
      onTimePaymentRate: 97.2,
    },
  },

  {
    id: "prop-pk-gulberg-lahore-plaza",
    slug: "gulberg-galleria-commercial-plaza",
    title: "Gulberg Galleria Commercial Plaza",
    headline: "Triple-A grade office & retail complex in Lahore's premier business district",
    description: "Gulberg Galleria is a modern mixed-use commercial development in Lahore's Gulberg III business corridor — Pakistan's answer to central business districts. The 9-storey tower hosts multinational corporate tenants on 3-year leases and houses a retail ground floor with anchor F&B brands. High demand from blue-chip tenants drives exceptional rental stability and above-market yields. PKR 350,000,000 independently appraised.",
    city: "Lahore",
    country: "Pakistan",
    address: "Main Boulevard Gulberg III, Lahore, Punjab 54660",
    category: "commercial",
    status: "active",
    developer: "Packages Mall Developers & Lahore Commerce Group",
    yearBuilt: 2022,
    totalAreaSqFt: 72000,
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 1250000,
    sharePrice: 50,
    totalShares: 25000,
    availableShares: 7500,
    fundedPercentage: 70.0,
    grossYield: 13.8,
    netYield: 11.4,
    occupancyRate: 97,
    estimatedMonthlyRent: 11875,
    monthlyPerShareRent: 0.475,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 1310000,
    aiValuationConfidence: 89,
    marketDrivers: {
      locationDemand: 94,
      marketMomentum: 90,
      propertyCondition: 94,
      rentalDemand: 95,
    },
    valuationHistory: [
      { date: "2025-11", value: 1150000, sharePrice: 46.0 },
      { date: "2026-02", value: 1185000, sharePrice: 47.4 },
      { date: "2026-05", value: 1215000, sharePrice: 48.6 },
      { date: "2026-08", value: 1238000, sharePrice: 49.5 },
      { date: "2026-11", value: 1250000, sharePrice: 50.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 1255000, mid: 1268000, high: 1282000 },
      { month: "Jan 2027", low: 1262000, mid: 1280000, high: 1300000 },
      { month: "Feb 2027", low: 1270000, mid: 1295000, high: 1322000 },
      { month: "Mar 2027", low: 1280000, mid: 1312000, high: 1348000 },
      { month: "Apr 2027", low: 1292000, mid: 1330000, high: 1375000 },
      { month: "May 2027", low: 1305000, mid: 1350000, high: 1402000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 11600, expenses: 1750, netDistributed: 9850, payoutPerShare: 0.394 },
      { month: "Jul 2026", grossCollected: 11700, expenses: 1760, netDistributed: 9940, payoutPerShare: 0.398 },
      { month: "Aug 2026", grossCollected: 11800, expenses: 1770, netDistributed: 10030, payoutPerShare: 0.401 },
      { month: "Sep 2026", grossCollected: 11850, expenses: 1775, netDistributed: 10075, payoutPerShare: 0.403 },
      { month: "Oct 2026", grossCollected: 11875, expenses: 1770, netDistributed: 10105, payoutPerShare: 0.404 },
    ],
    dueDiligenceScore: 90,
    dueDiligenceItems: [
      {
        id: "dd-pk02-1",
        category: "Legal & Title",
        title: "LDA Approved Layout Plan & Registered Title",
        status: "Verified",
        issuer: "Lahore Development Authority",
        verifiedDate: "2026-01-20",
        expiryDate: "2036-01-20",
        notes: "Commercial freehold with no encumbrances or pending court proceedings.",
        fileSize: "2.9 MB PDF",
      },
      {
        id: "dd-pk02-2",
        category: "Financial Audit",
        title: "Commercial Lease Verification & Revenue Audit",
        status: "Verified",
        issuer: "EY Pakistan",
        verifiedDate: "2026-10-01",
        expiryDate: "2027-10-01",
        notes: "All commercial leases verified with triple net structure confirmed.",
        fileSize: "3.4 MB PDF",
      },
      {
        id: "dd-pk02-3",
        category: "Inspection & Condition",
        title: "Fire Safety & Building Systems Compliance",
        status: "Verified",
        issuer: "Punjab Fire & Emergency Services",
        verifiedDate: "2026-06-15",
        expiryDate: "2027-06-15",
        notes: "Full fire suppression systems operational. Grade-A compliance certificate issued.",
        fileSize: "1.8 MB PDF",
      },
      {
        id: "dd-pk02-4",
        category: "Insurance & Risk",
        title: "Commercial Property & Business Interruption Insurance",
        status: "Verified",
        issuer: "Adamjee Insurance",
        verifiedDate: "2026-04-10",
        expiryDate: "2027-04-10",
        notes: "PKR 400M full replacement coverage with 12-month business interruption rider.",
        fileSize: "2.1 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 18000,
      insuranceAnnual: 9500,
      maintenanceAnnual: 22000,
      managementFeeRate: 0.075,
      capitalReservesAnnual: 14000,
    },
    assignedManager: {
      id: "mgr-pk02",
      name: "Farrukh Mehmood",
      company: "Lahore Commercial Asset Management Ltd",
      rating: 4.8,
      phone: "+92 42 3571 1200",
    },
    tenantMetrics: {
      totalUnits: 24,
      occupiedUnits: 23,
      avgLeaseMonths: 36,
      onTimePaymentRate: 99.0,
    },
  },

  {
    id: "prop-pk-bahria-town-islamabad",
    slug: "bahria-heights-islamabad-residences",
    title: "Bahria Heights Islamabad Residences",
    headline: "Smart gated apartment community with 24/7 amenities in Bahria Town Islamabad",
    description: "Bahria Heights is a 120-unit gated residential complex inside Bahria Town Islamabad — Pakistan's most iconic master-planned community. Units are equipped with smart home systems, backed-up power, and fibre internet. The project serves young professionals and families relocating to the capital, maintaining 94% occupancy with consistent rental growth of 11% year-on-year. PKR 280,000,000 appraised value.",
    city: "Islamabad",
    country: "Pakistan",
    address: "Sector E-8, Bahria Town, Islamabad Capital Territory 44000",
    category: "residential",
    status: "active",
    developer: "Bahria Town (Pvt) Ltd",
    yearBuilt: 2021,
    totalAreaSqFt: 95000,
    coverImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 1000000,
    sharePrice: 25,
    totalShares: 40000,
    availableShares: 11200,
    fundedPercentage: 72.0,
    grossYield: 11.6,
    netYield: 9.8,
    occupancyRate: 94,
    estimatedMonthlyRent: 8167,
    monthlyPerShareRent: 0.204,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 1045000,
    aiValuationConfidence: 88,
    marketDrivers: {
      locationDemand: 90,
      marketMomentum: 86,
      propertyCondition: 95,
      rentalDemand: 91,
    },
    valuationHistory: [
      { date: "2025-11", value: 920000, sharePrice: 23.0 },
      { date: "2026-02", value: 950000, sharePrice: 23.75 },
      { date: "2026-05", value: 975000, sharePrice: 24.38 },
      { date: "2026-08", value: 992000, sharePrice: 24.8 },
      { date: "2026-11", value: 1000000, sharePrice: 25.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 1004000, mid: 1012000, high: 1021000 },
      { month: "Jan 2027", low: 1010000, mid: 1022000, high: 1035000 },
      { month: "Feb 2027", low: 1017000, mid: 1032000, high: 1049000 },
      { month: "Mar 2027", low: 1025000, mid: 1044000, high: 1065000 },
      { month: "Apr 2027", low: 1034000, mid: 1058000, high: 1084000 },
      { month: "May 2027", low: 1044000, mid: 1073000, high: 1105000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 7900, expenses: 1150, netDistributed: 6750, payoutPerShare: 0.169 },
      { month: "Jul 2026", grossCollected: 8000, expenses: 1160, netDistributed: 6840, payoutPerShare: 0.171 },
      { month: "Aug 2026", grossCollected: 8080, expenses: 1170, netDistributed: 6910, payoutPerShare: 0.173 },
      { month: "Sep 2026", grossCollected: 8120, expenses: 1172, netDistributed: 6948, payoutPerShare: 0.174 },
      { month: "Oct 2026", grossCollected: 8167, expenses: 1175, netDistributed: 6992, payoutPerShare: 0.175 },
    ],
    dueDiligenceScore: 93,
    dueDiligenceItems: [
      {
        id: "dd-pk03-1",
        category: "Legal & Title",
        title: "CDA NOC & Registered Property Title",
        status: "Verified",
        issuer: "Capital Development Authority, Islamabad",
        verifiedDate: "2026-03-05",
        expiryDate: "2036-03-05",
        notes: "Full CDA approval with no pending cases or litigation.",
        fileSize: "2.6 MB PDF",
      },
      {
        id: "dd-pk03-2",
        category: "Financial Audit",
        title: "Rental Income & Escrow Account Audit",
        status: "Verified",
        issuer: "Deloitte Pakistan",
        verifiedDate: "2026-08-30",
        expiryDate: "2027-08-30",
        notes: "All rental deposits verified against bank statements. 100% reconciled.",
        fileSize: "3.0 MB PDF",
      },
      {
        id: "dd-pk03-3",
        category: "Inspection & Condition",
        title: "Structural Integrity & Smart Systems Audit",
        status: "Verified",
        issuer: "Bureau Veritas Pakistan",
        verifiedDate: "2026-05-20",
        expiryDate: "2027-05-20",
        notes: "Smart home and generator backup systems fully operational.",
        fileSize: "3.7 MB PDF",
      },
      {
        id: "dd-pk03-4",
        category: "Insurance & Risk",
        title: "Residential Property Insurance Policy",
        status: "Verified",
        issuer: "State Life Insurance Corporation",
        verifiedDate: "2026-06-01",
        expiryDate: "2027-06-01",
        notes: "Comprehensive all-risk policy covering fire, flood, and theft.",
        fileSize: "1.4 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 12000,
      insuranceAnnual: 7500,
      maintenanceAnnual: 18000,
      managementFeeRate: 0.08,
      capitalReservesAnnual: 10000,
    },
    assignedManager: {
      id: "mgr-pk03",
      name: "Ayesha Nawaz",
      company: "Islamabad Residential Management Services",
      rating: 4.75,
      phone: "+92 51 2894 5600",
    },
    tenantMetrics: {
      totalUnits: 120,
      occupiedUnits: 113,
      avgLeaseMonths: 12,
      onTimePaymentRate: 96.5,
    },
  },

  {
    id: "prop-pk-emaar-dha-karachi-mall",
    slug: "emaar-coral-towers-karachi",
    title: "Emaar Coral Towers Karachi",
    headline: "Iconic twin-tower luxury residential complex on Karachi's Clifton beach front",
    description: "Co-developed with Emaar Properties, Coral Towers is a landmark twin-tower luxury project overlooking Clifton Beach. The 180-unit complex features hotel-branded serviced apartments attracting international business visitors and high-net-worth Karachi residents. With an international hotel operator managing the asset, occupancy and rental consistency are exceptionally high. PKR 520,000,000 total appraised value.",
    city: "Karachi",
    country: "Pakistan",
    address: "Clifton Block 5, Karachi, Sindh 75600",
    category: "luxury",
    status: "active",
    developer: "Emaar Pakistan & HBL Properties",
    yearBuilt: 2024,
    totalAreaSqFt: 142000,
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 1860000,
    sharePrice: 62,
    totalShares: 30000,
    availableShares: 8100,
    fundedPercentage: 73.0,
    grossYield: 12.9,
    netYield: 10.8,
    occupancyRate: 93,
    estimatedMonthlyRent: 16740,
    monthlyPerShareRent: 0.558,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 1930000,
    aiValuationConfidence: 90,
    marketDrivers: {
      locationDemand: 92,
      marketMomentum: 89,
      propertyCondition: 97,
      rentalDemand: 91,
    },
    valuationHistory: [
      { date: "2025-11", value: 1720000, sharePrice: 57.3 },
      { date: "2026-02", value: 1760000, sharePrice: 58.7 },
      { date: "2026-05", value: 1800000, sharePrice: 60.0 },
      { date: "2026-08", value: 1835000, sharePrice: 61.2 },
      { date: "2026-11", value: 1860000, sharePrice: 62.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 1868000, mid: 1882000, high: 1898000 },
      { month: "Jan 2027", low: 1878000, mid: 1898000, high: 1920000 },
      { month: "Feb 2027", low: 1890000, mid: 1916000, high: 1944000 },
      { month: "Mar 2027", low: 1904000, mid: 1935000, high: 1970000 },
      { month: "Apr 2027", low: 1920000, mid: 1956000, high: 1998000 },
      { month: "May 2027", low: 1938000, mid: 1980000, high: 2028000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 16400, expenses: 2500, netDistributed: 13900, payoutPerShare: 0.463 },
      { month: "Jul 2026", grossCollected: 16500, expenses: 2510, netDistributed: 13990, payoutPerShare: 0.466 },
      { month: "Aug 2026", grossCollected: 16620, expenses: 2520, netDistributed: 14100, payoutPerShare: 0.470 },
      { month: "Sep 2026", grossCollected: 16700, expenses: 2528, netDistributed: 14172, payoutPerShare: 0.472 },
      { month: "Oct 2026", grossCollected: 16740, expenses: 2525, netDistributed: 14215, payoutPerShare: 0.474 },
    ],
    dueDiligenceScore: 95,
    dueDiligenceItems: [
      {
        id: "dd-pk04-1",
        category: "Legal & Title",
        title: "Clifton Cantonment Board Title & NOC",
        status: "Verified",
        issuer: "Clifton Cantonment Board",
        verifiedDate: "2026-01-12",
        expiryDate: "2036-01-12",
        notes: "Freehold title with Emaar brand co-ownership agreement fully registered.",
        fileSize: "3.5 MB PDF",
      },
      {
        id: "dd-pk04-2",
        category: "Financial Audit",
        title: "Hotel Revenue & Escrow Audit",
        status: "Verified",
        issuer: "KPMG Pakistan",
        verifiedDate: "2026-10-05",
        expiryDate: "2027-10-05",
        notes: "Hotel RevPAR data and rental escrow fully verified with international operator.",
        fileSize: "4.1 MB PDF",
      },
      {
        id: "dd-pk04-3",
        category: "Inspection & Condition",
        title: "High-Rise Structural & Safety Systems Audit",
        status: "Verified",
        issuer: "SGS Pakistan",
        verifiedDate: "2026-08-18",
        expiryDate: "2027-08-18",
        notes: "International-grade structural compliance with seismic zone B certification.",
        fileSize: "5.0 MB PDF",
      },
      {
        id: "dd-pk04-4",
        category: "Insurance & Risk",
        title: "International All-Risk Tower Insurance",
        status: "Verified",
        issuer: "AIG International (Pakistan Branch)",
        verifiedDate: "2026-05-15",
        expiryDate: "2027-05-15",
        notes: "USD 20M full replacement insurance underwritten by AIG.",
        fileSize: "2.3 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 24000,
      insuranceAnnual: 16000,
      maintenanceAnnual: 32000,
      managementFeeRate: 0.085,
      capitalReservesAnnual: 20000,
    },
    assignedManager: {
      id: "mgr-pk04",
      name: "Bilal Siddiqui",
      company: "Emaar Hospitality Management Pakistan",
      rating: 4.9,
      phone: "+92 21 3522 0011",
    },
    tenantMetrics: {
      totalUnits: 180,
      occupiedUnits: 167,
      avgLeaseMonths: 6,
      onTimePaymentRate: 98.8,
    },
  },

  {
    id: "prop-pk-faisal-town-islamabad-villas",
    slug: "faisal-town-islamabad-garden-villas",
    title: "Faisal Town Islamabad Garden Villas",
    headline: "Exclusive 4-bedroom gated villas with private gardens near Islamabad Expressway",
    description: "A collection of 28 premium 4-bedroom villas inside Faisal Town, one of Islamabad's most prestigious gated communities. Each villa features a private garden, rooftop terrace, and 3-car garage. Proximity to Islamabad International Airport and CPEC economic zones drives sustained demand from diplomats, senior government officials, and corporate executives. PKR 420,000,000 total appraised value.",
    city: "Islamabad",
    country: "Pakistan",
    address: "Block C, Faisal Town, Islamabad Capital Territory 44220",
    category: "villa",
    status: "active",
    developer: "Faisal Town Developers Pvt Ltd",
    yearBuilt: 2020,
    totalAreaSqFt: 56000,
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 1500000,
    sharePrice: 75,
    totalShares: 20000,
    availableShares: 6000,
    fundedPercentage: 70.0,
    grossYield: 10.4,
    netYield: 8.7,
    occupancyRate: 92,
    estimatedMonthlyRent: 10875,
    monthlyPerShareRent: 0.544,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 1565000,
    aiValuationConfidence: 87,
    marketDrivers: {
      locationDemand: 89,
      marketMomentum: 85,
      propertyCondition: 94,
      rentalDemand: 88,
    },
    valuationHistory: [
      { date: "2025-11", value: 1380000, sharePrice: 69.0 },
      { date: "2026-02", value: 1420000, sharePrice: 71.0 },
      { date: "2026-05", value: 1460000, sharePrice: 73.0 },
      { date: "2026-08", value: 1485000, sharePrice: 74.25 },
      { date: "2026-11", value: 1500000, sharePrice: 75.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 1505000, mid: 1515000, high: 1528000 },
      { month: "Jan 2027", low: 1512000, mid: 1526000, high: 1544000 },
      { month: "Feb 2027", low: 1521000, mid: 1540000, high: 1562000 },
      { month: "Mar 2027", low: 1532000, mid: 1556000, high: 1584000 },
      { month: "Apr 2027", low: 1545000, mid: 1575000, high: 1609000 },
      { month: "May 2027", low: 1560000, mid: 1596000, high: 1636000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 10600, expenses: 1550, netDistributed: 9050, payoutPerShare: 0.453 },
      { month: "Jul 2026", grossCollected: 10720, expenses: 1560, netDistributed: 9160, payoutPerShare: 0.458 },
      { month: "Aug 2026", grossCollected: 10800, expenses: 1568, netDistributed: 9232, payoutPerShare: 0.462 },
      { month: "Sep 2026", grossCollected: 10850, expenses: 1572, netDistributed: 9278, payoutPerShare: 0.464 },
      { month: "Oct 2026", grossCollected: 10875, expenses: 1570, netDistributed: 9305, payoutPerShare: 0.465 },
    ],
    dueDiligenceScore: 91,
    dueDiligenceItems: [
      {
        id: "dd-pk05-1",
        category: "Legal & Title",
        title: "RDA Approved Plan & Registered Freehold Titles",
        status: "Verified",
        issuer: "Rawalpindi Development Authority",
        verifiedDate: "2026-02-28",
        expiryDate: "2036-02-28",
        notes: "All 28 villa titles individually registered with no liens or disputes.",
        fileSize: "4.8 MB PDF",
      },
      {
        id: "dd-pk05-2",
        category: "Financial Audit",
        title: "Villa Rental Income Verification",
        status: "Verified",
        issuer: "EY Pakistan",
        verifiedDate: "2026-09-01",
        expiryDate: "2027-09-01",
        notes: "Individual villa rental deposits cross-verified against bank escrow.",
        fileSize: "2.5 MB PDF",
      },
      {
        id: "dd-pk05-3",
        category: "Inspection & Condition",
        title: "Villa Structural & Systems Assessment",
        status: "Verified",
        issuer: "NEC International Pakistan",
        verifiedDate: "2026-04-10",
        expiryDate: "2027-04-10",
        notes: "All villas structurally sound. Gardens and rooftop terraces in excellent condition.",
        fileSize: "3.2 MB PDF",
      },
      {
        id: "dd-pk05-4",
        category: "Insurance & Risk",
        title: "Villa Portfolio All-Risk Insurance",
        status: "Verified",
        issuer: "EFU General Insurance",
        verifiedDate: "2026-05-20",
        expiryDate: "2027-05-20",
        notes: "Block insurance policy covering all 28 villas under a single umbrella.",
        fileSize: "1.9 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 15000,
      insuranceAnnual: 10000,
      maintenanceAnnual: 24000,
      managementFeeRate: 0.08,
      capitalReservesAnnual: 12000,
    },
    assignedManager: {
      id: "mgr-pk05",
      name: "Kamran Ashraf",
      company: "Capital Villas Management Group",
      rating: 4.72,
      phone: "+92 51 4857 3300",
    },
    tenantMetrics: {
      totalUnits: 28,
      occupiedUnits: 26,
      avgLeaseMonths: 24,
      onTimePaymentRate: 97.8,
    },
  },

  {
    id: "prop-pk-pcw-peshawar-business",
    slug: "peshawar-city-walk-commercial-centre",
    title: "Peshawar City Walk Commercial Centre",
    headline: "Modern retail & office complex at the gateway to KPK's fastest-growing city",
    description: "Peshawar City Walk is a 6-floor mixed-use commercial development in University Town, Peshawar's most upscale neighbourhood. The building hosts technology companies, educational institutes, and established retail brands benefiting from KPK's rapid CPEC-driven economic growth. High foot traffic and scarce Grade-A supply create strong rental demand. PKR 165,000,000 appraised value.",
    city: "Peshawar",
    country: "Pakistan",
    address: "University Town, Peshawar, Khyber Pakhtunkhwa 25000",
    category: "commercial",
    status: "active",
    developer: "Frontier Works Organization & KPK Builders",
    yearBuilt: 2022,
    totalAreaSqFt: 42000,
    coverImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 590000,
    sharePrice: 29.5,
    totalShares: 20000,
    availableShares: 7400,
    fundedPercentage: 63.0,
    grossYield: 14.2,
    netYield: 11.9,
    occupancyRate: 90,
    estimatedMonthlyRent: 5856,
    monthlyPerShareRent: 0.293,
    nextPayoutDate: "2026-12-15",
    aiEstimatedValuation: 618000,
    aiValuationConfidence: 84,
    marketDrivers: {
      locationDemand: 86,
      marketMomentum: 88,
      propertyCondition: 92,
      rentalDemand: 89,
    },
    valuationHistory: [
      { date: "2025-11", value: 540000, sharePrice: 27.0 },
      { date: "2026-02", value: 556000, sharePrice: 27.8 },
      { date: "2026-05", value: 571000, sharePrice: 28.55 },
      { date: "2026-08", value: 582000, sharePrice: 29.1 },
      { date: "2026-11", value: 590000, sharePrice: 29.5 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 594000, mid: 601000, high: 609000 },
      { month: "Jan 2027", low: 599000, mid: 609000, high: 621000 },
      { month: "Feb 2027", low: 606000, mid: 619000, high: 634000 },
      { month: "Mar 2027", low: 614000, mid: 631000, high: 650000 },
      { month: "Apr 2027", low: 624000, mid: 645000, high: 668000 },
      { month: "May 2027", low: 636000, mid: 661000, high: 688000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 5700, expenses: 870, netDistributed: 4830, payoutPerShare: 0.242 },
      { month: "Jul 2026", grossCollected: 5760, expenses: 878, netDistributed: 4882, payoutPerShare: 0.244 },
      { month: "Aug 2026", grossCollected: 5800, expenses: 882, netDistributed: 4918, payoutPerShare: 0.246 },
      { month: "Sep 2026", grossCollected: 5830, expenses: 886, netDistributed: 4944, payoutPerShare: 0.247 },
      { month: "Oct 2026", grossCollected: 5856, expenses: 884, netDistributed: 4972, payoutPerShare: 0.249 },
    ],
    dueDiligenceScore: 88,
    dueDiligenceItems: [
      {
        id: "dd-pk06-1",
        category: "Legal & Title",
        title: "PDMA Approved Plan & Commercial Title",
        status: "Verified",
        issuer: "Peshawar Development Authority",
        verifiedDate: "2026-03-18",
        expiryDate: "2036-03-18",
        notes: "Commercial freehold title with no encumbrances registered at district court.",
        fileSize: "2.4 MB PDF",
      },
      {
        id: "dd-pk06-2",
        category: "Financial Audit",
        title: "Commercial Lease Revenue Audit",
        status: "Verified",
        issuer: "BDO Pakistan",
        verifiedDate: "2026-09-20",
        expiryDate: "2027-09-20",
        notes: "Rental income verified. All leases NNN structured with annual escalation clauses.",
        fileSize: "2.2 MB PDF",
      },
      {
        id: "dd-pk06-3",
        category: "Inspection & Condition",
        title: "Fire & Structural Safety Certification",
        status: "Verified",
        issuer: "KPK Building Control Authority",
        verifiedDate: "2026-06-22",
        expiryDate: "2027-06-22",
        notes: "Full seismic resistance compliance for Zone 3. Fire systems operational.",
        fileSize: "2.0 MB PDF",
      },
      {
        id: "dd-pk06-4",
        category: "Insurance & Risk",
        title: "Commercial Property Insurance",
        status: "Verified",
        issuer: "Jubilee General Insurance",
        verifiedDate: "2026-04-15",
        expiryDate: "2027-04-15",
        notes: "PKR 180M all-risk commercial property insurance with 6-month BI rider.",
        fileSize: "1.5 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 9000,
      insuranceAnnual: 5500,
      maintenanceAnnual: 13000,
      managementFeeRate: 0.08,
      capitalReservesAnnual: 8000,
    },
    assignedManager: {
      id: "mgr-pk06",
      name: "Tariq Habibullah",
      company: "KPK Commercial Property Partners",
      rating: 4.6,
      phone: "+92 91 5844 2211",
    },
    tenantMetrics: {
      totalUnits: 18,
      occupiedUnits: 16,
      avgLeaseMonths: 30,
      onTimePaymentRate: 95.0,
    },
  },

  {
    id: "prop-pk-mall-road-lahore-boutique",
    slug: "mall-road-lahore-boutique-residences",
    title: "Mall Road Lahore Boutique Residences",
    headline: "Heritage-view luxury apartments overlooking Lahore's iconic Mall Road and Lawrence Gardens",
    description: "A 36-unit boutique residential development offering panoramic views of the historic Mall Road, Lawrence Gardens, and Lahore Museum. Steps from the High Court and Government offices, the building attracts high-income lawyers, senior judges, and executives seeking premium Lahore addresses. The colonial-era neighbourhood commands a consistent 15% rent premium over comparable areas. PKR 240,000,000 appraised value.",
    city: "Lahore",
    country: "Pakistan",
    address: "Mall Road, Civil Lines, Lahore, Punjab 54000",
    category: "residential",
    status: "active",
    developer: "Civil Lines Property Development Ltd",
    yearBuilt: 2023,
    totalAreaSqFt: 32000,
    coverImage: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 860000,
    sharePrice: 43,
    totalShares: 20000,
    availableShares: 6600,
    fundedPercentage: 67.0,
    grossYield: 11.8,
    netYield: 9.9,
    occupancyRate: 96,
    estimatedMonthlyRent: 7097,
    monthlyPerShareRent: 0.355,
    nextPayoutDate: "2026-12-01",
    aiEstimatedValuation: 900000,
    aiValuationConfidence: 88,
    marketDrivers: {
      locationDemand: 91,
      marketMomentum: 86,
      propertyCondition: 95,
      rentalDemand: 90,
    },
    valuationHistory: [
      { date: "2025-11", value: 795000, sharePrice: 39.75 },
      { date: "2026-02", value: 818000, sharePrice: 40.9 },
      { date: "2026-05", value: 838000, sharePrice: 41.9 },
      { date: "2026-08", value: 852000, sharePrice: 42.6 },
      { date: "2026-11", value: 860000, sharePrice: 43.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 863000, mid: 870000, high: 879000 },
      { month: "Jan 2027", low: 868000, mid: 878000, high: 890000 },
      { month: "Feb 2027", low: 874000, mid: 888000, high: 904000 },
      { month: "Mar 2027", low: 882000, mid: 900000, high: 920000 },
      { month: "Apr 2027", low: 892000, mid: 914000, high: 939000 },
      { month: "May 2027", low: 904000, mid: 931000, high: 960000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 6900, expenses: 1040, netDistributed: 5860, payoutPerShare: 0.293 },
      { month: "Jul 2026", grossCollected: 6980, expenses: 1050, netDistributed: 5930, payoutPerShare: 0.297 },
      { month: "Aug 2026", grossCollected: 7040, expenses: 1055, netDistributed: 5985, payoutPerShare: 0.299 },
      { month: "Sep 2026", grossCollected: 7070, expenses: 1058, netDistributed: 6012, payoutPerShare: 0.301 },
      { month: "Oct 2026", grossCollected: 7097, expenses: 1057, netDistributed: 6040, payoutPerShare: 0.302 },
    ],
    dueDiligenceScore: 93,
    dueDiligenceItems: [
      {
        id: "dd-pk07-1",
        category: "Legal & Title",
        title: "LDA Title Deed & NOC Certificate",
        status: "Verified",
        issuer: "Lahore Development Authority",
        verifiedDate: "2026-04-01",
        expiryDate: "2036-04-01",
        notes: "Heritage zone compliance confirmed. Freehold title with no disputes.",
        fileSize: "2.7 MB PDF",
      },
      {
        id: "dd-pk07-2",
        category: "Financial Audit",
        title: "Residential Rental Income & Bank Escrow Audit",
        status: "Verified",
        issuer: "Deloitte Pakistan",
        verifiedDate: "2026-09-10",
        expiryDate: "2027-09-10",
        notes: "Month-on-month rental receipts verified against escrow bank statements.",
        fileSize: "2.6 MB PDF",
      },
      {
        id: "dd-pk07-3",
        category: "Inspection & Condition",
        title: "Structural & Building Services Audit",
        status: "Verified",
        issuer: "SGS Pakistan",
        verifiedDate: "2026-05-25",
        expiryDate: "2027-05-25",
        notes: "Modern construction with heritage facade. All MEP systems Grade-A compliant.",
        fileSize: "3.0 MB PDF",
      },
      {
        id: "dd-pk07-4",
        category: "Insurance & Risk",
        title: "Residential Property & Loss of Rent Policy",
        status: "Verified",
        issuer: "Adamjee Insurance",
        verifiedDate: "2026-06-05",
        expiryDate: "2027-06-05",
        notes: "Full all-risk residential policy with PKR 260M ceiling.",
        fileSize: "1.7 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 11000,
      insuranceAnnual: 6800,
      maintenanceAnnual: 15000,
      managementFeeRate: 0.08,
      capitalReservesAnnual: 9000,
    },
    assignedManager: {
      id: "mgr-pk07",
      name: "Nadia Iqbal",
      company: "Punjab Premium Residential Management",
      rating: 4.78,
      phone: "+92 42 3617 8900",
    },
    tenantMetrics: {
      totalUnits: 36,
      occupiedUnits: 35,
      avgLeaseMonths: 18,
      onTimePaymentRate: 98.1,
    },
  },

  {
    id: "prop-pk-multan-agri-warehouse",
    slug: "multan-southern-logistics-park",
    title: "Multan Southern Logistics Park",
    headline: "High-yield industrial warehouse & cold storage complex serving South Punjab's agricultural belt",
    description: "Strategically located 8 km from Multan International Airport, Southern Logistics Park is a 180,000 sq ft industrial complex offering temperature-controlled cold storage and dry warehousing to agri-exporters, FMCG distributors, and pharmaceutical companies. Pakistan's $5B agri-export boom drives exceptional demand for modern cold storage. 10-year anchor lease signed with a leading food conglomerate. PKR 310,000,000 appraised.",
    city: "Multan",
    country: "Pakistan",
    address: "Industrial Zone, Sher Shah Road, Multan, Punjab 60000",
    category: "commercial",
    status: "active",
    developer: "South Punjab Industrial Estates & FWBL",
    yearBuilt: 2021,
    totalAreaSqFt: 180000,
    coverImage: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 1110000,
    sharePrice: 37,
    totalShares: 30000,
    availableShares: 10500,
    fundedPercentage: 65.0,
    grossYield: 15.6,
    netYield: 13.1,
    occupancyRate: 100,
    estimatedMonthlyRent: 12128,
    monthlyPerShareRent: 0.404,
    nextPayoutDate: "2026-12-15",
    aiEstimatedValuation: 1165000,
    aiValuationConfidence: 92,
    marketDrivers: {
      locationDemand: 88,
      marketMomentum: 92,
      propertyCondition: 96,
      rentalDemand: 97,
    },
    valuationHistory: [
      { date: "2025-11", value: 1020000, sharePrice: 34.0 },
      { date: "2026-02", value: 1055000, sharePrice: 35.17 },
      { date: "2026-05", value: 1080000, sharePrice: 36.0 },
      { date: "2026-08", value: 1098000, sharePrice: 36.6 },
      { date: "2026-11", value: 1110000, sharePrice: 37.0 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 1116000, mid: 1126000, high: 1138000 },
      { month: "Jan 2027", low: 1124000, mid: 1138000, high: 1154000 },
      { month: "Feb 2027", low: 1134000, mid: 1152000, high: 1172000 },
      { month: "Mar 2027", low: 1146000, mid: 1168000, high: 1193000 },
      { month: "Apr 2027", low: 1160000, mid: 1186000, high: 1216000 },
      { month: "May 2027", low: 1176000, mid: 1206000, high: 1241000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 11900, expenses: 1700, netDistributed: 10200, payoutPerShare: 0.340 },
      { month: "Jul 2026", grossCollected: 12000, expenses: 1715, netDistributed: 10285, payoutPerShare: 0.343 },
      { month: "Aug 2026", grossCollected: 12060, expenses: 1720, netDistributed: 10340, payoutPerShare: 0.345 },
      { month: "Sep 2026", grossCollected: 12090, expenses: 1724, netDistributed: 10366, payoutPerShare: 0.346 },
      { month: "Oct 2026", grossCollected: 12128, expenses: 1722, netDistributed: 10406, payoutPerShare: 0.347 },
    ],
    dueDiligenceScore: 94,
    dueDiligenceItems: [
      {
        id: "dd-pk08-1",
        category: "Legal & Title",
        title: "SITE Industrial Land Allotment & Title",
        status: "Verified",
        issuer: "SITE Authority Multan",
        verifiedDate: "2026-01-30",
        expiryDate: "2051-01-30",
        notes: "Long-term industrial leasehold registered. Anchor tenant lease verified.",
        fileSize: "3.3 MB PDF",
      },
      {
        id: "dd-pk08-2",
        category: "Financial Audit",
        title: "Industrial Lease Revenue & Escrow Audit",
        status: "Verified",
        issuer: "KPMG Pakistan",
        verifiedDate: "2026-10-10",
        expiryDate: "2027-10-10",
        notes: "10-year anchor lease cashflows fully verified. Triple-net lease structure confirmed.",
        fileSize: "3.6 MB PDF",
      },
      {
        id: "dd-pk08-3",
        category: "Inspection & Condition",
        title: "Cold Chain & Warehouse Systems Audit",
        status: "Verified",
        issuer: "SGS Pakistan",
        verifiedDate: "2026-07-14",
        expiryDate: "2027-07-14",
        notes: "Temperature-controlled systems calibrated to international food safety standards.",
        fileSize: "4.5 MB PDF",
      },
      {
        id: "dd-pk08-4",
        category: "Insurance & Risk",
        title: "Industrial All-Risk & Product Liability Insurance",
        status: "Verified",
        issuer: "EFU General Insurance",
        verifiedDate: "2026-05-10",
        expiryDate: "2027-05-10",
        notes: "PKR 350M industrial all-risk policy with cargo and product liability riders.",
        fileSize: "2.4 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 14000,
      insuranceAnnual: 8500,
      maintenanceAnnual: 20000,
      managementFeeRate: 0.065,
      capitalReservesAnnual: 15000,
    },
    assignedManager: {
      id: "mgr-pk08",
      name: "Muhammad Asif Raza",
      company: "Punjab Industrial Asset Management",
      rating: 4.82,
      phone: "+92 61 4510 2200",
    },
    tenantMetrics: {
      totalUnits: 8,
      occupiedUnits: 8,
      avgLeaseMonths: 120,
      onTimePaymentRate: 100,
    },
  },

  {
    id: "prop-pk-ncp-rawalpindi-apartments",
    slug: "new-city-plaza-rawalpindi-apartments",
    title: "New City Plaza Rawalpindi Apartments",
    headline: "Affordable high-yield furnished apartments near Rawalpindi's Saddar commercial hub",
    description: "New City Plaza offers 80 fully furnished studio and 1-bedroom apartments in Rawalpindi's Saddar district, a bustling commercial and transit hub directly connected to Islamabad Metro. The complex targets young professionals, students at nearby universities, and short-stay business travellers. Consistent 97% occupancy with rising rents driven by metro-linked demand. PKR 160,000,000 appraised value.",
    city: "Rawalpindi",
    country: "Pakistan",
    address: "Saddar Bazaar Road, Rawalpindi, Punjab 46000",
    category: "residential",
    status: "active",
    developer: "Rawalpindi Real Estate Ventures",
    yearBuilt: 2022,
    totalAreaSqFt: 44000,
    coverImage: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 572000,
    sharePrice: 28.6,
    totalShares: 20000,
    availableShares: 9000,
    fundedPercentage: 55.0,
    grossYield: 13.4,
    netYield: 11.2,
    occupancyRate: 97,
    estimatedMonthlyRent: 5341,
    monthlyPerShareRent: 0.267,
    nextPayoutDate: "2026-12-15",
    aiEstimatedValuation: 598000,
    aiValuationConfidence: 85,
    marketDrivers: {
      locationDemand: 87,
      marketMomentum: 85,
      propertyCondition: 91,
      rentalDemand: 93,
    },
    valuationHistory: [
      { date: "2025-11", value: 528000, sharePrice: 26.4 },
      { date: "2026-02", value: 544000, sharePrice: 27.2 },
      { date: "2026-05", value: 557000, sharePrice: 27.85 },
      { date: "2026-08", value: 566000, sharePrice: 28.3 },
      { date: "2026-11", value: 572000, sharePrice: 28.6 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 575000, mid: 580000, high: 587000 },
      { month: "Jan 2027", low: 579000, mid: 587000, high: 596000 },
      { month: "Feb 2027", low: 584000, mid: 595000, high: 607000 },
      { month: "Mar 2027", low: 591000, mid: 605000, high: 620000 },
      { month: "Apr 2027", low: 599000, mid: 616000, high: 635000 },
      { month: "May 2027", low: 609000, mid: 630000, high: 652000 },
    ],
    rentalHistory: [
      { month: "Jun 2026", grossCollected: 5200, expenses: 775, netDistributed: 4425, payoutPerShare: 0.221 },
      { month: "Jul 2026", grossCollected: 5260, expenses: 782, netDistributed: 4478, payoutPerShare: 0.224 },
      { month: "Aug 2026", grossCollected: 5300, expenses: 787, netDistributed: 4513, payoutPerShare: 0.226 },
      { month: "Sep 2026", grossCollected: 5325, expenses: 790, netDistributed: 4535, payoutPerShare: 0.227 },
      { month: "Oct 2026", grossCollected: 5341, expenses: 789, netDistributed: 4552, payoutPerShare: 0.228 },
    ],
    dueDiligenceScore: 87,
    dueDiligenceItems: [
      {
        id: "dd-pk09-1",
        category: "Legal & Title",
        title: "RDA Approved Plan & Registered Title",
        status: "Verified",
        issuer: "Rawalpindi Development Authority",
        verifiedDate: "2026-02-15",
        expiryDate: "2036-02-15",
        notes: "Freehold title registered. No third-party claims or pending litigation.",
        fileSize: "2.3 MB PDF",
      },
      {
        id: "dd-pk09-2",
        category: "Financial Audit",
        title: "Rental Income Verification & Escrow Audit",
        status: "Verified",
        issuer: "BDO Pakistan",
        verifiedDate: "2026-09-25",
        expiryDate: "2027-09-25",
        notes: "80-unit rental receipts verified against bank escrow. Full reconciliation confirmed.",
        fileSize: "2.8 MB PDF",
      },
      {
        id: "dd-pk09-3",
        category: "Inspection & Condition",
        title: "Residential Building Safety Assessment",
        status: "Verified",
        issuer: "NEC International Pakistan",
        verifiedDate: "2026-05-30",
        expiryDate: "2027-05-30",
        notes: "Structural load bearing elements certified. Electrical and plumbing Grade-B+.",
        fileSize: "2.1 MB PDF",
      },
      {
        id: "dd-pk09-4",
        category: "Insurance & Risk",
        title: "Multi-Unit Residential Insurance Policy",
        status: "Verified",
        issuer: "Jubilee General Insurance",
        verifiedDate: "2026-06-10",
        expiryDate: "2027-06-10",
        notes: "PKR 170M comprehensive residential insurance covering fire, flood, and theft.",
        fileSize: "1.6 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 7500,
      insuranceAnnual: 4200,
      maintenanceAnnual: 10000,
      managementFeeRate: 0.085,
      capitalReservesAnnual: 6500,
    },
    assignedManager: {
      id: "mgr-pk09",
      name: "Sadia Perveen",
      company: "Rawalpindi Residential Management Services",
      rating: 4.62,
      phone: "+92 51 5571 4400",
    },
    tenantMetrics: {
      totalUnits: 80,
      occupiedUnits: 78,
      avgLeaseMonths: 12,
      onTimePaymentRate: 95.8,
    },
  },

  {
    id: "prop-pk-hyderabad-tech-hub",
    slug: "hyderabad-tech-valley-offices",
    title: "Hyderabad Tech Valley Office Park",
    headline: "Modern IT park & co-working hub in Pakistan's Silicon Valley — Hyderabad's tech corridor",
    description: "Hyderabad Tech Valley is a purpose-built IT office park on Qasimabad's emerging technology corridor, home to Pakistan's growing IT export industry. The park hosts 14 established software houses with 5-year leases, benefiting from government IT zone incentives and 24/7 fibre connectivity. Pakistan's IT exports surpassing $3B annually create exceptional demand for Grade-A tech office space. PKR 195,000,000 appraised value.",
    city: "Hyderabad",
    country: "Pakistan",
    address: "IT Park Road, Qasimabad, Hyderabad, Sindh 71000",
    category: "commercial",
    status: "coming_soon",
    developer: "Sindh IT Board & Tech Valley Developers",
    yearBuilt: 2024,
    totalAreaSqFt: 58000,
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80",
    ],
    totalValuation: 697000,
    sharePrice: 34.85,
    totalShares: 20000,
    availableShares: 18000,
    fundedPercentage: 10.0,
    grossYield: 14.8,
    netYield: 12.4,
    occupancyRate: 100,
    estimatedMonthlyRent: 7205,
    monthlyPerShareRent: 0.360,
    nextPayoutDate: "2027-03-01",
    aiEstimatedValuation: 735000,
    aiValuationConfidence: 82,
    marketDrivers: {
      locationDemand: 85,
      marketMomentum: 93,
      propertyCondition: 99,
      rentalDemand: 94,
    },
    valuationHistory: [
      { date: "2026-05", value: 650000, sharePrice: 32.5 },
      { date: "2026-08", value: 672000, sharePrice: 33.6 },
      { date: "2026-11", value: 697000, sharePrice: 34.85 },
    ],
    aiForecast: [
      { month: "Dec 2026", low: 702000, mid: 711000, high: 722000 },
      { month: "Jan 2027", low: 710000, mid: 722000, high: 737000 },
      { month: "Feb 2027", low: 720000, mid: 736000, high: 754000 },
      { month: "Mar 2027", low: 732000, mid: 752000, high: 774000 },
      { month: "Apr 2027", low: 746000, mid: 770000, high: 796000 },
      { month: "May 2027", low: 762000, mid: 790000, high: 820000 },
    ],
    rentalHistory: [
      { month: "Aug 2026", grossCollected: 6900, expenses: 1020, netDistributed: 5880, payoutPerShare: 0.294 },
      { month: "Sep 2026", grossCollected: 7050, expenses: 1038, netDistributed: 6012, payoutPerShare: 0.301 },
      { month: "Oct 2026", grossCollected: 7205, expenses: 1055, netDistributed: 6150, payoutPerShare: 0.308 },
    ],
    dueDiligenceScore: 89,
    dueDiligenceItems: [
      {
        id: "dd-pk10-1",
        category: "Legal & Title",
        title: "Sindh IT Board Allotment & Title",
        status: "Verified",
        issuer: "Sindh IT Board",
        verifiedDate: "2026-06-01",
        expiryDate: "2046-06-01",
        notes: "IT zone allotment with 20-year renewable lease. Full title registered.",
        fileSize: "2.9 MB PDF",
      },
      {
        id: "dd-pk10-2",
        category: "Financial Audit",
        title: "Pre-Leasing Agreements & Revenue Verification",
        status: "Verified",
        issuer: "EY Pakistan",
        verifiedDate: "2026-10-20",
        expiryDate: "2027-10-20",
        notes: "14 signed 5-year leases verified. Advance deposits held in escrow.",
        fileSize: "3.1 MB PDF",
      },
      {
        id: "dd-pk10-3",
        category: "Inspection & Condition",
        title: "New Construction Completion Certificate",
        status: "Verified",
        issuer: "Hyderabad Development Authority",
        verifiedDate: "2026-09-15",
        expiryDate: "2028-09-15",
        notes: "Brand new building. Grade-A IT infrastructure. Completion certificate issued.",
        fileSize: "2.4 MB PDF",
      },
      {
        id: "dd-pk10-4",
        category: "Insurance & Risk",
        title: "Commercial Property & IT Infrastructure Insurance",
        status: "Verified",
        issuer: "EFU General Insurance",
        verifiedDate: "2026-10-01",
        expiryDate: "2027-10-01",
        notes: "PKR 220M policy covering property, IT equipment, and business interruption.",
        fileSize: "1.8 MB PDF",
      },
    ],
    operatingExpenses: {
      propertyTaxAnnual: 10000,
      insuranceAnnual: 6500,
      maintenanceAnnual: 14000,
      managementFeeRate: 0.075,
      capitalReservesAnnual: 9000,
    },
    assignedManager: {
      id: "mgr-pk10",
      name: "Imran Ali Shah",
      company: "Sindh Tech Property Management",
      rating: 4.68,
      phone: "+92 22 3812 5500",
    },
    tenantMetrics: {
      totalUnits: 14,
      occupiedUnits: 14,
      avgLeaseMonths: 60,
      onTimePaymentRate: 100,
    },
  },

  {
    "id": "prop-pk-isb-centaurus",
    "slug": "centaurus-residences-islamabad",
    "title": "Centaurus Luxury Heights",
    "headline": "Flagship high-rise residences overlooking Margalla Hills with direct mall & commercial access",
    "description": "Located in the heart of Islamabad's F-8/Blue Area commercial intersection, Centaurus Heights offers premium serviced executive apartments. Features high foreign diplomatic tenant occupancy, backup power generation, state-of-the-art gym, and high rental yield in USD equivalent.",
    "city": "Islamabad",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Jinnah Avenue, Sector F-8, Islamabad",
    "category": "luxury",
    "developer": "Pak Gulf Construction",
    "yearBuilt": 2021,
    "totalAreaSqFt": 54000,
    "totalValuation": 3800000,
    "sharePrice": 50,
    "netYield": 9.6,
    "grossYield": 11.4,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 76000,
    "availableShares": 18696,
    "fundedPercentage": 75.4,
    "estimatedMonthlyRent": 36100,
    "monthlyPerShareRent": 0.475,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 3708800,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 88,
      "propertyCondition": 92,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3534000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 3610000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 3686000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 3762000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 3800000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 3807600,
        "mid": 3822800,
        "high": 3841800
      },
      {
        "month": "Jan 2027",
        "low": 3819000,
        "mid": 3845600,
        "high": 3872200
      },
      {
        "month": "Feb 2027",
        "low": 3834200,
        "mid": 3868400,
        "high": 3906400
      },
      {
        "month": "Mar 2027",
        "low": 3849400,
        "mid": 3895000,
        "high": 3940600
      },
      {
        "month": "Apr 2027",
        "low": 3868400,
        "mid": 3921600,
        "high": 3978600
      },
      {
        "month": "May 2027",
        "low": 3887400,
        "mid": 3952000,
        "high": 4020400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 35500,
        "expenses": 5415,
        "netDistributed": 30085,
        "payoutPerShare": 0.396
      },
      {
        "month": "Jul 2026",
        "grossCollected": 35900,
        "expenses": 5415,
        "netDistributed": 30485,
        "payoutPerShare": 0.401
      },
      {
        "month": "Aug 2026",
        "grossCollected": 36100,
        "expenses": 5415,
        "netDistributed": 30685,
        "payoutPerShare": 0.475
      },
      {
        "month": "Sep 2026",
        "grossCollected": 36100,
        "expenses": 5415,
        "netDistributed": 30685,
        "payoutPerShare": 0.475
      },
      {
        "month": "Oct 2026",
        "grossCollected": 36100,
        "expenses": 5415,
        "netDistributed": 30685,
        "payoutPerShare": 0.475
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-isb-centaurus-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Islamabad Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-isb-centaurus-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-isb-centaurus-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-isb-centaurus-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 22800,
      "insuranceAnnual": 11400,
      "maintenanceAnnual": 19000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 7600
    },
    "assignedManager": {
      "id": "mgr-prop-pk-isb-centaurus",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 45,
      "occupiedUnits": 44,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1000",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-isb-gulberg-greens",
    "slug": "gulberg-greens-corporate-plaza",
    "title": "Gulberg Corporate Oasis",
    "headline": "Grade-A corporate office building on Islamabad Expressway with solar grid integration",
    "description": "A premier commercial office building occupied by multinational software consultancies and telecom engineering firms. Features LEED Gold green energy certification, dual fiber lines, and secure biometric access.",
    "city": "Islamabad",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Main Civic Center, Gulberg Greens, Islamabad",
    "category": "office",
    "developer": "IBECHS Development",
    "yearBuilt": 2023,
    "totalAreaSqFt": 62000,
    "totalValuation": 4200000,
    "sharePrice": 75,
    "netYield": 9.8,
    "grossYield": 11.8,
    "occupancyRate": 95,
    "coverImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 56000,
    "availableShares": 9856,
    "fundedPercentage": 82.4,
    "estimatedMonthlyRent": 41300,
    "monthlyPerShareRent": 0.738,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4132800,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 89,
      "propertyCondition": 93,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3906000,
        "sharePrice": 69.8
      },
      {
        "date": "2026-02",
        "value": 3990000,
        "sharePrice": 71.3
      },
      {
        "date": "2026-05",
        "value": 4074000,
        "sharePrice": 72.8
      },
      {
        "date": "2026-08",
        "value": 4158000,
        "sharePrice": 74.3
      },
      {
        "date": "2026-11",
        "value": 4200000,
        "sharePrice": 75
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4208400,
        "mid": 4225200,
        "high": 4246200
      },
      {
        "month": "Jan 2027",
        "low": 4221000,
        "mid": 4250400,
        "high": 4279800
      },
      {
        "month": "Feb 2027",
        "low": 4237800,
        "mid": 4275600,
        "high": 4317600
      },
      {
        "month": "Mar 2027",
        "low": 4254600,
        "mid": 4305000,
        "high": 4355400
      },
      {
        "month": "Apr 2027",
        "low": 4275600,
        "mid": 4334400,
        "high": 4397400
      },
      {
        "month": "May 2027",
        "low": 4296600,
        "mid": 4368000,
        "high": 4443600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 40700,
        "expenses": 6195,
        "netDistributed": 34505,
        "payoutPerShare": 0.616
      },
      {
        "month": "Jul 2026",
        "grossCollected": 41100,
        "expenses": 6195,
        "netDistributed": 34905,
        "payoutPerShare": 0.623
      },
      {
        "month": "Aug 2026",
        "grossCollected": 41300,
        "expenses": 6195,
        "netDistributed": 35105,
        "payoutPerShare": 0.738
      },
      {
        "month": "Sep 2026",
        "grossCollected": 41300,
        "expenses": 6195,
        "netDistributed": 35105,
        "payoutPerShare": 0.738
      },
      {
        "month": "Oct 2026",
        "grossCollected": 41300,
        "expenses": 6195,
        "netDistributed": 35105,
        "payoutPerShare": 0.738
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-isb-gulberg-greens-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Islamabad Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-isb-gulberg-greens-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-isb-gulberg-greens-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-isb-gulberg-greens-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 25200,
      "insuranceAnnual": 12600,
      "maintenanceAnnual": 21000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 8400
    },
    "assignedManager": {
      "id": "mgr-prop-pk-isb-gulberg-greens",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 52,
      "occupiedUnits": 49,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1001",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-lhr-dha-phase6",
    "slug": "dha-phase6-signature-villas",
    "title": "DHA Phase 6 Signature Estate",
    "headline": "Gated enclave of 8 bespoke modern luxury villas with private landscaped courtyards",
    "description": "Situated in DHA Phase 6 Lahore, these smart contemporary villas are leased to corporate executives and diplomatic staff. Features smart automation, 24/7 security patrol, solar backup, and robust capital appreciation.",
    "city": "Lahore",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Sector L, DHA Phase 6, Lahore",
    "category": "villa",
    "developer": "DHA Properties Lahore",
    "yearBuilt": 2023,
    "totalAreaSqFt": 48000,
    "totalValuation": 5100000,
    "sharePrice": 100,
    "netYield": 8.8,
    "grossYield": 10.5,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 51000,
    "availableShares": 5406,
    "fundedPercentage": 89.4,
    "estimatedMonthlyRent": 44625,
    "monthlyPerShareRent": 0.875,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5059200,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 90,
      "propertyCondition": 94,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4743000,
        "sharePrice": 93
      },
      {
        "date": "2026-02",
        "value": 4845000,
        "sharePrice": 95
      },
      {
        "date": "2026-05",
        "value": 4947000,
        "sharePrice": 97
      },
      {
        "date": "2026-08",
        "value": 5049000,
        "sharePrice": 99
      },
      {
        "date": "2026-11",
        "value": 5100000,
        "sharePrice": 100
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5110200,
        "mid": 5130600,
        "high": 5156100
      },
      {
        "month": "Jan 2027",
        "low": 5125500,
        "mid": 5161200,
        "high": 5196900
      },
      {
        "month": "Feb 2027",
        "low": 5145900,
        "mid": 5191800,
        "high": 5242800
      },
      {
        "month": "Mar 2027",
        "low": 5166300,
        "mid": 5227500,
        "high": 5288700
      },
      {
        "month": "Apr 2027",
        "low": 5191800,
        "mid": 5263200,
        "high": 5339700
      },
      {
        "month": "May 2027",
        "low": 5217300,
        "mid": 5304000,
        "high": 5395800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 44025,
        "expenses": 6694,
        "netDistributed": 37331,
        "payoutPerShare": 0.732
      },
      {
        "month": "Jul 2026",
        "grossCollected": 44425,
        "expenses": 6694,
        "netDistributed": 37731,
        "payoutPerShare": 0.74
      },
      {
        "month": "Aug 2026",
        "grossCollected": 44625,
        "expenses": 6694,
        "netDistributed": 37931,
        "payoutPerShare": 0.875
      },
      {
        "month": "Sep 2026",
        "grossCollected": 44625,
        "expenses": 6694,
        "netDistributed": 37931,
        "payoutPerShare": 0.875
      },
      {
        "month": "Oct 2026",
        "grossCollected": 44625,
        "expenses": 6694,
        "netDistributed": 37931,
        "payoutPerShare": 0.875
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-lhr-dha-phase6-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Lahore Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-lhr-dha-phase6-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-lhr-dha-phase6-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-lhr-dha-phase6-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 30600,
      "insuranceAnnual": 15300,
      "maintenanceAnnual": 25500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 10200
    },
    "assignedManager": {
      "id": "mgr-prop-pk-lhr-dha-phase6",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 40,
      "occupiedUnits": 39,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1002",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-lhr-gulberg-apartments",
    "slug": "gulberg-galleria-residences",
    "title": "Gulberg Galleria Residences",
    "headline": "Modern urban boutique apartments adjacent to Main Boulevard shopping & culinary row",
    "description": "High-density premium studio and 2-bedroom rental apartments catering to young finance and creative professionals in Lahore. Boasts an impressive 99% occupancy with continuous waiting lists.",
    "city": "Lahore",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Gulberg III, Main Boulevard, Lahore",
    "category": "residential",
    "developer": "Al-Ghani Urban Infra",
    "yearBuilt": 2022,
    "totalAreaSqFt": 41000,
    "totalValuation": 2900000,
    "sharePrice": 50,
    "netYield": 9.2,
    "grossYield": 10.9,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 58000,
    "availableShares": 2088,
    "fundedPercentage": 96.4,
    "estimatedMonthlyRent": 26342,
    "monthlyPerShareRent": 0.454,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 2900000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 91,
      "propertyCondition": 95,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 2697000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 2755000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 2813000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 2871000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 2900000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 2905800,
        "mid": 2917400,
        "high": 2931900
      },
      {
        "month": "Jan 2027",
        "low": 2914500,
        "mid": 2934800,
        "high": 2955100
      },
      {
        "month": "Feb 2027",
        "low": 2926100,
        "mid": 2952200,
        "high": 2981200
      },
      {
        "month": "Mar 2027",
        "low": 2937700,
        "mid": 2972500,
        "high": 3007300
      },
      {
        "month": "Apr 2027",
        "low": 2952200,
        "mid": 2992800,
        "high": 3036300
      },
      {
        "month": "May 2027",
        "low": 2966700,
        "mid": 3016000,
        "high": 3068200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 25742,
        "expenses": 3951,
        "netDistributed": 21791,
        "payoutPerShare": 0.376
      },
      {
        "month": "Jul 2026",
        "grossCollected": 26142,
        "expenses": 3951,
        "netDistributed": 22191,
        "payoutPerShare": 0.383
      },
      {
        "month": "Aug 2026",
        "grossCollected": 26342,
        "expenses": 3951,
        "netDistributed": 22391,
        "payoutPerShare": 0.454
      },
      {
        "month": "Sep 2026",
        "grossCollected": 26342,
        "expenses": 3951,
        "netDistributed": 22391,
        "payoutPerShare": 0.454
      },
      {
        "month": "Oct 2026",
        "grossCollected": 26342,
        "expenses": 3951,
        "netDistributed": 22391,
        "payoutPerShare": 0.454
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-lhr-gulberg-apartments-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Lahore Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-lhr-gulberg-apartments-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-lhr-gulberg-apartments-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-lhr-gulberg-apartments-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 17400,
      "insuranceAnnual": 8700,
      "maintenanceAnnual": 14500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 5800
    },
    "assignedManager": {
      "id": "mgr-prop-pk-lhr-gulberg-apartments",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 34,
      "occupiedUnits": 34,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1003",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-khi-clifton-waterfront",
    "slug": "clifton-sea-view-residences",
    "title": "Clifton Marina Vista",
    "headline": "Arabian Sea waterfront luxury apartments with panoramic ocean terraces",
    "description": "Positioned directly along Clifton Beach in Karachi, Marina Vista features floor-to-ceiling sea view balconies, private basement parking, and advanced desalination systems ensuring uninterrupted utilities.",
    "city": "Karachi",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Block 4, Clifton Beach Road, Karachi",
    "category": "waterfront",
    "developer": "Habib & Sons PropTech",
    "yearBuilt": 2022,
    "totalAreaSqFt": 78000,
    "totalValuation": 6400000,
    "sharePrice": 80,
    "netYield": 9.4,
    "grossYield": 11.2,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 80000,
    "availableShares": 15680,
    "fundedPercentage": 80.4,
    "estimatedMonthlyRent": 59733,
    "monthlyPerShareRent": 0.747,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6451200,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 92,
      "propertyCondition": 96,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5952000,
        "sharePrice": 74.4
      },
      {
        "date": "2026-02",
        "value": 6080000,
        "sharePrice": 76
      },
      {
        "date": "2026-05",
        "value": 6208000,
        "sharePrice": 77.6
      },
      {
        "date": "2026-08",
        "value": 6336000,
        "sharePrice": 79.2
      },
      {
        "date": "2026-11",
        "value": 6400000,
        "sharePrice": 80
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6412800,
        "mid": 6438400,
        "high": 6470400
      },
      {
        "month": "Jan 2027",
        "low": 6432000,
        "mid": 6476800,
        "high": 6521600
      },
      {
        "month": "Feb 2027",
        "low": 6457600,
        "mid": 6515200,
        "high": 6579200
      },
      {
        "month": "Mar 2027",
        "low": 6483200,
        "mid": 6560000,
        "high": 6636800
      },
      {
        "month": "Apr 2027",
        "low": 6515200,
        "mid": 6604800,
        "high": 6700800
      },
      {
        "month": "May 2027",
        "low": 6547200,
        "mid": 6656000,
        "high": 6771200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 59133,
        "expenses": 8960,
        "netDistributed": 50173,
        "payoutPerShare": 0.627
      },
      {
        "month": "Jul 2026",
        "grossCollected": 59533,
        "expenses": 8960,
        "netDistributed": 50573,
        "payoutPerShare": 0.632
      },
      {
        "month": "Aug 2026",
        "grossCollected": 59733,
        "expenses": 8960,
        "netDistributed": 50773,
        "payoutPerShare": 0.747
      },
      {
        "month": "Sep 2026",
        "grossCollected": 59733,
        "expenses": 8960,
        "netDistributed": 50773,
        "payoutPerShare": 0.747
      },
      {
        "month": "Oct 2026",
        "grossCollected": 59733,
        "expenses": 8960,
        "netDistributed": 50773,
        "payoutPerShare": 0.747
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-khi-clifton-waterfront-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Karachi Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-khi-clifton-waterfront-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-khi-clifton-waterfront-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-khi-clifton-waterfront-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 38400,
      "insuranceAnnual": 19200,
      "maintenanceAnnual": 32000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12800
    },
    "assignedManager": {
      "id": "mgr-prop-pk-khi-clifton-waterfront",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 65,
      "occupiedUnits": 62,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1004",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-khi-dha8-mixeduse",
    "slug": "dha-phase8-commerce-hub",
    "title": "Creek Marina Commercial Hub",
    "headline": "High-yield mixed-use retail and executive workspace facing DHA Creek",
    "description": "A state-of-the-art commercial podium housing banking headquarters, healthcare clinics, and artisan dining establishments with consistent long-term 5-year tenant covenants.",
    "city": "Karachi",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "DHA Phase 8 Commercial Belt, Karachi",
    "category": "mixed-use",
    "developer": "Creek Vista Developers",
    "yearBuilt": 2023,
    "totalAreaSqFt": 65000,
    "totalValuation": 5600000,
    "sharePrice": 70,
    "netYield": 10.1,
    "grossYield": 12,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 80000,
    "availableShares": 10080,
    "fundedPercentage": 87.4,
    "estimatedMonthlyRent": 56000,
    "monthlyPerShareRent": 0.7,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5689600,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 93,
      "propertyCondition": 97,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5208000,
        "sharePrice": 65.1
      },
      {
        "date": "2026-02",
        "value": 5320000,
        "sharePrice": 66.5
      },
      {
        "date": "2026-05",
        "value": 5432000,
        "sharePrice": 67.9
      },
      {
        "date": "2026-08",
        "value": 5544000,
        "sharePrice": 69.3
      },
      {
        "date": "2026-11",
        "value": 5600000,
        "sharePrice": 70
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5611200,
        "mid": 5633600,
        "high": 5661600
      },
      {
        "month": "Jan 2027",
        "low": 5628000,
        "mid": 5667200,
        "high": 5706400
      },
      {
        "month": "Feb 2027",
        "low": 5650400,
        "mid": 5700800,
        "high": 5756800
      },
      {
        "month": "Mar 2027",
        "low": 5672800,
        "mid": 5740000,
        "high": 5807200
      },
      {
        "month": "Apr 2027",
        "low": 5700800,
        "mid": 5779200,
        "high": 5863200
      },
      {
        "month": "May 2027",
        "low": 5728800,
        "mid": 5824000,
        "high": 5924800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 55400,
        "expenses": 8400,
        "netDistributed": 47000,
        "payoutPerShare": 0.588
      },
      {
        "month": "Jul 2026",
        "grossCollected": 55800,
        "expenses": 8400,
        "netDistributed": 47400,
        "payoutPerShare": 0.593
      },
      {
        "month": "Aug 2026",
        "grossCollected": 56000,
        "expenses": 8400,
        "netDistributed": 47600,
        "payoutPerShare": 0.7
      },
      {
        "month": "Sep 2026",
        "grossCollected": 56000,
        "expenses": 8400,
        "netDistributed": 47600,
        "payoutPerShare": 0.7
      },
      {
        "month": "Oct 2026",
        "grossCollected": 56000,
        "expenses": 8400,
        "netDistributed": 47600,
        "payoutPerShare": 0.7
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-khi-dha8-mixeduse-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Karachi Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-khi-dha8-mixeduse-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-khi-dha8-mixeduse-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-khi-dha8-mixeduse-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 33600,
      "insuranceAnnual": 16800,
      "maintenanceAnnual": 28000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11200
    },
    "assignedManager": {
      "id": "mgr-prop-pk-khi-dha8-mixeduse",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 54,
      "occupiedUnits": 53,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1005",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-rwp-bahria-plaza",
    "slug": "bahria-town-phase7-civic-tower",
    "title": "Bahria Civic Tower",
    "headline": "Multi-tenant commercial retail and corporate center along River View Commercial strip",
    "description": "Thriving commercial plaza with prominent ground-floor banking branches, retail supermarkets, and top-tier fitness facilities in Bahria Town Phase 7.",
    "city": "Rawalpindi",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Civic Centre, Bahria Town Phase 7, Rawalpindi",
    "category": "commercial",
    "developer": "Bahria Properties",
    "yearBuilt": 2021,
    "totalAreaSqFt": 52000,
    "totalValuation": 3300000,
    "sharePrice": 50,
    "netYield": 9.5,
    "grossYield": 11.3,
    "occupancyRate": 94,
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 66000,
    "availableShares": 3696,
    "fundedPercentage": 94.4,
    "estimatedMonthlyRent": 31075,
    "monthlyPerShareRent": 0.471,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 3379200,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 94,
      "propertyCondition": 98,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3069000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 3135000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 3201000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 3267000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 3300000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 3306600,
        "mid": 3319800,
        "high": 3336300
      },
      {
        "month": "Jan 2027",
        "low": 3316500,
        "mid": 3339600,
        "high": 3362700
      },
      {
        "month": "Feb 2027",
        "low": 3329700,
        "mid": 3359400,
        "high": 3392400
      },
      {
        "month": "Mar 2027",
        "low": 3342900,
        "mid": 3382500,
        "high": 3422100
      },
      {
        "month": "Apr 2027",
        "low": 3359400,
        "mid": 3405600,
        "high": 3455100
      },
      {
        "month": "May 2027",
        "low": 3375900,
        "mid": 3432000,
        "high": 3491400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 30475,
        "expenses": 4661,
        "netDistributed": 25814,
        "payoutPerShare": 0.391
      },
      {
        "month": "Jul 2026",
        "grossCollected": 30875,
        "expenses": 4661,
        "netDistributed": 26214,
        "payoutPerShare": 0.397
      },
      {
        "month": "Aug 2026",
        "grossCollected": 31075,
        "expenses": 4661,
        "netDistributed": 26414,
        "payoutPerShare": 0.471
      },
      {
        "month": "Sep 2026",
        "grossCollected": 31075,
        "expenses": 4661,
        "netDistributed": 26414,
        "payoutPerShare": 0.471
      },
      {
        "month": "Oct 2026",
        "grossCollected": 31075,
        "expenses": 4661,
        "netDistributed": 26414,
        "payoutPerShare": 0.471
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-rwp-bahria-plaza-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Rawalpindi Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-rwp-bahria-plaza-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-rwp-bahria-plaza-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-rwp-bahria-plaza-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 19800,
      "insuranceAnnual": 9900,
      "maintenanceAnnual": 16500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 6600
    },
    "assignedManager": {
      "id": "mgr-prop-pk-rwp-bahria-plaza",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 43,
      "occupiedUnits": 40,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1006",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-fsd-canal-logistics",
    "slug": "faisalabad-industrial-logistics-park",
    "title": "Textile Corridor Logistics Hub",
    "headline": "Automated distribution warehouse with rapid access to M-4 Motorway cargo interchanges",
    "description": "A temperature-controlled logistics facility leased to major textile export conglomerates and national e-commerce shipping partners under an index-linked 7-year lease.",
    "city": "Faisalabad",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Canal Road Industrial Zone, Faisalabad",
    "category": "logistics",
    "developer": "Punjab Industrial Hubs",
    "yearBuilt": 2022,
    "totalAreaSqFt": 110000,
    "totalValuation": 4800000,
    "sharePrice": 60,
    "netYield": 10.2,
    "grossYield": 12.2,
    "occupancyRate": 100,
    "coverImage": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 80000,
    "availableShares": 17280,
    "fundedPercentage": 78.4,
    "estimatedMonthlyRent": 48800,
    "monthlyPerShareRent": 0.61,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4684800,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 95,
      "propertyCondition": 99,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4464000,
        "sharePrice": 55.8
      },
      {
        "date": "2026-02",
        "value": 4560000,
        "sharePrice": 57
      },
      {
        "date": "2026-05",
        "value": 4656000,
        "sharePrice": 58.2
      },
      {
        "date": "2026-08",
        "value": 4752000,
        "sharePrice": 59.4
      },
      {
        "date": "2026-11",
        "value": 4800000,
        "sharePrice": 60
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4809600,
        "mid": 4828800,
        "high": 4852800
      },
      {
        "month": "Jan 2027",
        "low": 4824000,
        "mid": 4857600,
        "high": 4891200
      },
      {
        "month": "Feb 2027",
        "low": 4843200,
        "mid": 4886400,
        "high": 4934400
      },
      {
        "month": "Mar 2027",
        "low": 4862400,
        "mid": 4920000,
        "high": 4977600
      },
      {
        "month": "Apr 2027",
        "low": 4886400,
        "mid": 4953600,
        "high": 5025600
      },
      {
        "month": "May 2027",
        "low": 4910400,
        "mid": 4992000,
        "high": 5078400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 48200,
        "expenses": 7320,
        "netDistributed": 40880,
        "payoutPerShare": 0.511
      },
      {
        "month": "Jul 2026",
        "grossCollected": 48600,
        "expenses": 7320,
        "netDistributed": 41280,
        "payoutPerShare": 0.516
      },
      {
        "month": "Aug 2026",
        "grossCollected": 48800,
        "expenses": 7320,
        "netDistributed": 41480,
        "payoutPerShare": 0.61
      },
      {
        "month": "Sep 2026",
        "grossCollected": 48800,
        "expenses": 7320,
        "netDistributed": 41480,
        "payoutPerShare": 0.61
      },
      {
        "month": "Oct 2026",
        "grossCollected": 48800,
        "expenses": 7320,
        "netDistributed": 41480,
        "payoutPerShare": 0.61
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-fsd-canal-logistics-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Faisalabad Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-fsd-canal-logistics-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-fsd-canal-logistics-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-fsd-canal-logistics-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 28800,
      "insuranceAnnual": 14400,
      "maintenanceAnnual": 24000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9600
    },
    "assignedManager": {
      "id": "mgr-prop-pk-fsd-canal-logistics",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 92,
      "occupiedUnits": 92,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1007",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-mul-bosan-student",
    "slug": "multan-university-student-residences",
    "title": "Bosan Scholar Campus Suites",
    "headline": "Purpose-built student accommodation serving Bahauddin Zakariya University scholars",
    "description": "Modern, secure student housing with study lounges, fiber internet, communal dining, and round-the-clock management.",
    "city": "Multan",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Bosan Road University Quarter, Multan",
    "category": "student",
    "developer": "Southern Punjab Edifice",
    "yearBuilt": 2022,
    "totalAreaSqFt": 38000,
    "totalValuation": 2200000,
    "sharePrice": 25,
    "netYield": 10,
    "grossYield": 11.9,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 88000,
    "availableShares": 12848,
    "fundedPercentage": 85.4,
    "estimatedMonthlyRent": 21817,
    "monthlyPerShareRent": 0.248,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 2164800,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 96,
      "propertyCondition": 92,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 2046000,
        "sharePrice": 23.3
      },
      {
        "date": "2026-02",
        "value": 2090000,
        "sharePrice": 23.8
      },
      {
        "date": "2026-05",
        "value": 2134000,
        "sharePrice": 24.3
      },
      {
        "date": "2026-08",
        "value": 2178000,
        "sharePrice": 24.8
      },
      {
        "date": "2026-11",
        "value": 2200000,
        "sharePrice": 25
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 2204400,
        "mid": 2213200,
        "high": 2224200
      },
      {
        "month": "Jan 2027",
        "low": 2211000,
        "mid": 2226400,
        "high": 2241800
      },
      {
        "month": "Feb 2027",
        "low": 2219800,
        "mid": 2239600,
        "high": 2261600
      },
      {
        "month": "Mar 2027",
        "low": 2228600,
        "mid": 2255000,
        "high": 2281400
      },
      {
        "month": "Apr 2027",
        "low": 2239600,
        "mid": 2270400,
        "high": 2303400
      },
      {
        "month": "May 2027",
        "low": 2250600,
        "mid": 2288000,
        "high": 2327600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 21217,
        "expenses": 3273,
        "netDistributed": 17944,
        "payoutPerShare": 0.204
      },
      {
        "month": "Jul 2026",
        "grossCollected": 21617,
        "expenses": 3273,
        "netDistributed": 18344,
        "payoutPerShare": 0.208
      },
      {
        "month": "Aug 2026",
        "grossCollected": 21817,
        "expenses": 3273,
        "netDistributed": 18544,
        "payoutPerShare": 0.248
      },
      {
        "month": "Sep 2026",
        "grossCollected": 21817,
        "expenses": 3273,
        "netDistributed": 18544,
        "payoutPerShare": 0.248
      },
      {
        "month": "Oct 2026",
        "grossCollected": 21817,
        "expenses": 3273,
        "netDistributed": 18544,
        "payoutPerShare": 0.248
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-mul-bosan-student-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Multan Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-mul-bosan-student-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-mul-bosan-student-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-mul-bosan-student-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 13200,
      "insuranceAnnual": 6600,
      "maintenanceAnnual": 11000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 4400
    },
    "assignedManager": {
      "id": "mgr-prop-pk-mul-bosan-student",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 32,
      "occupiedUnits": 31,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1008",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-pew-hayatabad-affordable",
    "slug": "hayatabad-green-community-homes",
    "title": "Hayatabad Green Community",
    "headline": "Affordable family housing project with central community parks and solar water heating",
    "description": "An inclusive residential development offering sustainable, affordable two-and-three bedroom apartment ownership pathways for public sector educators and medical staff.",
    "city": "Peshawar",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Sector F-10, Hayatabad, Peshawar",
    "category": "affordable",
    "developer": "KP Housing Foundation",
    "yearBuilt": 2023,
    "totalAreaSqFt": 45000,
    "totalValuation": 2100000,
    "sharePrice": 25,
    "netYield": 8.9,
    "grossYield": 10.4,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 84000,
    "availableShares": 6384,
    "fundedPercentage": 92.4,
    "estimatedMonthlyRent": 18200,
    "monthlyPerShareRent": 0.217,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 2083200,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 97,
      "propertyCondition": 93,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 1953000,
        "sharePrice": 23.3
      },
      {
        "date": "2026-02",
        "value": 1995000,
        "sharePrice": 23.8
      },
      {
        "date": "2026-05",
        "value": 2037000,
        "sharePrice": 24.3
      },
      {
        "date": "2026-08",
        "value": 2079000,
        "sharePrice": 24.8
      },
      {
        "date": "2026-11",
        "value": 2100000,
        "sharePrice": 25
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 2104200,
        "mid": 2112600,
        "high": 2123100
      },
      {
        "month": "Jan 2027",
        "low": 2110500,
        "mid": 2125200,
        "high": 2139900
      },
      {
        "month": "Feb 2027",
        "low": 2118900,
        "mid": 2137800,
        "high": 2158800
      },
      {
        "month": "Mar 2027",
        "low": 2127300,
        "mid": 2152500,
        "high": 2177700
      },
      {
        "month": "Apr 2027",
        "low": 2137800,
        "mid": 2167200,
        "high": 2198700
      },
      {
        "month": "May 2027",
        "low": 2148300,
        "mid": 2184000,
        "high": 2221800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 17600,
        "expenses": 2730,
        "netDistributed": 14870,
        "payoutPerShare": 0.177
      },
      {
        "month": "Jul 2026",
        "grossCollected": 18000,
        "expenses": 2730,
        "netDistributed": 15270,
        "payoutPerShare": 0.182
      },
      {
        "month": "Aug 2026",
        "grossCollected": 18200,
        "expenses": 2730,
        "netDistributed": 15470,
        "payoutPerShare": 0.217
      },
      {
        "month": "Sep 2026",
        "grossCollected": 18200,
        "expenses": 2730,
        "netDistributed": 15470,
        "payoutPerShare": 0.217
      },
      {
        "month": "Oct 2026",
        "grossCollected": 18200,
        "expenses": 2730,
        "netDistributed": 15470,
        "payoutPerShare": 0.217
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-pew-hayatabad-affordable-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Peshawar Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-pew-hayatabad-affordable-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-pew-hayatabad-affordable-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-pew-hayatabad-affordable-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 12600,
      "insuranceAnnual": 6300,
      "maintenanceAnnual": 10500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 4200
    },
    "assignedManager": {
      "id": "mgr-prop-pk-pew-hayatabad-affordable",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1009",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pk-gwd-marina-drive",
    "slug": "gwadar-free-zone-hospitality-suites",
    "title": "Gwadar Portside Hospitality Suites",
    "headline": "Executive coastal hotel residences serving maritime trade delegations and logistics specialists",
    "description": "Beachfront serviced suites located adjacent to the Gwadar Free Economic Zone, catering to international maritime executives and engineers with premium facilities.",
    "city": "Gwadar",
    "country": "Pakistan",
    "countryCode": "PK",
    "address": "Marine Drive Promenade, Gwadar",
    "category": "hospitality",
    "developer": "China-Pak Port Properties",
    "yearBuilt": 2023,
    "totalAreaSqFt": 58000,
    "totalValuation": 3900000,
    "sharePrice": 65,
    "netYield": 9.7,
    "grossYield": 11.6,
    "occupancyRate": 93,
    "coverImage": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 60000,
    "availableShares": 14160,
    "fundedPercentage": 76.4,
    "estimatedMonthlyRent": 37700,
    "monthlyPerShareRent": 0.628,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 3900000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 98,
      "propertyCondition": 94,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3627000,
        "sharePrice": 60.5
      },
      {
        "date": "2026-02",
        "value": 3705000,
        "sharePrice": 61.8
      },
      {
        "date": "2026-05",
        "value": 3783000,
        "sharePrice": 63
      },
      {
        "date": "2026-08",
        "value": 3861000,
        "sharePrice": 64.3
      },
      {
        "date": "2026-11",
        "value": 3900000,
        "sharePrice": 65
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 3907800,
        "mid": 3923400,
        "high": 3942900
      },
      {
        "month": "Jan 2027",
        "low": 3919500,
        "mid": 3946800,
        "high": 3974100
      },
      {
        "month": "Feb 2027",
        "low": 3935100,
        "mid": 3970200,
        "high": 4009200
      },
      {
        "month": "Mar 2027",
        "low": 3950700,
        "mid": 3997500,
        "high": 4044300
      },
      {
        "month": "Apr 2027",
        "low": 3970200,
        "mid": 4024800,
        "high": 4083300
      },
      {
        "month": "May 2027",
        "low": 3989700,
        "mid": 4056000,
        "high": 4126200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 37100,
        "expenses": 5655,
        "netDistributed": 31445,
        "payoutPerShare": 0.524
      },
      {
        "month": "Jul 2026",
        "grossCollected": 37500,
        "expenses": 5655,
        "netDistributed": 31845,
        "payoutPerShare": 0.531
      },
      {
        "month": "Aug 2026",
        "grossCollected": 37700,
        "expenses": 5655,
        "netDistributed": 32045,
        "payoutPerShare": 0.628
      },
      {
        "month": "Sep 2026",
        "grossCollected": 37700,
        "expenses": 5655,
        "netDistributed": 32045,
        "payoutPerShare": 0.628
      },
      {
        "month": "Oct 2026",
        "grossCollected": 37700,
        "expenses": 5655,
        "netDistributed": 32045,
        "payoutPerShare": 0.628
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pk-gwd-marina-drive-01",
        "category": "Legal & Title",
        "title": "Pakistan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Gwadar Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pk-gwd-marina-drive-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pk-gwd-marina-drive-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pk-gwd-marina-drive-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 23400,
      "insuranceAnnual": 11700,
      "maintenanceAnnual": 19500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 7800
    },
    "assignedManager": {
      "id": "mgr-prop-pk-gwd-marina-drive",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 48,
      "occupiedUnits": 45,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PK-1010",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ae-dxb-downtown-crown",
    "slug": "downtown-burj-crown-suites",
    "title": "Burj Crown Executive Residences",
    "headline": "Ultra-prime residences moments from Dubai Mall and Dubai Opera with Burj Khalifa skyline views",
    "description": "Prestige residences managed to Five-Star hospitality standards. High demand from multinational tech and banking executives ensures premium rental rates in AED/USD.",
    "city": "Dubai",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "address": "Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    "category": "luxury",
    "developer": "Emaar Properties",
    "yearBuilt": 2023,
    "totalAreaSqFt": 68000,
    "totalValuation": 9800000,
    "sharePrice": 100,
    "netYield": 8.5,
    "grossYield": 10.2,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 98000,
    "availableShares": 16268,
    "fundedPercentage": 83.4,
    "estimatedMonthlyRent": 83300,
    "monthlyPerShareRent": 0.85,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 9878400,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 88,
      "propertyCondition": 95,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 9114000,
        "sharePrice": 93
      },
      {
        "date": "2026-02",
        "value": 9310000,
        "sharePrice": 95
      },
      {
        "date": "2026-05",
        "value": 9506000,
        "sharePrice": 97
      },
      {
        "date": "2026-08",
        "value": 9702000,
        "sharePrice": 99
      },
      {
        "date": "2026-11",
        "value": 9800000,
        "sharePrice": 100
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 9819600,
        "mid": 9858800,
        "high": 9907800
      },
      {
        "month": "Jan 2027",
        "low": 9849000,
        "mid": 9917600,
        "high": 9986200
      },
      {
        "month": "Feb 2027",
        "low": 9888200,
        "mid": 9976400,
        "high": 10074400
      },
      {
        "month": "Mar 2027",
        "low": 9927400,
        "mid": 10045000,
        "high": 10162600
      },
      {
        "month": "Apr 2027",
        "low": 9976400,
        "mid": 10113600,
        "high": 10260600
      },
      {
        "month": "May 2027",
        "low": 10025400,
        "mid": 10192000,
        "high": 10368400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 82700,
        "expenses": 12495,
        "netDistributed": 70205,
        "payoutPerShare": 0.716
      },
      {
        "month": "Jul 2026",
        "grossCollected": 83100,
        "expenses": 12495,
        "netDistributed": 70605,
        "payoutPerShare": 0.72
      },
      {
        "month": "Aug 2026",
        "grossCollected": 83300,
        "expenses": 12495,
        "netDistributed": 70805,
        "payoutPerShare": 0.85
      },
      {
        "month": "Sep 2026",
        "grossCollected": 83300,
        "expenses": 12495,
        "netDistributed": 70805,
        "payoutPerShare": 0.85
      },
      {
        "month": "Oct 2026",
        "grossCollected": 83300,
        "expenses": 12495,
        "netDistributed": 70805,
        "payoutPerShare": 0.85
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ae-dxb-downtown-crown-01",
        "category": "Legal & Title",
        "title": "United Arab Emirates Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Dubai Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ae-dxb-downtown-crown-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ae-dxb-downtown-crown-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ae-dxb-downtown-crown-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 58800,
      "insuranceAnnual": 29400,
      "maintenanceAnnual": 49000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 19600
    },
    "assignedManager": {
      "id": "mgr-prop-ae-dxb-downtown-crown",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 57,
      "occupiedUnits": 56,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AE-1011",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ae-dxb-palm-waterfront",
    "slug": "palm-jumeirah-east-crescent-villas",
    "title": "Palm Azure Waterfront Villas",
    "headline": "Bespoke beachfront villas with private beach access and private boat docks",
    "description": "Architectural masterpiece on Palm Jumeirah with infinity pool, smart climate control, and uninterrupted Persian Gulf horizon panoramas.",
    "city": "Dubai",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "address": "East Crescent, Palm Jumeirah, Dubai",
    "category": "waterfront",
    "developer": "Nakheel & Omniyat",
    "yearBuilt": 2022,
    "totalAreaSqFt": 42000,
    "totalValuation": 14200000,
    "sharePrice": 150,
    "netYield": 7.9,
    "grossYield": 9.4,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 94667,
    "availableShares": 9088,
    "fundedPercentage": 90.4,
    "estimatedMonthlyRent": 111233,
    "monthlyPerShareRent": 1.175,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 14427200,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 89,
      "propertyCondition": 96,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 13206000,
        "sharePrice": 139.5
      },
      {
        "date": "2026-02",
        "value": 13490000,
        "sharePrice": 142.5
      },
      {
        "date": "2026-05",
        "value": 13774000,
        "sharePrice": 145.5
      },
      {
        "date": "2026-08",
        "value": 14058000,
        "sharePrice": 148.5
      },
      {
        "date": "2026-11",
        "value": 14200000,
        "sharePrice": 150
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 14228400,
        "mid": 14285200,
        "high": 14356200
      },
      {
        "month": "Jan 2027",
        "low": 14271000,
        "mid": 14370400,
        "high": 14469800
      },
      {
        "month": "Feb 2027",
        "low": 14327800,
        "mid": 14455600,
        "high": 14597600
      },
      {
        "month": "Mar 2027",
        "low": 14384600,
        "mid": 14555000,
        "high": 14725400
      },
      {
        "month": "Apr 2027",
        "low": 14455600,
        "mid": 14654400,
        "high": 14867400
      },
      {
        "month": "May 2027",
        "low": 14526600,
        "mid": 14768000,
        "high": 15023600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 110633,
        "expenses": 16685,
        "netDistributed": 93948,
        "payoutPerShare": 0.992
      },
      {
        "month": "Jul 2026",
        "grossCollected": 111033,
        "expenses": 16685,
        "netDistributed": 94348,
        "payoutPerShare": 0.997
      },
      {
        "month": "Aug 2026",
        "grossCollected": 111233,
        "expenses": 16685,
        "netDistributed": 94548,
        "payoutPerShare": 1.175
      },
      {
        "month": "Sep 2026",
        "grossCollected": 111233,
        "expenses": 16685,
        "netDistributed": 94548,
        "payoutPerShare": 1.175
      },
      {
        "month": "Oct 2026",
        "grossCollected": 111233,
        "expenses": 16685,
        "netDistributed": 94548,
        "payoutPerShare": 1.175
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ae-dxb-palm-waterfront-01",
        "category": "Legal & Title",
        "title": "United Arab Emirates Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Dubai Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ae-dxb-palm-waterfront-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ae-dxb-palm-waterfront-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ae-dxb-palm-waterfront-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 85200,
      "insuranceAnnual": 42600,
      "maintenanceAnnual": 71000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 28400
    },
    "assignedManager": {
      "id": "mgr-prop-ae-dxb-palm-waterfront",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 35,
      "occupiedUnits": 34,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AE-1012",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ae-auh-reem-island",
    "slug": "reem-island-marina-towers",
    "title": "Al Reem Marina Tower",
    "headline": "Modern coastal residential building close to Abu Dhabi Global Market (ADGM) financial center",
    "description": "Favored residence for lawyers, bankers, and sovereign wealth analysts. Directly linked to promenade cafes, parks, and clean transport links.",
    "city": "Abu Dhabi",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "address": "Marina Square, Al Reem Island, Abu Dhabi",
    "category": "residential",
    "developer": "Aldar Properties",
    "yearBuilt": 2022,
    "totalAreaSqFt": 72000,
    "totalValuation": 7600000,
    "sharePrice": 80,
    "netYield": 8.7,
    "grossYield": 10.3,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 95000,
    "availableShares": 2470,
    "fundedPercentage": 97.4,
    "estimatedMonthlyRent": 65233,
    "monthlyPerShareRent": 0.687,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7782400,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 90,
      "propertyCondition": 97,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 7068000,
        "sharePrice": 74.4
      },
      {
        "date": "2026-02",
        "value": 7220000,
        "sharePrice": 76
      },
      {
        "date": "2026-05",
        "value": 7372000,
        "sharePrice": 77.6
      },
      {
        "date": "2026-08",
        "value": 7524000,
        "sharePrice": 79.2
      },
      {
        "date": "2026-11",
        "value": 7600000,
        "sharePrice": 80
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7615200,
        "mid": 7645600,
        "high": 7683600
      },
      {
        "month": "Jan 2027",
        "low": 7638000,
        "mid": 7691200,
        "high": 7744400
      },
      {
        "month": "Feb 2027",
        "low": 7668400,
        "mid": 7736800,
        "high": 7812800
      },
      {
        "month": "Mar 2027",
        "low": 7698800,
        "mid": 7790000,
        "high": 7881200
      },
      {
        "month": "Apr 2027",
        "low": 7736800,
        "mid": 7843200,
        "high": 7957200
      },
      {
        "month": "May 2027",
        "low": 7774800,
        "mid": 7904000,
        "high": 8040800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 64633,
        "expenses": 9785,
        "netDistributed": 54848,
        "payoutPerShare": 0.577
      },
      {
        "month": "Jul 2026",
        "grossCollected": 65033,
        "expenses": 9785,
        "netDistributed": 55248,
        "payoutPerShare": 0.582
      },
      {
        "month": "Aug 2026",
        "grossCollected": 65233,
        "expenses": 9785,
        "netDistributed": 55448,
        "payoutPerShare": 0.687
      },
      {
        "month": "Sep 2026",
        "grossCollected": 65233,
        "expenses": 9785,
        "netDistributed": 55448,
        "payoutPerShare": 0.687
      },
      {
        "month": "Oct 2026",
        "grossCollected": 65233,
        "expenses": 9785,
        "netDistributed": 55448,
        "payoutPerShare": 0.687
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ae-auh-reem-island-01",
        "category": "Legal & Title",
        "title": "United Arab Emirates Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Abu Dhabi Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ae-auh-reem-island-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ae-auh-reem-island-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ae-auh-reem-island-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 45600,
      "insuranceAnnual": 22800,
      "maintenanceAnnual": 38000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 15200
    },
    "assignedManager": {
      "id": "mgr-prop-ae-auh-reem-island",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 60,
      "occupiedUnits": 58,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AE-1013",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ae-dxb-business-bay-office",
    "slug": "business-bay-canal-offices",
    "title": "Canal View Executive Plaza",
    "headline": "Grade-A corporate office building overlooking Dubai Water Canal with direct metro link",
    "description": "Fully leased corporate office tower housing fintech accelerators, crypto compliance firms, and maritime legal chambers under institutional 5-year lease agreements.",
    "city": "Dubai",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "address": "Marasi Drive, Business Bay, Dubai",
    "category": "office",
    "developer": "Dubai Properties",
    "yearBuilt": 2021,
    "totalAreaSqFt": 85000,
    "totalValuation": 11500000,
    "sharePrice": 115,
    "netYield": 9.1,
    "grossYield": 10.8,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 100000,
    "availableShares": 18600,
    "fundedPercentage": 81.4,
    "estimatedMonthlyRent": 103500,
    "monthlyPerShareRent": 1.035,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 11224000,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 91,
      "propertyCondition": 98,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 10695000,
        "sharePrice": 107
      },
      {
        "date": "2026-02",
        "value": 10925000,
        "sharePrice": 109.3
      },
      {
        "date": "2026-05",
        "value": 11155000,
        "sharePrice": 111.5
      },
      {
        "date": "2026-08",
        "value": 11385000,
        "sharePrice": 113.8
      },
      {
        "date": "2026-11",
        "value": 11500000,
        "sharePrice": 115
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 11523000,
        "mid": 11569000,
        "high": 11626500
      },
      {
        "month": "Jan 2027",
        "low": 11557500,
        "mid": 11638000,
        "high": 11718500
      },
      {
        "month": "Feb 2027",
        "low": 11603500,
        "mid": 11707000,
        "high": 11822000
      },
      {
        "month": "Mar 2027",
        "low": 11649500,
        "mid": 11787500,
        "high": 11925500
      },
      {
        "month": "Apr 2027",
        "low": 11707000,
        "mid": 11868000,
        "high": 12040500
      },
      {
        "month": "May 2027",
        "low": 11764500,
        "mid": 11960000,
        "high": 12167000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 102900,
        "expenses": 15525,
        "netDistributed": 87375,
        "payoutPerShare": 0.874
      },
      {
        "month": "Jul 2026",
        "grossCollected": 103300,
        "expenses": 15525,
        "netDistributed": 87775,
        "payoutPerShare": 0.878
      },
      {
        "month": "Aug 2026",
        "grossCollected": 103500,
        "expenses": 15525,
        "netDistributed": 87975,
        "payoutPerShare": 1.035
      },
      {
        "month": "Sep 2026",
        "grossCollected": 103500,
        "expenses": 15525,
        "netDistributed": 87975,
        "payoutPerShare": 1.035
      },
      {
        "month": "Oct 2026",
        "grossCollected": 103500,
        "expenses": 15525,
        "netDistributed": 87975,
        "payoutPerShare": 1.035
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ae-dxb-business-bay-office-01",
        "category": "Legal & Title",
        "title": "United Arab Emirates Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Dubai Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ae-dxb-business-bay-office-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ae-dxb-business-bay-office-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ae-dxb-business-bay-office-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 69000,
      "insuranceAnnual": 34500,
      "maintenanceAnnual": 57500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 23000
    },
    "assignedManager": {
      "id": "mgr-prop-ae-dxb-business-bay-office",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 71,
      "occupiedUnits": 68,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AE-1014",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ae-shj-mamzar-retail",
    "slug": "al-mamzar-waterfront-promenade",
    "title": "Mamzar Waterfront Retail Promenade",
    "headline": "Vibrant family retail and culinary lifestyle center along the Sharjah-Dubai border",
    "description": "High-footfall community retail destination with anchor grocery superstores, artisanal cafes, and medical clinics serving densely populated family communities.",
    "city": "Sharjah",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "address": "Corniche Street, Al Mamzar, Sharjah",
    "category": "retail",
    "developer": "Alef Group",
    "yearBuilt": 2022,
    "totalAreaSqFt": 54000,
    "totalValuation": 5200000,
    "sharePrice": 65,
    "netYield": 9.3,
    "grossYield": 11,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 80000,
    "availableShares": 9280,
    "fundedPercentage": 88.4,
    "estimatedMonthlyRent": 47667,
    "monthlyPerShareRent": 0.596,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5116800,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 92,
      "propertyCondition": 99,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4836000,
        "sharePrice": 60.5
      },
      {
        "date": "2026-02",
        "value": 4940000,
        "sharePrice": 61.8
      },
      {
        "date": "2026-05",
        "value": 5044000,
        "sharePrice": 63
      },
      {
        "date": "2026-08",
        "value": 5148000,
        "sharePrice": 64.3
      },
      {
        "date": "2026-11",
        "value": 5200000,
        "sharePrice": 65
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5210400,
        "mid": 5231200,
        "high": 5257200
      },
      {
        "month": "Jan 2027",
        "low": 5226000,
        "mid": 5262400,
        "high": 5298800
      },
      {
        "month": "Feb 2027",
        "low": 5246800,
        "mid": 5293600,
        "high": 5345600
      },
      {
        "month": "Mar 2027",
        "low": 5267600,
        "mid": 5330000,
        "high": 5392400
      },
      {
        "month": "Apr 2027",
        "low": 5293600,
        "mid": 5366400,
        "high": 5444400
      },
      {
        "month": "May 2027",
        "low": 5319600,
        "mid": 5408000,
        "high": 5501600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 47067,
        "expenses": 7150,
        "netDistributed": 39917,
        "payoutPerShare": 0.499
      },
      {
        "month": "Jul 2026",
        "grossCollected": 47467,
        "expenses": 7150,
        "netDistributed": 40317,
        "payoutPerShare": 0.504
      },
      {
        "month": "Aug 2026",
        "grossCollected": 47667,
        "expenses": 7150,
        "netDistributed": 40517,
        "payoutPerShare": 0.596
      },
      {
        "month": "Sep 2026",
        "grossCollected": 47667,
        "expenses": 7150,
        "netDistributed": 40517,
        "payoutPerShare": 0.596
      },
      {
        "month": "Oct 2026",
        "grossCollected": 47667,
        "expenses": 7150,
        "netDistributed": 40517,
        "payoutPerShare": 0.596
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ae-shj-mamzar-retail-01",
        "category": "Legal & Title",
        "title": "United Arab Emirates Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Sharjah Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ae-shj-mamzar-retail-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ae-shj-mamzar-retail-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ae-shj-mamzar-retail-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 31200,
      "insuranceAnnual": 15600,
      "maintenanceAnnual": 26000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 10400
    },
    "assignedManager": {
      "id": "mgr-prop-ae-shj-mamzar-retail",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 45,
      "occupiedUnits": 44,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AE-1015",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ae-rak-marjan-resort",
    "slug": "marjan-island-hospitality-suites",
    "title": "Marjan Island Coastal Resort",
    "headline": "Luxury island resort apartments benefiting from booming Ras Al Khaimah tourism expansion",
    "description": "Boutique hospitality serviced apartments on Al Marjan Island, benefiting from high international tourist occupancy and burgeoning resort tourism.",
    "city": "Ras Al Khaimah",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "address": "Marjan Boulevard, Al Marjan Island, RAK",
    "category": "hospitality",
    "developer": "Marjan RAK Properties",
    "yearBuilt": 2023,
    "totalAreaSqFt": 61000,
    "totalValuation": 6800000,
    "sharePrice": 85,
    "netYield": 9.5,
    "grossYield": 11.3,
    "occupancyRate": 94,
    "coverImage": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 80000,
    "availableShares": 3680,
    "fundedPercentage": 95.4,
    "estimatedMonthlyRent": 64033,
    "monthlyPerShareRent": 0.8,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6745600,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 93,
      "propertyCondition": 92,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6324000,
        "sharePrice": 79
      },
      {
        "date": "2026-02",
        "value": 6460000,
        "sharePrice": 80.8
      },
      {
        "date": "2026-05",
        "value": 6596000,
        "sharePrice": 82.5
      },
      {
        "date": "2026-08",
        "value": 6732000,
        "sharePrice": 84.2
      },
      {
        "date": "2026-11",
        "value": 6800000,
        "sharePrice": 85
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6813600,
        "mid": 6840800,
        "high": 6874800
      },
      {
        "month": "Jan 2027",
        "low": 6834000,
        "mid": 6881600,
        "high": 6929200
      },
      {
        "month": "Feb 2027",
        "low": 6861200,
        "mid": 6922400,
        "high": 6990400
      },
      {
        "month": "Mar 2027",
        "low": 6888400,
        "mid": 6970000,
        "high": 7051600
      },
      {
        "month": "Apr 2027",
        "low": 6922400,
        "mid": 7017600,
        "high": 7119600
      },
      {
        "month": "May 2027",
        "low": 6956400,
        "mid": 7072000,
        "high": 7194400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 63433,
        "expenses": 9605,
        "netDistributed": 53828,
        "payoutPerShare": 0.673
      },
      {
        "month": "Jul 2026",
        "grossCollected": 63833,
        "expenses": 9605,
        "netDistributed": 54228,
        "payoutPerShare": 0.678
      },
      {
        "month": "Aug 2026",
        "grossCollected": 64033,
        "expenses": 9605,
        "netDistributed": 54428,
        "payoutPerShare": 0.8
      },
      {
        "month": "Sep 2026",
        "grossCollected": 64033,
        "expenses": 9605,
        "netDistributed": 54428,
        "payoutPerShare": 0.8
      },
      {
        "month": "Oct 2026",
        "grossCollected": 64033,
        "expenses": 9605,
        "netDistributed": 54428,
        "payoutPerShare": 0.8
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ae-rak-marjan-resort-01",
        "category": "Legal & Title",
        "title": "United Arab Emirates Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Ras Al Khaimah Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ae-rak-marjan-resort-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ae-rak-marjan-resort-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ae-rak-marjan-resort-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 40800,
      "insuranceAnnual": 20400,
      "maintenanceAnnual": 34000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 13600
    },
    "assignedManager": {
      "id": "mgr-prop-ae-rak-marjan-resort",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 51,
      "occupiedUnits": 48,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AE-1016",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sa-ryd-kafd-financial",
    "slug": "kafd-financial-district-tower",
    "title": "KAFD Sovereign Heights",
    "headline": "Smart luxury residences inside King Abdullah Financial District with high institutional demand",
    "description": "Situated in Riyadh's premier financial hub, this Grade-A tower serves international corporate regional headquarters, consultancies, and sovereign wealth entities.",
    "city": "Riyadh",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "address": "Zone 4, King Abdullah Financial District, Riyadh",
    "category": "office",
    "developer": "KAFD Development Company",
    "yearBuilt": 2023,
    "totalAreaSqFt": 92000,
    "totalValuation": 13500000,
    "sharePrice": 125,
    "netYield": 8.8,
    "grossYield": 10.4,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 108000,
    "availableShares": 22248,
    "fundedPercentage": 79.4,
    "estimatedMonthlyRent": 117000,
    "monthlyPerShareRent": 1.083,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 13500000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 94,
      "propertyCondition": 93,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 12555000,
        "sharePrice": 116.3
      },
      {
        "date": "2026-02",
        "value": 12825000,
        "sharePrice": 118.8
      },
      {
        "date": "2026-05",
        "value": 13095000,
        "sharePrice": 121.3
      },
      {
        "date": "2026-08",
        "value": 13365000,
        "sharePrice": 123.8
      },
      {
        "date": "2026-11",
        "value": 13500000,
        "sharePrice": 125
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 13527000,
        "mid": 13581000,
        "high": 13648500
      },
      {
        "month": "Jan 2027",
        "low": 13567500,
        "mid": 13662000,
        "high": 13756500
      },
      {
        "month": "Feb 2027",
        "low": 13621500,
        "mid": 13743000,
        "high": 13878000
      },
      {
        "month": "Mar 2027",
        "low": 13675500,
        "mid": 13837500,
        "high": 13999500
      },
      {
        "month": "Apr 2027",
        "low": 13743000,
        "mid": 13932000,
        "high": 14134500
      },
      {
        "month": "May 2027",
        "low": 13810500,
        "mid": 14040000,
        "high": 14283000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 116400,
        "expenses": 17550,
        "netDistributed": 98850,
        "payoutPerShare": 0.915
      },
      {
        "month": "Jul 2026",
        "grossCollected": 116800,
        "expenses": 17550,
        "netDistributed": 99250,
        "payoutPerShare": 0.919
      },
      {
        "month": "Aug 2026",
        "grossCollected": 117000,
        "expenses": 17550,
        "netDistributed": 99450,
        "payoutPerShare": 1.083
      },
      {
        "month": "Sep 2026",
        "grossCollected": 117000,
        "expenses": 17550,
        "netDistributed": 99450,
        "payoutPerShare": 1.083
      },
      {
        "month": "Oct 2026",
        "grossCollected": 117000,
        "expenses": 17550,
        "netDistributed": 99450,
        "payoutPerShare": 1.083
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sa-ryd-kafd-financial-01",
        "category": "Legal & Title",
        "title": "Saudi Arabia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Riyadh Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sa-ryd-kafd-financial-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sa-ryd-kafd-financial-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sa-ryd-kafd-financial-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 81000,
      "insuranceAnnual": 40500,
      "maintenanceAnnual": 67500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 27000
    },
    "assignedManager": {
      "id": "mgr-prop-sa-ryd-kafd-financial",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 77,
      "occupiedUnits": 75,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SA-1017",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sa-ryd-olaya-apartments",
    "slug": "al-olaya-metropolitan-suites",
    "title": "Al Olaya Metropolitan Suites",
    "headline": "Contemporary urban residences along Riyadh's bustling Olaya commercial boulevard",
    "description": "Prime residential apartments with dedicated underground parking, rooftop leisure club, and walking access to the Riyadh Metro central intersection.",
    "city": "Riyadh",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "address": "Al Olaya Street, Riyadh",
    "category": "residential",
    "developer": "Dar Al Arkan Real Estate",
    "yearBuilt": 2022,
    "totalAreaSqFt": 58000,
    "totalValuation": 6200000,
    "sharePrice": 75,
    "netYield": 9,
    "grossYield": 10.7,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 82667,
    "availableShares": 11243,
    "fundedPercentage": 86.4,
    "estimatedMonthlyRent": 55283,
    "monthlyPerShareRent": 0.669,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6249600,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 95,
      "propertyCondition": 94,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5766000,
        "sharePrice": 69.8
      },
      {
        "date": "2026-02",
        "value": 5890000,
        "sharePrice": 71.3
      },
      {
        "date": "2026-05",
        "value": 6014000,
        "sharePrice": 72.8
      },
      {
        "date": "2026-08",
        "value": 6138000,
        "sharePrice": 74.3
      },
      {
        "date": "2026-11",
        "value": 6200000,
        "sharePrice": 75
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6212400,
        "mid": 6237200,
        "high": 6268200
      },
      {
        "month": "Jan 2027",
        "low": 6231000,
        "mid": 6274400,
        "high": 6317800
      },
      {
        "month": "Feb 2027",
        "low": 6255800,
        "mid": 6311600,
        "high": 6373600
      },
      {
        "month": "Mar 2027",
        "low": 6280600,
        "mid": 6355000,
        "high": 6429400
      },
      {
        "month": "Apr 2027",
        "low": 6311600,
        "mid": 6398400,
        "high": 6491400
      },
      {
        "month": "May 2027",
        "low": 6342600,
        "mid": 6448000,
        "high": 6559600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 54683,
        "expenses": 8292,
        "netDistributed": 46391,
        "payoutPerShare": 0.561
      },
      {
        "month": "Jul 2026",
        "grossCollected": 55083,
        "expenses": 8292,
        "netDistributed": 46791,
        "payoutPerShare": 0.566
      },
      {
        "month": "Aug 2026",
        "grossCollected": 55283,
        "expenses": 8292,
        "netDistributed": 46991,
        "payoutPerShare": 0.669
      },
      {
        "month": "Sep 2026",
        "grossCollected": 55283,
        "expenses": 8292,
        "netDistributed": 46991,
        "payoutPerShare": 0.669
      },
      {
        "month": "Oct 2026",
        "grossCollected": 55283,
        "expenses": 8292,
        "netDistributed": 46991,
        "payoutPerShare": 0.669
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sa-ryd-olaya-apartments-01",
        "category": "Legal & Title",
        "title": "Saudi Arabia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Riyadh Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sa-ryd-olaya-apartments-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sa-ryd-olaya-apartments-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sa-ryd-olaya-apartments-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 37200,
      "insuranceAnnual": 18600,
      "maintenanceAnnual": 31000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12400
    },
    "assignedManager": {
      "id": "mgr-prop-sa-ryd-olaya-apartments",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 48,
      "occupiedUnits": 46,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SA-1018",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sa-jed-corniche-waterfront",
    "slug": "jeddah-corniche-pearl-tower",
    "title": "Red Sea Pearl Corniche Tower",
    "headline": "Waterfront luxury apartments offering sweeping Red Sea vistas and marina berths",
    "description": "An iconic residential building along Jeddah's Northern Corniche with resort amenities, infinity pool, and concierge service.",
    "city": "Jeddah",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "address": "North Corniche Road, Jeddah",
    "category": "waterfront",
    "developer": "Red Sea Gateway Properties",
    "yearBuilt": 2022,
    "totalAreaSqFt": 71000,
    "totalValuation": 8200000,
    "sharePrice": 90,
    "netYield": 8.6,
    "grossYield": 10.1,
    "occupancyRate": 95,
    "coverImage": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 91111,
    "availableShares": 6013,
    "fundedPercentage": 93.4,
    "estimatedMonthlyRent": 69017,
    "monthlyPerShareRent": 0.758,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 8331200,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 96,
      "propertyCondition": 95,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 7626000,
        "sharePrice": 83.7
      },
      {
        "date": "2026-02",
        "value": 7790000,
        "sharePrice": 85.5
      },
      {
        "date": "2026-05",
        "value": 7954000,
        "sharePrice": 87.3
      },
      {
        "date": "2026-08",
        "value": 8118000,
        "sharePrice": 89.1
      },
      {
        "date": "2026-11",
        "value": 8200000,
        "sharePrice": 90
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 8216400,
        "mid": 8249200,
        "high": 8290200
      },
      {
        "month": "Jan 2027",
        "low": 8241000,
        "mid": 8298400,
        "high": 8355800
      },
      {
        "month": "Feb 2027",
        "low": 8273800,
        "mid": 8347600,
        "high": 8429600
      },
      {
        "month": "Mar 2027",
        "low": 8306600,
        "mid": 8405000,
        "high": 8503400
      },
      {
        "month": "Apr 2027",
        "low": 8347600,
        "mid": 8462400,
        "high": 8585400
      },
      {
        "month": "May 2027",
        "low": 8388600,
        "mid": 8528000,
        "high": 8675600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 68417,
        "expenses": 10353,
        "netDistributed": 58064,
        "payoutPerShare": 0.637
      },
      {
        "month": "Jul 2026",
        "grossCollected": 68817,
        "expenses": 10353,
        "netDistributed": 58464,
        "payoutPerShare": 0.642
      },
      {
        "month": "Aug 2026",
        "grossCollected": 69017,
        "expenses": 10353,
        "netDistributed": 58664,
        "payoutPerShare": 0.758
      },
      {
        "month": "Sep 2026",
        "grossCollected": 69017,
        "expenses": 10353,
        "netDistributed": 58664,
        "payoutPerShare": 0.758
      },
      {
        "month": "Oct 2026",
        "grossCollected": 69017,
        "expenses": 10353,
        "netDistributed": 58664,
        "payoutPerShare": 0.758
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sa-jed-corniche-waterfront-01",
        "category": "Legal & Title",
        "title": "Saudi Arabia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Jeddah Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sa-jed-corniche-waterfront-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sa-jed-corniche-waterfront-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sa-jed-corniche-waterfront-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 49200,
      "insuranceAnnual": 24600,
      "maintenanceAnnual": 41000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 16400
    },
    "assignedManager": {
      "id": "mgr-prop-sa-jed-corniche-waterfront",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 59,
      "occupiedUnits": 56,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SA-1019",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sa-jed-rawdah-villas",
    "slug": "al-rawdah-prestige-villas",
    "title": "Al Rawdah Royal Enclave",
    "headline": "Private compound of 6 luxury executive villas in Jeddah's most prestigious neighborhood",
    "description": "Features private security, private pools, mature palm gardens, and high long-term rental commitments from executive expatriates.",
    "city": "Jeddah",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "address": "Al Rawdah District, Jeddah",
    "category": "villa",
    "developer": "Jeddah Elite Homes",
    "yearBuilt": 2021,
    "totalAreaSqFt": 46000,
    "totalValuation": 7100000,
    "sharePrice": 110,
    "netYield": 8.2,
    "grossYield": 9.7,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 64545,
    "availableShares": 14587,
    "fundedPercentage": 77.4,
    "estimatedMonthlyRent": 57392,
    "monthlyPerShareRent": 0.889,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7270400,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 97,
      "propertyCondition": 96,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6603000,
        "sharePrice": 102.3
      },
      {
        "date": "2026-02",
        "value": 6745000,
        "sharePrice": 104.5
      },
      {
        "date": "2026-05",
        "value": 6887000,
        "sharePrice": 106.7
      },
      {
        "date": "2026-08",
        "value": 7029000,
        "sharePrice": 108.9
      },
      {
        "date": "2026-11",
        "value": 7100000,
        "sharePrice": 110
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7114200,
        "mid": 7142600,
        "high": 7178100
      },
      {
        "month": "Jan 2027",
        "low": 7135500,
        "mid": 7185200,
        "high": 7234900
      },
      {
        "month": "Feb 2027",
        "low": 7163900,
        "mid": 7227800,
        "high": 7298800
      },
      {
        "month": "Mar 2027",
        "low": 7192300,
        "mid": 7277500,
        "high": 7362700
      },
      {
        "month": "Apr 2027",
        "low": 7227800,
        "mid": 7327200,
        "high": 7433700
      },
      {
        "month": "May 2027",
        "low": 7263300,
        "mid": 7384000,
        "high": 7511800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 56792,
        "expenses": 8609,
        "netDistributed": 48183,
        "payoutPerShare": 0.747
      },
      {
        "month": "Jul 2026",
        "grossCollected": 57192,
        "expenses": 8609,
        "netDistributed": 48583,
        "payoutPerShare": 0.753
      },
      {
        "month": "Aug 2026",
        "grossCollected": 57392,
        "expenses": 8609,
        "netDistributed": 48783,
        "payoutPerShare": 0.889
      },
      {
        "month": "Sep 2026",
        "grossCollected": 57392,
        "expenses": 8609,
        "netDistributed": 48783,
        "payoutPerShare": 0.889
      },
      {
        "month": "Oct 2026",
        "grossCollected": 57392,
        "expenses": 8609,
        "netDistributed": 48783,
        "payoutPerShare": 0.889
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sa-jed-rawdah-villas-01",
        "category": "Legal & Title",
        "title": "Saudi Arabia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Jeddah Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sa-jed-rawdah-villas-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sa-jed-rawdah-villas-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sa-jed-rawdah-villas-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 42600,
      "insuranceAnnual": 21300,
      "maintenanceAnnual": 35500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 14200
    },
    "assignedManager": {
      "id": "mgr-prop-sa-jed-rawdah-villas",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SA-1020",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sa-dmm-logistics-park",
    "slug": "eastern-province-cargo-logistics",
    "title": "Dammam Maritime Logistics Hub",
    "headline": "High-spec cargo fulfillment hub connected to King Abdulaziz Sea Port & industrial railways",
    "description": "Strategic warehouse complex serving petrochemical, energy, and commercial distribution operators in the Eastern Province.",
    "city": "Dammam",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "address": "King Fahd Port Road, Dammam",
    "category": "logistics",
    "developer": "Eastern Logistics Company",
    "yearBuilt": 2022,
    "totalAreaSqFt": 125000,
    "totalValuation": 6900000,
    "sharePrice": 60,
    "netYield": 9.9,
    "grossYield": 11.8,
    "occupancyRate": 100,
    "coverImage": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 115000,
    "availableShares": 17940,
    "fundedPercentage": 84.4,
    "estimatedMonthlyRent": 67850,
    "monthlyPerShareRent": 0.59,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6734400,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 98,
      "propertyCondition": 97,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6417000,
        "sharePrice": 55.8
      },
      {
        "date": "2026-02",
        "value": 6555000,
        "sharePrice": 57
      },
      {
        "date": "2026-05",
        "value": 6693000,
        "sharePrice": 58.2
      },
      {
        "date": "2026-08",
        "value": 6831000,
        "sharePrice": 59.4
      },
      {
        "date": "2026-11",
        "value": 6900000,
        "sharePrice": 60
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6913800,
        "mid": 6941400,
        "high": 6975900
      },
      {
        "month": "Jan 2027",
        "low": 6934500,
        "mid": 6982800,
        "high": 7031100
      },
      {
        "month": "Feb 2027",
        "low": 6962100,
        "mid": 7024200,
        "high": 7093200
      },
      {
        "month": "Mar 2027",
        "low": 6989700,
        "mid": 7072500,
        "high": 7155300
      },
      {
        "month": "Apr 2027",
        "low": 7024200,
        "mid": 7120800,
        "high": 7224300
      },
      {
        "month": "May 2027",
        "low": 7058700,
        "mid": 7176000,
        "high": 7300200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 67250,
        "expenses": 10178,
        "netDistributed": 57072,
        "payoutPerShare": 0.496
      },
      {
        "month": "Jul 2026",
        "grossCollected": 67650,
        "expenses": 10178,
        "netDistributed": 57472,
        "payoutPerShare": 0.5
      },
      {
        "month": "Aug 2026",
        "grossCollected": 67850,
        "expenses": 10178,
        "netDistributed": 57672,
        "payoutPerShare": 0.59
      },
      {
        "month": "Sep 2026",
        "grossCollected": 67850,
        "expenses": 10178,
        "netDistributed": 57672,
        "payoutPerShare": 0.59
      },
      {
        "month": "Oct 2026",
        "grossCollected": 67850,
        "expenses": 10178,
        "netDistributed": 57672,
        "payoutPerShare": 0.59
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sa-dmm-logistics-park-01",
        "category": "Legal & Title",
        "title": "Saudi Arabia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Dammam Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sa-dmm-logistics-park-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sa-dmm-logistics-park-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sa-dmm-logistics-park-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 41400,
      "insuranceAnnual": 20700,
      "maintenanceAnnual": 34500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 13800
    },
    "assignedManager": {
      "id": "mgr-prop-sa-dmm-logistics-park",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 104,
      "occupiedUnits": 104,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SA-1021",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sa-med-knowledge-city",
    "slug": "knowledge-economic-city-residences",
    "title": "Knowledge City Gateway Suites",
    "headline": "Serviced residential suites connected to Haramain High Speed Railway station in Medina",
    "description": "High-demand residential and pilgrimage accommodation built with sustainable green building specifications.",
    "city": "Medina",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "address": "Knowledge Economic City, Medina",
    "category": "residential",
    "developer": "Knowledge Economic City Co.",
    "yearBuilt": 2023,
    "totalAreaSqFt": 62000,
    "totalValuation": 5400000,
    "sharePrice": 50,
    "netYield": 9.4,
    "grossYield": 11.2,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 108000,
    "availableShares": 9288,
    "fundedPercentage": 91.4,
    "estimatedMonthlyRent": 50400,
    "monthlyPerShareRent": 0.467,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5313600,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 88,
      "propertyCondition": 98,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5022000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 5130000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 5238000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 5346000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 5400000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5410800,
        "mid": 5432400,
        "high": 5459400
      },
      {
        "month": "Jan 2027",
        "low": 5427000,
        "mid": 5464800,
        "high": 5502600
      },
      {
        "month": "Feb 2027",
        "low": 5448600,
        "mid": 5497200,
        "high": 5551200
      },
      {
        "month": "Mar 2027",
        "low": 5470200,
        "mid": 5535000,
        "high": 5599800
      },
      {
        "month": "Apr 2027",
        "low": 5497200,
        "mid": 5572800,
        "high": 5653800
      },
      {
        "month": "May 2027",
        "low": 5524200,
        "mid": 5616000,
        "high": 5713200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 49800,
        "expenses": 7560,
        "netDistributed": 42240,
        "payoutPerShare": 0.391
      },
      {
        "month": "Jul 2026",
        "grossCollected": 50200,
        "expenses": 7560,
        "netDistributed": 42640,
        "payoutPerShare": 0.395
      },
      {
        "month": "Aug 2026",
        "grossCollected": 50400,
        "expenses": 7560,
        "netDistributed": 42840,
        "payoutPerShare": 0.467
      },
      {
        "month": "Sep 2026",
        "grossCollected": 50400,
        "expenses": 7560,
        "netDistributed": 42840,
        "payoutPerShare": 0.467
      },
      {
        "month": "Oct 2026",
        "grossCollected": 50400,
        "expenses": 7560,
        "netDistributed": 42840,
        "payoutPerShare": 0.467
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sa-med-knowledge-city-01",
        "category": "Legal & Title",
        "title": "Saudi Arabia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Medina Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sa-med-knowledge-city-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sa-med-knowledge-city-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sa-med-knowledge-city-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 32400,
      "insuranceAnnual": 16200,
      "maintenanceAnnual": 27000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 10800
    },
    "assignedManager": {
      "id": "mgr-prop-sa-med-knowledge-city",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 52,
      "occupiedUnits": 51,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SA-1022",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sa-khb-golden-belt",
    "slug": "khobar-golden-belt-mixeduse",
    "title": "Khobar Golden Belt Complex",
    "headline": "Mixed-use retail and medical professional suites in Al Khobar's premier residential district",
    "description": "A bustling community commercial asset occupied by specialty medical clinics, boutique stores, and international dining franchises.",
    "city": "Khobar",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "address": "Golden Belt Boulevard, Al Khobar",
    "category": "mixed-use",
    "developer": "Al Oula Real Estate",
    "yearBuilt": 2022,
    "totalAreaSqFt": 49000,
    "totalValuation": 4900000,
    "sharePrice": 70,
    "netYield": 9.2,
    "grossYield": 10.9,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 70000,
    "availableShares": 17220,
    "fundedPercentage": 75.4,
    "estimatedMonthlyRent": 44508,
    "monthlyPerShareRent": 0.636,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4860800,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 89,
      "propertyCondition": 99,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4557000,
        "sharePrice": 65.1
      },
      {
        "date": "2026-02",
        "value": 4655000,
        "sharePrice": 66.5
      },
      {
        "date": "2026-05",
        "value": 4753000,
        "sharePrice": 67.9
      },
      {
        "date": "2026-08",
        "value": 4851000,
        "sharePrice": 69.3
      },
      {
        "date": "2026-11",
        "value": 4900000,
        "sharePrice": 70
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4909800,
        "mid": 4929400,
        "high": 4953900
      },
      {
        "month": "Jan 2027",
        "low": 4924500,
        "mid": 4958800,
        "high": 4993100
      },
      {
        "month": "Feb 2027",
        "low": 4944100,
        "mid": 4988200,
        "high": 5037200
      },
      {
        "month": "Mar 2027",
        "low": 4963700,
        "mid": 5022500,
        "high": 5081300
      },
      {
        "month": "Apr 2027",
        "low": 4988200,
        "mid": 5056800,
        "high": 5130300
      },
      {
        "month": "May 2027",
        "low": 5012700,
        "mid": 5096000,
        "high": 5184200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 43908,
        "expenses": 6676,
        "netDistributed": 37232,
        "payoutPerShare": 0.532
      },
      {
        "month": "Jul 2026",
        "grossCollected": 44308,
        "expenses": 6676,
        "netDistributed": 37632,
        "payoutPerShare": 0.538
      },
      {
        "month": "Aug 2026",
        "grossCollected": 44508,
        "expenses": 6676,
        "netDistributed": 37832,
        "payoutPerShare": 0.636
      },
      {
        "month": "Sep 2026",
        "grossCollected": 44508,
        "expenses": 6676,
        "netDistributed": 37832,
        "payoutPerShare": 0.636
      },
      {
        "month": "Oct 2026",
        "grossCollected": 44508,
        "expenses": 6676,
        "netDistributed": 37832,
        "payoutPerShare": 0.636
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sa-khb-golden-belt-01",
        "category": "Legal & Title",
        "title": "Saudi Arabia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Khobar Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sa-khb-golden-belt-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sa-khb-golden-belt-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sa-khb-golden-belt-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 29400,
      "insuranceAnnual": 14700,
      "maintenanceAnnual": 24500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9800
    },
    "assignedManager": {
      "id": "mgr-prop-sa-khb-golden-belt",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 41,
      "occupiedUnits": 39,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SA-1023",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-qa-doh-pearl-residences",
    "slug": "the-pearl-porto-arabia-towers",
    "title": "Porto Arabia Marina Vista",
    "headline": "Mediterranean-style luxury waterfront apartments on The Pearl-Qatar with private yacht berths",
    "description": "High-net-worth tenant base, seaside cafes, and strong rental yields under Qatar's freehold investment regulations.",
    "city": "Doha",
    "country": "Qatar",
    "countryCode": "QA",
    "address": "Porto Arabia Boardwalk, The Pearl, Doha",
    "category": "waterfront",
    "developer": "United Development Company (UDC)",
    "yearBuilt": 2021,
    "totalAreaSqFt": 82000,
    "totalValuation": 9400000,
    "sharePrice": 100,
    "netYield": 8.3,
    "grossYield": 9.8,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 94000,
    "availableShares": 16544,
    "fundedPercentage": 82.4,
    "estimatedMonthlyRent": 76767,
    "monthlyPerShareRent": 0.817,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 9400000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 90,
      "propertyCondition": 92,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 8742000,
        "sharePrice": 93
      },
      {
        "date": "2026-02",
        "value": 8930000,
        "sharePrice": 95
      },
      {
        "date": "2026-05",
        "value": 9118000,
        "sharePrice": 97
      },
      {
        "date": "2026-08",
        "value": 9306000,
        "sharePrice": 99
      },
      {
        "date": "2026-11",
        "value": 9400000,
        "sharePrice": 100
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 9418800,
        "mid": 9456400,
        "high": 9503400
      },
      {
        "month": "Jan 2027",
        "low": 9447000,
        "mid": 9512800,
        "high": 9578600
      },
      {
        "month": "Feb 2027",
        "low": 9484600,
        "mid": 9569200,
        "high": 9663200
      },
      {
        "month": "Mar 2027",
        "low": 9522200,
        "mid": 9635000,
        "high": 9747800
      },
      {
        "month": "Apr 2027",
        "low": 9569200,
        "mid": 9700800,
        "high": 9841800
      },
      {
        "month": "May 2027",
        "low": 9616200,
        "mid": 9776000,
        "high": 9945200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 76167,
        "expenses": 11515,
        "netDistributed": 64652,
        "payoutPerShare": 0.688
      },
      {
        "month": "Jul 2026",
        "grossCollected": 76567,
        "expenses": 11515,
        "netDistributed": 65052,
        "payoutPerShare": 0.692
      },
      {
        "month": "Aug 2026",
        "grossCollected": 76767,
        "expenses": 11515,
        "netDistributed": 65252,
        "payoutPerShare": 0.817
      },
      {
        "month": "Sep 2026",
        "grossCollected": 76767,
        "expenses": 11515,
        "netDistributed": 65252,
        "payoutPerShare": 0.817
      },
      {
        "month": "Oct 2026",
        "grossCollected": 76767,
        "expenses": 11515,
        "netDistributed": 65252,
        "payoutPerShare": 0.817
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-qa-doh-pearl-residences-01",
        "category": "Legal & Title",
        "title": "Qatar Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Doha Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-qa-doh-pearl-residences-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-qa-doh-pearl-residences-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-qa-doh-pearl-residences-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 56400,
      "insuranceAnnual": 28200,
      "maintenanceAnnual": 47000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 18800
    },
    "assignedManager": {
      "id": "mgr-prop-qa-doh-pearl-residences",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 68,
      "occupiedUnits": 66,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-QA-1024",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-qa-doh-west-bay-office",
    "slug": "west-bay-diplomatic-offices",
    "title": "West Bay Commercial Pinnacle",
    "headline": "Grade-A corporate high-rise tower in Doha's premier financial and embassy district",
    "description": "Fully occupied by multinational energy advisors, legal partnerships, and sovereign wealth entities with long-term commercial leases.",
    "city": "Doha",
    "country": "Qatar",
    "countryCode": "QA",
    "address": "Diplomatic Area, West Bay, Doha",
    "category": "office",
    "developer": "Qatari Diar",
    "yearBuilt": 2022,
    "totalAreaSqFt": 96000,
    "totalValuation": 12200000,
    "sharePrice": 120,
    "netYield": 8.6,
    "grossYield": 10.2,
    "occupancyRate": 95,
    "coverImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 101667,
    "availableShares": 10777,
    "fundedPercentage": 89.4,
    "estimatedMonthlyRent": 103700,
    "monthlyPerShareRent": 1.02,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 12297600,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 91,
      "propertyCondition": 93,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 11346000,
        "sharePrice": 111.6
      },
      {
        "date": "2026-02",
        "value": 11590000,
        "sharePrice": 114
      },
      {
        "date": "2026-05",
        "value": 11834000,
        "sharePrice": 116.4
      },
      {
        "date": "2026-08",
        "value": 12078000,
        "sharePrice": 118.8
      },
      {
        "date": "2026-11",
        "value": 12200000,
        "sharePrice": 120
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 12224400,
        "mid": 12273200,
        "high": 12334200
      },
      {
        "month": "Jan 2027",
        "low": 12261000,
        "mid": 12346400,
        "high": 12431800
      },
      {
        "month": "Feb 2027",
        "low": 12309800,
        "mid": 12419600,
        "high": 12541600
      },
      {
        "month": "Mar 2027",
        "low": 12358600,
        "mid": 12505000,
        "high": 12651400
      },
      {
        "month": "Apr 2027",
        "low": 12419600,
        "mid": 12590400,
        "high": 12773400
      },
      {
        "month": "May 2027",
        "low": 12480600,
        "mid": 12688000,
        "high": 12907600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 103100,
        "expenses": 15555,
        "netDistributed": 87545,
        "payoutPerShare": 0.861
      },
      {
        "month": "Jul 2026",
        "grossCollected": 103500,
        "expenses": 15555,
        "netDistributed": 87945,
        "payoutPerShare": 0.865
      },
      {
        "month": "Aug 2026",
        "grossCollected": 103700,
        "expenses": 15555,
        "netDistributed": 88145,
        "payoutPerShare": 1.02
      },
      {
        "month": "Sep 2026",
        "grossCollected": 103700,
        "expenses": 15555,
        "netDistributed": 88145,
        "payoutPerShare": 1.02
      },
      {
        "month": "Oct 2026",
        "grossCollected": 103700,
        "expenses": 15555,
        "netDistributed": 88145,
        "payoutPerShare": 1.02
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-qa-doh-west-bay-office-01",
        "category": "Legal & Title",
        "title": "Qatar Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Doha Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-qa-doh-west-bay-office-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-qa-doh-west-bay-office-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-qa-doh-west-bay-office-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 73200,
      "insuranceAnnual": 36600,
      "maintenanceAnnual": 61000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 24400
    },
    "assignedManager": {
      "id": "mgr-prop-qa-doh-west-bay-office",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 80,
      "occupiedUnits": 76,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-QA-1025",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-qa-lus-marina-promenade",
    "slug": "lusail-marina-smart-apartments",
    "title": "Lusail Marina Smart Residences",
    "headline": "Futuristic sustainable apartments in Qatar's flagship green city with light rail transit",
    "description": "Integrated with Lusail's district cooling and automated smart waste collection networks, offering low operational expenses.",
    "city": "Lusail",
    "country": "Qatar",
    "countryCode": "QA",
    "address": "Marina Promenade, Lusail Smart City",
    "category": "residential",
    "developer": "Lusail Real Estate Development",
    "yearBuilt": 2023,
    "totalAreaSqFt": 64000,
    "totalValuation": 7100000,
    "sharePrice": 75,
    "netYield": 8.7,
    "grossYield": 10.3,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 94667,
    "availableShares": 3408,
    "fundedPercentage": 96.4,
    "estimatedMonthlyRent": 60942,
    "monthlyPerShareRent": 0.644,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7213600,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 92,
      "propertyCondition": 94,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6603000,
        "sharePrice": 69.8
      },
      {
        "date": "2026-02",
        "value": 6745000,
        "sharePrice": 71.3
      },
      {
        "date": "2026-05",
        "value": 6887000,
        "sharePrice": 72.8
      },
      {
        "date": "2026-08",
        "value": 7029000,
        "sharePrice": 74.3
      },
      {
        "date": "2026-11",
        "value": 7100000,
        "sharePrice": 75
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7114200,
        "mid": 7142600,
        "high": 7178100
      },
      {
        "month": "Jan 2027",
        "low": 7135500,
        "mid": 7185200,
        "high": 7234900
      },
      {
        "month": "Feb 2027",
        "low": 7163900,
        "mid": 7227800,
        "high": 7298800
      },
      {
        "month": "Mar 2027",
        "low": 7192300,
        "mid": 7277500,
        "high": 7362700
      },
      {
        "month": "Apr 2027",
        "low": 7227800,
        "mid": 7327200,
        "high": 7433700
      },
      {
        "month": "May 2027",
        "low": 7263300,
        "mid": 7384000,
        "high": 7511800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 60342,
        "expenses": 9141,
        "netDistributed": 51201,
        "payoutPerShare": 0.541
      },
      {
        "month": "Jul 2026",
        "grossCollected": 60742,
        "expenses": 9141,
        "netDistributed": 51601,
        "payoutPerShare": 0.545
      },
      {
        "month": "Aug 2026",
        "grossCollected": 60942,
        "expenses": 9141,
        "netDistributed": 51801,
        "payoutPerShare": 0.644
      },
      {
        "month": "Sep 2026",
        "grossCollected": 60942,
        "expenses": 9141,
        "netDistributed": 51801,
        "payoutPerShare": 0.644
      },
      {
        "month": "Oct 2026",
        "grossCollected": 60942,
        "expenses": 9141,
        "netDistributed": 51801,
        "payoutPerShare": 0.644
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-qa-lus-marina-promenade-01",
        "category": "Legal & Title",
        "title": "Qatar Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Lusail Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-qa-lus-marina-promenade-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-qa-lus-marina-promenade-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-qa-lus-marina-promenade-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 42600,
      "insuranceAnnual": 21300,
      "maintenanceAnnual": 35500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 14200
    },
    "assignedManager": {
      "id": "mgr-prop-qa-lus-marina-promenade",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 53,
      "occupiedUnits": 51,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-QA-1026",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-gb-ldn-canary-wharf",
    "slug": "canary-wharf-waterfront-suites",
    "title": "Canary Wharf Financial Horizon",
    "headline": "Executive residential apartments directly overlooking South Dock in London's financial capital",
    "description": "Steps from the Elizabeth Line and Jubilee Line stations. Stable occupancy from banking, legal, and tech professionals with strong rent rolls in GBP.",
    "city": "London",
    "country": "United Kingdom",
    "countryCode": "GB",
    "address": "South Dock Quay, Canary Wharf, London",
    "category": "residential",
    "developer": "Canary Wharf Group",
    "yearBuilt": 2022,
    "totalAreaSqFt": 58000,
    "totalValuation": 11800000,
    "sharePrice": 120,
    "netYield": 6.8,
    "grossYield": 8.1,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 98333,
    "availableShares": 19273,
    "fundedPercentage": 80.4,
    "estimatedMonthlyRent": 79650,
    "monthlyPerShareRent": 0.81,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 12083200,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 93,
      "propertyCondition": 95,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 10974000,
        "sharePrice": 111.6
      },
      {
        "date": "2026-02",
        "value": 11210000,
        "sharePrice": 114
      },
      {
        "date": "2026-05",
        "value": 11446000,
        "sharePrice": 116.4
      },
      {
        "date": "2026-08",
        "value": 11682000,
        "sharePrice": 118.8
      },
      {
        "date": "2026-11",
        "value": 11800000,
        "sharePrice": 120
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 11823600,
        "mid": 11870800,
        "high": 11929800
      },
      {
        "month": "Jan 2027",
        "low": 11859000,
        "mid": 11941600,
        "high": 12024200
      },
      {
        "month": "Feb 2027",
        "low": 11906200,
        "mid": 12012400,
        "high": 12130400
      },
      {
        "month": "Mar 2027",
        "low": 11953400,
        "mid": 12095000,
        "high": 12236600
      },
      {
        "month": "Apr 2027",
        "low": 12012400,
        "mid": 12177600,
        "high": 12354600
      },
      {
        "month": "May 2027",
        "low": 12071400,
        "mid": 12272000,
        "high": 12484400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 79050,
        "expenses": 11948,
        "netDistributed": 67102,
        "payoutPerShare": 0.682
      },
      {
        "month": "Jul 2026",
        "grossCollected": 79450,
        "expenses": 11948,
        "netDistributed": 67502,
        "payoutPerShare": 0.686
      },
      {
        "month": "Aug 2026",
        "grossCollected": 79650,
        "expenses": 11948,
        "netDistributed": 67702,
        "payoutPerShare": 0.81
      },
      {
        "month": "Sep 2026",
        "grossCollected": 79650,
        "expenses": 11948,
        "netDistributed": 67702,
        "payoutPerShare": 0.81
      },
      {
        "month": "Oct 2026",
        "grossCollected": 79650,
        "expenses": 11948,
        "netDistributed": 67702,
        "payoutPerShare": 0.81
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-gb-ldn-canary-wharf-01",
        "category": "Legal & Title",
        "title": "United Kingdom Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "London Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-gb-ldn-canary-wharf-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-gb-ldn-canary-wharf-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-gb-ldn-canary-wharf-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 70800,
      "insuranceAnnual": 35400,
      "maintenanceAnnual": 59000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 23600
    },
    "assignedManager": {
      "id": "mgr-prop-gb-ldn-canary-wharf",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 48,
      "occupiedUnits": 48,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-GB-1027",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-gb-ldn-shoreditch-tech",
    "slug": "shoreditch-creative-hub-offices",
    "title": "Silicon Roundabout Workspace",
    "headline": "Refurbished industrial brick-and-beam commercial building in London's premier tech cluster",
    "description": "Leased to AI software companies, creative design studios, and venture studios with communal event space and cafe bar.",
    "city": "London",
    "country": "United Kingdom",
    "countryCode": "GB",
    "address": "Old Street, Shoreditch, London",
    "category": "commercial",
    "developer": "Derwent London & StateEra",
    "yearBuilt": 2021,
    "totalAreaSqFt": 46000,
    "totalValuation": 9400000,
    "sharePrice": 100,
    "netYield": 7.2,
    "grossYield": 8.6,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 94000,
    "availableShares": 11844,
    "fundedPercentage": 87.4,
    "estimatedMonthlyRent": 67367,
    "monthlyPerShareRent": 0.717,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 9174400,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 94,
      "propertyCondition": 96,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 8742000,
        "sharePrice": 93
      },
      {
        "date": "2026-02",
        "value": 8930000,
        "sharePrice": 95
      },
      {
        "date": "2026-05",
        "value": 9118000,
        "sharePrice": 97
      },
      {
        "date": "2026-08",
        "value": 9306000,
        "sharePrice": 99
      },
      {
        "date": "2026-11",
        "value": 9400000,
        "sharePrice": 100
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 9418800,
        "mid": 9456400,
        "high": 9503400
      },
      {
        "month": "Jan 2027",
        "low": 9447000,
        "mid": 9512800,
        "high": 9578600
      },
      {
        "month": "Feb 2027",
        "low": 9484600,
        "mid": 9569200,
        "high": 9663200
      },
      {
        "month": "Mar 2027",
        "low": 9522200,
        "mid": 9635000,
        "high": 9747800
      },
      {
        "month": "Apr 2027",
        "low": 9569200,
        "mid": 9700800,
        "high": 9841800
      },
      {
        "month": "May 2027",
        "low": 9616200,
        "mid": 9776000,
        "high": 9945200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 66767,
        "expenses": 10105,
        "netDistributed": 56662,
        "payoutPerShare": 0.603
      },
      {
        "month": "Jul 2026",
        "grossCollected": 67167,
        "expenses": 10105,
        "netDistributed": 57062,
        "payoutPerShare": 0.607
      },
      {
        "month": "Aug 2026",
        "grossCollected": 67367,
        "expenses": 10105,
        "netDistributed": 57262,
        "payoutPerShare": 0.717
      },
      {
        "month": "Sep 2026",
        "grossCollected": 67367,
        "expenses": 10105,
        "netDistributed": 57262,
        "payoutPerShare": 0.717
      },
      {
        "month": "Oct 2026",
        "grossCollected": 67367,
        "expenses": 10105,
        "netDistributed": 57262,
        "payoutPerShare": 0.717
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-gb-ldn-shoreditch-tech-01",
        "category": "Legal & Title",
        "title": "United Kingdom Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "London Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-gb-ldn-shoreditch-tech-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-gb-ldn-shoreditch-tech-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-gb-ldn-shoreditch-tech-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 56400,
      "insuranceAnnual": 28200,
      "maintenanceAnnual": 47000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 18800
    },
    "assignedManager": {
      "id": "mgr-prop-gb-ldn-shoreditch-tech",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-GB-1028",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-gb-man-salford-quays",
    "slug": "mediacity-salford-quays-residences",
    "title": "MediaCity Waterfront Quays",
    "headline": "High-yield residential apartments next to BBC and ITV digital headquarters in Manchester",
    "description": "Manchester's fastest-growing creative hub with tram connectivity directly to Manchester Piccadilly and Victoria stations.",
    "city": "Manchester",
    "country": "United Kingdom",
    "countryCode": "GB",
    "address": "The Quays, Salford, Manchester",
    "category": "waterfront",
    "developer": "Peel L&P",
    "yearBuilt": 2022,
    "totalAreaSqFt": 52000,
    "totalValuation": 5800000,
    "sharePrice": 50,
    "netYield": 8.2,
    "grossYield": 9.8,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 116000,
    "availableShares": 6496,
    "fundedPercentage": 94.4,
    "estimatedMonthlyRent": 47367,
    "monthlyPerShareRent": 0.408,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5707200,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 95,
      "propertyCondition": 97,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5394000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 5510000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 5626000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 5742000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 5800000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5811600,
        "mid": 5834800,
        "high": 5863800
      },
      {
        "month": "Jan 2027",
        "low": 5829000,
        "mid": 5869600,
        "high": 5910200
      },
      {
        "month": "Feb 2027",
        "low": 5852200,
        "mid": 5904400,
        "high": 5962400
      },
      {
        "month": "Mar 2027",
        "low": 5875400,
        "mid": 5945000,
        "high": 6014600
      },
      {
        "month": "Apr 2027",
        "low": 5904400,
        "mid": 5985600,
        "high": 6072600
      },
      {
        "month": "May 2027",
        "low": 5933400,
        "mid": 6032000,
        "high": 6136400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 46767,
        "expenses": 7105,
        "netDistributed": 39662,
        "payoutPerShare": 0.342
      },
      {
        "month": "Jul 2026",
        "grossCollected": 47167,
        "expenses": 7105,
        "netDistributed": 40062,
        "payoutPerShare": 0.345
      },
      {
        "month": "Aug 2026",
        "grossCollected": 47367,
        "expenses": 7105,
        "netDistributed": 40262,
        "payoutPerShare": 0.408
      },
      {
        "month": "Sep 2026",
        "grossCollected": 47367,
        "expenses": 7105,
        "netDistributed": 40262,
        "payoutPerShare": 0.408
      },
      {
        "month": "Oct 2026",
        "grossCollected": 47367,
        "expenses": 7105,
        "netDistributed": 40262,
        "payoutPerShare": 0.408
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-gb-man-salford-quays-01",
        "category": "Legal & Title",
        "title": "United Kingdom Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Manchester Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-gb-man-salford-quays-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-gb-man-salford-quays-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-gb-man-salford-quays-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 34800,
      "insuranceAnnual": 17400,
      "maintenanceAnnual": 29000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11600
    },
    "assignedManager": {
      "id": "mgr-prop-gb-man-salford-quays",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 43,
      "occupiedUnits": 42,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-GB-1029",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-gb-bir-colmore-student",
    "slug": "birmingham-colmore-student-halls",
    "title": "Aston & Colmore Scholar House",
    "headline": "Purpose-built student accommodation serving University of Birmingham and Aston University",
    "description": "Self-contained studio apartments with 100% pre-booked academic year occupancy and professional facilities management.",
    "city": "Birmingham",
    "country": "United Kingdom",
    "countryCode": "GB",
    "address": "Colmore Row District, Birmingham",
    "category": "student",
    "developer": "Vita Student Properties",
    "yearBuilt": 2022,
    "totalAreaSqFt": 44000,
    "totalValuation": 4600000,
    "sharePrice": 40,
    "netYield": 8.9,
    "grossYield": 10.6,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 115000,
    "availableShares": 24840,
    "fundedPercentage": 78.4,
    "estimatedMonthlyRent": 40633,
    "monthlyPerShareRent": 0.353,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4563200,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 96,
      "propertyCondition": 98,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4278000,
        "sharePrice": 37.2
      },
      {
        "date": "2026-02",
        "value": 4370000,
        "sharePrice": 38
      },
      {
        "date": "2026-05",
        "value": 4462000,
        "sharePrice": 38.8
      },
      {
        "date": "2026-08",
        "value": 4554000,
        "sharePrice": 39.6
      },
      {
        "date": "2026-11",
        "value": 4600000,
        "sharePrice": 40
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4609200,
        "mid": 4627600,
        "high": 4650600
      },
      {
        "month": "Jan 2027",
        "low": 4623000,
        "mid": 4655200,
        "high": 4687400
      },
      {
        "month": "Feb 2027",
        "low": 4641400,
        "mid": 4682800,
        "high": 4728800
      },
      {
        "month": "Mar 2027",
        "low": 4659800,
        "mid": 4715000,
        "high": 4770200
      },
      {
        "month": "Apr 2027",
        "low": 4682800,
        "mid": 4747200,
        "high": 4816200
      },
      {
        "month": "May 2027",
        "low": 4705800,
        "mid": 4784000,
        "high": 4866800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 40033,
        "expenses": 6095,
        "netDistributed": 33938,
        "payoutPerShare": 0.295
      },
      {
        "month": "Jul 2026",
        "grossCollected": 40433,
        "expenses": 6095,
        "netDistributed": 34338,
        "payoutPerShare": 0.299
      },
      {
        "month": "Aug 2026",
        "grossCollected": 40633,
        "expenses": 6095,
        "netDistributed": 34538,
        "payoutPerShare": 0.353
      },
      {
        "month": "Sep 2026",
        "grossCollected": 40633,
        "expenses": 6095,
        "netDistributed": 34538,
        "payoutPerShare": 0.353
      },
      {
        "month": "Oct 2026",
        "grossCollected": 40633,
        "expenses": 6095,
        "netDistributed": 34538,
        "payoutPerShare": 0.353
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-gb-bir-colmore-student-01",
        "category": "Legal & Title",
        "title": "United Kingdom Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Birmingham Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-gb-bir-colmore-student-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-gb-bir-colmore-student-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-gb-bir-colmore-student-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 27600,
      "insuranceAnnual": 13800,
      "maintenanceAnnual": 23000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9200
    },
    "assignedManager": {
      "id": "mgr-prop-gb-bir-colmore-student",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 37,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-GB-1030",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-gb-edi-new-town",
    "slug": "edinburgh-new-town-heritage-flats",
    "title": "Georgian Crescent Heritage Flats",
    "headline": "Classic Georgian architecture restored into luxury executive serviced residential units",
    "description": "Located in Edinburgh's UNESCO World Heritage New Town. Steady year-round corporate and festival visitor demand.",
    "city": "Edinburgh",
    "country": "United Kingdom",
    "countryCode": "GB",
    "address": "Great King Street, New Town, Edinburgh",
    "category": "luxury",
    "developer": "Caledonian Heritage Estates",
    "yearBuilt": 2021,
    "totalAreaSqFt": 36000,
    "totalValuation": 4900000,
    "sharePrice": 70,
    "netYield": 7.6,
    "grossYield": 9,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 70000,
    "availableShares": 10220,
    "fundedPercentage": 85.4,
    "estimatedMonthlyRent": 36750,
    "monthlyPerShareRent": 0.525,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4900000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 97,
      "propertyCondition": 99,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4557000,
        "sharePrice": 65.1
      },
      {
        "date": "2026-02",
        "value": 4655000,
        "sharePrice": 66.5
      },
      {
        "date": "2026-05",
        "value": 4753000,
        "sharePrice": 67.9
      },
      {
        "date": "2026-08",
        "value": 4851000,
        "sharePrice": 69.3
      },
      {
        "date": "2026-11",
        "value": 4900000,
        "sharePrice": 70
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4909800,
        "mid": 4929400,
        "high": 4953900
      },
      {
        "month": "Jan 2027",
        "low": 4924500,
        "mid": 4958800,
        "high": 4993100
      },
      {
        "month": "Feb 2027",
        "low": 4944100,
        "mid": 4988200,
        "high": 5037200
      },
      {
        "month": "Mar 2027",
        "low": 4963700,
        "mid": 5022500,
        "high": 5081300
      },
      {
        "month": "Apr 2027",
        "low": 4988200,
        "mid": 5056800,
        "high": 5130300
      },
      {
        "month": "May 2027",
        "low": 5012700,
        "mid": 5096000,
        "high": 5184200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 36150,
        "expenses": 5513,
        "netDistributed": 30637,
        "payoutPerShare": 0.438
      },
      {
        "month": "Jul 2026",
        "grossCollected": 36550,
        "expenses": 5513,
        "netDistributed": 31037,
        "payoutPerShare": 0.443
      },
      {
        "month": "Aug 2026",
        "grossCollected": 36750,
        "expenses": 5513,
        "netDistributed": 31237,
        "payoutPerShare": 0.525
      },
      {
        "month": "Sep 2026",
        "grossCollected": 36750,
        "expenses": 5513,
        "netDistributed": 31237,
        "payoutPerShare": 0.525
      },
      {
        "month": "Oct 2026",
        "grossCollected": 36750,
        "expenses": 5513,
        "netDistributed": 31237,
        "payoutPerShare": 0.525
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-gb-edi-new-town-01",
        "category": "Legal & Title",
        "title": "United Kingdom Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Edinburgh Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-gb-edi-new-town-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-gb-edi-new-town-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-gb-edi-new-town-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 29400,
      "insuranceAnnual": 14700,
      "maintenanceAnnual": 24500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9800
    },
    "assignedManager": {
      "id": "mgr-prop-gb-edi-new-town",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 30,
      "occupiedUnits": 29,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-GB-1031",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-gb-lds-logistics-hub",
    "slug": "leeds-m1-distribution-warehouse",
    "title": "Yorkshire Gateway Logistics Hub",
    "headline": "Modern distribution cross-dock facility situated at the M1 and M62 motorway interchange",
    "description": "Triple-net leased to a top-tier European pharmaceutical and consumer logistics company under a 10-year term.",
    "city": "Leeds",
    "country": "United Kingdom",
    "countryCode": "GB",
    "address": "Wakefield Road Logistics Corridor, Leeds",
    "category": "logistics",
    "developer": "Prologis UK",
    "yearBuilt": 2023,
    "totalAreaSqFt": 140000,
    "totalValuation": 8700000,
    "sharePrice": 85,
    "netYield": 8.5,
    "grossYield": 10.1,
    "occupancyRate": 100,
    "coverImage": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 102353,
    "availableShares": 7779,
    "fundedPercentage": 92.4,
    "estimatedMonthlyRent": 73225,
    "monthlyPerShareRent": 0.715,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 8769600,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 98,
      "propertyCondition": 92,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 8091000,
        "sharePrice": 79
      },
      {
        "date": "2026-02",
        "value": 8265000,
        "sharePrice": 80.8
      },
      {
        "date": "2026-05",
        "value": 8439000,
        "sharePrice": 82.5
      },
      {
        "date": "2026-08",
        "value": 8613000,
        "sharePrice": 84.2
      },
      {
        "date": "2026-11",
        "value": 8700000,
        "sharePrice": 85
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 8717400,
        "mid": 8752200,
        "high": 8795700
      },
      {
        "month": "Jan 2027",
        "low": 8743500,
        "mid": 8804400,
        "high": 8865300
      },
      {
        "month": "Feb 2027",
        "low": 8778300,
        "mid": 8856600,
        "high": 8943600
      },
      {
        "month": "Mar 2027",
        "low": 8813100,
        "mid": 8917500,
        "high": 9021900
      },
      {
        "month": "Apr 2027",
        "low": 8856600,
        "mid": 8978400,
        "high": 9108900
      },
      {
        "month": "May 2027",
        "low": 8900100,
        "mid": 9048000,
        "high": 9204600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 72625,
        "expenses": 10984,
        "netDistributed": 61641,
        "payoutPerShare": 0.602
      },
      {
        "month": "Jul 2026",
        "grossCollected": 73025,
        "expenses": 10984,
        "netDistributed": 62041,
        "payoutPerShare": 0.606
      },
      {
        "month": "Aug 2026",
        "grossCollected": 73225,
        "expenses": 10984,
        "netDistributed": 62241,
        "payoutPerShare": 0.715
      },
      {
        "month": "Sep 2026",
        "grossCollected": 73225,
        "expenses": 10984,
        "netDistributed": 62241,
        "payoutPerShare": 0.715
      },
      {
        "month": "Oct 2026",
        "grossCollected": 73225,
        "expenses": 10984,
        "netDistributed": 62241,
        "payoutPerShare": 0.715
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-gb-lds-logistics-hub-01",
        "category": "Legal & Title",
        "title": "United Kingdom Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Leeds Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-gb-lds-logistics-hub-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-gb-lds-logistics-hub-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-gb-lds-logistics-hub-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 52200,
      "insuranceAnnual": 26100,
      "maintenanceAnnual": 43500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 17400
    },
    "assignedManager": {
      "id": "mgr-prop-gb-lds-logistics-hub",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 117,
      "occupiedUnits": 117,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-GB-1032",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-nyc-dumbo-loft",
    "slug": "dumbo-brooklyn-waterfront-lofts",
    "title": "DUMBO Waterfront Clocktower Lofts",
    "headline": "Iconic brick industrial loft apartments with direct views of Manhattan & Brooklyn Bridges",
    "description": "Top-tier creative class residential asset in Brooklyn's premier enclave. Ultra-low vacancy and world-class retail surroundings.",
    "city": "New York",
    "country": "United States",
    "countryCode": "US",
    "address": "Water Street, DUMBO, Brooklyn, NY",
    "category": "luxury",
    "developer": "Two Trees Management",
    "yearBuilt": 2021,
    "totalAreaSqFt": 55000,
    "totalValuation": 16500000,
    "sharePrice": 150,
    "netYield": 6.9,
    "grossYield": 8.3,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 110000,
    "availableShares": 25960,
    "fundedPercentage": 76.4,
    "estimatedMonthlyRent": 114125,
    "monthlyPerShareRent": 1.038,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 16764000,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 88,
      "propertyCondition": 93,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 15345000,
        "sharePrice": 139.5
      },
      {
        "date": "2026-02",
        "value": 15675000,
        "sharePrice": 142.5
      },
      {
        "date": "2026-05",
        "value": 16005000,
        "sharePrice": 145.5
      },
      {
        "date": "2026-08",
        "value": 16335000,
        "sharePrice": 148.5
      },
      {
        "date": "2026-11",
        "value": 16500000,
        "sharePrice": 150
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 16533000,
        "mid": 16599000,
        "high": 16681500
      },
      {
        "month": "Jan 2027",
        "low": 16582500,
        "mid": 16698000,
        "high": 16813500
      },
      {
        "month": "Feb 2027",
        "low": 16648500,
        "mid": 16797000,
        "high": 16962000
      },
      {
        "month": "Mar 2027",
        "low": 16714500,
        "mid": 16912500,
        "high": 17110500
      },
      {
        "month": "Apr 2027",
        "low": 16797000,
        "mid": 17028000,
        "high": 17275500
      },
      {
        "month": "May 2027",
        "low": 16879500,
        "mid": 17160000,
        "high": 17457000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 113525,
        "expenses": 17119,
        "netDistributed": 96406,
        "payoutPerShare": 0.876
      },
      {
        "month": "Jul 2026",
        "grossCollected": 113925,
        "expenses": 17119,
        "netDistributed": 96806,
        "payoutPerShare": 0.88
      },
      {
        "month": "Aug 2026",
        "grossCollected": 114125,
        "expenses": 17119,
        "netDistributed": 97006,
        "payoutPerShare": 1.038
      },
      {
        "month": "Sep 2026",
        "grossCollected": 114125,
        "expenses": 17119,
        "netDistributed": 97006,
        "payoutPerShare": 1.038
      },
      {
        "month": "Oct 2026",
        "grossCollected": 114125,
        "expenses": 17119,
        "netDistributed": 97006,
        "payoutPerShare": 1.038
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-nyc-dumbo-loft-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "New York Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-nyc-dumbo-loft-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-nyc-dumbo-loft-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-nyc-dumbo-loft-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 99000,
      "insuranceAnnual": 49500,
      "maintenanceAnnual": 82500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 33000
    },
    "assignedManager": {
      "id": "mgr-prop-us-nyc-dumbo-loft",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 46,
      "occupiedUnits": 46,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1033",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-mia-brickell-tower",
    "slug": "brickell-financial-bay-residences",
    "title": "Brickell Bay Luxury Heights",
    "headline": "Glass high-rise in Miami's Wall Street South financial district with Biscayne Bay panoramas",
    "description": "High migration of corporate wealth management firms into Miami fuels unprecedented rental demand for Brickell residential towers.",
    "city": "Miami",
    "country": "United States",
    "countryCode": "US",
    "address": "Brickell Avenue, Miami, FL",
    "category": "waterfront",
    "developer": "Related Group",
    "yearBuilt": 2022,
    "totalAreaSqFt": 84000,
    "totalValuation": 14800000,
    "sharePrice": 125,
    "netYield": 7.8,
    "grossYield": 9.3,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 118400,
    "availableShares": 19654,
    "fundedPercentage": 83.4,
    "estimatedMonthlyRent": 114700,
    "monthlyPerShareRent": 0.969,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 15155200,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 89,
      "propertyCondition": 94,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 13764000,
        "sharePrice": 116.3
      },
      {
        "date": "2026-02",
        "value": 14060000,
        "sharePrice": 118.8
      },
      {
        "date": "2026-05",
        "value": 14356000,
        "sharePrice": 121.3
      },
      {
        "date": "2026-08",
        "value": 14652000,
        "sharePrice": 123.8
      },
      {
        "date": "2026-11",
        "value": 14800000,
        "sharePrice": 125
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 14829600,
        "mid": 14888800,
        "high": 14962800
      },
      {
        "month": "Jan 2027",
        "low": 14874000,
        "mid": 14977600,
        "high": 15081200
      },
      {
        "month": "Feb 2027",
        "low": 14933200,
        "mid": 15066400,
        "high": 15214400
      },
      {
        "month": "Mar 2027",
        "low": 14992400,
        "mid": 15170000,
        "high": 15347600
      },
      {
        "month": "Apr 2027",
        "low": 15066400,
        "mid": 15273600,
        "high": 15495600
      },
      {
        "month": "May 2027",
        "low": 15140400,
        "mid": 15392000,
        "high": 15658400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 114100,
        "expenses": 17205,
        "netDistributed": 96895,
        "payoutPerShare": 0.818
      },
      {
        "month": "Jul 2026",
        "grossCollected": 114500,
        "expenses": 17205,
        "netDistributed": 97295,
        "payoutPerShare": 0.822
      },
      {
        "month": "Aug 2026",
        "grossCollected": 114700,
        "expenses": 17205,
        "netDistributed": 97495,
        "payoutPerShare": 0.969
      },
      {
        "month": "Sep 2026",
        "grossCollected": 114700,
        "expenses": 17205,
        "netDistributed": 97495,
        "payoutPerShare": 0.969
      },
      {
        "month": "Oct 2026",
        "grossCollected": 114700,
        "expenses": 17205,
        "netDistributed": 97495,
        "payoutPerShare": 0.969
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-mia-brickell-tower-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Miami Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-mia-brickell-tower-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-mia-brickell-tower-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-mia-brickell-tower-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 88800,
      "insuranceAnnual": 44400,
      "maintenanceAnnual": 74000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 29600
    },
    "assignedManager": {
      "id": "mgr-prop-us-mia-brickell-tower",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 70,
      "occupiedUnits": 68,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1034",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-atx-silicon-hills",
    "slug": "austin-downtown-tech-studios",
    "title": "Silicon Hills Urban Apartments",
    "headline": "Walk-to-work residences in Downtown Austin serving Apple, Tesla, and Google workforce",
    "description": "Features EV charging bays, co-working rooftop terraces, dog park, and smart building access systems.",
    "city": "Austin",
    "country": "United States",
    "countryCode": "US",
    "address": "Colorado Street, Downtown Austin, TX",
    "category": "residential",
    "developer": "Trammell Crow Residential",
    "yearBuilt": 2022,
    "totalAreaSqFt": 62000,
    "totalValuation": 9200000,
    "sharePrice": 80,
    "netYield": 7.9,
    "grossYield": 9.4,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 115000,
    "availableShares": 11040,
    "fundedPercentage": 90.4,
    "estimatedMonthlyRent": 72067,
    "monthlyPerShareRent": 0.627,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 8979200,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 90,
      "propertyCondition": 95,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 8556000,
        "sharePrice": 74.4
      },
      {
        "date": "2026-02",
        "value": 8740000,
        "sharePrice": 76
      },
      {
        "date": "2026-05",
        "value": 8924000,
        "sharePrice": 77.6
      },
      {
        "date": "2026-08",
        "value": 9108000,
        "sharePrice": 79.2
      },
      {
        "date": "2026-11",
        "value": 9200000,
        "sharePrice": 80
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 9218400,
        "mid": 9255200,
        "high": 9301200
      },
      {
        "month": "Jan 2027",
        "low": 9246000,
        "mid": 9310400,
        "high": 9374800
      },
      {
        "month": "Feb 2027",
        "low": 9282800,
        "mid": 9365600,
        "high": 9457600
      },
      {
        "month": "Mar 2027",
        "low": 9319600,
        "mid": 9430000,
        "high": 9540400
      },
      {
        "month": "Apr 2027",
        "low": 9365600,
        "mid": 9494400,
        "high": 9632400
      },
      {
        "month": "May 2027",
        "low": 9411600,
        "mid": 9568000,
        "high": 9733600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 71467,
        "expenses": 10810,
        "netDistributed": 60657,
        "payoutPerShare": 0.527
      },
      {
        "month": "Jul 2026",
        "grossCollected": 71867,
        "expenses": 10810,
        "netDistributed": 61057,
        "payoutPerShare": 0.531
      },
      {
        "month": "Aug 2026",
        "grossCollected": 72067,
        "expenses": 10810,
        "netDistributed": 61257,
        "payoutPerShare": 0.627
      },
      {
        "month": "Sep 2026",
        "grossCollected": 72067,
        "expenses": 10810,
        "netDistributed": 61257,
        "payoutPerShare": 0.627
      },
      {
        "month": "Oct 2026",
        "grossCollected": 72067,
        "expenses": 10810,
        "netDistributed": 61257,
        "payoutPerShare": 0.627
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-atx-silicon-hills-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Austin Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-atx-silicon-hills-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-atx-silicon-hills-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-atx-silicon-hills-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 55200,
      "insuranceAnnual": 27600,
      "maintenanceAnnual": 46000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 18400
    },
    "assignedManager": {
      "id": "mgr-prop-us-atx-silicon-hills",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 52,
      "occupiedUnits": 50,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1035",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-sea-lake-union",
    "slug": "south-lake-union-cloud-campus",
    "title": "Lake Union Tech Corridor Offices",
    "headline": "LEED Platinum sustainable commercial office building in Seattle's premier cloud computing corridor",
    "description": "100% occupied by cloud software providers under long-term escalation agreements with panoramic lake views.",
    "city": "Seattle",
    "country": "United States",
    "countryCode": "US",
    "address": "Westlake Avenue North, Seattle, WA",
    "category": "office",
    "developer": "Vulcan Real Estate",
    "yearBuilt": 2022,
    "totalAreaSqFt": 98000,
    "totalValuation": 15400000,
    "sharePrice": 140,
    "netYield": 7.4,
    "grossYield": 8.8,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 110000,
    "availableShares": 2860,
    "fundedPercentage": 97.4,
    "estimatedMonthlyRent": 112933,
    "monthlyPerShareRent": 1.027,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 15153600,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 91,
      "propertyCondition": 96,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 14322000,
        "sharePrice": 130.2
      },
      {
        "date": "2026-02",
        "value": 14630000,
        "sharePrice": 133
      },
      {
        "date": "2026-05",
        "value": 14938000,
        "sharePrice": 135.8
      },
      {
        "date": "2026-08",
        "value": 15246000,
        "sharePrice": 138.6
      },
      {
        "date": "2026-11",
        "value": 15400000,
        "sharePrice": 140
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 15430800,
        "mid": 15492400,
        "high": 15569400
      },
      {
        "month": "Jan 2027",
        "low": 15477000,
        "mid": 15584800,
        "high": 15692600
      },
      {
        "month": "Feb 2027",
        "low": 15538600,
        "mid": 15677200,
        "high": 15831200
      },
      {
        "month": "Mar 2027",
        "low": 15600200,
        "mid": 15785000,
        "high": 15969800
      },
      {
        "month": "Apr 2027",
        "low": 15677200,
        "mid": 15892800,
        "high": 16123800
      },
      {
        "month": "May 2027",
        "low": 15754200,
        "mid": 16016000,
        "high": 16293200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 112333,
        "expenses": 16940,
        "netDistributed": 95393,
        "payoutPerShare": 0.867
      },
      {
        "month": "Jul 2026",
        "grossCollected": 112733,
        "expenses": 16940,
        "netDistributed": 95793,
        "payoutPerShare": 0.871
      },
      {
        "month": "Aug 2026",
        "grossCollected": 112933,
        "expenses": 16940,
        "netDistributed": 95993,
        "payoutPerShare": 1.027
      },
      {
        "month": "Sep 2026",
        "grossCollected": 112933,
        "expenses": 16940,
        "netDistributed": 95993,
        "payoutPerShare": 1.027
      },
      {
        "month": "Oct 2026",
        "grossCollected": 112933,
        "expenses": 16940,
        "netDistributed": 95993,
        "payoutPerShare": 1.027
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-sea-lake-union-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Seattle Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-sea-lake-union-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-sea-lake-union-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-sea-lake-union-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 92400,
      "insuranceAnnual": 46200,
      "maintenanceAnnual": 77000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 30800
    },
    "assignedManager": {
      "id": "mgr-prop-us-sea-lake-union",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 82,
      "occupiedUnits": 80,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1036",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-chi-west-loop",
    "slug": "chicago-fulton-market-mixeduse",
    "title": "Fulton Market Food & Tech Center",
    "headline": "Historic meatpacking warehouse converted into Michelin-rated dining and creative workspaces",
    "description": "Chicago's hottest urban submarket with prestigious corporate tenants and award-winning culinary spaces.",
    "city": "Chicago",
    "country": "United States",
    "countryCode": "US",
    "address": "Fulton Market, Chicago, IL",
    "category": "mixed-use",
    "developer": "Sterling Bay",
    "yearBuilt": 2021,
    "totalAreaSqFt": 75000,
    "totalValuation": 11200000,
    "sharePrice": 100,
    "netYield": 8.1,
    "grossYield": 9.6,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 112000,
    "availableShares": 20832,
    "fundedPercentage": 81.4,
    "estimatedMonthlyRent": 89600,
    "monthlyPerShareRent": 0.8,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 11110400,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 92,
      "propertyCondition": 97,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 10416000,
        "sharePrice": 93
      },
      {
        "date": "2026-02",
        "value": 10640000,
        "sharePrice": 95
      },
      {
        "date": "2026-05",
        "value": 10864000,
        "sharePrice": 97
      },
      {
        "date": "2026-08",
        "value": 11088000,
        "sharePrice": 99
      },
      {
        "date": "2026-11",
        "value": 11200000,
        "sharePrice": 100
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 11222400,
        "mid": 11267200,
        "high": 11323200
      },
      {
        "month": "Jan 2027",
        "low": 11256000,
        "mid": 11334400,
        "high": 11412800
      },
      {
        "month": "Feb 2027",
        "low": 11300800,
        "mid": 11401600,
        "high": 11513600
      },
      {
        "month": "Mar 2027",
        "low": 11345600,
        "mid": 11480000,
        "high": 11614400
      },
      {
        "month": "Apr 2027",
        "low": 11401600,
        "mid": 11558400,
        "high": 11726400
      },
      {
        "month": "May 2027",
        "low": 11457600,
        "mid": 11648000,
        "high": 11849600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 89000,
        "expenses": 13440,
        "netDistributed": 75560,
        "payoutPerShare": 0.675
      },
      {
        "month": "Jul 2026",
        "grossCollected": 89400,
        "expenses": 13440,
        "netDistributed": 75960,
        "payoutPerShare": 0.678
      },
      {
        "month": "Aug 2026",
        "grossCollected": 89600,
        "expenses": 13440,
        "netDistributed": 76160,
        "payoutPerShare": 0.8
      },
      {
        "month": "Sep 2026",
        "grossCollected": 89600,
        "expenses": 13440,
        "netDistributed": 76160,
        "payoutPerShare": 0.8
      },
      {
        "month": "Oct 2026",
        "grossCollected": 89600,
        "expenses": 13440,
        "netDistributed": 76160,
        "payoutPerShare": 0.8
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-chi-west-loop-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Chicago Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-chi-west-loop-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-chi-west-loop-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-chi-west-loop-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 67200,
      "insuranceAnnual": 33600,
      "maintenanceAnnual": 56000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 22400
    },
    "assignedManager": {
      "id": "mgr-prop-us-chi-west-loop",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 63,
      "occupiedUnits": 61,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1037",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-la-century-city",
    "slug": "century-city-executive-studios",
    "title": "Century City Entertainment Tower",
    "headline": "Luxury furnished corporate apartments leased to entertainment talent, attorneys, and executives",
    "description": "Minutes from Beverly Hills with private wellness spa, valet, screening room, and 24-hour executive security.",
    "city": "Los Angeles",
    "country": "United States",
    "countryCode": "US",
    "address": "Avenue of the Stars, Los Angeles, CA",
    "category": "luxury",
    "developer": "Century City Properties",
    "yearBuilt": 2021,
    "totalAreaSqFt": 66000,
    "totalValuation": 13800000,
    "sharePrice": 130,
    "netYield": 7.1,
    "grossYield": 8.5,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 106154,
    "availableShares": 12314,
    "fundedPercentage": 88.4,
    "estimatedMonthlyRent": 97750,
    "monthlyPerShareRent": 0.921,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 13800000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 93,
      "propertyCondition": 98,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 12834000,
        "sharePrice": 120.9
      },
      {
        "date": "2026-02",
        "value": 13110000,
        "sharePrice": 123.5
      },
      {
        "date": "2026-05",
        "value": 13386000,
        "sharePrice": 126.1
      },
      {
        "date": "2026-08",
        "value": 13662000,
        "sharePrice": 128.7
      },
      {
        "date": "2026-11",
        "value": 13800000,
        "sharePrice": 130
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 13827600,
        "mid": 13882800,
        "high": 13951800
      },
      {
        "month": "Jan 2027",
        "low": 13869000,
        "mid": 13965600,
        "high": 14062200
      },
      {
        "month": "Feb 2027",
        "low": 13924200,
        "mid": 14048400,
        "high": 14186400
      },
      {
        "month": "Mar 2027",
        "low": 13979400,
        "mid": 14145000,
        "high": 14310600
      },
      {
        "month": "Apr 2027",
        "low": 14048400,
        "mid": 14241600,
        "high": 14448600
      },
      {
        "month": "May 2027",
        "low": 14117400,
        "mid": 14352000,
        "high": 14600400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 97150,
        "expenses": 14663,
        "netDistributed": 82487,
        "payoutPerShare": 0.777
      },
      {
        "month": "Jul 2026",
        "grossCollected": 97550,
        "expenses": 14663,
        "netDistributed": 82887,
        "payoutPerShare": 0.781
      },
      {
        "month": "Aug 2026",
        "grossCollected": 97750,
        "expenses": 14663,
        "netDistributed": 83087,
        "payoutPerShare": 0.921
      },
      {
        "month": "Sep 2026",
        "grossCollected": 97750,
        "expenses": 14663,
        "netDistributed": 83087,
        "payoutPerShare": 0.921
      },
      {
        "month": "Oct 2026",
        "grossCollected": 97750,
        "expenses": 14663,
        "netDistributed": 83087,
        "payoutPerShare": 0.921
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-la-century-city-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Los Angeles Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-la-century-city-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-la-century-city-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-la-century-city-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 82800,
      "insuranceAnnual": 41400,
      "maintenanceAnnual": 69000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 27600
    },
    "assignedManager": {
      "id": "mgr-prop-us-la-century-city",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 55,
      "occupiedUnits": 53,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1038",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-dal-dfw-logistics",
    "slug": "dallas-fort-worth-air-cargo-center",
    "title": "DFW Alliance Logistics Terminal",
    "headline": "Major freight air-cargo distribution center with 36-foot clear ceiling heights and 60 loading docks",
    "description": "Institutional logistics hub serving national retail supply chains near DFW International Airport.",
    "city": "Dallas",
    "country": "United States",
    "countryCode": "US",
    "address": "Alliance Gateway Freeway, Dallas, TX",
    "category": "logistics",
    "developer": "Hillwood Properties",
    "yearBuilt": 2023,
    "totalAreaSqFt": 185000,
    "totalValuation": 12900000,
    "sharePrice": 90,
    "netYield": 8.7,
    "grossYield": 10.3,
    "occupancyRate": 100,
    "coverImage": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 143333,
    "availableShares": 6593,
    "fundedPercentage": 95.4,
    "estimatedMonthlyRent": 110725,
    "monthlyPerShareRent": 0.773,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 13003200,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 94,
      "propertyCondition": 99,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 11997000,
        "sharePrice": 83.7
      },
      {
        "date": "2026-02",
        "value": 12255000,
        "sharePrice": 85.5
      },
      {
        "date": "2026-05",
        "value": 12513000,
        "sharePrice": 87.3
      },
      {
        "date": "2026-08",
        "value": 12771000,
        "sharePrice": 89.1
      },
      {
        "date": "2026-11",
        "value": 12900000,
        "sharePrice": 90
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 12925800,
        "mid": 12977400,
        "high": 13041900
      },
      {
        "month": "Jan 2027",
        "low": 12964500,
        "mid": 13054800,
        "high": 13145100
      },
      {
        "month": "Feb 2027",
        "low": 13016100,
        "mid": 13132200,
        "high": 13261200
      },
      {
        "month": "Mar 2027",
        "low": 13067700,
        "mid": 13222500,
        "high": 13377300
      },
      {
        "month": "Apr 2027",
        "low": 13132200,
        "mid": 13312800,
        "high": 13506300
      },
      {
        "month": "May 2027",
        "low": 13196700,
        "mid": 13416000,
        "high": 13648200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 110125,
        "expenses": 16609,
        "netDistributed": 93516,
        "payoutPerShare": 0.652
      },
      {
        "month": "Jul 2026",
        "grossCollected": 110525,
        "expenses": 16609,
        "netDistributed": 93916,
        "payoutPerShare": 0.655
      },
      {
        "month": "Aug 2026",
        "grossCollected": 110725,
        "expenses": 16609,
        "netDistributed": 94116,
        "payoutPerShare": 0.773
      },
      {
        "month": "Sep 2026",
        "grossCollected": 110725,
        "expenses": 16609,
        "netDistributed": 94116,
        "payoutPerShare": 0.773
      },
      {
        "month": "Oct 2026",
        "grossCollected": 110725,
        "expenses": 16609,
        "netDistributed": 94116,
        "payoutPerShare": 0.773
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-dal-dfw-logistics-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Dallas Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-dal-dfw-logistics-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-dal-dfw-logistics-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-dal-dfw-logistics-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 77400,
      "insuranceAnnual": 38700,
      "maintenanceAnnual": 64500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 25800
    },
    "assignedManager": {
      "id": "mgr-prop-us-dal-dfw-logistics",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 154,
      "occupiedUnits": 154,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1039",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ca-tor-bay-street",
    "slug": "bay-street-financial-condos",
    "title": "Financial District Bay Residences",
    "headline": "Direct underground PATH connection to Toronto's top banking and legal headquarters",
    "description": "Premier downtown location with unmatched commuter access, concierge, and high executive demand.",
    "city": "Toronto",
    "country": "Canada",
    "countryCode": "CA",
    "address": "Bay Street & King Street West, Toronto, ON",
    "category": "residential",
    "developer": "Menkes Developments",
    "yearBuilt": 2022,
    "totalAreaSqFt": 60000,
    "totalValuation": 10800000,
    "sharePrice": 100,
    "netYield": 6.8,
    "grossYield": 8.2,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 108000,
    "availableShares": 22248,
    "fundedPercentage": 79.4,
    "estimatedMonthlyRent": 73800,
    "monthlyPerShareRent": 0.683,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 10972800,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 95,
      "propertyCondition": 92,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 10044000,
        "sharePrice": 93
      },
      {
        "date": "2026-02",
        "value": 10260000,
        "sharePrice": 95
      },
      {
        "date": "2026-05",
        "value": 10476000,
        "sharePrice": 97
      },
      {
        "date": "2026-08",
        "value": 10692000,
        "sharePrice": 99
      },
      {
        "date": "2026-11",
        "value": 10800000,
        "sharePrice": 100
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 10821600,
        "mid": 10864800,
        "high": 10918800
      },
      {
        "month": "Jan 2027",
        "low": 10854000,
        "mid": 10929600,
        "high": 11005200
      },
      {
        "month": "Feb 2027",
        "low": 10897200,
        "mid": 10994400,
        "high": 11102400
      },
      {
        "month": "Mar 2027",
        "low": 10940400,
        "mid": 11070000,
        "high": 11199600
      },
      {
        "month": "Apr 2027",
        "low": 10994400,
        "mid": 11145600,
        "high": 11307600
      },
      {
        "month": "May 2027",
        "low": 11048400,
        "mid": 11232000,
        "high": 11426400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 73200,
        "expenses": 11070,
        "netDistributed": 62130,
        "payoutPerShare": 0.575
      },
      {
        "month": "Jul 2026",
        "grossCollected": 73600,
        "expenses": 11070,
        "netDistributed": 62530,
        "payoutPerShare": 0.579
      },
      {
        "month": "Aug 2026",
        "grossCollected": 73800,
        "expenses": 11070,
        "netDistributed": 62730,
        "payoutPerShare": 0.683
      },
      {
        "month": "Sep 2026",
        "grossCollected": 73800,
        "expenses": 11070,
        "netDistributed": 62730,
        "payoutPerShare": 0.683
      },
      {
        "month": "Oct 2026",
        "grossCollected": 73800,
        "expenses": 11070,
        "netDistributed": 62730,
        "payoutPerShare": 0.683
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ca-tor-bay-street-01",
        "category": "Legal & Title",
        "title": "Canada Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Toronto Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ca-tor-bay-street-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ca-tor-bay-street-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ca-tor-bay-street-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 64800,
      "insuranceAnnual": 32400,
      "maintenanceAnnual": 54000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 21600
    },
    "assignedManager": {
      "id": "mgr-prop-ca-tor-bay-street",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 50,
      "occupiedUnits": 49,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-CA-1040",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ca-van-coal-harbour",
    "slug": "coal-harbour-coastal-penthouses",
    "title": "Coal Harbour Pacific Vista",
    "headline": "Waterfront residences overlooking Stanley Park and the North Shore snow-capped mountains",
    "description": "Vancouver's most coveted waterfront address featuring private marina berths and energy-efficient heat exchange.",
    "city": "Vancouver",
    "country": "Canada",
    "countryCode": "CA",
    "address": "Broughton Street, Coal Harbour, Vancouver, BC",
    "category": "waterfront",
    "developer": "Westbank Corporation",
    "yearBuilt": 2021,
    "totalAreaSqFt": 50000,
    "totalValuation": 12400000,
    "sharePrice": 125,
    "netYield": 6.5,
    "grossYield": 7.9,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 99200,
    "availableShares": 13491,
    "fundedPercentage": 86.4,
    "estimatedMonthlyRent": 81633,
    "monthlyPerShareRent": 0.823,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 12697600,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 96,
      "propertyCondition": 93,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 11532000,
        "sharePrice": 116.3
      },
      {
        "date": "2026-02",
        "value": 11780000,
        "sharePrice": 118.8
      },
      {
        "date": "2026-05",
        "value": 12028000,
        "sharePrice": 121.3
      },
      {
        "date": "2026-08",
        "value": 12276000,
        "sharePrice": 123.8
      },
      {
        "date": "2026-11",
        "value": 12400000,
        "sharePrice": 125
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 12424800,
        "mid": 12474400,
        "high": 12536400
      },
      {
        "month": "Jan 2027",
        "low": 12462000,
        "mid": 12548800,
        "high": 12635600
      },
      {
        "month": "Feb 2027",
        "low": 12511600,
        "mid": 12623200,
        "high": 12747200
      },
      {
        "month": "Mar 2027",
        "low": 12561200,
        "mid": 12710000,
        "high": 12858800
      },
      {
        "month": "Apr 2027",
        "low": 12623200,
        "mid": 12796800,
        "high": 12982800
      },
      {
        "month": "May 2027",
        "low": 12685200,
        "mid": 12896000,
        "high": 13119200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 81033,
        "expenses": 12245,
        "netDistributed": 68788,
        "payoutPerShare": 0.693
      },
      {
        "month": "Jul 2026",
        "grossCollected": 81433,
        "expenses": 12245,
        "netDistributed": 69188,
        "payoutPerShare": 0.697
      },
      {
        "month": "Aug 2026",
        "grossCollected": 81633,
        "expenses": 12245,
        "netDistributed": 69388,
        "payoutPerShare": 0.823
      },
      {
        "month": "Sep 2026",
        "grossCollected": 81633,
        "expenses": 12245,
        "netDistributed": 69388,
        "payoutPerShare": 0.823
      },
      {
        "month": "Oct 2026",
        "grossCollected": 81633,
        "expenses": 12245,
        "netDistributed": 69388,
        "payoutPerShare": 0.823
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ca-van-coal-harbour-01",
        "category": "Legal & Title",
        "title": "Canada Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Vancouver Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ca-van-coal-harbour-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ca-van-coal-harbour-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ca-van-coal-harbour-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 74400,
      "insuranceAnnual": 37200,
      "maintenanceAnnual": 62000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 24800
    },
    "assignedManager": {
      "id": "mgr-prop-ca-van-coal-harbour",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 42,
      "occupiedUnits": 41,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-CA-1041",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ca-mtl-golden-square",
    "slug": "montreal-downtown-heritage-suites",
    "title": "Golden Square Mile Lofts",
    "headline": "Boutique apartments steps from McGill University and Rue Sainte-Catherine retail core",
    "description": "Charming stone facade with ultra-modern smart interiors, popular with international researchers and tech professionals.",
    "city": "Montreal",
    "country": "Canada",
    "countryCode": "CA",
    "address": "Sherbrooke Street West, Montreal, QC",
    "category": "residential",
    "developer": "Devimco Immobilier",
    "yearBuilt": 2022,
    "totalAreaSqFt": 42000,
    "totalValuation": 5600000,
    "sharePrice": 60,
    "netYield": 7.7,
    "grossYield": 9.1,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 93333,
    "availableShares": 6160,
    "fundedPercentage": 93.4,
    "estimatedMonthlyRent": 42467,
    "monthlyPerShareRent": 0.455,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5465600,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 97,
      "propertyCondition": 94,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5208000,
        "sharePrice": 55.8
      },
      {
        "date": "2026-02",
        "value": 5320000,
        "sharePrice": 57
      },
      {
        "date": "2026-05",
        "value": 5432000,
        "sharePrice": 58.2
      },
      {
        "date": "2026-08",
        "value": 5544000,
        "sharePrice": 59.4
      },
      {
        "date": "2026-11",
        "value": 5600000,
        "sharePrice": 60
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5611200,
        "mid": 5633600,
        "high": 5661600
      },
      {
        "month": "Jan 2027",
        "low": 5628000,
        "mid": 5667200,
        "high": 5706400
      },
      {
        "month": "Feb 2027",
        "low": 5650400,
        "mid": 5700800,
        "high": 5756800
      },
      {
        "month": "Mar 2027",
        "low": 5672800,
        "mid": 5740000,
        "high": 5807200
      },
      {
        "month": "Apr 2027",
        "low": 5700800,
        "mid": 5779200,
        "high": 5863200
      },
      {
        "month": "May 2027",
        "low": 5728800,
        "mid": 5824000,
        "high": 5924800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 41867,
        "expenses": 6370,
        "netDistributed": 35497,
        "payoutPerShare": 0.38
      },
      {
        "month": "Jul 2026",
        "grossCollected": 42267,
        "expenses": 6370,
        "netDistributed": 35897,
        "payoutPerShare": 0.385
      },
      {
        "month": "Aug 2026",
        "grossCollected": 42467,
        "expenses": 6370,
        "netDistributed": 36097,
        "payoutPerShare": 0.455
      },
      {
        "month": "Sep 2026",
        "grossCollected": 42467,
        "expenses": 6370,
        "netDistributed": 36097,
        "payoutPerShare": 0.455
      },
      {
        "month": "Oct 2026",
        "grossCollected": 42467,
        "expenses": 6370,
        "netDistributed": 36097,
        "payoutPerShare": 0.455
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ca-mtl-golden-square-01",
        "category": "Legal & Title",
        "title": "Canada Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Montreal Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ca-mtl-golden-square-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ca-mtl-golden-square-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ca-mtl-golden-square-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 33600,
      "insuranceAnnual": 16800,
      "maintenanceAnnual": 28000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11200
    },
    "assignedManager": {
      "id": "mgr-prop-ca-mtl-golden-square",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 35,
      "occupiedUnits": 35,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-CA-1042",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ca-cgy-beltline-affordable",
    "slug": "calgary-beltline-community-apartments",
    "title": "Calgary Beltline Urban Commons",
    "headline": "Transit-oriented affordable housing community with integrated daycare and communal gardens",
    "description": "Award-winning community housing model in Calgary's energetic Beltline district with stable multi-year tenant tenures.",
    "city": "Calgary",
    "country": "Canada",
    "countryCode": "CA",
    "address": "11th Avenue SW, Beltline, Calgary, AB",
    "category": "affordable",
    "developer": "Calgary Community Housing",
    "yearBuilt": 2023,
    "totalAreaSqFt": 48000,
    "totalValuation": 4100000,
    "sharePrice": 40,
    "netYield": 8.4,
    "grossYield": 9.9,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 102500,
    "availableShares": 23165,
    "fundedPercentage": 77.4,
    "estimatedMonthlyRent": 33825,
    "monthlyPerShareRent": 0.33,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4034400,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 98,
      "propertyCondition": 95,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3813000,
        "sharePrice": 37.2
      },
      {
        "date": "2026-02",
        "value": 3895000,
        "sharePrice": 38
      },
      {
        "date": "2026-05",
        "value": 3977000,
        "sharePrice": 38.8
      },
      {
        "date": "2026-08",
        "value": 4059000,
        "sharePrice": 39.6
      },
      {
        "date": "2026-11",
        "value": 4100000,
        "sharePrice": 40
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4108200,
        "mid": 4124600,
        "high": 4145100
      },
      {
        "month": "Jan 2027",
        "low": 4120500,
        "mid": 4149200,
        "high": 4177900
      },
      {
        "month": "Feb 2027",
        "low": 4136900,
        "mid": 4173800,
        "high": 4214800
      },
      {
        "month": "Mar 2027",
        "low": 4153300,
        "mid": 4202500,
        "high": 4251700
      },
      {
        "month": "Apr 2027",
        "low": 4173800,
        "mid": 4231200,
        "high": 4292700
      },
      {
        "month": "May 2027",
        "low": 4194300,
        "mid": 4264000,
        "high": 4337800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 33225,
        "expenses": 5074,
        "netDistributed": 28151,
        "payoutPerShare": 0.275
      },
      {
        "month": "Jul 2026",
        "grossCollected": 33625,
        "expenses": 5074,
        "netDistributed": 28551,
        "payoutPerShare": 0.279
      },
      {
        "month": "Aug 2026",
        "grossCollected": 33825,
        "expenses": 5074,
        "netDistributed": 28751,
        "payoutPerShare": 0.33
      },
      {
        "month": "Sep 2026",
        "grossCollected": 33825,
        "expenses": 5074,
        "netDistributed": 28751,
        "payoutPerShare": 0.33
      },
      {
        "month": "Oct 2026",
        "grossCollected": 33825,
        "expenses": 5074,
        "netDistributed": 28751,
        "payoutPerShare": 0.33
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ca-cgy-beltline-affordable-01",
        "category": "Legal & Title",
        "title": "Canada Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Calgary Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ca-cgy-beltline-affordable-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ca-cgy-beltline-affordable-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ca-cgy-beltline-affordable-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 24600,
      "insuranceAnnual": 12300,
      "maintenanceAnnual": 20500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 8200
    },
    "assignedManager": {
      "id": "mgr-prop-ca-cgy-beltline-affordable",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 40,
      "occupiedUnits": 39,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-CA-1043",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-au-syd-barangaroo",
    "slug": "barangaroo-south-harbour-residences",
    "title": "Barangaroo Harbour Crown",
    "headline": "Prestige harborfront residences in Sydney's newest carbon-neutral waterfront precinct",
    "description": "Unrivaled views of Sydney Harbour, world-class dining, and ferry terminals at your doorstep.",
    "city": "Sydney",
    "country": "Australia",
    "countryCode": "AU",
    "address": "Barangaroo Avenue, Sydney, NSW",
    "category": "waterfront",
    "developer": "Lendlease Australia",
    "yearBuilt": 2022,
    "totalAreaSqFt": 62000,
    "totalValuation": 14500000,
    "sharePrice": 145,
    "netYield": 6.7,
    "grossYield": 8,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 100000,
    "availableShares": 15600,
    "fundedPercentage": 84.4,
    "estimatedMonthlyRent": 96667,
    "monthlyPerShareRent": 0.967,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 14384000,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 88,
      "propertyCondition": 96,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 13485000,
        "sharePrice": 134.8
      },
      {
        "date": "2026-02",
        "value": 13775000,
        "sharePrice": 137.8
      },
      {
        "date": "2026-05",
        "value": 14065000,
        "sharePrice": 140.7
      },
      {
        "date": "2026-08",
        "value": 14355000,
        "sharePrice": 143.6
      },
      {
        "date": "2026-11",
        "value": 14500000,
        "sharePrice": 145
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 14529000,
        "mid": 14587000,
        "high": 14659500
      },
      {
        "month": "Jan 2027",
        "low": 14572500,
        "mid": 14674000,
        "high": 14775500
      },
      {
        "month": "Feb 2027",
        "low": 14630500,
        "mid": 14761000,
        "high": 14906000
      },
      {
        "month": "Mar 2027",
        "low": 14688500,
        "mid": 14862500,
        "high": 15036500
      },
      {
        "month": "Apr 2027",
        "low": 14761000,
        "mid": 14964000,
        "high": 15181500
      },
      {
        "month": "May 2027",
        "low": 14833500,
        "mid": 15080000,
        "high": 15341000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 96067,
        "expenses": 14500,
        "netDistributed": 81567,
        "payoutPerShare": 0.816
      },
      {
        "month": "Jul 2026",
        "grossCollected": 96467,
        "expenses": 14500,
        "netDistributed": 81967,
        "payoutPerShare": 0.82
      },
      {
        "month": "Aug 2026",
        "grossCollected": 96667,
        "expenses": 14500,
        "netDistributed": 82167,
        "payoutPerShare": 0.967
      },
      {
        "month": "Sep 2026",
        "grossCollected": 96667,
        "expenses": 14500,
        "netDistributed": 82167,
        "payoutPerShare": 0.967
      },
      {
        "month": "Oct 2026",
        "grossCollected": 96667,
        "expenses": 14500,
        "netDistributed": 82167,
        "payoutPerShare": 0.967
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-au-syd-barangaroo-01",
        "category": "Legal & Title",
        "title": "Australia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Sydney Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-au-syd-barangaroo-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-au-syd-barangaroo-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-au-syd-barangaroo-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 87000,
      "insuranceAnnual": 43500,
      "maintenanceAnnual": 72500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 29000
    },
    "assignedManager": {
      "id": "mgr-prop-au-syd-barangaroo",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 52,
      "occupiedUnits": 51,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AU-1044",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-au-mel-southbank",
    "slug": "melbourne-southbank-arts-tower",
    "title": "Southbank Arts Promenade Tower",
    "headline": "High-density executive apartments overlooking Yarra River and Melbourne Arts Precinct",
    "description": "Direct walk to Flinders Street Station and Crown Entertainment precinct. Strong rental yield in Australian dollars.",
    "city": "Melbourne",
    "country": "Australia",
    "countryCode": "AU",
    "address": "City Road, Southbank, Melbourne, VIC",
    "category": "residential",
    "developer": "Mirvac Group",
    "yearBuilt": 2022,
    "totalAreaSqFt": 70000,
    "totalValuation": 8900000,
    "sharePrice": 75,
    "netYield": 7.5,
    "grossYield": 8.9,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 118667,
    "availableShares": 10205,
    "fundedPercentage": 91.4,
    "estimatedMonthlyRent": 66008,
    "monthlyPerShareRent": 0.556,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 8900000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 89,
      "propertyCondition": 97,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 8277000,
        "sharePrice": 69.8
      },
      {
        "date": "2026-02",
        "value": 8455000,
        "sharePrice": 71.3
      },
      {
        "date": "2026-05",
        "value": 8633000,
        "sharePrice": 72.8
      },
      {
        "date": "2026-08",
        "value": 8811000,
        "sharePrice": 74.3
      },
      {
        "date": "2026-11",
        "value": 8900000,
        "sharePrice": 75
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 8917800,
        "mid": 8953400,
        "high": 8997900
      },
      {
        "month": "Jan 2027",
        "low": 8944500,
        "mid": 9006800,
        "high": 9069100
      },
      {
        "month": "Feb 2027",
        "low": 8980100,
        "mid": 9060200,
        "high": 9149200
      },
      {
        "month": "Mar 2027",
        "low": 9015700,
        "mid": 9122500,
        "high": 9229300
      },
      {
        "month": "Apr 2027",
        "low": 9060200,
        "mid": 9184800,
        "high": 9318300
      },
      {
        "month": "May 2027",
        "low": 9104700,
        "mid": 9256000,
        "high": 9416200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 65408,
        "expenses": 9901,
        "netDistributed": 55507,
        "payoutPerShare": 0.468
      },
      {
        "month": "Jul 2026",
        "grossCollected": 65808,
        "expenses": 9901,
        "netDistributed": 55907,
        "payoutPerShare": 0.471
      },
      {
        "month": "Aug 2026",
        "grossCollected": 66008,
        "expenses": 9901,
        "netDistributed": 56107,
        "payoutPerShare": 0.556
      },
      {
        "month": "Sep 2026",
        "grossCollected": 66008,
        "expenses": 9901,
        "netDistributed": 56107,
        "payoutPerShare": 0.556
      },
      {
        "month": "Oct 2026",
        "grossCollected": 66008,
        "expenses": 9901,
        "netDistributed": 56107,
        "payoutPerShare": 0.556
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-au-mel-southbank-01",
        "category": "Legal & Title",
        "title": "Australia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Melbourne Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-au-mel-southbank-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-au-mel-southbank-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-au-mel-southbank-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 53400,
      "insuranceAnnual": 26700,
      "maintenanceAnnual": 44500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 17800
    },
    "assignedManager": {
      "id": "mgr-prop-au-mel-southbank",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 58,
      "occupiedUnits": 56,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AU-1045",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-au-bne-howard-wharves",
    "slug": "brisbane-riverfront-hospitality-suites",
    "title": "Howard Smith River Suites",
    "headline": "Boutique hotel residences under Story Bridge benefiting from 2032 Olympic tourism momentum",
    "description": "Thriving riverside dining and entertainment precinct with exceptional short-stay occupancy rates.",
    "city": "Brisbane",
    "country": "Australia",
    "countryCode": "AU",
    "address": "Boundary Street, Howard Smith Wharves, Brisbane, QLD",
    "category": "hospitality",
    "developer": "Howard Smith Properties",
    "yearBuilt": 2023,
    "totalAreaSqFt": 46000,
    "totalValuation": 6400000,
    "sharePrice": 65,
    "netYield": 8.5,
    "grossYield": 10.1,
    "occupancyRate": 95,
    "coverImage": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 98462,
    "availableShares": 24222,
    "fundedPercentage": 75.4,
    "estimatedMonthlyRent": 53867,
    "monthlyPerShareRent": 0.547,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6451200,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 90,
      "propertyCondition": 98,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5952000,
        "sharePrice": 60.5
      },
      {
        "date": "2026-02",
        "value": 6080000,
        "sharePrice": 61.8
      },
      {
        "date": "2026-05",
        "value": 6208000,
        "sharePrice": 63
      },
      {
        "date": "2026-08",
        "value": 6336000,
        "sharePrice": 64.3
      },
      {
        "date": "2026-11",
        "value": 6400000,
        "sharePrice": 65
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6412800,
        "mid": 6438400,
        "high": 6470400
      },
      {
        "month": "Jan 2027",
        "low": 6432000,
        "mid": 6476800,
        "high": 6521600
      },
      {
        "month": "Feb 2027",
        "low": 6457600,
        "mid": 6515200,
        "high": 6579200
      },
      {
        "month": "Mar 2027",
        "low": 6483200,
        "mid": 6560000,
        "high": 6636800
      },
      {
        "month": "Apr 2027",
        "low": 6515200,
        "mid": 6604800,
        "high": 6700800
      },
      {
        "month": "May 2027",
        "low": 6547200,
        "mid": 6656000,
        "high": 6771200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 53267,
        "expenses": 8080,
        "netDistributed": 45187,
        "payoutPerShare": 0.459
      },
      {
        "month": "Jul 2026",
        "grossCollected": 53667,
        "expenses": 8080,
        "netDistributed": 45587,
        "payoutPerShare": 0.463
      },
      {
        "month": "Aug 2026",
        "grossCollected": 53867,
        "expenses": 8080,
        "netDistributed": 45787,
        "payoutPerShare": 0.547
      },
      {
        "month": "Sep 2026",
        "grossCollected": 53867,
        "expenses": 8080,
        "netDistributed": 45787,
        "payoutPerShare": 0.547
      },
      {
        "month": "Oct 2026",
        "grossCollected": 53867,
        "expenses": 8080,
        "netDistributed": 45787,
        "payoutPerShare": 0.547
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-au-bne-howard-wharves-01",
        "category": "Legal & Title",
        "title": "Australia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Brisbane Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-au-bne-howard-wharves-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-au-bne-howard-wharves-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-au-bne-howard-wharves-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 38400,
      "insuranceAnnual": 19200,
      "maintenanceAnnual": 32000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12800
    },
    "assignedManager": {
      "id": "mgr-prop-au-bne-howard-wharves",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 36,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AU-1046",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-au-per-elizabeth-quay",
    "slug": "perth-elizabeth-quay-commercial",
    "title": "Swan River Commercial Plaza",
    "headline": "Waterfront commercial office building housing global mining and renewable energy groups",
    "description": "Overlooking Perth's Swan River with direct ferry connection to South Perth and train links.",
    "city": "Perth",
    "country": "Australia",
    "countryCode": "AU",
    "address": "The Esplanade, Elizabeth Quay, Perth, WA",
    "category": "office",
    "developer": "Chevron & Multiplex",
    "yearBuilt": 2022,
    "totalAreaSqFt": 78000,
    "totalValuation": 9200000,
    "sharePrice": 85,
    "netYield": 7.9,
    "grossYield": 9.4,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 108235,
    "availableShares": 19049,
    "fundedPercentage": 82.4,
    "estimatedMonthlyRent": 72067,
    "monthlyPerShareRent": 0.666,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 9347200,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 91,
      "propertyCondition": 99,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 8556000,
        "sharePrice": 79
      },
      {
        "date": "2026-02",
        "value": 8740000,
        "sharePrice": 80.8
      },
      {
        "date": "2026-05",
        "value": 8924000,
        "sharePrice": 82.5
      },
      {
        "date": "2026-08",
        "value": 9108000,
        "sharePrice": 84.2
      },
      {
        "date": "2026-11",
        "value": 9200000,
        "sharePrice": 85
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 9218400,
        "mid": 9255200,
        "high": 9301200
      },
      {
        "month": "Jan 2027",
        "low": 9246000,
        "mid": 9310400,
        "high": 9374800
      },
      {
        "month": "Feb 2027",
        "low": 9282800,
        "mid": 9365600,
        "high": 9457600
      },
      {
        "month": "Mar 2027",
        "low": 9319600,
        "mid": 9430000,
        "high": 9540400
      },
      {
        "month": "Apr 2027",
        "low": 9365600,
        "mid": 9494400,
        "high": 9632400
      },
      {
        "month": "May 2027",
        "low": 9411600,
        "mid": 9568000,
        "high": 9733600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 71467,
        "expenses": 10810,
        "netDistributed": 60657,
        "payoutPerShare": 0.56
      },
      {
        "month": "Jul 2026",
        "grossCollected": 71867,
        "expenses": 10810,
        "netDistributed": 61057,
        "payoutPerShare": 0.564
      },
      {
        "month": "Aug 2026",
        "grossCollected": 72067,
        "expenses": 10810,
        "netDistributed": 61257,
        "payoutPerShare": 0.666
      },
      {
        "month": "Sep 2026",
        "grossCollected": 72067,
        "expenses": 10810,
        "netDistributed": 61257,
        "payoutPerShare": 0.666
      },
      {
        "month": "Oct 2026",
        "grossCollected": 72067,
        "expenses": 10810,
        "netDistributed": 61257,
        "payoutPerShare": 0.666
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-au-per-elizabeth-quay-01",
        "category": "Legal & Title",
        "title": "Australia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Perth Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-au-per-elizabeth-quay-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-au-per-elizabeth-quay-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-au-per-elizabeth-quay-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 55200,
      "insuranceAnnual": 27600,
      "maintenanceAnnual": 46000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 18400
    },
    "assignedManager": {
      "id": "mgr-prop-au-per-elizabeth-quay",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 65,
      "occupiedUnits": 62,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AU-1047",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-de-fra-bankenviertel",
    "slug": "frankfurt-financial-district-tower",
    "title": "Mainhattan Banking Pinnacle",
    "headline": "Corporate office building in Frankfurt's core banking district near the European Central Bank",
    "description": "Institutional credit tenants with index-linked euro rental contracts and high energy performance ratings.",
    "city": "Frankfurt",
    "country": "Germany",
    "countryCode": "DE",
    "address": "Neue Mainzer Strasse, Frankfurt am Main",
    "category": "office",
    "developer": "Tishman Speyer Germany",
    "yearBuilt": 2021,
    "totalAreaSqFt": 88000,
    "totalValuation": 12800000,
    "sharePrice": 110,
    "netYield": 6.9,
    "grossYield": 8.2,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 116364,
    "availableShares": 12335,
    "fundedPercentage": 89.4,
    "estimatedMonthlyRent": 87467,
    "monthlyPerShareRent": 0.752,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 13107200,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 92,
      "propertyCondition": 92,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 11904000,
        "sharePrice": 102.3
      },
      {
        "date": "2026-02",
        "value": 12160000,
        "sharePrice": 104.5
      },
      {
        "date": "2026-05",
        "value": 12416000,
        "sharePrice": 106.7
      },
      {
        "date": "2026-08",
        "value": 12672000,
        "sharePrice": 108.9
      },
      {
        "date": "2026-11",
        "value": 12800000,
        "sharePrice": 110
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 12825600,
        "mid": 12876800,
        "high": 12940800
      },
      {
        "month": "Jan 2027",
        "low": 12864000,
        "mid": 12953600,
        "high": 13043200
      },
      {
        "month": "Feb 2027",
        "low": 12915200,
        "mid": 13030400,
        "high": 13158400
      },
      {
        "month": "Mar 2027",
        "low": 12966400,
        "mid": 13120000,
        "high": 13273600
      },
      {
        "month": "Apr 2027",
        "low": 13030400,
        "mid": 13209600,
        "high": 13401600
      },
      {
        "month": "May 2027",
        "low": 13094400,
        "mid": 13312000,
        "high": 13542400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 86867,
        "expenses": 13120,
        "netDistributed": 73747,
        "payoutPerShare": 0.634
      },
      {
        "month": "Jul 2026",
        "grossCollected": 87267,
        "expenses": 13120,
        "netDistributed": 74147,
        "payoutPerShare": 0.637
      },
      {
        "month": "Aug 2026",
        "grossCollected": 87467,
        "expenses": 13120,
        "netDistributed": 74347,
        "payoutPerShare": 0.752
      },
      {
        "month": "Sep 2026",
        "grossCollected": 87467,
        "expenses": 13120,
        "netDistributed": 74347,
        "payoutPerShare": 0.752
      },
      {
        "month": "Oct 2026",
        "grossCollected": 87467,
        "expenses": 13120,
        "netDistributed": 74347,
        "payoutPerShare": 0.752
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-de-fra-bankenviertel-01",
        "category": "Legal & Title",
        "title": "Germany Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Frankfurt Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-de-fra-bankenviertel-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-de-fra-bankenviertel-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-de-fra-bankenviertel-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 76800,
      "insuranceAnnual": 38400,
      "maintenanceAnnual": 64000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 25600
    },
    "assignedManager": {
      "id": "mgr-prop-de-fra-bankenviertel",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 73,
      "occupiedUnits": 71,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-DE-1048",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-de-ber-mitte-tech",
    "slug": "berlin-mitte-innovation-studios",
    "title": "Berlin Mitte Tech Campus",
    "headline": "Modern residential and co-living apartments in Berlin's historic center popular with international engineers",
    "description": "Features high-speed fiber, community makerspace, internal courtyard gardens, and micro-mobility stations.",
    "city": "Berlin",
    "country": "Germany",
    "countryCode": "DE",
    "address": "Torstrasse, Berlin-Mitte",
    "category": "residential",
    "developer": "Vonovia & StateEra Europe",
    "yearBuilt": 2022,
    "totalAreaSqFt": 54000,
    "totalValuation": 7200000,
    "sharePrice": 60,
    "netYield": 7.2,
    "grossYield": 8.6,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 120000,
    "availableShares": 4320,
    "fundedPercentage": 96.4,
    "estimatedMonthlyRent": 51600,
    "monthlyPerShareRent": 0.43,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7027200,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 93,
      "propertyCondition": 93,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6696000,
        "sharePrice": 55.8
      },
      {
        "date": "2026-02",
        "value": 6840000,
        "sharePrice": 57
      },
      {
        "date": "2026-05",
        "value": 6984000,
        "sharePrice": 58.2
      },
      {
        "date": "2026-08",
        "value": 7128000,
        "sharePrice": 59.4
      },
      {
        "date": "2026-11",
        "value": 7200000,
        "sharePrice": 60
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7214400,
        "mid": 7243200,
        "high": 7279200
      },
      {
        "month": "Jan 2027",
        "low": 7236000,
        "mid": 7286400,
        "high": 7336800
      },
      {
        "month": "Feb 2027",
        "low": 7264800,
        "mid": 7329600,
        "high": 7401600
      },
      {
        "month": "Mar 2027",
        "low": 7293600,
        "mid": 7380000,
        "high": 7466400
      },
      {
        "month": "Apr 2027",
        "low": 7329600,
        "mid": 7430400,
        "high": 7538400
      },
      {
        "month": "May 2027",
        "low": 7365600,
        "mid": 7488000,
        "high": 7617600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 51000,
        "expenses": 7740,
        "netDistributed": 43260,
        "payoutPerShare": 0.36
      },
      {
        "month": "Jul 2026",
        "grossCollected": 51400,
        "expenses": 7740,
        "netDistributed": 43660,
        "payoutPerShare": 0.364
      },
      {
        "month": "Aug 2026",
        "grossCollected": 51600,
        "expenses": 7740,
        "netDistributed": 43860,
        "payoutPerShare": 0.43
      },
      {
        "month": "Sep 2026",
        "grossCollected": 51600,
        "expenses": 7740,
        "netDistributed": 43860,
        "payoutPerShare": 0.43
      },
      {
        "month": "Oct 2026",
        "grossCollected": 51600,
        "expenses": 7740,
        "netDistributed": 43860,
        "payoutPerShare": 0.43
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-de-ber-mitte-tech-01",
        "category": "Legal & Title",
        "title": "Germany Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Berlin Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-de-ber-mitte-tech-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-de-ber-mitte-tech-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-de-ber-mitte-tech-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 43200,
      "insuranceAnnual": 21600,
      "maintenanceAnnual": 36000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 14400
    },
    "assignedManager": {
      "id": "mgr-prop-de-ber-mitte-tech",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 45,
      "occupiedUnits": 45,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-DE-1049",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-de-mun-schwabing",
    "slug": "munich-schwabing-luxury-villas",
    "title": "Schwabing Parkside Enclave",
    "headline": "Bespoke contemporary residential villas bordering the English Garden in Munich",
    "description": "High-value asset with strong capital retention and rental demand from corporate executives in Bavaria.",
    "city": "Munich",
    "country": "Germany",
    "countryCode": "DE",
    "address": "Leopoldstrasse, Schwabing, Munich",
    "category": "luxury",
    "developer": "Bavaria Real Estate AG",
    "yearBuilt": 2022,
    "totalAreaSqFt": 44000,
    "totalValuation": 9800000,
    "sharePrice": 100,
    "netYield": 6.4,
    "grossYield": 7.7,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 98000,
    "availableShares": 19208,
    "fundedPercentage": 80.4,
    "estimatedMonthlyRent": 62883,
    "monthlyPerShareRent": 0.642,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 9643200,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 94,
      "propertyCondition": 94,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 9114000,
        "sharePrice": 93
      },
      {
        "date": "2026-02",
        "value": 9310000,
        "sharePrice": 95
      },
      {
        "date": "2026-05",
        "value": 9506000,
        "sharePrice": 97
      },
      {
        "date": "2026-08",
        "value": 9702000,
        "sharePrice": 99
      },
      {
        "date": "2026-11",
        "value": 9800000,
        "sharePrice": 100
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 9819600,
        "mid": 9858800,
        "high": 9907800
      },
      {
        "month": "Jan 2027",
        "low": 9849000,
        "mid": 9917600,
        "high": 9986200
      },
      {
        "month": "Feb 2027",
        "low": 9888200,
        "mid": 9976400,
        "high": 10074400
      },
      {
        "month": "Mar 2027",
        "low": 9927400,
        "mid": 10045000,
        "high": 10162600
      },
      {
        "month": "Apr 2027",
        "low": 9976400,
        "mid": 10113600,
        "high": 10260600
      },
      {
        "month": "May 2027",
        "low": 10025400,
        "mid": 10192000,
        "high": 10368400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 62283,
        "expenses": 9432,
        "netDistributed": 52851,
        "payoutPerShare": 0.539
      },
      {
        "month": "Jul 2026",
        "grossCollected": 62683,
        "expenses": 9432,
        "netDistributed": 53251,
        "payoutPerShare": 0.543
      },
      {
        "month": "Aug 2026",
        "grossCollected": 62883,
        "expenses": 9432,
        "netDistributed": 53451,
        "payoutPerShare": 0.642
      },
      {
        "month": "Sep 2026",
        "grossCollected": 62883,
        "expenses": 9432,
        "netDistributed": 53451,
        "payoutPerShare": 0.642
      },
      {
        "month": "Oct 2026",
        "grossCollected": 62883,
        "expenses": 9432,
        "netDistributed": 53451,
        "payoutPerShare": 0.642
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-de-mun-schwabing-01",
        "category": "Legal & Title",
        "title": "Germany Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Munich Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-de-mun-schwabing-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-de-mun-schwabing-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-de-mun-schwabing-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 58800,
      "insuranceAnnual": 29400,
      "maintenanceAnnual": 49000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 19600
    },
    "assignedManager": {
      "id": "mgr-prop-de-mun-schwabing",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 37,
      "occupiedUnits": 36,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-DE-1050",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-de-ham-hafencity",
    "slug": "hamburg-hafencity-maritime-apartments",
    "title": "HafenCity Maritime Residences",
    "headline": "Waterfront modern apartments in Europe's largest inner-city regeneration development",
    "description": "Overlooking the Elbe River with flood protection engineering, maritime museum proximity, and direct U-Bahn transit.",
    "city": "Hamburg",
    "country": "Germany",
    "countryCode": "DE",
    "address": "Am Sandtorkai, HafenCity, Hamburg",
    "category": "waterfront",
    "developer": "HafenCity Hamburg GmbH",
    "yearBuilt": 2023,
    "totalAreaSqFt": 58000,
    "totalValuation": 7900000,
    "sharePrice": 75,
    "netYield": 7.1,
    "grossYield": 8.5,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 105333,
    "availableShares": 13272,
    "fundedPercentage": 87.4,
    "estimatedMonthlyRent": 55958,
    "monthlyPerShareRent": 0.531,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7836800,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 95,
      "propertyCondition": 95,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 7347000,
        "sharePrice": 69.8
      },
      {
        "date": "2026-02",
        "value": 7505000,
        "sharePrice": 71.3
      },
      {
        "date": "2026-05",
        "value": 7663000,
        "sharePrice": 72.8
      },
      {
        "date": "2026-08",
        "value": 7821000,
        "sharePrice": 74.3
      },
      {
        "date": "2026-11",
        "value": 7900000,
        "sharePrice": 75
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7915800,
        "mid": 7947400,
        "high": 7986900
      },
      {
        "month": "Jan 2027",
        "low": 7939500,
        "mid": 7994800,
        "high": 8050100
      },
      {
        "month": "Feb 2027",
        "low": 7971100,
        "mid": 8042200,
        "high": 8121200
      },
      {
        "month": "Mar 2027",
        "low": 8002700,
        "mid": 8097500,
        "high": 8192300
      },
      {
        "month": "Apr 2027",
        "low": 8042200,
        "mid": 8152800,
        "high": 8271300
      },
      {
        "month": "May 2027",
        "low": 8081700,
        "mid": 8216000,
        "high": 8358200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 55358,
        "expenses": 8394,
        "netDistributed": 46964,
        "payoutPerShare": 0.446
      },
      {
        "month": "Jul 2026",
        "grossCollected": 55758,
        "expenses": 8394,
        "netDistributed": 47364,
        "payoutPerShare": 0.45
      },
      {
        "month": "Aug 2026",
        "grossCollected": 55958,
        "expenses": 8394,
        "netDistributed": 47564,
        "payoutPerShare": 0.531
      },
      {
        "month": "Sep 2026",
        "grossCollected": 55958,
        "expenses": 8394,
        "netDistributed": 47564,
        "payoutPerShare": 0.531
      },
      {
        "month": "Oct 2026",
        "grossCollected": 55958,
        "expenses": 8394,
        "netDistributed": 47564,
        "payoutPerShare": 0.531
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-de-ham-hafencity-01",
        "category": "Legal & Title",
        "title": "Germany Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Hamburg Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-de-ham-hafencity-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-de-ham-hafencity-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-de-ham-hafencity-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 47400,
      "insuranceAnnual": 23700,
      "maintenanceAnnual": 39500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 15800
    },
    "assignedManager": {
      "id": "mgr-prop-de-ham-hafencity",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 48,
      "occupiedUnits": 47,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-DE-1051",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-fr-par-champs-elysees",
    "slug": "paris-8th-arrondissement-haussmann",
    "title": "Haussmann Prestige Boulevard",
    "headline": "Restored 19th-century Haussmannian luxury residences near Champs-Elysees and Golden Triangle",
    "description": "Period parquet floors, marble fireplaces, soaring ceilings, and discreet 24/7 concierge security.",
    "city": "Paris",
    "country": "France",
    "countryCode": "FR",
    "address": "Avenue Montaigne, 8th Arrondissement, Paris",
    "category": "luxury",
    "developer": "Vinci Immobilier",
    "yearBuilt": 2021,
    "totalAreaSqFt": 45000,
    "totalValuation": 15200000,
    "sharePrice": 150,
    "netYield": 6.2,
    "grossYield": 7.5,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 101333,
    "availableShares": 5675,
    "fundedPercentage": 94.4,
    "estimatedMonthlyRent": 95000,
    "monthlyPerShareRent": 0.938,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 15200000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 96,
      "propertyCondition": 96,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 14136000,
        "sharePrice": 139.5
      },
      {
        "date": "2026-02",
        "value": 14440000,
        "sharePrice": 142.5
      },
      {
        "date": "2026-05",
        "value": 14744000,
        "sharePrice": 145.5
      },
      {
        "date": "2026-08",
        "value": 15048000,
        "sharePrice": 148.5
      },
      {
        "date": "2026-11",
        "value": 15200000,
        "sharePrice": 150
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 15230400,
        "mid": 15291200,
        "high": 15367200
      },
      {
        "month": "Jan 2027",
        "low": 15276000,
        "mid": 15382400,
        "high": 15488800
      },
      {
        "month": "Feb 2027",
        "low": 15336800,
        "mid": 15473600,
        "high": 15625600
      },
      {
        "month": "Mar 2027",
        "low": 15397600,
        "mid": 15580000,
        "high": 15762400
      },
      {
        "month": "Apr 2027",
        "low": 15473600,
        "mid": 15686400,
        "high": 15914400
      },
      {
        "month": "May 2027",
        "low": 15549600,
        "mid": 15808000,
        "high": 16081600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 94400,
        "expenses": 14250,
        "netDistributed": 80150,
        "payoutPerShare": 0.791
      },
      {
        "month": "Jul 2026",
        "grossCollected": 94800,
        "expenses": 14250,
        "netDistributed": 80550,
        "payoutPerShare": 0.795
      },
      {
        "month": "Aug 2026",
        "grossCollected": 95000,
        "expenses": 14250,
        "netDistributed": 80750,
        "payoutPerShare": 0.938
      },
      {
        "month": "Sep 2026",
        "grossCollected": 95000,
        "expenses": 14250,
        "netDistributed": 80750,
        "payoutPerShare": 0.938
      },
      {
        "month": "Oct 2026",
        "grossCollected": 95000,
        "expenses": 14250,
        "netDistributed": 80750,
        "payoutPerShare": 0.938
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-fr-par-champs-elysees-01",
        "category": "Legal & Title",
        "title": "France Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Paris Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-fr-par-champs-elysees-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-fr-par-champs-elysees-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-fr-par-champs-elysees-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 91200,
      "insuranceAnnual": 45600,
      "maintenanceAnnual": 76000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 30400
    },
    "assignedManager": {
      "id": "mgr-prop-fr-par-champs-elysees",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-FR-1052",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-fr-par-la-defense",
    "slug": "la-defense-corporate-center",
    "title": "La Defense Finance Tower",
    "headline": "Modern energy-efficient commercial office building in Paris's primary corporate business district",
    "description": "Long-term leases with French financial institutions and multinational consultancies, directly on RER-A train line.",
    "city": "Paris",
    "country": "France",
    "countryCode": "FR",
    "address": "Parvis de la Defense, Paris",
    "category": "office",
    "developer": "Unibail-Rodamco-Westfield",
    "yearBuilt": 2022,
    "totalAreaSqFt": 94000,
    "totalValuation": 13600000,
    "sharePrice": 120,
    "netYield": 7.3,
    "grossYield": 8.7,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 113333,
    "availableShares": 24480,
    "fundedPercentage": 78.4,
    "estimatedMonthlyRent": 98600,
    "monthlyPerShareRent": 0.87,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 13708800,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 97,
      "propertyCondition": 97,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 12648000,
        "sharePrice": 111.6
      },
      {
        "date": "2026-02",
        "value": 12920000,
        "sharePrice": 114
      },
      {
        "date": "2026-05",
        "value": 13192000,
        "sharePrice": 116.4
      },
      {
        "date": "2026-08",
        "value": 13464000,
        "sharePrice": 118.8
      },
      {
        "date": "2026-11",
        "value": 13600000,
        "sharePrice": 120
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 13627200,
        "mid": 13681600,
        "high": 13749600
      },
      {
        "month": "Jan 2027",
        "low": 13668000,
        "mid": 13763200,
        "high": 13858400
      },
      {
        "month": "Feb 2027",
        "low": 13722400,
        "mid": 13844800,
        "high": 13980800
      },
      {
        "month": "Mar 2027",
        "low": 13776800,
        "mid": 13940000,
        "high": 14103200
      },
      {
        "month": "Apr 2027",
        "low": 13844800,
        "mid": 14035200,
        "high": 14239200
      },
      {
        "month": "May 2027",
        "low": 13912800,
        "mid": 14144000,
        "high": 14388800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 98000,
        "expenses": 14790,
        "netDistributed": 83210,
        "payoutPerShare": 0.734
      },
      {
        "month": "Jul 2026",
        "grossCollected": 98400,
        "expenses": 14790,
        "netDistributed": 83610,
        "payoutPerShare": 0.738
      },
      {
        "month": "Aug 2026",
        "grossCollected": 98600,
        "expenses": 14790,
        "netDistributed": 83810,
        "payoutPerShare": 0.87
      },
      {
        "month": "Sep 2026",
        "grossCollected": 98600,
        "expenses": 14790,
        "netDistributed": 83810,
        "payoutPerShare": 0.87
      },
      {
        "month": "Oct 2026",
        "grossCollected": 98600,
        "expenses": 14790,
        "netDistributed": 83810,
        "payoutPerShare": 0.87
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-fr-par-la-defense-01",
        "category": "Legal & Title",
        "title": "France Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Paris Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-fr-par-la-defense-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-fr-par-la-defense-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-fr-par-la-defense-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 81600,
      "insuranceAnnual": 40800,
      "maintenanceAnnual": 68000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 27200
    },
    "assignedManager": {
      "id": "mgr-prop-fr-par-la-defense",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 78,
      "occupiedUnits": 75,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-FR-1053",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-fr-lyo-part-dieu",
    "slug": "lyon-part-dieu-student-tower",
    "title": "Part-Dieu Scholar Tower",
    "headline": "Purpose-built student and young professional residence near Lyon's central TGV rail hub",
    "description": "High density accommodation with communal co-working facilities, gym, and automated laundry services.",
    "city": "Lyon",
    "country": "France",
    "countryCode": "FR",
    "address": "Boulevard Vivier-Merle, Lyon",
    "category": "student",
    "developer": "Nexity France",
    "yearBuilt": 2022,
    "totalAreaSqFt": 42000,
    "totalValuation": 4800000,
    "sharePrice": 45,
    "netYield": 8.2,
    "grossYield": 9.8,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 106667,
    "availableShares": 15573,
    "fundedPercentage": 85.4,
    "estimatedMonthlyRent": 39200,
    "monthlyPerShareRent": 0.367,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4876800,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 98,
      "propertyCondition": 98,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4464000,
        "sharePrice": 41.9
      },
      {
        "date": "2026-02",
        "value": 4560000,
        "sharePrice": 42.8
      },
      {
        "date": "2026-05",
        "value": 4656000,
        "sharePrice": 43.6
      },
      {
        "date": "2026-08",
        "value": 4752000,
        "sharePrice": 44.5
      },
      {
        "date": "2026-11",
        "value": 4800000,
        "sharePrice": 45
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4809600,
        "mid": 4828800,
        "high": 4852800
      },
      {
        "month": "Jan 2027",
        "low": 4824000,
        "mid": 4857600,
        "high": 4891200
      },
      {
        "month": "Feb 2027",
        "low": 4843200,
        "mid": 4886400,
        "high": 4934400
      },
      {
        "month": "Mar 2027",
        "low": 4862400,
        "mid": 4920000,
        "high": 4977600
      },
      {
        "month": "Apr 2027",
        "low": 4886400,
        "mid": 4953600,
        "high": 5025600
      },
      {
        "month": "May 2027",
        "low": 4910400,
        "mid": 4992000,
        "high": 5078400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 38600,
        "expenses": 5880,
        "netDistributed": 32720,
        "payoutPerShare": 0.307
      },
      {
        "month": "Jul 2026",
        "grossCollected": 39000,
        "expenses": 5880,
        "netDistributed": 33120,
        "payoutPerShare": 0.31
      },
      {
        "month": "Aug 2026",
        "grossCollected": 39200,
        "expenses": 5880,
        "netDistributed": 33320,
        "payoutPerShare": 0.367
      },
      {
        "month": "Sep 2026",
        "grossCollected": 39200,
        "expenses": 5880,
        "netDistributed": 33320,
        "payoutPerShare": 0.367
      },
      {
        "month": "Oct 2026",
        "grossCollected": 39200,
        "expenses": 5880,
        "netDistributed": 33320,
        "payoutPerShare": 0.367
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-fr-lyo-part-dieu-01",
        "category": "Legal & Title",
        "title": "France Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Lyon Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-fr-lyo-part-dieu-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-fr-lyo-part-dieu-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-fr-lyo-part-dieu-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 28800,
      "insuranceAnnual": 14400,
      "maintenanceAnnual": 24000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9600
    },
    "assignedManager": {
      "id": "mgr-prop-fr-lyo-part-dieu",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 35,
      "occupiedUnits": 35,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-FR-1054",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-fr-nic-promenade",
    "slug": "nice-promenade-des-anglais-suites",
    "title": "French Riviera Promenade Suites",
    "headline": "Mediterranean beachfront serviced apartments on the iconic Promenade des Anglais",
    "description": "Premium French Riviera holiday and corporate rental income in euros with high summer yield premiums.",
    "city": "Nice",
    "country": "France",
    "countryCode": "FR",
    "address": "Promenade des Anglais, Nice",
    "category": "hospitality",
    "developer": "Cote d'Azur Estates",
    "yearBuilt": 2021,
    "totalAreaSqFt": 48000,
    "totalValuation": 7800000,
    "sharePrice": 80,
    "netYield": 8,
    "grossYield": 9.6,
    "occupancyRate": 95,
    "coverImage": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 97500,
    "availableShares": 7410,
    "fundedPercentage": 92.4,
    "estimatedMonthlyRent": 62400,
    "monthlyPerShareRent": 0.64,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7987200,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 88,
      "propertyCondition": 99,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 7254000,
        "sharePrice": 74.4
      },
      {
        "date": "2026-02",
        "value": 7410000,
        "sharePrice": 76
      },
      {
        "date": "2026-05",
        "value": 7566000,
        "sharePrice": 77.6
      },
      {
        "date": "2026-08",
        "value": 7722000,
        "sharePrice": 79.2
      },
      {
        "date": "2026-11",
        "value": 7800000,
        "sharePrice": 80
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7815600,
        "mid": 7846800,
        "high": 7885800
      },
      {
        "month": "Jan 2027",
        "low": 7839000,
        "mid": 7893600,
        "high": 7948200
      },
      {
        "month": "Feb 2027",
        "low": 7870200,
        "mid": 7940400,
        "high": 8018400
      },
      {
        "month": "Mar 2027",
        "low": 7901400,
        "mid": 7995000,
        "high": 8088600
      },
      {
        "month": "Apr 2027",
        "low": 7940400,
        "mid": 8049600,
        "high": 8166600
      },
      {
        "month": "May 2027",
        "low": 7979400,
        "mid": 8112000,
        "high": 8252400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 61800,
        "expenses": 9360,
        "netDistributed": 52440,
        "payoutPerShare": 0.538
      },
      {
        "month": "Jul 2026",
        "grossCollected": 62200,
        "expenses": 9360,
        "netDistributed": 52840,
        "payoutPerShare": 0.542
      },
      {
        "month": "Aug 2026",
        "grossCollected": 62400,
        "expenses": 9360,
        "netDistributed": 53040,
        "payoutPerShare": 0.64
      },
      {
        "month": "Sep 2026",
        "grossCollected": 62400,
        "expenses": 9360,
        "netDistributed": 53040,
        "payoutPerShare": 0.64
      },
      {
        "month": "Oct 2026",
        "grossCollected": 62400,
        "expenses": 9360,
        "netDistributed": 53040,
        "payoutPerShare": 0.64
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-fr-nic-promenade-01",
        "category": "Legal & Title",
        "title": "France Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Nice Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-fr-nic-promenade-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-fr-nic-promenade-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-fr-nic-promenade-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 46800,
      "insuranceAnnual": 23400,
      "maintenanceAnnual": 39000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 15600
    },
    "assignedManager": {
      "id": "mgr-prop-fr-nic-promenade",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 40,
      "occupiedUnits": 38,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-FR-1055",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-it-mil-porta-nuova",
    "slug": "milan-porta-nuova-vertical-forest",
    "title": "Porta Nuova Eco-Tower",
    "headline": "Sustainable luxury residences in Milan's premier financial and fashion innovation district",
    "description": "Integrated biological vegetation facade, private concierge, and panoramic vistas of the Italian Alps.",
    "city": "Milan",
    "country": "Italy",
    "countryCode": "IT",
    "address": "Piazza Gae Aulenti, Porta Nuova, Milan",
    "category": "luxury",
    "developer": "COIMA SGR",
    "yearBuilt": 2022,
    "totalAreaSqFt": 56000,
    "totalValuation": 11200000,
    "sharePrice": 110,
    "netYield": 6.8,
    "grossYield": 8.1,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 101818,
    "availableShares": 24029,
    "fundedPercentage": 76.4,
    "estimatedMonthlyRent": 75600,
    "monthlyPerShareRent": 0.743,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 10931200,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 89,
      "propertyCondition": 92,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 10416000,
        "sharePrice": 102.3
      },
      {
        "date": "2026-02",
        "value": 10640000,
        "sharePrice": 104.5
      },
      {
        "date": "2026-05",
        "value": 10864000,
        "sharePrice": 106.7
      },
      {
        "date": "2026-08",
        "value": 11088000,
        "sharePrice": 108.9
      },
      {
        "date": "2026-11",
        "value": 11200000,
        "sharePrice": 110
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 11222400,
        "mid": 11267200,
        "high": 11323200
      },
      {
        "month": "Jan 2027",
        "low": 11256000,
        "mid": 11334400,
        "high": 11412800
      },
      {
        "month": "Feb 2027",
        "low": 11300800,
        "mid": 11401600,
        "high": 11513600
      },
      {
        "month": "Mar 2027",
        "low": 11345600,
        "mid": 11480000,
        "high": 11614400
      },
      {
        "month": "Apr 2027",
        "low": 11401600,
        "mid": 11558400,
        "high": 11726400
      },
      {
        "month": "May 2027",
        "low": 11457600,
        "mid": 11648000,
        "high": 11849600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 75000,
        "expenses": 11340,
        "netDistributed": 63660,
        "payoutPerShare": 0.625
      },
      {
        "month": "Jul 2026",
        "grossCollected": 75400,
        "expenses": 11340,
        "netDistributed": 64060,
        "payoutPerShare": 0.629
      },
      {
        "month": "Aug 2026",
        "grossCollected": 75600,
        "expenses": 11340,
        "netDistributed": 64260,
        "payoutPerShare": 0.743
      },
      {
        "month": "Sep 2026",
        "grossCollected": 75600,
        "expenses": 11340,
        "netDistributed": 64260,
        "payoutPerShare": 0.743
      },
      {
        "month": "Oct 2026",
        "grossCollected": 75600,
        "expenses": 11340,
        "netDistributed": 64260,
        "payoutPerShare": 0.743
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-it-mil-porta-nuova-01",
        "category": "Legal & Title",
        "title": "Italy Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Milan Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-it-mil-porta-nuova-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-it-mil-porta-nuova-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-it-mil-porta-nuova-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 67200,
      "insuranceAnnual": 33600,
      "maintenanceAnnual": 56000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 22400
    },
    "assignedManager": {
      "id": "mgr-prop-it-mil-porta-nuova",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 47,
      "occupiedUnits": 46,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-IT-1056",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-it-rom-parioli",
    "slug": "rome-parioli-diplomatic-residences",
    "title": "Parioli Embassy Gardens",
    "headline": "Classical residential apartments in Rome's most affluent diplomatic quarter",
    "description": "Leased to foreign diplomats, embassy counselors, and international organization staff with low turnover.",
    "city": "Rome",
    "country": "Italy",
    "countryCode": "IT",
    "address": "Via Archimede, Parioli, Rome",
    "category": "residential",
    "developer": "Roma Capitale Immobili",
    "yearBuilt": 2021,
    "totalAreaSqFt": 46000,
    "totalValuation": 6400000,
    "sharePrice": 70,
    "netYield": 7.4,
    "grossYield": 8.8,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 91429,
    "availableShares": 15177,
    "fundedPercentage": 83.4,
    "estimatedMonthlyRent": 46933,
    "monthlyPerShareRent": 0.513,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6297600,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 90,
      "propertyCondition": 93,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5952000,
        "sharePrice": 65.1
      },
      {
        "date": "2026-02",
        "value": 6080000,
        "sharePrice": 66.5
      },
      {
        "date": "2026-05",
        "value": 6208000,
        "sharePrice": 67.9
      },
      {
        "date": "2026-08",
        "value": 6336000,
        "sharePrice": 69.3
      },
      {
        "date": "2026-11",
        "value": 6400000,
        "sharePrice": 70
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6412800,
        "mid": 6438400,
        "high": 6470400
      },
      {
        "month": "Jan 2027",
        "low": 6432000,
        "mid": 6476800,
        "high": 6521600
      },
      {
        "month": "Feb 2027",
        "low": 6457600,
        "mid": 6515200,
        "high": 6579200
      },
      {
        "month": "Mar 2027",
        "low": 6483200,
        "mid": 6560000,
        "high": 6636800
      },
      {
        "month": "Apr 2027",
        "low": 6515200,
        "mid": 6604800,
        "high": 6700800
      },
      {
        "month": "May 2027",
        "low": 6547200,
        "mid": 6656000,
        "high": 6771200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 46333,
        "expenses": 7040,
        "netDistributed": 39293,
        "payoutPerShare": 0.43
      },
      {
        "month": "Jul 2026",
        "grossCollected": 46733,
        "expenses": 7040,
        "netDistributed": 39693,
        "payoutPerShare": 0.434
      },
      {
        "month": "Aug 2026",
        "grossCollected": 46933,
        "expenses": 7040,
        "netDistributed": 39893,
        "payoutPerShare": 0.513
      },
      {
        "month": "Sep 2026",
        "grossCollected": 46933,
        "expenses": 7040,
        "netDistributed": 39893,
        "payoutPerShare": 0.513
      },
      {
        "month": "Oct 2026",
        "grossCollected": 46933,
        "expenses": 7040,
        "netDistributed": 39893,
        "payoutPerShare": 0.513
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-it-rom-parioli-01",
        "category": "Legal & Title",
        "title": "Italy Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Rome Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-it-rom-parioli-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-it-rom-parioli-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-it-rom-parioli-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 38400,
      "insuranceAnnual": 19200,
      "maintenanceAnnual": 32000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12800
    },
    "assignedManager": {
      "id": "mgr-prop-it-rom-parioli",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-IT-1057",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-it-flo-lungarno",
    "slug": "florence-lungarno-riverfront-palazzo",
    "title": "Lungarno Renaissance Palazzo",
    "headline": "Bespoke serviced suites facing the Arno River and Ponte Vecchio in historic Florence",
    "description": "Preserved historic architectural frescos coupled with modern luxury amenities for luxury international visitors.",
    "city": "Florence",
    "country": "Italy",
    "countryCode": "IT",
    "address": "Lungarno Corsini, Florence",
    "category": "hospitality",
    "developer": "Firenze Heritage Group",
    "yearBuilt": 2021,
    "totalAreaSqFt": 38000,
    "totalValuation": 5900000,
    "sharePrice": 75,
    "netYield": 8.4,
    "grossYield": 10,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 78667,
    "availableShares": 7552,
    "fundedPercentage": 90.4,
    "estimatedMonthlyRent": 49167,
    "monthlyPerShareRent": 0.625,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5852800,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 91,
      "propertyCondition": 94,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5487000,
        "sharePrice": 69.8
      },
      {
        "date": "2026-02",
        "value": 5605000,
        "sharePrice": 71.3
      },
      {
        "date": "2026-05",
        "value": 5723000,
        "sharePrice": 72.8
      },
      {
        "date": "2026-08",
        "value": 5841000,
        "sharePrice": 74.3
      },
      {
        "date": "2026-11",
        "value": 5900000,
        "sharePrice": 75
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5911800,
        "mid": 5935400,
        "high": 5964900
      },
      {
        "month": "Jan 2027",
        "low": 5929500,
        "mid": 5970800,
        "high": 6012100
      },
      {
        "month": "Feb 2027",
        "low": 5953100,
        "mid": 6006200,
        "high": 6065200
      },
      {
        "month": "Mar 2027",
        "low": 5976700,
        "mid": 6047500,
        "high": 6118300
      },
      {
        "month": "Apr 2027",
        "low": 6006200,
        "mid": 6088800,
        "high": 6177300
      },
      {
        "month": "May 2027",
        "low": 6035700,
        "mid": 6136000,
        "high": 6242200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 48567,
        "expenses": 7375,
        "netDistributed": 41192,
        "payoutPerShare": 0.524
      },
      {
        "month": "Jul 2026",
        "grossCollected": 48967,
        "expenses": 7375,
        "netDistributed": 41592,
        "payoutPerShare": 0.529
      },
      {
        "month": "Aug 2026",
        "grossCollected": 49167,
        "expenses": 7375,
        "netDistributed": 41792,
        "payoutPerShare": 0.625
      },
      {
        "month": "Sep 2026",
        "grossCollected": 49167,
        "expenses": 7375,
        "netDistributed": 41792,
        "payoutPerShare": 0.625
      },
      {
        "month": "Oct 2026",
        "grossCollected": 49167,
        "expenses": 7375,
        "netDistributed": 41792,
        "payoutPerShare": 0.625
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-it-flo-lungarno-01",
        "category": "Legal & Title",
        "title": "Italy Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Florence Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-it-flo-lungarno-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-it-flo-lungarno-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-it-flo-lungarno-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 35400,
      "insuranceAnnual": 17700,
      "maintenanceAnnual": 29500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11800
    },
    "assignedManager": {
      "id": "mgr-prop-it-flo-lungarno",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 32,
      "occupiedUnits": 31,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-IT-1058",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-es-mad-castellana",
    "slug": "madrid-castellana-corporate-plaza",
    "title": "Castellana Financial Center",
    "headline": "Prime corporate headquarters building on Paseo de la Castellana in central Madrid",
    "description": "Houses leading multinational technology, law, and investment banking firms with strong euro yields.",
    "city": "Madrid",
    "country": "Spain",
    "countryCode": "ES",
    "address": "Paseo de la Castellana, Madrid",
    "category": "office",
    "developer": "Merlin Properties",
    "yearBuilt": 2022,
    "totalAreaSqFt": 82000,
    "totalValuation": 10500000,
    "sharePrice": 95,
    "netYield": 7.7,
    "grossYield": 9.1,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 110526,
    "availableShares": 2874,
    "fundedPercentage": 97.4,
    "estimatedMonthlyRent": 79625,
    "monthlyPerShareRent": 0.72,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 10500000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 92,
      "propertyCondition": 95,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 9765000,
        "sharePrice": 88.4
      },
      {
        "date": "2026-02",
        "value": 9975000,
        "sharePrice": 90.3
      },
      {
        "date": "2026-05",
        "value": 10185000,
        "sharePrice": 92.1
      },
      {
        "date": "2026-08",
        "value": 10395000,
        "sharePrice": 94
      },
      {
        "date": "2026-11",
        "value": 10500000,
        "sharePrice": 95
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 10521000,
        "mid": 10563000,
        "high": 10615500
      },
      {
        "month": "Jan 2027",
        "low": 10552500,
        "mid": 10626000,
        "high": 10699500
      },
      {
        "month": "Feb 2027",
        "low": 10594500,
        "mid": 10689000,
        "high": 10794000
      },
      {
        "month": "Mar 2027",
        "low": 10636500,
        "mid": 10762500,
        "high": 10888500
      },
      {
        "month": "Apr 2027",
        "low": 10689000,
        "mid": 10836000,
        "high": 10993500
      },
      {
        "month": "May 2027",
        "low": 10741500,
        "mid": 10920000,
        "high": 11109000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 79025,
        "expenses": 11944,
        "netDistributed": 67081,
        "payoutPerShare": 0.607
      },
      {
        "month": "Jul 2026",
        "grossCollected": 79425,
        "expenses": 11944,
        "netDistributed": 67481,
        "payoutPerShare": 0.611
      },
      {
        "month": "Aug 2026",
        "grossCollected": 79625,
        "expenses": 11944,
        "netDistributed": 67681,
        "payoutPerShare": 0.72
      },
      {
        "month": "Sep 2026",
        "grossCollected": 79625,
        "expenses": 11944,
        "netDistributed": 67681,
        "payoutPerShare": 0.72
      },
      {
        "month": "Oct 2026",
        "grossCollected": 79625,
        "expenses": 11944,
        "netDistributed": 67681,
        "payoutPerShare": 0.72
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-es-mad-castellana-01",
        "category": "Legal & Title",
        "title": "Spain Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Madrid Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-es-mad-castellana-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-es-mad-castellana-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-es-mad-castellana-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 63000,
      "insuranceAnnual": 31500,
      "maintenanceAnnual": 52500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 21000
    },
    "assignedManager": {
      "id": "mgr-prop-es-mad-castellana",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 68,
      "occupiedUnits": 66,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-ES-1059",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-es-bcn-diagonal-mar",
    "slug": "barcelona-diagonal-mar-waterfront",
    "title": "Diagonal Mar Waterfront Towers",
    "headline": "Coastal luxury apartments facing Bogatell Beach with private communal swimming pools",
    "description": "Close to the 22@ technology district, attracting remote international tech founders and executives.",
    "city": "Barcelona",
    "country": "Spain",
    "countryCode": "ES",
    "address": "Passeig Maritim del Bogatell, Barcelona",
    "category": "waterfront",
    "developer": "Colonial Inmobiliaria",
    "yearBuilt": 2022,
    "totalAreaSqFt": 60000,
    "totalValuation": 8600000,
    "sharePrice": 85,
    "netYield": 7.8,
    "grossYield": 9.3,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 101176,
    "availableShares": 18819,
    "fundedPercentage": 81.4,
    "estimatedMonthlyRent": 66650,
    "monthlyPerShareRent": 0.659,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 8668800,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 93,
      "propertyCondition": 96,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 7998000,
        "sharePrice": 79
      },
      {
        "date": "2026-02",
        "value": 8170000,
        "sharePrice": 80.8
      },
      {
        "date": "2026-05",
        "value": 8342000,
        "sharePrice": 82.5
      },
      {
        "date": "2026-08",
        "value": 8514000,
        "sharePrice": 84.2
      },
      {
        "date": "2026-11",
        "value": 8600000,
        "sharePrice": 85
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 8617200,
        "mid": 8651600,
        "high": 8694600
      },
      {
        "month": "Jan 2027",
        "low": 8643000,
        "mid": 8703200,
        "high": 8763400
      },
      {
        "month": "Feb 2027",
        "low": 8677400,
        "mid": 8754800,
        "high": 8840800
      },
      {
        "month": "Mar 2027",
        "low": 8711800,
        "mid": 8815000,
        "high": 8918200
      },
      {
        "month": "Apr 2027",
        "low": 8754800,
        "mid": 8875200,
        "high": 9004200
      },
      {
        "month": "May 2027",
        "low": 8797800,
        "mid": 8944000,
        "high": 9098800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 66050,
        "expenses": 9998,
        "netDistributed": 56052,
        "payoutPerShare": 0.554
      },
      {
        "month": "Jul 2026",
        "grossCollected": 66450,
        "expenses": 9998,
        "netDistributed": 56452,
        "payoutPerShare": 0.558
      },
      {
        "month": "Aug 2026",
        "grossCollected": 66650,
        "expenses": 9998,
        "netDistributed": 56652,
        "payoutPerShare": 0.659
      },
      {
        "month": "Sep 2026",
        "grossCollected": 66650,
        "expenses": 9998,
        "netDistributed": 56652,
        "payoutPerShare": 0.659
      },
      {
        "month": "Oct 2026",
        "grossCollected": 66650,
        "expenses": 9998,
        "netDistributed": 56652,
        "payoutPerShare": 0.659
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-es-bcn-diagonal-mar-01",
        "category": "Legal & Title",
        "title": "Spain Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Barcelona Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-es-bcn-diagonal-mar-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-es-bcn-diagonal-mar-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-es-bcn-diagonal-mar-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 51600,
      "insuranceAnnual": 25800,
      "maintenanceAnnual": 43000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 17200
    },
    "assignedManager": {
      "id": "mgr-prop-es-bcn-diagonal-mar",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 50,
      "occupiedUnits": 49,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-ES-1060",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-es-val-arts-sciences",
    "slug": "valencia-city-of-arts-residences",
    "title": "Turia Garden City Residences",
    "headline": "Modern apartments overlooking Turia River Park and City of Arts and Sciences",
    "description": "Valencia's most dynamic residential area with high family and expat demand and affordable operating expenses.",
    "city": "Valencia",
    "country": "Spain",
    "countryCode": "ES",
    "address": "Avenida de Francia, Valencia",
    "category": "residential",
    "developer": "Metrovacesa",
    "yearBuilt": 2023,
    "totalAreaSqFt": 52000,
    "totalValuation": 4900000,
    "sharePrice": 50,
    "netYield": 8.5,
    "grossYield": 10.1,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 98000,
    "availableShares": 11368,
    "fundedPercentage": 88.4,
    "estimatedMonthlyRent": 41242,
    "monthlyPerShareRent": 0.421,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4978400,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 94,
      "propertyCondition": 97,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4557000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 4655000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 4753000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 4851000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 4900000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4909800,
        "mid": 4929400,
        "high": 4953900
      },
      {
        "month": "Jan 2027",
        "low": 4924500,
        "mid": 4958800,
        "high": 4993100
      },
      {
        "month": "Feb 2027",
        "low": 4944100,
        "mid": 4988200,
        "high": 5037200
      },
      {
        "month": "Mar 2027",
        "low": 4963700,
        "mid": 5022500,
        "high": 5081300
      },
      {
        "month": "Apr 2027",
        "low": 4988200,
        "mid": 5056800,
        "high": 5130300
      },
      {
        "month": "May 2027",
        "low": 5012700,
        "mid": 5096000,
        "high": 5184200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 40642,
        "expenses": 6186,
        "netDistributed": 34456,
        "payoutPerShare": 0.352
      },
      {
        "month": "Jul 2026",
        "grossCollected": 41042,
        "expenses": 6186,
        "netDistributed": 34856,
        "payoutPerShare": 0.356
      },
      {
        "month": "Aug 2026",
        "grossCollected": 41242,
        "expenses": 6186,
        "netDistributed": 35056,
        "payoutPerShare": 0.421
      },
      {
        "month": "Sep 2026",
        "grossCollected": 41242,
        "expenses": 6186,
        "netDistributed": 35056,
        "payoutPerShare": 0.421
      },
      {
        "month": "Oct 2026",
        "grossCollected": 41242,
        "expenses": 6186,
        "netDistributed": 35056,
        "payoutPerShare": 0.421
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-es-val-arts-sciences-01",
        "category": "Legal & Title",
        "title": "Spain Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Valencia Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-es-val-arts-sciences-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-es-val-arts-sciences-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-es-val-arts-sciences-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 29400,
      "insuranceAnnual": 14700,
      "maintenanceAnnual": 24500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9800
    },
    "assignedManager": {
      "id": "mgr-prop-es-val-arts-sciences",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 43,
      "occupiedUnits": 43,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-ES-1061",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-es-agp-costa-del-sol",
    "slug": "malaga-tech-park-villas",
    "title": "Costa del Sol Innovation Villas",
    "headline": "Contemporary smart villas in Malaga's booming European Silicon Valley tech hub",
    "description": "Leased to software executives and remote executives relocating to southern Spain for year-round sun.",
    "city": "Malaga",
    "country": "Spain",
    "countryCode": "ES",
    "address": "Muelle Uno Promenade, Malaga",
    "category": "villa",
    "developer": "Andalucia Prime Properties",
    "yearBuilt": 2023,
    "totalAreaSqFt": 45000,
    "totalValuation": 5800000,
    "sharePrice": 65,
    "netYield": 8.3,
    "grossYield": 9.9,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 89231,
    "availableShares": 4105,
    "fundedPercentage": 95.4,
    "estimatedMonthlyRent": 47850,
    "monthlyPerShareRent": 0.536,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5939200,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 95,
      "propertyCondition": 98,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5394000,
        "sharePrice": 60.5
      },
      {
        "date": "2026-02",
        "value": 5510000,
        "sharePrice": 61.8
      },
      {
        "date": "2026-05",
        "value": 5626000,
        "sharePrice": 63
      },
      {
        "date": "2026-08",
        "value": 5742000,
        "sharePrice": 64.3
      },
      {
        "date": "2026-11",
        "value": 5800000,
        "sharePrice": 65
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5811600,
        "mid": 5834800,
        "high": 5863800
      },
      {
        "month": "Jan 2027",
        "low": 5829000,
        "mid": 5869600,
        "high": 5910200
      },
      {
        "month": "Feb 2027",
        "low": 5852200,
        "mid": 5904400,
        "high": 5962400
      },
      {
        "month": "Mar 2027",
        "low": 5875400,
        "mid": 5945000,
        "high": 6014600
      },
      {
        "month": "Apr 2027",
        "low": 5904400,
        "mid": 5985600,
        "high": 6072600
      },
      {
        "month": "May 2027",
        "low": 5933400,
        "mid": 6032000,
        "high": 6136400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 47250,
        "expenses": 7178,
        "netDistributed": 40072,
        "payoutPerShare": 0.449
      },
      {
        "month": "Jul 2026",
        "grossCollected": 47650,
        "expenses": 7178,
        "netDistributed": 40472,
        "payoutPerShare": 0.454
      },
      {
        "month": "Aug 2026",
        "grossCollected": 47850,
        "expenses": 7178,
        "netDistributed": 40672,
        "payoutPerShare": 0.536
      },
      {
        "month": "Sep 2026",
        "grossCollected": 47850,
        "expenses": 7178,
        "netDistributed": 40672,
        "payoutPerShare": 0.536
      },
      {
        "month": "Oct 2026",
        "grossCollected": 47850,
        "expenses": 7178,
        "netDistributed": 40672,
        "payoutPerShare": 0.536
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-es-agp-costa-del-sol-01",
        "category": "Legal & Title",
        "title": "Spain Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Malaga Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-es-agp-costa-del-sol-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-es-agp-costa-del-sol-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-es-agp-costa-del-sol-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 34800,
      "insuranceAnnual": 17400,
      "maintenanceAnnual": 29000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11600
    },
    "assignedManager": {
      "id": "mgr-prop-es-agp-costa-del-sol",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-ES-1062",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-tr-ist-bosphorus",
    "slug": "bosphorus-bebek-waterfront-mansion",
    "title": "Bosphorus Bebek Heritage Suites",
    "headline": "Ultra-luxury waterfront residences with direct Bosphorus Strait maritime panoramas",
    "description": "Situated in Bebek, Istanbul's most prestigious European coastal enclave. Features private yacht mooring.",
    "city": "Istanbul",
    "country": "Turkey",
    "countryCode": "TR",
    "address": "Cevdet Pasa Caddesi, Bebek, Istanbul",
    "category": "waterfront",
    "developer": "Sinpas Bosphorus",
    "yearBuilt": 2021,
    "totalAreaSqFt": 52000,
    "totalValuation": 7800000,
    "sharePrice": 80,
    "netYield": 9.3,
    "grossYield": 11.1,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 97500,
    "availableShares": 20085,
    "fundedPercentage": 79.4,
    "estimatedMonthlyRent": 72150,
    "monthlyPerShareRent": 0.74,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7612800,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 96,
      "propertyCondition": 99,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 7254000,
        "sharePrice": 74.4
      },
      {
        "date": "2026-02",
        "value": 7410000,
        "sharePrice": 76
      },
      {
        "date": "2026-05",
        "value": 7566000,
        "sharePrice": 77.6
      },
      {
        "date": "2026-08",
        "value": 7722000,
        "sharePrice": 79.2
      },
      {
        "date": "2026-11",
        "value": 7800000,
        "sharePrice": 80
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7815600,
        "mid": 7846800,
        "high": 7885800
      },
      {
        "month": "Jan 2027",
        "low": 7839000,
        "mid": 7893600,
        "high": 7948200
      },
      {
        "month": "Feb 2027",
        "low": 7870200,
        "mid": 7940400,
        "high": 8018400
      },
      {
        "month": "Mar 2027",
        "low": 7901400,
        "mid": 7995000,
        "high": 8088600
      },
      {
        "month": "Apr 2027",
        "low": 7940400,
        "mid": 8049600,
        "high": 8166600
      },
      {
        "month": "May 2027",
        "low": 7979400,
        "mid": 8112000,
        "high": 8252400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 71550,
        "expenses": 10823,
        "netDistributed": 60727,
        "payoutPerShare": 0.623
      },
      {
        "month": "Jul 2026",
        "grossCollected": 71950,
        "expenses": 10823,
        "netDistributed": 61127,
        "payoutPerShare": 0.627
      },
      {
        "month": "Aug 2026",
        "grossCollected": 72150,
        "expenses": 10823,
        "netDistributed": 61327,
        "payoutPerShare": 0.74
      },
      {
        "month": "Sep 2026",
        "grossCollected": 72150,
        "expenses": 10823,
        "netDistributed": 61327,
        "payoutPerShare": 0.74
      },
      {
        "month": "Oct 2026",
        "grossCollected": 72150,
        "expenses": 10823,
        "netDistributed": 61327,
        "payoutPerShare": 0.74
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-tr-ist-bosphorus-01",
        "category": "Legal & Title",
        "title": "Turkey Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Istanbul Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-tr-ist-bosphorus-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-tr-ist-bosphorus-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-tr-ist-bosphorus-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 46800,
      "insuranceAnnual": 23400,
      "maintenanceAnnual": 39000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 15600
    },
    "assignedManager": {
      "id": "mgr-prop-tr-ist-bosphorus",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 43,
      "occupiedUnits": 42,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-TR-1063",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-tr-ist-levent-financial",
    "slug": "istanbul-levent-commercial-tower",
    "title": "Levent Financial Pinnacle",
    "headline": "Grade-A corporate office tower in Istanbul's primary central business district with direct metro link",
    "description": "Multinational bank regional headquarters and legal firms with USD/Euro pegged corporate leases.",
    "city": "Istanbul",
    "country": "Turkey",
    "countryCode": "TR",
    "address": "Buyukdere Caddesi, Levent, Istanbul",
    "category": "office",
    "developer": "Is GYO Development",
    "yearBuilt": 2022,
    "totalAreaSqFt": 84000,
    "totalValuation": 9400000,
    "sharePrice": 90,
    "netYield": 9.7,
    "grossYield": 11.5,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 104444,
    "availableShares": 14204,
    "fundedPercentage": 86.4,
    "estimatedMonthlyRent": 90083,
    "monthlyPerShareRent": 0.863,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 9249600,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 97,
      "propertyCondition": 92,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 8742000,
        "sharePrice": 83.7
      },
      {
        "date": "2026-02",
        "value": 8930000,
        "sharePrice": 85.5
      },
      {
        "date": "2026-05",
        "value": 9118000,
        "sharePrice": 87.3
      },
      {
        "date": "2026-08",
        "value": 9306000,
        "sharePrice": 89.1
      },
      {
        "date": "2026-11",
        "value": 9400000,
        "sharePrice": 90
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 9418800,
        "mid": 9456400,
        "high": 9503400
      },
      {
        "month": "Jan 2027",
        "low": 9447000,
        "mid": 9512800,
        "high": 9578600
      },
      {
        "month": "Feb 2027",
        "low": 9484600,
        "mid": 9569200,
        "high": 9663200
      },
      {
        "month": "Mar 2027",
        "low": 9522200,
        "mid": 9635000,
        "high": 9747800
      },
      {
        "month": "Apr 2027",
        "low": 9569200,
        "mid": 9700800,
        "high": 9841800
      },
      {
        "month": "May 2027",
        "low": 9616200,
        "mid": 9776000,
        "high": 9945200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 89483,
        "expenses": 13512,
        "netDistributed": 75971,
        "payoutPerShare": 0.727
      },
      {
        "month": "Jul 2026",
        "grossCollected": 89883,
        "expenses": 13512,
        "netDistributed": 76371,
        "payoutPerShare": 0.731
      },
      {
        "month": "Aug 2026",
        "grossCollected": 90083,
        "expenses": 13512,
        "netDistributed": 76571,
        "payoutPerShare": 0.863
      },
      {
        "month": "Sep 2026",
        "grossCollected": 90083,
        "expenses": 13512,
        "netDistributed": 76571,
        "payoutPerShare": 0.863
      },
      {
        "month": "Oct 2026",
        "grossCollected": 90083,
        "expenses": 13512,
        "netDistributed": 76571,
        "payoutPerShare": 0.863
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-tr-ist-levent-financial-01",
        "category": "Legal & Title",
        "title": "Turkey Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Istanbul Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-tr-ist-levent-financial-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-tr-ist-levent-financial-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-tr-ist-levent-financial-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 56400,
      "insuranceAnnual": 28200,
      "maintenanceAnnual": 47000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 18800
    },
    "assignedManager": {
      "id": "mgr-prop-tr-ist-levent-financial",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 70,
      "occupiedUnits": 67,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-TR-1064",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-tr-ayt-lara-beach",
    "slug": "antalya-lara-beachfront-resort",
    "title": "Antalya Turquoise Coast Resort",
    "headline": "Serviced holiday suites along Lara Beach benefiting from year-round European and Gulf tourism",
    "description": "Fully managed beachfront hospitality with private pools, spa, and high seasonal dividend distributions.",
    "city": "Antalya",
    "country": "Turkey",
    "countryCode": "TR",
    "address": "Lara Caddesi, Muratpasa, Antalya",
    "category": "hospitality",
    "developer": "Rixos & Emaar Turkey",
    "yearBuilt": 2022,
    "totalAreaSqFt": 64000,
    "totalValuation": 5600000,
    "sharePrice": 55,
    "netYield": 10.1,
    "grossYield": 12,
    "occupancyRate": 95,
    "coverImage": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 101818,
    "availableShares": 6720,
    "fundedPercentage": 93.4,
    "estimatedMonthlyRent": 56000,
    "monthlyPerShareRent": 0.55,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5555200,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 98,
      "propertyCondition": 93,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5208000,
        "sharePrice": 51.2
      },
      {
        "date": "2026-02",
        "value": 5320000,
        "sharePrice": 52.3
      },
      {
        "date": "2026-05",
        "value": 5432000,
        "sharePrice": 53.4
      },
      {
        "date": "2026-08",
        "value": 5544000,
        "sharePrice": 54.5
      },
      {
        "date": "2026-11",
        "value": 5600000,
        "sharePrice": 55
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5611200,
        "mid": 5633600,
        "high": 5661600
      },
      {
        "month": "Jan 2027",
        "low": 5628000,
        "mid": 5667200,
        "high": 5706400
      },
      {
        "month": "Feb 2027",
        "low": 5650400,
        "mid": 5700800,
        "high": 5756800
      },
      {
        "month": "Mar 2027",
        "low": 5672800,
        "mid": 5740000,
        "high": 5807200
      },
      {
        "month": "Apr 2027",
        "low": 5700800,
        "mid": 5779200,
        "high": 5863200
      },
      {
        "month": "May 2027",
        "low": 5728800,
        "mid": 5824000,
        "high": 5924800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 55400,
        "expenses": 8400,
        "netDistributed": 47000,
        "payoutPerShare": 0.462
      },
      {
        "month": "Jul 2026",
        "grossCollected": 55800,
        "expenses": 8400,
        "netDistributed": 47400,
        "payoutPerShare": 0.466
      },
      {
        "month": "Aug 2026",
        "grossCollected": 56000,
        "expenses": 8400,
        "netDistributed": 47600,
        "payoutPerShare": 0.55
      },
      {
        "month": "Sep 2026",
        "grossCollected": 56000,
        "expenses": 8400,
        "netDistributed": 47600,
        "payoutPerShare": 0.55
      },
      {
        "month": "Oct 2026",
        "grossCollected": 56000,
        "expenses": 8400,
        "netDistributed": 47600,
        "payoutPerShare": 0.55
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-tr-ayt-lara-beach-01",
        "category": "Legal & Title",
        "title": "Turkey Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Antalya Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-tr-ayt-lara-beach-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-tr-ayt-lara-beach-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-tr-ayt-lara-beach-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 33600,
      "insuranceAnnual": 16800,
      "maintenanceAnnual": 28000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11200
    },
    "assignedManager": {
      "id": "mgr-prop-tr-ayt-lara-beach",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 53,
      "occupiedUnits": 50,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-TR-1065",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-tr-ank-cankaya-diplomatic",
    "slug": "ankara-cankaya-diplomatic-flats",
    "title": "Cankaya Diplomatic Heights",
    "headline": "Modern residential apartments in Ankara's prestigious government and embassy district",
    "description": "Long-term tenancies with foreign diplomatic missions and international trade delegates.",
    "city": "Ankara",
    "country": "Turkey",
    "countryCode": "TR",
    "address": "Cankaya Caddesi, Ankara",
    "category": "residential",
    "developer": "Ankara Urban Insaat",
    "yearBuilt": 2022,
    "totalAreaSqFt": 46000,
    "totalValuation": 3700000,
    "sharePrice": 40,
    "netYield": 9.5,
    "grossYield": 11.2,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 92500,
    "availableShares": 20905,
    "fundedPercentage": 77.4,
    "estimatedMonthlyRent": 34533,
    "monthlyPerShareRent": 0.373,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 3700000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 88,
      "propertyCondition": 94,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3441000,
        "sharePrice": 37.2
      },
      {
        "date": "2026-02",
        "value": 3515000,
        "sharePrice": 38
      },
      {
        "date": "2026-05",
        "value": 3589000,
        "sharePrice": 38.8
      },
      {
        "date": "2026-08",
        "value": 3663000,
        "sharePrice": 39.6
      },
      {
        "date": "2026-11",
        "value": 3700000,
        "sharePrice": 40
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 3707400,
        "mid": 3722200,
        "high": 3740700
      },
      {
        "month": "Jan 2027",
        "low": 3718500,
        "mid": 3744400,
        "high": 3770300
      },
      {
        "month": "Feb 2027",
        "low": 3733300,
        "mid": 3766600,
        "high": 3803600
      },
      {
        "month": "Mar 2027",
        "low": 3748100,
        "mid": 3792500,
        "high": 3836900
      },
      {
        "month": "Apr 2027",
        "low": 3766600,
        "mid": 3818400,
        "high": 3873900
      },
      {
        "month": "May 2027",
        "low": 3785100,
        "mid": 3848000,
        "high": 3914600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 33933,
        "expenses": 5180,
        "netDistributed": 28753,
        "payoutPerShare": 0.311
      },
      {
        "month": "Jul 2026",
        "grossCollected": 34333,
        "expenses": 5180,
        "netDistributed": 29153,
        "payoutPerShare": 0.315
      },
      {
        "month": "Aug 2026",
        "grossCollected": 34533,
        "expenses": 5180,
        "netDistributed": 29353,
        "payoutPerShare": 0.373
      },
      {
        "month": "Sep 2026",
        "grossCollected": 34533,
        "expenses": 5180,
        "netDistributed": 29353,
        "payoutPerShare": 0.373
      },
      {
        "month": "Oct 2026",
        "grossCollected": 34533,
        "expenses": 5180,
        "netDistributed": 29353,
        "payoutPerShare": 0.373
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-tr-ank-cankaya-diplomatic-01",
        "category": "Legal & Title",
        "title": "Turkey Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Ankara Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-tr-ank-cankaya-diplomatic-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-tr-ank-cankaya-diplomatic-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-tr-ank-cankaya-diplomatic-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 22200,
      "insuranceAnnual": 11100,
      "maintenanceAnnual": 18500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 7400
    },
    "assignedManager": {
      "id": "mgr-prop-tr-ank-cankaya-diplomatic",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-TR-1066",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-my-kul-klcc-tower",
    "slug": "klcc-twin-towers-luxury-suites",
    "title": "KLCC Parkview Signature Suites",
    "headline": "Luxury apartments facing the iconic Petronas Twin Towers and KLCC landscaped park",
    "description": "Heart of Kuala Lumpur's golden triangle, favored by multinational petroleum and banking executives.",
    "city": "Kuala Lumpur",
    "country": "Malaysia",
    "countryCode": "MY",
    "address": "Jalan Ampang, KLCC, Kuala Lumpur",
    "category": "luxury",
    "developer": "KLCC Property Holdings",
    "yearBuilt": 2022,
    "totalAreaSqFt": 62000,
    "totalValuation": 6800000,
    "sharePrice": 65,
    "netYield": 8.8,
    "grossYield": 10.4,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 104615,
    "availableShares": 16320,
    "fundedPercentage": 84.4,
    "estimatedMonthlyRent": 58933,
    "monthlyPerShareRent": 0.563,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6854400,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 89,
      "propertyCondition": 95,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6324000,
        "sharePrice": 60.5
      },
      {
        "date": "2026-02",
        "value": 6460000,
        "sharePrice": 61.8
      },
      {
        "date": "2026-05",
        "value": 6596000,
        "sharePrice": 63
      },
      {
        "date": "2026-08",
        "value": 6732000,
        "sharePrice": 64.3
      },
      {
        "date": "2026-11",
        "value": 6800000,
        "sharePrice": 65
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6813600,
        "mid": 6840800,
        "high": 6874800
      },
      {
        "month": "Jan 2027",
        "low": 6834000,
        "mid": 6881600,
        "high": 6929200
      },
      {
        "month": "Feb 2027",
        "low": 6861200,
        "mid": 6922400,
        "high": 6990400
      },
      {
        "month": "Mar 2027",
        "low": 6888400,
        "mid": 6970000,
        "high": 7051600
      },
      {
        "month": "Apr 2027",
        "low": 6922400,
        "mid": 7017600,
        "high": 7119600
      },
      {
        "month": "May 2027",
        "low": 6956400,
        "mid": 7072000,
        "high": 7194400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 58333,
        "expenses": 8840,
        "netDistributed": 49493,
        "payoutPerShare": 0.473
      },
      {
        "month": "Jul 2026",
        "grossCollected": 58733,
        "expenses": 8840,
        "netDistributed": 49893,
        "payoutPerShare": 0.477
      },
      {
        "month": "Aug 2026",
        "grossCollected": 58933,
        "expenses": 8840,
        "netDistributed": 50093,
        "payoutPerShare": 0.563
      },
      {
        "month": "Sep 2026",
        "grossCollected": 58933,
        "expenses": 8840,
        "netDistributed": 50093,
        "payoutPerShare": 0.563
      },
      {
        "month": "Oct 2026",
        "grossCollected": 58933,
        "expenses": 8840,
        "netDistributed": 50093,
        "payoutPerShare": 0.563
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-my-kul-klcc-tower-01",
        "category": "Legal & Title",
        "title": "Malaysia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Kuala Lumpur Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-my-kul-klcc-tower-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-my-kul-klcc-tower-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-my-kul-klcc-tower-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 40800,
      "insuranceAnnual": 20400,
      "maintenanceAnnual": 34000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 13600
    },
    "assignedManager": {
      "id": "mgr-prop-my-kul-klcc-tower",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 52,
      "occupiedUnits": 51,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-MY-1067",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-my-kul-bukit-bintang",
    "slug": "bukit-bintang-pavilion-apartments",
    "title": "Pavilion Boulevard Residences",
    "headline": "Vibrant city center residences adjacent to Pavilion Shopping Mall and Bukit Bintang monorail",
    "description": "Exceptional retail and lifestyle footfall with strong short-term and long-term rental income.",
    "city": "Kuala Lumpur",
    "country": "Malaysia",
    "countryCode": "MY",
    "address": "Jalan Bukit Bintang, Kuala Lumpur",
    "category": "residential",
    "developer": "Pavilion Group",
    "yearBuilt": 2022,
    "totalAreaSqFt": 54000,
    "totalValuation": 5200000,
    "sharePrice": 50,
    "netYield": 9.1,
    "grossYield": 10.7,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 104000,
    "availableShares": 8944,
    "fundedPercentage": 91.4,
    "estimatedMonthlyRent": 46367,
    "monthlyPerShareRent": 0.446,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5283200,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 90,
      "propertyCondition": 96,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4836000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 4940000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 5044000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 5148000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 5200000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5210400,
        "mid": 5231200,
        "high": 5257200
      },
      {
        "month": "Jan 2027",
        "low": 5226000,
        "mid": 5262400,
        "high": 5298800
      },
      {
        "month": "Feb 2027",
        "low": 5246800,
        "mid": 5293600,
        "high": 5345600
      },
      {
        "month": "Mar 2027",
        "low": 5267600,
        "mid": 5330000,
        "high": 5392400
      },
      {
        "month": "Apr 2027",
        "low": 5293600,
        "mid": 5366400,
        "high": 5444400
      },
      {
        "month": "May 2027",
        "low": 5319600,
        "mid": 5408000,
        "high": 5501600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 45767,
        "expenses": 6955,
        "netDistributed": 38812,
        "payoutPerShare": 0.373
      },
      {
        "month": "Jul 2026",
        "grossCollected": 46167,
        "expenses": 6955,
        "netDistributed": 39212,
        "payoutPerShare": 0.377
      },
      {
        "month": "Aug 2026",
        "grossCollected": 46367,
        "expenses": 6955,
        "netDistributed": 39412,
        "payoutPerShare": 0.446
      },
      {
        "month": "Sep 2026",
        "grossCollected": 46367,
        "expenses": 6955,
        "netDistributed": 39412,
        "payoutPerShare": 0.446
      },
      {
        "month": "Oct 2026",
        "grossCollected": 46367,
        "expenses": 6955,
        "netDistributed": 39412,
        "payoutPerShare": 0.446
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-my-kul-bukit-bintang-01",
        "category": "Legal & Title",
        "title": "Malaysia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Kuala Lumpur Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-my-kul-bukit-bintang-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-my-kul-bukit-bintang-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-my-kul-bukit-bintang-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 31200,
      "insuranceAnnual": 15600,
      "maintenanceAnnual": 26000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 10400
    },
    "assignedManager": {
      "id": "mgr-prop-my-kul-bukit-bintang",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 45,
      "occupiedUnits": 44,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-MY-1068",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-my-pen-gurney-drive",
    "slug": "penang-gurney-drive-waterfront",
    "title": "Gurney Coastline Marine Vista",
    "headline": "Waterfront luxury condominiums along Penang's famous culinary and seaside promenade",
    "description": "Popular with international retirees, medical tourists, and multinational semiconductor executives in Penang.",
    "city": "Penang",
    "country": "Malaysia",
    "countryCode": "MY",
    "address": "Gurney Drive, George Town, Penang",
    "category": "waterfront",
    "developer": "E&O Eastern & Oriental",
    "yearBuilt": 2021,
    "totalAreaSqFt": 48000,
    "totalValuation": 4500000,
    "sharePrice": 45,
    "netYield": 8.6,
    "grossYield": 10.2,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 100000,
    "availableShares": 24600,
    "fundedPercentage": 75.4,
    "estimatedMonthlyRent": 38250,
    "monthlyPerShareRent": 0.383,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4608000,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 91,
      "propertyCondition": 97,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4185000,
        "sharePrice": 41.9
      },
      {
        "date": "2026-02",
        "value": 4275000,
        "sharePrice": 42.8
      },
      {
        "date": "2026-05",
        "value": 4365000,
        "sharePrice": 43.6
      },
      {
        "date": "2026-08",
        "value": 4455000,
        "sharePrice": 44.5
      },
      {
        "date": "2026-11",
        "value": 4500000,
        "sharePrice": 45
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4509000,
        "mid": 4527000,
        "high": 4549500
      },
      {
        "month": "Jan 2027",
        "low": 4522500,
        "mid": 4554000,
        "high": 4585500
      },
      {
        "month": "Feb 2027",
        "low": 4540500,
        "mid": 4581000,
        "high": 4626000
      },
      {
        "month": "Mar 2027",
        "low": 4558500,
        "mid": 4612500,
        "high": 4666500
      },
      {
        "month": "Apr 2027",
        "low": 4581000,
        "mid": 4644000,
        "high": 4711500
      },
      {
        "month": "May 2027",
        "low": 4603500,
        "mid": 4680000,
        "high": 4761000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 37650,
        "expenses": 5738,
        "netDistributed": 31912,
        "payoutPerShare": 0.319
      },
      {
        "month": "Jul 2026",
        "grossCollected": 38050,
        "expenses": 5738,
        "netDistributed": 32312,
        "payoutPerShare": 0.323
      },
      {
        "month": "Aug 2026",
        "grossCollected": 38250,
        "expenses": 5738,
        "netDistributed": 32512,
        "payoutPerShare": 0.383
      },
      {
        "month": "Sep 2026",
        "grossCollected": 38250,
        "expenses": 5738,
        "netDistributed": 32512,
        "payoutPerShare": 0.383
      },
      {
        "month": "Oct 2026",
        "grossCollected": 38250,
        "expenses": 5738,
        "netDistributed": 32512,
        "payoutPerShare": 0.383
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-my-pen-gurney-drive-01",
        "category": "Legal & Title",
        "title": "Malaysia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Penang Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-my-pen-gurney-drive-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-my-pen-gurney-drive-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-my-pen-gurney-drive-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 27000,
      "insuranceAnnual": 13500,
      "maintenanceAnnual": 22500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9000
    },
    "assignedManager": {
      "id": "mgr-prop-my-pen-gurney-drive",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 40,
      "occupiedUnits": 38,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-MY-1069",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-my-jhb-iskandar",
    "slug": "johor-bahru-iskandar-logistics-hub",
    "title": "Iskandar Cross-Border Logistics Center",
    "headline": "State-of-the-art freight warehouse serving direct supply chains into Singapore via Causeway link",
    "description": "100% capacity warehouse utilized by international electronics and consumer goods distributors.",
    "city": "Johor Bahru",
    "country": "Malaysia",
    "countryCode": "MY",
    "address": "Senai Airport City, Johor Bahru",
    "category": "logistics",
    "developer": "Iskandar Investment Berhad",
    "yearBuilt": 2023,
    "totalAreaSqFt": 115000,
    "totalValuation": 5400000,
    "sharePrice": 50,
    "netYield": 9.6,
    "grossYield": 11.4,
    "occupancyRate": 100,
    "coverImage": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 108000,
    "availableShares": 19008,
    "fundedPercentage": 82.4,
    "estimatedMonthlyRent": 51300,
    "monthlyPerShareRent": 0.475,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5270400,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 92,
      "propertyCondition": 98,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5022000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 5130000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 5238000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 5346000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 5400000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5410800,
        "mid": 5432400,
        "high": 5459400
      },
      {
        "month": "Jan 2027",
        "low": 5427000,
        "mid": 5464800,
        "high": 5502600
      },
      {
        "month": "Feb 2027",
        "low": 5448600,
        "mid": 5497200,
        "high": 5551200
      },
      {
        "month": "Mar 2027",
        "low": 5470200,
        "mid": 5535000,
        "high": 5599800
      },
      {
        "month": "Apr 2027",
        "low": 5497200,
        "mid": 5572800,
        "high": 5653800
      },
      {
        "month": "May 2027",
        "low": 5524200,
        "mid": 5616000,
        "high": 5713200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 50700,
        "expenses": 7695,
        "netDistributed": 43005,
        "payoutPerShare": 0.398
      },
      {
        "month": "Jul 2026",
        "grossCollected": 51100,
        "expenses": 7695,
        "netDistributed": 43405,
        "payoutPerShare": 0.402
      },
      {
        "month": "Aug 2026",
        "grossCollected": 51300,
        "expenses": 7695,
        "netDistributed": 43605,
        "payoutPerShare": 0.475
      },
      {
        "month": "Sep 2026",
        "grossCollected": 51300,
        "expenses": 7695,
        "netDistributed": 43605,
        "payoutPerShare": 0.475
      },
      {
        "month": "Oct 2026",
        "grossCollected": 51300,
        "expenses": 7695,
        "netDistributed": 43605,
        "payoutPerShare": 0.475
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-my-jhb-iskandar-01",
        "category": "Legal & Title",
        "title": "Malaysia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Johor Bahru Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-my-jhb-iskandar-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-my-jhb-iskandar-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-my-jhb-iskandar-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 32400,
      "insuranceAnnual": 16200,
      "maintenanceAnnual": 27000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 10800
    },
    "assignedManager": {
      "id": "mgr-prop-my-jhb-iskandar",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 96,
      "occupiedUnits": 96,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-MY-1070",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sg-sin-marina-bay",
    "slug": "marina-bay-financial-residences",
    "title": "Marina Bay Financial Suites",
    "headline": "Trophy residential asset in Singapore's premier financial center with Marina Bay Sands views",
    "description": "Singapore's most prestigious commercial hub with zero tenant default risk and exceptional sovereign stability.",
    "city": "Singapore",
    "country": "Singapore",
    "countryCode": "SG",
    "address": "Marina Boulevard, Marina Bay, Singapore",
    "category": "luxury",
    "developer": "CapitaLand & Keppel Land",
    "yearBuilt": 2022,
    "totalAreaSqFt": 65000,
    "totalValuation": 21500000,
    "sharePrice": 200,
    "netYield": 6.1,
    "grossYield": 7.3,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 107500,
    "availableShares": 11395,
    "fundedPercentage": 89.4,
    "estimatedMonthlyRent": 130792,
    "monthlyPerShareRent": 1.217,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 21156000,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 93,
      "propertyCondition": 99,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 19995000,
        "sharePrice": 186
      },
      {
        "date": "2026-02",
        "value": 20425000,
        "sharePrice": 190
      },
      {
        "date": "2026-05",
        "value": 20855000,
        "sharePrice": 194
      },
      {
        "date": "2026-08",
        "value": 21285000,
        "sharePrice": 198
      },
      {
        "date": "2026-11",
        "value": 21500000,
        "sharePrice": 200
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 21543000,
        "mid": 21629000,
        "high": 21736500
      },
      {
        "month": "Jan 2027",
        "low": 21607500,
        "mid": 21758000,
        "high": 21908500
      },
      {
        "month": "Feb 2027",
        "low": 21693500,
        "mid": 21887000,
        "high": 22102000
      },
      {
        "month": "Mar 2027",
        "low": 21779500,
        "mid": 22037500,
        "high": 22295500
      },
      {
        "month": "Apr 2027",
        "low": 21887000,
        "mid": 22188000,
        "high": 22510500
      },
      {
        "month": "May 2027",
        "low": 21994500,
        "mid": 22360000,
        "high": 22747000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 130192,
        "expenses": 19619,
        "netDistributed": 110573,
        "payoutPerShare": 1.029
      },
      {
        "month": "Jul 2026",
        "grossCollected": 130592,
        "expenses": 19619,
        "netDistributed": 110973,
        "payoutPerShare": 1.032
      },
      {
        "month": "Aug 2026",
        "grossCollected": 130792,
        "expenses": 19619,
        "netDistributed": 111173,
        "payoutPerShare": 1.217
      },
      {
        "month": "Sep 2026",
        "grossCollected": 130792,
        "expenses": 19619,
        "netDistributed": 111173,
        "payoutPerShare": 1.217
      },
      {
        "month": "Oct 2026",
        "grossCollected": 130792,
        "expenses": 19619,
        "netDistributed": 111173,
        "payoutPerShare": 1.217
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sg-sin-marina-bay-01",
        "category": "Legal & Title",
        "title": "Singapore Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Singapore Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sg-sin-marina-bay-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sg-sin-marina-bay-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sg-sin-marina-bay-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 129000,
      "insuranceAnnual": 64500,
      "maintenanceAnnual": 107500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 43000
    },
    "assignedManager": {
      "id": "mgr-prop-sg-sin-marina-bay",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 54,
      "occupiedUnits": 53,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SG-1071",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sg-sin-orchard",
    "slug": "orchard-boulevard-ultra-residences",
    "title": "Orchard Boulevard Canopy Residences",
    "headline": "Ultra-luxury condominium on Singapore's world-famous shopping belt surrounded by lush greenery",
    "description": "Favored by international family offices and diplomatic dignitaries with private elevators and private wine vaults.",
    "city": "Singapore",
    "country": "Singapore",
    "countryCode": "SG",
    "address": "Orchard Boulevard, Singapore",
    "category": "residential",
    "developer": "City Developments Limited (CDL)",
    "yearBuilt": 2021,
    "totalAreaSqFt": 52000,
    "totalValuation": 18200000,
    "sharePrice": 180,
    "netYield": 5.9,
    "grossYield": 7.1,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 101111,
    "availableShares": 3640,
    "fundedPercentage": 96.4,
    "estimatedMonthlyRent": 107683,
    "monthlyPerShareRent": 1.065,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 18054400,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 94,
      "propertyCondition": 92,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 16926000,
        "sharePrice": 167.4
      },
      {
        "date": "2026-02",
        "value": 17290000,
        "sharePrice": 171
      },
      {
        "date": "2026-05",
        "value": 17654000,
        "sharePrice": 174.6
      },
      {
        "date": "2026-08",
        "value": 18018000,
        "sharePrice": 178.2
      },
      {
        "date": "2026-11",
        "value": 18200000,
        "sharePrice": 180
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 18236400,
        "mid": 18309200,
        "high": 18400200
      },
      {
        "month": "Jan 2027",
        "low": 18291000,
        "mid": 18418400,
        "high": 18545800
      },
      {
        "month": "Feb 2027",
        "low": 18363800,
        "mid": 18527600,
        "high": 18709600
      },
      {
        "month": "Mar 2027",
        "low": 18436600,
        "mid": 18655000,
        "high": 18873400
      },
      {
        "month": "Apr 2027",
        "low": 18527600,
        "mid": 18782400,
        "high": 19055400
      },
      {
        "month": "May 2027",
        "low": 18618600,
        "mid": 18928000,
        "high": 19255600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 107083,
        "expenses": 16152,
        "netDistributed": 90931,
        "payoutPerShare": 0.899
      },
      {
        "month": "Jul 2026",
        "grossCollected": 107483,
        "expenses": 16152,
        "netDistributed": 91331,
        "payoutPerShare": 0.903
      },
      {
        "month": "Aug 2026",
        "grossCollected": 107683,
        "expenses": 16152,
        "netDistributed": 91531,
        "payoutPerShare": 1.065
      },
      {
        "month": "Sep 2026",
        "grossCollected": 107683,
        "expenses": 16152,
        "netDistributed": 91531,
        "payoutPerShare": 1.065
      },
      {
        "month": "Oct 2026",
        "grossCollected": 107683,
        "expenses": 16152,
        "netDistributed": 91531,
        "payoutPerShare": 1.065
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sg-sin-orchard-01",
        "category": "Legal & Title",
        "title": "Singapore Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Singapore Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sg-sin-orchard-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sg-sin-orchard-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sg-sin-orchard-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 109200,
      "insuranceAnnual": 54600,
      "maintenanceAnnual": 91000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 36400
    },
    "assignedManager": {
      "id": "mgr-prop-sg-sin-orchard",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 43,
      "occupiedUnits": 42,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SG-1072",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-sg-sin-jurong-innovation",
    "slug": "jurong-innovation-district-tech",
    "title": "Jurong CleanTech Commercial Hub",
    "headline": "Advanced manufacturing and clean technology lab workspaces in Singapore's western growth corridor",
    "description": "Equipped with robotics infrastructure, high electric power capacity, and direct MRT connectivity.",
    "city": "Singapore",
    "country": "Singapore",
    "countryCode": "SG",
    "address": "CleanTech Park, Jurong Innovation District",
    "category": "commercial",
    "developer": "JTC Corporation",
    "yearBuilt": 2023,
    "totalAreaSqFt": 88000,
    "totalValuation": 16800000,
    "sharePrice": 150,
    "netYield": 6.8,
    "grossYield": 8.1,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 112000,
    "availableShares": 21952,
    "fundedPercentage": 80.4,
    "estimatedMonthlyRent": 113400,
    "monthlyPerShareRent": 1.012,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 16800000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 95,
      "propertyCondition": 93,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 15624000,
        "sharePrice": 139.5
      },
      {
        "date": "2026-02",
        "value": 15960000,
        "sharePrice": 142.5
      },
      {
        "date": "2026-05",
        "value": 16296000,
        "sharePrice": 145.5
      },
      {
        "date": "2026-08",
        "value": 16632000,
        "sharePrice": 148.5
      },
      {
        "date": "2026-11",
        "value": 16800000,
        "sharePrice": 150
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 16833600,
        "mid": 16900800,
        "high": 16984800
      },
      {
        "month": "Jan 2027",
        "low": 16884000,
        "mid": 17001600,
        "high": 17119200
      },
      {
        "month": "Feb 2027",
        "low": 16951200,
        "mid": 17102400,
        "high": 17270400
      },
      {
        "month": "Mar 2027",
        "low": 17018400,
        "mid": 17220000,
        "high": 17421600
      },
      {
        "month": "Apr 2027",
        "low": 17102400,
        "mid": 17337600,
        "high": 17589600
      },
      {
        "month": "May 2027",
        "low": 17186400,
        "mid": 17472000,
        "high": 17774400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 112800,
        "expenses": 17010,
        "netDistributed": 95790,
        "payoutPerShare": 0.855
      },
      {
        "month": "Jul 2026",
        "grossCollected": 113200,
        "expenses": 17010,
        "netDistributed": 96190,
        "payoutPerShare": 0.859
      },
      {
        "month": "Aug 2026",
        "grossCollected": 113400,
        "expenses": 17010,
        "netDistributed": 96390,
        "payoutPerShare": 1.012
      },
      {
        "month": "Sep 2026",
        "grossCollected": 113400,
        "expenses": 17010,
        "netDistributed": 96390,
        "payoutPerShare": 1.012
      },
      {
        "month": "Oct 2026",
        "grossCollected": 113400,
        "expenses": 17010,
        "netDistributed": 96390,
        "payoutPerShare": 1.012
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-sg-sin-jurong-innovation-01",
        "category": "Legal & Title",
        "title": "Singapore Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Singapore Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-sg-sin-jurong-innovation-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-sg-sin-jurong-innovation-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-sg-sin-jurong-innovation-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 100800,
      "insuranceAnnual": 50400,
      "maintenanceAnnual": 84000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 33600
    },
    "assignedManager": {
      "id": "mgr-prop-sg-sin-jurong-innovation",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 73,
      "occupiedUnits": 71,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-SG-1073",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-jp-tyo-roppongi",
    "slug": "roppongi-hills-tokyo-residences",
    "title": "Roppongi Hills Sky Residences",
    "headline": "High-spec earthquake-engineered executive apartments in Minato with Tokyo Tower panoramas",
    "description": "Tokyo's premier international hub for tech executives, investment bankers, and creative leaders.",
    "city": "Tokyo",
    "country": "Japan",
    "countryCode": "JP",
    "address": "Roppongi, Minato-ku, Tokyo",
    "category": "luxury",
    "developer": "Mori Building Co.",
    "yearBuilt": 2022,
    "totalAreaSqFt": 56000,
    "totalValuation": 17200000,
    "sharePrice": 160,
    "netYield": 6.3,
    "grossYield": 7.5,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 107500,
    "availableShares": 13545,
    "fundedPercentage": 87.4,
    "estimatedMonthlyRent": 107500,
    "monthlyPerShareRent": 1,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 17337600,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 96,
      "propertyCondition": 94,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 15996000,
        "sharePrice": 148.8
      },
      {
        "date": "2026-02",
        "value": 16340000,
        "sharePrice": 152
      },
      {
        "date": "2026-05",
        "value": 16684000,
        "sharePrice": 155.2
      },
      {
        "date": "2026-08",
        "value": 17028000,
        "sharePrice": 158.4
      },
      {
        "date": "2026-11",
        "value": 17200000,
        "sharePrice": 160
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 17234400,
        "mid": 17303200,
        "high": 17389200
      },
      {
        "month": "Jan 2027",
        "low": 17286000,
        "mid": 17406400,
        "high": 17526800
      },
      {
        "month": "Feb 2027",
        "low": 17354800,
        "mid": 17509600,
        "high": 17681600
      },
      {
        "month": "Mar 2027",
        "low": 17423600,
        "mid": 17630000,
        "high": 17836400
      },
      {
        "month": "Apr 2027",
        "low": 17509600,
        "mid": 17750400,
        "high": 18008400
      },
      {
        "month": "May 2027",
        "low": 17595600,
        "mid": 17888000,
        "high": 18197600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 106900,
        "expenses": 16125,
        "netDistributed": 90775,
        "payoutPerShare": 0.844
      },
      {
        "month": "Jul 2026",
        "grossCollected": 107300,
        "expenses": 16125,
        "netDistributed": 91175,
        "payoutPerShare": 0.848
      },
      {
        "month": "Aug 2026",
        "grossCollected": 107500,
        "expenses": 16125,
        "netDistributed": 91375,
        "payoutPerShare": 1
      },
      {
        "month": "Sep 2026",
        "grossCollected": 107500,
        "expenses": 16125,
        "netDistributed": 91375,
        "payoutPerShare": 1
      },
      {
        "month": "Oct 2026",
        "grossCollected": 107500,
        "expenses": 16125,
        "netDistributed": 91375,
        "payoutPerShare": 1
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-jp-tyo-roppongi-01",
        "category": "Legal & Title",
        "title": "Japan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Tokyo Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-jp-tyo-roppongi-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-jp-tyo-roppongi-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-jp-tyo-roppongi-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 103200,
      "insuranceAnnual": 51600,
      "maintenanceAnnual": 86000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 34400
    },
    "assignedManager": {
      "id": "mgr-prop-jp-tyo-roppongi",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 47,
      "occupiedUnits": 47,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-JP-1074",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-jp-tyo-shinjuku",
    "slug": "shinjuku-skygate-commercial",
    "title": "Shinjuku West Skyscraper Offices",
    "headline": "Prime corporate commercial tower steps from the world's busiest railway hub at Shinjuku Station",
    "description": "Grade-A office asset occupied by Japanese conglomerates and global software consulting firms.",
    "city": "Tokyo",
    "country": "Japan",
    "countryCode": "JP",
    "address": "Nishi-Shinjuku, Shinjuku-ku, Tokyo",
    "category": "office",
    "developer": "Mitsui Fudosan",
    "yearBuilt": 2021,
    "totalAreaSqFt": 92000,
    "totalValuation": 19800000,
    "sharePrice": 175,
    "netYield": 6.5,
    "grossYield": 7.7,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 113143,
    "availableShares": 6336,
    "fundedPercentage": 94.4,
    "estimatedMonthlyRent": 127050,
    "monthlyPerShareRent": 1.123,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 20116800,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 97,
      "propertyCondition": 95,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 18414000,
        "sharePrice": 162.8
      },
      {
        "date": "2026-02",
        "value": 18810000,
        "sharePrice": 166.3
      },
      {
        "date": "2026-05",
        "value": 19206000,
        "sharePrice": 169.8
      },
      {
        "date": "2026-08",
        "value": 19602000,
        "sharePrice": 173.3
      },
      {
        "date": "2026-11",
        "value": 19800000,
        "sharePrice": 175
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 19839600,
        "mid": 19918800,
        "high": 20017800
      },
      {
        "month": "Jan 2027",
        "low": 19899000,
        "mid": 20037600,
        "high": 20176200
      },
      {
        "month": "Feb 2027",
        "low": 19978200,
        "mid": 20156400,
        "high": 20354400
      },
      {
        "month": "Mar 2027",
        "low": 20057400,
        "mid": 20295000,
        "high": 20532600
      },
      {
        "month": "Apr 2027",
        "low": 20156400,
        "mid": 20433600,
        "high": 20730600
      },
      {
        "month": "May 2027",
        "low": 20255400,
        "mid": 20592000,
        "high": 20948400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 126450,
        "expenses": 19058,
        "netDistributed": 107392,
        "payoutPerShare": 0.949
      },
      {
        "month": "Jul 2026",
        "grossCollected": 126850,
        "expenses": 19058,
        "netDistributed": 107792,
        "payoutPerShare": 0.953
      },
      {
        "month": "Aug 2026",
        "grossCollected": 127050,
        "expenses": 19058,
        "netDistributed": 107992,
        "payoutPerShare": 1.123
      },
      {
        "month": "Sep 2026",
        "grossCollected": 127050,
        "expenses": 19058,
        "netDistributed": 107992,
        "payoutPerShare": 1.123
      },
      {
        "month": "Oct 2026",
        "grossCollected": 127050,
        "expenses": 19058,
        "netDistributed": 107992,
        "payoutPerShare": 1.123
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-jp-tyo-shinjuku-01",
        "category": "Legal & Title",
        "title": "Japan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Tokyo Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-jp-tyo-shinjuku-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-jp-tyo-shinjuku-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-jp-tyo-shinjuku-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 118800,
      "insuranceAnnual": 59400,
      "maintenanceAnnual": 99000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 39600
    },
    "assignedManager": {
      "id": "mgr-prop-jp-tyo-shinjuku",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 77,
      "occupiedUnits": 75,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-JP-1075",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-jp-osa-umeda",
    "slug": "osaka-umeda-grand-apartments",
    "title": "Umeda Grand Sky Residences",
    "headline": "Modern apartments in Osaka's primary business node ahead of the 2025 World Expo expansion",
    "description": "Rapidly growing rental returns in Kansai region with direct connections to Kansai International Airport.",
    "city": "Osaka",
    "country": "Japan",
    "countryCode": "JP",
    "address": "Ofukacho, Kita-ku, Osaka",
    "category": "residential",
    "developer": "Hankyu Hanshin Properties",
    "yearBuilt": 2022,
    "totalAreaSqFt": 60000,
    "totalValuation": 9400000,
    "sharePrice": 90,
    "netYield": 7.1,
    "grossYield": 8.4,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 104444,
    "availableShares": 22560,
    "fundedPercentage": 78.4,
    "estimatedMonthlyRent": 65800,
    "monthlyPerShareRent": 0.63,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 9625600,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 98,
      "propertyCondition": 96,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 8742000,
        "sharePrice": 83.7
      },
      {
        "date": "2026-02",
        "value": 8930000,
        "sharePrice": 85.5
      },
      {
        "date": "2026-05",
        "value": 9118000,
        "sharePrice": 87.3
      },
      {
        "date": "2026-08",
        "value": 9306000,
        "sharePrice": 89.1
      },
      {
        "date": "2026-11",
        "value": 9400000,
        "sharePrice": 90
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 9418800,
        "mid": 9456400,
        "high": 9503400
      },
      {
        "month": "Jan 2027",
        "low": 9447000,
        "mid": 9512800,
        "high": 9578600
      },
      {
        "month": "Feb 2027",
        "low": 9484600,
        "mid": 9569200,
        "high": 9663200
      },
      {
        "month": "Mar 2027",
        "low": 9522200,
        "mid": 9635000,
        "high": 9747800
      },
      {
        "month": "Apr 2027",
        "low": 9569200,
        "mid": 9700800,
        "high": 9841800
      },
      {
        "month": "May 2027",
        "low": 9616200,
        "mid": 9776000,
        "high": 9945200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 65200,
        "expenses": 9870,
        "netDistributed": 55330,
        "payoutPerShare": 0.53
      },
      {
        "month": "Jul 2026",
        "grossCollected": 65600,
        "expenses": 9870,
        "netDistributed": 55730,
        "payoutPerShare": 0.534
      },
      {
        "month": "Aug 2026",
        "grossCollected": 65800,
        "expenses": 9870,
        "netDistributed": 55930,
        "payoutPerShare": 0.63
      },
      {
        "month": "Sep 2026",
        "grossCollected": 65800,
        "expenses": 9870,
        "netDistributed": 55930,
        "payoutPerShare": 0.63
      },
      {
        "month": "Oct 2026",
        "grossCollected": 65800,
        "expenses": 9870,
        "netDistributed": 55930,
        "payoutPerShare": 0.63
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-jp-osa-umeda-01",
        "category": "Legal & Title",
        "title": "Japan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Osaka Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-jp-osa-umeda-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-jp-osa-umeda-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-jp-osa-umeda-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 56400,
      "insuranceAnnual": 28200,
      "maintenanceAnnual": 47000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 18800
    },
    "assignedManager": {
      "id": "mgr-prop-jp-osa-umeda",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 50,
      "occupiedUnits": 49,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-JP-1076",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-jp-kyo-higashiyama",
    "slug": "kyoto-higashiyama-heritage-suites",
    "title": "Higashiyama Ryokan Suites",
    "headline": "Bespoke hospitality serviced suites blending traditional sukiya carpentry with modern luxury",
    "description": "Exclusive cultural heritage property near Kiyomizu-dera temple, generating high tourism yields.",
    "city": "Kyoto",
    "country": "Japan",
    "countryCode": "JP",
    "address": "Higashiyama-ku, Kyoto",
    "category": "hospitality",
    "developer": "Kyoto Traditional Estates",
    "yearBuilt": 2021,
    "totalAreaSqFt": 36000,
    "totalValuation": 7600000,
    "sharePrice": 95,
    "netYield": 8.2,
    "grossYield": 9.8,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 80000,
    "availableShares": 11680,
    "fundedPercentage": 85.4,
    "estimatedMonthlyRent": 62067,
    "monthlyPerShareRent": 0.776,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7417600,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 88,
      "propertyCondition": 97,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 7068000,
        "sharePrice": 88.4
      },
      {
        "date": "2026-02",
        "value": 7220000,
        "sharePrice": 90.3
      },
      {
        "date": "2026-05",
        "value": 7372000,
        "sharePrice": 92.1
      },
      {
        "date": "2026-08",
        "value": 7524000,
        "sharePrice": 94
      },
      {
        "date": "2026-11",
        "value": 7600000,
        "sharePrice": 95
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7615200,
        "mid": 7645600,
        "high": 7683600
      },
      {
        "month": "Jan 2027",
        "low": 7638000,
        "mid": 7691200,
        "high": 7744400
      },
      {
        "month": "Feb 2027",
        "low": 7668400,
        "mid": 7736800,
        "high": 7812800
      },
      {
        "month": "Mar 2027",
        "low": 7698800,
        "mid": 7790000,
        "high": 7881200
      },
      {
        "month": "Apr 2027",
        "low": 7736800,
        "mid": 7843200,
        "high": 7957200
      },
      {
        "month": "May 2027",
        "low": 7774800,
        "mid": 7904000,
        "high": 8040800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 61467,
        "expenses": 9310,
        "netDistributed": 52157,
        "payoutPerShare": 0.652
      },
      {
        "month": "Jul 2026",
        "grossCollected": 61867,
        "expenses": 9310,
        "netDistributed": 52557,
        "payoutPerShare": 0.657
      },
      {
        "month": "Aug 2026",
        "grossCollected": 62067,
        "expenses": 9310,
        "netDistributed": 52757,
        "payoutPerShare": 0.776
      },
      {
        "month": "Sep 2026",
        "grossCollected": 62067,
        "expenses": 9310,
        "netDistributed": 52757,
        "payoutPerShare": 0.776
      },
      {
        "month": "Oct 2026",
        "grossCollected": 62067,
        "expenses": 9310,
        "netDistributed": 52757,
        "payoutPerShare": 0.776
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-jp-kyo-higashiyama-01",
        "category": "Legal & Title",
        "title": "Japan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Kyoto Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-jp-kyo-higashiyama-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-jp-kyo-higashiyama-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-jp-kyo-higashiyama-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 45600,
      "insuranceAnnual": 22800,
      "maintenanceAnnual": 38000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 15200
    },
    "assignedManager": {
      "id": "mgr-prop-jp-kyo-higashiyama",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 30,
      "occupiedUnits": 29,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-JP-1077",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-th-bkk-sukhumvit",
    "slug": "bangkok-sukhumvit-luxury-tower",
    "title": "Sukhumvit 24 Sky Residences",
    "headline": "High-rise condominium steps from Phrom Phong BTS station and EmQuartier luxury district",
    "description": "Favored residence for Japanese and Western corporate expatriates with full leisure facilities and sky pool.",
    "city": "Bangkok",
    "country": "Thailand",
    "countryCode": "TH",
    "address": "Sukhumvit Soi 24, Khlong Toei, Bangkok",
    "category": "luxury",
    "developer": "Sansiri Public Co.",
    "yearBuilt": 2022,
    "totalAreaSqFt": 58000,
    "totalValuation": 6200000,
    "sharePrice": 60,
    "netYield": 8.4,
    "grossYield": 10,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 103333,
    "availableShares": 7853,
    "fundedPercentage": 92.4,
    "estimatedMonthlyRent": 51667,
    "monthlyPerShareRent": 0.5,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6100800,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 89,
      "propertyCondition": 98,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5766000,
        "sharePrice": 55.8
      },
      {
        "date": "2026-02",
        "value": 5890000,
        "sharePrice": 57
      },
      {
        "date": "2026-05",
        "value": 6014000,
        "sharePrice": 58.2
      },
      {
        "date": "2026-08",
        "value": 6138000,
        "sharePrice": 59.4
      },
      {
        "date": "2026-11",
        "value": 6200000,
        "sharePrice": 60
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6212400,
        "mid": 6237200,
        "high": 6268200
      },
      {
        "month": "Jan 2027",
        "low": 6231000,
        "mid": 6274400,
        "high": 6317800
      },
      {
        "month": "Feb 2027",
        "low": 6255800,
        "mid": 6311600,
        "high": 6373600
      },
      {
        "month": "Mar 2027",
        "low": 6280600,
        "mid": 6355000,
        "high": 6429400
      },
      {
        "month": "Apr 2027",
        "low": 6311600,
        "mid": 6398400,
        "high": 6491400
      },
      {
        "month": "May 2027",
        "low": 6342600,
        "mid": 6448000,
        "high": 6559600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 51067,
        "expenses": 7750,
        "netDistributed": 43317,
        "payoutPerShare": 0.419
      },
      {
        "month": "Jul 2026",
        "grossCollected": 51467,
        "expenses": 7750,
        "netDistributed": 43717,
        "payoutPerShare": 0.423
      },
      {
        "month": "Aug 2026",
        "grossCollected": 51667,
        "expenses": 7750,
        "netDistributed": 43917,
        "payoutPerShare": 0.5
      },
      {
        "month": "Sep 2026",
        "grossCollected": 51667,
        "expenses": 7750,
        "netDistributed": 43917,
        "payoutPerShare": 0.5
      },
      {
        "month": "Oct 2026",
        "grossCollected": 51667,
        "expenses": 7750,
        "netDistributed": 43917,
        "payoutPerShare": 0.5
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-th-bkk-sukhumvit-01",
        "category": "Legal & Title",
        "title": "Thailand Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Bangkok Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-th-bkk-sukhumvit-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-th-bkk-sukhumvit-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-th-bkk-sukhumvit-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 37200,
      "insuranceAnnual": 18600,
      "maintenanceAnnual": 31000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12400
    },
    "assignedManager": {
      "id": "mgr-prop-th-bkk-sukhumvit",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 48,
      "occupiedUnits": 47,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-TH-1078",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-th-bkk-sathorn",
    "slug": "sathorn-financial-workspace",
    "title": "Sathorn Financial Boulevard Offices",
    "headline": "Grade-A corporate office building in Bangkok's primary diplomatic and financial corridor",
    "description": "Multinational embassies, financial brokers, and regional tech firms with long-term lease covenants.",
    "city": "Bangkok",
    "country": "Thailand",
    "countryCode": "TH",
    "address": "South Sathorn Road, Bangkok",
    "category": "office",
    "developer": "Ananda Development",
    "yearBuilt": 2021,
    "totalAreaSqFt": 72000,
    "totalValuation": 7100000,
    "sharePrice": 70,
    "netYield": 8.7,
    "grossYield": 10.3,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 101429,
    "availableShares": 23937,
    "fundedPercentage": 76.4,
    "estimatedMonthlyRent": 60942,
    "monthlyPerShareRent": 0.601,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7043200,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 90,
      "propertyCondition": 99,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6603000,
        "sharePrice": 65.1
      },
      {
        "date": "2026-02",
        "value": 6745000,
        "sharePrice": 66.5
      },
      {
        "date": "2026-05",
        "value": 6887000,
        "sharePrice": 67.9
      },
      {
        "date": "2026-08",
        "value": 7029000,
        "sharePrice": 69.3
      },
      {
        "date": "2026-11",
        "value": 7100000,
        "sharePrice": 70
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7114200,
        "mid": 7142600,
        "high": 7178100
      },
      {
        "month": "Jan 2027",
        "low": 7135500,
        "mid": 7185200,
        "high": 7234900
      },
      {
        "month": "Feb 2027",
        "low": 7163900,
        "mid": 7227800,
        "high": 7298800
      },
      {
        "month": "Mar 2027",
        "low": 7192300,
        "mid": 7277500,
        "high": 7362700
      },
      {
        "month": "Apr 2027",
        "low": 7227800,
        "mid": 7327200,
        "high": 7433700
      },
      {
        "month": "May 2027",
        "low": 7263300,
        "mid": 7384000,
        "high": 7511800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 60342,
        "expenses": 9141,
        "netDistributed": 51201,
        "payoutPerShare": 0.505
      },
      {
        "month": "Jul 2026",
        "grossCollected": 60742,
        "expenses": 9141,
        "netDistributed": 51601,
        "payoutPerShare": 0.509
      },
      {
        "month": "Aug 2026",
        "grossCollected": 60942,
        "expenses": 9141,
        "netDistributed": 51801,
        "payoutPerShare": 0.601
      },
      {
        "month": "Sep 2026",
        "grossCollected": 60942,
        "expenses": 9141,
        "netDistributed": 51801,
        "payoutPerShare": 0.601
      },
      {
        "month": "Oct 2026",
        "grossCollected": 60942,
        "expenses": 9141,
        "netDistributed": 51801,
        "payoutPerShare": 0.601
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-th-bkk-sathorn-01",
        "category": "Legal & Title",
        "title": "Thailand Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Bangkok Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-th-bkk-sathorn-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-th-bkk-sathorn-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-th-bkk-sathorn-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 42600,
      "insuranceAnnual": 21300,
      "maintenanceAnnual": 35500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 14200
    },
    "assignedManager": {
      "id": "mgr-prop-th-bkk-sathorn",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 60,
      "occupiedUnits": 58,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-TH-1079",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-th-hkt-bang-tao",
    "slug": "phuket-bang-tao-beach-villas",
    "title": "Bang Tao Lagoon Ocean Villas",
    "headline": "Private tropical pool villas adjacent to Bang Tao Beach and Laguna Phuket golf courses",
    "description": "Strong international holiday rental yields managed by luxury resort operators with high winter returns.",
    "city": "Phuket",
    "country": "Thailand",
    "countryCode": "TH",
    "address": "Choeng Thale, Bang Tao, Phuket",
    "category": "villa",
    "developer": "Banyan Tree & Laguna Phuket",
    "yearBuilt": 2023,
    "totalAreaSqFt": 42000,
    "totalValuation": 5900000,
    "sharePrice": 65,
    "netYield": 9.2,
    "grossYield": 11,
    "occupancyRate": 94,
    "coverImage": "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 90769,
    "availableShares": 15068,
    "fundedPercentage": 83.4,
    "estimatedMonthlyRent": 54083,
    "monthlyPerShareRent": 0.596,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5900000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 91,
      "propertyCondition": 92,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5487000,
        "sharePrice": 60.5
      },
      {
        "date": "2026-02",
        "value": 5605000,
        "sharePrice": 61.8
      },
      {
        "date": "2026-05",
        "value": 5723000,
        "sharePrice": 63
      },
      {
        "date": "2026-08",
        "value": 5841000,
        "sharePrice": 64.3
      },
      {
        "date": "2026-11",
        "value": 5900000,
        "sharePrice": 65
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5911800,
        "mid": 5935400,
        "high": 5964900
      },
      {
        "month": "Jan 2027",
        "low": 5929500,
        "mid": 5970800,
        "high": 6012100
      },
      {
        "month": "Feb 2027",
        "low": 5953100,
        "mid": 6006200,
        "high": 6065200
      },
      {
        "month": "Mar 2027",
        "low": 5976700,
        "mid": 6047500,
        "high": 6118300
      },
      {
        "month": "Apr 2027",
        "low": 6006200,
        "mid": 6088800,
        "high": 6177300
      },
      {
        "month": "May 2027",
        "low": 6035700,
        "mid": 6136000,
        "high": 6242200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 53483,
        "expenses": 8112,
        "netDistributed": 45371,
        "payoutPerShare": 0.5
      },
      {
        "month": "Jul 2026",
        "grossCollected": 53883,
        "expenses": 8112,
        "netDistributed": 45771,
        "payoutPerShare": 0.504
      },
      {
        "month": "Aug 2026",
        "grossCollected": 54083,
        "expenses": 8112,
        "netDistributed": 45971,
        "payoutPerShare": 0.596
      },
      {
        "month": "Sep 2026",
        "grossCollected": 54083,
        "expenses": 8112,
        "netDistributed": 45971,
        "payoutPerShare": 0.596
      },
      {
        "month": "Oct 2026",
        "grossCollected": 54083,
        "expenses": 8112,
        "netDistributed": 45971,
        "payoutPerShare": 0.596
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-th-hkt-bang-tao-01",
        "category": "Legal & Title",
        "title": "Thailand Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Phuket Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-th-hkt-bang-tao-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-th-hkt-bang-tao-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-th-hkt-bang-tao-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 35400,
      "insuranceAnnual": 17700,
      "maintenanceAnnual": 29500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11800
    },
    "assignedManager": {
      "id": "mgr-prop-th-hkt-bang-tao",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 35,
      "occupiedUnits": 33,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-TH-1080",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-id-jkt-scbd",
    "slug": "jakarta-scbd-sudirman-tower",
    "title": "SCBD Sudirman Financial Suites",
    "headline": "Premier high-rise residence inside Jakarta's most prestigious Central Business District",
    "description": "Walk to Pacific Place and Bursa Efek Indonesia with top-tier international banking and diplomatic tenants.",
    "city": "Jakarta",
    "country": "Indonesia",
    "countryCode": "ID",
    "address": "Jalan Jendral Sudirman, SCBD, Jakarta",
    "category": "luxury",
    "developer": "Agung Podomoro Land",
    "yearBuilt": 2022,
    "totalAreaSqFt": 66000,
    "totalValuation": 6400000,
    "sharePrice": 60,
    "netYield": 8.9,
    "grossYield": 10.6,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 106667,
    "availableShares": 10240,
    "fundedPercentage": 90.4,
    "estimatedMonthlyRent": 56533,
    "monthlyPerShareRent": 0.53,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6451200,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 92,
      "propertyCondition": 93,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5952000,
        "sharePrice": 55.8
      },
      {
        "date": "2026-02",
        "value": 6080000,
        "sharePrice": 57
      },
      {
        "date": "2026-05",
        "value": 6208000,
        "sharePrice": 58.2
      },
      {
        "date": "2026-08",
        "value": 6336000,
        "sharePrice": 59.4
      },
      {
        "date": "2026-11",
        "value": 6400000,
        "sharePrice": 60
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6412800,
        "mid": 6438400,
        "high": 6470400
      },
      {
        "month": "Jan 2027",
        "low": 6432000,
        "mid": 6476800,
        "high": 6521600
      },
      {
        "month": "Feb 2027",
        "low": 6457600,
        "mid": 6515200,
        "high": 6579200
      },
      {
        "month": "Mar 2027",
        "low": 6483200,
        "mid": 6560000,
        "high": 6636800
      },
      {
        "month": "Apr 2027",
        "low": 6515200,
        "mid": 6604800,
        "high": 6700800
      },
      {
        "month": "May 2027",
        "low": 6547200,
        "mid": 6656000,
        "high": 6771200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 55933,
        "expenses": 8480,
        "netDistributed": 47453,
        "payoutPerShare": 0.445
      },
      {
        "month": "Jul 2026",
        "grossCollected": 56333,
        "expenses": 8480,
        "netDistributed": 47853,
        "payoutPerShare": 0.449
      },
      {
        "month": "Aug 2026",
        "grossCollected": 56533,
        "expenses": 8480,
        "netDistributed": 48053,
        "payoutPerShare": 0.53
      },
      {
        "month": "Sep 2026",
        "grossCollected": 56533,
        "expenses": 8480,
        "netDistributed": 48053,
        "payoutPerShare": 0.53
      },
      {
        "month": "Oct 2026",
        "grossCollected": 56533,
        "expenses": 8480,
        "netDistributed": 48053,
        "payoutPerShare": 0.53
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-id-jkt-scbd-01",
        "category": "Legal & Title",
        "title": "Indonesia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Jakarta Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-id-jkt-scbd-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-id-jkt-scbd-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-id-jkt-scbd-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 38400,
      "insuranceAnnual": 19200,
      "maintenanceAnnual": 32000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12800
    },
    "assignedManager": {
      "id": "mgr-prop-id-jkt-scbd",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 55,
      "occupiedUnits": 53,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-ID-1081",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-id-dps-seminyak",
    "slug": "bali-seminyak-coastal-villas",
    "title": "Seminyak Sunset Beach Villas",
    "headline": "Turnkey luxury pool villas situated moments from Seminyak's famous beach club boulevard",
    "description": "Year-round occupancy fueled by global remote professionals, digital creators, and wellness tourism.",
    "city": "Bali",
    "country": "Indonesia",
    "countryCode": "ID",
    "address": "Jalan Petitenget, Seminyak, Bali",
    "category": "villa",
    "developer": "Bali Prime Resorts",
    "yearBuilt": 2022,
    "totalAreaSqFt": 38000,
    "totalValuation": 4800000,
    "sharePrice": 50,
    "netYield": 10.4,
    "grossYield": 12.5,
    "occupancyRate": 95,
    "coverImage": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 96000,
    "availableShares": 2496,
    "fundedPercentage": 97.4,
    "estimatedMonthlyRent": 50000,
    "monthlyPerShareRent": 0.521,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4876800,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 93,
      "propertyCondition": 94,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4464000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 4560000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 4656000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 4752000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 4800000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4809600,
        "mid": 4828800,
        "high": 4852800
      },
      {
        "month": "Jan 2027",
        "low": 4824000,
        "mid": 4857600,
        "high": 4891200
      },
      {
        "month": "Feb 2027",
        "low": 4843200,
        "mid": 4886400,
        "high": 4934400
      },
      {
        "month": "Mar 2027",
        "low": 4862400,
        "mid": 4920000,
        "high": 4977600
      },
      {
        "month": "Apr 2027",
        "low": 4886400,
        "mid": 4953600,
        "high": 5025600
      },
      {
        "month": "May 2027",
        "low": 4910400,
        "mid": 4992000,
        "high": 5078400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 49400,
        "expenses": 7500,
        "netDistributed": 41900,
        "payoutPerShare": 0.436
      },
      {
        "month": "Jul 2026",
        "grossCollected": 49800,
        "expenses": 7500,
        "netDistributed": 42300,
        "payoutPerShare": 0.441
      },
      {
        "month": "Aug 2026",
        "grossCollected": 50000,
        "expenses": 7500,
        "netDistributed": 42500,
        "payoutPerShare": 0.521
      },
      {
        "month": "Sep 2026",
        "grossCollected": 50000,
        "expenses": 7500,
        "netDistributed": 42500,
        "payoutPerShare": 0.521
      },
      {
        "month": "Oct 2026",
        "grossCollected": 50000,
        "expenses": 7500,
        "netDistributed": 42500,
        "payoutPerShare": 0.521
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-id-dps-seminyak-01",
        "category": "Legal & Title",
        "title": "Indonesia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Bali Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-id-dps-seminyak-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-id-dps-seminyak-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-id-dps-seminyak-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 28800,
      "insuranceAnnual": 14400,
      "maintenanceAnnual": 24000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9600
    },
    "assignedManager": {
      "id": "mgr-prop-id-dps-seminyak",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 32,
      "occupiedUnits": 30,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-ID-1082",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-id-sub-logistics",
    "slug": "surabaya-tanjung-perak-logistics",
    "title": "Tanjung Perak Port Logistics Hub",
    "headline": "Strategic maritime container warehouse adjacent to Eastern Java's largest shipping gateway",
    "description": "Leased to FMCG manufacturers and agricultural export syndicates under 5-year commercial terms.",
    "city": "Surabaya",
    "country": "Indonesia",
    "countryCode": "ID",
    "address": "Pelabuhan Tanjung Perak, Surabaya",
    "category": "logistics",
    "developer": "Pelindo Logistics Hubs",
    "yearBuilt": 2023,
    "totalAreaSqFt": 110000,
    "totalValuation": 4300000,
    "sharePrice": 40,
    "netYield": 9.8,
    "grossYield": 11.7,
    "occupancyRate": 100,
    "coverImage": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 107500,
    "availableShares": 19995,
    "fundedPercentage": 81.4,
    "estimatedMonthlyRent": 41925,
    "monthlyPerShareRent": 0.39,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4403200,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 94,
      "propertyCondition": 95,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3999000,
        "sharePrice": 37.2
      },
      {
        "date": "2026-02",
        "value": 4085000,
        "sharePrice": 38
      },
      {
        "date": "2026-05",
        "value": 4171000,
        "sharePrice": 38.8
      },
      {
        "date": "2026-08",
        "value": 4257000,
        "sharePrice": 39.6
      },
      {
        "date": "2026-11",
        "value": 4300000,
        "sharePrice": 40
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4308600,
        "mid": 4325800,
        "high": 4347300
      },
      {
        "month": "Jan 2027",
        "low": 4321500,
        "mid": 4351600,
        "high": 4381700
      },
      {
        "month": "Feb 2027",
        "low": 4338700,
        "mid": 4377400,
        "high": 4420400
      },
      {
        "month": "Mar 2027",
        "low": 4355900,
        "mid": 4407500,
        "high": 4459100
      },
      {
        "month": "Apr 2027",
        "low": 4377400,
        "mid": 4437600,
        "high": 4502100
      },
      {
        "month": "May 2027",
        "low": 4398900,
        "mid": 4472000,
        "high": 4549400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 41325,
        "expenses": 6289,
        "netDistributed": 35036,
        "payoutPerShare": 0.326
      },
      {
        "month": "Jul 2026",
        "grossCollected": 41725,
        "expenses": 6289,
        "netDistributed": 35436,
        "payoutPerShare": 0.33
      },
      {
        "month": "Aug 2026",
        "grossCollected": 41925,
        "expenses": 6289,
        "netDistributed": 35636,
        "payoutPerShare": 0.39
      },
      {
        "month": "Sep 2026",
        "grossCollected": 41925,
        "expenses": 6289,
        "netDistributed": 35636,
        "payoutPerShare": 0.39
      },
      {
        "month": "Oct 2026",
        "grossCollected": 41925,
        "expenses": 6289,
        "netDistributed": 35636,
        "payoutPerShare": 0.39
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-id-sub-logistics-01",
        "category": "Legal & Title",
        "title": "Indonesia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Surabaya Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-id-sub-logistics-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-id-sub-logistics-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-id-sub-logistics-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 25800,
      "insuranceAnnual": 12900,
      "maintenanceAnnual": 21500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 8600
    },
    "assignedManager": {
      "id": "mgr-prop-id-sub-logistics",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 92,
      "occupiedUnits": 92,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-ID-1083",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ch-zrh-bahnhofstrasse",
    "slug": "zurich-bahnhofstrasse-financial",
    "title": "Bahnhofstrasse Private Banking Suites",
    "headline": "Trophy commercial building in the heart of Zurich's prestigious banking and luxury shopping avenue",
    "description": "Swiss franc denominated institutional income with sovereign safety and zero default history.",
    "city": "Zurich",
    "country": "Switzerland",
    "countryCode": "CH",
    "address": "Bahnhofstrasse, Zurich",
    "category": "office",
    "developer": "Swiss Prime Site",
    "yearBuilt": 2021,
    "totalAreaSqFt": 48000,
    "totalValuation": 18500000,
    "sharePrice": 185,
    "netYield": 5.8,
    "grossYield": 6.9,
    "occupancyRate": 100,
    "coverImage": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 100000,
    "availableShares": 11600,
    "fundedPercentage": 88.4,
    "estimatedMonthlyRent": 106375,
    "monthlyPerShareRent": 1.064,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 18056000,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 95,
      "propertyCondition": 96,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 17205000,
        "sharePrice": 172.1
      },
      {
        "date": "2026-02",
        "value": 17575000,
        "sharePrice": 175.8
      },
      {
        "date": "2026-05",
        "value": 17945000,
        "sharePrice": 179.4
      },
      {
        "date": "2026-08",
        "value": 18315000,
        "sharePrice": 183.2
      },
      {
        "date": "2026-11",
        "value": 18500000,
        "sharePrice": 185
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 18537000,
        "mid": 18611000,
        "high": 18703500
      },
      {
        "month": "Jan 2027",
        "low": 18592500,
        "mid": 18722000,
        "high": 18851500
      },
      {
        "month": "Feb 2027",
        "low": 18666500,
        "mid": 18833000,
        "high": 19018000
      },
      {
        "month": "Mar 2027",
        "low": 18740500,
        "mid": 18962500,
        "high": 19184500
      },
      {
        "month": "Apr 2027",
        "low": 18833000,
        "mid": 19092000,
        "high": 19369500
      },
      {
        "month": "May 2027",
        "low": 18925500,
        "mid": 19240000,
        "high": 19573000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 105775,
        "expenses": 15956,
        "netDistributed": 89819,
        "payoutPerShare": 0.898
      },
      {
        "month": "Jul 2026",
        "grossCollected": 106175,
        "expenses": 15956,
        "netDistributed": 90219,
        "payoutPerShare": 0.902
      },
      {
        "month": "Aug 2026",
        "grossCollected": 106375,
        "expenses": 15956,
        "netDistributed": 90419,
        "payoutPerShare": 1.064
      },
      {
        "month": "Sep 2026",
        "grossCollected": 106375,
        "expenses": 15956,
        "netDistributed": 90419,
        "payoutPerShare": 1.064
      },
      {
        "month": "Oct 2026",
        "grossCollected": 106375,
        "expenses": 15956,
        "netDistributed": 90419,
        "payoutPerShare": 1.064
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ch-zrh-bahnhofstrasse-01",
        "category": "Legal & Title",
        "title": "Switzerland Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Zurich Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ch-zrh-bahnhofstrasse-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ch-zrh-bahnhofstrasse-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ch-zrh-bahnhofstrasse-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 111000,
      "insuranceAnnual": 55500,
      "maintenanceAnnual": 92500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 37000
    },
    "assignedManager": {
      "id": "mgr-prop-ch-zrh-bahnhofstrasse",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 40,
      "occupiedUnits": 40,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-CH-1084",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ch-gva-lake-geneva",
    "slug": "geneva-quai-wilson-residences",
    "title": "Quai Wilson Alpine Vista",
    "headline": "Waterfront residences overlooking Lake Geneva and the Jet d'Eau with Mont Blanc views",
    "description": "Home to international diplomats, UN delegates, and private banking executives.",
    "city": "Geneva",
    "country": "Switzerland",
    "countryCode": "CH",
    "address": "Quai Wilson, Geneva",
    "category": "waterfront",
    "developer": "Allreal Holding AG",
    "yearBuilt": 2022,
    "totalAreaSqFt": 44000,
    "totalValuation": 16900000,
    "sharePrice": 170,
    "netYield": 5.6,
    "grossYield": 6.7,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 99412,
    "availableShares": 4573,
    "fundedPercentage": 95.4,
    "estimatedMonthlyRent": 94358,
    "monthlyPerShareRent": 0.949,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 16629600,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 96,
      "propertyCondition": 97,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 15717000,
        "sharePrice": 158.1
      },
      {
        "date": "2026-02",
        "value": 16055000,
        "sharePrice": 161.5
      },
      {
        "date": "2026-05",
        "value": 16393000,
        "sharePrice": 164.9
      },
      {
        "date": "2026-08",
        "value": 16731000,
        "sharePrice": 168.3
      },
      {
        "date": "2026-11",
        "value": 16900000,
        "sharePrice": 170
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 16933800,
        "mid": 17001400,
        "high": 17085900
      },
      {
        "month": "Jan 2027",
        "low": 16984500,
        "mid": 17102800,
        "high": 17221100
      },
      {
        "month": "Feb 2027",
        "low": 17052100,
        "mid": 17204200,
        "high": 17373200
      },
      {
        "month": "Mar 2027",
        "low": 17119700,
        "mid": 17322500,
        "high": 17525300
      },
      {
        "month": "Apr 2027",
        "low": 17204200,
        "mid": 17440800,
        "high": 17694300
      },
      {
        "month": "May 2027",
        "low": 17288700,
        "mid": 17576000,
        "high": 17880200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 93758,
        "expenses": 14154,
        "netDistributed": 79604,
        "payoutPerShare": 0.801
      },
      {
        "month": "Jul 2026",
        "grossCollected": 94158,
        "expenses": 14154,
        "netDistributed": 80004,
        "payoutPerShare": 0.805
      },
      {
        "month": "Aug 2026",
        "grossCollected": 94358,
        "expenses": 14154,
        "netDistributed": 80204,
        "payoutPerShare": 0.949
      },
      {
        "month": "Sep 2026",
        "grossCollected": 94358,
        "expenses": 14154,
        "netDistributed": 80204,
        "payoutPerShare": 0.949
      },
      {
        "month": "Oct 2026",
        "grossCollected": 94358,
        "expenses": 14154,
        "netDistributed": 80204,
        "payoutPerShare": 0.949
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ch-gva-lake-geneva-01",
        "category": "Legal & Title",
        "title": "Switzerland Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Geneva Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ch-gva-lake-geneva-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ch-gva-lake-geneva-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ch-gva-lake-geneva-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 101400,
      "insuranceAnnual": 50700,
      "maintenanceAnnual": 84500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 33800
    },
    "assignedManager": {
      "id": "mgr-prop-ch-gva-lake-geneva",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 37,
      "occupiedUnits": 36,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-CH-1085",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-nl-ams-zuidas",
    "slug": "amsterdam-zuidas-financial-mile",
    "title": "Zuidas Financial Mile Tower",
    "headline": "BREEAM Outstanding eco-offices in Amsterdam's corporate hub near Schiphol Airport",
    "description": "Leased to European corporate headquarters, tech giants, and international advisory partnerships.",
    "city": "Amsterdam",
    "country": "Netherlands",
    "countryCode": "NL",
    "address": "Gustav Mahlerlaan, Zuidas, Amsterdam",
    "category": "office",
    "developer": "Edge Technologies & StateEra",
    "yearBuilt": 2022,
    "totalAreaSqFt": 78000,
    "totalValuation": 11900000,
    "sharePrice": 110,
    "netYield": 6.9,
    "grossYield": 8.2,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 108182,
    "availableShares": 22285,
    "fundedPercentage": 79.4,
    "estimatedMonthlyRent": 81317,
    "monthlyPerShareRent": 0.752,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 11804800,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 97,
      "propertyCondition": 98,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 11067000,
        "sharePrice": 102.3
      },
      {
        "date": "2026-02",
        "value": 11305000,
        "sharePrice": 104.5
      },
      {
        "date": "2026-05",
        "value": 11543000,
        "sharePrice": 106.7
      },
      {
        "date": "2026-08",
        "value": 11781000,
        "sharePrice": 108.9
      },
      {
        "date": "2026-11",
        "value": 11900000,
        "sharePrice": 110
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 11923800,
        "mid": 11971400,
        "high": 12030900
      },
      {
        "month": "Jan 2027",
        "low": 11959500,
        "mid": 12042800,
        "high": 12126100
      },
      {
        "month": "Feb 2027",
        "low": 12007100,
        "mid": 12114200,
        "high": 12233200
      },
      {
        "month": "Mar 2027",
        "low": 12054700,
        "mid": 12197500,
        "high": 12340300
      },
      {
        "month": "Apr 2027",
        "low": 12114200,
        "mid": 12280800,
        "high": 12459300
      },
      {
        "month": "May 2027",
        "low": 12173700,
        "mid": 12376000,
        "high": 12590200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 80717,
        "expenses": 12198,
        "netDistributed": 68519,
        "payoutPerShare": 0.633
      },
      {
        "month": "Jul 2026",
        "grossCollected": 81117,
        "expenses": 12198,
        "netDistributed": 68919,
        "payoutPerShare": 0.637
      },
      {
        "month": "Aug 2026",
        "grossCollected": 81317,
        "expenses": 12198,
        "netDistributed": 69119,
        "payoutPerShare": 0.752
      },
      {
        "month": "Sep 2026",
        "grossCollected": 81317,
        "expenses": 12198,
        "netDistributed": 69119,
        "payoutPerShare": 0.752
      },
      {
        "month": "Oct 2026",
        "grossCollected": 81317,
        "expenses": 12198,
        "netDistributed": 69119,
        "payoutPerShare": 0.752
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-nl-ams-zuidas-01",
        "category": "Legal & Title",
        "title": "Netherlands Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Amsterdam Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-nl-ams-zuidas-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-nl-ams-zuidas-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-nl-ams-zuidas-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 71400,
      "insuranceAnnual": 35700,
      "maintenanceAnnual": 59500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 23800
    },
    "assignedManager": {
      "id": "mgr-prop-nl-ams-zuidas",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 65,
      "occupiedUnits": 64,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-NL-1086",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-nl-rtm-kop-van-zuid",
    "slug": "rotterdam-kop-van-zuid-waterfront",
    "title": "Erasmus Bridge Portside Residences",
    "headline": "Architectural modern waterfront apartments along the Maas River in Rotterdam",
    "description": "Direct water taxi and metro connections, serving maritime and architectural professionals.",
    "city": "Rotterdam",
    "country": "Netherlands",
    "countryCode": "NL",
    "address": "Wilhelminakade, Rotterdam",
    "category": "waterfront",
    "developer": "OMA & Vesteda",
    "yearBuilt": 2022,
    "totalAreaSqFt": 54000,
    "totalValuation": 6700000,
    "sharePrice": 65,
    "netYield": 7.6,
    "grossYield": 9,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 103077,
    "availableShares": 14018,
    "fundedPercentage": 86.4,
    "estimatedMonthlyRent": 50250,
    "monthlyPerShareRent": 0.487,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6700000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 98,
      "propertyCondition": 99,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6231000,
        "sharePrice": 60.5
      },
      {
        "date": "2026-02",
        "value": 6365000,
        "sharePrice": 61.8
      },
      {
        "date": "2026-05",
        "value": 6499000,
        "sharePrice": 63
      },
      {
        "date": "2026-08",
        "value": 6633000,
        "sharePrice": 64.3
      },
      {
        "date": "2026-11",
        "value": 6700000,
        "sharePrice": 65
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6713400,
        "mid": 6740200,
        "high": 6773700
      },
      {
        "month": "Jan 2027",
        "low": 6733500,
        "mid": 6780400,
        "high": 6827300
      },
      {
        "month": "Feb 2027",
        "low": 6760300,
        "mid": 6820600,
        "high": 6887600
      },
      {
        "month": "Mar 2027",
        "low": 6787100,
        "mid": 6867500,
        "high": 6947900
      },
      {
        "month": "Apr 2027",
        "low": 6820600,
        "mid": 6914400,
        "high": 7014900
      },
      {
        "month": "May 2027",
        "low": 6854100,
        "mid": 6968000,
        "high": 7088600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 49650,
        "expenses": 7538,
        "netDistributed": 42112,
        "payoutPerShare": 0.409
      },
      {
        "month": "Jul 2026",
        "grossCollected": 50050,
        "expenses": 7538,
        "netDistributed": 42512,
        "payoutPerShare": 0.412
      },
      {
        "month": "Aug 2026",
        "grossCollected": 50250,
        "expenses": 7538,
        "netDistributed": 42712,
        "payoutPerShare": 0.487
      },
      {
        "month": "Sep 2026",
        "grossCollected": 50250,
        "expenses": 7538,
        "netDistributed": 42712,
        "payoutPerShare": 0.487
      },
      {
        "month": "Oct 2026",
        "grossCollected": 50250,
        "expenses": 7538,
        "netDistributed": 42712,
        "payoutPerShare": 0.487
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-nl-rtm-kop-van-zuid-01",
        "category": "Legal & Title",
        "title": "Netherlands Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Rotterdam Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-nl-rtm-kop-van-zuid-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-nl-rtm-kop-van-zuid-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-nl-rtm-kop-van-zuid-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 40200,
      "insuranceAnnual": 20100,
      "maintenanceAnnual": 33500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 13400
    },
    "assignedManager": {
      "id": "mgr-prop-nl-rtm-kop-van-zuid",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 45,
      "occupiedUnits": 44,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-NL-1087",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-kr-sel-gangnam",
    "slug": "gangnam-teheran-valley-suites",
    "title": "Gangnam Teheran Innovation Tower",
    "headline": "Smart executive residences in the center of Seoul's booming Teheran Valley tech ecosystem",
    "description": "Cutting-edge IoT smart home automation, sub-second fiber connections, and 24/7 fitness and spa.",
    "city": "Seoul",
    "country": "South Korea",
    "countryCode": "KR",
    "address": "Teheran-ro, Gangnam-gu, Seoul",
    "category": "luxury",
    "developer": "Hyundai Engineering & Construction",
    "yearBuilt": 2022,
    "totalAreaSqFt": 68000,
    "totalValuation": 14200000,
    "sharePrice": 135,
    "netYield": 6.7,
    "grossYield": 7.9,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 105185,
    "availableShares": 6942,
    "fundedPercentage": 93.4,
    "estimatedMonthlyRent": 93483,
    "monthlyPerShareRent": 0.889,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 14313600,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 88,
      "propertyCondition": 92,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 13206000,
        "sharePrice": 125.6
      },
      {
        "date": "2026-02",
        "value": 13490000,
        "sharePrice": 128.3
      },
      {
        "date": "2026-05",
        "value": 13774000,
        "sharePrice": 130.9
      },
      {
        "date": "2026-08",
        "value": 14058000,
        "sharePrice": 133.7
      },
      {
        "date": "2026-11",
        "value": 14200000,
        "sharePrice": 135
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 14228400,
        "mid": 14285200,
        "high": 14356200
      },
      {
        "month": "Jan 2027",
        "low": 14271000,
        "mid": 14370400,
        "high": 14469800
      },
      {
        "month": "Feb 2027",
        "low": 14327800,
        "mid": 14455600,
        "high": 14597600
      },
      {
        "month": "Mar 2027",
        "low": 14384600,
        "mid": 14555000,
        "high": 14725400
      },
      {
        "month": "Apr 2027",
        "low": 14455600,
        "mid": 14654400,
        "high": 14867400
      },
      {
        "month": "May 2027",
        "low": 14526600,
        "mid": 14768000,
        "high": 15023600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 92883,
        "expenses": 14022,
        "netDistributed": 78861,
        "payoutPerShare": 0.75
      },
      {
        "month": "Jul 2026",
        "grossCollected": 93283,
        "expenses": 14022,
        "netDistributed": 79261,
        "payoutPerShare": 0.754
      },
      {
        "month": "Aug 2026",
        "grossCollected": 93483,
        "expenses": 14022,
        "netDistributed": 79461,
        "payoutPerShare": 0.889
      },
      {
        "month": "Sep 2026",
        "grossCollected": 93483,
        "expenses": 14022,
        "netDistributed": 79461,
        "payoutPerShare": 0.889
      },
      {
        "month": "Oct 2026",
        "grossCollected": 93483,
        "expenses": 14022,
        "netDistributed": 79461,
        "payoutPerShare": 0.889
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-kr-sel-gangnam-01",
        "category": "Legal & Title",
        "title": "South Korea Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Seoul Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-kr-sel-gangnam-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-kr-sel-gangnam-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-kr-sel-gangnam-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 85200,
      "insuranceAnnual": 42600,
      "maintenanceAnnual": 71000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 28400
    },
    "assignedManager": {
      "id": "mgr-prop-kr-sel-gangnam",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 57,
      "occupiedUnits": 56,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-KR-1088",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-kr-pus-marine-city",
    "slug": "busan-marine-city-haeundae-tower",
    "title": "Haeundae Marine City Vista",
    "headline": "Trophy oceanfront skyscraper facing Haeundae Beach and the Diamond Suspension Bridge",
    "description": "Busan's premier maritime address with 5-star concierge, yacht club privileges, and solid domestic occupancy.",
    "city": "Busan",
    "country": "South Korea",
    "countryCode": "KR",
    "address": "Marine City 2-ro, Haeundae-gu, Busan",
    "category": "waterfront",
    "developer": "Doosan Heavy Industries",
    "yearBuilt": 2021,
    "totalAreaSqFt": 74000,
    "totalValuation": 11500000,
    "sharePrice": 110,
    "netYield": 7.2,
    "grossYield": 8.5,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 104545,
    "availableShares": 23627,
    "fundedPercentage": 77.4,
    "estimatedMonthlyRent": 81458,
    "monthlyPerShareRent": 0.779,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 11684000,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 89,
      "propertyCondition": 93,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 10695000,
        "sharePrice": 102.3
      },
      {
        "date": "2026-02",
        "value": 10925000,
        "sharePrice": 104.5
      },
      {
        "date": "2026-05",
        "value": 11155000,
        "sharePrice": 106.7
      },
      {
        "date": "2026-08",
        "value": 11385000,
        "sharePrice": 108.9
      },
      {
        "date": "2026-11",
        "value": 11500000,
        "sharePrice": 110
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 11523000,
        "mid": 11569000,
        "high": 11626500
      },
      {
        "month": "Jan 2027",
        "low": 11557500,
        "mid": 11638000,
        "high": 11718500
      },
      {
        "month": "Feb 2027",
        "low": 11603500,
        "mid": 11707000,
        "high": 11822000
      },
      {
        "month": "Mar 2027",
        "low": 11649500,
        "mid": 11787500,
        "high": 11925500
      },
      {
        "month": "Apr 2027",
        "low": 11707000,
        "mid": 11868000,
        "high": 12040500
      },
      {
        "month": "May 2027",
        "low": 11764500,
        "mid": 11960000,
        "high": 12167000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 80858,
        "expenses": 12219,
        "netDistributed": 68639,
        "payoutPerShare": 0.657
      },
      {
        "month": "Jul 2026",
        "grossCollected": 81258,
        "expenses": 12219,
        "netDistributed": 69039,
        "payoutPerShare": 0.66
      },
      {
        "month": "Aug 2026",
        "grossCollected": 81458,
        "expenses": 12219,
        "netDistributed": 69239,
        "payoutPerShare": 0.779
      },
      {
        "month": "Sep 2026",
        "grossCollected": 81458,
        "expenses": 12219,
        "netDistributed": 69239,
        "payoutPerShare": 0.779
      },
      {
        "month": "Oct 2026",
        "grossCollected": 81458,
        "expenses": 12219,
        "netDistributed": 69239,
        "payoutPerShare": 0.779
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-kr-pus-marine-city-01",
        "category": "Legal & Title",
        "title": "South Korea Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Busan Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-kr-pus-marine-city-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-kr-pus-marine-city-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-kr-pus-marine-city-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 69000,
      "insuranceAnnual": 34500,
      "maintenanceAnnual": 57500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 23000
    },
    "assignedManager": {
      "id": "mgr-prop-kr-pus-marine-city",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 62,
      "occupiedUnits": 60,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-KR-1089",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ie-dub-silicon-docks",
    "slug": "dublin-grand-canal-silicon-docks",
    "title": "Grand Canal Silicon Docks Workspace",
    "headline": "LEED Platinum tech headquarters building in Dublin's premier European tech cluster",
    "description": "Occupied by leading global enterprise software firms benefiting from Ireland's competitive tax framework.",
    "city": "Dublin",
    "country": "Ireland",
    "countryCode": "IE",
    "address": "Grand Canal Dock, Dublin 2",
    "category": "office",
    "developer": "Kennedy Wilson Europe",
    "yearBuilt": 2022,
    "totalAreaSqFt": 72000,
    "totalValuation": 10800000,
    "sharePrice": 100,
    "netYield": 7.3,
    "grossYield": 8.7,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 108000,
    "availableShares": 16848,
    "fundedPercentage": 84.4,
    "estimatedMonthlyRent": 78300,
    "monthlyPerShareRent": 0.725,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 11059200,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 90,
      "propertyCondition": 94,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 10044000,
        "sharePrice": 93
      },
      {
        "date": "2026-02",
        "value": 10260000,
        "sharePrice": 95
      },
      {
        "date": "2026-05",
        "value": 10476000,
        "sharePrice": 97
      },
      {
        "date": "2026-08",
        "value": 10692000,
        "sharePrice": 99
      },
      {
        "date": "2026-11",
        "value": 10800000,
        "sharePrice": 100
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 10821600,
        "mid": 10864800,
        "high": 10918800
      },
      {
        "month": "Jan 2027",
        "low": 10854000,
        "mid": 10929600,
        "high": 11005200
      },
      {
        "month": "Feb 2027",
        "low": 10897200,
        "mid": 10994400,
        "high": 11102400
      },
      {
        "month": "Mar 2027",
        "low": 10940400,
        "mid": 11070000,
        "high": 11199600
      },
      {
        "month": "Apr 2027",
        "low": 10994400,
        "mid": 11145600,
        "high": 11307600
      },
      {
        "month": "May 2027",
        "low": 11048400,
        "mid": 11232000,
        "high": 11426400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 77700,
        "expenses": 11745,
        "netDistributed": 65955,
        "payoutPerShare": 0.611
      },
      {
        "month": "Jul 2026",
        "grossCollected": 78100,
        "expenses": 11745,
        "netDistributed": 66355,
        "payoutPerShare": 0.614
      },
      {
        "month": "Aug 2026",
        "grossCollected": 78300,
        "expenses": 11745,
        "netDistributed": 66555,
        "payoutPerShare": 0.725
      },
      {
        "month": "Sep 2026",
        "grossCollected": 78300,
        "expenses": 11745,
        "netDistributed": 66555,
        "payoutPerShare": 0.725
      },
      {
        "month": "Oct 2026",
        "grossCollected": 78300,
        "expenses": 11745,
        "netDistributed": 66555,
        "payoutPerShare": 0.725
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ie-dub-silicon-docks-01",
        "category": "Legal & Title",
        "title": "Ireland Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Dublin Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ie-dub-silicon-docks-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ie-dub-silicon-docks-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ie-dub-silicon-docks-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 64800,
      "insuranceAnnual": 32400,
      "maintenanceAnnual": 54000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 21600
    },
    "assignedManager": {
      "id": "mgr-prop-ie-dub-silicon-docks",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 60,
      "occupiedUnits": 59,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-IE-1090",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ie-dub-docklands-residential",
    "slug": "dublin-docklands-executive-apartments",
    "title": "Liffey Quays Executive Residences",
    "headline": "Modern energy-rated A1 waterfront apartments along the River Liffey",
    "description": "Direct Luas tram stop, high executive rental demand, and exceptionally low vacancy rates in Dublin.",
    "city": "Dublin",
    "country": "Ireland",
    "countryCode": "IE",
    "address": "North Wall Quay, Dublin 1",
    "category": "residential",
    "developer": "Ballymore Group",
    "yearBuilt": 2022,
    "totalAreaSqFt": 46000,
    "totalValuation": 6900000,
    "sharePrice": 70,
    "netYield": 7.8,
    "grossYield": 9.3,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 98571,
    "availableShares": 8477,
    "fundedPercentage": 91.4,
    "estimatedMonthlyRent": 53475,
    "monthlyPerShareRent": 0.543,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6734400,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 91,
      "propertyCondition": 95,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6417000,
        "sharePrice": 65.1
      },
      {
        "date": "2026-02",
        "value": 6555000,
        "sharePrice": 66.5
      },
      {
        "date": "2026-05",
        "value": 6693000,
        "sharePrice": 67.9
      },
      {
        "date": "2026-08",
        "value": 6831000,
        "sharePrice": 69.3
      },
      {
        "date": "2026-11",
        "value": 6900000,
        "sharePrice": 70
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6913800,
        "mid": 6941400,
        "high": 6975900
      },
      {
        "month": "Jan 2027",
        "low": 6934500,
        "mid": 6982800,
        "high": 7031100
      },
      {
        "month": "Feb 2027",
        "low": 6962100,
        "mid": 7024200,
        "high": 7093200
      },
      {
        "month": "Mar 2027",
        "low": 6989700,
        "mid": 7072500,
        "high": 7155300
      },
      {
        "month": "Apr 2027",
        "low": 7024200,
        "mid": 7120800,
        "high": 7224300
      },
      {
        "month": "May 2027",
        "low": 7058700,
        "mid": 7176000,
        "high": 7300200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 52875,
        "expenses": 8021,
        "netDistributed": 44854,
        "payoutPerShare": 0.455
      },
      {
        "month": "Jul 2026",
        "grossCollected": 53275,
        "expenses": 8021,
        "netDistributed": 45254,
        "payoutPerShare": 0.459
      },
      {
        "month": "Aug 2026",
        "grossCollected": 53475,
        "expenses": 8021,
        "netDistributed": 45454,
        "payoutPerShare": 0.543
      },
      {
        "month": "Sep 2026",
        "grossCollected": 53475,
        "expenses": 8021,
        "netDistributed": 45454,
        "payoutPerShare": 0.543
      },
      {
        "month": "Oct 2026",
        "grossCollected": 53475,
        "expenses": 8021,
        "netDistributed": 45454,
        "payoutPerShare": 0.543
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ie-dub-docklands-residential-01",
        "category": "Legal & Title",
        "title": "Ireland Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Dublin Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ie-dub-docklands-residential-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ie-dub-docklands-residential-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ie-dub-docklands-residential-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 41400,
      "insuranceAnnual": 20700,
      "maintenanceAnnual": 34500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 13800
    },
    "assignedManager": {
      "id": "mgr-prop-ie-dub-docklands-residential",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 38,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-IE-1091",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pt-lis-parque-nacoes",
    "slug": "lisbon-parque-nacoes-waterfront",
    "title": "Tagus Riverfront Maritime Suites",
    "headline": "Modern waterfront residences in Lisbon's modern Parque das Nacoes business and expo district",
    "description": "Close to Lisbon Airport and Oriente rail station, favored by European digital nomads and startup founders.",
    "city": "Lisbon",
    "country": "Portugal",
    "countryCode": "PT",
    "address": "Alameda dos Oceanos, Parque das Nacoes, Lisbon",
    "category": "waterfront",
    "developer": "Mota-Engil Real Estate",
    "yearBuilt": 2022,
    "totalAreaSqFt": 52000,
    "totalValuation": 6100000,
    "sharePrice": 60,
    "netYield": 8.4,
    "grossYield": 10,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 101667,
    "availableShares": 25010,
    "fundedPercentage": 75.4,
    "estimatedMonthlyRent": 50833,
    "monthlyPerShareRent": 0.5,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6002400,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 92,
      "propertyCondition": 96,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5673000,
        "sharePrice": 55.8
      },
      {
        "date": "2026-02",
        "value": 5795000,
        "sharePrice": 57
      },
      {
        "date": "2026-05",
        "value": 5917000,
        "sharePrice": 58.2
      },
      {
        "date": "2026-08",
        "value": 6039000,
        "sharePrice": 59.4
      },
      {
        "date": "2026-11",
        "value": 6100000,
        "sharePrice": 60
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6112200,
        "mid": 6136600,
        "high": 6167100
      },
      {
        "month": "Jan 2027",
        "low": 6130500,
        "mid": 6173200,
        "high": 6215900
      },
      {
        "month": "Feb 2027",
        "low": 6154900,
        "mid": 6209800,
        "high": 6270800
      },
      {
        "month": "Mar 2027",
        "low": 6179300,
        "mid": 6252500,
        "high": 6325700
      },
      {
        "month": "Apr 2027",
        "low": 6209800,
        "mid": 6295200,
        "high": 6386700
      },
      {
        "month": "May 2027",
        "low": 6240300,
        "mid": 6344000,
        "high": 6453800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 50233,
        "expenses": 7625,
        "netDistributed": 42608,
        "payoutPerShare": 0.419
      },
      {
        "month": "Jul 2026",
        "grossCollected": 50633,
        "expenses": 7625,
        "netDistributed": 43008,
        "payoutPerShare": 0.423
      },
      {
        "month": "Aug 2026",
        "grossCollected": 50833,
        "expenses": 7625,
        "netDistributed": 43208,
        "payoutPerShare": 0.5
      },
      {
        "month": "Sep 2026",
        "grossCollected": 50833,
        "expenses": 7625,
        "netDistributed": 43208,
        "payoutPerShare": 0.5
      },
      {
        "month": "Oct 2026",
        "grossCollected": 50833,
        "expenses": 7625,
        "netDistributed": 43208,
        "payoutPerShare": 0.5
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pt-lis-parque-nacoes-01",
        "category": "Legal & Title",
        "title": "Portugal Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Lisbon Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pt-lis-parque-nacoes-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pt-lis-parque-nacoes-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pt-lis-parque-nacoes-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 36600,
      "insuranceAnnual": 18300,
      "maintenanceAnnual": 30500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12200
    },
    "assignedManager": {
      "id": "mgr-prop-pt-lis-parque-nacoes",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 43,
      "occupiedUnits": 42,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PT-1092",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-pt-opo-douro",
    "slug": "porto-douro-river-villas",
    "title": "Douro Valley Wine Country Residences",
    "headline": "Contemporary luxury villas overlooking the Douro River in Porto's historic wine trading zone",
    "description": "High tourist and lifestyle appeal with Michelin dining and UNESCO historic center proximity.",
    "city": "Porto",
    "country": "Portugal",
    "countryCode": "PT",
    "address": "Rua do Ouro, Lordelo do Ouro, Porto",
    "category": "villa",
    "developer": "Porto Urban Living",
    "yearBuilt": 2023,
    "totalAreaSqFt": 38000,
    "totalValuation": 4700000,
    "sharePrice": 50,
    "netYield": 8.7,
    "grossYield": 10.4,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 94000,
    "availableShares": 16544,
    "fundedPercentage": 82.4,
    "estimatedMonthlyRent": 40733,
    "monthlyPerShareRent": 0.433,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4662400,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 93,
      "propertyCondition": 97,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4371000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 4465000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 4559000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 4653000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 4700000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4709400,
        "mid": 4728200,
        "high": 4751700
      },
      {
        "month": "Jan 2027",
        "low": 4723500,
        "mid": 4756400,
        "high": 4789300
      },
      {
        "month": "Feb 2027",
        "low": 4742300,
        "mid": 4784600,
        "high": 4831600
      },
      {
        "month": "Mar 2027",
        "low": 4761100,
        "mid": 4817500,
        "high": 4873900
      },
      {
        "month": "Apr 2027",
        "low": 4784600,
        "mid": 4850400,
        "high": 4920900
      },
      {
        "month": "May 2027",
        "low": 4808100,
        "mid": 4888000,
        "high": 4972600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 40133,
        "expenses": 6110,
        "netDistributed": 34023,
        "payoutPerShare": 0.362
      },
      {
        "month": "Jul 2026",
        "grossCollected": 40533,
        "expenses": 6110,
        "netDistributed": 34423,
        "payoutPerShare": 0.366
      },
      {
        "month": "Aug 2026",
        "grossCollected": 40733,
        "expenses": 6110,
        "netDistributed": 34623,
        "payoutPerShare": 0.433
      },
      {
        "month": "Sep 2026",
        "grossCollected": 40733,
        "expenses": 6110,
        "netDistributed": 34623,
        "payoutPerShare": 0.433
      },
      {
        "month": "Oct 2026",
        "grossCollected": 40733,
        "expenses": 6110,
        "netDistributed": 34623,
        "payoutPerShare": 0.433
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-pt-opo-douro-01",
        "category": "Legal & Title",
        "title": "Portugal Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Porto Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-pt-opo-douro-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-pt-opo-douro-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-pt-opo-douro-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 28200,
      "insuranceAnnual": 14100,
      "maintenanceAnnual": 23500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9400
    },
    "assignedManager": {
      "id": "mgr-prop-pt-opo-douro",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 32,
      "occupiedUnits": 31,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PT-1093",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-eg-cai-new-capital",
    "slug": "cairo-new-administrative-capital-tower",
    "title": "New Cairo Sovereign CBD Tower",
    "headline": "Modern commercial skyscraper in Egypt's new administrative capital financial core",
    "description": "Centrally positioned along the Green River parkway with governmental and corporate banking tenancies.",
    "city": "Cairo",
    "country": "Egypt",
    "countryCode": "EG",
    "address": "Financial District, New Administrative Capital, Cairo",
    "category": "commercial",
    "developer": "Talaat Moustafa Group",
    "yearBuilt": 2023,
    "totalAreaSqFt": 78000,
    "totalValuation": 5200000,
    "sharePrice": 50,
    "netYield": 10.2,
    "grossYield": 12.1,
    "occupancyRate": 95,
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 104000,
    "availableShares": 11024,
    "fundedPercentage": 89.4,
    "estimatedMonthlyRent": 52433,
    "monthlyPerShareRent": 0.504,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5200000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 94,
      "propertyCondition": 98,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4836000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 4940000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 5044000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 5148000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 5200000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5210400,
        "mid": 5231200,
        "high": 5257200
      },
      {
        "month": "Jan 2027",
        "low": 5226000,
        "mid": 5262400,
        "high": 5298800
      },
      {
        "month": "Feb 2027",
        "low": 5246800,
        "mid": 5293600,
        "high": 5345600
      },
      {
        "month": "Mar 2027",
        "low": 5267600,
        "mid": 5330000,
        "high": 5392400
      },
      {
        "month": "Apr 2027",
        "low": 5293600,
        "mid": 5366400,
        "high": 5444400
      },
      {
        "month": "May 2027",
        "low": 5319600,
        "mid": 5408000,
        "high": 5501600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 51833,
        "expenses": 7865,
        "netDistributed": 43968,
        "payoutPerShare": 0.423
      },
      {
        "month": "Jul 2026",
        "grossCollected": 52233,
        "expenses": 7865,
        "netDistributed": 44368,
        "payoutPerShare": 0.427
      },
      {
        "month": "Aug 2026",
        "grossCollected": 52433,
        "expenses": 7865,
        "netDistributed": 44568,
        "payoutPerShare": 0.504
      },
      {
        "month": "Sep 2026",
        "grossCollected": 52433,
        "expenses": 7865,
        "netDistributed": 44568,
        "payoutPerShare": 0.504
      },
      {
        "month": "Oct 2026",
        "grossCollected": 52433,
        "expenses": 7865,
        "netDistributed": 44568,
        "payoutPerShare": 0.504
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-eg-cai-new-capital-01",
        "category": "Legal & Title",
        "title": "Egypt Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Cairo Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-eg-cai-new-capital-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-eg-cai-new-capital-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-eg-cai-new-capital-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 31200,
      "insuranceAnnual": 15600,
      "maintenanceAnnual": 26000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 10400
    },
    "assignedManager": {
      "id": "mgr-prop-eg-cai-new-capital",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 65,
      "occupiedUnits": 62,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-EG-1094",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-eg-aly-corniche",
    "slug": "alexandria-mediterranean-corniche-flats",
    "title": "Alexandria Mediterranean Vista",
    "headline": "Historic coastal residences facing Stanley Bridge and the Mediterranean Sea",
    "description": "Classic architecture modernised with thermal insulation and high seasonal maritime tourism demand.",
    "city": "Alexandria",
    "country": "Egypt",
    "countryCode": "EG",
    "address": "El Geish Road, Stanley, Alexandria",
    "category": "waterfront",
    "developer": "Alexandria Real Estate",
    "yearBuilt": 2021,
    "totalAreaSqFt": 46000,
    "totalValuation": 3400000,
    "sharePrice": 40,
    "netYield": 9.7,
    "grossYield": 11.5,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 85000,
    "availableShares": 3060,
    "fundedPercentage": 96.4,
    "estimatedMonthlyRent": 32583,
    "monthlyPerShareRent": 0.383,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 3427200,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 95,
      "propertyCondition": 99,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3162000,
        "sharePrice": 37.2
      },
      {
        "date": "2026-02",
        "value": 3230000,
        "sharePrice": 38
      },
      {
        "date": "2026-05",
        "value": 3298000,
        "sharePrice": 38.8
      },
      {
        "date": "2026-08",
        "value": 3366000,
        "sharePrice": 39.6
      },
      {
        "date": "2026-11",
        "value": 3400000,
        "sharePrice": 40
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 3406800,
        "mid": 3420400,
        "high": 3437400
      },
      {
        "month": "Jan 2027",
        "low": 3417000,
        "mid": 3440800,
        "high": 3464600
      },
      {
        "month": "Feb 2027",
        "low": 3430600,
        "mid": 3461200,
        "high": 3495200
      },
      {
        "month": "Mar 2027",
        "low": 3444200,
        "mid": 3485000,
        "high": 3525800
      },
      {
        "month": "Apr 2027",
        "low": 3461200,
        "mid": 3508800,
        "high": 3559800
      },
      {
        "month": "May 2027",
        "low": 3478200,
        "mid": 3536000,
        "high": 3597200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 31983,
        "expenses": 4887,
        "netDistributed": 27096,
        "payoutPerShare": 0.319
      },
      {
        "month": "Jul 2026",
        "grossCollected": 32383,
        "expenses": 4887,
        "netDistributed": 27496,
        "payoutPerShare": 0.323
      },
      {
        "month": "Aug 2026",
        "grossCollected": 32583,
        "expenses": 4887,
        "netDistributed": 27696,
        "payoutPerShare": 0.383
      },
      {
        "month": "Sep 2026",
        "grossCollected": 32583,
        "expenses": 4887,
        "netDistributed": 27696,
        "payoutPerShare": 0.383
      },
      {
        "month": "Oct 2026",
        "grossCollected": 32583,
        "expenses": 4887,
        "netDistributed": 27696,
        "payoutPerShare": 0.383
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-eg-aly-corniche-01",
        "category": "Legal & Title",
        "title": "Egypt Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Alexandria Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-eg-aly-corniche-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-eg-aly-corniche-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-eg-aly-corniche-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 20400,
      "insuranceAnnual": 10200,
      "maintenanceAnnual": 17000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 6800
    },
    "assignedManager": {
      "id": "mgr-prop-eg-aly-corniche",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 36,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-EG-1095",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-eg-ssh-red-sea",
    "slug": "sharm-el-sheikh-lagoon-resort",
    "title": "Sinai Coral Bay Resort",
    "headline": "Luxury holiday apartments with private diving reef and international tourist occupancy",
    "description": "Managed serviced resort apartments with strong foreign currency leisure returns.",
    "city": "Sharm El Sheikh",
    "country": "Egypt",
    "countryCode": "EG",
    "address": "Peace Road, Naama Bay, Sharm El Sheikh",
    "category": "hospitality",
    "developer": "Travco Hospitality Group",
    "yearBuilt": 2022,
    "totalAreaSqFt": 54000,
    "totalValuation": 4100000,
    "sharePrice": 50,
    "netYield": 10.5,
    "grossYield": 12.6,
    "occupancyRate": 93,
    "coverImage": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 82000,
    "availableShares": 16072,
    "fundedPercentage": 80.4,
    "estimatedMonthlyRent": 43050,
    "monthlyPerShareRent": 0.525,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4165600,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 96,
      "propertyCondition": 92,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3813000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 3895000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 3977000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 4059000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 4100000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4108200,
        "mid": 4124600,
        "high": 4145100
      },
      {
        "month": "Jan 2027",
        "low": 4120500,
        "mid": 4149200,
        "high": 4177900
      },
      {
        "month": "Feb 2027",
        "low": 4136900,
        "mid": 4173800,
        "high": 4214800
      },
      {
        "month": "Mar 2027",
        "low": 4153300,
        "mid": 4202500,
        "high": 4251700
      },
      {
        "month": "Apr 2027",
        "low": 4173800,
        "mid": 4231200,
        "high": 4292700
      },
      {
        "month": "May 2027",
        "low": 4194300,
        "mid": 4264000,
        "high": 4337800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 42450,
        "expenses": 6458,
        "netDistributed": 35992,
        "payoutPerShare": 0.439
      },
      {
        "month": "Jul 2026",
        "grossCollected": 42850,
        "expenses": 6458,
        "netDistributed": 36392,
        "payoutPerShare": 0.444
      },
      {
        "month": "Aug 2026",
        "grossCollected": 43050,
        "expenses": 6458,
        "netDistributed": 36592,
        "payoutPerShare": 0.525
      },
      {
        "month": "Sep 2026",
        "grossCollected": 43050,
        "expenses": 6458,
        "netDistributed": 36592,
        "payoutPerShare": 0.525
      },
      {
        "month": "Oct 2026",
        "grossCollected": 43050,
        "expenses": 6458,
        "netDistributed": 36592,
        "payoutPerShare": 0.525
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-eg-ssh-red-sea-01",
        "category": "Legal & Title",
        "title": "Egypt Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Sharm El Sheikh Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-eg-ssh-red-sea-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-eg-ssh-red-sea-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-eg-ssh-red-sea-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 24600,
      "insuranceAnnual": 12300,
      "maintenanceAnnual": 20500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 8200
    },
    "assignedManager": {
      "id": "mgr-prop-eg-ssh-red-sea",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 45,
      "occupiedUnits": 42,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-EG-1096",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-bh-man-bahrain-bay",
    "slug": "bahrain-bay-waterfront-suites",
    "title": "Bahrain Bay Azure Heights",
    "headline": "Prime waterfront residential tower overlooking Manama Harbour and Four Seasons Bay",
    "description": "Direct access to Bahrain Financial Harbour with 0% personal tax environment and high diplomatic demand.",
    "city": "Manama",
    "country": "Bahrain",
    "countryCode": "BH",
    "address": "Bahrain Bay Promenade, Manama",
    "category": "waterfront",
    "developer": "Bahrain Bay Development",
    "yearBuilt": 2022,
    "totalAreaSqFt": 62000,
    "totalValuation": 6900000,
    "sharePrice": 75,
    "netYield": 9.1,
    "grossYield": 10.8,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 92000,
    "availableShares": 11592,
    "fundedPercentage": 87.4,
    "estimatedMonthlyRent": 62100,
    "monthlyPerShareRent": 0.675,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7065600,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 97,
      "propertyCondition": 93,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6417000,
        "sharePrice": 69.8
      },
      {
        "date": "2026-02",
        "value": 6555000,
        "sharePrice": 71.3
      },
      {
        "date": "2026-05",
        "value": 6693000,
        "sharePrice": 72.8
      },
      {
        "date": "2026-08",
        "value": 6831000,
        "sharePrice": 74.3
      },
      {
        "date": "2026-11",
        "value": 6900000,
        "sharePrice": 75
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6913800,
        "mid": 6941400,
        "high": 6975900
      },
      {
        "month": "Jan 2027",
        "low": 6934500,
        "mid": 6982800,
        "high": 7031100
      },
      {
        "month": "Feb 2027",
        "low": 6962100,
        "mid": 7024200,
        "high": 7093200
      },
      {
        "month": "Mar 2027",
        "low": 6989700,
        "mid": 7072500,
        "high": 7155300
      },
      {
        "month": "Apr 2027",
        "low": 7024200,
        "mid": 7120800,
        "high": 7224300
      },
      {
        "month": "May 2027",
        "low": 7058700,
        "mid": 7176000,
        "high": 7300200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 61500,
        "expenses": 9315,
        "netDistributed": 52185,
        "payoutPerShare": 0.567
      },
      {
        "month": "Jul 2026",
        "grossCollected": 61900,
        "expenses": 9315,
        "netDistributed": 52585,
        "payoutPerShare": 0.572
      },
      {
        "month": "Aug 2026",
        "grossCollected": 62100,
        "expenses": 9315,
        "netDistributed": 52785,
        "payoutPerShare": 0.675
      },
      {
        "month": "Sep 2026",
        "grossCollected": 62100,
        "expenses": 9315,
        "netDistributed": 52785,
        "payoutPerShare": 0.675
      },
      {
        "month": "Oct 2026",
        "grossCollected": 62100,
        "expenses": 9315,
        "netDistributed": 52785,
        "payoutPerShare": 0.675
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-bh-man-bahrain-bay-01",
        "category": "Legal & Title",
        "title": "Bahrain Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Manama Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-bh-man-bahrain-bay-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-bh-man-bahrain-bay-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-bh-man-bahrain-bay-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 41400,
      "insuranceAnnual": 20700,
      "maintenanceAnnual": 34500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 13800
    },
    "assignedManager": {
      "id": "mgr-prop-bh-man-bahrain-bay",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 52,
      "occupiedUnits": 50,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-BH-1097",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-bh-man-financial-harbour",
    "slug": "manama-financial-harbour-offices",
    "title": "Bahrain Financial Harbour Tower",
    "headline": "Trophy office asset housing Middle Eastern investment banks and Islamic finance syndicates",
    "description": "Unrivalled institutional commercial building with 24-hour financial market infrastructure.",
    "city": "Manama",
    "country": "Bahrain",
    "countryCode": "BH",
    "address": "King Faisal Highway, Manama",
    "category": "office",
    "developer": "GFH Financial Group",
    "yearBuilt": 2021,
    "totalAreaSqFt": 86000,
    "totalValuation": 8800000,
    "sharePrice": 90,
    "netYield": 9.3,
    "grossYield": 11,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 97778,
    "availableShares": 5476,
    "fundedPercentage": 94.4,
    "estimatedMonthlyRent": 80667,
    "monthlyPerShareRent": 0.825,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 8588800,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 98,
      "propertyCondition": 94,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 8184000,
        "sharePrice": 83.7
      },
      {
        "date": "2026-02",
        "value": 8360000,
        "sharePrice": 85.5
      },
      {
        "date": "2026-05",
        "value": 8536000,
        "sharePrice": 87.3
      },
      {
        "date": "2026-08",
        "value": 8712000,
        "sharePrice": 89.1
      },
      {
        "date": "2026-11",
        "value": 8800000,
        "sharePrice": 90
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 8817600,
        "mid": 8852800,
        "high": 8896800
      },
      {
        "month": "Jan 2027",
        "low": 8844000,
        "mid": 8905600,
        "high": 8967200
      },
      {
        "month": "Feb 2027",
        "low": 8879200,
        "mid": 8958400,
        "high": 9046400
      },
      {
        "month": "Mar 2027",
        "low": 8914400,
        "mid": 9020000,
        "high": 9125600
      },
      {
        "month": "Apr 2027",
        "low": 8958400,
        "mid": 9081600,
        "high": 9213600
      },
      {
        "month": "May 2027",
        "low": 9002400,
        "mid": 9152000,
        "high": 9310400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 80067,
        "expenses": 12100,
        "netDistributed": 67967,
        "payoutPerShare": 0.695
      },
      {
        "month": "Jul 2026",
        "grossCollected": 80467,
        "expenses": 12100,
        "netDistributed": 68367,
        "payoutPerShare": 0.699
      },
      {
        "month": "Aug 2026",
        "grossCollected": 80667,
        "expenses": 12100,
        "netDistributed": 68567,
        "payoutPerShare": 0.825
      },
      {
        "month": "Sep 2026",
        "grossCollected": 80667,
        "expenses": 12100,
        "netDistributed": 68567,
        "payoutPerShare": 0.825
      },
      {
        "month": "Oct 2026",
        "grossCollected": 80667,
        "expenses": 12100,
        "netDistributed": 68567,
        "payoutPerShare": 0.825
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-bh-man-financial-harbour-01",
        "category": "Legal & Title",
        "title": "Bahrain Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Manama Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-bh-man-financial-harbour-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-bh-man-financial-harbour-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-bh-man-financial-harbour-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 52800,
      "insuranceAnnual": 26400,
      "maintenanceAnnual": 44000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 17600
    },
    "assignedManager": {
      "id": "mgr-prop-bh-man-financial-harbour",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 72,
      "occupiedUnits": 69,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-BH-1098",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-bh-amw-islands",
    "slug": "amwaj-islands-coastal-villas",
    "title": "Amwaj Lagoon Floating Villas",
    "headline": "Private island villas with boat mooring and private beaches in Amwaj Islands",
    "description": "Gated island community popular with international executives commuting between Bahrain and Saudi Arabia.",
    "city": "Muharraq",
    "country": "Bahrain",
    "countryCode": "BH",
    "address": "Tala Island, Amwaj Islands",
    "category": "villa",
    "developer": "Ossis Property Developers",
    "yearBuilt": 2022,
    "totalAreaSqFt": 42000,
    "totalValuation": 5500000,
    "sharePrice": 70,
    "netYield": 8.9,
    "grossYield": 10.5,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 78571,
    "availableShares": 16971,
    "fundedPercentage": 78.4,
    "estimatedMonthlyRent": 48125,
    "monthlyPerShareRent": 0.613,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5412000,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 88,
      "propertyCondition": 95,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5115000,
        "sharePrice": 65.1
      },
      {
        "date": "2026-02",
        "value": 5225000,
        "sharePrice": 66.5
      },
      {
        "date": "2026-05",
        "value": 5335000,
        "sharePrice": 67.9
      },
      {
        "date": "2026-08",
        "value": 5445000,
        "sharePrice": 69.3
      },
      {
        "date": "2026-11",
        "value": 5500000,
        "sharePrice": 70
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5511000,
        "mid": 5533000,
        "high": 5560500
      },
      {
        "month": "Jan 2027",
        "low": 5527500,
        "mid": 5566000,
        "high": 5604500
      },
      {
        "month": "Feb 2027",
        "low": 5549500,
        "mid": 5599000,
        "high": 5654000
      },
      {
        "month": "Mar 2027",
        "low": 5571500,
        "mid": 5637500,
        "high": 5703500
      },
      {
        "month": "Apr 2027",
        "low": 5599000,
        "mid": 5676000,
        "high": 5758500
      },
      {
        "month": "May 2027",
        "low": 5626500,
        "mid": 5720000,
        "high": 5819000
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 47525,
        "expenses": 7219,
        "netDistributed": 40306,
        "payoutPerShare": 0.513
      },
      {
        "month": "Jul 2026",
        "grossCollected": 47925,
        "expenses": 7219,
        "netDistributed": 40706,
        "payoutPerShare": 0.518
      },
      {
        "month": "Aug 2026",
        "grossCollected": 48125,
        "expenses": 7219,
        "netDistributed": 40906,
        "payoutPerShare": 0.613
      },
      {
        "month": "Sep 2026",
        "grossCollected": 48125,
        "expenses": 7219,
        "netDistributed": 40906,
        "payoutPerShare": 0.613
      },
      {
        "month": "Oct 2026",
        "grossCollected": 48125,
        "expenses": 7219,
        "netDistributed": 40906,
        "payoutPerShare": 0.613
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-bh-amw-islands-01",
        "category": "Legal & Title",
        "title": "Bahrain Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Muharraq Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-bh-amw-islands-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-bh-amw-islands-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-bh-amw-islands-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 33000,
      "insuranceAnnual": 16500,
      "maintenanceAnnual": 27500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11000
    },
    "assignedManager": {
      "id": "mgr-prop-bh-amw-islands",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 35,
      "occupiedUnits": 34,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-BH-1099",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-om-mct-al-mouj",
    "slug": "muscat-al-mouj-waterfront-residences",
    "title": "Al Mouj Marina Wave Residences",
    "headline": "Integrated Tourism Complex (ITC) waterfront residences with championship golf course",
    "description": "Muscat's premier oceanfront community offering 100% foreign freehold ownership and residency qualification.",
    "city": "Muscat",
    "country": "Oman",
    "countryCode": "OM",
    "address": "Street 6, Al Mouj Marina, Muscat",
    "category": "waterfront",
    "developer": "Majid Al Futtaim & Oman Gov",
    "yearBuilt": 2022,
    "totalAreaSqFt": 58000,
    "totalValuation": 6300000,
    "sharePrice": 70,
    "netYield": 8.7,
    "grossYield": 10.3,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 90000,
    "availableShares": 13140,
    "fundedPercentage": 85.4,
    "estimatedMonthlyRent": 54075,
    "monthlyPerShareRent": 0.601,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6249600,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 89,
      "propertyCondition": 96,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5859000,
        "sharePrice": 65.1
      },
      {
        "date": "2026-02",
        "value": 5985000,
        "sharePrice": 66.5
      },
      {
        "date": "2026-05",
        "value": 6111000,
        "sharePrice": 67.9
      },
      {
        "date": "2026-08",
        "value": 6237000,
        "sharePrice": 69.3
      },
      {
        "date": "2026-11",
        "value": 6300000,
        "sharePrice": 70
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6312600,
        "mid": 6337800,
        "high": 6369300
      },
      {
        "month": "Jan 2027",
        "low": 6331500,
        "mid": 6375600,
        "high": 6419700
      },
      {
        "month": "Feb 2027",
        "low": 6356700,
        "mid": 6413400,
        "high": 6476400
      },
      {
        "month": "Mar 2027",
        "low": 6381900,
        "mid": 6457500,
        "high": 6533100
      },
      {
        "month": "Apr 2027",
        "low": 6413400,
        "mid": 6501600,
        "high": 6596100
      },
      {
        "month": "May 2027",
        "low": 6444900,
        "mid": 6552000,
        "high": 6665400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 53475,
        "expenses": 8111,
        "netDistributed": 45364,
        "payoutPerShare": 0.504
      },
      {
        "month": "Jul 2026",
        "grossCollected": 53875,
        "expenses": 8111,
        "netDistributed": 45764,
        "payoutPerShare": 0.508
      },
      {
        "month": "Aug 2026",
        "grossCollected": 54075,
        "expenses": 8111,
        "netDistributed": 45964,
        "payoutPerShare": 0.601
      },
      {
        "month": "Sep 2026",
        "grossCollected": 54075,
        "expenses": 8111,
        "netDistributed": 45964,
        "payoutPerShare": 0.601
      },
      {
        "month": "Oct 2026",
        "grossCollected": 54075,
        "expenses": 8111,
        "netDistributed": 45964,
        "payoutPerShare": 0.601
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-om-mct-al-mouj-01",
        "category": "Legal & Title",
        "title": "Oman Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Muscat Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-om-mct-al-mouj-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-om-mct-al-mouj-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-om-mct-al-mouj-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 37800,
      "insuranceAnnual": 18900,
      "maintenanceAnnual": 31500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12600
    },
    "assignedManager": {
      "id": "mgr-prop-om-mct-al-mouj",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 48,
      "occupiedUnits": 47,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-OM-1100",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-om-mct-khuwair",
    "slug": "muscat-al-khuwair-commercial-center",
    "title": "Al Khuwair Corporate Commons",
    "headline": "Grade-A corporate office hub in Muscat's primary commercial ministry and embassy quarter",
    "description": "Occupied by national telecommunications, engineering consultancies, and diplomatic trade boards.",
    "city": "Muscat",
    "country": "Oman",
    "countryCode": "OM",
    "address": "Sultan Qaboos Street, Al Khuwair, Muscat",
    "category": "commercial",
    "developer": "Omran Group",
    "yearBuilt": 2021,
    "totalAreaSqFt": 65000,
    "totalValuation": 5100000,
    "sharePrice": 60,
    "netYield": 9,
    "grossYield": 10.7,
    "occupancyRate": 95,
    "coverImage": "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 85000,
    "availableShares": 6460,
    "fundedPercentage": 92.4,
    "estimatedMonthlyRent": 45475,
    "monthlyPerShareRent": 0.535,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5100000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 90,
      "propertyCondition": 97,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4743000,
        "sharePrice": 55.8
      },
      {
        "date": "2026-02",
        "value": 4845000,
        "sharePrice": 57
      },
      {
        "date": "2026-05",
        "value": 4947000,
        "sharePrice": 58.2
      },
      {
        "date": "2026-08",
        "value": 5049000,
        "sharePrice": 59.4
      },
      {
        "date": "2026-11",
        "value": 5100000,
        "sharePrice": 60
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5110200,
        "mid": 5130600,
        "high": 5156100
      },
      {
        "month": "Jan 2027",
        "low": 5125500,
        "mid": 5161200,
        "high": 5196900
      },
      {
        "month": "Feb 2027",
        "low": 5145900,
        "mid": 5191800,
        "high": 5242800
      },
      {
        "month": "Mar 2027",
        "low": 5166300,
        "mid": 5227500,
        "high": 5288700
      },
      {
        "month": "Apr 2027",
        "low": 5191800,
        "mid": 5263200,
        "high": 5339700
      },
      {
        "month": "May 2027",
        "low": 5217300,
        "mid": 5304000,
        "high": 5395800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 44875,
        "expenses": 6821,
        "netDistributed": 38054,
        "payoutPerShare": 0.448
      },
      {
        "month": "Jul 2026",
        "grossCollected": 45275,
        "expenses": 6821,
        "netDistributed": 38454,
        "payoutPerShare": 0.452
      },
      {
        "month": "Aug 2026",
        "grossCollected": 45475,
        "expenses": 6821,
        "netDistributed": 38654,
        "payoutPerShare": 0.535
      },
      {
        "month": "Sep 2026",
        "grossCollected": 45475,
        "expenses": 6821,
        "netDistributed": 38654,
        "payoutPerShare": 0.535
      },
      {
        "month": "Oct 2026",
        "grossCollected": 45475,
        "expenses": 6821,
        "netDistributed": 38654,
        "payoutPerShare": 0.535
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-om-mct-khuwair-01",
        "category": "Legal & Title",
        "title": "Oman Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Muscat Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-om-mct-khuwair-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-om-mct-khuwair-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-om-mct-khuwair-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 30600,
      "insuranceAnnual": 15300,
      "maintenanceAnnual": 25500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 10200
    },
    "assignedManager": {
      "id": "mgr-prop-om-mct-khuwair",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 54,
      "occupiedUnits": 51,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-OM-1101",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-om-sll-salalah-resort",
    "slug": "salalah-khareef-coastal-resort",
    "title": "Dhofar Green Coast Resort",
    "headline": "Eco-hospitality serviced villas benefiting from the world-famous Salalah Khareef monsoon season",
    "description": "High tourist influx from Gulf nations during summer months yields exceptional seasonal dividend returns.",
    "city": "Salalah",
    "country": "Oman",
    "countryCode": "OM",
    "address": "Hawana Salalah, Dhofar Governorate",
    "category": "hospitality",
    "developer": "Muriya Tourism Development",
    "yearBuilt": 2023,
    "totalAreaSqFt": 48000,
    "totalValuation": 4400000,
    "sharePrice": 50,
    "netYield": 9.8,
    "grossYield": 11.6,
    "occupancyRate": 94,
    "coverImage": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 88000,
    "availableShares": 20768,
    "fundedPercentage": 76.4,
    "estimatedMonthlyRent": 42533,
    "monthlyPerShareRent": 0.483,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4435200,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 91,
      "propertyCondition": 98,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4092000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 4180000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 4268000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 4356000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 4400000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4408800,
        "mid": 4426400,
        "high": 4448400
      },
      {
        "month": "Jan 2027",
        "low": 4422000,
        "mid": 4452800,
        "high": 4483600
      },
      {
        "month": "Feb 2027",
        "low": 4439600,
        "mid": 4479200,
        "high": 4523200
      },
      {
        "month": "Mar 2027",
        "low": 4457200,
        "mid": 4510000,
        "high": 4562800
      },
      {
        "month": "Apr 2027",
        "low": 4479200,
        "mid": 4540800,
        "high": 4606800
      },
      {
        "month": "May 2027",
        "low": 4501200,
        "mid": 4576000,
        "high": 4655200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 41933,
        "expenses": 6380,
        "netDistributed": 35553,
        "payoutPerShare": 0.404
      },
      {
        "month": "Jul 2026",
        "grossCollected": 42333,
        "expenses": 6380,
        "netDistributed": 35953,
        "payoutPerShare": 0.409
      },
      {
        "month": "Aug 2026",
        "grossCollected": 42533,
        "expenses": 6380,
        "netDistributed": 36153,
        "payoutPerShare": 0.483
      },
      {
        "month": "Sep 2026",
        "grossCollected": 42533,
        "expenses": 6380,
        "netDistributed": 36153,
        "payoutPerShare": 0.483
      },
      {
        "month": "Oct 2026",
        "grossCollected": 42533,
        "expenses": 6380,
        "netDistributed": 36153,
        "payoutPerShare": 0.483
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-om-sll-salalah-resort-01",
        "category": "Legal & Title",
        "title": "Oman Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Salalah Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-om-sll-salalah-resort-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-om-sll-salalah-resort-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-om-sll-salalah-resort-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 26400,
      "insuranceAnnual": 13200,
      "maintenanceAnnual": 22000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 8800
    },
    "assignedManager": {
      "id": "mgr-prop-om-sll-salalah-resort",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 40,
      "occupiedUnits": 38,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-OM-1102",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-gb-gla-finnieston",
    "slug": "glasgow-finnieston-creative-quarter",
    "title": "Finnieston Hydro Riverside Flats",
    "headline": "Modern riverside apartments close to SEC Centre and University of Glasgow",
    "description": "Scotland's most vibrant creative neighborhood with consistently high student and medical worker occupancy.",
    "city": "Glasgow",
    "country": "United Kingdom",
    "countryCode": "GB",
    "address": "Finnieston Street, Glasgow",
    "category": "residential",
    "developer": "Clyde Gateway",
    "yearBuilt": 2022,
    "totalAreaSqFt": 43000,
    "totalValuation": 4100000,
    "sharePrice": 40,
    "netYield": 8.6,
    "grossYield": 10.2,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 102500,
    "availableShares": 17015,
    "fundedPercentage": 83.4,
    "estimatedMonthlyRent": 34850,
    "monthlyPerShareRent": 0.34,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4165600,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 92,
      "propertyCondition": 99,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 3813000,
        "sharePrice": 37.2
      },
      {
        "date": "2026-02",
        "value": 3895000,
        "sharePrice": 38
      },
      {
        "date": "2026-05",
        "value": 3977000,
        "sharePrice": 38.8
      },
      {
        "date": "2026-08",
        "value": 4059000,
        "sharePrice": 39.6
      },
      {
        "date": "2026-11",
        "value": 4100000,
        "sharePrice": 40
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4108200,
        "mid": 4124600,
        "high": 4145100
      },
      {
        "month": "Jan 2027",
        "low": 4120500,
        "mid": 4149200,
        "high": 4177900
      },
      {
        "month": "Feb 2027",
        "low": 4136900,
        "mid": 4173800,
        "high": 4214800
      },
      {
        "month": "Mar 2027",
        "low": 4153300,
        "mid": 4202500,
        "high": 4251700
      },
      {
        "month": "Apr 2027",
        "low": 4173800,
        "mid": 4231200,
        "high": 4292700
      },
      {
        "month": "May 2027",
        "low": 4194300,
        "mid": 4264000,
        "high": 4337800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 34250,
        "expenses": 5228,
        "netDistributed": 29022,
        "payoutPerShare": 0.283
      },
      {
        "month": "Jul 2026",
        "grossCollected": 34650,
        "expenses": 5228,
        "netDistributed": 29422,
        "payoutPerShare": 0.287
      },
      {
        "month": "Aug 2026",
        "grossCollected": 34850,
        "expenses": 5228,
        "netDistributed": 29622,
        "payoutPerShare": 0.34
      },
      {
        "month": "Sep 2026",
        "grossCollected": 34850,
        "expenses": 5228,
        "netDistributed": 29622,
        "payoutPerShare": 0.34
      },
      {
        "month": "Oct 2026",
        "grossCollected": 34850,
        "expenses": 5228,
        "netDistributed": 29622,
        "payoutPerShare": 0.34
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-gb-gla-finnieston-01",
        "category": "Legal & Title",
        "title": "United Kingdom Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Glasgow Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-gb-gla-finnieston-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-gb-gla-finnieston-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-gb-gla-finnieston-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 24600,
      "insuranceAnnual": 12300,
      "maintenanceAnnual": 20500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 8200
    },
    "assignedManager": {
      "id": "mgr-prop-gb-gla-finnieston",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 36,
      "occupiedUnits": 35,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-GB-1103",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-de-cgn-rheinauhafen",
    "slug": "cologne-rheinauhafen-crane-houses",
    "title": "Rheinauhafen Waterfront Kranhaus",
    "headline": "Award-winning cantilevered architectural landmark on the Rhine River",
    "description": "Luxury executive residential suites with underground automated parking and river promenade walks.",
    "city": "Cologne",
    "country": "Germany",
    "countryCode": "DE",
    "address": "Im Zollhafen, Cologne",
    "category": "luxury",
    "developer": "Pandion AG",
    "yearBuilt": 2021,
    "totalAreaSqFt": 50000,
    "totalValuation": 8600000,
    "sharePrice": 90,
    "netYield": 7,
    "grossYield": 8.3,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 95556,
    "availableShares": 9173,
    "fundedPercentage": 90.4,
    "estimatedMonthlyRent": 59483,
    "monthlyPerShareRent": 0.622,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 8806400,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 93,
      "propertyCondition": 92,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 7998000,
        "sharePrice": 83.7
      },
      {
        "date": "2026-02",
        "value": 8170000,
        "sharePrice": 85.5
      },
      {
        "date": "2026-05",
        "value": 8342000,
        "sharePrice": 87.3
      },
      {
        "date": "2026-08",
        "value": 8514000,
        "sharePrice": 89.1
      },
      {
        "date": "2026-11",
        "value": 8600000,
        "sharePrice": 90
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 8617200,
        "mid": 8651600,
        "high": 8694600
      },
      {
        "month": "Jan 2027",
        "low": 8643000,
        "mid": 8703200,
        "high": 8763400
      },
      {
        "month": "Feb 2027",
        "low": 8677400,
        "mid": 8754800,
        "high": 8840800
      },
      {
        "month": "Mar 2027",
        "low": 8711800,
        "mid": 8815000,
        "high": 8918200
      },
      {
        "month": "Apr 2027",
        "low": 8754800,
        "mid": 8875200,
        "high": 9004200
      },
      {
        "month": "May 2027",
        "low": 8797800,
        "mid": 8944000,
        "high": 9098800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 58883,
        "expenses": 8922,
        "netDistributed": 49961,
        "payoutPerShare": 0.523
      },
      {
        "month": "Jul 2026",
        "grossCollected": 59283,
        "expenses": 8922,
        "netDistributed": 50361,
        "payoutPerShare": 0.527
      },
      {
        "month": "Aug 2026",
        "grossCollected": 59483,
        "expenses": 8922,
        "netDistributed": 50561,
        "payoutPerShare": 0.622
      },
      {
        "month": "Sep 2026",
        "grossCollected": 59483,
        "expenses": 8922,
        "netDistributed": 50561,
        "payoutPerShare": 0.622
      },
      {
        "month": "Oct 2026",
        "grossCollected": 59483,
        "expenses": 8922,
        "netDistributed": 50561,
        "payoutPerShare": 0.622
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-de-cgn-rheinauhafen-01",
        "category": "Legal & Title",
        "title": "Germany Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Cologne Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-de-cgn-rheinauhafen-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-de-cgn-rheinauhafen-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-de-cgn-rheinauhafen-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 51600,
      "insuranceAnnual": 25800,
      "maintenanceAnnual": 43000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 17200
    },
    "assignedManager": {
      "id": "mgr-prop-de-cgn-rheinauhafen",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 42,
      "occupiedUnits": 41,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-DE-1104",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-at-vie-belvedere",
    "slug": "vienna-belvedere-quartier-apartments",
    "title": "Vienna Quartier Belvedere Suites",
    "headline": "Prime apartments next to Vienna Central Station and historic Belvedere Palace",
    "description": "Vienna's ultra-reliable rental market with energy-efficient district heating and world-class public transit.",
    "city": "Vienna",
    "country": "Austria",
    "countryCode": "AT",
    "address": "Am Belvedere, Vienna",
    "category": "residential",
    "developer": "SIGNA & Erste Bank Group",
    "yearBuilt": 2022,
    "totalAreaSqFt": 54000,
    "totalValuation": 7900000,
    "sharePrice": 80,
    "netYield": 6.6,
    "grossYield": 7.9,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 98750,
    "availableShares": 2567,
    "fundedPercentage": 97.4,
    "estimatedMonthlyRent": 52008,
    "monthlyPerShareRent": 0.527,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7710400,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 94,
      "propertyCondition": 93,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 7347000,
        "sharePrice": 74.4
      },
      {
        "date": "2026-02",
        "value": 7505000,
        "sharePrice": 76
      },
      {
        "date": "2026-05",
        "value": 7663000,
        "sharePrice": 77.6
      },
      {
        "date": "2026-08",
        "value": 7821000,
        "sharePrice": 79.2
      },
      {
        "date": "2026-11",
        "value": 7900000,
        "sharePrice": 80
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7915800,
        "mid": 7947400,
        "high": 7986900
      },
      {
        "month": "Jan 2027",
        "low": 7939500,
        "mid": 7994800,
        "high": 8050100
      },
      {
        "month": "Feb 2027",
        "low": 7971100,
        "mid": 8042200,
        "high": 8121200
      },
      {
        "month": "Mar 2027",
        "low": 8002700,
        "mid": 8097500,
        "high": 8192300
      },
      {
        "month": "Apr 2027",
        "low": 8042200,
        "mid": 8152800,
        "high": 8271300
      },
      {
        "month": "May 2027",
        "low": 8081700,
        "mid": 8216000,
        "high": 8358200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 51408,
        "expenses": 7801,
        "netDistributed": 43607,
        "payoutPerShare": 0.442
      },
      {
        "month": "Jul 2026",
        "grossCollected": 51808,
        "expenses": 7801,
        "netDistributed": 44007,
        "payoutPerShare": 0.446
      },
      {
        "month": "Aug 2026",
        "grossCollected": 52008,
        "expenses": 7801,
        "netDistributed": 44207,
        "payoutPerShare": 0.527
      },
      {
        "month": "Sep 2026",
        "grossCollected": 52008,
        "expenses": 7801,
        "netDistributed": 44207,
        "payoutPerShare": 0.527
      },
      {
        "month": "Oct 2026",
        "grossCollected": 52008,
        "expenses": 7801,
        "netDistributed": 44207,
        "payoutPerShare": 0.527
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-at-vie-belvedere-01",
        "category": "Legal & Title",
        "title": "Austria Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Vienna Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-at-vie-belvedere-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-at-vie-belvedere-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-at-vie-belvedere-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 47400,
      "insuranceAnnual": 23700,
      "maintenanceAnnual": 39500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 15800
    },
    "assignedManager": {
      "id": "mgr-prop-at-vie-belvedere",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 45,
      "occupiedUnits": 45,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-AT-1105",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-be-bru-european-quarter",
    "slug": "brussels-european-quarter-diplomatic",
    "title": "Schuman Diplomatic Residences",
    "headline": "Modern apartments moments from the European Commission and European Parliament in Brussels",
    "description": "Steady multi-year corporate leases with European Union diplomats, policy institutions, and lobby groups.",
    "city": "Brussels",
    "country": "Belgium",
    "countryCode": "BE",
    "address": "Rue de la Loi, Brussels",
    "category": "residential",
    "developer": "Besix RED",
    "yearBuilt": 2022,
    "totalAreaSqFt": 46000,
    "totalValuation": 6200000,
    "sharePrice": 65,
    "netYield": 7.3,
    "grossYield": 8.7,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 95385,
    "availableShares": 17742,
    "fundedPercentage": 81.4,
    "estimatedMonthlyRent": 44950,
    "monthlyPerShareRent": 0.471,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6100800,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 95,
      "propertyCondition": 94,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5766000,
        "sharePrice": 60.5
      },
      {
        "date": "2026-02",
        "value": 5890000,
        "sharePrice": 61.8
      },
      {
        "date": "2026-05",
        "value": 6014000,
        "sharePrice": 63
      },
      {
        "date": "2026-08",
        "value": 6138000,
        "sharePrice": 64.3
      },
      {
        "date": "2026-11",
        "value": 6200000,
        "sharePrice": 65
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6212400,
        "mid": 6237200,
        "high": 6268200
      },
      {
        "month": "Jan 2027",
        "low": 6231000,
        "mid": 6274400,
        "high": 6317800
      },
      {
        "month": "Feb 2027",
        "low": 6255800,
        "mid": 6311600,
        "high": 6373600
      },
      {
        "month": "Mar 2027",
        "low": 6280600,
        "mid": 6355000,
        "high": 6429400
      },
      {
        "month": "Apr 2027",
        "low": 6311600,
        "mid": 6398400,
        "high": 6491400
      },
      {
        "month": "May 2027",
        "low": 6342600,
        "mid": 6448000,
        "high": 6559600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 44350,
        "expenses": 6743,
        "netDistributed": 37607,
        "payoutPerShare": 0.394
      },
      {
        "month": "Jul 2026",
        "grossCollected": 44750,
        "expenses": 6743,
        "netDistributed": 38007,
        "payoutPerShare": 0.398
      },
      {
        "month": "Aug 2026",
        "grossCollected": 44950,
        "expenses": 6743,
        "netDistributed": 38207,
        "payoutPerShare": 0.471
      },
      {
        "month": "Sep 2026",
        "grossCollected": 44950,
        "expenses": 6743,
        "netDistributed": 38207,
        "payoutPerShare": 0.471
      },
      {
        "month": "Oct 2026",
        "grossCollected": 44950,
        "expenses": 6743,
        "netDistributed": 38207,
        "payoutPerShare": 0.471
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-be-bru-european-quarter-01",
        "category": "Legal & Title",
        "title": "Belgium Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Brussels Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-be-bru-european-quarter-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-be-bru-european-quarter-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-be-bru-european-quarter-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 37200,
      "insuranceAnnual": 18600,
      "maintenanceAnnual": 31000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12400
    },
    "assignedManager": {
      "id": "mgr-prop-be-bru-european-quarter",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-BE-1106",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ph-mnl-bgc",
    "slug": "manila-bonifacio-global-city-tower",
    "title": "BGC High Street Financial Suites",
    "headline": "Prime high-rise in Bonifacio Global City's pedestrianized shopping and corporate haven",
    "description": "Multinational BPO, fintech, and banking executives fuel strong USD-equivalent rental yields.",
    "city": "Manila",
    "country": "Philippines",
    "countryCode": "PH",
    "address": "5th Avenue, BGC, Taguig, Manila",
    "category": "luxury",
    "developer": "Ayala Land Premier",
    "yearBuilt": 2022,
    "totalAreaSqFt": 62000,
    "totalValuation": 5900000,
    "sharePrice": 50,
    "netYield": 9.3,
    "grossYield": 11.1,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 118000,
    "availableShares": 13688,
    "fundedPercentage": 88.4,
    "estimatedMonthlyRent": 54575,
    "monthlyPerShareRent": 0.463,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5852800,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 96,
      "propertyCondition": 95,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5487000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 5605000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 5723000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 5841000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 5900000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5911800,
        "mid": 5935400,
        "high": 5964900
      },
      {
        "month": "Jan 2027",
        "low": 5929500,
        "mid": 5970800,
        "high": 6012100
      },
      {
        "month": "Feb 2027",
        "low": 5953100,
        "mid": 6006200,
        "high": 6065200
      },
      {
        "month": "Mar 2027",
        "low": 5976700,
        "mid": 6047500,
        "high": 6118300
      },
      {
        "month": "Apr 2027",
        "low": 6006200,
        "mid": 6088800,
        "high": 6177300
      },
      {
        "month": "May 2027",
        "low": 6035700,
        "mid": 6136000,
        "high": 6242200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 53975,
        "expenses": 8186,
        "netDistributed": 45789,
        "payoutPerShare": 0.388
      },
      {
        "month": "Jul 2026",
        "grossCollected": 54375,
        "expenses": 8186,
        "netDistributed": 46189,
        "payoutPerShare": 0.391
      },
      {
        "month": "Aug 2026",
        "grossCollected": 54575,
        "expenses": 8186,
        "netDistributed": 46389,
        "payoutPerShare": 0.463
      },
      {
        "month": "Sep 2026",
        "grossCollected": 54575,
        "expenses": 8186,
        "netDistributed": 46389,
        "payoutPerShare": 0.463
      },
      {
        "month": "Oct 2026",
        "grossCollected": 54575,
        "expenses": 8186,
        "netDistributed": 46389,
        "payoutPerShare": 0.463
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ph-mnl-bgc-01",
        "category": "Legal & Title",
        "title": "Philippines Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Manila Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ph-mnl-bgc-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ph-mnl-bgc-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ph-mnl-bgc-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 35400,
      "insuranceAnnual": 17700,
      "maintenanceAnnual": 29500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11800
    },
    "assignedManager": {
      "id": "mgr-prop-ph-mnl-bgc",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 52,
      "occupiedUnits": 50,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-PH-1107",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-vn-sgn-thu-thiem",
    "slug": "ho-chi-minh-city-thu-thiem-waterfront",
    "title": "Saigon Riverfront Empire Tower",
    "headline": "New financial district residences overlooking District 1 skyline across the Saigon River",
    "description": "Rapidly appreciating real estate asset in Vietnam's fastest growing corporate and financial district.",
    "city": "Ho Chi Minh City",
    "country": "Vietnam",
    "countryCode": "VN",
    "address": "Mai Chi Tho Boulevard, Thu Thiem, HCMC",
    "category": "waterfront",
    "developer": "Keppel Land Vietnam",
    "yearBuilt": 2023,
    "totalAreaSqFt": 58000,
    "totalValuation": 5400000,
    "sharePrice": 45,
    "netYield": 9,
    "grossYield": 10.7,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 120000,
    "availableShares": 5520,
    "fundedPercentage": 95.4,
    "estimatedMonthlyRent": 48150,
    "monthlyPerShareRent": 0.401,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5400000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 98,
      "marketMomentum": 97,
      "propertyCondition": 96,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5022000,
        "sharePrice": 41.9
      },
      {
        "date": "2026-02",
        "value": 5130000,
        "sharePrice": 42.8
      },
      {
        "date": "2026-05",
        "value": 5238000,
        "sharePrice": 43.6
      },
      {
        "date": "2026-08",
        "value": 5346000,
        "sharePrice": 44.5
      },
      {
        "date": "2026-11",
        "value": 5400000,
        "sharePrice": 45
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5410800,
        "mid": 5432400,
        "high": 5459400
      },
      {
        "month": "Jan 2027",
        "low": 5427000,
        "mid": 5464800,
        "high": 5502600
      },
      {
        "month": "Feb 2027",
        "low": 5448600,
        "mid": 5497200,
        "high": 5551200
      },
      {
        "month": "Mar 2027",
        "low": 5470200,
        "mid": 5535000,
        "high": 5599800
      },
      {
        "month": "Apr 2027",
        "low": 5497200,
        "mid": 5572800,
        "high": 5653800
      },
      {
        "month": "May 2027",
        "low": 5524200,
        "mid": 5616000,
        "high": 5713200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 47550,
        "expenses": 7223,
        "netDistributed": 40327,
        "payoutPerShare": 0.336
      },
      {
        "month": "Jul 2026",
        "grossCollected": 47950,
        "expenses": 7223,
        "netDistributed": 40727,
        "payoutPerShare": 0.339
      },
      {
        "month": "Aug 2026",
        "grossCollected": 48150,
        "expenses": 7223,
        "netDistributed": 40927,
        "payoutPerShare": 0.401
      },
      {
        "month": "Sep 2026",
        "grossCollected": 48150,
        "expenses": 7223,
        "netDistributed": 40927,
        "payoutPerShare": 0.401
      },
      {
        "month": "Oct 2026",
        "grossCollected": 48150,
        "expenses": 7223,
        "netDistributed": 40927,
        "payoutPerShare": 0.401
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-vn-sgn-thu-thiem-01",
        "category": "Legal & Title",
        "title": "Vietnam Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Ho Chi Minh City Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-vn-sgn-thu-thiem-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-vn-sgn-thu-thiem-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-vn-sgn-thu-thiem-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 32400,
      "insuranceAnnual": 16200,
      "maintenanceAnnual": 27000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 10800
    },
    "assignedManager": {
      "id": "mgr-prop-vn-sgn-thu-thiem",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 48,
      "occupiedUnits": 47,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-VN-1108",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-my-kul-bangsar",
    "slug": "kuala-lumpur-bangsar-south-hub",
    "title": "Bangsar South MSC Tech Offices",
    "headline": "Multimedia Super Corridor (MSC) certified office hub with high foreign tech enterprise density",
    "description": "Tax-incentivized corporate hub with direct LRT train connection and modern dining boardwalk.",
    "city": "Kuala Lumpur",
    "country": "Malaysia",
    "countryCode": "MY",
    "address": "Jalan Kerinchi, Bangsar South, KL",
    "category": "office",
    "developer": "UOA Development",
    "yearBuilt": 2022,
    "totalAreaSqFt": 76000,
    "totalValuation": 6400000,
    "sharePrice": 60,
    "netYield": 9.2,
    "grossYield": 10.9,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 106667,
    "availableShares": 21973,
    "fundedPercentage": 79.4,
    "estimatedMonthlyRent": 58133,
    "monthlyPerShareRent": 0.545,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6451200,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 99,
      "marketMomentum": 98,
      "propertyCondition": 97,
      "rentalDemand": 92
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5952000,
        "sharePrice": 55.8
      },
      {
        "date": "2026-02",
        "value": 6080000,
        "sharePrice": 57
      },
      {
        "date": "2026-05",
        "value": 6208000,
        "sharePrice": 58.2
      },
      {
        "date": "2026-08",
        "value": 6336000,
        "sharePrice": 59.4
      },
      {
        "date": "2026-11",
        "value": 6400000,
        "sharePrice": 60
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6412800,
        "mid": 6438400,
        "high": 6470400
      },
      {
        "month": "Jan 2027",
        "low": 6432000,
        "mid": 6476800,
        "high": 6521600
      },
      {
        "month": "Feb 2027",
        "low": 6457600,
        "mid": 6515200,
        "high": 6579200
      },
      {
        "month": "Mar 2027",
        "low": 6483200,
        "mid": 6560000,
        "high": 6636800
      },
      {
        "month": "Apr 2027",
        "low": 6515200,
        "mid": 6604800,
        "high": 6700800
      },
      {
        "month": "May 2027",
        "low": 6547200,
        "mid": 6656000,
        "high": 6771200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 57533,
        "expenses": 8720,
        "netDistributed": 48813,
        "payoutPerShare": 0.458
      },
      {
        "month": "Jul 2026",
        "grossCollected": 57933,
        "expenses": 8720,
        "netDistributed": 49213,
        "payoutPerShare": 0.461
      },
      {
        "month": "Aug 2026",
        "grossCollected": 58133,
        "expenses": 8720,
        "netDistributed": 49413,
        "payoutPerShare": 0.545
      },
      {
        "month": "Sep 2026",
        "grossCollected": 58133,
        "expenses": 8720,
        "netDistributed": 49413,
        "payoutPerShare": 0.545
      },
      {
        "month": "Oct 2026",
        "grossCollected": 58133,
        "expenses": 8720,
        "netDistributed": 49413,
        "payoutPerShare": 0.545
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-my-kul-bangsar-01",
        "category": "Legal & Title",
        "title": "Malaysia Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Kuala Lumpur Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-my-kul-bangsar-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-my-kul-bangsar-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-my-kul-bangsar-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 38400,
      "insuranceAnnual": 19200,
      "maintenanceAnnual": 32000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12800
    },
    "assignedManager": {
      "id": "mgr-prop-my-kul-bangsar",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 63,
      "occupiedUnits": 60,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-MY-1109",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-th-cnx-nimman",
    "slug": "chiang-mai-nimman-digital-suites",
    "title": "Nimman Creative Digital Suites",
    "headline": "Co-living and serviced apartments in Chiang Mai's bustling digital nomad and cafe enclave",
    "description": "Low acquisition cost with steady 96% occupancy from global remote knowledge workers.",
    "city": "Chiang Mai",
    "country": "Thailand",
    "countryCode": "TH",
    "address": "Nimmanhaemin Road, Chiang Mai",
    "category": "residential",
    "developer": "Chiang Mai Heritage Co.",
    "yearBuilt": 2022,
    "totalAreaSqFt": 36000,
    "totalValuation": 2400000,
    "sharePrice": 25,
    "netYield": 9.7,
    "grossYield": 11.6,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 96000,
    "availableShares": 13056,
    "fundedPercentage": 86.4,
    "estimatedMonthlyRent": 23200,
    "monthlyPerShareRent": 0.242,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 2438400,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 90,
      "marketMomentum": 88,
      "propertyCondition": 98,
      "rentalDemand": 93
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 2232000,
        "sharePrice": 23.3
      },
      {
        "date": "2026-02",
        "value": 2280000,
        "sharePrice": 23.8
      },
      {
        "date": "2026-05",
        "value": 2328000,
        "sharePrice": 24.3
      },
      {
        "date": "2026-08",
        "value": 2376000,
        "sharePrice": 24.8
      },
      {
        "date": "2026-11",
        "value": 2400000,
        "sharePrice": 25
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 2404800,
        "mid": 2414400,
        "high": 2426400
      },
      {
        "month": "Jan 2027",
        "low": 2412000,
        "mid": 2428800,
        "high": 2445600
      },
      {
        "month": "Feb 2027",
        "low": 2421600,
        "mid": 2443200,
        "high": 2467200
      },
      {
        "month": "Mar 2027",
        "low": 2431200,
        "mid": 2460000,
        "high": 2488800
      },
      {
        "month": "Apr 2027",
        "low": 2443200,
        "mid": 2476800,
        "high": 2512800
      },
      {
        "month": "May 2027",
        "low": 2455200,
        "mid": 2496000,
        "high": 2539200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 22600,
        "expenses": 3480,
        "netDistributed": 19120,
        "payoutPerShare": 0.199
      },
      {
        "month": "Jul 2026",
        "grossCollected": 23000,
        "expenses": 3480,
        "netDistributed": 19520,
        "payoutPerShare": 0.203
      },
      {
        "month": "Aug 2026",
        "grossCollected": 23200,
        "expenses": 3480,
        "netDistributed": 19720,
        "payoutPerShare": 0.242
      },
      {
        "month": "Sep 2026",
        "grossCollected": 23200,
        "expenses": 3480,
        "netDistributed": 19720,
        "payoutPerShare": 0.242
      },
      {
        "month": "Oct 2026",
        "grossCollected": 23200,
        "expenses": 3480,
        "netDistributed": 19720,
        "payoutPerShare": 0.242
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-th-cnx-nimman-01",
        "category": "Legal & Title",
        "title": "Thailand Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Chiang Mai Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-th-cnx-nimman-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-th-cnx-nimman-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-th-cnx-nimman-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 14400,
      "insuranceAnnual": 7200,
      "maintenanceAnnual": 12000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 4800
    },
    "assignedManager": {
      "id": "mgr-prop-th-cnx-nimman",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 30,
      "occupiedUnits": 29,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-TH-1110",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-jp-fuk-hakata",
    "slug": "fukuoka-hakata-startup-residences",
    "title": "Fukuoka Gateway Startup Suites",
    "headline": "Smart studio apartments in Japan's designated National Strategic Special Zone for startups",
    "description": "Minutes from Fukuoka Airport and Hakata Shinkansen station, benefiting from strong Asian inbound migration.",
    "city": "Fukuoka",
    "country": "Japan",
    "countryCode": "JP",
    "address": "Hakata-ekimae, Hakata-ku, Fukuoka",
    "category": "residential",
    "developer": "Nishi-Nippon Railroad",
    "yearBuilt": 2023,
    "totalAreaSqFt": 44000,
    "totalValuation": 5800000,
    "sharePrice": 50,
    "netYield": 7.4,
    "grossYield": 8.8,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 116000,
    "availableShares": 7656,
    "fundedPercentage": 93.4,
    "estimatedMonthlyRent": 42533,
    "monthlyPerShareRent": 0.367,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 5939200,
    "aiValuationConfidence": 98,
    "marketDrivers": {
      "locationDemand": 91,
      "marketMomentum": 89,
      "propertyCondition": 99,
      "rentalDemand": 94
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5394000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 5510000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 5626000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 5742000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 5800000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 5811600,
        "mid": 5834800,
        "high": 5863800
      },
      {
        "month": "Jan 2027",
        "low": 5829000,
        "mid": 5869600,
        "high": 5910200
      },
      {
        "month": "Feb 2027",
        "low": 5852200,
        "mid": 5904400,
        "high": 5962400
      },
      {
        "month": "Mar 2027",
        "low": 5875400,
        "mid": 5945000,
        "high": 6014600
      },
      {
        "month": "Apr 2027",
        "low": 5904400,
        "mid": 5985600,
        "high": 6072600
      },
      {
        "month": "May 2027",
        "low": 5933400,
        "mid": 6032000,
        "high": 6136400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 41933,
        "expenses": 6380,
        "netDistributed": 35553,
        "payoutPerShare": 0.306
      },
      {
        "month": "Jul 2026",
        "grossCollected": 42333,
        "expenses": 6380,
        "netDistributed": 35953,
        "payoutPerShare": 0.31
      },
      {
        "month": "Aug 2026",
        "grossCollected": 42533,
        "expenses": 6380,
        "netDistributed": 36153,
        "payoutPerShare": 0.367
      },
      {
        "month": "Sep 2026",
        "grossCollected": 42533,
        "expenses": 6380,
        "netDistributed": 36153,
        "payoutPerShare": 0.367
      },
      {
        "month": "Oct 2026",
        "grossCollected": 42533,
        "expenses": 6380,
        "netDistributed": 36153,
        "payoutPerShare": 0.367
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-jp-fuk-hakata-01",
        "category": "Legal & Title",
        "title": "Japan Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Fukuoka Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-jp-fuk-hakata-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-jp-fuk-hakata-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-jp-fuk-hakata-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 34800,
      "insuranceAnnual": 17400,
      "maintenanceAnnual": 29000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 11600
    },
    "assignedManager": {
      "id": "mgr-prop-jp-fuk-hakata",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 37,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-JP-1111",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-bos-seaport",
    "slug": "boston-seaport-biotech-campus",
    "title": "Boston Seaport Innovation Tower",
    "headline": "Waterfront commercial lab and executive office building in the world's leading life sciences capital",
    "description": "Long-term leases with top biotechnology and pharmaceutical research syndicates.",
    "city": "Boston",
    "country": "United States",
    "countryCode": "US",
    "address": "Seaport Boulevard, Boston, MA",
    "category": "office",
    "developer": "WS Development",
    "yearBuilt": 2022,
    "totalAreaSqFt": 84000,
    "totalValuation": 16200000,
    "sharePrice": 150,
    "netYield": 7,
    "grossYield": 8.4,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 108000,
    "availableShares": 24408,
    "fundedPercentage": 77.4,
    "estimatedMonthlyRent": 113400,
    "monthlyPerShareRent": 1.05,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 15811200,
    "aiValuationConfidence": 92,
    "marketDrivers": {
      "locationDemand": 92,
      "marketMomentum": 90,
      "propertyCondition": 92,
      "rentalDemand": 95
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 15066000,
        "sharePrice": 139.5
      },
      {
        "date": "2026-02",
        "value": 15390000,
        "sharePrice": 142.5
      },
      {
        "date": "2026-05",
        "value": 15714000,
        "sharePrice": 145.5
      },
      {
        "date": "2026-08",
        "value": 16038000,
        "sharePrice": 148.5
      },
      {
        "date": "2026-11",
        "value": 16200000,
        "sharePrice": 150
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 16232400,
        "mid": 16297200,
        "high": 16378200
      },
      {
        "month": "Jan 2027",
        "low": 16281000,
        "mid": 16394400,
        "high": 16507800
      },
      {
        "month": "Feb 2027",
        "low": 16345800,
        "mid": 16491600,
        "high": 16653600
      },
      {
        "month": "Mar 2027",
        "low": 16410600,
        "mid": 16605000,
        "high": 16799400
      },
      {
        "month": "Apr 2027",
        "low": 16491600,
        "mid": 16718400,
        "high": 16961400
      },
      {
        "month": "May 2027",
        "low": 16572600,
        "mid": 16848000,
        "high": 17139600
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 112800,
        "expenses": 17010,
        "netDistributed": 95790,
        "payoutPerShare": 0.887
      },
      {
        "month": "Jul 2026",
        "grossCollected": 113200,
        "expenses": 17010,
        "netDistributed": 96190,
        "payoutPerShare": 0.891
      },
      {
        "month": "Aug 2026",
        "grossCollected": 113400,
        "expenses": 17010,
        "netDistributed": 96390,
        "payoutPerShare": 1.05
      },
      {
        "month": "Sep 2026",
        "grossCollected": 113400,
        "expenses": 17010,
        "netDistributed": 96390,
        "payoutPerShare": 1.05
      },
      {
        "month": "Oct 2026",
        "grossCollected": 113400,
        "expenses": 17010,
        "netDistributed": 96390,
        "payoutPerShare": 1.05
      }
    ],
    "dueDiligenceScore": 97,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-bos-seaport-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Boston Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-bos-seaport-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-bos-seaport-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-bos-seaport-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 97200,
      "insuranceAnnual": 48600,
      "maintenanceAnnual": 81000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 32400
    },
    "assignedManager": {
      "id": "mgr-prop-us-bos-seaport",
      "name": "Kenji Sato",
      "company": "Mitsui Fudosan Residential",
      "rating": 4.9,
      "phone": "+81 3 3245 7788"
    },
    "tenantMetrics": {
      "totalUnits": 70,
      "occupiedUnits": 69,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1112",
    "transparencyScore": 98,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-sfo-mission-bay",
    "slug": "san-francisco-mission-bay-condos",
    "title": "Mission Bay Waterfront Residences",
    "headline": "Modern apartments near Chase Center and UCSF Medical Center with San Francisco Bay views",
    "description": "Walk-to-work tech and medical tenant demographic with private ferry connections.",
    "city": "San Francisco",
    "country": "United States",
    "countryCode": "US",
    "address": "Channel Street, Mission Bay, SF, CA",
    "category": "residential",
    "developer": "Mission Bay Development Group",
    "yearBuilt": 2021,
    "totalAreaSqFt": 58000,
    "totalValuation": 12800000,
    "sharePrice": 120,
    "netYield": 6.9,
    "grossYield": 8.2,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 106667,
    "availableShares": 16640,
    "fundedPercentage": 84.4,
    "estimatedMonthlyRent": 87467,
    "monthlyPerShareRent": 0.82,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 12595200,
    "aiValuationConfidence": 93,
    "marketDrivers": {
      "locationDemand": 93,
      "marketMomentum": 91,
      "propertyCondition": 93,
      "rentalDemand": 96
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 11904000,
        "sharePrice": 111.6
      },
      {
        "date": "2026-02",
        "value": 12160000,
        "sharePrice": 114
      },
      {
        "date": "2026-05",
        "value": 12416000,
        "sharePrice": 116.4
      },
      {
        "date": "2026-08",
        "value": 12672000,
        "sharePrice": 118.8
      },
      {
        "date": "2026-11",
        "value": 12800000,
        "sharePrice": 120
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 12825600,
        "mid": 12876800,
        "high": 12940800
      },
      {
        "month": "Jan 2027",
        "low": 12864000,
        "mid": 12953600,
        "high": 13043200
      },
      {
        "month": "Feb 2027",
        "low": 12915200,
        "mid": 13030400,
        "high": 13158400
      },
      {
        "month": "Mar 2027",
        "low": 12966400,
        "mid": 13120000,
        "high": 13273600
      },
      {
        "month": "Apr 2027",
        "low": 13030400,
        "mid": 13209600,
        "high": 13401600
      },
      {
        "month": "May 2027",
        "low": 13094400,
        "mid": 13312000,
        "high": 13542400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 86867,
        "expenses": 13120,
        "netDistributed": 73747,
        "payoutPerShare": 0.691
      },
      {
        "month": "Jul 2026",
        "grossCollected": 87267,
        "expenses": 13120,
        "netDistributed": 74147,
        "payoutPerShare": 0.695
      },
      {
        "month": "Aug 2026",
        "grossCollected": 87467,
        "expenses": 13120,
        "netDistributed": 74347,
        "payoutPerShare": 0.82
      },
      {
        "month": "Sep 2026",
        "grossCollected": 87467,
        "expenses": 13120,
        "netDistributed": 74347,
        "payoutPerShare": 0.82
      },
      {
        "month": "Oct 2026",
        "grossCollected": 87467,
        "expenses": 13120,
        "netDistributed": 74347,
        "payoutPerShare": 0.82
      }
    ],
    "dueDiligenceScore": 98,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-sfo-mission-bay-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "San Francisco Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-sfo-mission-bay-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-sfo-mission-bay-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-sfo-mission-bay-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 76800,
      "insuranceAnnual": 38400,
      "maintenanceAnnual": 64000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 25600
    },
    "assignedManager": {
      "id": "mgr-prop-us-sfo-mission-bay",
      "name": "Elena Rostova",
      "company": "Knight Frank Prime",
      "rating": 4.9,
      "phone": "+44 20 7861 1000"
    },
    "tenantMetrics": {
      "totalUnits": 48,
      "occupiedUnits": 47,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1113",
    "transparencyScore": 99,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-us-den-rino",
    "slug": "denver-rino-arts-district-lofts",
    "title": "River North (RiNo) Creative Lofts",
    "headline": "Modern sustainable timber lofts in Denver's energetic arts and craft brewery quarter",
    "description": "High young professional population with Rocky Mountain views and light rail access.",
    "city": "Denver",
    "country": "United States",
    "countryCode": "US",
    "address": "Larimer Street, RiNo, Denver, CO",
    "category": "residential",
    "developer": "Zeppelin Development",
    "yearBuilt": 2022,
    "totalAreaSqFt": 46000,
    "totalValuation": 7400000,
    "sharePrice": 70,
    "netYield": 7.9,
    "grossYield": 9.3,
    "occupancyRate": 98,
    "coverImage": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 105714,
    "availableShares": 9091,
    "fundedPercentage": 91.4,
    "estimatedMonthlyRent": 57350,
    "monthlyPerShareRent": 0.543,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7340800,
    "aiValuationConfidence": 94,
    "marketDrivers": {
      "locationDemand": 94,
      "marketMomentum": 92,
      "propertyCondition": 94,
      "rentalDemand": 97
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6882000,
        "sharePrice": 65.1
      },
      {
        "date": "2026-02",
        "value": 7030000,
        "sharePrice": 66.5
      },
      {
        "date": "2026-05",
        "value": 7178000,
        "sharePrice": 67.9
      },
      {
        "date": "2026-08",
        "value": 7326000,
        "sharePrice": 69.3
      },
      {
        "date": "2026-11",
        "value": 7400000,
        "sharePrice": 70
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 7414800,
        "mid": 7444400,
        "high": 7481400
      },
      {
        "month": "Jan 2027",
        "low": 7437000,
        "mid": 7488800,
        "high": 7540600
      },
      {
        "month": "Feb 2027",
        "low": 7466600,
        "mid": 7533200,
        "high": 7607200
      },
      {
        "month": "Mar 2027",
        "low": 7496200,
        "mid": 7585000,
        "high": 7673800
      },
      {
        "month": "Apr 2027",
        "low": 7533200,
        "mid": 7636800,
        "high": 7747800
      },
      {
        "month": "May 2027",
        "low": 7570200,
        "mid": 7696000,
        "high": 7829200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 56750,
        "expenses": 8603,
        "netDistributed": 48147,
        "payoutPerShare": 0.455
      },
      {
        "month": "Jul 2026",
        "grossCollected": 57150,
        "expenses": 8603,
        "netDistributed": 48547,
        "payoutPerShare": 0.459
      },
      {
        "month": "Aug 2026",
        "grossCollected": 57350,
        "expenses": 8603,
        "netDistributed": 48747,
        "payoutPerShare": 0.543
      },
      {
        "month": "Sep 2026",
        "grossCollected": 57350,
        "expenses": 8603,
        "netDistributed": 48747,
        "payoutPerShare": 0.543
      },
      {
        "month": "Oct 2026",
        "grossCollected": 57350,
        "expenses": 8603,
        "netDistributed": 48747,
        "payoutPerShare": 0.543
      }
    ],
    "dueDiligenceScore": 93,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-us-den-rino-01",
        "category": "Legal & Title",
        "title": "United States Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Denver Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-us-den-rino-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-us-den-rino-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-us-den-rino-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 44400,
      "insuranceAnnual": 22200,
      "maintenanceAnnual": 37000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 14800
    },
    "assignedManager": {
      "id": "mgr-prop-us-den-rino",
      "name": "Marcus Vance",
      "company": "CBRE Asset Management",
      "rating": 4.9,
      "phone": "+1 (555) 234-8890"
    },
    "tenantMetrics": {
      "totalUnits": 38,
      "occupiedUnits": 37,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-US-1114",
    "transparencyScore": 94,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ca-ott-parliament",
    "slug": "ottawa-downtown-civil-service-condos",
    "title": "Capital View Diplomatic Flats",
    "headline": "Executive residences walking distance to Parliament Hill and national ministry buildings",
    "description": "Extremely stable government and policy tenant base with zero recession volatility.",
    "city": "Ottawa",
    "country": "Canada",
    "countryCode": "CA",
    "address": "Elgin Street, Downtown Ottawa, ON",
    "category": "residential",
    "developer": "Claridge Homes",
    "yearBuilt": 2022,
    "totalAreaSqFt": 42000,
    "totalValuation": 4800000,
    "sharePrice": 50,
    "netYield": 7.5,
    "grossYield": 8.9,
    "occupancyRate": 99,
    "coverImage": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 96000,
    "availableShares": 23616,
    "fundedPercentage": 75.4,
    "estimatedMonthlyRent": 35600,
    "monthlyPerShareRent": 0.371,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 4800000,
    "aiValuationConfidence": 95,
    "marketDrivers": {
      "locationDemand": 95,
      "marketMomentum": 93,
      "propertyCondition": 95,
      "rentalDemand": 98
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 4464000,
        "sharePrice": 46.5
      },
      {
        "date": "2026-02",
        "value": 4560000,
        "sharePrice": 47.5
      },
      {
        "date": "2026-05",
        "value": 4656000,
        "sharePrice": 48.5
      },
      {
        "date": "2026-08",
        "value": 4752000,
        "sharePrice": 49.5
      },
      {
        "date": "2026-11",
        "value": 4800000,
        "sharePrice": 50
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 4809600,
        "mid": 4828800,
        "high": 4852800
      },
      {
        "month": "Jan 2027",
        "low": 4824000,
        "mid": 4857600,
        "high": 4891200
      },
      {
        "month": "Feb 2027",
        "low": 4843200,
        "mid": 4886400,
        "high": 4934400
      },
      {
        "month": "Mar 2027",
        "low": 4862400,
        "mid": 4920000,
        "high": 4977600
      },
      {
        "month": "Apr 2027",
        "low": 4886400,
        "mid": 4953600,
        "high": 5025600
      },
      {
        "month": "May 2027",
        "low": 4910400,
        "mid": 4992000,
        "high": 5078400
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 35000,
        "expenses": 5340,
        "netDistributed": 29660,
        "payoutPerShare": 0.309
      },
      {
        "month": "Jul 2026",
        "grossCollected": 35400,
        "expenses": 5340,
        "netDistributed": 30060,
        "payoutPerShare": 0.313
      },
      {
        "month": "Aug 2026",
        "grossCollected": 35600,
        "expenses": 5340,
        "netDistributed": 30260,
        "payoutPerShare": 0.371
      },
      {
        "month": "Sep 2026",
        "grossCollected": 35600,
        "expenses": 5340,
        "netDistributed": 30260,
        "payoutPerShare": 0.371
      },
      {
        "month": "Oct 2026",
        "grossCollected": 35600,
        "expenses": 5340,
        "netDistributed": 30260,
        "payoutPerShare": 0.371
      }
    ],
    "dueDiligenceScore": 94,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ca-ott-parliament-01",
        "category": "Legal & Title",
        "title": "Canada Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Ottawa Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ca-ott-parliament-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ca-ott-parliament-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ca-ott-parliament-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 28800,
      "insuranceAnnual": 14400,
      "maintenanceAnnual": 24000,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 9600
    },
    "assignedManager": {
      "id": "mgr-prop-ca-ott-parliament",
      "name": "Amina Al-Mansoor",
      "company": "Asteco Property Management",
      "rating": 4.9,
      "phone": "+971 4 332 9901"
    },
    "tenantMetrics": {
      "totalUnits": 35,
      "occupiedUnits": 35,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-CA-1115",
    "transparencyScore": 95,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-ca-edm-ice-district",
    "slug": "edmonton-ice-district-plaza",
    "title": "ICE District Entertainment Tower",
    "headline": "Mixed-use retail and residential suites in Canada's largest sports and entertainment district",
    "description": "Connected to Rogers Place arena via climate-controlled underground pedestrian walkways.",
    "city": "Edmonton",
    "country": "Canada",
    "countryCode": "CA",
    "address": "104th Avenue, ICE District, Edmonton, AB",
    "category": "mixed-use",
    "developer": "OEG & Katz Group",
    "yearBuilt": 2022,
    "totalAreaSqFt": 64000,
    "totalValuation": 6100000,
    "sharePrice": 55,
    "netYield": 8.3,
    "grossYield": 9.9,
    "occupancyRate": 96,
    "coverImage": "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 110909,
    "availableShares": 19520,
    "fundedPercentage": 82.4,
    "estimatedMonthlyRent": 50325,
    "monthlyPerShareRent": 0.454,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 6148800,
    "aiValuationConfidence": 96,
    "marketDrivers": {
      "locationDemand": 96,
      "marketMomentum": 94,
      "propertyCondition": 96,
      "rentalDemand": 99
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 5673000,
        "sharePrice": 51.2
      },
      {
        "date": "2026-02",
        "value": 5795000,
        "sharePrice": 52.3
      },
      {
        "date": "2026-05",
        "value": 5917000,
        "sharePrice": 53.4
      },
      {
        "date": "2026-08",
        "value": 6039000,
        "sharePrice": 54.5
      },
      {
        "date": "2026-11",
        "value": 6100000,
        "sharePrice": 55
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6112200,
        "mid": 6136600,
        "high": 6167100
      },
      {
        "month": "Jan 2027",
        "low": 6130500,
        "mid": 6173200,
        "high": 6215900
      },
      {
        "month": "Feb 2027",
        "low": 6154900,
        "mid": 6209800,
        "high": 6270800
      },
      {
        "month": "Mar 2027",
        "low": 6179300,
        "mid": 6252500,
        "high": 6325700
      },
      {
        "month": "Apr 2027",
        "low": 6209800,
        "mid": 6295200,
        "high": 6386700
      },
      {
        "month": "May 2027",
        "low": 6240300,
        "mid": 6344000,
        "high": 6453800
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 49725,
        "expenses": 7549,
        "netDistributed": 42176,
        "payoutPerShare": 0.38
      },
      {
        "month": "Jul 2026",
        "grossCollected": 50125,
        "expenses": 7549,
        "netDistributed": 42576,
        "payoutPerShare": 0.384
      },
      {
        "month": "Aug 2026",
        "grossCollected": 50325,
        "expenses": 7549,
        "netDistributed": 42776,
        "payoutPerShare": 0.454
      },
      {
        "month": "Sep 2026",
        "grossCollected": 50325,
        "expenses": 7549,
        "netDistributed": 42776,
        "payoutPerShare": 0.454
      },
      {
        "month": "Oct 2026",
        "grossCollected": 50325,
        "expenses": 7549,
        "netDistributed": 42776,
        "payoutPerShare": 0.454
      }
    ],
    "dueDiligenceScore": 95,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-ca-edm-ice-district-01",
        "category": "Legal & Title",
        "title": "Canada Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Edmonton Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-ca-edm-ice-district-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-ca-edm-ice-district-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-ca-edm-ice-district-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 36600,
      "insuranceAnnual": 18300,
      "maintenanceAnnual": 30500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 12200
    },
    "assignedManager": {
      "id": "mgr-prop-ca-edm-ice-district",
      "name": "Tariq Malik",
      "company": "Zameen Asset Partners",
      "rating": 4.8,
      "phone": "+92 51 228 4400"
    },
    "tenantMetrics": {
      "totalUnits": 53,
      "occupiedUnits": 51,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-CA-1116",
    "transparencyScore": 96,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
  {
    "id": "prop-mx-mex-polanco",
    "slug": "mexico-city-polanco-embassy-suites",
    "title": "Polanco Campos Eliseos Residences",
    "headline": "Boutique luxury apartments in Mexico City's most affluent culinary and embassy enclave",
    "description": "Steps from Chapultepec Park with 24/7 armed private security, favored by international diplomats and founders.",
    "city": "Mexico City",
    "country": "Mexico",
    "countryCode": "MX",
    "address": "Campos Eliseos, Polanco, Mexico City",
    "category": "luxury",
    "developer": "Thor Urbana",
    "yearBuilt": 2022,
    "totalAreaSqFt": 54000,
    "totalValuation": 6900000,
    "sharePrice": 65,
    "netYield": 9.1,
    "grossYield": 10.9,
    "occupancyRate": 97,
    "coverImage": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    "status": "active",
    "totalShares": 106154,
    "availableShares": 11252,
    "fundedPercentage": 89.4,
    "estimatedMonthlyRent": 62675,
    "monthlyPerShareRent": 0.59,
    "nextPayoutDate": "2026-12-01",
    "aiEstimatedValuation": 7010400,
    "aiValuationConfidence": 97,
    "marketDrivers": {
      "locationDemand": 97,
      "marketMomentum": 95,
      "propertyCondition": 97,
      "rentalDemand": 91
    },
    "valuationHistory": [
      {
        "date": "2025-11",
        "value": 6417000,
        "sharePrice": 60.5
      },
      {
        "date": "2026-02",
        "value": 6555000,
        "sharePrice": 61.8
      },
      {
        "date": "2026-05",
        "value": 6693000,
        "sharePrice": 63
      },
      {
        "date": "2026-08",
        "value": 6831000,
        "sharePrice": 64.3
      },
      {
        "date": "2026-11",
        "value": 6900000,
        "sharePrice": 65
      }
    ],
    "aiForecast": [
      {
        "month": "Dec 2026",
        "low": 6913800,
        "mid": 6941400,
        "high": 6975900
      },
      {
        "month": "Jan 2027",
        "low": 6934500,
        "mid": 6982800,
        "high": 7031100
      },
      {
        "month": "Feb 2027",
        "low": 6962100,
        "mid": 7024200,
        "high": 7093200
      },
      {
        "month": "Mar 2027",
        "low": 6989700,
        "mid": 7072500,
        "high": 7155300
      },
      {
        "month": "Apr 2027",
        "low": 7024200,
        "mid": 7120800,
        "high": 7224300
      },
      {
        "month": "May 2027",
        "low": 7058700,
        "mid": 7176000,
        "high": 7300200
      }
    ],
    "rentalHistory": [
      {
        "month": "Jun 2026",
        "grossCollected": 62075,
        "expenses": 9401,
        "netDistributed": 52674,
        "payoutPerShare": 0.496
      },
      {
        "month": "Jul 2026",
        "grossCollected": 62475,
        "expenses": 9401,
        "netDistributed": 53074,
        "payoutPerShare": 0.5
      },
      {
        "month": "Aug 2026",
        "grossCollected": 62675,
        "expenses": 9401,
        "netDistributed": 53274,
        "payoutPerShare": 0.59
      },
      {
        "month": "Sep 2026",
        "grossCollected": 62675,
        "expenses": 9401,
        "netDistributed": 53274,
        "payoutPerShare": 0.59
      },
      {
        "month": "Oct 2026",
        "grossCollected": 62675,
        "expenses": 9401,
        "netDistributed": 53274,
        "payoutPerShare": 0.59
      }
    ],
    "dueDiligenceScore": 96,
    "dueDiligenceItems": [
      {
        "id": "dd-prop-mx-mex-polanco-01",
        "category": "Legal & Title",
        "title": "Mexico Land Registry Freehold Title Audit",
        "status": "Verified",
        "issuer": "Mexico City Title Authority & StateEra Legal",
        "verifiedDate": "2026-02-10",
        "expiryDate": "2036-02-10",
        "notes": "Clean title deed with verified non-encumbrance certificate.",
        "fileSize": "2.8 MB PDF"
      },
      {
        "id": "dd-prop-mx-mex-polanco-02",
        "category": "Inspection & Condition",
        "title": "Comprehensive Structural & MEP Engineering Report",
        "status": "Verified",
        "issuer": "Bureau Veritas International",
        "verifiedDate": "2026-08-15",
        "expiryDate": "2027-08-15",
        "notes": "Grade-A building integrity; zero seismic, foundation, or electrical defects.",
        "fileSize": "4.5 MB PDF"
      },
      {
        "id": "dd-prop-mx-mex-polanco-03",
        "category": "Financial Audit",
        "title": "Escrow Bank Account & Rental Income Reconciliation",
        "status": "Verified",
        "issuer": "Deloitte & Touche Global Audit",
        "verifiedDate": "2026-09-20",
        "expiryDate": "2027-09-20",
        "notes": "100% bank escrow verification and tenant rent ledger reconciliation.",
        "fileSize": "3.2 MB PDF"
      },
      {
        "id": "dd-prop-mx-mex-polanco-04",
        "category": "Insurance & Risk",
        "title": "Comprehensive Property Replacement & Business Interruption Cover",
        "status": "Verified",
        "issuer": "Allianz Global Corporate & Specialty",
        "verifiedDate": "2026-01-01",
        "expiryDate": "2027-01-01",
        "notes": "Full natural catastrophe, water damage, fire, and loss-of-rent insurance policy active.",
        "fileSize": "1.9 MB PDF"
      }
    ],
    "operatingExpenses": {
      "propertyTaxAnnual": 41400,
      "insuranceAnnual": 20700,
      "maintenanceAnnual": 34500,
      "managementFeeRate": 0.075,
      "capitalReservesAnnual": 13800
    },
    "assignedManager": {
      "id": "mgr-prop-mx-mex-polanco",
      "name": "Sophie Dubois",
      "company": "Savills Global Management",
      "rating": 4.9,
      "phone": "+33 1 44 22 11 00"
    },
    "tenantMetrics": {
      "totalUnits": 45,
      "occupiedUnits": 44,
      "avgLeaseMonths": 24,
      "onTimePaymentRate": 98
    },
    "propertyPassportId": "PASSPORT-SE-MX-1117",
    "transparencyScore": 97,
    "lastInspectionDate": "2026-08-15",
    "legalReviewStatus": "Verified",
    "isDemo": true
  },
];

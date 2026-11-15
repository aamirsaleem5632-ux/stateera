# StateEra — Fractional Real Estate & Rental Yield Investment Platform

StateEra is a premier international PropTech and FinTech web application enabling fractional real estate ownership, automated monthly rental dividend distributions, AI valuation forecasts, and secondary market liquidity.

---

## 🏛️ Key Features & Modules

1. **StateEra AI (Global Assistant)**
   - Persistent assistant floating on every page (bottom-right desktop, elevated above mobile bottom navigation).
   - Context-aware intelligence providing tailored guidance for Explore, Property Details, Trading, Wallet, Reports, Manager, Tenant, and Admin portals.
   - Deterministic real estate yield analysis, due diligence audits, and share investment calculations.
   - Full multi-language support (English, Urdu, Arabic, Punjabi, Hindi, Spanish) with automated RTL direction switching for Urdu and Arabic.

2. **Visual Property Library & Discovery (`/explore`)**
   - High-resolution architectural photography from prime international cities (Dubai, New York, London, Zurich, Singapore, Paris, Miami, Tokyo).
   - Search by property title, city, or country.
   - Filter by property category (Residential, Commercial, Luxury Villa, Waterfront, Penthouse).
   - Sliders for minimum net rental yield (7% - 11%) and maximum share price.
   - Sorting by net yield, share price, and property valuation.
   - Interactive World Map simulation with clickable pins and property preview cards.
   - Responsive Grid and List view toggles.

3. **Property Details & Due Diligence Centre (`/property/[id]`)**
   - Interactive multi-image gallery with high-resolution interior and exterior views.
   - Financial breakdown: total valuation, share price, available shares, and funding progress bar.
   - AI estimated valuation with confidence scoring (e.g., 96%) and market drivers (location demand, momentum, physical condition, rental absorption).
   - Interactive Recharts visualizer combining historical valuations with a 6-month AI forecast.
   - Rental collections vs net distributable income bar chart.
   - Dedicated Due Diligence Centre featuring verified Land Registry title certificates, Bureau Veritas engineering inspections, Big-4 financial escrow audits, and all-risk insurance policies with simulated document inspection.
   - Asset manager covenants and tenant stability metrics.

4. **Fractional Share Trading Exchange (`/trade/[id]`)**
   - Simulated secondary market share price movements.
   - Timeframe selectors: `5m`, `15m`, `30m`, `4h`, `1D`, `1M`.
   - Line/Area chart modes and candlestick simulation.
   - Market and Limit order execution card.
   - Real-time order value and estimated monthly rental income calculations.
   - Complete client-side validation against available wallet balance and owned share counts.
   - Instant order settlement updating demo wallet balance, holdings, and transaction records.

5. **Investor Dashboard (`/dashboard`)**
   - Portfolio summary: Total Portfolio Value, Total Invested, Capital Gain/Loss, Monthly Estimated Rental Income, Average Annual Yield.
   - Interactive "Simulate Monthly Dividend Payout" button that credits rental income across all owned fractional shares directly to the demo wallet.
   - Portfolio asset allocation donut/pie chart and monthly distribution run-rate.
   - My Fractional Holdings table with quick trade actions.
   - Saved assets watchlist with one-click bookmarking.
   - Recent transaction activity feed.

6. **Demo Wallet & Payout Distributions (`/wallet`)**
   - Real-time available demo cash balance ($25,000 default balance).
   - Deposit and withdrawal simulation forms with quick dollar chips.
   - Transparent Rental Payout Waterfall explainer:
     $$\text{Gross Rent} - \text{Operating Expenses} - \text{Maintenance Reserves} - \text{Management Fees} = \text{Net Distributable Income}$$
   - Filterable transaction ledger (All, Buy, Sell, Dividend Payout, Deposit, Withdraw).
   - Export CSV ledger functionality.

7. **Dedicated Reports & Analytics (`/reports`)**
   - Monthly, Annual, and Custom reporting tabs.
   - Net Operating Income (NOI) analytics, operating expense ratios, and distribution charts.
   - Property-wise net yield comparison visualizations.
   - Print-ready formatted report layout.
   - One-click CSV export.

8. **Property Manager Portal (`/manager`)**
   - Assigned asset oversight and occupancy metrics.
   - Log monthly tenant rent collections to fund the distribution escrow.
   - Create maintenance work orders with priority levels (Low, Medium, High, Emergency) and vendor assignments.
   - General property operational ledger with income and expense tracking.

9. **Tenant & Leasing Portal (`/tenant`)**
   - Active master lease covenants, lease start/expiry dates, monthly rent, and security deposit.
   - "Pay Monthly Rent" demo button updating the property management ledger and issuing instant receipts.
   - Resident maintenance request submission form with category selection.

10. **Investment Risk & Scenario Simulator (`/simulator`)**
    - Interactive stress-test sliders: Occupancy rate (40% - 100%), Rent variation (-25% to +25%), Maintenance index (50% - 200%), Management fees (4% - 12%), and Investment amount.
    - Side-by-side comparison of Worst Case (Recession), Current User Simulation, Base Platform Standard, and Best Case (Boom).
    - Comparative annual income bar charts and risk sensitivity insights.

11. **Ownership & Governance Centre (`/governance`)**
    - Shareholder voting resolutions (e.g., Solar Microgrid Installation, Asset Manager Contract Renewal).
    - Interactive Yes/No voting with weighted share voting progress bars.
    - Shareholder cap-table registry and retail free-float percentages.

12. **Smart Notification Centre (`/notifications`)**
    - Centralized notifications categorized by Payouts, Transactions, Maintenance, Leases, and Due Diligence.
    - Read/Unread tracking with "Mark All as Read" action.

13. **StateEra in Action (Landing Page Walkthrough)**
    - 30-60 second interactive animated product walkthrough.
    - 7 visual steps demonstrating marketplace browsing, AI valuation, yield calculation, share purchasing, portfolio tracking, dividend payouts, and AI copilot guidance.
    - Play, Pause, and Step scrubbing controls.

14. **Interactive Onboarding Modal**
    - 4-step guided onboarding experience introducing fractional investing, automated payouts, institutional due diligence, and secondary liquidity.

---

## 🎨 Strict Color Palette & Design System

The application strictly adheres to the approved StateEra pastel palette:

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Pastel Lavender** | `#F3EAFC` / `#E6D8F5` | Major page backgrounds, subtle fills, borders |
| **Soft Blush Pink** | `#FCE7F3` / `#F8D7E8` | Supporting accents, tags, subtle gradients |
| **Pastel Mint** | `#DCFCE7` | Badges, yield highlights, positive indicators |
| **Soft Sky** | `#E0F2FE` | Informational chips, secondary accents |
| **White Cards** | `#FFFFFF` | Primary surface cards, dialogs, and content tiles |
| **Purple / Indigo** | `#7C4DFF` / `#5B3A8C` | Primary buttons, brand logos, active highlights |

---

## 🌐 Multilingual & RTL Support

Centralized dictionaries in `src/lib/i18n/`:
- **English (`en`)** — LTR
- **Urdu (`ur`)** — RTL (authentic Urdu translation)
- **Arabic (`ar`)** — RTL (authentic Modern Standard Arabic)
- **Punjabi (`pa`)** — LTR (Gurmukhi)
- **Hindi (`hi`)** — LTR (Devanagari)
- **Spanish (`es`)** — LTR (Español)

Automatic HTML `dir="rtl"` and `lang` switching is handled by `LanguageProvider` with `localStorage` persistence.

---

## ⚙️ Technology Stack

- **Framework:** Next.js 14 (App Router, React 18, TypeScript)
- **Styling:** Tailwind CSS with custom design tokens and CSS variables
- **Charts:** Recharts (Area, Bar, Pie, Line)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **State Persistence:** LocalStorage sync via `DemoProvider`

---

## 🚀 Installation & Running

```bash
# 1. Navigate to the project directory
cd stateera

# 2. Install dependencies (if not already installed)
npm install

# 3. Build for production
npm run build

# 4. Start production server on port 3000
npm start -- -p 3000

# Alternatively, run development mode with hot reload:
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚠️ Regulatory Disclaimer

*StateEra is a functional demonstration prototype. All properties, investment figures, valuations, tenant leases, and rental payouts operate in simulation mode for demonstration and evaluation purposes.*

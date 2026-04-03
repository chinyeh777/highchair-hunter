# 🍼 Highchair Hunter (高腳椅獵人)

A restaurant radar for new parents. Find child-friendly restaurants near Taipei MRT stations.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Maps**: @vis.gl/react-google-maps
- **Cache**: Upstash Redis (optional, for production)
- **Deploy**: Vercel

## Project Structure

```
highchair-hunter/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts          # API Route: Places search + details
│   ├── layout.tsx
│   ├── page.tsx                  # Main page
│   └── globals.css
├── components/
│   ├── SearchPanel.tsx           # Left panel: filters
│   ├── RestaurantList.tsx        # Results list with pagination
│   ├── RestaurantCard.tsx        # Single restaurant card
│   ├── MapView.tsx               # Google Map with markers
│   ├── FilterBar.tsx             # Rating / review count / distance sliders
│   └── StatusBadge.tsx           # Highchair / child-friendly badge
├── lib/
│   ├── store.ts                  # Zustand store
│   ├── types.ts                  # Shared TypeScript interfaces
│   ├── stations.ts               # Taipei MRT stations data (131 stations)
│   └── utils.ts                  # Helpers (distance calc, data normalizer)
├── .env.local.example
└── package.json
```

## Setup

```bash
# 1. Clone and install
npm install

# 2. Copy env file
cp .env.local.example .env.local

# 3. Fill in your Google Maps API Key
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
# GOOGLE_PLACES_API_KEY=your_key_here (server-side, same key or restricted)

# 4. Run dev server
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | ✅ | For map rendering (browser) |
| `GOOGLE_PLACES_API_KEY` | ✅ | For Places API calls (server) |
| `UPSTASH_REDIS_REST_URL` | Optional | Redis cache URL |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Redis cache token |

## Google API Setup

Enable these APIs in Google Cloud Console:
1. Maps JavaScript API
2. Places API (New)
3. Geocoding API

## Phase 2 (SerpApi Integration)

When ready to upgrade highchair detection accuracy:
1. Add `SERPAPI_KEY` to env
2. Uncomment SerpApi block in `app/api/search/route.ts`
3. The Redis cache layer is already wired — same TTL logic applies

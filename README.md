# Campfinder Seattle

AI-powered summer camp discovery for Seattle-area parents. Find, filter, and compare hundreds of summer camps across Seattle, Bellevue, Kirkland, Redmond, and the surrounding area.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Component Structure

```
src/
├── types.ts                  # Shared TypeScript types
├── mockApi.ts                # Mock data layer — swap this for real API calls
├── App.tsx                   # Root component and page router
├── App.module.css            # Root layout styles
│
├── components/
│   ├── Nav/
│   │   ├── Nav.tsx           # Top navigation bar
│   │   └── Nav.module.css
│   │
│   ├── HomePage/
│   │   ├── HomePage.tsx      # Landing page with AI search + featured camps
│   │   └── HomePage.module.css
│   │
│   ├── SearchBar/
│   │   ├── SearchBar.tsx     # AI search textarea + chip suggestions
│   │   └── SearchBar.module.css
│   │
│   ├── FilterBar/
│   │   ├── FilterBar.tsx     # Quick filter dropdowns
│   │   └── FilterBar.module.css
│   │
│   ├── CampCard/
│   │   ├── CampCard.tsx      # Camp result card (list + map variants)
│   │   └── CampCard.module.css
│   │
│   ├── ResultsPage/
│   │   ├── ResultsPage.tsx   # Search results: AI summary, list/map toggle, cards
│   │   └── ResultsPage.module.css
│   │
│   ├── DetailPage/
│   │   ├── DetailPage.tsx    # Camp detail: hero, stats, sessions, schedule, host
│   │   └── DetailPage.module.css
│   │
│   ├── LoadingState/
│   │   ├── LoadingState.tsx  # Skeleton loading screen
│   │   └── LoadingState.module.css
│   │
│   └── EmptyState/
│       ├── EmptyState.tsx    # No results state with suggestions
│       └── EmptyState.module.css
```

## Replacing Mock Data

All camp data and search behavior is isolated in **`src/mockApi.ts`**. It exports:

```ts
export async function searchCamps(query: string, filters: Filters): Promise<SearchResult>
export async function getCamp(id: number): Promise<Camp | null>
export async function getFeaturedCamps(): Promise<Camp[]>
```

Replace these three functions with calls to your real API and the rest of the UI works without changes.

## Design Tokens

All colors, typography, and spacing are defined as CSS custom properties in `src/tokens.css`. Edit that file to update the visual theme globally.

## Tech Stack

- React 18 + TypeScript
- Vite
- CSS Modules (no UI framework)
- Leaflet + react-leaflet for map view
- Google Fonts: Fraunces (display) + DM Sans (body)

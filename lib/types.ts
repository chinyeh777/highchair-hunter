// lib/types.ts
// ============================================================
// Single source of truth for all data shapes.
// All fields use explicit defaults — undefined is BANNED.
// ============================================================

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MrtStation {
  id: string;          // e.g. "BL01"
  name: string;        // e.g. "新埔"
  nameEn: string;      // e.g. "Xinpu"
  line: MrtLine;
  location: LatLng;
}

export type MrtLine =
  | 'BL' // 板南線 Blue
  | 'R'  // 淡水信義線 Red
  | 'G'  // 松山新店線 Green
  | 'O'  // 中和新蘆線 Orange
  | 'Y'  // 環狀線 Yellow
  | 'BR' // 文湖線 Brown

export const LINE_LABELS: Record<MrtLine, string> = {
  BL: '板南線',
  R:  '淡水信義線',
  G:  '松山新店線',
  O:  '中和新蘆線',
  Y:  '環狀線',
  BR: '文湖線',
};

export const LINE_COLORS: Record<MrtLine, string> = {
  BL: '#0070BD',
  R:  '#E3002C',
  G:  '#008659',
  O:  '#F5A623',
  Y:  '#FDD000',
  BR: '#C48A00',
};

// ============================================================
// Restaurant — fully typed, no optional fields that can crash
// ============================================================

export interface Restaurant {
  placeId: string;
  name: string;
  rating: number;              // 0–5, always a number
  reviewCount: number;         // always a number
  address: string;             // always a string
  location: LatLng;
  priceLevel: number | null;   // null = unknown, 0–4
  isChildFriendly: boolean | null;    // null = API didn't return
  hasHighchair: boolean | null;       // null = unverified (Phase 2: SerpApi)
  photos: string[];            // URLs array, may be empty []
  googleMapsUrl: string;       // always a valid URL
  distanceMeters: number;      // distance from searched station
  primaryType: string;         // e.g. "restaurant", "cafe"
  openNow: boolean | null;     // null = unknown
}

// ============================================================
// Search params — what the user sets in the filter panel
// ============================================================

export interface SearchParams {
  stationId: string;
  radiusMeters: number;        // 300 | 500 | 800 | 1000 | 1500
  minRating: number;           // 3.5 | 4.0 | 4.2 | 4.5
  minReviewCount: number;      // 10 | 30 | 50 | 100
  childFriendlyOnly: boolean;
}

export const DEFAULT_SEARCH_PARAMS: SearchParams = {
  stationId: '',
  radiusMeters: 800,
  minRating: 4.0,
  minReviewCount: 50,
  childFriendlyOnly: false,
};

// ============================================================
// API response shapes
// ============================================================

export interface SearchApiResponse {
  restaurants: Restaurant[];
  total: number;
  stationName: string;
  searchedAt: string;          // ISO timestamp
}

export interface SearchApiError {
  error: string;
  code: string;
}

// ============================================================
// App view state
// ============================================================

export type ViewMode = 'list' | 'map' | 'split';

export interface AppState {
  searchParams: SearchParams;
  results: Restaurant[];
  isLoading: boolean;
  error: string | null;
  viewMode: ViewMode;
  selectedPlaceId: string | null;
  page: number;
  hasMore: boolean;
}

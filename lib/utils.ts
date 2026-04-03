// lib/utils.ts

import type { Restaurant } from './types';

// ── Distance (Haversine) ─────────────────────────────────
export function haversineMeters(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371000; // Earth radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

// ── Walking time estimate (avg 80m/min) ──────────────────
export function walkingMinutes(meters: number): number {
  return Math.round(meters / 80);
}

// ── Google Maps Universal Link (opens in App or browser) ─
export function buildGoogleMapsNavUrl(placeId: string, name: string): string {
  const encodedName = encodeURIComponent(name);
  // This URL opens Google Maps App on iOS/Android, or browser fallback
  return `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${placeId}`;
}

// ── Price level display ───────────────────────────────────
export function priceLevelLabel(level: number | null): string {
  if (level === null) return '';
  return ['免費', '$', '$$', '$$$', '$$$$'][level] ?? '';
}

// ── Normalize a raw Google Places API response ───────────
// This is the critical function that ensures no undefined values reach the UI.
// Called server-side in the API route.
export function normalizePlaceResult(
  raw: Record<string, unknown>,
  stationLat: number,
  stationLng: number
): Restaurant | null {
  // placeId and name are mandatory — reject if missing
  const placeId = safeString(raw.id ?? raw.place_id);
  const name = safeString(raw.displayName?.text ?? raw.name);

  if (!placeId || !name) return null;

  const location = parseLocation(raw.location ?? raw.geometry);

  return {
    placeId,
    name,
    rating: safeNumber(raw.rating, 0),
    reviewCount: safeNumber(raw.userRatingCount ?? raw.user_ratings_total, 0),
    address: safeString(
      raw.shortFormattedAddress ??
      raw.formattedAddress ??
      raw.vicinity ??
      ''
    ),
    location,
    priceLevel: parsePriceLevel(raw.priceLevel ?? raw.price_level),
    isChildFriendly: parseBooleanField(
      raw.goodForChildren ?? raw.good_for_children
    ),
    hasHighchair: null, // Phase 2: SerpApi
    photos: parsePhotos(raw.photos),
    googleMapsUrl: buildGoogleMapsNavUrl(placeId, name),
    distanceMeters: location
      ? Math.round(haversineMeters(stationLat, stationLng, location.lat, location.lng))
      : 99999,
    primaryType: safeString(
      raw.primaryTypeDisplayName?.text ??
      raw.primaryType ??
      (Array.isArray(raw.types) ? raw.types[0] : '') ??
      '餐廳'
    ),
    openNow: parseOpenNow(raw.regularOpeningHours ?? raw.currentOpeningHours ?? raw.opening_hours),
  };
}

// ── Safe type coercions — never return undefined ──────────

function safeString(val: unknown): string {
  if (typeof val === 'string') return val;
  if (val === null || val === undefined) return '';
  return String(val);
}

function safeNumber(val: unknown, fallback: number): number {
  if (typeof val === 'number' && !isNaN(val)) return val;
  const parsed = Number(val);
  return isNaN(parsed) ? fallback : parsed;
}

function parseBooleanField(val: unknown): boolean | null {
  if (typeof val === 'boolean') return val;
  if (val === 'true' || val === 1) return true;
  if (val === 'false' || val === 0) return false;
  return null; // unknown — not undefined
}

function parsePriceLevel(val: unknown): number | null {
  // New API returns strings like "PRICE_LEVEL_MODERATE"
  const levelMap: Record<string, number> = {
    PRICE_LEVEL_FREE: 0,
    PRICE_LEVEL_INEXPENSIVE: 1,
    PRICE_LEVEL_MODERATE: 2,
    PRICE_LEVEL_EXPENSIVE: 3,
    PRICE_LEVEL_VERY_EXPENSIVE: 4,
  };
  if (typeof val === 'string' && val in levelMap) return levelMap[val];
  if (typeof val === 'number') return val;
  return null;
}

function parseLocation(loc: unknown): { lat: number; lng: number } {
  if (!loc || typeof loc !== 'object') return { lat: 0, lng: 0 };
  const l = loc as Record<string, unknown>;

  // New Places API format
  if (typeof l.latitude === 'number' && typeof l.longitude === 'number') {
    return { lat: l.latitude, lng: l.longitude };
  }
  // Old Places API via geometry.location
  if (l.location && typeof l.location === 'object') {
    const inner = l.location as Record<string, unknown>;
    if (typeof inner.lat === 'number') return { lat: inner.lat, lng: inner.lng as number };
  }
  return { lat: 0, lng: 0 };
}

function parsePhotos(photos: unknown): string[] {
  if (!Array.isArray(photos)) return [];
  return photos
    .slice(0, 3)
    .map((p: unknown) => {
      const photo = p as Record<string, unknown>;
      // New API: photo.name is like "places/xxx/photos/yyy"
      if (typeof photo.name === 'string') {
        return `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&maxWidthPx=400`;
      }
      // Old API: photo_reference
      if (typeof photo.photo_reference === 'string') {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}`;
      }
      return '';
    })
    .filter(Boolean);
}

function parseOpenNow(hours: unknown): boolean | null {
  if (!hours || typeof hours !== 'object') return null;
  const h = hours as Record<string, unknown>;
  if (typeof h.openNow === 'boolean') return h.openNow;
  if (typeof h.open_now === 'boolean') return h.open_now;
  return null;
}

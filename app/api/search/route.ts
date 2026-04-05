// app/api/search/route.ts
// ============================================================
// Backend proxy for Google Places API.
// Runs server-side — avoids CORS, SDK restrictions, and
// browser-side API key exposure.
//
// Flow:
//   1. Nearby Search (New API) → up to 20 restaurants
//   2. Parallel Place Details → goodForChildren, photos, etc.
//   3. Normalize + filter → clean Restaurant[] to frontend
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { getStation } from '@/lib/stations';
import { normalizePlaceResult } from '@/lib/utils';
import type { Restaurant, SearchApiResponse, SearchApiError } from '@/lib/types';

const PLACES_API_BASE = 'https://places.googleapis.com/v1';
const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';

// Fields requested in Nearby Search (cost: Basic SKU)
const NEARBY_FIELDS = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.location',
  'places.rating',
  'places.userRatingCount',
  'places.priceLevel',
  'places.primaryType',
  'places.primaryTypeDisplayName',
  'places.photos',
  'places.regularOpeningHours',
  'places.shortFormattedAddress',
].join(',');

// Additional fields for Place Details (cost: Advanced SKU)
// goodForChildren lives here — this is the key difference from SDK approach
const DETAIL_FIELDS = [
  'id',
  'goodForChildren',
  'menuForChildren',
].join(',');

export async function GET(req: NextRequest): Promise<NextResponse<SearchApiResponse | SearchApiError>> {
  // ── 0. Validate API Key ───────────────────────────────
  if (!API_KEY) {
    console.error('[search] GOOGLE_PLACES_API_KEY not set');
    return NextResponse.json(
      { error: '伺服器設定錯誤，請聯繫管理員', code: 'NO_API_KEY' },
      { status: 500 }
    );
  }

  // ── 1. Parse & validate query params ─────────────────
  const { searchParams } = req.nextUrl;
  const stationId = searchParams.get('stationId') ?? '';
  const radiusMeters = parseInt(searchParams.get('radiusMeters') ?? '800', 10);
  const minRating = parseFloat(searchParams.get('minRating') ?? '4.0');
  const minReviewCount = parseInt(searchParams.get('minReviewCount') ?? '50', 10);
  const childFriendlyOnly = searchParams.get('childFriendlyOnly') === 'true';

  const station = getStation(stationId);
  if (!station) {
    return NextResponse.json(
      { error: '找不到指定的捷運站', code: 'INVALID_STATION' },
      { status: 400 }
    );
  }

  try {
    // ── 2. Nearby Search ────────────────────────────────
    const nearbyRes = await fetch(`${PLACES_API_BASE}/places:searchNearby`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': NEARBY_FIELDS,
        'X-Goog-LanguageCode': 'zh-TW',
      },
      body: JSON.stringify({
        includedTypes: ['restaurant', 'cafe', 'meal_takeaway', 'bakery'],
        maxResultCount: 20,
        languageCode: 'zh-TW', // 👉 必殺技：直接在 Body 強制指定繁體中文
        rankPreference: 'POPULARITY',
        locationRestriction: {
          circle: {
            center: {
              latitude: station.location.lat,
              longitude: station.location.lng,
            },
            radius: radiusMeters,
          },
        },
      }),
    });

    if (!nearbyRes.ok) {
      const errText = await nearbyRes.text();
      console.error('[search] Nearby Search failed:', errText);
      return NextResponse.json(
        { error: 'Google API 暫時無法使用，請稍後再試', code: 'NEARBY_FAILED' },
        { status: 502 }
      );
    }

    const nearbyData = await nearbyRes.json();
    const rawPlaces: Record<string, unknown>[] = nearbyData.places ?? [];

    if (rawPlaces.length === 0) {
      return NextResponse.json({
        restaurants: [],
        total: 0,
        stationName: station.name,
        searchedAt: new Date().toISOString(),
      });
    }

    // ── 3. Parallel Place Details ────────────────────────
    // We CANNOT batch goodForChildren in Nearby Search (地雷 B).
    // Instead we fire individual Detail requests in parallel.
    // Promise.allSettled ensures one failure doesn't kill everything.

    const detailResults = await Promise.allSettled(
      rawPlaces.map(async (place) => {
        const id = place.id as string;
        if (!id) return null;

        const detailRes = await fetch(
          `${PLACES_API_BASE}/places/${id}?fields=${DETAIL_FIELDS}&languageCode=zh-TW&key=${API_KEY}`,
          { headers: { 'X-Goog-Api-Key': API_KEY } }
        );

        if (!detailRes.ok) return null;
        return detailRes.json() as Promise<Record<string, unknown>>;
      })
    );

    // Build a lookup map: placeId → detail data
    const detailMap = new Map<string, Record<string, unknown>>();
    detailResults.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        const detail = result.value as Record<string, unknown>;
        const id = detail.id as string;
        if (id) detailMap.set(id, detail);
      }
    });

    // ── 4. Merge + Normalize ─────────────────────────────
    // This is where we guarantee no undefined values.

    const restaurants: Restaurant[] = rawPlaces
      .map((place) => {
        const id = place.id as string;
        const detail = detailMap.get(id) ?? {};

        // Merge raw place data with detail data
        const merged: Record<string, unknown> = {
          ...place,
          goodForChildren: detail.goodForChildren,
          menuForChildren: detail.menuForChildren,
        };

        return normalizePlaceResult(merged, station.location.lat, station.location.lng);
      })
      .filter((r): r is Restaurant => r !== null) // type-safe null filter
      .filter((r) => r.rating >= minRating)
      .filter((r) => r.reviewCount >= minReviewCount)
      .filter((r) => !childFriendlyOnly || r.isChildFriendly === true)
      .sort((a, b) => {
        // Primary: child-friendly first (true > null)
        const aScore = a.isChildFriendly === true ? 1 : 0;
        const bScore = b.isChildFriendly === true ? 1 : 0;
        if (bScore !== aScore) return bScore - aScore;
        // Secondary: rating desc
        return b.rating - a.rating;
      });

    return NextResponse.json({
      restaurants,
      total: restaurants.length,
      stationName: station.name,
      searchedAt: new Date().toISOString(),
    });

  } catch (err) {
    console.error('[search] Unexpected error:', err);
    return NextResponse.json(
      { error: '伺服器發生意外錯誤', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

// ============================================================
// Phase 2 — SerpApi integration (uncomment when ready)
// ============================================================
//
// async function fetchHighchairFromSerpApi(placeId: string): Promise<boolean | null> {
//   const SERPAPI_KEY = process.env.SERPAPI_KEY;
//   if (!SERPAPI_KEY) return null;
//
//   // Check Redis cache first
//   // const cached = await redis.get(`highchair:${placeId}`);
//   // if (cached !== null) return cached === 'true';
//
//   const res = await fetch(
//     `https://serpapi.com/search.json?engine=google_maps&place_id=${placeId}&api_key=${SERPAPI_KEY}`
//   );
//   if (!res.ok) return null;
//
//   const data = await res.json();
//   const hasHighchair = data?.place_results?.service_options?.highchairs ?? null;
//
//   // Cache result for 7 days
//   // await redis.set(`highchair:${placeId}`, String(hasHighchair), { ex: 60 * 60 * 24 * 7 });
//
//   return typeof hasHighchair === 'boolean' ? hasHighchair : null;
// }

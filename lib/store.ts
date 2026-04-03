// lib/store.ts
// ============================================================
// Zustand store — single source of truth for all app state.
// Eliminates race conditions by centralizing async data flow.
// ============================================================

import { create } from 'zustand';
import type {
  AppState,
  Restaurant,
  SearchParams,
  ViewMode,
} from './types';
import { DEFAULT_SEARCH_PARAMS } from './types';

const PAGE_SIZE = 10;

interface AppStore extends AppState {
  // Actions
  setSearchParam: <K extends keyof SearchParams>(key: K, value: SearchParams[K]) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedPlace: (placeId: string | null) => void;
  search: () => Promise<void>;
  loadMore: () => void;
  reset: () => void;
}

// All results (not paginated)
let _allResults: Restaurant[] = [];

export const useAppStore = create<AppStore>((set, get) => ({
  // ── Initial state ──────────────────────────────────────
  searchParams: DEFAULT_SEARCH_PARAMS,
  results: [],
  isLoading: false,
  error: null,
  viewMode: 'split',
  selectedPlaceId: null,
  page: 1,
  hasMore: false,

  // ── Actions ────────────────────────────────────────────

  setSearchParam: (key, value) => {
    set(state => ({
      searchParams: { ...state.searchParams, [key]: value },
    }));
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  setSelectedPlace: (placeId) => set({ selectedPlaceId: placeId }),

  search: async () => {
    const { searchParams } = get();

    if (!searchParams.stationId) {
      set({ error: '請先選擇捷運站' });
      return;
    }

    set({ isLoading: true, error: null, results: [], page: 1, hasMore: false });
    _allResults = [];

    try {
      const params = new URLSearchParams({
        stationId: searchParams.stationId,
        radiusMeters: String(searchParams.radiusMeters),
        minRating: String(searchParams.minRating),
        minReviewCount: String(searchParams.minReviewCount),
        childFriendlyOnly: String(searchParams.childFriendlyOnly),
      });

      const res = await fetch(`/api/search?${params}`);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: '伺服器錯誤', code: 'UNKNOWN' }));
        throw new Error(errData.error ?? '搜尋失敗，請稍後再試');
      }

      const data = await res.json();

      // Validate — every restaurant must have a name (guard against API weirdness)
      const validated: Restaurant[] = (data.restaurants ?? []).filter(
        (r: Restaurant) => r.placeId && r.name && typeof r.rating === 'number'
      );

      _allResults = validated;
      const firstPage = validated.slice(0, PAGE_SIZE);

      set({
        results: firstPage,
        page: 1,
        hasMore: validated.length > PAGE_SIZE,
        isLoading: false,
        error: validated.length === 0 ? '此站附近暫無符合條件的餐廳' : null,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : '發生未知錯誤',
        results: [],
        hasMore: false,
      });
    }
  },

  loadMore: () => {
    const { page } = get();
    const nextPage = page + 1;
    const nextResults = _allResults.slice(0, nextPage * PAGE_SIZE);

    set({
      results: nextResults,
      page: nextPage,
      hasMore: nextResults.length < _allResults.length,
    });
  },

  reset: () => {
    _allResults = [];
    set({
      results: [],
      isLoading: false,
      error: null,
      page: 1,
      hasMore: false,
      selectedPlaceId: null,
    });
  },
}));

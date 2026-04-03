'use client';
// components/RestaurantList.tsx

import React from 'react';
import { useAppStore } from '@/lib/store';
import RestaurantCard from './RestaurantCard';

function SkeletonCard() {
  return (
    <div className="card p-4">
      <div className="flex gap-3">
        <div className="skeleton w-7 h-7 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-3 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
        <div className="skeleton w-14 h-14 rounded-xl flex-shrink-0" />
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-5xl mb-3">🍽️</div>
      <p className="text-slate-500 font-bold text-sm">{message}</p>
      <p className="text-slate-400 text-xs mt-1">試著放寬篩選條件</p>
    </div>
  );
}

function InitialState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
      <div className="text-5xl mb-3">👆</div>
      <p className="text-slate-600 font-bold text-sm">選擇捷運站後開始搜尋</p>
      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
        我們會找出步行範圍內<br/>
        高評分、評論數多的親子友善餐廳
      </p>
    </div>
  );
}

export default function RestaurantList() {
  const {
    results,
    isLoading,
    error,
    hasMore,
    loadMore,
    setSelectedPlace,
    selectedPlaceId,
    searchParams,
  } = useAppStore();

  const hasSearched = searchParams.stationId !== '' && !isLoading;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-1">
        <div className="text-xs text-slate-400 font-medium px-1 flex items-center gap-2">
          <svg className="animate-spin w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
          </svg>
          正在搜尋餐廳...
        </div>
        {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <div className="text-4xl mb-3">😵</div>
        <p className="text-red-500 font-bold text-sm">{error}</p>
        <p className="text-slate-400 text-xs mt-1">請檢查網路連線後重試</p>
      </div>
    );
  }

  // No results
  if (hasSearched && results.length === 0) {
    return <EmptyState message="此站附近暫無符合條件的餐廳" />;
  }

  // Initial state (not yet searched)
  if (!hasSearched && results.length === 0) {
    return <InitialState />;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Result count header */}
      <div className="px-1 flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">
          找到 <span className="font-black text-amber-500">{results.length}</span> 家餐廳
          {hasMore && <span className="text-slate-400"> (顯示前 {results.length} 筆)</span>}
        </p>
        <p className="text-xs text-slate-400">依親子友善 · 評分排列</p>
      </div>

      {/* Cards */}
      {results.map((restaurant, index) => (
        <div key={restaurant.placeId} className="animate-fade-in-up">
          <RestaurantCard
            restaurant={restaurant}
            isSelected={selectedPlaceId === restaurant.placeId}
            onClick={() => setSelectedPlace(
              selectedPlaceId === restaurant.placeId ? null : restaurant.placeId
            )}
            rank={index + 1}
          />
        </div>
      ))}

      {/* Load More */}
      {hasMore && (
        <button
          onClick={loadMore}
          className="w-full py-3 text-sm font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors border-2 border-dashed border-amber-200"
        >
          載入更多 ↓
        </button>
      )}

      {/* Bottom hint */}
      {results.length > 0 && !hasMore && (
        <p className="text-center text-xs text-slate-300 py-2">— 已顯示全部結果 —</p>
      )}
    </div>
  );
}

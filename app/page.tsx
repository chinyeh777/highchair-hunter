'use client';
// app/page.tsx

import React, { Suspense, lazy } from 'react';
import { useAppStore } from '@/lib/store';
import SearchPanel from '@/components/SearchPanel';
import RestaurantList from '@/components/RestaurantList';

// Lazy load the map to avoid SSR issues with Google Maps
const MapView = lazy(() => import('@/components/MapView'));

type ViewMode = 'list' | 'map' | 'split';

function ViewToggle({ mode, onSelect }: { mode: ViewMode; onSelect: (m: ViewMode) => void }) {
  const options: { value: ViewMode; icon: string; label: string }[] = [
    { value: 'list',  icon: '☰', label: '清單' },
    { value: 'split', icon: '⊞', label: '分割' },
    { value: 'map',   icon: '🗺️', label: '地圖' },
  ];

  return (
    <div className="flex items-center gap-0.5 bg-slate-100 rounded-xl p-1">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
            opt.value === 'split' ? 'hidden lg:flex' : 'flex'
          } ${
            mode === opt.value
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>{opt.icon}</span>
          <span className="hidden sm:inline">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { viewMode, setViewMode, results, isLoading } = useAppStore();

  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex flex-col">

      {/* Top bar (mobile) */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-amber-100 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍼</span>
          <span className="font-display font-black text-slate-800">高腳椅獵人</span>
        </div>
        <ViewToggle mode={viewMode} onSelect={setViewMode} />
      </header>

      {/*
        ── Layout strategy ──────────────────────────────────────
        Mobile  (<lg): flex-col, 一次只顯示一個 panel，由 viewMode 控制
          - 'list' → SearchPanel + ResultList (上下堆疊，各自 overflow-y-auto)
          - 'map'  → MapView 全螢幕
        Desktop (lg+): flex-row，三欄並排
          - SearchPanel 固定寬度左欄
          - ResultList  固定寬度中欄 (split) 或 flex-1 (list)
          - MapView     flex-1 右欄 (list/split 顯示，純 map 模式也顯示)
        ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* ── Search Panel ───────────────────────────────────────
            Mobile : 'list' 時顯示，'map' 時隱藏
            Desktop: 永遠顯示，固定寬度
        */}
        <div className={`
          flex-shrink-0 lg:w-80 xl:w-96
          lg:flex flex-col p-4 lg:overflow-y-auto
          border-b lg:border-b-0 lg:border-r border-amber-100
          ${viewMode === 'map' ? 'hidden' : 'flex'}
        `}>
          <SearchPanel />
        </div>

        {/* ── Results List ───────────────────────────────────────
            Mobile : 'list' 時顯示 (flex-1, 可捲動)，'map' 時隱藏
            Desktop: split → 固定寬度；list → flex-1；map → 隱藏
        */}
        <div className={`
          flex-shrink-0 flex-col overflow-y-auto p-4 gap-2
          border-b lg:border-b-0 lg:border-r border-amber-50
          ${viewMode === 'map'
            ? 'hidden'
            : 'flex flex-1 lg:flex-none'}
          ${viewMode === 'split' ? 'lg:w-80 xl:w-96' : ''}
          ${viewMode === 'list'  ? 'lg:flex-1' : ''}
        `}>
          {/* Desktop 標題列 + view toggle */}
          <div className="hidden lg:flex items-center justify-between mb-2">
            <h2 className="font-display font-black text-slate-700">
              搜尋結果
              {results.length > 0 && (
                <span className="ml-2 text-amber-400">{results.length}</span>
              )}
            </h2>
            <ViewToggle mode={viewMode} onSelect={setViewMode} />
          </div>

          <RestaurantList />
        </div>

        {/* ── Map Panel ─────────────────────────────────────────
            Mobile : 'map' 時全螢幕顯示 (固定高度避免坍塌)，其他隱藏
            Desktop: list → 隱藏；split / map → flex-1
        */}
        <div className={`
          p-4
          ${viewMode === 'map'   ? 'flex h-[calc(100vh-57px)] lg:h-auto lg:flex-1' : 'hidden'}
          ${viewMode === 'split' ? 'lg:flex lg:flex-1' : ''}
          ${viewMode === 'list'  ? 'lg:hidden' : ''}
        `}>
          <div className="w-full h-full relative">
            {/* Desktop view toggle 浮在地圖右上角 */}
            <div className="absolute top-2 right-2 z-10 hidden lg:block">
              <ViewToggle mode={viewMode} onSelect={setViewMode} />
            </div>
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-2xl">
                <div className="skeleton w-full h-full rounded-2xl" />
              </div>
            }>
              <MapView />
            </Suspense>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';
// components/SearchPanel.tsx

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { STATIONS_BY_LINE, MRT_STATIONS } from '@/lib/stations';
import { LINE_LABELS, LINE_COLORS, type MrtLine } from '@/lib/types';

const RADIUS_OPTIONS = [
  { value: 300, label: '300m (約4分鐘)' },
  { value: 500, label: '500m (約6分鐘)' },
  { value: 800, label: '800m (約10分鐘)' },
  { value: 1000, label: '1km (約12分鐘)' },
  { value: 1500, label: '1.5km (約18分鐘)' },
];

const RATING_OPTIONS = [
  { value: 3.5, label: '3.5 ⭐ 以上' },
  { value: 4.0, label: '4.0 ⭐ 以上' },
  { value: 4.2, label: '4.2 ⭐ 以上' },
  { value: 4.5, label: '4.5 ⭐ 以上' },
];

const REVIEW_OPTIONS = [
  { value: 10,  label: '10+ 則' },
  { value: 30,  label: '30+ 則' },
  { value: 50,  label: '50+ 則 (建議)' },
  { value: 100, label: '100+ 則 (嚴格)' },
];

export default function SearchPanel() {
  const { searchParams, isLoading, setSearchParam, search } = useAppStore();
  const [lineFilter, setLineFilter] = useState<MrtLine | 'ALL'>('ALL');
  const [stationQuery, setStationQuery] = useState('');

  // Filter stations for display
  const filteredStations = MRT_STATIONS.filter(s => {
    const matchLine = lineFilter === 'ALL' || s.line === lineFilter;
    const matchQuery = !stationQuery || s.name.includes(stationQuery) || s.nameEn.toLowerCase().includes(stationQuery.toLowerCase());
    return matchLine && matchQuery;
  });

  const selectedStation = MRT_STATIONS.find(s => s.id === searchParams.stationId);

  return (
    <aside className="flex flex-col gap-5 p-5 bg-white rounded-2xl shadow-sm border border-amber-100 overflow-y-auto">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🍼</span>
          <h1 className="font-display font-black text-xl text-slate-800 tracking-tight">
            高腳椅獵人
          </h1>
        </div>
        <p className="text-xs text-slate-400 font-medium">找到真正歡迎寶寶的好店</p>
      </div>

      <hr className="border-amber-100" />

      {/* Station Search */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          📍 選擇捷運站
        </label>

        {/* Line Filter Tabs */}
        <div className="flex flex-wrap gap-1 mb-3">
          <button
            onClick={() => setLineFilter('ALL')}
            className={`text-xs px-2 py-1 rounded-full font-bold transition-colors ${
              lineFilter === 'ALL'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            全部
          </button>
          {(Object.keys(LINE_LABELS) as MrtLine[]).map(line => (
            <button
              key={line}
              onClick={() => setLineFilter(line)}
              className={`text-xs px-2 py-1 rounded-full font-bold transition-colors`}
              style={{
                background: lineFilter === line ? LINE_COLORS[line] : undefined,
                color: lineFilter === line ? 'white' : LINE_COLORS[line],
                border: `1.5px solid ${LINE_COLORS[line]}`,
              }}
            >
              {LINE_LABELS[line]}
            </button>
          ))}
        </div>

        {/* Station Text Search */}
        <input
          type="text"
          placeholder="搜尋站名..."
          value={stationQuery}
          onChange={e => setStationQuery(e.target.value)}
          className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 mb-2 focus:outline-none focus:border-amber-400 transition-colors"
        />

        {/* Station Selector */}
        <select
          value={searchParams.stationId}
          onChange={e => setSearchParam('stationId', e.target.value)}
          className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 bg-white transition-colors"
          size={Math.min(filteredStations.length, 6)}
        >
          {filteredStations.length === 0 && (
            <option disabled>找不到符合的站</option>
          )}
          {filteredStations.map(station => (
            <option key={station.id} value={station.id}>
              {station.name} ({station.id})
            </option>
          ))}
        </select>

        {selectedStation && (
          <div className="mt-2 px-3 py-2 bg-amber-50 rounded-xl text-xs text-amber-700 font-bold flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block flex-shrink-0"
              style={{ background: LINE_COLORS[selectedStation.line] }}
            />
            已選：{selectedStation.name}
            <span className="text-amber-400 font-normal">({LINE_LABELS[selectedStation.line]})</span>
          </div>
        )}
      </div>

      {/* Radius */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          🚶 步行範圍
        </label>
        <div className="grid grid-cols-1 gap-1">
          {RADIUS_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="radius"
                value={opt.value}
                checked={searchParams.radiusMeters === opt.value}
                onChange={() => setSearchParam('radiusMeters', opt.value)}
                className="accent-amber-500"
              />
              <span className={`text-sm transition-colors ${
                searchParams.radiusMeters === opt.value
                  ? 'text-amber-600 font-bold'
                  : 'text-slate-600 group-hover:text-slate-800'
              }`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          ⭐ 最低評分
        </label>
        <div className="grid grid-cols-2 gap-1">
          {RATING_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSearchParam('minRating', opt.value)}
              className={`text-xs py-1.5 px-2 rounded-lg font-bold transition-all ${
                searchParams.minRating === opt.value
                  ? 'bg-amber-400 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Min Review Count */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          💬 最少評論數 <span className="text-slate-400 font-normal">(防洗版)</span>
        </label>
        <div className="grid grid-cols-2 gap-1">
          {REVIEW_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSearchParam('minReviewCount', opt.value)}
              className={`text-xs py-1.5 px-2 rounded-lg font-bold transition-all ${
                searchParams.minReviewCount === opt.value
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Child Friendly Toggle */}
      <div>
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="text-sm font-bold text-slate-700">👶 僅顯示親子友善</p>
            <p className="text-xs text-slate-400">已標記 goodForChildren</p>
          </div>
          <div
            onClick={() => setSearchParam('childFriendlyOnly', !searchParams.childFriendlyOnly)}
            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
              searchParams.childFriendlyOnly ? 'bg-amber-400' : 'bg-slate-200'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              searchParams.childFriendlyOnly ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </div>
        </label>
      </div>

      {/* Search Button */}
      <button
        onClick={search}
        disabled={isLoading || !searchParams.stationId}
        className="btn-primary w-full justify-center text-sm mt-6"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
            </svg>
            搜尋中...
          </>
        ) : (
          <>🔍 開始搜尋</>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center -mt-2">
        資料來源：Google Maps
        <br />高腳椅確認功能開發中 🔧
      </p>
    </aside>
  );
}

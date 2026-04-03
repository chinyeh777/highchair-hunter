'use client';
// components/MapView.tsx
// Uses @vis.gl/react-google-maps — the official React wrapper.
// No manual DOM manipulation, no SDK loading issues (地雷 C 消滅).

import React, { useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
  useMap,
} from '@vis.gl/react-google-maps';
import { useAppStore } from '@/lib/store';
import type { Restaurant } from '@/lib/types';
import { formatDistance, walkingMinutes } from '@/lib/utils';
import { getStation } from '@/lib/stations';

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

// Default center: Taipei 101
const DEFAULT_CENTER = { lat: 25.0330, lng: 121.5654 };
const DEFAULT_ZOOM = 14;

interface MarkerProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onClick: (placeId: string) => void;
}

function RestaurantMarker({ restaurant, isSelected, onClick }: MarkerProps) {
  const { placeId, name, rating, isChildFriendly, hasHighchair, googleMapsUrl, distanceMeters } = restaurant;

  const pinBackground = hasHighchair === true
    ? '#5A7A5C' // sage green — confirmed highchair
    : isChildFriendly === true
      ? '#F5A623' // amber — child friendly
      : '#94A3B8'; // grey — unknown

  return (
    <>
      <AdvancedMarker
        position={restaurant.location}
        onClick={() => onClick(placeId)}
        zIndex={isSelected ? 100 : 1}
      >
        <Pin
          background={isSelected ? '#D4603A' : pinBackground}
          borderColor={isSelected ? '#B84D2A' : undefined}
          glyphColor="white"
          glyph={isSelected ? '📍' : undefined}
          scale={isSelected ? 1.3 : 1}
        />
      </AdvancedMarker>

      {isSelected && (
        <InfoWindow
          position={restaurant.location}
          onCloseClick={() => onClick(placeId)} // toggle off
          headerContent={
            <div className="font-display font-black text-sm text-slate-800 max-w-48">
              {name}
            </div>
          }
        >
          <div className="min-w-40 max-w-56 text-xs space-y-1.5 py-1">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <span className="text-amber-400 font-black">{rating.toFixed(1)} ⭐</span>
              <span className="text-slate-400">({restaurant.reviewCount})</span>
            </div>

            {/* Distance */}
            <div className="text-slate-500">
              🚶 步行約 {walkingMinutes(distanceMeters)} 分鐘 ({formatDistance(distanceMeters)})
            </div>

            {/* Highchair badge */}
            {hasHighchair === true && (
              <div className="text-green-600 font-bold">🪑 確認有高腳椅</div>
            )}
            {isChildFriendly === true && hasHighchair !== true && (
              <div className="text-amber-600 font-bold">👶 親子友善</div>
            )}

            {/* CTA */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-center bg-blue-500 text-white font-bold py-1.5 px-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              🗺️ 開啟導航
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

// Inner component — needs to be inside APIProvider to use useMap
function MapContent() {
  const { results, selectedPlaceId, setSelectedPlace, searchParams } = useAppStore();
  const map = useMap();

  const station = getStation(searchParams.stationId);

  // Center map on station when station changes
  React.useEffect(() => {
    if (map && station) {
      map.panTo(station.location);
      map.setZoom(15);
    }
  }, [map, station?.id]);

  // Center on selected restaurant
  React.useEffect(() => {
    if (map && selectedPlaceId) {
      const selected = results.find(r => r.placeId === selectedPlaceId);
      if (selected) {
        map.panTo(selected.location);
      }
    }
  }, [map, selectedPlaceId]);

  const handleMarkerClick = useCallback((placeId: string) => {
    setSelectedPlace(selectedPlaceId === placeId ? null : placeId);
  }, [selectedPlaceId, setSelectedPlace]);

  const mapCenter = station?.location ?? DEFAULT_CENTER;

  return (
    <Map
      defaultCenter={mapCenter}
      defaultZoom={DEFAULT_ZOOM}
      mapId="highchair-hunter-map"
      gestureHandling="greedy"
      disableDefaultUI={false}
      className="w-full h-full rounded-2xl overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Station marker */}
      {station && (
        <AdvancedMarker position={station.location} zIndex={200}>
          <div className="flex flex-col items-center">
            <div className="bg-slate-800 text-white text-xs font-black px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
              🚉 {station.name}
            </div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-slate-800" />
          </div>
        </AdvancedMarker>
      )}

      {/* Restaurant markers */}
      {results.map(restaurant => (
        <RestaurantMarker
          key={restaurant.placeId}
          restaurant={restaurant}
          isSelected={selectedPlaceId === restaurant.placeId}
          onClick={handleMarkerClick}
        />
      ))}
    </Map>
  );
}

// Map legend
function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md text-xs space-y-1 z-10">
      <p className="font-black text-slate-600 mb-1.5">圖例</p>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#5A7A5C]" />
        <span className="text-slate-500">確認有高腳椅</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#F5A623]" />
        <span className="text-slate-500">親子友善</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#94A3B8]" />
        <span className="text-slate-500">一般餐廳</span>
      </div>
    </div>
  );
}

export default function MapView() {
  if (!MAPS_API_KEY) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-2xl">
        <div className="text-center">
          <p className="text-2xl mb-2">🗺️</p>
          <p className="text-sm text-slate-500 font-bold">請設定 Google Maps API Key</p>
          <p className="text-xs text-slate-400 mt-1">在 .env.local 設定 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={MAPS_API_KEY}>
      <div className="relative w-full h-full">
        <MapContent />
        <MapLegend />
      </div>
    </APIProvider>
  );
}

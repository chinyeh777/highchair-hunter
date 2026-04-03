'use client';
// components/RestaurantCard.tsx

import React from 'react';
import type { Restaurant } from '@/lib/types';
import { formatDistance, walkingMinutes, priceLevelLabel, buildGoogleMapsNavUrl } from '@/lib/utils';

interface Props {
  restaurant: Restaurant;
  isSelected: boolean;
  onClick: () => void;
  rank: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <svg key={i} className={`w-3.5 h-3.5 ${filled || half ? 'star-filled' : 'star-empty'}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        );
      })}
    </div>
  );
}

function HighchairBadge({ hasHighchair, isChildFriendly }: { hasHighchair: boolean | null; isChildFriendly: boolean | null }) {
  if (hasHighchair === true) {
    return <span className="badge-green">🪑 確認有高腳椅</span>;
  }
  if (hasHighchair === false) {
    return <span className="badge-grey">無高腳椅資料</span>;
  }
  if (isChildFriendly === true) {
    return <span className="badge-amber">👶 親子友善</span>;
  }
  return null;
}

export default function RestaurantCard({ restaurant, isSelected, onClick, rank }: Props) {
  const {
    name, rating, reviewCount, address, distanceMeters,
    hasHighchair, isChildFriendly, priceLevel, openNow,
    photos, googleMapsUrl, primaryType, placeId
  } = restaurant;

  const walkMin = walkingMinutes(distanceMeters);

  return (
    <div
      onClick={onClick}
      className={`card p-4 cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-amber-400 shadow-amber-100'
          : 'hover:ring-1 hover:ring-amber-200'
      }`}
      style={{ animationDelay: `${rank * 40}ms` }}
    >
      <div className="flex gap-3">
        {/* Rank Badge */}
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
          <span className="text-xs font-black text-slate-500">{rank}</span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Name row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-black text-slate-800 text-sm leading-tight line-clamp-2">
              {name}
            </h3>
            {photos[0] && (
              <img
                src={photos[0]}
                alt={name}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                loading="lazy"
              />
            )}
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-1 mb-2">
            <HighchairBadge hasHighchair={hasHighchair} isChildFriendly={isChildFriendly} />
            {openNow === true && <span className="badge-green">現在營業中</span>}
            {openNow === false && <span className="badge-grey text-red-400">已打烊</span>}
          </div>

          {/* Rating row */}
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={rating} />
            <span className="text-sm font-black text-amber-500">{rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400">({reviewCount.toLocaleString()})</span>
            {priceLevel !== null && (
              <span className="text-xs text-slate-400 ml-auto">{priceLevelLabel(priceLevel)}</span>
            )}
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>🚶 {walkMin}分 ({formatDistance(distanceMeters)})</span>
            <span>·</span>
            <span className="truncate">{primaryType}</span>
          </div>

          {/* Address */}
          <p className="text-xs text-slate-400 truncate mt-0.5">{address}</p>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
            >
              🗺️ 導航
            </a>
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-xs bg-slate-50 text-slate-600 font-bold px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              📍 查看詳情
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

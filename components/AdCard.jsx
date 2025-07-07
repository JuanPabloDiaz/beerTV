import React from 'react'
import { VideoPlayer } from './VideoPlayer'

/**
 * Card to display a single beer TV ad with its video and metadata.
 * The design is bold & dark to match a Super Bowl aesthetic.
 */
export const AdCard = ({ ad }) => {
  if (!ad) return null

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105">
      <VideoPlayer key={ad.id} src={ad.video_link} className="" />
<a href={ad.video_link} target="_blank" rel="noopener noreferrer">{ad.video_link}</a>      <div className="p-4 space-y-1">
        <h3 className="text-xl font-extrabold tracking-wide text-yellow-400">
          {ad.spot_products || ad.brand_name}
        </h3>
        <p className="text-sm uppercase text-gray-400">{ad.brand_name}</p>
        <p className="text-sm italic text-gray-500">{ad.brand_parent_name}</p>
        {ad.spot_description && (
          <p className="mt-2 text-gray-300 text-sm line-clamp-3">
            {ad.spot_description}
          </p>
        )}
      </div>
    </div>
  )
}

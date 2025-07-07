'use client'
import React from 'react'

/**
 * Component to display additional video information and warnings for similar content
 */
export const VideoInfo = ({ ad, allAds = [] }) => {
  const [similarAds, setSimilarAds] = React.useState([])

  React.useEffect(() => {
    // Find similar ads (same brand and similar description keywords)
    if (ad && allAds.length > 0) {
      const similar = allAds.filter(otherAd => 
        otherAd.id !== ad.id &&
        otherAd.brand_name === ad.brand_name &&
        (
          // Check for common keywords that might indicate similar intro
          (ad.spot_description && otherAd.spot_description && 
           (ad.spot_description.toLowerCase().includes('rich') && otherAd.spot_description.toLowerCase().includes('rich')) ||
           (ad.spot_description.toLowerCase().includes('champagne') && otherAd.spot_description.toLowerCase().includes('champagne'))
          )
        )
      ).slice(0, 3) // Limit to 3 similar ads
      
      setSimilarAds(similar)
    }
  }, [ad, allAds])

  if (!ad) return null

  return (
    <div className="mt-2 text-xs text-gray-400">
      {/* File info */}
      <div className="flex justify-between items-center">
        <span>Video: {ad.video_link.split('/').pop()}</span>
        <span className="bg-gray-700 px-2 py-1 rounded">ID: {ad.id}</span>
      </div>
      
      {/* Similar content warning */}
      {similarAds.length > 0 && (
        <div className="mt-2 p-2 bg-yellow-900/30 border border-yellow-600/50 rounded text-yellow-200">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⚠️</span>
            <span className="font-medium">Similar intro detected</span>
          </div>
          <p className="mt-1 text-xs">
            This ad may share the first few seconds with other {ad.brand_name} commercials. 
            Skip to 0:20 to see unique content.
          </p>
        </div>
      )}
    </div>
  )
}

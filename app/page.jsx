// Beer Ads Super Bowl Homepage
'use client'

import { useEffect, useState } from 'react'
import { AdCard, Container, VideoPlayer } from '@/components'

export default function HomePage() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  // Number of ads (video players) to display at once
  const PAGE_SIZE = 3

  useEffect(() => {
    async function fetchAds() {
      try {
        const res = await fetch('/api/ads')
        const data = await res.json()
        setAds(data)
      } catch (err) {
        console.error('Failed to load ads', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAds()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl font-bold">
        Loading Super Bowl ads…
      </div>
    )
  }

  if (!ads.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        No ads found.
      </div>
    )
  }

  // Featured ad is first marked featured else first item
  const featuredAd = ads.find(ad => ad.featured) || ads[0]
  const remainingAds = ads.filter(ad => ad.id !== featuredAd.id)
  const totalPages = Math.ceil(remainingAds.length / PAGE_SIZE)
  const pagedAds = remainingAds.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE,
  )

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen text-white pb-20">
      {/* Featured video */}
      <Container className="py-10 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-yellow-400 drop-shadow-lg mb-6">
          Super Bowl Beer Ads
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-6">
          Relive the most iconic, over-the-top beer commercials to ever grace
          the Super Bowl stage. Grab a cold one and enjoy the show!
        </p>
        
        {/* Debug buttons - temporary */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => {
              if (window.forceClearVideoCache) {
                window.forceClearVideoCache()
              } else {
                console.log('Debug tools not loaded yet')
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            🧹 Force Clear Cache
          </button>
          
          <button
            onClick={() => {
              if (window.skipToUniqueContent) {
                window.skipToUniqueContent()
              } else {
                console.log('Skipping manually...')
                document.querySelectorAll('video').forEach(v => {
                  if (v.duration > 10) v.currentTime = 5
                })
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            ⏭️ Skip to Unique Content (5s)
          </button>
        </div>

        {/* Featured video */}
        <div className="w-full max-w-4xl mb-12">
          <VideoPlayer src={featuredAd.video_link} />
          <h2 className="mt-4 text-2xl font-bold text-yellow-400 uppercase">
            {featuredAd.spot_products || featuredAd.brand_name}
          </h2>
          <p className="text-gray-400 text-sm">
            {featuredAd.brand_name} • {featuredAd.year}
          </p>
        </div>
      </Container>

      {/* Paged grid of ads */}
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pagedAds.map(ad => (
          <AdCard key={ad.id} ad={ad} allAds={ads} />
        ))}
      </Container>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded bg-yellow-400 text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="text-gray-300">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 rounded bg-yellow-400 text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

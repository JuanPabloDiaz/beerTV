// Beer Ads Super Bowl Homepage
'use client'

import { useEffect, useState } from 'react'
import { AdCard, Container, VideoPlayer } from '@/components'

export default function HomePage() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen text-white pb-20">
      {/* Hero section */}
      <Container className="py-10 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-yellow-400 drop-shadow-lg mb-6">
          Super Bowl Beer Ads
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10">
          Relive the most iconic, over-the-top beer commercials to ever grace
          the Super Bowl stage. Grab a cold one and enjoy the show!
        </p>

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

      {/* Grid of all ads */}
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {remainingAds.map(ad => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </Container>
    </div>
  )
}

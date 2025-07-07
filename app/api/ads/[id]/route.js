export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Function to get all ads from the JSON file
function getAds() {
  const filePath = path.join(process.cwd(), 'data', 'beer-tv-ads.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  // Add IDs and years to each ad
  return data.map((ad, index) => {
    // Create a unique ID based on video URL and brand name to ensure uniqueness
    const videoId =
      ad.video_link.split('/').pop()?.split('.')[0] || `video-${index}`
    const brandSlug = ad.brand_name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    const uniqueId = `${brandSlug}-${videoId}-${index}`

    return {
      ...ad,
      id: uniqueId,
      year: extractYearFromVideo(ad.video_link) || '2023', // Default year if can't extract
      featured: index < 5, // Mark first 5 as featured for demo
    }
  })
}

// Helper function to extract year from video URL or use default
function extractYearFromVideo(videoUrl) {
  // Try to extract year from URL patterns if available
  const yearMatch = videoUrl.match(/\/(20\d{2})\//)
  if (yearMatch) {
    return yearMatch[1]
  }

  // Try another pattern
  const yearMatch2 = videoUrl.match(/_(20\d{2})_/)
  if (yearMatch2) {
    return yearMatch2[1]
  }

  // For cloudfront URLs, we'll use a range of years for variety
  const hash = videoUrl.split('/').pop()?.split('.')[0] || ''
  const hashNum = hash
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const yearOffset = hashNum % 10 // 0-9
  return String(2014 + yearOffset) // Years 2014-2023
}

export async function GET(request, context) {
  try {
    const ads = getAds()
    const ad = ads.find(ad => ad.id === context.params.id)

    if (!ad) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 })
    }

    return NextResponse.json(ad)
  } catch (error) {
    console.error('Error fetching ad details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ad details' },
      { status: 500 },
    )
  }
}

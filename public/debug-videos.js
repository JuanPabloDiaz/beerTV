/**
 * Cache buster script to help debug video loading issues
 * Add this to your browser console to debug cache issues
 */

// Function to force reload all videos without cache
function forceClearVideoCache() {
  console.log('🧹 Forcing video cache clear...')

  const videos = document.querySelectorAll('video')

  videos.forEach((video, index) => {
    const originalSrc = video.src
    const originalCurrentTime = video.currentTime

    console.log(`🎬 Video ${index + 1}:`)
    console.log(`   Original src: ${originalSrc}`)
    console.log(`   File: ${originalSrc.split('/').pop()}`)

    // Force reload with cache buster
    const cacheBuster = `cache_clear=${Date.now()}&random=${Math.random()}`
    const newSrc = originalSrc.includes('?')
      ? `${originalSrc}&${cacheBuster}`
      : `${originalSrc}?${cacheBuster}`

    video.src = newSrc
    video.currentTime = originalCurrentTime
    video.load() // Force reload

    console.log(`   New src: ${newSrc}`)
  })

  console.log(
    '✅ Cache clear complete. Videos should reload with fresh content.',
  )
}

// Function to compare video properties
function compareVideos() {
  console.log('📊 Comparing all videos on page...')

  const videos = document.querySelectorAll('video')
  const videoData = []

  videos.forEach((video, index) => {
    const data = {
      index: index + 1,
      src: video.src,
      filename: video.src.split('/').pop(),
      duration: video.duration,
      width: video.videoWidth,
      height: video.videoHeight,
      readyState: video.readyState,
    }
    videoData.push(data)

    console.log(`🎬 Video ${index + 1}:`, data)
  })

  // Check for duplicates
  const duplicates = videoData.filter(
    (video, index, arr) =>
      arr.findIndex(v => v.filename === video.filename) !== index,
  )

  if (duplicates.length > 0) {
    console.warn('⚠️  Found potential duplicate filenames:', duplicates)
  } else {
    console.log('✅ All videos have unique filenames')
  }

  return videoData
}

// Function to skip all videos to 5 seconds (bypass similar intros)
function skipToUniqueContent() {
  console.log('⏭️ Skipping all videos to 5 seconds...')
  
  const videos = document.querySelectorAll('video')
  
  videos.forEach((video, index) => {
    if (video.duration > 10) {
      video.currentTime = 5
      console.log(`🎬 Video ${index + 1} (${video.src.split('/').pop()}): jumped to 5s`)
    } else {
      console.log(`🎬 Video ${index + 1}: too short, skipped`)
    }
  })
  
  console.log('✅ All videos jumped to unique content section')
}

// Export functions for manual use
window.forceClearVideoCache = forceClearVideoCache
window.compareVideos = compareVideos
window.skipToUniqueContent = skipToUniqueContent

console.log('🛠️  Video debug tools loaded!')
console.log('📝 Available functions:')
console.log(
  '   - forceClearVideoCache(): Force reload all videos without cache',
)
console.log('   - compareVideos(): Compare all video properties')
console.log('   - skipToUniqueContent(): Jump all videos to 5s (bypass similar intros)')
console.log('')
console.log('💡 To use: Open browser console and call skipToUniqueContent()')

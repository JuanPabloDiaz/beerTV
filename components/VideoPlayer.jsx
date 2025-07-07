'use client'
import React from 'react'

/**
 * Responsive video player component using HTML5 <video>.
 * Tailwind utilities make the player responsive and bold.
 *
 * @param {object} props
 * @param {string} props.src - The video URL.
 * @param {string} [props.poster] - Optional poster image.
 * @param {string} [props.className] - Additional Tailwind classes.
 */
export const VideoPlayer = ({ src, poster, className = '' }) => {
  const [duration, setDuration] = React.useState(null)
  const [videoHash, setVideoHash] = React.useState(null)
  const [loadedSrc, setLoadedSrc] = React.useState(null)
  const videoRef = React.useRef(null)

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('🎬 VideoPlayer render with src:', src)
    console.log('🎬 Filename:', src?.split('/').pop())
  }, [src])

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = Math.round(videoRef.current.duration)
      setDuration(videoDuration)
      setLoadedSrc(videoRef.current.currentSrc || videoRef.current.src)

      // Generate a simple hash based on video properties
      const hash = `${videoDuration}_${videoRef.current.videoWidth}_${videoRef.current.videoHeight}`
      setVideoHash(hash)

      // Salta automáticamente al segundo 5 para evitar intros similares
      if (videoRef.current.currentTime < 5 && videoDuration > 10) {
        videoRef.current.currentTime = 5
        console.log('⏭️ Auto-jumped to 5s to skip similar intro')
      }

      // eslint-disable-next-line no-console
      console.log('🎬 Video loaded:', {
        src: src,
        actualSrc: videoRef.current.src,
        duration: videoDuration,
        dimensions: `${videoRef.current.videoWidth}x${videoRef.current.videoHeight}`,
        hash: hash,
        startTime: videoRef.current.currentTime,
      })
    }
  }

  const handleError = e => {
    // eslint-disable-next-line no-console
    console.error('🚨 Video error:', e.target.error, 'for src:', src)
  }

  const formatDuration = seconds => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!src) return null

  return (
    <div
      className={`w-full aspect-video bg-black overflow-hidden rounded-lg shadow-2xl relative ${className}`}
    >
      {/* Duration badge (debug) */}
      {duration && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          {formatDuration(duration)}
        </div>
      )}

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        key={src}
        src={src}
        poster={poster}
        controls
        preload="none"
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

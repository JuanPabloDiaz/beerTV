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
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Render VideoPlayer with src', src)
  }, [src])
  if (!src) return null

  return (
    <div
      className={`w-full aspect-video bg-black overflow-hidden rounded-lg shadow-2xl ${className}`}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        key={src}
        src={src}
        poster={poster}
        controls
        preload="metadata"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

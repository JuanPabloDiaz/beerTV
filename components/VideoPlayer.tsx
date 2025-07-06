"use client";

import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  className = "",
  autoplay = false,
  muted = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  // Determine if the source is a YouTube embed
  const isYouTube =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  // Intersection Observer to only load videos when they're visible
  useEffect(() => {
    if (videoRef.current && !isYouTube) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );

      observer.observe(videoRef.current);

      return () => observer.disconnect();
    }
  }, [isYouTube]);

  useEffect(() => {
    if (videoRef.current && !isYouTube && isIntersecting) {
      const video = videoRef.current;

      if (autoplay && !hasPlayedOnce) {
        // Only attempt autoplay once when the video becomes visible
        video.play().catch((error) => {
          // Autoplay might be blocked by browser policies
          console.warn("Autoplay failed:", error);
        });
        setHasPlayedOnce(true);
      } else if (!autoplay) {
        video.pause();
      }
    }
  }, [autoplay, isYouTube, isIntersecting, hasPlayedOnce]);

  // Clean up video when component unmounts or goes out of view
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className={`video-container relative w-full ${className}`}>
      {isYouTube ? (
        <div className="aspect-video w-full">
          <iframe
            src={videoUrl}
            title={title || "Beer TV Commercial"}
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={isIntersecting ? videoUrl : undefined} // Only load video when visible
          controls={!autoplay}
          muted={muted}
          loop={autoplay}
          playsInline
          preload={isIntersecting ? "metadata" : "none"} // Lazy load video metadata
          className="w-full rounded-lg shadow-lg"
          title={title || "Beer TV Commercial"}
          onLoadedData={() => {
            // Reset the hasPlayedOnce flag when video data is loaded
            setHasPlayedOnce(false);
          }}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;

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
          rootMargin: "50px"
        }
      );
      
      observer.observe(videoRef.current);
      
      return () => observer.disconnect();
    }
  }, [isYouTube]);

  useEffect(() => {
    if (videoRef.current && !isYouTube && isIntersecting && autoplay) {
      const video = videoRef.current;
      video.play().catch((error) => {
        console.warn("Autoplay failed:", error);
      });
    }
  }, [autoplay, isYouTube, isIntersecting]);

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
          src={videoUrl}
          controls={!autoplay}
          muted={muted}
          loop={autoplay}
          playsInline
          preload="metadata"
          className="w-full rounded-lg shadow-lg"
          title={title || "Beer TV Commercial"}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;

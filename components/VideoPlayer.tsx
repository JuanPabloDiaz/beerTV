import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  className = "",
}) => {
  // Extract YouTube video ID if it's a YouTube URL
  const isYouTube =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

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
          />
        </div>
      ) : (
        <video
          src={videoUrl}
          controls
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

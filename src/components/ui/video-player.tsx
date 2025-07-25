'use client';

import { PlayCircle } from "lucide-react";
import React, { useRef, useState } from "react";

export const VideoPlayer = ({ src, poster, hint }: { src: string; poster: string; hint: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden border border-border">
      <video
        ref={videoRef}
        controls={isPlaying}
        poster={poster}
        className="w-full h-full object-cover"
        data-ai-hint={hint}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
      </video>
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group"
          aria-label="Play video"
        >
          <PlayCircle className="w-16 h-16 text-white/50 transition-transform group-hover:scale-110" />
        </button>
      )}
    </div>
  );
};

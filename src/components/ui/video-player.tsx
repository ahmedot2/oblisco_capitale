'use client';

import { useState, useRef } from 'react';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type VideoPlayerProps = {
  src: string;
  poster: string;
  hint: string;
};

export function VideoPlayer({ src, poster, hint }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInteracted, setIsInteracted] = useState(false);

  const handlePlay = () => {
    setIsInteracted(true);
    videoRef.current?.play();
  };

  return (
    <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden border border-border">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        poster={poster}
        preload="metadata"
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isInteracted && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          onClick={handlePlay}
        >
          <Image
            src={poster}
            alt={hint}
            fill
            className="object-cover"
            data-ai-hint={hint}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
          <PlayCircle className="relative w-20 h-20 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
        </div>
      )}
    </div>
  );
}

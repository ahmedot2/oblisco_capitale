// src/components/common/client-video-player.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

interface ClientVideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function ClientVideoPlayer({ src, className, ...props }: ClientVideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Reset loading state when src changes
      setIsLoading(true);
      videoElement.addEventListener('canplay', handleCanPlay);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, [src]);


  return (
    <div className={cn("relative w-full h-full", className)}>
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
      <video
        ref={videoRef}
        className={cn("w-full h-full", { 'opacity-0': isLoading })}
        src={src}
        onCanPlayThrough={handleCanPlay}
        onError={() => setIsLoading(false)} // Handle video load errors
        {...props}
      />
    </div>
  );
}
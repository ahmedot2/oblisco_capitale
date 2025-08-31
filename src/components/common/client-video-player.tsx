// src/components/common/client-video-player.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ClientVideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function ClientVideoPlayer({ src, className, ...props }: ClientVideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let objectUrl: string | null = null;

    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        // Construct absolute URL to prevent fetch errors on server/client
        const absoluteSrc = src.startsWith('http') ? src : `${window.location.origin}${src}`;
        const response = await fetch(absoluteSrc);
        if (!response.ok) {
          throw new Error(`Network response was not ok for: ${absoluteSrc}`);
        }
        const videoBlob = await response.blob();
        objectUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(objectUrl);
      } catch (error) {
        console.error('Failed to fetch video:', error);
        // Fallback to direct src if fetching fails
        setVideoUrl(src);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  if (isLoading || !videoUrl) {
    return <Skeleton className={cn("w-full h-full", className)} />;
  }

  return (
    <video
      key={videoUrl}
      className={className}
      src={videoUrl}
      {...props}
    />
  );
}

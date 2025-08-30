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
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error('Network response was not ok');
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

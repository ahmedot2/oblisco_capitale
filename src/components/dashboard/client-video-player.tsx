// src/components/dashboard/client-video-player.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ClientVideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

const ClientVideoPlayer: React.FC<ClientVideoPlayerProps> = ({ src, ...props }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string;

    const fetchVideo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.statusText}`);
        }
        const videoBlob = await response.blob();
        objectUrl = URL.createObjectURL(videoBlob);
        if (isMounted) {
          setVideoUrl(objectUrl);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchVideo();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  // When the videoUrl is set, we may need to manually call play() if autoplay is desired
  useEffect(() => {
    if (videoUrl && videoRef.current && props.autoPlay) {
      videoRef.current.play().catch(error => {
        // Autoplay was prevented. This is common in browsers.
        // Muted videos are usually allowed to autoplay.
        if (videoRef.current?.muted === false) {
           console.warn("Autoplay was prevented because the video is not muted.");
        }
      });
    }
  }, [videoUrl, props.autoPlay]);

  if (isLoading) {
    return <Skeleton className="w-full h-full bg-muted/20" />;
  }

  if (!videoUrl) {
    return null; // Or some error state
  }

  return (
    <video
      ref={videoRef}
      key={videoUrl} // Use key to force re-render when src changes
      {...props}
    >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
  );
};

export default ClientVideoPlayer;

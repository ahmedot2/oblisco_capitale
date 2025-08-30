// src/components/common/client-video-player.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ClientVideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  showControls?: boolean;
}

export function ClientVideoPlayer({ src, showControls = false, ...props }: ClientVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(props.autoPlay || false);
  const [isMuted, setIsMuted] = useState(props.muted || false);
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  if (isLoading || !videoUrl) {
    return <Skeleton className={cn("w-full h-full", props.className)} />;
  }

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => showControls && setIsHovered(true)}
      onMouseLeave={() => showControls && setIsHovered(false)}
    >
      <video
        ref={videoRef}
        key={videoUrl}
        {...props}
        src={videoUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {showControls && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300",
          isHovered || !isPlaying ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white rounded-full h-16 w-16" onClick={togglePlay}>
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>
            <Button variant="ghost" size="icon" className="absolute bottom-4 right-4 text-white hover:bg-white/20 hover:text-white rounded-full h-10 w-10" onClick={toggleMute}>
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

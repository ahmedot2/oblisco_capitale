// src/components/ui/video-player.tsx
'use client';

import { PlayCircle } from 'lucide-react';
import ReactPlayer from 'react-player/lazy';

interface VideoPlayerProps {
  src: string;
  poster: string;
  hint: string;
}

const VideoPlayer = ({ src, poster, hint }: VideoPlayerProps) => {
  return (
    <ReactPlayer
      url={src}
      controls
      width="100%"
      height="100%"
      light={<img src={poster} alt="Video Thumbnail" style={{width: '100%', height: '100%', objectFit: 'cover'}} data-ai-hint={hint} />}
      playIcon={<PlayCircle className="w-20 h-20 text-white/70 hover:text-white hover:scale-110 transition-all duration-300" />}
    />
  );
};

export default VideoPlayer;

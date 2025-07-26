'use client';

import ReactPlayer from 'react-player/lazy';
import { PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster: string;
}

const VideoPlayer = ({ src, poster }: VideoPlayerProps) => {
  try {
    return (
      <ReactPlayer
        url={src}
        light={poster}
        controls={true}
        width="100%"
        height="100%"
        playIcon={<PlayCircle className="w-20 h-20 text-white/70 hover:text-white transition-colors" />}
        wrapper="div"
        style={{ position: 'absolute', top: 0, left: 0 }}
        playing={true} // Add playing attribute for autoplay
        muted={true} // Add muted attribute for autoplay
        onError={(e, ...rest) => console.error('Video Player Error from onError:', e, ...rest)} // Modified error handling
      />
    );
  } catch (error) {
    console.error("Error rendering or initializing ReactPlayer:", error);
    return null; // Or render a fallback UI
  }
};

export default VideoPlayer;

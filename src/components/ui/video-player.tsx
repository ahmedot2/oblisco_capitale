'use client';

import ReactPlayer from 'react-player/lazy';
import { PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster: string;
}

const VideoPlayer = ({ src, poster }: VideoPlayerProps) => {
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
    />
  );
};

export default VideoPlayer;

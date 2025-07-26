
'use client';

import ReactPlayer from 'react-player/lazy';
import { PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  try {
    return (
      <ReactPlayer
        url={src}
        light={true}
        controls={true}
        width="100%"
        height="100%"
        playIcon={<PlayCircle className="w-20 h-20 text-white/70 hover:text-white transition-colors" />}
        wrapper="div"
        style={{ position: 'absolute', top: 0, left: 0 }}
        onError={(e, ...rest) => console.error('Video Player Error from onError:', e, ...rest)}
      />
    );
  } catch (error) {
    console.error("Error rendering or initializing ReactPlayer:", error);
    return null;
  }
};

export default VideoPlayer;

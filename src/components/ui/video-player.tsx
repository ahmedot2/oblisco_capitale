'use client';

import React from "react";

export const VideoPlayer = ({ src, poster, hint }: { src: string; poster: string; hint: string }) => {
  return (
    <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden border border-border">
      <video
        controls
        poster={poster}
        className="w-full h-full object-cover"
        data-ai-hint={hint}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

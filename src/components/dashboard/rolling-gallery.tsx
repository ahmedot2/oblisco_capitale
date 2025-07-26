// src/components/dashboard/rolling-gallery.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import Image from 'next/image';
import './rolling-gallery.css';

gsap.registerPlugin(Draggable);

const images = [
  { src: 'https://placehold.co/600x400.png', hint: 'luxury hotel lobby' },
  { src: 'https://placehold.co/600x400.png', hint: 'corporate headquarters' },
  { src: 'https://placehold.co/600x400.png', hint: 'residential skyscraper view' },
  { src: 'https://placehold.co/600x400.png', hint: 'fine dining restaurant' },
  { src: 'https://placehold.co/600x400.png', hint: 'shopping mall interior' },
  { src: 'https://placehold.co/600x400.png', hint: 'luxury apartment' },
  { src: 'https://placehold.co/600x400.png', hint: 'conference center' },
  { src: 'https://placehold.co/600x400.png', hint: 'observation deck' },
  { src: 'https://placehold.co/600x400.png', hint: 'spa wellness' },
  { src: 'https://placehold.co/600x400.png', hint: 'business lounge' },
];

export function RollingGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = gsap.utils.toArray<HTMLDivElement>('.gallery-item');
    const radius = items[0].offsetWidth * items.length / (2 * Math.PI);

    gsap.set(track, { rotationY: 0, transformOrigin: `50% 50% ${-radius}px` });
    gsap.set(items, {
      z: radius,
      rotationY: (i) => (i * 360) / items.length,
      transformOrigin: `50% 50% ${-radius}px`,
    });

    const draggableInstance = Draggable.create(track, {
      type: 'rotationY',
      inertia: true,
      snap: (value) => (Math.round(value / (360/items.length)) * (360/items.length)),
      onDrag: function () {
        rotation.current = this.rotationY;
      },
    });

    return () => {
      draggableInstance[0].kill();
    };
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left" />
      <div className="gallery-content">
        <div ref={trackRef} className="gallery-track">
          {images.map((image, index) => (
            <div key={index} className="gallery-item">
              <Image
                src={image.src}
                alt={`Gallery image ${index + 1}`}
                width={300}
                height={120}
                className="gallery-img"
                data-ai-hint={image.hint}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="gallery-gradient gallery-gradient-right" />
    </div>
  );
}

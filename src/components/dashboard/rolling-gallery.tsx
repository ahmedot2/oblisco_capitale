// src/components/dashboard/rolling-gallery.tsx
'use client';
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import "./rolling-gallery.css";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

const IMGS = [
  "/gallery-1.jpg",
  "/gallery-2.jpg",
  "/gallery-3.jpg",
  "/gallery-4.jpg",
  "/gallery-5.jpg",
  "/gallery-6.jpg",
  "/gallery-7.jpg",
  "/gallery-9.jpg",
  "/gallery-10.jpg",
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = IMGS }: RollingGalleryProps) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  useEffect(() => {
    if (!hasMounted) return;
    const checkScreenSize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [hasMounted]);

  const cylinderWidth = isScreenSizeSm ? 1100 : 2500;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef<NodeJS.Timeout>();

  const handleDrag = (_: any, info: { offset: { x: number; }; }) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: { velocity: { x: number; }; }) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1, ease: "easeOut" },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  useEffect(() => {
    if (autoplay && hasMounted) {
      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - (360 / faceCount),
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - (360 / faceCount));
      }, 2000);

      return () => clearInterval(autoplayRef.current);
    }
  }, [autoplay, rotation, controls, faceCount, hasMounted]);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - (360 / faceCount),
        transition: { duration: 2, ease: "linear" },
      });
      rotation.set(rotation.get() - (360 / faceCount));

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - (360 / faceCount),
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - (360 / faceCount));
      }, 2000);
    }
  };

  if (!hasMounted) {
    return <div className="gallery-container h-64 w-full bg-muted/20 animate-pulse rounded-lg" />;
  }
  
  return (
    <Dialog>
      <div className="gallery-container">
        <div className="gallery-gradient gallery-gradient-left"></div>
        <div className="gallery-gradient gallery-gradient-right"></div>
        <div className="gallery-content">
          <motion.div
            drag="x"
            className="gallery-track"
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-d",
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            {images.map((url, i) => (
              <DialogTrigger asChild key={i}>
                <div
                  className="gallery-item"
                  onClick={() => setSelectedImage(url)}
                  style={{
                    width: `${faceWidth}px`,
                    transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                  }}
                >
                  <img src={url} alt={`gallery image ${i + 1}`} className="gallery-img" />
                </div>
              </DialogTrigger>
            ))}
          </motion.div>
        </div>
      </div>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
        <DialogTitle className="sr-only">Enlarged Gallery Image</DialogTitle>
        {selectedImage && (
          <Image
            src={`${selectedImage}?t=${new Date().getTime()}`}
            alt="Enlarged gallery view"
            width={1200}
            height={800}
            className="w-full h-auto object-contain rounded-lg"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RollingGallery;

// hooks/use-count-up.ts
'use client';

import { useState, useEffect, useRef } from 'react';

export function useCountUp(end: number, duration: number = 2000, decimals: number = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const currentCount = percentage * end;
            setCount(parseFloat(currentCount.toFixed(decimals)));

            if (progress < duration) {
              animationFrameId.current = requestAnimationFrame(animate);
            } else {
              setCount(end); // Ensure it ends on the exact number
            }
          };
          animationFrameId.current = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, decimals]);

  return { count, ref };
}

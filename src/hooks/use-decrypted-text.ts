// src/hooks/use-decrypted-text.ts
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const defaultCharacters = 'abcdefghijklmnopqrstuvwxyz';

type UseDecryptedTextOptions = {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  animateOn?: 'hover' | 'view';
};

export function useDecryptedText({
  text,
  speed = 50,
  maxIterations: customMaxIterations,
  characters = defaultCharacters,
  animateOn = 'hover',
}: UseDecryptedTextOptions) {
  const [displayedText, setDisplayedText] = useState(text);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);
  const ref = useRef<HTMLElement>(null);

  const startAnimation = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    let iteration = 0;
    const maxIterations = customMaxIterations ?? text.length;

    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      const newText = text
        .split('')
        .map((_letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');
      
      setDisplayedText(newText);

      if (iteration >= maxIterations) {
        if (intervalId.current) clearInterval(intervalId.current);
        isAnimating.current = false;
        setDisplayedText(text); // ensure final text is correct
      }

      iteration += 1 / 3;
    }, speed);
  }, [text, speed, characters, customMaxIterations]);

  const stopAnimation = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    isAnimating.current = false;
    setDisplayedText(text);
  }, [text]);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    if (animateOn === 'hover') {
      currentRef.addEventListener('mouseenter', startAnimation);
      currentRef.addEventListener('mouseleave', stopAnimation);
    } else if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(currentRef);
      return () => observer.disconnect();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mouseenter', startAnimation);
        currentRef.removeEventListener('mouseleave', stopAnimation);
      }
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [animateOn, startAnimation, stopAnimation]);

  return { displayedText, ref };
}

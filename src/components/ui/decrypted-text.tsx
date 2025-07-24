// src/components/ui/decrypted-text.tsx
'use client';

import React from 'react';
import { useDecryptedText } from '@/hooks/use-decrypted-text';
import { cn } from '@/lib/utils';

type DecryptedTextProps = {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  animateOn?: 'hover' | 'view';
};

export const DecryptedText = ({
  text,
  speed,
  maxIterations,
  characters,
  className,
  animateOn,
}: DecryptedTextProps) => {
  const { displayedText, ref } = useDecryptedText({
    text,
    speed,
    maxIterations,
    characters,
    animateOn,
  });

  return (
    <span ref={ref} className={cn(className)}>
      {displayedText}
    </span>
  );
};

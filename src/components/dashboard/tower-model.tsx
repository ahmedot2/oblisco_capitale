'use client';

import Image from 'next/image';
import { BentoCardContent, BentoCardHeader, BentoCardTitle } from '../ui/bento-card';

export function TowerModel() {
  return (
    <div className="w-full h-full flex flex-col bg-white/5 p-4 rounded-lg border border-white/10">
      <BentoCardHeader className="p-0">
        <BentoCardTitle className="font-headline text-base">The Iconic Centerpiece</BentoCardTitle>
      </BentoCardHeader>
      <BentoCardContent className="flex-grow relative p-0 mt-4">
        <Image
          src="/oblisco-tower.png"
          alt="Oblisco Capitale Tower"
          fill
          className="object-contain rounded-md"
          data-ai-hint="futuristic skyscraper"
        />
      </BentoCardContent>
    </div>
  );
}

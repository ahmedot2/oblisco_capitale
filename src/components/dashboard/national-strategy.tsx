// src/components/dashboard/national-strategy.tsx
import { Map, Globe, Landmark } from 'lucide-react';
import { BentoCard, BentoCardContent, BentoCardHeader, BentoCardTitle } from '../ui/bento-card';

const propositions = [
  {
    title: "Geopolitical Leverage & Influence",
    text: "Positions Qatar as the primary economic partner in Egypt's Vision 2030. Creates decades of strategic goodwill and deepens bilateral ties at the highest levels of government.",
    icon: <Map className="w-8 h-8 text-primary" />,
    visual: <div className="absolute inset-0 bg-[url('https://placehold.co/400x200.png')] bg-cover bg-center opacity-10" data-ai-hint="map qatar egypt"></div>
  },
  {
    title: "Economic Diversification & Soft Power",
    text: "The Oblisco Capitale becomes a tangible symbol of Qatari vision and investment prowess on the African continent, projecting immense soft power and opening new corridors for Qatari businesses.",
    icon: <Globe className="w-8 h-8 text-primary" />,
    visual: <div className="absolute inset-0 bg-[url('https://placehold.co/400x200.png')] bg-cover bg-center opacity-10" data-ai-hint="global trade"></div>
  },
  {
    title: "A Legacy Asset for Future Generations",
    text: "Secures a non-replicable, trophy asset for QIA's portfolio—a landmark on par with global icons, generating stable, long-term returns and prestige for the State of Qatar for the next century.",
    icon: <Landmark className="w-8 h-8 text-primary" />,
    visual: <div className="absolute inset-0 bg-[url('https://placehold.co/400x200.png')] bg-cover bg-center opacity-10" data-ai-hint="doha skyline"></div>
  }
];

export function NationalStrategy() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {propositions.map((prop) => (
        <BentoCard key={prop.title} className="relative overflow-hidden">
          {prop.visual}
          <div className="relative z-10 h-full flex flex-col">
            <BentoCardHeader className="items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-2">
                {prop.icon}
              </div>
              <BentoCardTitle className="font-headline text-xl">{prop.title}</BentoCardTitle>
            </BentoCardHeader>
            <BentoCardContent className="text-center flex-grow">
              <p className="text-muted-foreground">{prop.text}</p>
            </BentoCardContent>
          </div>
        </BentoCard>
      ))}
    </div>
  );
}

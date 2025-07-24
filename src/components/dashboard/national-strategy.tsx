// src/components/dashboard/national-strategy.tsx
import { Map, Globe, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

const propositions = [
  {
    title: "Geopolitical Leverage & Influence",
    text: "Positions Qatar as the primary economic partner in Egypt's Vision 2030. Creates decades of strategic goodwill and deepens bilateral ties at the highest levels of government.",
    icon: <Map className="w-8 h-8 text-primary" />,
  },
  {
    title: "Economic Diversification & Soft Power",
    text: "The Oblisco Capitale becomes a tangible symbol of Qatari vision and investment prowess on the African continent, projecting immense soft power and opening new corridors for Qatari businesses.",
    icon: <Globe className="w-8 h-8 text-primary" />,
  },
  {
    title: "A Legacy Asset for Future Generations",
    text: "Secures a non-replicable, trophy asset for QIA's portfolio—a landmark on par with global icons, generating stable, long-term returns and prestige for the State of Qatar for the next century.",
    icon: <Landmark className="w-8 h-8 text-primary" />,
  }
];

export function NationalStrategy() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {propositions.map((prop) => (
          <div key={prop.title} className={cn("group relative overflow-hidden bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center shadow-inner transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_0px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5")}>
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex-shrink-0 mb-4">
                <div className="p-4 bg-primary/10 rounded-full inline-block">
                  {prop.icon}
                </div>
              </div>
              <h3 className="font-headline text-xl mb-3 flex-grow">{prop.title}</h3>
              <div className="text-center">
                <p className="text-muted-foreground text-justify">{prop.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}

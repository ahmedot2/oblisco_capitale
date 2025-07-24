import { Lock, GitMerge, BarChart } from 'lucide-react';
import { BentoCard, BentoCardContent, BentoCardHeader, BentoCardTitle } from '../ui/bento-card';

const propositions = [
  {
    title: "Exclusive Access",
    text: "Securing a trophy asset in a high-barrier market.",
    icon: <Lock className="w-8 h-8 text-primary" />
  },
  {
    title: "Integrated Solution",
    text: "Combining financial engineering with world-class execution.",
    icon: <GitMerge className="w-8 h-8 text-primary" />
  },
  {
    title: "Superior Risk-Adjusted Returns",
    text: "Transforming systemic risk into unparalleled strategic value.",
    icon: <BarChart className="w-8 h-8 text-primary" />
  }
];

export function UnassailableProposition() {
  return (
    <BentoCard>
      <BentoCardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {propositions.map((prop) => (
            <BentoCard key={prop.title} className="bg-white/5 border-white/10 !shadow-none hover:-translate-y-0.5">
              <BentoCardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-2">
                  {prop.icon}
                </div>
                <BentoCardTitle className="font-headline text-xl">{prop.title}</BentoCardTitle>
              </BentoCardHeader>
              <BentoCardContent className="text-center">
                <p className="text-muted-foreground">{prop.text}</p>
              </BentoCardContent>
            </BentoCard>
          ))}
        </div>
      </BentoCardContent>
    </BentoCard>
  );
}

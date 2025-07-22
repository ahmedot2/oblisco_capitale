import { BentoCard, BentoCardContent, BentoCardHeader, BentoCardTitle } from "../ui/bento-card";
import { Building, DollarSign, ShieldCheck, TrendingUp } from "lucide-react";

const metrics = [
  { value: "1,000m", label: "Iconic Height", icon: <Building className="w-6 h-6 text-primary" /> },
  { value: "$3B", label: "Total CBD Project Scale", icon: <DollarSign className="w-6 h-6 text-primary" /> },
  { value: "$35B", label: "Ras El Hekma Deal", sublabel: "(Validates Market Confidence)", icon: <ShieldCheck className="w-6 h-6 text-primary" /> },
  { value: ">20%", label: "Target IRR", sublabel: "(USD-Denominated)", icon: <TrendingUp className="w-6 h-6 text-primary" /> },
];

export function InvestmentThesis() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Card 1: The Proposal */}
      <BentoCard className="lg:col-span-1">
        <BentoCardHeader>
          <BentoCardTitle className="font-headline text-xl">
            A Strategic Entry into Egypt's Future
          </BentoCardTitle>
        </BentoCardHeader>
        <BentoCardContent>
          <p className="text-muted-foreground">
            This proposal outlines a generational opportunity to secure a commanding position in a landmark asset. The project's complex macroeconomic environment has created a unique barrier to entry, which we transform into a superior risk-adjusted return through the exclusive ARK-Diar Qatar partnership.
          </p>
        </BentoCardContent>
      </BentoCard>

      {/* Card 2: The Opportunity by the Numbers */}
      <BentoCard className="lg:col-span-1">
        <BentoCardHeader>
          <BentoCardTitle className="font-headline text-xl">
            The Opportunity by the Numbers
          </BentoCardTitle>
        </BentoCardHeader>
        <BentoCardContent>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {metrics.map(metric => (
              <div key={metric.label} className="flex items-start gap-3">
                <div className="mt-1">{metric.icon}</div>
                <div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{metric.label}</p>
                  {metric.sublabel && <p className="text-xs text-muted-foreground/70 leading-tight">{metric.sublabel}</p>}
                </div>
              </div>
            ))}
          </div>
        </BentoCardContent>
      </BentoCard>
      
      {/* Card 3: The Ask & The Vehicle */}
      <BentoCard className="lg:col-span-1">
        <BentoCardHeader>
          <BentoCardTitle className="font-headline text-xl">
            The Exclusive Investment Vehicle
          </BentoCardTitle>
        </BentoCardHeader>
        <BentoCardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary">The Ask:</h4>
            <p className="text-muted-foreground">A strategic capital injection for a commanding equity position.</p>
          </div>
          <div>
            <h4 className="font-semibold text-primary">The Vehicle:</h4>
            <p className="text-muted-foreground">The ARK & Diar Qatar partnership—the sole pathway to de-risk execution and guarantee world-class delivery.</p>
          </div>
        </BentoCardContent>
      </BentoCard>
    </div>
  );
}

import { BentoCard, BentoCardContent, BentoCardHeader, BentoCardTitle } from "../ui/bento-card";
import { Building, DollarSign, ShieldCheck, TrendingUp } from "lucide-react";

const metrics = [
  { value: "$3B", label: "Sole Capital Mandate", icon: <DollarSign className="w-6 h-6 text-primary" /> },
  { value: "1,000m", label: "Iconic Height", icon: <Building className="w-6 h-6 text-primary" /> },
  { value: ">18%", label: "Target Project IRR (USD)", icon: <TrendingUp className="w-6 h-6 text-primary" /> },
  { value: "~40%", label: "Commanding Equity Stake", icon: <ShieldCheck className="w-6 h-6 text-primary" /> },
];

export function InvestmentThesis() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <BentoCard className="lg:col-span-1">
        <BentoCardHeader>
          <BentoCardTitle className="font-headline text-xl">
            A Sovereign Mandate to Secure an Icon
          </BentoCardTitle>
        </BentoCardHeader>
        <BentoCardContent>
          <p className="text-muted-foreground">
            This proposal outlines a generational opportunity for QIA to fully fund the $3B Oblisco Capitale and its surrounding CBD, securing complete financial control over a landmark national asset. This is a direct pathway to establishing a new pillar of Qatari economic influence in North Africa.
          </p>
        </BentoCardContent>
      </BentoCard>

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
      
      <BentoCard className="lg:col-span-1">
        <BentoCardHeader>
          <BentoCardTitle className="font-headline text-xl">
            The Exclusive Investment Vehicle
          </BentoCardTitle>
        </BentoCardHeader>
        <BentoCardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary">The Ask:</h4>
            <p className="text-muted-foreground">$3 Billion Sole Funding Mandate.</p>
          </div>
          <div>
            <h4 className="font-semibold text-primary">The Vehicle:</h4>
            <p className="text-muted-foreground">The ARK & Diar Qatar partnership—the essential execution vehicle to de-risk and deliver the entire project on behalf of QIA, guaranteeing Qatari standards of excellence.</p>
          </div>
        </BentoCardContent>
      </BentoCard>
    </div>
  );
}

// src/components/dashboard/investment-thesis.tsx
'use client';

import { BentoCard, BentoCardContent, BentoCardHeader, BentoCardTitle } from "../ui/bento-card";
import { Building, DollarSign, ShieldCheck, TrendingUp } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";
import { TextType } from "../ui/text-type";

const CountUpMetric = ({
  end,
  prefix = '',
  suffix = '',
  decimals = 0
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const { count, ref } = useCountUp(end, 2000, decimals);
  return (
    <span ref={ref} className="text-2xl font-bold">
      {prefix}{count}{suffix}
    </span>
  );
};

const metrics = [
  { 
    end: 3, 
    prefix: "$",
    suffix: "B",
    label: "Sole Capital Mandate", 
    icon: <DollarSign className="w-6 h-6 text-primary" /> 
  },
  { 
    end: 1000, 
    suffix: "m",
    label: "Iconic Height", 
    icon: <Building className="w-6 h-6 text-primary" /> 
  },
  { 
    end: 18, 
    prefix: ">",
    suffix: "%",
    label: "Target Project IRR (USD)", 
    icon: <TrendingUp className="w-6 h-6 text-primary" /> 
  },
  { 
    end: 40,
    prefix: "~",
    suffix: "%",
    label: "Commanding Equity Stake", 
    icon: <ShieldCheck className="w-6 h-6 text-primary" /> 
  },
];

export function InvestmentThesis() {
  return (
    <BentoCard className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={cn("group bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col shadow-inner transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_0px_hsl(var(--primary)/0.3)]")}>
          <BentoCardHeader className="p-0">
            <BentoCardTitle className="font-headline text-xl">
              A Sovereign Mandate to Secure an Icon
            </BentoCardTitle>
          </BentoCardHeader>
          <BentoCardContent className="p-0 pt-4 flex-grow">
            <TextType 
              as="p"
              text="A generational mandate for QIA to exclusively fund the $3B Oblisco Capitale CBD, securing sovereign control over what will be the world's tallest building. This is a direct pathway to cementing Qatar's legacy on the global stage, creating an unparalleled symbol of Qatari vision and economic power for the next century."
              className="text-muted-foreground text-justify"
              startOnVisible
              loop={false}
              typingSpeed={10}
            />
          </BentoCardContent>
        </div>

        <div className={cn("group bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col shadow-inner transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_0px_hsl(var(--primary)/0.3)]")}>
          <BentoCardHeader className="p-0">
            <BentoCardTitle className="font-headline text-xl">
              The Opportunity by the Numbers
            </BentoCardTitle>
          </BentoCardHeader>
          <BentoCardContent className="p-0 pt-4 flex-grow flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {metrics.map(metric => (
                <div key={metric.label} className="flex items-start gap-3">
                  <div className="mt-1">{metric.icon}</div>
                  <div>
                    <p className="text-2xl font-bold">
                       <CountUpMetric end={metric.end} prefix={metric.prefix} suffix={metric.suffix} />
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight">{metric.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoCardContent>
        </div>
        
        <div className={cn("group bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col shadow-inner transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_0px_hsl(var(--primary)/0.3)]")}>
          <BentoCardHeader className="p-0">
            <BentoCardTitle className="font-headline text-xl">
              The Exclusive Investment Vehicle
            </BentoCardTitle>
          </BentoCardHeader>
          <BentoCardContent className="p-0 pt-4 space-y-4 flex-grow">
            <div>
              <h4 className="font-semibold text-primary">The Ask:</h4>
               <TextType 
                as="p"
                text="$3 Billion Sole Funding Mandate."
                className="text-muted-foreground text-justify"
                startOnVisible
                loop={false}
                typingSpeed={10}
              />
            </div>
            <div>
              <h4 className="font-semibold text-primary">The Vehicle:</h4>
              <TextType 
                as="p"
                text="The ARK-Diar Qatar partnership is the non-negotiable execution vehicle. It is the sole mechanism that de-risks delivery and guarantees the asset is built to Qatar's world-class standards."
                className="text-muted-foreground text-justify"
                startOnVisible
                loop={false}
                typingSpeed={10}
              />
            </div>
          </BentoCardContent>
        </div>
      </div>
    </BentoCard>
  );
}

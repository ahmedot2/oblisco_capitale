// src/components/dashboard/risk-and-resilience-framework.tsx
'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUp, Minus, ShieldCheck } from 'lucide-react';
import { useCountUp } from '@/hooks/use-count-up';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const CountUpNumber = ({ to, suffix, decimals }: { to: number; suffix?: string, decimals?: number }) => {
  const { count, ref } = useCountUp(to, 2000, decimals);
  return <span ref={ref}>{count}{suffix}</span>;
}

const frameworkData = [
  { 
    id: 'currency',
    risk: { 
      name: "Currency Volatility", 
      metric: 50, 
      metricSuffix: "%+", 
      trend: "high risk", 
      trendIcon: <ArrowUp className="w-4 h-4 text-destructive" />,
      citation: 141,
    },
    shield: {
      headline: "Financial Shield",
      text: "Hard-Currency Revenues & Sophisticated FX Hedging.",
      attribution: "Led by The ARK"
    }
  },
  {
    id: 'debt',
    risk: { 
      name: "Public Debt", 
      metric: 90.3, 
      metricSuffix: "% of GDP", 
      trend: "stable", 
      trendIcon: <Minus className="w-4 h-4 text-yellow-400" />,
      citation: 133,
    },
    shield: {
      headline: "Structural Shield",
      text: "Investment Structured to Bypass Sovereign Fiscal Strain.",
      attribution: "Architected by The ARK"
    }
  },
  { 
    id: 'inflation',
    risk: {
      name: "Inflation Rate", 
      metric: 35.7, 
      metricSuffix: "% (Feb 2024)", 
      trend: "high risk", 
      trendIcon: <ArrowUp className="w-4 h-4 text-destructive" />,
      citation: 138,
    },
    shield: {
      headline: "Operational Shield",
      text: "Elite Procurement & Cost Control.",
      attribution: "Executed by Diar Qatar"
    }
  },
  {
    id: 'repatriation',
    risk: { 
      name: "Repatriation Risk", 
      metricText: "Improving", 
      trend: "improving", 
      trendIcon: <ArrowDown className="w-4 h-4 text-green-400" />,
      citation: 162,
    },
    shield: {
      headline: "Sovereign Shield",
      text: "Ironclad, Treaty-Level Repatriation Guarantees.",
      attribution: "Secured by The ARK"
    }
  },
];

export function RiskAndResilienceFramework() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  const handleRiskClick = (id: string) => {
    setSelectedRisk(prev => (prev === id ? null : id));
  };

  const selectedShield = frameworkData.find(d => d.id === selectedRisk)?.shield;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TooltipProvider>
        {frameworkData.map(({ id, risk }) => (
          <div key={id} className="flex flex-col gap-4">
            <div 
              onClick={() => handleRiskClick(id)}
              className={cn(
                "bg-white/5 p-4 rounded-lg border border-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer",
                selectedRisk === id && "border-primary ring-2 ring-primary"
              )}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm">{risk.name}</h3>
                <div className="flex items-center gap-1 text-xs capitalize text-muted-foreground">
                  {risk.trendIcon}
                  <span>{risk.trend}</span>
                </div>
              </div>
              <p className="text-2xl font-bold mt-2">
                 {risk.metric ? <><CountUpNumber to={risk.metric} decimals={risk.metric === 90.3 || risk.metric === 35.7 ? 1 : 0} />{risk.metricSuffix}</> : risk.metricText}
              </p>
              <div className="mt-2 text-xs text-primary space-y-1">
                <div className="text-muted-foreground leading-tight">Mitigation: 
                  <Tooltip>
                    <TooltipTrigger asChild>
                       <span className="text-primary/50 opacity-50 hover:opacity-100 transition-opacity cursor-pointer text-xs ml-1">[cite: {risk.citation}]</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Source: OBLISCO_MACRO_ANALYSIS.PDF</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {selectedRisk === id && selectedShield && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="bg-secondary/50 p-4 rounded-lg border border-primary/30 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                      <h4 className="font-bold text-base text-primary">{selectedShield.headline}</h4>
                    </div>
                    <p className="text-sm text-foreground">{selectedShield.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">{selectedShield.attribution}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
}

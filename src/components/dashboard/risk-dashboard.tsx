import { ArrowDown, ArrowRight, Minus } from "lucide-react";
import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card";
import { Badge } from "../ui/badge";

const risks = [
  { name: "Currency Volatility", metric: "± 5% FY23", trend: "stable", trendIcon: <Minus className="w-4 h-4 text-yellow-400" />, mitigation: "FX Hedging" },
  { name: "Public Debt", metric: "88% of GDP", trend: "improving", trendIcon: <ArrowDown className="w-4 h-4 text-green-400" />, mitigation: "Govt. Guarantees" },
  { name: "Inflation Rate", metric: "14% (proj.)", trend: "stable", trendIcon: <Minus className="w-4 h-4 text-yellow-400" />, mitigation: "Phased CAPEX" },
  { name: "Repatriation Risk", metric: "Low", trend: "improving", trendIcon: <ArrowDown className="w-4 h-4 text-green-400" />, mitigation: "DWT Treaty" },
];

export function RiskDashboard() {
  return (
    <>
      <BentoCardHeader>
        <BentoCardTitle className="font-headline">Macro-Risk Dashboard</BentoCardTitle>
        <BentoCardDescription>Proactive mitigation of regional economic variables.</BentoCardDescription>
      </BentoCardHeader>
      <BentoCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {risks.map(risk => (
            <div key={risk.name} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm">{risk.name}</h3>
                <div className="flex items-center gap-1 text-xs capitalize text-muted-foreground">
                  {risk.trendIcon}
                  <span>{risk.trend}</span>
                </div>
              </div>
              <p className="text-2xl font-bold mt-2">{risk.metric}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-primary">
                <span>Mitigation:</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{risk.mitigation}</Badge>
              </div>
            </div>
          ))}
        </div>
      </BentoCardContent>
    </>
  );
}

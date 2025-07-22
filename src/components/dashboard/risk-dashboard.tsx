import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card";
import { Badge } from "../ui/badge";

const risks = [
  { name: "Currency Volatility", metric: ">50% EGP Deval.", trend: "high risk", trendIcon: <ArrowUp className="w-4 h-4 text-destructive" />, mitigation: "Hard-currency revenue streams", citation: 141 },
  { name: "Public Debt", metric: "90.3% of GDP", trend: "stable", trendIcon: <Minus className="w-4 h-4 text-yellow-400" />, mitigation: "Investment structured to bypass sovereign fiscal strain", citation: 133 },
  { name: "Inflation Rate", metric: "35.7% (Feb 2024)", trend: "high risk", trendIcon: <ArrowUp className="w-4 h-4 text-destructive" />, mitigation: "Diar Qatar's procurement efficiency", citation: 138 },
  { name: "Repatriation Risk", metric: "Improving", trend: "improving", trendIcon: <ArrowDown className="w-4 h-4 text-green-400" />, mitigation: "The ARK's Ironclad Treaty-Level Guarantees", citation: 162 },
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
              <div className="mt-2 text-xs text-primary space-y-1">
                <p className="text-muted-foreground leading-tight">Mitigation: {risk.mitigation} <span className="text-primary/50">[cite: {risk.citation}]</span></p>
              </div>
            </div>
          ))}
        </div>
      </BentoCardContent>
    </>
  );
}

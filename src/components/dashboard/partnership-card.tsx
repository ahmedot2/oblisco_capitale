import { Building, Link, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card";

export function PartnershipCard() {
  const partners = [
    { name: "The ARK", description: "Lead Developer" },
    { name: "Diar Qatar", description: "Sovereign Partner" },
  ];

  const values = [
    { name: "Financial Engineering", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "Execution Excellence", icon: <Building className="w-4 h-4" /> },
    { name: "Risk Mitigation", icon: <ShieldCheck className="w-4 h-4" /> },
    { name: "Governmental Access", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <>
      <BentoCardHeader>
        <BentoCardTitle className="font-headline">Synergistic Partnership</BentoCardTitle>
        <BentoCardDescription>A consortium built for success.</BentoCardDescription>
      </BentoCardHeader>
      <BentoCardContent>
        <div className="flex items-center justify-around gap-4 my-4">
          {partners.map((p, i) => (
            <div key={p.name} className="text-center">
              <div className="p-3 bg-primary/10 rounded-lg inline-block">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold mt-2">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.description}</p>
            </div>
          ))}
          <Link className="w-8 h-8 text-muted-foreground shrink-0" />
          <div className="text-center">
            <div className="p-3 bg-green-500/10 rounded-lg inline-block">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <p className="font-bold mt-2">QIA</p>
            <p className="text-xs text-muted-foreground">Strategic Investor</p>
          </div>
        </div>
        <div className="border-t border-white/10 my-4" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {values.map(v => (
            <div key={v.name} className="flex items-center gap-2 text-sm">
              <div className="text-primary">{v.icon}</div>
              <span>{v.name}</span>
            </div>
          ))}
        </div>
      </BentoCardContent>
    </>
  );
}

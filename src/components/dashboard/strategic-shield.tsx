"use client"

import { useState } from "react"
import { ShieldCheck, TrendingUp, Handshake, University, Tractor, Building2 } from "lucide-react"
import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card"
import { cn } from "@/lib/utils"

const riskCategories = [
  {
    title: "Financial Risks",
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    mitigation: {
      ark: "Advanced financial modeling, FX hedging strategies, and multi-tranche financing to absorb currency shocks.",
      diar: "Sovereign guarantees and priority access to central bank foreign currency reserves."
    }
  },
  {
    title: "Economic Risks",
    icon: <University className="w-8 h-8 text-primary" />,
    mitigation: {
      ark: "Inflation-indexed contracts and phased procurement to mitigate cost overruns.",
      diar: "Leveraging state-level procurement channels for preferential pricing on materials."
    }
  },
  {
    title: "Political Risks",
    icon: <Handshake className="w-8 h-8 text-primary" />,
    mitigation: {
      ark: "Investment structured under bilateral investment treaties (BITs) for international arbitration.",
      diar: "Deep-rooted governmental relationships ensuring regulatory stability and fast-track approvals."
    }
  },
  {
    title: "Operational Risks",
    icon: <Building2 className="w-8 h-8 text-primary" />,
    mitigation: {
      ark: "Partnership with CSCEC, the world's largest construction firm, ensuring execution excellence.",
      diar: "Direct on-site management guaranteeing timeline, budget, and quality control."
    }
  }
]

export function StrategicShield() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const handleCardClick = (title: string) => {
    if (flippedCard === title) {
      setFlippedCard(null);
    } else {
      setFlippedCard(title);
    }
  };

  return (
    <>
      <BentoCardHeader>
        <BentoCardTitle className="font-headline">The ARK-Diar Qatar Strategic Shield</BentoCardTitle>
        <BentoCardDescription>Transforming regional risks into strategic advantages.</BentoCardDescription>
      </BentoCardHeader>
      <BentoCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {riskCategories.map((risk) => (
            <div
              key={risk.title}
              className="relative w-full h-48 [transform-style:preserve-3d] transition-transform duration-500 cursor-pointer"
              onClick={() => handleCardClick(risk.title)}
              style={{
                transform: flippedCard === risk.title ? 'rotateY(180deg)' : 'none',
              }}
            >
              <div className="absolute w-full h-full bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                <div className="p-3 bg-primary/10 rounded-lg mb-2">{risk.icon}</div>
                <h3 className="font-semibold">{risk.title}</h3>
              </div>
              <div className="absolute w-full h-full bg-secondary p-4 rounded-lg border border-primary/50 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
                 <h4 className="font-bold text-sm text-primary">Mitigation Strategy</h4>
                 <div className="text-xs mt-2 space-y-2">
                   <p><span className="font-bold text-primary/80">The ARK:</span> {risk.mitigation.ark}</p>
                   <p><span className="font-bold text-primary/80">Diar Qatar:</span> {risk.mitigation.diar}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </BentoCardContent>
    </>
  );
}

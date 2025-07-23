// src/components/dashboard/strategic-inquiries.tsx
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BentoCard } from "../ui/bento-card";

const inquiries = [
  {
    question: "Why is the full $3B mandate superior to a smaller, syndicated investment?",
    answer: "A sole mandate grants QIA unprecedented control, a commanding equity stake (~40%), and first-priority profit repatriation rights. It transforms this from a financial investment into a strategic, sovereign-level asset for the State of Qatar, maximizing both returns and geopolitical influence."
  },
  {
    question: "How is our capital protected from Egyptian currency volatility and repatriation risk?",
    answer: "Through The ARK's sovereign-level negotiations, this investment will be governed by ironclad, treaty-level agreements. These guarantees, backed by the Egyptian state, ensure priority access to hard currency for all profit repatriation, effectively insulating QIA's returns from local market fluctuations."
  },
  {
    question: "What is the specific role of Diar Qatar, and why are they essential?",
    answer: "Diar Qatar serves as the on-the-ground execution and managing partner. They are QIA's guarantee of quality, efficiency, and on-budget delivery. Their direct oversight mitigates construction and operational risk, ensuring the asset is built to Qatar's world-class standards, thus protecting the investment's long-term value."
  },
  {
    question: "What is the exit strategy for a mega-project of this scale?",
    answer: "Our model includes multiple, flexible exit pathways timed for optimal market conditions. These include a strategic sale to a consortium of global pension funds, the creation of a landmark regional REIT, or a long-term hold as a trophy asset generating stable, century-long returns for QIA's portfolio."
  },
  {
    question: "Beyond the Ras El Hekma deal, what indicates long-term market stability?",
    answer: "Our thesis is built on long-term fundamentals, not temporary injections. Key indicators include Egypt's continued adherence to IMF-mandated fiscal reforms, the strategic importance of the Suez Canal, and a demographic dividend that will drive organic demand within the NAC for decades. We view the current volatility as a temporary barrier creating this unique entry point."
  },
  {
    question: "How are the existing stakeholders (CSCEC, ACUD) managed under this new mandate?",
    answer: "Under the $3B mandate, QIA, through The ARK/Diar Qatar vehicle, becomes the primary capital partner. CSCEC's role transitions to a contract-based primary builder under the strict oversight of Diar Qatar. This new structure places QIA at the top of the capital stack, ensuring our interests and standards dictate the project's execution."
  }
];

export function StrategicInquiries() {
  return (
    <Accordion type="multiple" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {inquiries.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index} asChild>
          <BentoCard className="p-4 !hover:-translate-y-0 transition-all duration-300">
            <AccordionTrigger className="text-left font-bold text-base hover:no-underline [&[data-state=open]>svg]:text-primary">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pt-4 text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </BentoCard>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

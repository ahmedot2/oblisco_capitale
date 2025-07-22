import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const timelineEvents = [
  { phase: "Phase 1: Foundation & Core", year: "2025-2027", lead: "Diar Qatar", details: "Objective: Site prep, excavation, and foundational structures completed. Lead: Diar Qatar." },
  { phase: "Phase 2: Superstructure", year: "2027-2030", lead: "CSCEC", details: "Objective: Complete core structure ahead of schedule. Lead: CSCEC." },
  { phase: "Phase 3: Cladding & Interiors", year: "2030-2032", lead: "CSCEC", details: "Objective: Facade installation and interior fit-out. Lead: CSCEC." },
  { phase: "Phase 4: T.O.P & Launch", year: "2032", lead: "The ARK", details: "Objective: Temporary Occupation Permit, marketing & sales launch. Lead: The ARK." },
];

export function ExecutionTimeline() {
  return (
    <>
      <BentoCardHeader>
        <BentoCardTitle className="font-headline">A De-Risked Execution Roadmap</BentoCardTitle>
        <BentoCardDescription>A phased approach ensuring on-time, on-budget delivery.</BentoCardDescription>
      </BentoCardHeader>
      <BentoCardContent>
        <div className="w-full flex items-center justify-between relative py-8">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />
          <TooltipProvider>
          {timelineEvents.map((event, index) => (
            <div key={event.phase} className="group relative flex-1 flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full transition-all group-hover:scale-125 cursor-pointer"></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-bold">{event.details}</p>
                </TooltipContent>
              </Tooltip>
              <div className={`text-center absolute ${index % 2 === 0 ? 'bottom-6' : 'top-6'}`}>
                <p className="font-bold text-sm">{event.phase}</p>
                <p className="text-xs text-muted-foreground">{event.year}</p>
              </div>
            </div>
          ))}
          </TooltipProvider>
        </div>
      </BentoCardContent>
    </>
  );
}

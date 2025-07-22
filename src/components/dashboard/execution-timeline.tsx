import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card";

const timelineEvents = [
  { phase: "Phase 1: Foundation & Core", year: "2025-2027", lead: "Diar Qatar", details: "Site prep, excavation, foundational structures." },
  { phase: "Phase 2: Superstructure", year: "2027-2030", lead: "CSCEC", details: "Vertical construction, core & shell." },
  { phase: "Phase 3: Cladding & Interiors", year: "2030-2032", lead: "CSCEC", details: "Facade installation, interior fit-out." },
  { phase: "Phase 4: T.O.P & Launch", year: "2032", lead: "The ARK", details: "Temporary Occupation Permit, marketing & sales launch." },
];

export function ExecutionTimeline() {
  return (
    <>
      <BentoCardHeader>
        <BentoCardTitle className="font-headline">Execution Timeline</BentoCardTitle>
        <BentoCardDescription>A phased approach ensuring on-time, on-budget delivery.</BentoCardDescription>
      </BentoCardHeader>
      <BentoCardContent>
        <div className="w-full flex items-center justify-between relative py-8">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />
          {timelineEvents.map((event, index) => (
            <div key={event.phase} className="group relative flex-1 flex justify-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full transition-all group-hover:scale-125"></div>
              <div className="absolute text-center transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 -top-2 bg-secondary px-2 py-1 rounded-md text-xs w-48">
                <p className="font-bold">{event.details}</p>
                <p className="text-muted-foreground">Lead: {event.lead}</p>
              </div>
              <div className={`text-center absolute ${index % 2 === 0 ? 'bottom-6' : 'top-6'}`}>
                <p className="font-bold text-sm">{event.phase}</p>
                <p className="text-xs text-muted-foreground">{event.year}</p>
              </div>
            </div>
          ))}
        </div>
      </BentoCardContent>
    </>
  );
}

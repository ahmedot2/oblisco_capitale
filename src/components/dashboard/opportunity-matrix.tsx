import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function OpportunityMatrix() {
  const projects = [
    { name: "Oblisco Capitale", impact: 90, risk: 25, current: true },
    { name: "Regional Project A", impact: 70, risk: 45, current: false },
    { name: "Regional Project B", impact: 50, risk: 60, current: false },
    { name: "Regional Project C", impact: 30, risk: 15, current: false },
  ];

  return (
    <div className={cn("group w-full h-full flex flex-col bg-white/5 p-4 rounded-lg border border-white/10 transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_0px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5")}>
      <BentoCardHeader className="p-0">
        <BentoCardTitle className="font-headline text-base">Opportunity Matrix</BentoCardTitle>
        <BentoCardDescription>Strategic Impact vs. Macro Risk</BentoCardDescription>
      </BentoCardHeader>
      <BentoCardContent className="flex-grow flex items-center justify-center p-0 mt-4">
        <div className="relative w-full aspect-square max-w-[250px]">
          {/* Axes */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full border-r border-dashed border-white/20"></div>
            <div className="w-1/2 h-full"></div>
          </div>
          <div className="absolute inset-0 flex flex-col">
            <div className="w-full h-1/2 border-b border-dashed border-white/20"></div>
            <div className="w-full h-1/2"></div>
          </div>

          {/* Labels */}
          <span className="absolute -top-2 left-0 text-xs text-muted-foreground">High Impact</span>
          <span className="absolute -bottom-2 left-0 text-xs text-muted-foreground">Low Impact</span>
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">Low Risk</span>
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">High Risk</span>

          {/* Quadrant Labels */}
          <span className="absolute top-2 left-2 text-xs text-green-400 font-bold">Target Zone</span>
          
          {/* Projects */}
          <TooltipProvider>
            {projects.map(p => (
              <Tooltip key={p.name}>
                <TooltipTrigger asChild>
                  <div
                    className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all"
                    style={{ bottom: `${p.impact}%`, left: `${p.risk}%` }}
                  >
                    <div className={p.current ? "w-3 h-3 rounded-full bg-primary ring-2 ring-primary/50" : "w-2.5 h-2.5 rounded-full bg-muted-foreground/50"}></div>
                    {p.current && <div className="absolute inset-0 rounded-full bg-primary animate-ping"></div>}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{p.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </BentoCardContent>
    </div>
  );
}

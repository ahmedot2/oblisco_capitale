import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ExecutionTimeline } from "@/components/dashboard/execution-timeline";
import { OpportunityMatrix } from "@/components/dashboard/opportunity-matrix";
import { PartnershipCard } from "@/components/dashboard/partnership-card";
import { RiskDashboard } from "@/components/dashboard/risk-dashboard";
import { RoiProjections } from "@/components/dashboard/roi-projections";
import { SecureActions } from "@/components/dashboard/secure-actions";
import { TowerModel } from "@/components/dashboard/tower-model";
import { BentoCard } from "@/components/ui/bento-card";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen w-full bg-background bg-grid-white/[0.05]">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <DashboardHeader />

          <div className="mt-12 space-y-12">
            <section aria-labelledby="vision-title">
              <h2 id="vision-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">Act I: The Vision</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <BentoCard className="lg:col-span-2 lg:row-span-2 min-h-[400px]">
                  <TowerModel />
                </BentoCard>
                <BentoCard className="lg:col-span-1 min-h-[200px]">
                  <PartnershipCard />
                </BentoCard>
                 <BentoCard className="lg:col-span-1 min-h-[200px]">
                  <OpportunityMatrix />
                </BentoCard>
              </div>
            </section>
            
            <section aria-labelledby="challenge-title">
              <h2 id="challenge-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">Act II: The Challenge</h2>
              <div className="grid grid-cols-1 gap-6">
                <BentoCard>
                  <RiskDashboard />
                </BentoCard>
              </div>
            </section>

            <section aria-labelledby="solution-title">
              <h2 id="solution-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">Act III: The Solution</h2>
               <div className="grid grid-cols-1 gap-6">
                <BentoCard>
                  <ExecutionTimeline />
                </BentoCard>
              </div>
            </section>
            
            <section aria-labelledby="return-title">
              <h2 id="return-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">Act IV: The Return</h2>
               <div className="grid grid-cols-1 gap-6">
                <BentoCard>
                  <RoiProjections />
                </BentoCard>
              </div>
            </section>
          </div>
        </main>
      </div>
      <SecureActions />
    </>
  );
}

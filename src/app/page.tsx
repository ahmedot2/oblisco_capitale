import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ExecutionTimeline } from "@/components/dashboard/execution-timeline";
import { OpportunityMatrix } from "@/components/dashboard/opportunity-matrix";
import { PartnershipCard } from "@/components/dashboard/partnership-card";
import { RiskDashboard } from "@/components/dashboard/risk-dashboard";
import { RoiProjections } from "@/components/dashboard/roi-projections";
import { SecureActions } from "@/components/dashboard/secure-actions";
import { StrategicShield } from "@/components/dashboard/strategic-shield";
import { TowerModel } from "@/components/dashboard/tower-model";
import { UnassailableProposition } from "@/components/dashboard/unassailable-proposition";
import { BentoCard, BentoCardContent, BentoCardHeader, BentoCardTitle } from "@/components/ui/bento-card";
import { Button } from "@/components/ui/button";
import { BriefingModal } from "@/components/modals/briefing-modal";
import { VaultModal } from "@/components/modals/vault-modal";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen w-full bg-background bg-grid-white/[0.05]">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <DashboardHeader />

          <div className="mt-12 space-y-20">
            <section aria-labelledby="strategic-imperative-title">
              <h2 id="strategic-imperative-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">I. The Strategic Imperative</h2>
              <BentoCard className="lg:col-span-3 min-h-[400px] p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                  <div className="lg:col-span-1 h-full flex flex-col">
                    <TowerModel />
                  </div>
                  <div className="lg:col-span-1 h-full flex flex-col">
                     <PartnershipCard />
                  </div>
                  <div className="lg:col-span-1 h-full flex flex-col">
                    <OpportunityMatrix />
                  </div>
                </div>
              </BentoCard>
            </section>
            
            <section aria-labelledby="macroeconomic-landscape-title">
              <h2 id="macroeconomic-landscape-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">II. The Macroeconomic Landscape</h2>
              <BentoCard>
                <RiskDashboard />
              </BentoCard>
            </section>

            <section aria-labelledby="strategic-shield-title">
              <h2 id="strategic-shield-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">III. The ARK-Diar Qatar Strategic Shield</h2>
               <BentoCard>
                <StrategicShield />
              </BentoCard>
              <div className="mt-6">
                <BentoCard>
                  <ExecutionTimeline />
                </BentoCard>
              </div>
            </section>
            
            <section aria-labelledby="financial-blueprint-title">
              <h2 id="financial-blueprint-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">IV. The Financial Blueprint & ROI</h2>
               <BentoCard>
                <RoiProjections />
              </BentoCard>
            </section>
            
            <section aria-labelledby="unassailable-proposition-title">
              <h2 id="unassailable-proposition-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">V. The Unassailable Proposition</h2>
              <UnassailableProposition />
            </section>

            <section aria-labelledby="call-to-action-title" className="text-center">
              <h2 id="call-to-action-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-4">VI. The Call to Action</h2>
              <p className="text-lg text-muted-foreground mb-8">Seizing the Future. A Definitive Opportunity for a Decisive Partner.</p>
              <div className="flex justify-center gap-4">
                <BriefingModal>
                  <Button size="lg">Request Executive Briefing</Button>
                </BriefingModal>
                <VaultModal>
                  <Button size="lg" variant="outline">Access Secure Data Vault</Button>
                </VaultModal>
              </div>
            </section>

          </div>
        </main>
      </div>
      <SecureActions />
    </>
  );
}

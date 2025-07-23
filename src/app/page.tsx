
'use client';

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ExecutionTimeline } from "@/components/dashboard/execution-timeline";
import { InvestmentThesis } from "@/components/dashboard/investment-thesis";
import { OpportunityMatrix } from "@/components/dashboard/opportunity-matrix";
import { PartnershipCard } from "@/components/dashboard/partnership-card";
import { RiskAndResilienceFramework } from "@/components/dashboard/risk-and-resilience-framework";
import { RoiProjections } from "@/components/dashboard/roi-projections";
import { SecureActions } from "@/components/dashboard/secure-actions";
import { TowerModel } from "@/components/dashboard/tower-model";
import { UnassailableProposition } from "@/components/dashboard/unassailable-proposition";
import { BentoCard, BentoCardContent, BentoCardHeader, BentoCardTitle } from "@/components/ui/bento-card";
import { Button } from "@/components/ui/button";
import { BriefingModal } from "@/components/modals/briefing-modal";
import { VaultModal } from "@/components/modals/vault-modal";
import { NationalStrategy } from "@/components/dashboard/national-strategy";
import { StrategicInquiries } from "@/components/dashboard/strategic-inquiries";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
        <video
            className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
            src="/background.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        <div className="absolute inset-0 w-full h-full bg-black/50"></div>
      </div>
      <div className="relative min-h-screen w-full">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <DashboardHeader />

          <motion.div 
            className="mt-12 space-y-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          >

            <section aria-labelledby="investment-thesis-title">
              <h2 id="investment-thesis-title" className="text-center text-lg font-semibold text-muted-foreground mb-6">The Investment Thesis</h2>
              <InvestmentThesis />
            </section>

            <section aria-labelledby="strategic-imperative-title">
              <h2 id="strategic-imperative-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">I. The Strategic Imperative</h2>
               <BentoCard className="lg:col-span-3 min-h-[400px] p-6">
                <BentoCardHeader className="p-0 mb-6 text-center">
                  <BentoCardTitle className="font-headline text-2xl">A Generational Asset Secured by an Unrivaled Partnership</BentoCardTitle>
                </BentoCardHeader>
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
            
            <section aria-labelledby="risk-resilience-framework-title">
              <h2 id="risk-resilience-framework-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-4">II. The Risk & Resilience Framework</h2>
              <p className="text-lg text-muted-foreground mb-6">A proactive methodology for transforming systemic risk into strategic advantage.</p>
              <RiskAndResilienceFramework />
            </section>

            <section aria-labelledby="de-risked-execution-roadmap-title">
              <h2 id="de-risked-execution-roadmap-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">III. A De-Risked Execution Roadmap</h2>
              <BentoCard>
                <ExecutionTimeline />
              </BentoCard>
            </section>
            
            <section aria-labelledby="financial-blueprint-title">
              <h2 id="financial-blueprint-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">IV. The Sovereign Return Proposition</h2>
               <BentoCard>
                <RoiProjections />
              </BentoCard>
            </section>

            <section aria-labelledby="national-strategy-title">
              <h2 id="national-strategy-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">V. A Pillar of National Strategy</h2>
              <NationalStrategy />
            </section>

            <section aria-labelledby="strategic-inquiries-title">
              <h2 id="strategic-inquiries-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-4">VI. Strategic Inquiries</h2>
              <p className="text-lg text-muted-foreground mb-6">Anticipating the core questions of a decisive partner.</p>
              <StrategicInquiries />
            </section>
            
            <section aria-labelledby="unassailable-proposition-title">
              <h2 id="unassailable-proposition-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-6">VII. The Unassailable Proposition</h2>
              <UnassailableProposition />
            </section>

            <section aria-labelledby="call-to-action-title" className="text-center">
              <h2 id="call-to-action-title" className="text-3xl font-bold font-headline tracking-tight text-foreground mb-4">VIII. The Call to Action</h2>
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

          </motion.div>
        </main>
      </div>
      <SecureActions />
    </>
  );
}

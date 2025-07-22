
"use client"

import { Bar, BarChart, ResponsiveContainer, Cell, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { BentoCard, BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from "react"
import { useCountUp } from "@/hooks/use-count-up"
import { Crown, Shield, HardHat } from "lucide-react"

const CountUpMetric = ({ to, prefix, suffix, decimals }: { to: number; prefix?: string; suffix?: string, decimals?: number }) => {
  const { count, ref } = useCountUp(to, 1000, decimals);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const scenarioData = {
  conservative: {
    waterfall: [
      { name: 'QIA Sole Capital Mandate', value: -3.0, isStart: true },
      { name: 'Gross Revenue (5-Yr)', value: 7.2 },
      { name: 'Operating Costs', value: -2.4 },
      { name: 'Debt Servicing', value: -1.2 },
      { name: 'Asset Appreciation', value: 1.8 },
      { name: 'Net Profit & Return', isTotal: true },
    ],
    metrics: {
      irr: 15.5,
      moic: 2.5,
    }
  },
  base: {
    waterfall: [
      { name: 'QIA Sole Capital Mandate', value: -3.0, isStart: true },
      { name: 'Gross Revenue (5-Yr)', value: 9.0 },
      { name: 'Operating Costs', value: -2.7 },
      { name: 'Debt Servicing', value: -1.5 },
      { name: 'Asset Appreciation', value: 2.4 },
      { name: 'Net Profit & Return', isTotal: true },
    ],
    metrics: {
      irr: 18.2,
      moic: 2.8,
    }
  },
  aggressive: {
    waterfall: [
      { name: 'QIA Sole Capital Mandate', value: -3.0, isStart: true },
      { name: 'Gross Revenue (5-Yr)', value: 12.0 },
      { name: 'Operating Costs', value: -3.0 },
      { name: 'Debt Servicing', value: -1.8 },
      { name: 'Asset Appreciation', value: 3.6 },
      { name: 'Net Profit & Return', isTotal: true },
    ],
    metrics: {
      irr: 22.5,
      moic: 3.6,
    }
  },
};

const processWaterfallData = (data: any[]) => {
  let cumulative = 0;
  return data.map(item => {
    if (item.isStart) {
      cumulative = Math.abs(item.value);
      return { ...item, range: [0, cumulative], value: cumulative };
    }
    if (item.isTotal) {
      const totalValue = cumulative;
      return { ...item, range: [0, totalValue], value: totalValue };
    }
    const start = item.value >= 0 ? cumulative : cumulative + item.value;
    const end = start + Math.abs(item.value);
    cumulative += item.value;
    return { ...item, range: [start, end] };
  });
};

const WaterfallTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const value = item.isStart ? `-$${Math.abs(item.value).toFixed(1)}B` : item.isTotal ? `$${item.value.toFixed(1)}B` : item.value > 0 ? `+$${item.value.toFixed(1)}B` : `-$${Math.abs(item.value).toFixed(1)}B`;
    return (
      <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded-lg text-sm">
        <p className="font-bold">{`${label}`}</p>
        <p className="intro" style={{color: payload[0].fill}}>{`Value: ${value}`}</p>
      </div>
    );
  }
  return null;
};

const controlBenefits = [
    {
      title: "Commanding Equity & Control",
      icon: <Crown className="w-8 h-8 text-primary" />,
      text: "A ~40% equity stake in the entire CBD, including the Oblisco Tower. Provides QIA with board representation and key decision-making rights on the project's future."
    },
    {
      title: "Priority Profit Repatriation",
      icon: <Shield className="w-8 h-8 text-primary" />,
      text: "Ironclad, treaty-level agreements ensuring QIA's capital and profits have first-priority access to repatriation in hard currency, guaranteed by the Egyptian sovereign."
    },
    {
      title: "The Diar Qatar Value-Add",
      icon: <HardHat className="w-8 h-8 text-primary" />,
      text: "Direct management and construction oversight by Diar Qatar ensures the asset is built to Qatar's world-class standards, maximizing its long-term value and operational excellence."
    }
]

export function RoiProjections() {
  const [scenario, setScenario] = useState<"conservative" | "base" | "aggressive">("base");

  const renderContent = (currentScenario: "conservative" | "base" | "aggressive") => {
    const { waterfall } = scenarioData[currentScenario];
    const processedWaterfall = processWaterfallData(waterfall);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[450px]">
        <div className="lg:col-span-1 flex flex-col">
          <h3 className="text-center mb-2 font-semibold">Projected Financial Bridge (Full Mandate, $B)</h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={processedWaterfall} 
                margin={{ top: 5, right: 20, left: 20, bottom: 40 }}
                barGap={-1}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="name" angle={-30} textAnchor="end" height={80} interval={0} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} unit="B" />
                <Tooltip content={<WaterfallTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
                <Bar dataKey="range" isAnimationActive={true}>
                  {processedWaterfall.map((entry, index) => {
                    let color = 'transparent';
                    if(entry.isStart || entry.isTotal) {
                      color = 'hsl(var(--primary))'; // Blue for start/end
                    } else if(entry.value > 0) {
                      color = 'hsl(var(--chart-2))'; // Teal for positive
                    } else {
                      color = 'hsl(var(--destructive))'; // Red for negative
                    }
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col justify-center p-4">
            <h3 className="mb-4 font-semibold text-center">The Structure of Control & Benefits</h3>
            <div className="space-y-4">
                {controlBenefits.map(item => (
                    <BentoCard key={item.title} className="p-4 flex items-start gap-4 bg-white/5 border-white/10 !shadow-none hover:-translate-y-0.5">
                        <div className="text-primary mt-1">{item.icon}</div>
                        <div>
                            <h4 className="font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.text}</p>
                        </div>
                    </BentoCard>
                ))}
            </div>
        </div>
      </div>
    );
  }


  return (
    <>
      <BentoCardHeader>
        <BentoCardTitle className="font-headline">The Sovereign Return Proposition</BentoCardTitle>
        <BentoCardDescription>Interactive financial model projecting returns under the full mandate.</BentoCardDescription>
      </BentoCardHeader>
      <BentoCardContent>
        <Tabs 
          defaultValue="base" 
          className="w-full"
          onValueChange={(value) => setScenario(value as "conservative" | "base" | "aggressive")}
        >
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="conservative">Conservative</TabsTrigger>
              <TabsTrigger value="base">Base Case</TabsTrigger>
              <TabsTrigger value="aggressive">Aggressive</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="conservative" className="w-full h-full m-0">
            {renderContent("conservative")}
          </TabsContent>
          <TabsContent value="base" className="w-full h-full m-0">
            {renderContent("base")}
          </TabsContent>
          <TabsContent value="aggressive" className="w-full h-full m-0">
            {renderContent("aggressive")}
          </TabsContent>
        </Tabs>
      </BentoCardContent>
    </>
  )
}

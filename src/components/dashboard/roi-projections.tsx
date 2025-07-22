"use client"

import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const waterfallDataConservative = [
  { name: 'Initial Investment', value: -1000 },
  { name: 'Phase 1 Revenue', value: 300 },
  { name: 'Phase 2 Revenue', value: 400 },
  { name: 'Phase 3 Revenue', value: 500 },
  { name: 'Operating Costs', value: -150 },
  { name: 'Final Return', isTotal: true },
]

const waterfallDataBase = [
  { name: 'Initial Investment', value: -1000 },
  { name: 'Phase 1 Revenue', value: 400 },
  { name: 'Phase 2 Revenue', value: 550 },
  { name: 'Phase 3 Revenue', value: 650 },
  { name: 'Operating Costs', value: -180 },
  { name: 'Final Return', isTotal: true },
]

const waterfallDataAggressive = [
  { name: 'Initial Investment', value: -1000 },
  { name: 'Phase 1 Revenue', value: 500 },
  { name: 'Phase 2 Revenue', value: 700 },
  { name: 'Phase 3 Revenue', value: 900 },
  { name: 'Operating Costs', value: -220 },
  { name: 'Final Return', isTotal: true },
]

const processWaterfallData = (data: any[]) => {
  let cumulative = 0;
  return data.map(item => {
    if (item.isTotal) {
      return { ...item, value: cumulative, stack: [0, cumulative] };
    }
    const start = item.value > 0 ? cumulative : cumulative + item.value;
    const end = Math.abs(item.value);
    cumulative += item.value;
    return { ...item, stack: [start, end] };
  });
}

const revenueMixScenarios = {
  conservative: [
    { name: 'Residential Sales', value: 40, fill: "hsl(var(--chart-1))" },
    { name: 'Commercial Lease', value: 35, fill: "hsl(var(--chart-2))" },
    { name: 'Hospitality', value: 15, fill: "hsl(var(--chart-3))" },
    { name: 'Retail & F&B', value: 10, fill: "hsl(var(--chart-4))" },
  ],
  base: [
    { name: 'Residential Sales', value: 45, fill: "hsl(var(--chart-1))" },
    { name: 'Commercial Lease', value: 30, fill: "hsl(var(--chart-2))" },
    { name: 'Hospitality', value: 15, fill: "hsl(var(--chart-3))" },
    { name: 'Retail & F&B', value: 10, fill: "hsl(var(--chart-4))" },
  ],
  aggressive: [
    { name: 'Residential Sales', value: 50, fill: "hsl(var(--chart-1))" },
    { name: 'Commercial Lease', value: 25, fill: "hsl(var(--chart-2))" },
    { name: 'Hospitality', value: 18, fill: "hsl(var(--chart-3))" },
    { name: 'Retail & F&B', value: 7, fill: "hsl(var(--chart-4))" },
  ],
};


const WaterfallTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const value = item.isTotal ? item.value : item.value > 0 ? `+${item.value}M` : `${item.value}M`;
    return (
      <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded-lg text-sm">
        <p className="label font-bold">{`${label}`}</p>
        <p className="intro" style={{color: payload[0].fill}}>{`Value: ${value}`}</p>
      </div>
    );
  }

  return null;
};

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded-lg text-sm">
        <p className="font-bold" style={{ color: data.fill }}>
          {`${data.name}: ${data.value}%`}
        </p>
      </div>
    );
  }
  return null;
};


export function RoiProjections() {
  const [scenario, setScenario] = useState<"conservative" | "base" | "aggressive">("base");
  const revenueMixData = revenueMixScenarios[scenario];

  return (
    <>
      <BentoCardHeader>
        <BentoCardTitle className="font-headline">Investment Blueprint & ROI</BentoCardTitle>
        <BentoCardDescription>Projected returns across multiple strategic scenarios.</BentoCardDescription>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[300px]">
              <h3 className="text-center mb-2 font-semibold">Projected Net Return (Waterfall)</h3>
                <TabsContent value="conservative" className="w-full h-full m-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processWaterfallData(waterfallDataConservative)} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <Tooltip content={<WaterfallTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
                      <Bar dataKey="stack" stackId="a" isAnimationActive={true}>
                        {processWaterfallData(waterfallDataConservative).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} fillOpacity={entry.stack[0] === 0 && !entry.isTotal ? 1 : 0} />
                        ))}
                      </Bar>
                       <Bar dataKey="stack" stackId="a" isAnimationActive={true}>
                        {processWaterfallData(waterfallDataConservative).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="base" className="w-full h-full m-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={processWaterfallData(waterfallDataBase)} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <Tooltip content={<WaterfallTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
                      <Bar dataKey="stack" stackId="a" isAnimationActive={true}>
                        {processWaterfallData(waterfallDataBase).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} fillOpacity={entry.stack[0] === 0 && !entry.isTotal ? 1 : 0} />
                        ))}
                      </Bar>
                       <Bar dataKey="stack" stackId="a" isAnimationActive={true}>
                        {processWaterfallData(waterfallDataBase).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                 <TabsContent value="aggressive" className="w-full h-full m-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={processWaterfallData(waterfallDataAggressive)} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <Tooltip content={<WaterfallTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
                      <Bar dataKey="stack" stackId="a" isAnimationActive={true}>
                        {processWaterfallData(waterfallDataAggressive).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} fillOpacity={entry.stack[0] === 0 && !entry.isTotal ? 1 : 0} />
                        ))}
                      </Bar>
                       <Bar dataKey="stack" stackId="a" isAnimationActive={true}>
                        {processWaterfallData(waterfallDataAggressive).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
            </div>
            <div className="h-[300px]">
              <h3 className="text-center mb-2 font-semibold">Revenue Mix</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Tooltip content={<PieTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
                  <Pie data={revenueMixData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} isAnimationActive={true}>
                    {revenueMixData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Tabs>
      </BentoCardContent>
    </>
  )
}

"use client"

import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

const revenueMixData = [
  { name: 'Residential Sales', value: 45, fill: "hsl(var(--chart-1))" },
  { name: 'Commercial Lease', value: 30, fill: "hsl(var(--chart-2))" },
  { name: 'Hospitality', value: 15, fill: "hsl(var(--chart-3))" },
  { name: 'Retail & F&B', value: 10, fill: "hsl(var(--chart-4))" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const value = item.isTotal ? item.value : item.value > 0 ? `+${item.value}M` : `${item.value}M`;
    return (
      <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded-lg text-sm">
        <p className="label font-bold">{`${label}`}</p>
        <p className="intro" style={{color: payload[0].color}}>{`Value: ${value}`}</p>
      </div>
    );
  }

  return null;
};

export function RoiProjections() {
  return (
    <>
      <BentoCardHeader>
        <BentoCardTitle className="font-headline">Investment Blueprint & ROI</BentoCardTitle>
        <BentoCardDescription>Projected returns across multiple strategic scenarios.</BentoCardDescription>
      </BentoCardHeader>
      <BentoCardContent>
        <Tabs defaultValue="base" className="w-full">
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
              <ResponsiveContainer width="100%" height="100%">
                <TabsContent value="conservative" className="w-full h-full">
                  <BarChart data={processWaterfallData(waterfallDataConservative)}>
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
                    <Bar dataKey="stack" stackId="a">
                      {processWaterfallData(waterfallDataConservative).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} fillOpacity={entry.stack[0] === 0 && !entry.isTotal ? 1 : 0} />
                      ))}
                    </Bar>
                     <Bar dataKey="stack" stackId="a">
                      {processWaterfallData(waterfallDataConservative).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} />
                      ))}
                    </Bar>
                  </BarChart>
                </TabsContent>
                <TabsContent value="base" className="w-full h-full">
                   <BarChart data={processWaterfallData(waterfallDataBase)}>
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
                    <Bar dataKey="stack" stackId="a">
                      {processWaterfallData(waterfallDataBase).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} fillOpacity={entry.stack[0] === 0 && !entry.isTotal ? 1 : 0} />
                      ))}
                    </Bar>
                     <Bar dataKey="stack" stackId="a">
                      {processWaterfallData(waterfallDataBase).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} />
                      ))}
                    </Bar>
                  </BarChart>
                </TabsContent>
                 <TabsContent value="aggressive" className="w-full h-full">
                   <BarChart data={processWaterfallData(waterfallDataAggressive)}>
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
                    <Bar dataKey="stack" stackId="a">
                      {processWaterfallData(waterfallDataAggressive).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} fillOpacity={entry.stack[0] === 0 && !entry.isTotal ? 1 : 0} />
                      ))}
                    </Bar>
                     <Bar dataKey="stack" stackId="a">
                      {processWaterfallData(waterfallDataAggressive).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} />
                      ))}
                    </Bar>
                  </BarChart>
                </TabsContent>
              </ResponsiveContainer>
            </div>
            <div className="h-[300px]">
              <h3 className="text-center mb-2 font-semibold">Revenue Mix</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Tooltip cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
                  <Pie data={revenueMixData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} >
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

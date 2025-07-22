
"use client"

import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Cell, Tooltip, LabelList } from "recharts"
import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from "react"
import { useCountUp } from "@/hooks/use-count-up"

const CountUpMetric = ({ to, prefix, suffix, decimals }: { to: number; prefix?: string; suffix?: string, decimals?: number }) => {
  const { count, ref } = useCountUp(to, 1000, decimals);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const scenarioData = {
  conservative: {
    waterfall: [
      { name: 'QIA Capital Injection', value: -1000 },
      { name: 'Gross Revenue (5-Yr)', value: 1500 },
      { name: 'Operating Costs', value: -200 },
      { name: 'Debt Servicing', value: -100 },
      { name: 'Asset Appreciation', value: 400 },
      { name: 'Net Profit & Return', isTotal: true },
    ],
    revenueMix: [
      { name: 'Commercial Leases', value: 35, dollarValue: 525, fill: "hsl(var(--chart-1))" },
      { name: 'Luxury Residences', value: 25, dollarValue: 375, fill: "hsl(var(--chart-2))" },
      { name: 'Hospitality', value: 20, dollarValue: 300, fill: "hsl(var(--chart-3))" },
      { name: 'Tourism & Retail', value: 20, dollarValue: 300, fill: "hsl(var(--chart-4))" },
    ],
    metrics: {
      irr: 18,
      moic: 2.8,
      payback: 8,
      occupancy: 80,
    }
  },
  base: {
    waterfall: [
      { name: 'QIA Capital Injection', value: -1000 },
      { name: 'Gross Revenue (5-Yr)', value: 2000 },
      { name: 'Operating Costs', value: -250 },
      { name: 'Debt Servicing', value: -150 },
      { name: 'Asset Appreciation', value: 500 },
      { name: 'Net Profit & Return', isTotal: true },
    ],
    revenueMix: [
      { name: 'Commercial Leases', value: 40, dollarValue: 800, fill: "hsl(var(--chart-1))" },
      { name: 'Luxury Residences', value: 30, dollarValue: 600, fill: "hsl(var(--chart-2))" },
      { name: 'Hospitality', value: 15, dollarValue: 300, fill: "hsl(var(--chart-3))" },
      { name: 'Tourism & Retail', value: 15, dollarValue: 300, fill: "hsl(var(--chart-4))" },
    ],
    metrics: {
      irr: 22,
      moic: 3.5,
      payback: 6.5,
      occupancy: 88,
    }
  },
  aggressive: {
    waterfall: [
      { name: 'QIA Capital Injection', value: -1000 },
      { name: 'Gross Revenue (5-Yr)', value: 2500 },
      { name: 'Operating Costs', value: -300 },
      { name: 'Debt Servicing', value: -200 },
      { name: 'Asset Appreciation', value: 700 },
      { name: 'Net Profit & Return', isTotal: true },
    ],
    revenueMix: [
      { name: 'Commercial Leases', value: 45, dollarValue: 1125, fill: "hsl(var(--chart-1))" },
      { name: 'Luxury Residences', value: 35, dollarValue: 875, fill: "hsl(var(--chart-2))" },
      { name: 'Hospitality', value: 12, dollarValue: 300, fill: "hsl(var(--chart-3))" },
      { name: 'Tourism & Retail', value: 8, dollarValue: 200, fill: "hsl(var(--chart-4))" },
    ],
    metrics: {
      irr: 28,
      moic: 4.2,
      payback: 5,
      occupancy: 95,
    }
  },
};

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

const WaterfallTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const value = item.isTotal ? `${item.value}M` : item.value > 0 ? `+${item.value}M` : `${item.value}M`;
    return (
      <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded-lg text-sm">
        <p className="font-bold">{`${label}`}</p>
        <p className="intro" style={{color: payload[0].fill}}>{`Value: $${value}`}</p>
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
        <p className="text-muted-foreground">Projected Revenue: ${data.dollarValue}M</p>
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + (radius + 25) * Math.cos(-midAngle * RADIAN);
  const y = cy + (radius + 25) * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? 'start' : 'end';
  
  const lineStartX = cx + (outerRadius) * Math.cos(-midAngle * RADIAN);
  const lineStartY = cy + (outerRadius) * Math.sin(-midAngle * RADIAN);
  
  const lineEndX = x + (textAnchor === 'start' ? -5 : 5);

  return (
    <>
      <text x={x} y={y} fill="white" textAnchor={textAnchor} dominantBaseline="central" className="text-xs">
        {name} ({(percent * 100).toFixed(0)}%)
      </text>
      <path d={`M${lineStartX},${lineStartY}L${lineEndX},${y}`} stroke="hsl(var(--border))" fill="none" />
    </>
  );
};


export function RoiProjections() {
  const [scenario, setScenario] = useState<"conservative" | "base" | "aggressive">("base");
  const { waterfall, revenueMix, metrics } = scenarioData[scenario];

  const renderContent = (currentScenario: "conservative" | "base" | "aggressive") => {
    const { waterfall, revenueMix, metrics } = scenarioData[currentScenario];
    const processedWaterfall = processWaterfallData(waterfall);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-3 h-[300px] flex flex-col">
          <h3 className="text-center mb-2 font-semibold">Projected Net Return (Waterfall, $M)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedWaterfall} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <Tooltip content={<WaterfallTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
              <Bar dataKey="stack" stackId="a" isAnimationActive={true}>
                {processedWaterfall.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} fillOpacity={entry.stack[0] === 0 && !entry.isTotal ? 1 : 0} />
                ))}
              </Bar>
                <Bar dataKey="stack" stackId="a" isAnimationActive={true}>
                {processedWaterfall.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isTotal ? 'hsl(var(--primary))' : entry.value > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 h-[300px] flex flex-col justify-center items-center p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="mb-4 font-semibold text-center">Key Financial Metrics</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
            <div className="text-center">
              <p className="text-2xl font-bold"><CountUpMetric to={metrics.irr} suffix="%" decimals={1} /></p>
              <p className="text-xs text-muted-foreground">Target IRR (USD)</p>
            </div>
             <div className="text-center">
              <p className="text-2xl font-bold"><CountUpMetric to={metrics.moic} suffix="x" decimals={1} /></p>
              <p className="text-xs text-muted-foreground">Target MOIC</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold"><CountUpMetric to={metrics.payback} prefix="&lt; " suffix=" Yrs" decimals={1} /></p>
              <p className="text-xs text-muted-foreground">Payback Period</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold"><CountUpMetric to={metrics.occupancy} prefix="&gt;" suffix="%" /></p>
              <p className="text-xs text-muted-foreground">Stabilized Occupancy</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 h-[300px] flex flex-col">
          <h3 className="text-center mb-2 font-semibold">Revenue Mix</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 60, bottom: 20, left: 60 }}>
              <Tooltip content={<PieTooltip />} cursor={{fill: 'hsla(var(--primary) / 0.1)'}}/>
              <Pie data={revenueMix} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} isAnimationActive={true} label={renderCustomizedLabel} labelLine={false}>
                {revenueMix.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} className="transition-all duration-300 ease-in-out hover:opacity-80" />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }


  return (
    <>
      <BentoCardHeader>
        <BentoCardTitle className="font-headline">The Financial Engine</BentoCardTitle>
        <BentoCardDescription>Interactive financial model projecting returns and revenue streams.</BentoCardDescription>
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

    
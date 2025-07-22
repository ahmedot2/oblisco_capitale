

"use client"

import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Cell, Tooltip, LabelList, XAxis, YAxis, CartesianGrid } from "recharts"
import { BentoCardContent, BentoCardDescription, BentoCardHeader, BentoCardTitle } from "../ui/bento-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from "react"
import { useCountUp } from "@/hooks/use-count-up"
import { cn } from "@/lib/utils"

const CountUpMetric = ({ to, prefix, suffix, decimals }: { to: number; prefix?: string; suffix?: string, decimals?: number }) => {
  const { count, ref } = useCountUp(to, 1000, decimals);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const scenarioData = {
  conservative: {
    waterfall: [
      { name: 'QIA Capital Injection', value: -500, isStart: true },
      { name: 'Gross Revenue (5-Yr)', value: 1200 },
      { name: 'Operating Costs', value: -400 },
      { name: 'Debt Servicing', value: -200 },
      { name: 'Asset Appreciation', value: 300 },
      { name: 'Net Profit & Return', isTotal: true },
    ],
    revenueMix: [
      { name: 'Commercial Leases', value: 35, dollarValue: 420, fill: "hsl(var(--chart-1))" },
      { name: 'Luxury Residences', value: 25, dollarValue: 300, fill: "hsl(var(--chart-2))" },
      { name: 'Hospitality', value: 20, dollarValue: 240, fill: "hsl(var(--chart-3))" },
      { name: 'Tourism & Retail', value: 20, dollarValue: 240, fill: "hsl(var(--chart-4))" },
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
      { name: 'QIA Capital Injection', value: -500, isStart: true },
      { name: 'Gross Revenue (5-Yr)', value: 1500 },
      { name: 'Operating Costs', value: -450 },
      { name: 'Debt Servicing', value: -250 },
      { name: 'Asset Appreciation', value: 400 },
      { name: 'Net Profit & Return', isTotal: true },
    ],
    revenueMix: [
      { name: 'Commercial Leases', value: 40, dollarValue: 600, fill: "hsl(var(--chart-1))" },
      { name: 'Luxury Residences', value: 30, dollarValue: 450, fill: "hsl(var(--chart-2))" },
      { name: 'Hospitality', value: 15, dollarValue: 225, fill: "hsl(var(--chart-3))" },
      { name: 'Tourism & Retail', value: 15, dollarValue: 225, fill: "hsl(var(--chart-4))" },
    ],
    metrics: {
      irr: 22,
      moic: 3.4,
      payback: 6.5,
      occupancy: 88,
    }
  },
  aggressive: {
    waterfall: [
      { name: 'QIA Capital Injection', value: -500, isStart: true },
      { name: 'Gross Revenue (5-Yr)', value: 2000 },
      { name: 'Operating Costs', value: -500 },
      { name: 'Debt Servicing', value: -300 },
      { name: 'Asset Appreciation', value: 600 },
      { name: 'Net Profit & Return', isTotal: true },
    ],
    revenueMix: [
      { name: 'Commercial Leases', value: 45, dollarValue: 900, fill: "hsl(var(--chart-1))" },
      { name: 'Luxury Residences', value: 35, dollarValue: 700, fill: "hsl(var(--chart-2))" },
      { name: 'Hospitality', value: 12, dollarValue: 240, fill: "hsl(var(--chart-3))" },
      { name: 'Tourism & Retail', value: 8, dollarValue: 160, fill: "hsl(var(--chart-4))" },
    ],
    metrics: {
      irr: 28,
      moic: 4.6,
      payback: 5,
      occupancy: 95,
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
    const value = item.isStart ? `-$${Math.abs(item.value)}M` : item.isTotal ? `$${item.value}M` : item.value > 0 ? `+$${item.value}M` : `-$${Math.abs(item.value)}M`;
    return (
      <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded-lg text-sm">
        <p className="font-bold">{`${label}`}</p>
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
      <text x={x} y={y} fill="hsl(var(--foreground))" textAnchor={textAnchor} dominantBaseline="central" className="text-xs" >
        {name} ({(percent * 100).toFixed(0)}%)
      </text>
      <path d={`M${lineStartX},${lineStartY}L${lineEndX},${y}`} stroke="hsl(var(--border))" fill="none" />
    </>
  );
};


export function RoiProjections() {
  const [scenario, setScenario] = useState<"conservative" | "base" | "aggressive">("base");

  const renderContent = (currentScenario: "conservative" | "base" | "aggressive") => {
    const { waterfall, revenueMix, metrics } = scenarioData[currentScenario];
    const processedWaterfall = processWaterfallData(waterfall);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-3 h-[300px] flex flex-col">
          <h3 className="text-center mb-2 font-semibold">Projected Financial Bridge (Base Case, $M)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={processedWaterfall} 
              margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
              barGap={-1}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} unit="M" />
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
              <p className="text-2xl font-bold"><CountUpMetric to={metrics.payback} prefix="< " suffix=" Yrs" decimals={1} /></p>
              <p className="text-xs text-muted-foreground">Payback Period</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold"><CountUpMetric to={metrics.occupancy} prefix=">" suffix="%" /></p>
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

    

    

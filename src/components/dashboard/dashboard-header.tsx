'use client';

import { Pyramid } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardHeader() {
  return (
    <motion.header 
      className="text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
    >
      <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
        <Pyramid className="w-5 h-5" />
        <span>QIA Strategic Gateway</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
        Oblisco Capitale
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        An exclusive briefing on a landmark investment opportunity in the New Administrative Capital of Egypt.
      </p>
    </motion.header>
  );
}

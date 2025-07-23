'use client';

import { Pyramid } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardHeader() {
  return (
    <header className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
      >
        <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Pyramid className="w-5 h-5" />
          <span>QIA Strategic Gateway</span>
        </div>
      </motion.div>
      <motion.h1 
        className="text-8xl md:text-[10rem] font-extrabold font-headline tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      >
        Oblisco Capitale
      </motion.h1>
      <motion.p 
        className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      >
        An exclusive briefing on a landmark investment opportunity in the New Administrative Capital of Egypt.
      </motion.p>
    </header>
  );
}

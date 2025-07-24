// src/components/dashboard/dashboard-header.tsx
'use client';

import { Pyramid } from "lucide-react";
import { motion } from "framer-motion";
import { DecryptedText } from "../ui/decrypted-text";

export function DashboardHeader() {
  return (
    <header className="text-center py-64">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
      >
        <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Pyramid className="w-5 h-5" />
          <span>QIA Strategic Gateway</span>
        </div>
      </motion.div>
      <motion.h1 
        className="text-6xl md:text-9xl font-extrabold font-headline tracking-tighter uppercase text-transparent bg-clip-text bg-[linear-gradient(120deg,rgba(255,255,255,0)_40%,rgba(255,255,255,0.8)_50%,rgba(255,255,255,0)_60%)] bg-[200%_100%] animate-shine"
        style={{ color: '#b5b5b5a4' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      >
        Oblisco Capitale
      </motion.h1>
      <motion.div 
        className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
      >
        <DecryptedText 
          text="An exclusive briefing on a landmark investment opportunity in the New Administrative Capital of Egypt." 
          animateOn="view"
          speed={10}
          characters="abcdefghijklmnopqrstuvwxyz"
        />
      </motion.div>
      <motion.div
        className="mt-6 text-primary font-medium"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 2.2 }}
      >
        <p>Presented by:</p>
        <p>His Excellency Sheikh Jabr bin Jasim bin Thani Al Thani</p>
      </motion.div>
    </header>
  );
}

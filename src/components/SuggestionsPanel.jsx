import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, AlertCircle } from 'lucide-react';
import { generateInsight } from '../shared/generateInsight';

export const SuggestionsPanel = ({ data }) => {
  const insight = generateInsight(data);

  return (
    <div className="glass-card p-6 rounded-2xl h-full border-t-2 border-t-emerald-500/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-emerald-500/20">
          <Zap className="w-5 h-5 text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold">AI Insight Engine</h2>
      </div>

      <div className="space-y-6">
        <motion.div
          key={insight}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-16 h-16 text-emerald-400" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-emerald-400 mb-3 font-black text-[10px] tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Intelligence Output
            </div>
            <p className="text-xl font-medium text-white leading-relaxed drop-shadow-sm">
              {insight}
            </p>
          </div>
        </motion.div>

        <div className="p-4 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-3">
          <AlertCircle size={14} className="text-emerald-500" />
          <p className="text-[10px] text-slate-400 font-medium italic">
            Self-healing metropolis protocols are currently executing in active zones.
          </p>
        </div>
      </div>
    </div>
  );
};

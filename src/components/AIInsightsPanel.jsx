import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

export const AIInsightsPanel = ({ insights = [] }) => {
  return (
    <div className="glass-card p-6 rounded-2xl h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <Brain className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="text-xl font-bold">AI Insights</h2>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {insights.map((insight, idx) => (
            <motion.div
              key={insight}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
            >
              <Sparkles className="w-4 h-4 text-purple-400 mt-1 shrink-0 group-hover:animate-pulse" />
              <p className="text-slate-300 text-sm leading-relaxed">{insight}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
          Neural Processor Active
        </div>
      </div>
    </div>
  );
};

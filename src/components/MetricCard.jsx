import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const MetricCard = ({ title, value, status, icon: Icon, color, trend }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const getGlowClass = (color) => {
    switch (color) {
      case 'green': return 'shadow-[0_0_15px_rgba(16,185,129,0.3)] border-emerald-500/50';
      case 'red': return 'shadow-[0_0_15px_rgba(239,68,68,0.3)] border-rose-500/50';
      case 'blue': return 'shadow-[0_0_15px_rgba(59,130,246,0.3)] border-blue-500/50';
      case 'emerald': return 'shadow-[0_0_15px_rgba(16,185,129,0.3)] border-emerald-500/50';
      case 'yellow': return 'shadow-[0_0_15px_rgba(234,179,8,0.3)] border-yellow-500/50';
      default: return 'shadow-[0_0_15px_rgba(59,130,246,0.3)] border-blue-500/50';
    }
  };

  const getTextColor = (color) => {
    switch (color) {
      case 'green': return 'text-emerald-400';
      case 'red': return 'text-rose-400';
      case 'blue': return 'text-blue-400';
      case 'emerald': return 'text-emerald-400';
      case 'yellow': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "glass-card p-6 rounded-2xl transition-all duration-500 border border-white/5",
        getGlowClass(color)
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn("p-3 rounded-xl bg-slate-900/80 border border-white/5", getTextColor(color))}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-slate-900/80 border border-white/5", getTextColor(color))}>
          {status}
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</h3>
        <div className="flex items-baseline gap-2">
          <AnimatePresence mode="wait">
            <motion.span 
              key={displayValue}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-4xl font-black tracking-tighter text-white"
            >
              {displayValue}
            </motion.span>
          </AnimatePresence>
          {trend && <span className="text-[10px] text-slate-600 font-bold font-mono tracking-tighter uppercase">{trend}</span>}
        </div>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle2, Clock } from 'lucide-react';

export const AlertsPanel = ({ alerts = [], showFullHistory = false }) => {
  const getAlertStyles = (type, message = "") => {
    const isCritical = message.toLowerCase().includes("accident");
    if (isCritical) return {
      icon: AlertTriangle,
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
      text: 'text-rose-400',
      animate: 'animate-pulse'
    };

    switch (type) {
      case 'red': return {
        icon: AlertTriangle,
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/20',
        text: 'text-rose-400'
      };
      case 'yellow': return {
        icon: AlertTriangle,
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        text: 'text-amber-400'
      };
      default: return {
        icon: Info,
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        text: 'text-blue-400'
      };
    }
  };

  return (
    <div className={`glass-card p-6 rounded-2xl ${showFullHistory ? 'h-full' : 'max-h-[500px] border-t-2 border-t-rose-500/30'}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/20">
            <AlertTriangle className={`w-5 h-5 ${alerts.some(a => a.message?.toLowerCase().includes("accident")) ? 'text-rose-400 animate-bounce' : 'text-rose-400'}`} />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-tight">Active Incident Feed</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Monitoring</span>
        </div>
      </div>

      <div className={`space-y-4 custom-scrollbar ${showFullHistory ? '' : 'max-h-[400px] overflow-y-auto pr-2'}`}>
        <AnimatePresence mode="popLayout">
          {alerts.map((alert) => {
            const styles = getAlertStyles(alert.type, alert.message);
            const Icon = styles.icon;
            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-5 rounded-2xl border ${styles.bg} ${styles.border} ${styles.animate || ''} group transition-all duration-300 hover:brightness-125`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl bg-slate-900 shadow-inner ${styles.text}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-black text-xs uppercase tracking-widest ${styles.text}`}>{alert.title || "Intelligence Alert"}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {alert.time || "JUST NOW"}
                      </div>
                    </div>
                    <p className="text-white text-sm font-medium leading-relaxed">{alert.message}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {alerts.length === 0 && (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-dashed border-white/10">
            <p className="text-slate-500 text-sm font-medium italic">All sectors currently signal green status.</p>
          </div>
        )}
      </div>
    </div>
  );
};

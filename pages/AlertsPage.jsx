import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AlertsPanel } from '../components/AlertsPanel';
import { Bell, Filter, Download } from 'lucide-react';

export const AlertsPage = () => {
  const { data } = useOutletContext();
  const rawAlert = data?.alert || "";
  
  const alerts = rawAlert ? [{
    id: Date.now(),
    title: rawAlert.toLowerCase().includes("accident") ? "Critical Incident" : "System Update",
    message: rawAlert,
    time: "LIVE",
    type: rawAlert.toLowerCase().includes("accident") ? "red" : "blue"
  }] : [];

  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-rose-400 mb-2">
                <Bell size={24} className="animate-bounce" />
                <h4 className="text-xs font-black uppercase tracking-[0.3em]">Critical Streams</h4>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Active Incident Feed</h2>
            <p className="text-slate-500 font-medium">Monitoring all autonomous sensor networks and AI detection nodes.</p>
          </div>

          <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 text-sm font-bold hover:bg-white/10 transition-colors">
                  <Filter size={16} />
                  Filter Stream
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                  <Download size={16} />
                  Log History
              </button>
          </div>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden min-h-[600px]">
           <AlertsPanel alerts={alerts} showFullHistory={true} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Alerts/Hour</p>
                <h4 className="text-2xl font-black text-white">42.8</h4>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Avg Resolution</p>
                <h4 className="text-2xl font-black text-emerald-400">14.2 min</h4>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">AI False Positives</p>
                <h4 className="text-2xl font-black text-blue-400">0.04%</h4>
            </div>
        </div>
      </div>
    </div>
  );
};

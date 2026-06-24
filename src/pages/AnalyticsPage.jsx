import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { BarChart3, TrendingUp, Activity, Users, Server } from 'lucide-react';

const StatCard = ({ label, value, trend, icon: Icon, color }) => (
  <div className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-${color}-400`}>
      <Icon size={80} />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-400`}>
          <Icon size={20} />
        </div>
        <span className="text-sm font-bold text-slate-400 tracking-wider uppercase">{label}</span>
      </div>
      <div className="flex items-end gap-3">
        <h3 className="text-3xl font-black text-white">{value}</h3>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md mb-1">{trend}</span>
      </div>
    </div>
  </div>
);

const ProgressBar = ({ label, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
      <span className="text-slate-400">{label}</span>
      <span className={`text-${color}-400`}>{percentage}%</span>
    </div>
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
      <div 
        className={`h-full bg-${color}-500 shadow-[0_0_10px_rgba(var(--tw-color-${color}-500),0.5)] transition-all duration-1000`} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export const AnalyticsPage = () => {
  const { data } = useOutletContext();
  const trafficValue = data?.traffic || 0;
  const healthValue = 98; // Fallback mock value since it's not in the API yet

  return (
    <div className="p-8 space-y-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">System Analytics</h2>
          <p className="text-slate-500 font-medium">Predictive modeling and historical traffic trends.</p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Network Load" value="4.2 TB/s" trend="+12%" icon={Activity} color="blue" />
          <StatCard label="Active Users" value="842.1k" trend="+5.4%" icon={Users} color="cyan" />
          <StatCard label="Node Efficiency" value="94.2%" trend="+2.1%" icon={Server} color="emerald" />
          <StatCard label="Forecast Accuracy" value="89.1%" trend="+0.8%" icon={TrendingUp} color="purple" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-3xl space-y-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="text-blue-400" />
              Resource Utilization
            </h3>
            
            <div className="space-y-6">
              <ProgressBar label="CPU Optimization" percentage={healthValue} color="blue" />
              <ProgressBar label="Memory Allocation" percentage={78} color="cyan" />
              <ProgressBar label="Network Throughput" percentage={trafficValue} color="blue" />
              <ProgressBar label="Storage Integrity" percentage={99} color="emerald" />
              <ProgressBar label="AI Engine Load" percentage={65} color="purple" />
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
                <BarChart3 size={200} className="text-blue-400" />
            </div>
            <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-black text-white leading-tight">
                    Machine Learning <br />
                    <span className="text-blue-400 uppercase tracking-tighter text-4xl">Trend Prediction active</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                    UrbanMind's neural core is currently projecting a <span className="text-white font-bold">14% increase</span> in traffic density in the next 2 hours based on current weather trajectories and historical Friday evening patterns.
                </p>
                <div className="pt-4">
                    <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg">
                        Export Full Report (PDF)
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

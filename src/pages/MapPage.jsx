import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { UrbanMap } from '../components/UrbanMap';
import { Info } from 'lucide-react';

export const MapPage = () => {
  const { data, markers } = useOutletContext();

  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Real-Time City Mapping</h2>
          <p className="text-slate-500 text-sm">Visualizing sensory data and incident reports across the urban landscape.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            CRITICAL INCIDENTS
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            SYSTEM_UPTIME: 99.9%
          </div>
        </div>
      </div>

      <div className="flex-1 relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <UrbanMap markers={markers} apiData={data} />
        
        {/* Map Legend Overlay */}
        <div className="absolute bottom-10 left-10 glass-card p-4 rounded-xl space-y-3 z-10 border border-white/10">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Live Legend</h4>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-xs font-medium text-slate-300">Critical Incident</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            <span className="text-xs font-medium text-slate-300">Congestion / Traffic</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-xs font-medium text-slate-300">Normal Flow</span>
          </div>
        </div>

        {/* Info Panel Overlay */}
        <div className="absolute top-10 right-10 w-80 glass-card p-6 rounded-2xl z-10 border border-white/10">
          <div className="flex items-center gap-3 mb-4 text-blue-400">
            <Info size={20} />
            <h4 className="font-bold">Neural Mapping</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Integrating spatial data with real-time IoT sensor feeds. The mapping engine is currently processing <span className="text-blue-400 font-bold">14,209</span> active nodes.
          </p>
        </div>
      </div>
    </div>
  );
};

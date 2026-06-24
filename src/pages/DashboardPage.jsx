import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MetricCard } from '../components/MetricCard';
import { AlertsPanel } from '../components/AlertsPanel';
import { SuggestionsPanel } from '../components/SuggestionsPanel';
import { 
    Car, CloudRain, Zap, Activity, Clock, 
    Thermometer, Droplets, Wind, ShieldAlert, HeartPulse 
} from 'lucide-react';

const EnvironmentalScoreCard = ({ score }) => {
    const getColor = (s) => {
        if (s > 80) return 'text-emerald-400';
        if (s > 50) return 'text-yellow-400';
        return 'text-rose-400';
    };

    return (
        <div className="glass-card p-6 rounded-2xl border-t-2 border-t-blue-500/30 flex flex-col items-center justify-center text-center">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Eco Index Score</h4>
            <div className="relative w-24 h-24 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-slate-800" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                    <circle 
                        className={getColor(score)} 
                        strokeWidth="8" 
                        strokeDasharray={251.2} 
                        strokeDashoffset={251.2 - (251.2 * score) / 100} 
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="40" cx="50" cy="50" 
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-black ${getColor(score)}`}>{score}</span>
                </div>
            </div>
            <p className="text-xs text-slate-400 truncate w-full">Atmospheric Stability Rating</p>
        </div>
    );
};

export const DashboardPage = () => {
  const { data, lastUpdated } = useOutletContext();

  const metrics = useMemo(() => {
    const ecoScore = Math.max(0, 100 - ((data?.airQualityIndex || 0) / 2) - ((data?.traffic || 0) / 4));
    
    return {
        traffic: data?.traffic || 0,
        weather: data?.weather || 'Stable',
        temp: data?.temperature || 24,
        humidity: data?.humidity || 55,
        aqi: data?.airQualityIndex || 42,
        pollution: data?.pollutionLevel || 'Good',
        ecoScore: Math.round(ecoScore)
    };
  }, [data]);

  const alerts = useMemo(() => {
    return (data?.allAlerts || []).map((msg, i) => ({
        id: `${data.id}-${i}`,
        title: msg.includes("Heavy") ? "Traffic Warning" : "System Update",
        message: msg,
        time: "LIVE",
        type: msg.toLowerCase().includes("accident") || msg.toLowerCase().includes("high") ? "red" : "blue"
    }));
  }, [data]);

  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Real-time Header Info */}
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Urban Intelligence Hub Active</h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 uppercase tracking-tighter">
                <Clock size={10} className="text-blue-400" />
                Last Update: <span className="text-slate-300 ml-1">{lastUpdated || "N/A"}</span>
            </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard 
            title="Traffic" value={`${metrics.traffic}%`} status={metrics.traffic > 70 ? "High" : "Optimal"} 
            color={metrics.traffic > 70 ? "red" : "green"} icon={Car} 
          />
          <MetricCard 
            title="Temperature" value={`${metrics.temp}°C`} status={metrics.temp > 35 ? "Critical" : "Normal"} 
            color={metrics.temp > 35 ? "red" : "blue"} icon={Thermometer} 
          />
          <MetricCard 
             title="AQI Index" value={metrics.aqi} status={metrics.pollution} 
             color={metrics.aqi > 100 ? "red" : "emerald"} icon={Wind} 
          />
          <MetricCard 
            title="Humidity" value={`${metrics.humidity}%`} status="Humidity" 
            color="blue" icon={Droplets} 
          />
          <MetricCard 
            title="Weather" value={metrics.weather} status="Live Feed" 
            color={metrics.weather === "Rain" ? "blue" : "yellow"} icon={CloudRain} 
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-4 space-y-8">
             <SuggestionsPanel data={data} />
             <EnvironmentalScoreCard score={metrics.ecoScore} />
             
             {/* Health Suggestion Box */}
             <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                    <HeartPulse className="text-emerald-400 w-5 h-5" />
                    <h4 className="font-bold text-white uppercase text-xs tracking-widest">Health Suggestion</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    {metrics.aqi > 100 
                        ? "Air quality is degraded. Use N95 masks or minimize outdoor exposure in high-traffic zones." 
                        : "Urban conditions are optimal for outdoor physical activities and pedestrian transit."}
                </p>
             </div>
          </div>

          <div className="xl:col-span-8 flex flex-col gap-8">
             <AlertsPanel alerts={alerts} />
             
             {/* Placeholder for Trends */}
             <div className="glass-card p-8 rounded-3xl min-h-[200px] flex items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-5 grayscale group-hover:grayscale-0 transition-all">
                    <Activity className="w-full h-full text-blue-500" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">Real-time Trend Analysis</h3>
                    <p className="text-slate-500 text-sm font-medium">Monitoring oscillation patterns in traffic and atmospheric particulate matter.</p>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

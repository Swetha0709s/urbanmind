import React from 'react';
import { Search, Bell, User, Wifi, Shield } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-slate-950/20 backdrop-blur-md">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Urban Intelligence Dashboard</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs text-slate-500 font-medium">REAL-TIME CITY MONITORING SYSTEM <span className="text-slate-700 mx-2">|</span> ID: UM-429-X</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
          <Search className="w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search regions or data points..." 
            className="bg-transparent border-none outline-none text-sm text-slate-300 w-64 placeholder:text-slate-600"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end mr-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
              <Wifi size={10} />
              SYSTEM_LINK_STABLE
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400">
              <Shield size={10} />
              AI_SECURITY_ENFORCED
            </div>
          </div>
          
          <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 border-2 border-slate-900" />
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-200">Admin_Operator</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Level 5 Access</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center">
              <User className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

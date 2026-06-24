import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map as MapIcon, BarChart3, Bell, Settings, LogOut, Terminal } from 'lucide-react';

const NavItem = ({ icon: Icon, label, to, onClick }) => {
  if (onClick) {
    return (
      <div 
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group text-slate-400 hover:bg-rose-500/10 hover:text-rose-400"
      >
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        <span className="font-medium">{label}</span>
      </div>
    );
  }

  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
        isActive 
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
      }`}
    >
      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      <span className="font-medium">{label}</span>
      {({ isActive }) => isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
    </NavLink>
  );
};

export const Sidebar = () => {
  const handleShutdown = () => {
    if (window.confirm("CRITICAL: Are you sure you want to initiate emergency system shutdown? All AI autonomous systems will be deactivated.")) {
      alert("SYSTEM SHUTDOWN INITIATED. UrbanMind AI is going offline...");
    }
  };

  return (
    <aside className="w-72 h-screen flex flex-col border-r border-white/5 bg-slate-950/50 backdrop-blur-xl shrink-0">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <Terminal className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white">UrbanMind <span className="text-blue-400">AI</span></h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">Intelligence OS</p>
          </div>
        </div>

        <nav className="space-y-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" to="/" />
          <NavItem icon={MapIcon} label="Live Map" to="/map" />
          <NavItem icon={BarChart3} label="Analytics" to="/analytics" />
          <NavItem icon={Bell} label="Alerts" to="/alerts" />
        </nav>
      </div>

      <div className="mt-auto p-8 space-y-2">
        <NavItem icon={Settings} label="System Config" to="/config" />
        <div className="pt-4 mt-4 border-t border-white/5">
          <NavItem icon={LogOut} label="Emergency Shutdown" onClick={handleShutdown} />
        </div>
      </div>
    </aside>
  );
};


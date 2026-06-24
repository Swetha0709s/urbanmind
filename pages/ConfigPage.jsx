import React, { useState, useEffect } from 'react';
import { Settings, Shield, Zap, Globe, Save, RefreshCw, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const ConfigToggle = ({ label, description, checked, onChange, icon: Icon }) => (
  <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-bold text-white">{label}</h4>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <button 
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-all relative ${checked ? 'bg-blue-600' : 'bg-slate-700'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);

export const ConfigPage = () => {
  const [config, setConfig] = useState({
    aiMode: true,
    autoRefresh: true,
    aiOpt: true,
    predictive: true,
    maintenance: false,
    security: true,
    globalSync: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/config');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setConfig(data);
      } catch (err) {
        console.error("Failed to load config:", err);
        setStatusMsg({ type: 'error', text: 'Unable to sync configuration with backend.' });
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleToggle = (key) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setStatusMsg(null);
      const res = await fetch('http://localhost:5000/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();
      if (result.success) {
        setStatusMsg({ type: 'success', text: 'Core configuration successfully saved to server.' });
        setTimeout(() => setStatusMsg(null), 4000);
      }
    } catch (err) {
      console.error("Failed to save config:", err);
      setStatusMsg({ type: 'error', text: 'Failed to write configuration parameters.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = async () => {
    try {
      setLoading(true);
      setStatusMsg(null);
      const res = await fetch('http://localhost:5000/config');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setConfig(data);
      setStatusMsg({ type: 'success', text: 'Discarded unsaved local changes.' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      console.error("Failed to reload config:", err);
      setStatusMsg({ type: 'error', text: 'Failed to restore config state.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    const defaults = {
      aiMode: true,
      autoRefresh: true,
      aiOpt: true,
      predictive: true,
      maintenance: false,
      security: true,
      globalSync: true
    };
    try {
      setSaving(true);
      setStatusMsg(null);
      const res = await fetch('http://localhost:5000/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(defaults)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();
      if (result.success) {
        setConfig(defaults);
        setStatusMsg({ type: 'success', text: 'Default parameters successfully restored.' });
        setTimeout(() => setStatusMsg(null), 3000);
      }
    } catch (err) {
      console.error("Failed to reset config:", err);
      setStatusMsg({ type: 'error', text: 'Failed to reset settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase">Fetching System Configuration...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-[800px] mx-auto space-y-8">
        
        {statusMsg && (
          <div className={`flex items-start gap-4 p-4 rounded-2xl border ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          } transition-all duration-300`}>
            {statusMsg.type === 'success' ? (
              <CheckCircle size={20} className="mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle size={20} className="mt-0.5 shrink-0" />
            )}
            <div>
              <h5 className="font-bold">{statusMsg.type === 'success' ? 'Telemetry Synced' : 'System Alert'}</h5>
              <p className="text-xs font-medium opacity-90">{statusMsg.text}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-black text-white tracking-tight">System Configuration</h2>
                <p className="text-slate-500 font-medium">Manage UrbanMind Core settings and AI preferences.</p>
            </div>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-bold"
            >
                <RefreshCw size={16} />
                Reset Defaults
            </button>
        </div>

        <div className="space-y-4">
            <ConfigToggle 
                label="Enable AI Autonomous Mode" 
                description="Allow the system to make real-time decisions without human intervention."
                checked={config.aiMode}
                onChange={() => handleToggle('aiMode')}
                icon={Zap}
            />
            <ConfigToggle 
                label="Real-time Auto Refresh" 
                description="Automatically poll the n8n hub every 5 seconds for live urban updates."
                checked={config.autoRefresh}
                onChange={() => handleToggle('autoRefresh')}
                icon={RefreshCw}
            />
            <ConfigToggle 
                label="AI Core Optimization" 
                description="Enable neural networks to dynamically adjust traffic flow patterns."
                checked={config.aiOpt}
                onChange={() => handleToggle('aiOpt')}
                icon={Zap}
            />
            <ConfigToggle 
                label="Predictive Analytics" 
                description="Forecast city metrics 4 hours ahead using historical data."
                checked={config.predictive}
                onChange={() => handleToggle('predictive')}
                icon={Globe}
            />
            <ConfigToggle 
                label="Enhanced AI Security" 
                description="Enforce level-5 encryption on all sensor data transmission."
                checked={config.security}
                onChange={() => handleToggle('security')}
                icon={Shield}
            />
            <ConfigToggle 
                label="Global Cloud Sync" 
                description="Synchronize infrastructure status with the central command hub."
                checked={config.globalSync}
                onChange={() => handleToggle('globalSync')}
                icon={RefreshCw}
            />
            <div className="pt-4">
                <ConfigToggle 
                    label="System Maintenance Mode" 
                    description="Disable AI active control during manual hardware servicing."
                    checked={config.maintenance}
                    onChange={() => handleToggle('maintenance')}
                    icon={Settings}
                />
            </div>
        </div>

        <div className="flex justify-end gap-4 pt-8">
            <button 
              onClick={handleDiscard}
              className="px-8 py-3 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all"
            >
                Discard Changes
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {saving ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Save size={20} />
                )}
                Save Core Config
            </button>
        </div>
      </div>
    </div>
  );
};

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { AlertCircle, RefreshCw, Loader2 } from 'lucide-react';

export const Layout = ({ urbanData }) => {
  const { loading, error, refetch } = urbanData;

  if (error && !urbanData.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 animate-pulse">
            <AlertCircle className="w-10 h-10 text-rose-500" />
        </div>
        <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase">Connection Failed</h2>
        <p className="text-slate-400 mb-8 max-w-md text-center font-medium">
          Unable to establish a link with the Urban Intelligence Backend. Please ensure the server is running on port 5000.
        </p>
        <button 
          onClick={refetch}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-900 font-black hover:bg-slate-200 transition-all shadow-2xl active:scale-95"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          RETRY CONNECTION
        </button>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-200 overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header />
        
        {loading && !urbanData.data && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-sm font-bold text-slate-400 tracking-widest uppercase">Connecting to data source...</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet context={urbanData} />
        </div>
      </main>
    </div>
  );
};

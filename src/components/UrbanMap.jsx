import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Map as MapIcon, Loader2 } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace with your actual token
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFkcmkyNTEzIiwiYSI6ImNtZ292YmpwNDBvOTQyaXIyNTk0MzdqMTgifQ.yQyluqLXzO6NVpEsf-KiOQ';

export const UrbanMap = ({ markers = [], apiData }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: [80.2341, 13.0418],
        zoom: 11,
        pitch: 45,
        antialias: true
      });

      map.current.on('error', () => setMapError(true));
    } catch (e) {
      setMapError(true);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || mapError) return;

    // Clear existing markers
    const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
    while (existingMarkers[0]) {
      existingMarkers[0].remove();
    }

    // Add markers from API or default markers
    markers.forEach((m) => {
      const el = document.createElement('div');
      el.className = 'w-6 h-6 rounded-full border-2 border-white cursor-pointer transition-all duration-300 hover:scale-125';
      
      // Map coloring logic
      const isIncident = apiData?.alert?.toLowerCase().includes("accident") || m.status === 'incident';
      const isHighTraffic = apiData?.traffic > 70 || m.traffic > 70;
      
      if (isIncident) {
        el.style.backgroundColor = '#ef4444';
        el.style.boxShadow = '0 0 15px #ef4444';
        el.classList.add('animate-pulse');
      } else if (isHighTraffic) {
        el.style.backgroundColor = '#eab308';
        el.style.boxShadow = '0 0 15px #eab308';
      } else {
        el.style.backgroundColor = '#22c55e';
        el.style.boxShadow = '0 0 15px #22c55e';
      }

      new mapboxgl.Marker(el)
        .setLngLat([m.lng, m.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<div class="p-2 text-slate-800">
                      <h4 class="font-bold border-b border-slate-200 mb-1 pb-1">${m.name}</h4>
                      <p class="text-xs font-bold text-slate-600 uppercase">Status: ${isIncident ? 'CRITICAL' : (isHighTraffic ? 'CONGESTED' : 'OPTIMAL')}</p>
                    </div>`))
        .addTo(map.current);
    });
  }, [markers, mapError, apiData]);

  if (mapError) {
    return (
      <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center space-y-4 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
          <MapIcon size={32} />
        </div>
        <div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">Map Simulation Active</h3>
            <p className="text-slate-400 text-sm max-w-sm font-medium">
                Mapbox GL initialization failed. Switching to high-fidelity coordinate telemetry stream.
            </p>
        </div>
        <div className="w-full max-w-md space-y-2 pt-4">
            {markers.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-bold text-slate-300">{m.name}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${m.status === 'incident' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {m.status.toUpperCase()}
                    </span>
                </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group">
      {!map.current && (
        <div className="absolute inset-0 z-10 bg-slate-950 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Constructing Neural Map...</p>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

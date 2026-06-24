import { useState, useEffect } from 'react';

const INITIAL_MARKERS = [
  { id: 1, name: 'Central District', lat: 13.0418, lng: 80.2341, traffic: 88, status: 'incident', color: 'red' },
  { id: 2, name: 'North Harbor', lat: 13.0033, lng: 80.2550, traffic: 42, status: 'normal', color: 'green' },
  { id: 3, name: 'Tech Park', lat: 13.0850, lng: 80.2101, traffic: 65, status: 'traffic', color: 'yellow' },
  { id: 4, name: 'Riverside', lat: 12.9796, lng: 80.2185, traffic: 72, status: 'traffic', color: 'yellow' },
  { id: 5, name: 'Southern Hub', lat: 12.8913, lng: 80.2241, traffic: 92, status: 'incident', color: 'red' },
];

const WEATHER_TYPES = ['Sunny', 'Rainy', 'Cloudy', 'Overcast', 'Stormy'];

export const useCityData = () => {
  const [metrics, setMetrics] = useState({
    traffic: { value: 72, status: 'Moderate', color: 'yellow' },
    weather: { value: 'Sunny', status: 'Stable', color: 'blue' },
    systemHealth: { value: 98, status: 'Optimal', color: 'green' }
  });

  const [markers, setMarkers] = useState(INITIAL_MARKERS);
  const [socialData, setSocialData] = useState('Traffic is normal today.');
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Network Hub Active', message: 'Central processing unit online', time: '2 min ago', type: 'green' },
  ]);

  const [aiInsight, setAiInsight] = useState('');

  // AI Logic Simulation
  const processAIInsights = (trafficVal, weatherVal, socialMsg) => {
    let insights = [];
    if (trafficVal > 70) insights.push("Heavy congestion detected in main arteries.");
    if (weatherVal === 'Rainy' || weatherVal === 'Stormy') insights.push("Delay risk due to weather conditions.");
    if (socialMsg.toLowerCase().includes('accident') || socialMsg.toLowerCase().includes('incident')) {
      insights.push("Critical incident detected via social monitoring.");
    }
    
    if (insights.length === 0) insights.push("Urban conditions are within optimal parameters.");
    
    setAiInsight(insights.join(' '));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate Metric Changes
      const newTraffic = Math.floor(40 + Math.random() * 50);
      const newWeather = WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)];
      
      const newSocial = Math.random() > 0.8 
        ? "Reports of an accident nearby the Tech Park." 
        : "City is moving smoothly tonight.";

      setMetrics(prev => ({
        ...prev,
        traffic: {
          value: newTraffic,
          status: newTraffic > 80 ? 'Critical' : newTraffic > 60 ? 'Heavy' : 'Normal',
          color: newTraffic > 80 ? 'red' : newTraffic > 60 ? 'yellow' : 'green'
        },
        weather: {
          value: newWeather,
          status: 'Active',
          color: newWeather === 'Sunny' ? 'yellow' : 'blue'
        }
      }));

      setSocialData(newSocial);
      processAIInsights(newTraffic, newWeather, newSocial);

      // Randomly update markers
      setMarkers(prev => prev.map(m => {
        const t = Math.min(100, Math.max(0, m.traffic + (Math.random() > 0.5 ? 5 : -5)));
        return {
          ...m,
          traffic: t,
          status: t > 85 ? 'incident' : t > 60 ? 'traffic' : 'normal',
          color: t > 85 ? 'red' : t > 60 ? 'yellow' : 'green'
        };
      }));

      // Occasional new alert
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Date.now(),
          title: 'Real-time Update',
          message: 'System recalibrated for ' + INITIAL_MARKERS[Math.floor(Math.random() * 5)].name,
          time: 'Just now',
          type: Math.random() > 0.5 ? 'blue' : 'green'
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return { metrics, markers, alerts, socialData, aiInsight };
};

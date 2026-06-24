import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { MapPage } from './pages/MapPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AlertsPage } from './pages/AlertsPage';
import { ConfigPage } from './pages/ConfigPage';
import { useUrbanData } from './hooks/useUrbanData';

function App() {
  const urbanData = useUrbanData();

  return (
    <Routes>
      <Route element={<Layout urbanData={urbanData} />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/config" element={<ConfigPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import { useState, useEffect, useCallback } from 'react';

const API_URL = "http://localhost:5000/urban-data";

export const useUrbanData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);
      
      const result = await response.json();
      setData(result);
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      console.error("Fetch failure:", err);
      // For mobile development, localhost might need to be the actual server IP
      // but for this prototype we stick to localhost as per request
      setError("Communication failed. Server unreachable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { 
    data, 
    markers: data?.markers || [],
    loading, 
    error, 
    lastUpdated, 
    refetch: fetchData 
  };
};

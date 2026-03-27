import { useState, useEffect } from 'react';

// Hook to fetch data from API with mock fallback
export function useApi(apiFn, mockData, deps = []) {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      try {
        const res = await apiFn();
        if (!cancelled) {
          setData(res.data.data);
          setUsingMock(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('API unavailable, using mock data:', err.message);
          setData(mockData);
          setUsingMock(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error, usingMock, refetch: async () => {
    setLoading(true);
    try { const res = await apiFn(); setData(res.data.data); setUsingMock(false); }
    catch { setData(mockData); setUsingMock(true); }
    finally { setLoading(false); }
  }};
}

// Hook for mutations (POST/PUT/PATCH/DELETE)
export function useMutation(apiFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFn(...args);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

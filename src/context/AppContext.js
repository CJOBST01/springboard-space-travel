import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpaceTravelApi from '../services/SpaceTravelApi';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [planetsRes, craftsRes] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts(),
      ]);
      if (planetsRes.isError || craftsRes.isError) throw new Error('Failed to load data');
      setPlanets(planetsRes.data);
      setSpacecrafts(craftsRes.data);
    } catch (e) {
      setError(e.message || 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const value = {
    planets, spacecrafts, isLoading, error, refresh,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = { children: PropTypes.node };

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

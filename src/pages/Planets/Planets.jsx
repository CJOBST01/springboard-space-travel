import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import Loading from '../../components/Loading/Loading';
import styles from './Planets.module.css';

function Planets() {
  const { planets, spacecrafts, isLoading, error, refresh } = useAppContext();
  const [selectedCraft, setSelectedCraft] = useState('');
  const [target, setTarget] = useState('');
  const [dispatchError, setDispatchError] = useState(null);
  const [dispatching, setDispatching] = useState(false);

  const craftsByPlanet = (planetId) => spacecrafts.filter((s) => s.currentLocation === planetId);

  const handleDispatch = async (e) => {
    e.preventDefault();
    setDispatchError(null);
    if (!selectedCraft || !target) {
      setDispatchError('Choose a spacecraft and a destination.');
      return;
    }
    const craft = spacecrafts.find((s) => s.id === selectedCraft);
    if (craft && craft.currentLocation === Number(target)) {
      setDispatchError('Destination must differ from current location.');
      return;
    }
    setDispatching(true);
    try {
      const res = await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId: selectedCraft,
        targetPlanetId: Number(target),
      });
      if (res.isError) throw new Error(typeof res.data === 'string' ? res.data : 'Dispatch failed');
      await refresh();
      setSelectedCraft('');
      setTarget('');
    } catch (err) {
      setDispatchError(err.message || 'Unknown error');
    } finally {
      setDispatching(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <p role="alert">{error}</p>;

  const currentLocation = spacecrafts.find((s) => s.id === selectedCraft)?.currentLocation;

  return (
    <section className={styles.planets}>
      <h1>Planets</h1>
      <ul className={styles.planets__list}>
        {planets.map((p) => (
          <li key={p.id} className={styles.planets__item}>
            <h2 className={styles.planets__name}>{p.name}</h2>
            <p className={styles.planets__pop}>Population: {p.currentPopulation.toLocaleString()}</p>
            <ul className={styles.planets__crafts}>
              {craftsByPlanet(p.id).map((c) => (
                <li key={c.id}>{c.name} (cap {c.capacity.toLocaleString()})</li>
              ))}
              {craftsByPlanet(p.id).length === 0 && <li className={styles.planets__empty}>No spacecraft</li>}
            </ul>
          </li>
        ))}
      </ul>

      <form onSubmit={handleDispatch} className={styles.planets__dispatch} aria-label="Dispatch spacecraft">
        <h2>Dispatch a spacecraft</h2>
        <label>
          Spacecraft
          <select value={selectedCraft} onChange={(e) => setSelectedCraft(e.target.value)}>
            <option value="">--select--</option>
            {spacecrafts.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>
        <label>
          Destination
          <select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">--select--</option>
            {planets
              .filter((p) => p.id !== currentLocation)
              .map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
          </select>
        </label>
        {dispatchError && <p role="alert" className={styles.planets__error}>{dispatchError}</p>}
        <button type="submit" disabled={dispatching}>{dispatching ? 'Dispatching...' : 'Dispatch'}</button>
      </form>
    </section>
  );
}

export default Planets;

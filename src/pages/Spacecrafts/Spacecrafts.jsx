import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import SpacecraftCard from '../../components/SpacecraftCard/SpacecraftCard';
import Loading from '../../components/Loading/Loading';
import styles from './Spacecrafts.module.css';

function Spacecrafts() {
  const { spacecrafts, planets, isLoading, error, refresh } = useAppContext();

  const planetNameById = useCallback(
    (id) => planets.find((p) => p.id === id)?.name,
    [planets]
  );

  const handleDestroy = async (id) => {
    try {
      const res = await SpaceTravelApi.destroySpacecraftById({ id });
      if (res.isError) throw new Error('Failed to decommission');
      await refresh();
    } catch (e) {
      alert(e.message || 'Error');
    }
  };

  if (isLoading) return <Loading label="Loading spacecrafts..." />;
  if (error) return <p role="alert" className={styles.spacecrafts__error}>{error}</p>;

  return (
    <section className={styles.spacecrafts}>
      <header className={styles.spacecrafts__header}>
        <h1>Spacecrafts</h1>
        <Link to="/spacecrafts/build" className={styles.spacecrafts__build}>+ Build new</Link>
      </header>
      {spacecrafts.length === 0 ? (
        <p>No spacecraft on record. Build the first one.</p>
      ) : (
        <ul className={styles.spacecrafts__list}>
          {spacecrafts.map((s) => (
            <li key={s.id}>
              <SpacecraftCard
                spacecraft={s}
                planetName={planetNameById(s.currentLocation)}
                onDestroy={handleDestroy}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Spacecrafts;

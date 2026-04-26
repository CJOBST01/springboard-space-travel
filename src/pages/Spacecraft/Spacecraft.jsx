import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import { useAppContext } from '../../context/AppContext';
import Loading from '../../components/Loading/Loading';
import styles from './Spacecraft.module.css';

function Spacecraft() {
  const { id } = useParams();
  const { planets } = useAppContext();
  const [craft, setCraft] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await SpaceTravelApi.getSpacecraftById({ id });
        if (cancelled) return;
        if (res.isError) throw new Error('Spacecraft not found');
        setCraft(res.data);
        setStatus({ loading: false, error: null });
      } catch (e) {
        if (!cancelled) setStatus({ loading: false, error: e.message });
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (status.loading) return <Loading />;
  if (status.error) return (
    <section className={styles.spacecraft}>
      <p role="alert">{status.error}</p>
      <Link to="/spacecrafts">Back to spacecrafts</Link>
    </section>
  );

  const planet = planets.find((p) => p.id === craft.currentLocation);

  return (
    <section className={styles.spacecraft}>
      <Link to="/spacecrafts" className={styles.spacecraft__back}>&larr; Back</Link>
      <h1>{craft.name}</h1>
      <dl className={styles.spacecraft__details}>
        <dt>Capacity</dt><dd>{craft.capacity.toLocaleString()}</dd>
        <dt>Description</dt><dd>{craft.description}</dd>
        <dt>Current location</dt><dd>{planet ? planet.name : 'Unknown'}</dd>
      </dl>
    </section>
  );
}

export default Spacecraft;

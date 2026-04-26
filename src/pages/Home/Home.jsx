import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <section className={styles.home}>
      <h1 className={styles.home__title}>Space Travel</h1>
      <p className={styles.home__lede}>
        Coordinate humanity's evacuation across the solar system. Manage spacecraft, monitor planetary populations, and dispatch ships between worlds.
      </p>
      <ul className={styles.home__features}>
        <li><Link to="/spacecrafts">Spacecrafts</Link>: list, build, view details, and decommission.</li>
        <li><Link to="/planets">Planets</Link>: see populations and dispatch spacecraft between planets.</li>
      </ul>
    </section>
  );
}

export default Home;

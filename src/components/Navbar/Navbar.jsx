import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Primary">
      <span className={styles.navbar__brand}>Space Travel</span>
      <ul className={styles.navbar__links}>
        <li><NavLink to="/" end className={({isActive})=> isActive ? styles['navbar__link--active'] : styles.navbar__link}>Home</NavLink></li>
        <li><NavLink to="/spacecrafts" className={({isActive})=> isActive ? styles['navbar__link--active'] : styles.navbar__link}>Spacecrafts</NavLink></li>
        <li><NavLink to="/planets" className={({isActive})=> isActive ? styles['navbar__link--active'] : styles.navbar__link}>Planets</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;

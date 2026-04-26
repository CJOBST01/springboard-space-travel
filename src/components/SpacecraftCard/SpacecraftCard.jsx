import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './SpacecraftCard.module.css';

function SpacecraftCard({ spacecraft, planetName, onDestroy }) {
  const handleDestroy = () => {
    if (window.confirm(`Decommission ${spacecraft.name}?`)) {
      onDestroy(spacecraft.id);
    }
  };

  return (
    <article className={styles.card} data-testid="spacecraft-card">
      <h3 className={styles.card__name}>{spacecraft.name}</h3>
      <p className={styles.card__meta}>Capacity: {spacecraft.capacity.toLocaleString()}</p>
      <p className={styles.card__meta}>Location: {planetName || 'Unknown'}</p>
      <div className={styles.card__actions}>
        <Link to={`/spacecrafts/${spacecraft.id}`} className={styles.card__link}>View</Link>
        <button type="button" onClick={handleDestroy} className={styles['card__button--danger']}>Decommission</button>
      </div>
    </article>
  );
}

SpacecraftCard.propTypes = {
  spacecraft: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
  }).isRequired,
  planetName: PropTypes.string,
  onDestroy: PropTypes.func.isRequired,
};

export default SpacecraftCard;

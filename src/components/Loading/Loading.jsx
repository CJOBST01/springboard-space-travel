import PropTypes from 'prop-types';
import styles from './Loading.module.css';

function Loading({ label = 'Loading...' }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.loading__spinner} />
      <span className={styles.loading__label}>{label}</span>
    </div>
  );
}

Loading.propTypes = { label: PropTypes.string };

export default Loading;

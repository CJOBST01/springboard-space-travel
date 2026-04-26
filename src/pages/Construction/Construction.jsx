import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import { useAppContext } from '../../context/AppContext';
import styles from './Construction.module.css';

const initialForm = { name: '', capacity: '', description: '', pictureUrl: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (form.capacity === '' || Number.isNaN(Number(form.capacity)) || Number(form.capacity) <= 0) {
    errors.capacity = 'Capacity must be a positive number';
  }
  if (!form.description.trim()) errors.description = 'Description is required';
  return errors;
}

function Construction() {
  const navigate = useNavigate();
  const { refresh } = useAppContext();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await SpaceTravelApi.buildSpacecraft({
        name: form.name.trim(),
        capacity: Number(form.capacity),
        description: form.description.trim(),
        pictureUrl: form.pictureUrl.trim(),
      });
      if (res.isError) throw new Error('Failed to build spacecraft');
      await refresh();
      navigate('/spacecrafts');
    } catch (err) {
      setSubmitError(err.message || 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.construction}>
      <button type="button" onClick={() => navigate(-1)} className={styles.construction__back}>&larr; Back</button>
      <h1>Build a spacecraft</h1>
      <form onSubmit={handleSubmit} noValidate className={styles.construction__form}>
        <label className={styles.construction__field}>
          <span>Name *</span>
          <input name="name" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
          {errors.name && <small role="alert" className={styles.construction__error}>{errors.name}</small>}
        </label>
        <label className={styles.construction__field}>
          <span>Capacity *</span>
          <input name="capacity" type="number" value={form.capacity} onChange={handleChange} aria-invalid={!!errors.capacity} />
          {errors.capacity && <small role="alert" className={styles.construction__error}>{errors.capacity}</small>}
        </label>
        <label className={styles.construction__field}>
          <span>Description *</span>
          <textarea name="description" value={form.description} onChange={handleChange} aria-invalid={!!errors.description} />
          {errors.description && <small role="alert" className={styles.construction__error}>{errors.description}</small>}
        </label>
        <label className={styles.construction__field}>
          <span>Picture URL</span>
          <input name="pictureUrl" value={form.pictureUrl} onChange={handleChange} />
        </label>
        {submitError && <p role="alert" className={styles.construction__error}>{submitError}</p>}
        <button type="submit" disabled={submitting} className={styles.construction__submit}>
          {submitting ? 'Building...' : 'Build'}
        </button>
      </form>
    </section>
  );
}

export default Construction;

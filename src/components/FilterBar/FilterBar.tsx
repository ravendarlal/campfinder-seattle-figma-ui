import styles from './FilterBar.module.css';
import type { Filters } from '../../types';

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  latePickup: boolean;
  onLatePickupToggle: () => void;
}

const ACTIVITIES = ['STEM', 'Sports', 'Art', 'Music', 'Outdoors', 'Academic', 'Cooking'];
const LOCATIONS = ['Bellevue', 'Seattle', 'Kirkland', 'Redmond', 'Issaquah', 'Bothell'];
const PRICE_RANGES = [
  { value: 'under300', label: 'Under $300' },
  { value: '300-500', label: '$300–500' },
  { value: '500plus', label: '$500+' },
];

export default function FilterBar({ filters, onChange, latePickup, onLatePickupToggle }: FilterBarProps) {
  return (
    <div className={styles.bar} role="search" aria-label="Filter camps">
      <span className={styles.label}>Quick filters:</span>

      <select
        value={filters.age ?? ''}
        onChange={e => onChange({ ...filters, age: e.target.value || undefined })}
        className={styles.select}
        aria-label="Filter by age"
      >
        <option value="">Age</option>
        <option>5–7</option>
        <option>8–10</option>
        <option>11–14</option>
      </select>

      <select
        value={filters.activity ?? ''}
        onChange={e => onChange({ ...filters, activity: e.target.value || undefined })}
        className={styles.select}
        aria-label="Filter by activity"
      >
        <option value="">Activity</option>
        {ACTIVITIES.map(a => <option key={a}>{a}</option>)}
      </select>

      <select
        value={filters.location ?? ''}
        onChange={e => onChange({ ...filters, location: e.target.value || undefined })}
        className={styles.select}
        aria-label="Filter by location"
      >
        <option value="">Location</option>
        {LOCATIONS.map(l => <option key={l}>{l}</option>)}
      </select>

      <select
        value={filters.priceRange ?? ''}
        onChange={e => onChange({ ...filters, priceRange: e.target.value || undefined })}
        className={styles.select}
        aria-label="Filter by price"
      >
        <option value="">Price</option>
        {PRICE_RANGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
      </select>

      <button
        onClick={onLatePickupToggle}
        className={latePickup ? `${styles.toggle} ${styles.toggleActive}` : styles.toggle}
        aria-pressed={latePickup}
      >
        🔔 Late Pickup
      </button>
    </div>
  );
}

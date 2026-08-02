import styles from './EmptyState.module.css';

interface EmptyStateProps {
  query: string;
  onSuggest: (q: string) => void;
}

const SUGGESTIONS = [
  'STEM camps in Seattle',
  'Sports camps under $400',
  'Camps with late pickup',
  'Art camps in Kirkland',
];

export default function EmptyState({ query, onSuggest }: EmptyStateProps) {
  return (
    <div className={styles.wrapper} role="status">
      <div className={styles.icon} aria-hidden>🏕️</div>
      <h2 className={styles.heading}>No camps found</h2>
      <p className={styles.body}>
        No camps matched <strong>"{query}"</strong>. Try broadening your search or exploring a suggestion below.
      </p>
      <div className={styles.suggestions}>
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => onSuggest(s)} className={styles.chip}>{s}</button>
        ))}
      </div>
      <div className={styles.submitCta}>
        <p>Know a camp we're missing?</p>
        <a
          href="mailto:ravendar.bhojwani@gmail.com?subject=Submit a Camp&body=Camp name:%0ACamp website:%0AOrganization / school:%0ALocation:%0AOptional notes:"
          className={styles.submitLink}
        >
          Submit a Camp →
        </a>
      </div>
    </div>
  );
}

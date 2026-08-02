import { useState, type KeyboardEvent } from 'react';
import styles from './SearchBar.module.css';

const CHIPS = [
  'STEM', 'Sports', 'Art', 'Outdoors', 'Music',
  'Academic', 'Most Popular', 'Under $500', 'Late Pickup',
];

const EXAMPLE_QUERIES = [
  'Find tennis camps for a 7-year-old near Bellevue in July',
  'Show me popular STEM camps under $600',
  'Which camps offer pickup after 5 PM?',
  'Find camps at Lakeside School',
];

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const submit = (q: string) => {
    if (q.trim()) onSearch(q.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit(query);
    }
  };

  const handleChip = (chip: string) => {
    setActiveChip(chip === activeChip ? null : chip);
    submit(chip);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <textarea
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me what kind of camp you're looking for..."
          rows={2}
          className={styles.input}
          aria-label="Search for summer camps"
        />
        <div className={styles.boxFooter}>
          <div className={styles.examples} aria-hidden>
            {EXAMPLE_QUERIES.slice(0, 2).map(q => (
              <button
                key={q}
                onClick={() => { setQuery(q); submit(q); }}
                className={styles.exampleBtn}
                tabIndex={-1}
              >
                "{q.length > 36 ? q.slice(0, 36) + '…' : q}"
              </button>
            ))}
          </div>
          <button
            onClick={() => submit(query)}
            className={styles.searchBtn}
            aria-label="Search"
          >
            Search →
          </button>
        </div>
      </div>

      <div className={styles.chips} role="group" aria-label="Quick category filters">
        {CHIPS.map(chip => (
          <button
            key={chip}
            onClick={() => handleChip(chip)}
            className={activeChip === chip ? `${styles.chip} ${styles.chipActive}` : styles.chip}
            aria-pressed={activeChip === chip}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

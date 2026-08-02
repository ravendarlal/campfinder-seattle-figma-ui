import { useState, useEffect } from 'react';
import CampCard from '../CampCard/CampCard';
import FilterBar from '../FilterBar/FilterBar';
import LoadingState from '../LoadingState/LoadingState';
import EmptyState from '../EmptyState/EmptyState';
import { searchCamps } from '../../mockApi';
import type { Camp, Filters } from '../../types';
import styles from './ResultsPage.module.css';

interface ResultsPageProps {
  query: string;
  onViewCamp: (camp: Camp) => void;
  onSearch: (q: string) => void;
}

type Status = 'loading' | 'success' | 'empty' | 'error';

const SORT_OPTIONS = [
  'Recommended',
  'Most Popular',
  'Price: Low to High',
  'Distance',
  'Soonest Date',
];

export default function ResultsPage({ query, onViewCamp, onSearch }: ResultsPageProps) {
  const [status, setStatus] = useState<Status>('loading');
  const [camps, setCamps] = useState<Camp[]>([]);
  const [summary, setSummary] = useState('');
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<Filters>({});
  const [latePickup, setLatePickup] = useState(false);
  const [sort, setSort] = useState('Recommended');
  const [view, setView] = useState<'list' | 'map'>('list');
  const [followUp, setFollowUp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setStatus('loading');
    setError('');
    searchCamps(query, { ...filters, latePickup })
      .then(result => {
        setCamps(result.camps);
        setSummary(result.summary);
        setTotal(result.total);
        setStatus(result.total === 0 ? 'empty' : 'success');
      })
      .catch(err => {
        setError(err?.message ?? 'Something went wrong. Please try again.');
        setStatus('error');
      });
  }, [query, filters, latePickup]);

  const FOLLOW_UPS = [
    'Only show camps under $500',
    'Show camps closer to 98004',
    'What about the following week?',
    'Only show late pickup available',
  ];

  return (
    <div>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        latePickup={latePickup}
        onLatePickupToggle={() => setLatePickup(v => !v)}
      />

      <div className={styles.inner}>
        {/* AI Response Banner */}
        {status !== 'loading' && (
          <div className={styles.aiBanner} role="status">
            <div className={styles.aiIcon} aria-hidden>✦</div>
            <div className={styles.aiContent}>
              <p className={styles.aiLabel}>Camp Finder AI</p>
              <p className={styles.aiText}>{summary}</p>
              <div className={styles.followUps}>
                {FOLLOW_UPS.map(s => (
                  <button key={s} onClick={() => onSearch(s)} className={styles.followUp}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        {status === 'success' && (
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <h2 className={styles.count}>{total} camps found</h2>
              <p className={styles.queryLabel}>"{query}"</p>
            </div>
            <div className={styles.toolbarRight}>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className={styles.sortSelect}
                aria-label="Sort results"
              >
                {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
              <div className={styles.viewToggle} role="group" aria-label="View mode">
                <button
                  onClick={() => setView('list')}
                  className={view === 'list' ? `${styles.viewBtn} ${styles.viewBtnActive}` : styles.viewBtn}
                  aria-pressed={view === 'list'}
                >
                  List
                </button>
                <button
                  onClick={() => setView('map')}
                  className={view === 'map' ? `${styles.viewBtn} ${styles.viewBtnActive}` : styles.viewBtn}
                  aria-pressed={view === 'map'}
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Map placeholder */}
        {view === 'map' && status === 'success' && (
          <div className={styles.mapPlaceholder} role="img" aria-label="Map view of camp locations">
            <span>🗺</span>
            <p>Map view — {total} camps plotted</p>
            <p className={styles.mapSub}>Integrate react-leaflet here with CAMPS as markers</p>
          </div>
        )}

        {/* States */}
        {status === 'loading' && <LoadingState />}
        {status === 'empty'   && <EmptyState query={query} onSuggest={onSearch} />}
        {status === 'error'   && (
          <div className={styles.errorState} role="alert">
            <p className={styles.errorIcon}>⚠️</p>
            <p className={styles.errorText}>{error}</p>
            <button onClick={() => onSearch(query)} className={styles.retryBtn}>Try again</button>
          </div>
        )}
        {status === 'success' && view === 'list' && (
          <div className={styles.grid}>
            {camps.map(camp => (
              <CampCard key={camp.id} camp={camp} onView={onViewCamp} />
            ))}
          </div>
        )}

        {/* Follow-up input */}
        {status !== 'loading' && (
          <div className={styles.followUpBox}>
            <p className={styles.followUpLabel}>Refine your search</p>
            <div className={styles.followUpRow}>
              <input
                value={followUp}
                onChange={e => setFollowUp(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && followUp.trim()) { onSearch(followUp); setFollowUp(''); } }}
                placeholder="Ask a follow-up question..."
                className={styles.followUpInput}
                aria-label="Refine your camp search"
              />
              <button
                onClick={() => { if (followUp.trim()) { onSearch(followUp); setFollowUp(''); } }}
                className={styles.followUpSend}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

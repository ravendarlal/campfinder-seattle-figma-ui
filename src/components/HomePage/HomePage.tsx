import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import FilterBar from '../FilterBar/FilterBar';
import CampCard from '../CampCard/CampCard';
import LoadingState from '../LoadingState/LoadingState';
import { getFeaturedCamps } from '../../mockApi';
import type { Camp, Filters } from '../../types';
import styles from './HomePage.module.css';

interface HomePageProps {
  onSearch: (q: string) => void;
  onViewCamp: (camp: Camp) => void;
}

export default function HomePage({ onSearch, onViewCamp }: HomePageProps) {
  const [featured, setFeatured] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({});
  const [latePickup, setLatePickup] = useState(false);

  useEffect(() => {
    getFeaturedCamps().then(camps => {
      setFeatured(camps);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className={styles.hero} aria-label="Search for summer camps">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Seattle Area Summer Camps</p>
          <h1 className={styles.heading}>
            Find the right summer camp<br />
            <em className={styles.headingAccent}>for your child.</em>
          </h1>
          <p className={styles.subheading}>
            AI-powered search across hundreds of camps in Seattle, Bellevue, Kirkland, Redmond, and beyond.
          </p>
          <SearchBar onSearch={onSearch} />
        </div>
      </section>

      {/* Filter bar */}
      <FilterBar
        filters={filters}
        onChange={setFilters}
        latePickup={latePickup}
        onLatePickupToggle={() => setLatePickup(v => !v)}
      />

      {/* Featured camps */}
      <section className={styles.featured} aria-label="Trending camps this week">
        <div className={styles.featuredInner}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>Trending this week</h2>
              <p className={styles.sectionSub}>Popular camps across the Seattle area</p>
            </div>
            <button onClick={() => onSearch('')} className={styles.viewAll}>
              View all →
            </button>
          </div>

          {loading ? (
            <LoadingState />
          ) : (
            <div className={styles.grid}>
              {featured.map(camp => (
                <CampCard key={camp.id} camp={camp} onView={onViewCamp} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community CTA */}
      <section className={styles.cta} aria-label="Submit a missing camp">
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Know a camp we're missing?</h2>
          <p className={styles.ctaBody}>
            Help other Seattle parents discover great camps. Submit a camp and we'll verify and add it.
          </p>
          <a
            href="mailto:ravendar.bhojwani@gmail.com?subject=Submit a Camp&body=Camp name:%0ACamp website:%0AOrganization / school:%0ALocation:%0AOptional notes:"
            className={styles.ctaBtn}
          >
            Submit a Camp
          </a>
        </div>
      </section>
    </div>
  );
}

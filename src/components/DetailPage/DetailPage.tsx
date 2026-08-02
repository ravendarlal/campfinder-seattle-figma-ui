import { useState } from 'react';
import type { Camp } from '../../types';
import styles from './DetailPage.module.css';

const ACTIVITY_COLORS: Record<string, { bg: string; color: string }> = {
  STEM:      { bg: '#dbeafe', color: '#1d4ed8' },
  Sports:    { bg: '#dcfce7', color: '#15803d' },
  Art:       { bg: '#f3e8ff', color: '#7e22ce' },
  Music:     { bg: '#fef9c3', color: '#854d0e' },
  Outdoors:  { bg: '#d1fae5', color: '#065f46' },
  Academic:  { bg: '#f1f5f9', color: '#475569' },
  Cooking:   { bg: '#ffedd5', color: '#9a3412' },
};

interface DetailPageProps {
  camp: Camp;
  onBack: () => void;
}

export default function DetailPage({ camp, onBack }: DetailPageProps) {
  const [showExternal, setShowExternal] = useState(false);
  const activityStyle = ACTIVITY_COLORS[camp.activity] ?? { bg: '#e8f3ed', color: '#1e5c3a' };

  return (
    <div className={styles.page}>
      {/* External link modal */}
      {showExternal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal
          aria-labelledby="modal-title"
          onClick={e => { if (e.target === e.currentTarget) setShowExternal(false); }}
        >
          <div className={styles.modal}>
            <p className={styles.modalIcon}>↗️</p>
            <h2 id="modal-title" className={styles.modalTitle}>Leaving Campfinder</h2>
            <p className={styles.modalBody}>
              Registration for <strong>{camp.name}</strong> happens on the provider's website.
              We'll open it in a new tab.
            </p>
            <div className={styles.modalActions}>
              <button onClick={() => setShowExternal(false)} className={styles.modalCancel}>Cancel</button>
              <a
                href={camp.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalConfirm}
                onClick={() => setShowExternal(false)}
              >
                Open Provider Site
              </a>
            </div>
          </div>
        </div>
      )}

      <div className={styles.inner}>
        {/* Back */}
        <button onClick={onBack} className={styles.back}>← Back to results</button>

        {/* Hero image */}
        <div className={styles.hero}>
          <img src={camp.image} alt={`${camp.name}`} className={styles.heroImg} />
          <div className={styles.heroOverlay} aria-hidden />
          <div className={styles.heroContent}>
            <span
              className={styles.activityBadge}
              style={{ background: activityStyle.bg, color: activityStyle.color }}
            >
              {camp.activity}
            </span>
            <h1 className={styles.campName}>{camp.name}</h1>
            <p className={styles.hostName}>{camp.host}</p>
          </div>
        </div>

        {/* Stats + CTA */}
        <div className={styles.statsRow}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Price</p>
              <p className={styles.statValue} style={{ color: 'var(--forest)' }}>${camp.price}</p>
              <p className={styles.statSub}>per week</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Ages</p>
              <p className={styles.statValue}>{camp.ages}</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Status</p>
              <span
                className={styles.statusBadge}
                style={{
                  background: camp.registrationOpen ? 'var(--green-bg)' : 'var(--red-bg)',
                  color: camp.registrationOpen ? 'var(--green-text)' : 'var(--red-text)',
                }}
              >
                {camp.registrationOpen ? '● Registration Open' : '● Registration Closed'}
              </span>
            </div>
          </div>
          <div className={styles.ctaCol}>
            <button onClick={() => setShowExternal(true)} className={styles.registerBtn}>
              Register on Camp Website ↗
            </button>
            <p className={styles.ctaNote}>Registration handled by provider</p>
            <a
              href={camp.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceBtn}
            >
              View source page
            </a>
          </div>
        </div>

        {/* Content grid */}
        <div className={styles.content}>
          {/* About */}
          <section className={styles.card} aria-label="About this camp">
            <h2 className={styles.cardTitle}>About this camp</h2>
            <p className={styles.description}>{camp.description}</p>
          </section>

          {/* Sections grid */}
          <div className={styles.infoGrid}>
            <section className={styles.card} aria-label="Sessions">
              <h2 className={styles.cardTitle}>Sessions</h2>
              <dl className={styles.definitionList}>
                {camp.sessions.map(s => (
                  <div key={s.label} className={styles.definition}>
                    <dt>{s.label}</dt>
                    <dd>{s.dates}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className={styles.card} aria-label="Schedule">
              <h2 className={styles.cardTitle}>Schedule</h2>
              <dl className={styles.definitionList}>
                <div className={styles.definition}>
                  <dt>Drop-off</dt>
                  <dd>{camp.dropoff}</dd>
                </div>
                <div className={styles.definition}>
                  <dt>Camp hours</dt>
                  <dd>{camp.schedule}</dd>
                </div>
                {camp.extendedCare && (
                  <div className={styles.definition}>
                    <dt>Extended care</dt>
                    <dd style={{ color: 'var(--forest)', fontWeight: 500 }}>{camp.extendedCare}</dd>
                  </div>
                )}
              </dl>
            </section>

            <section className={styles.card} aria-label="Location">
              <h2 className={styles.cardTitle}>Location</h2>
              <div className={styles.mapThumb} aria-label="Map placeholder" role="img">
                📍
              </div>
              <p className={styles.locationText}>{camp.location} {camp.zip}</p>
              <p className={styles.locationSub}>{camp.distance} from your location</p>
            </section>

            <section className={styles.card} aria-label="Host information">
              <h2 className={styles.cardTitle}>Host</h2>
              <p className={styles.hostBig}>{camp.host}</p>
              <a href={camp.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.hostLink}>
                View all camps from {camp.host} →
              </a>
              <div className={styles.dataNote}>
                <p>Camp information last checked: 2 days ago</p>
                <a
                  href={`mailto:ravendar.bhojwani@gmail.com?subject=Incorrect info: ${encodeURIComponent(camp.name)}&body=Please describe the issue:`}
                  className={styles.reportLink}
                >
                  Report incorrect information
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

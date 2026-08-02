import type { Camp } from '../../types';
import styles from './CampCard.module.css';

const ACTIVITY_COLORS: Record<string, string> = {
  STEM:      styles.activityStem,
  Sports:    styles.activitySports,
  Art:       styles.activityArt,
  Music:     styles.activityMusic,
  Outdoors:  styles.activityOutdoors,
  Academic:  styles.activityAcademic,
  Cooking:   styles.activityCooking,
};

interface CampCardProps {
  camp: Camp;
  onView: (camp: Camp) => void;
}

export default function CampCard({ camp, onView }: CampCardProps) {
  const activityClass = ACTIVITY_COLORS[camp.activity] ?? styles.activityDefault;

  return (
    <article className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <img
          src={camp.image}
          alt={`${camp.name} camp`}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.badges}>
          <span className={`${styles.badge} ${activityClass}`}>{camp.activity}</span>
          {camp.tags.map(t => (
            <span key={t} className={`${styles.badge} ${styles.tagBadge}`}>{t}</span>
          ))}
        </div>
        {!camp.registrationOpen && (
          <div className={styles.closedBanner} aria-label="Registration closed">
            Registration Closed
          </div>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{camp.name}</h3>
          <span className={styles.price}>${camp.price}</span>
        </div>
        <p className={styles.host}>{camp.host}</p>

        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon} aria-hidden>👤</span>
            <dd>{camp.ages}</dd>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon} aria-hidden>📍</span>
            <dd>{camp.location} · {camp.distance}</dd>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon} aria-hidden>📅</span>
            <dd>{camp.dates}</dd>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon} aria-hidden>🕐</span>
            <dd>{camp.schedule}</dd>
          </div>
          {camp.extendedCare && (
            <div className={`${styles.metaItem} ${styles.metaFull}`}>
              <span className={styles.metaIcon} aria-hidden>🔔</span>
              <dd className={styles.extendedCare}>{camp.extendedCare}</dd>
            </div>
          )}
        </dl>

        {camp.registrationOpen && (
          <p className={styles.openBadge}>Registration Open</p>
        )}

        {camp.popularity && (
          <p className={styles.popularity}>✦ {camp.popularity}</p>
        )}

        <div className={styles.actions}>
          <button onClick={() => onView(camp)} className={styles.viewBtn}>
            View Camp
          </button>
          <a
            href={camp.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceLink}
            aria-label={`Official ${camp.name} registration page (opens in new tab)`}
          >
            Official Site ↗
          </a>
        </div>
      </div>
    </article>
  );
}

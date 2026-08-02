import styles from './LoadingState.module.css';

export default function LoadingState() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Searching for camps...">
      <div className={styles.aiBanner}>
        <div className={styles.aiIcon} aria-hidden>✦</div>
        <div className={styles.aiContent}>
          <p className={styles.aiLabel}>Camp Finder AI</p>
          <p className={styles.aiText}>Searching summer camps…</p>
          <div className={styles.dots} aria-hidden>
            <span /><span /><span />
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeleton}>
            <div className={`${styles.bone} ${styles.boneImage}`} />
            <div className={styles.boneBody}>
              <div className={`${styles.bone} ${styles.boneTitle}`} />
              <div className={`${styles.bone} ${styles.boneLine}`} />
              <div className={`${styles.bone} ${styles.boneLine}`} style={{ width: '60%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import styles from './Nav.module.css';

interface NavProps {
  onHome: () => void;
  onSearch: (q: string) => void;
}

export default function Nav({ onHome, onSearch }: NavProps) {
  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        <div className={styles.left}>
          <button onClick={onHome} className={styles.logo} aria-label="Campfinder Seattle — go home">
            <span className={styles.logoIcon} aria-hidden>⛺</span>
            <span className={styles.logoText}>campfinder</span>
          </button>
          <div className={styles.links}>
            <button onClick={() => onSearch('')} className={styles.link}>Find Camps</button>
            <button className={styles.link}>Popular</button>
            <button className={styles.link}>Schools &amp; Hosts</button>
            <a
              href="mailto:ravendar.bhojwani@gmail.com?subject=Submit a Camp"
              className={styles.link}
            >
              Submit a Camp
            </a>
          </div>
        </div>
        <div className={styles.right}>
          <a
            href="mailto:ravendar.bhojwani@gmail.com?subject=Submit a Camp&body=Camp name:%0ACamp website:%0AOrganization / school:%0ALocation:%0AOptional notes:"
            className={styles.submitBtn}
          >
            Submit a Camp
          </a>
        </div>
      </div>
    </nav>
  );
}

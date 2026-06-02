import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Left Column */}
        <div className={styles.col}>
          <p className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            AM<span className={styles.dot}>.</span>
          </p>
          <p className={styles.bio}>
            CS Student at SECE, MERN developer, and ML researcher. Building the infrastructure that powers tomorrow's apps.
          </p>
        </div>

        {/* Navigation Links */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Navigation</h3>
          <ul className={styles.navList}>
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Tech Stack' },
              { id: 'projects', label: 'Selected Work' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'faq', label: 'FAQs' }
            ].map((link) => (
              <li key={link.id} className={styles.navItem} onClick={() => scrollTo(link.id)}>
                {link.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Details */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Connect</h3>
          <div className={styles.contactDetails}>
            <a href="mailto:abiniveshmayilsamy1@gmail.com" className={styles.contactLink}>abiniveshmayilsamy1@gmail.com</a>
            <a href="tel:+919361937819" className={styles.contactLink}>+91 9361937819</a>
          </div>
          <div className={styles.socials}>
            <a href="https://github.com/AbiniveshMayilsamy" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
            <a href="https://linkedin.com/in/abiniveshm" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
            <a href="mailto:abiniveshmayilsamy1@gmail.com" aria-label="Email"><FiMail /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>&copy; 2026 Abinivesh M. All rights reserved.</p>
        <p className={styles.bottomTag}>Designed &amp; Engineered by Abinivesh</p>
      </div>
    </footer>
  );
}


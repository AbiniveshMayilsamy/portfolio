import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <p className={styles.logo}>AM<span>.</span></p>
          <p className={styles.bio}>
            CS student at SECE, passionate about Cloud, DevOps, and building
            scalable web applications.
          </p>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Navigation</h3>
          <ul className={styles.navList}>
            {['about','skills','projects','experience','education','contact'].map(l => (
              <li key={l} onClick={() => scrollTo(l)}>{l.charAt(0).toUpperCase() + l.slice(1)}</li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Connect</h3>
          <div className={styles.contactLinks}>
            <a href="mailto:abiniveshmayilsamy1@gmail.com">abiniveshmayilsamy1@gmail.com</a>
            <a href="tel:+919361937819">+91 9361937819</a>
          </div>
          <div className={styles.socials}>
            <a href="https://github.com/AbiniveshMayilsamy" target="_blank" rel="noreferrer"><FiGithub size={18} /></a>
            <a href="https://linkedin.com/in/abiniveshm" target="_blank" rel="noreferrer"><FiLinkedin size={18} /></a>
            <a href="mailto:abiniveshmayilsamy1@gmail.com"><FiMail size={18} /></a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Abinivesh M. Where ideas turn into systems.</p>
        <p>Made with <span className={styles.heart}>❤️</span> in Tamil Nadu, India</p>
      </div>
    </footer>
  );
}

import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.logo}>AM<span>.</span></p>
        <p className={styles.copy}>
          Made with <FiHeart className={styles.heart} /> by Abinivesh M
        </p>
        <div className={styles.socials}>
          <a href="https://github.com/AbiniveshMayilsamy" target="_blank" rel="noreferrer"><FiGithub /></a>
          <a href="https://linkedin.com/in/abiniveshm" target="_blank" rel="noreferrer"><FiLinkedin /></a>
          <a href="mailto:abiniveshmayilsamy1@gmail.com"><FiMail /></a>
        </div>
      </div>
    </footer>
  );
}

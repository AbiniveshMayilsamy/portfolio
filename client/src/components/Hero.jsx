import { motion } from 'framer-motion';
import { FiZap, FiAward, FiGithub, FiArrowRight, FiDownload } from 'react-icons/fi';
import styles from './Hero.module.css';

export default function Hero() {
  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} id="hero">
      {/* Glow Backdrops inside Section */}
      <div className={styles.heroBgLight} aria-hidden="true" />
      <div className={styles.heroBgLight2} aria-hidden="true" />
      
      <div className={styles.content}>
        <motion.p 
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrowBar} aria-hidden="true"></span>
          <span className={styles.eyebrowTag}>[01]</span>
          Cloud Engineer &amp; Full Stack Developer &amp; Linux Admin Aspirant
        </motion.p>

        {/* Big Name */}
        <motion.div
          className={styles.nameWrap}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <span className={styles.nameFirst}>ABINIVESH</span>
          <span className={styles.nameLast}>MAYILSAMY</span>
        </motion.div>

        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          I build{' '}
          <em className={styles.serifWord}>
            scalable
            <svg className={styles.underline} viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 9 Q 45 2 95 7 T 197 9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </em>{' '}
          systems{' '}
          <em className={styles.serifWord}>
            on the cloud.
            <svg className={styles.underline} viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 9 Q 45 2 95 7 T 197 9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </em>
        </motion.h1>

        <motion.p 
          className={styles.sub}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Cloud Engineer &amp; Full Stack Developer — designing scalable AWS infrastructure, Linux systems, and full stack applications to deliver reliable, high-performance solutions.
        </motion.p>

        <motion.div 
          className={styles.actions}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            type="button" 
            className="btn shiny-cta" 
            onClick={() => scrollTo('contact')}
          >
            <span>Let's Connect &nbsp; <FiArrowRight /></span>
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => scrollTo('projects')}
          >
            <span className="btn-dot" aria-hidden="true"></span>
            <span>Selected Work</span>
          </button>

          <a
            href="https://drive.google.com/uc?export=download&id=1JJvqBbdG4CX6PbnaDNU9gX6jGsRNRqcd"
            download
            className="btn btn-secondary"
          >
            <FiDownload />
            <span>Download CV</span>
          </a>
        </motion.div>

        {/* Metrics Row */}
        <motion.div 
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          aria-label="Key metrics"
        >
          <div className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true"><FiGithub /></span>
            <span className={styles.statNum}>200+</span>
            <span className={styles.statLabel}>Contributions</span>
          </div>

          <span className={styles.statSep} aria-hidden="true" />

          <div className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true"><FiAward /></span>
            <span className={styles.statNum}>Naan Mudhalvan</span>
            <span className={styles.statLabel}>Corporate Ambassador</span>
          </div>

          <span className={styles.statSep} aria-hidden="true" />

          <div className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true"><FiZap /></span>
            <span className={styles.statNum}>100</span>
            <span className={styles.statLabel}>PageSpeed score</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-header">
        <div className="section-header-inner">
          <span className="section-header-line" />
          <span className="section-header-text">About The Developer</span>
          <span className="section-header-line right" />
        </div>
      </div>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Photo */}
        <div className={styles.photoCol}>
          <div className={styles.photoWrap}>
            <div className={styles.photoRings}>
              <div className={styles.ring1} />
              <div className={styles.ring2} />
            </div>
            <img src="/profile.jpg" alt="Abinivesh M" className={styles.photo}
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
            <div className={styles.photoFallback}><span>AM</span></div>
            <div className={styles.photoOverlay}>
              <p>Built with Passion</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={styles.textCol}>
          <div className={styles.card}>
            <div className={styles.accentBar} />
            <p className={styles.desc}>
              I'm a Cloud & DevOps enthusiast and Computer Science student at Sri Eshwar College of
              Engineering (SECE), admitted via lateral entry after completing my Diploma in Computer
              Engineering with 92.5% at Nachimuthu Polytechnic College.
            </p>
            <p className={styles.desc}>
              With hands-on internship experience at CODEHUB NEXUS and VENKTERTECH, I've built
              scalable MERN stack applications, CMS platforms, and ML-powered systems like a
              computer vision tailoring app and a real-time voice emotion detector.
            </p>
            <p className={styles.desc}>
              I'm passionate about Cloud (AWS, Azure), DevOps practices, and building intelligent
              applications. I hold certifications from HackerRank, Oracle, IIT Madras, and Intellipaat.
            </p>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>5+</span>
              <span className={styles.statLabel}>Projects Built</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>Internships</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>10+</span>
              <span className={styles.statLabel}>Tech Mastered</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

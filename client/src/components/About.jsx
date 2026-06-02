import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-header">
        <p className="section-eyebrow">
          <span className="bar" aria-hidden="true"></span>
          <span className="tag">[04]</span>
          About Me
        </p>
        <h2 className="section-title">The engineering <em>behind</em> the code.</h2>
      </div>

      <div className={styles.grid}>
        {/* Photo Container */}
        <motion.div 
          className={styles.photoCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.photoFrame}>
            <div className={styles.photoOverlay} />
            <div className={styles.avatarPlaceholder}>
              <span>AM</span>
            </div>
            <div className={styles.badge}>
              <span>TAMIL NADU, IN</span>
            </div>
          </div>
        </motion.div>

        {/* Biography & Stats */}
        <motion.div 
          className={styles.textCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.bioCard}>
            <p className={styles.para}>
              I'm a **Full Stack MERN Developer &amp; Machine Learning Enthusiast** pursuing my B.E. in Computer Science &amp; Engineering at **Sri Eshwar College of Engineering (SECE)**.
            </p>
            <p className={styles.para}>
              Admitted via lateral entry after completing my Diploma in Computer Engineering at **Nachimuthu Polytechnic College** with **92.5%**, my foundation combines strong hardware-software interaction knowledge with modern web architecture.
            </p>
            <p className={styles.para}>
              Through hands-on internships at CODEHUB NEXUS and VENKTERTECH, I've developed production-ready web applications, integrated headless CMS systems, and engineered automated body measurement and emotion classification pipelines.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNum}>5+</span>
              <span className={styles.statLabel}>Projects Built</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>Internships Completed</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>15+</span>
              <span className={styles.statLabel}>Skills Acquired</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

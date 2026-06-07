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
        {/* Photo */}
        <motion.div
          className={styles.photoCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.photoFrame}>
            <div className={styles.photoOverlay} />
            <img
              src="/profile.jpeg"
              alt="Abinivesh M"
              className={styles.photo}
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className={styles.avatarPlaceholder}><span>AM</span></div>
            <div className={styles.badge}><span>TAMIL NADU, IN</span></div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className={styles.textCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.bioCard}>
            <p className={styles.para}>
              I'm a Computer Science Engineering student passionate about cloud infrastructure, Linux systems, and full stack development. I specialize in designing and deploying scalable cloud-native solutions on AWS, with a strong interest in system administration and DevOps practices.
            </p>
            <p className={styles.para}>
              Admitted to B.E. CSE at Sri Eshwar College of Engineering via lateral entry after completing my Diploma in Computer Engineering at Nachimuthu Polytechnic College with 92.5%. Holding AWS Certified Cloud Practitioner (CLF-C02) certification and preparing for AWS Certified Solutions Architect (SAA-C03), with a strong aspiration to specialize in Linux system administration and cloud infrastructure.
            </p>
            <p className={styles.para}>
              Hackathon highlights: 2nd Prize at Fiestaa'26 (KPR Institute) for Agentic AI Loan Approval System, Top 300 Finalist at FixForward Ideathon 2026, and participant at Bonfiglioli Smart Motion Hackathon 2.0 building the Neuro-Nav AGV.
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


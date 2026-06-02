import { motion } from 'framer-motion';
import { FiAward, FiBookOpen } from 'react-icons/fi';
import styles from './Education.module.css';

const education = [
  {
    degree: 'B.E. Computer Science & Engineering',
    institution: 'Sri Eshwar College of Engineering (SECE)',
    period: '2025 – 2028',
    grade: 'Current Student',
    details: 'Pursuing B.E. in CSE via lateral entry. Focused on cloud computing, software development, data structures, and modern web architectures.'
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'Nachimuthu Polytechnic College',
    period: '2022 – 2025',
    grade: '92.5%',
    details: 'Completed Diploma with a 92.5% aggregate. Built a strong foundation in programming, networking, web development, and computer fundamentals.'
  },
  {
    degree: 'Secondary School Certificate (SSLC)',
    institution: 'R.G. Matric Higher Secondary School',
    period: '2021 – 2022',
    grade: '79.8%',
    details: 'Completed 10th grade with 79.8% distinction at R.G. Matric Higher Secondary School.'
  }
];

const achievements = [
  { title: 'NPTEL Design Thinking - A Primer', org: 'NPTEL — Score: 65, Elite Status' },
  { title: 'AWS Cloud Practitioner (CLF-C02)', org: 'Preparing — Amazon Web Services' },
  { title: '2nd Prize — Agentic AI Loan System', org: 'Fiestaa\'26, KPR Institute of Engineering' },
  { title: 'Top 300 Finalist', org: 'FixForward Ideathon 2026' },
  { title: 'Bonfiglioli Smart Motion Hackathon 2.0', org: '48hr Hackathon — Chennai Institute of Technology' },
  { title: 'SQL Intermediate & Advanced', org: 'HackerRank' },
  { title: 'Java Fundamentals Badge', org: 'Oracle' },
  { title: 'Intro to ML, DL & Computer Vision', org: 'IIT Madras (Online)' },
  { title: 'K! Hacks 3.0', org: 'Participant (Online) — National Level Hackathon' },
  { title: 'Quantathon 3.0', org: 'Participant (Online) — National Level Competition' },
];

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="section-header">
        <p className="section-eyebrow">
          <span className="bar" aria-hidden="true"></span>
          <span className="tag">[06]</span>
          Education &amp; Credentials
        </p>
        <h2 className="section-title">Academic <em>foundation.</em></h2>
      </div>

      <div className={styles.grid}>
        {/* Education Timeline */}
        <div className={styles.timeline}>
          {education.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.lineCol}>
                <div className={styles.dot} />
                <div className={styles.line} />
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.degree}>{edu.degree}</h3>
                    <p className={styles.institution}>{edu.institution}</p>
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.period}>{edu.period}</span>
                    <span className={styles.gradeTag}>{edu.grade}</span>
                  </div>
                </div>
                <p className={styles.details}>{edu.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Block */}
        <motion.div
          className={styles.achieveCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.achieveCard}>
            <div className={styles.cardAccent} aria-hidden="true" />
            <h3 className={styles.achieveTitle}>
              <FiAward className={styles.awardIcon} />
              <span>Certifications</span>
            </h3>

            <div className={styles.achieveList}>
              {achievements.map((a, idx) => (
                <div key={idx} className={styles.achieveItem}>
                  <div className={styles.badgeIcon}>
                    <FiBookOpen />
                  </div>
                  <div>
                    <h4 className={styles.achieveName}>{a.title}</h4>
                    <p className={styles.achieveOrg}>{a.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


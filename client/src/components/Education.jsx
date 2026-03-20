import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import styles from './Education.module.css';

const education = [
  {
    degree: 'B.E. Computer Science & Engineering (Lateral Entry)',
    institution: 'Sri Eshwar College of Engineering (SECE)',
    period: '2025 – 2028',
    grade: 'Current Student',
    details: 'Pursuing B.E. in CSE via lateral entry after completing Diploma. Focused on cloud computing, software development, data structures, and modern web technologies.'
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'Nachimuthu Polytechnic College',
    period: '2022 – 2025',
    grade: '92.5%',
    details: 'Completed Diploma in Computer Engineering with 92.5% aggregate. Built strong foundation in programming, networking, web development and computer fundamentals.'
  },
  {
    degree: 'Secondary School Certificate (SSLC)',
    institution: 'R.G. Matric Higher Secondary School',
    period: '2021 – 2022',
    grade: 'Distinction — 79.8%',
    details: 'Completed 10th grade with 79.8% at R.G. Matric Higher Secondary School.'
  }
];

const achievements = [
  'AWS Free Certification Course — Intellipaat Academy',
  'SQL Intermediate & Advanced — HackerRank',
  'Java Fundamentals Badge — Oracle',
  'Intro to ML, DL & Computer Vision — IIT Madras (Online)',
  'Java Basics — Simplilearn',
  'Student Corporate Ambassador — TN Skills Naan Mudhalvan (2023–25)'
];

export default function Education() {
  return (
    <section className="section" id="education">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Education</h2>
        <div className="section-line" />

        <div className={styles.grid}>
          <div className={styles.eduList}>
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                className={`card ${styles.card}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.header}>
                  <div>
                    <h3 className={styles.degree}>{edu.degree}</h3>
                    <p className={styles.institution}>{edu.institution}</p>
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.period}>{edu.period}</span>
                    <span className="tag">{edu.grade}</span>
                  </div>
                </div>
                <p className={styles.details}>{edu.details}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={`card ${styles.achieveCard}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={styles.achieveTitle}>
              <FiAward /> Certifications & Achievements
            </h3>
            <ul className={styles.achieveList}>
              {achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

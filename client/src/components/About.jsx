import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import styles from './About.module.css';

const info = [
  { icon: <FiUser />, label: 'Name', value: 'Abinivesh M' },
  { icon: <FiMapPin />, label: 'Location', value: 'Tamil Nadu, India' },
  { icon: <FiMail />, label: 'Email', value: 'abiniveshmayilsamy1@gmail.com' },
  { icon: <FiPhone />, label: 'Phone', value: '+91 9361937819' },
];

export default function About() {
  return (
    <section className="section" id="about">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        <div className="section-line" />

        <div className={styles.grid}>
          <div className={styles.text}>
            <p>
              I'm a Cloud & DevOps enthusiast and Computer Science student at Sri Eshwar College of
              Engineering (SECE), admitted via lateral entry after completing my Diploma in Computer
              Engineering with 92.5% at Nachimutha Polytechnic College.
            </p>
            <p>
              With hands-on internship experience at CODEHUB NEXUS and VENKTERTECH, I've built
              scalable MERN stack applications, CMS platforms, and ML-powered systems like a
              computer vision tailoring app and a real-time voice emotion detector.
            </p>
            <p>
              I'm passionate about Cloud (AWS, Azure), DevOps practices, and building intelligent
              applications. I hold certifications in AWS, SQL, Java, and ML from platforms like
              HackerRank, Oracle, IIT Madras, and Intellipaat.
            </p>
          </div>

          <div className={styles.infoGrid}>
            {info.map(({ icon, label, value }) => (
              <div key={label} className={styles.infoItem}>
                <span className={styles.infoIcon}>{icon}</span>
                <div>
                  <p className={styles.infoLabel}>{label}</p>
                  <p className={styles.infoValue}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

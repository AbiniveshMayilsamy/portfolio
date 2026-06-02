import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import styles from './Experience.module.css';

const experiences = [
  {
    role: 'Summer Research Intern',
    company: 'Vicharanashala Lab, IIT Ropar',
    period: 'May 2026 – Present',
    type: 'Internship',
    points: [
      'Currently interning at Vicharanashala Lab, IIT Ropar.',
      'Working on research-oriented projects under faculty guidance.',
      'Gaining exposure to advanced computing and research methodologies.'
    ]
  },
  {
    role: 'Boys Class Representative',
    company: 'Sri Eshwar College of Engineering',
    period: '2026 – Present',
    type: 'Leadership',
    points: [
      'Elected Class Representative for Section II CSE A.',
      'Coordinate between students and faculty for academic and administrative matters.',
      'Organize events and represent the class in institutional activities.'
    ]
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'AlgoTutor',
    period: '2025',
    type: 'Internship',
    points: [
      'Engineered scalable web applications using the MERN stack and MVC architecture.',
      'Implemented secure authentication and user management systems.',
      'Optimized frontend performance and responsiveness across devices.'
    ]
  },
  {
    role: 'CMS & Web Development Intern',
    company: 'VENKTERTECH',
    period: '2023 – 2024',
    type: 'Internship',
    points: [
      'Developed custom CMS solutions via WordPress/Strapi including theme development and plugin integration.',
      'Designed and deployed responsive full stack web applications using HTML/CSS, JS, and Node.js.',
      'Streamlined content workflows using PHP and headless CMS API integrations.'
    ]
  },
  {
    role: 'Student Corporate Ambassador',
    company: 'Nachimuthu Polytechnic College — TN Skills',
    period: '2023 – 2025',
    type: 'Leadership',
    points: [
      'Served as Student Corporate Ambassador at Nachimuthu Polytechnic College.',
      'Promoted skill development programs under the Tamil Nadu Naan Mudhalvan initiative.',
      'Coordinated student participation in upskilling and certification programs.'
    ]
  }
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-header">
        <p className="section-eyebrow">
          <span className="bar" aria-hidden="true"></span>
          <span className="tag">[05]</span>
          Experience / Professional Journey
        </p>
        <h2 className="section-title">Where I've <em>contributed.</em></h2>
      </div>

      <div className={styles.stackList}>
        {experiences.map((exp, idx) => (
          <div
            key={exp.role + exp.company}
            className={styles.stackItem}
            style={{ top: `calc(80px + ${idx * 24}px)`, zIndex: idx + 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardLeft}>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <div className={styles.company}>
                    <FiBriefcase className={styles.companyIcon} />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.period}>{exp.period}</span>
                  <span className={styles.typeBadge}>{exp.type}</span>
                </div>
              </div>
              <ul className={styles.points}>
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className={styles.point}>
                    <span className={styles.bulletDot} aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

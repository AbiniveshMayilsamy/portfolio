import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import styles from './Experience.module.css';

const experiences = [
  {
    role: 'Full Stack Developer Intern',
    company: 'CODEHUB NEXUS',
    period: '2025',
    type: 'Internship',
    points: [
      'Engineered scalable web applications using the MERN stack and MVC architecture.',
      'Implemented secure authentication and user management systems.',
      'Optimized frontend performance and responsiveness across devices.'
    ]
  },
  {
    role: 'CMS Intern',
    company: 'VENKTERTECH',
    period: '2024',
    type: 'Internship',
    points: [
      'Developed custom solutions via WordPress/Strapi including theme development and plugin integration.',
      'Designed content architecture for CMS platforms.',
      'Streamlined content workflows using PHP and headless CMS API integrations.'
    ]
  },
  {
    role: 'Web Content Creation Intern',
    company: 'VENKTERTECH',
    period: '2023',
    type: 'Internship',
    points: [
      'Designed and deployed responsive full stack web applications using HTML/CSS, JS, and Node.js/Python.',
      'Managed RESTful API integration and database operations.',
      'Built functional e-commerce and blog platforms from scratch.'
    ]
  },
  {
    role: 'Student Corporate Ambassador',
    company: 'TN Skills — Naan Mudhalvan',
    period: '2023 – 2025',
    type: 'Leadership',
    points: [
      'Served as Student Corporate Ambassador at Nachimuthu Polytechnic College.',
      'Promoted skill development programs under the Tamil Nadu government initiative.',
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

      <div className={styles.timeline}>
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.role + exp.company}
            className={styles.timelineItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {/* Year Column */}
            <div className={styles.yearCol}>
              <span className={styles.period}>{exp.period}</span>
              <span className={styles.typeBadge}>{exp.type}</span>
            </div>

            {/* Line with Dot */}
            <div className={styles.lineCol}>
              <div className={styles.dot} />
              <div className={styles.line} />
            </div>

            {/* Content Column */}
            <div className={styles.contentCol}>
              <div className={styles.card}>
                <h3 className={styles.role}>{exp.role}</h3>
                <div className={styles.company}>
                  <FiBriefcase className={styles.companyIcon} />
                  <span>{exp.company}</span>
                </div>
                <ul className={styles.points}>
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className={styles.point}>
                      <span className={styles.bulletDot} aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

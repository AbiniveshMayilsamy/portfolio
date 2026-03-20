import { motion } from 'framer-motion';
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
      'Designed content architecture for scalable CMS platforms.',
      'Streamlined content workflows using PHP and headless CMS API integrations.'
    ]
  },
  {
    role: 'Web Content Creation Intern',
    company: 'VENKTERTECH',
    period: '2023',
    type: 'Internship',
    points: [
      'Designed and deployed responsive full stack web applications using HTML/CSS, JS and Node.js/Python.',
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
      'Served as Student Corporate Ambassador at Nachimutha Polytechnic College.',
      'Promoted skill development programs under the Tamil Nadu government initiative.',
      'Coordinated student participation in upskilling and certification programs.'
    ]
  }
];

export default function Experience() {
  return (
    <section className={`section ${styles.expSection}`} id="experience">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Experience</h2>
        <div className="section-line" />

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              className={styles.item}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className={styles.dot} />
              <div className={`card ${styles.card}`}>
                <div className={styles.header}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.company}>{exp.company}</p>
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.period}>{exp.period}</span>
                    <span className="tag">{exp.type}</span>
                  </div>
                </div>
                <ul className={styles.points}>
                  {exp.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

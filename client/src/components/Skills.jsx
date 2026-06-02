import { motion } from 'framer-motion';
import { FiLayout, FiSliders, FiCpu } from 'react-icons/fi';
import styles from './Skills.module.css';

const services = [
  {
    num: '01',
    title: 'Web Development',
    icon: <FiLayout />,
    desc: 'Engineering scalable, high-performance web applications with structured MVC architecture and robust data processing pipelines.',
    features: [
      'Full Stack MERN applications',
      'Custom backend APIs (Express, Flask)',
      'Headless CMS integrations (Strapi, WordPress)',
      'Database schema modeling & operations'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'Flask', 'WordPress', 'Strapi', 'MongoDB', 'MySQL', 'Bootstrap']
  },
  {
    num: '02',
    title: 'Machine Learning & CV',
    icon: <FiCpu />,
    desc: 'Building intelligent algorithms, acoustic models, and computer vision utilities to process audio and visual inputs in real-time.',
    features: [
      'Speech signal voice emotion detection',
      'Computer vision body measurement outline grids',
      'RNN models & model training pipelines',
      'Neural network architectures (TensorFlow)'
    ],
    tech: ['Python', 'TensorFlow', 'OpenCV', 'RNN Models', 'Computer Vision', 'ML Pipelines']
  },
  {
    num: '03',
    title: 'Cloud & DevOps',
    icon: <FiSliders />,
    desc: 'Deploying backend services and establishing streamlined collaboration workflows using modern cloud and Linux system infrastructure.',
    features: [
      'Cloud service architectures (AWS, Azure)',
      'Linux server system administration',
      'Version control workflows & releases',
      'Postman API verification suites'
    ],
    tech: ['AWS', 'Azure', 'Linux', 'Git', 'GitHub', 'Postman', 'VS Code']
  }
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className={styles.bgOverlay} aria-hidden="true" />
      
      <div className="section-header">
        <p className="section-eyebrow">
          <span className="bar" aria-hidden="true"></span>
          <span className="tag">[03]</span>
          Services / What I do
        </p>
        <h2 className="section-title">Three <em>disciplines.</em> One developer.</h2>
      </div>

      <div className={styles.grid}>
        {services.map((service, idx) => (
          <motion.article
            key={service.title}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            {/* Watermark and border accents */}
            <span className={styles.watermark} aria-hidden="true">{service.num}</span>
            <span className={styles.cardAccent} aria-hidden="true" />

            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
            </div>

            <p className={styles.desc}>{service.desc}</p>

            <ul className={styles.featuresList}>
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className={styles.featureItem}>
                  <span className={styles.bulletDot} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className={styles.techWrapper}>
              <h4 className={styles.techHeading}>Technologies:</h4>
              <div className={styles.techTags}>
                {service.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

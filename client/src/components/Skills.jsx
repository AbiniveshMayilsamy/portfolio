import { motion } from 'framer-motion';
import { FiLayout, FiSliders, FiCpu } from 'react-icons/fi';
import styles from './Skills.module.css';

const services = [
  {
    num: '01',
    title: 'Hardware & Embedded Systems',
    icon: <FiCpu />,
    desc: 'Building integrated systems that bridge hardware infrastructure and software applications using microcontrollers and robotics.',
    features: [
      'ESP32 & NVIDIA Jetson Nano development',
      'Robot Operating System (ROS 2)',
      'Hardware-Software integration',
      'Vision-based AGV systems (Neuro-Nav)'
    ],
    tech: ['ESP32', 'NVIDIA Jetson Nano', 'ROS 2', 'Python', 'C++']
  },
  {
    num: '02',
    title: 'Full Stack & Cloud',
    icon: <FiSliders />,
    desc: 'Engineering scalable web applications and cloud-native solutions with modern full stack technologies and AWS infrastructure.',
    features: [
      'MERN Stack web applications',
      'Java Spring Boot backends',
      'AWS Cloud services & deployment',
      'Headless CMS integrations (Strapi, WordPress)'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'Java Spring Boot', 'MongoDB', 'MySQL', 'AWS']
  },
  {
    num: '03',
    title: 'Machine Learning & AI',
    icon: <FiLayout />,
    desc: 'Developing intelligent systems including agentic AI architectures, voice emotion detection, and computer vision pipelines.',
    features: [
      'Agentic AI Loan Approval System',
      'VocalMood — voice emotion detection (RNN)',
      'Computer vision body measurement (OpenCV)',
      'ML model training & inference pipelines'
    ],
    tech: ['Python', 'TensorFlow', 'OpenCV', 'RNN Models', 'ML Pipelines']
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

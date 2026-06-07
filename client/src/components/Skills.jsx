import { motion } from 'framer-motion';
import { FiLayout, FiSliders, FiCloud } from 'react-icons/fi';
import styles from './Skills.module.css';

const services = [
  {
    num: '01',
    title: 'Cloud & Infrastructure',
    icon: <FiCloud />,
    desc: 'Architecting and deploying scalable cloud-native solutions on AWS. Aspiring Linux System Administrator with a strong focus on server management, cloud security, and DevOps workflows.',
    features: [
      'AWS Cloud services & deployment (AWS Certified Cloud Practitioner)',
      'Preparing for SAA-C03 — AWS Certified Solutions Architect',
      'Linux system administration & server management',
      'Cloud security, IAM & cost optimization',
      'CI/CD pipelines & DevOps practices'
    ],
    tech: ['AWS', 'Linux', 'EC2', 'S3', 'IAM', 'Docker', 'CI/CD']
  },
  {
    num: '02',
    title: 'Full Stack Development',
    icon: <FiSliders />,
    desc: 'Engineering scalable web applications with modern full stack technologies, from REST APIs to responsive frontends.',
    features: [
      'MERN Stack web applications',
      'Java Spring Boot backends',
      'Headless CMS integrations (Strapi, WordPress)',
      'Authentication, REST APIs & database design'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'Java Spring Boot', 'MongoDB', 'MySQL']
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


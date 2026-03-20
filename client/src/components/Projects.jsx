import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'Virtual Tailor — Custom Cloth Measurement Using Computer Vision',
    description: 'Python/Flask e-commerce platform using OpenCV and TensorFlow to automate high-accuracy body measurements for remote tailoring. Engineered automated logistics with order tracking and real-time notifications via Twilio (WhatsApp) and SMTP.',
    tags: ['Python', 'Flask', 'OpenCV', 'TensorFlow', 'MySQL', 'Twilio', 'Bootstrap'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    featured: true
  },
  {
    title: 'Vocal Mood — Real-Time Psychiatric Voice Emotion Detection Using ML',
    description: 'ML-powered application using RNNs for real-time psychiatric emotion recognition from speech signals. Engineered a secure data pipeline for mental health monitoring featuring an intuitive dashboard and automated result reporting.',
    tags: ['Python', 'TensorFlow', 'RNN', 'MySQL', 'JavaScript', 'CSS'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    featured: true
  },
  {
    title: 'MERN Stack Web Applications',
    description: 'Engineered scalable web applications using the MERN stack and MVC architecture during internship at CODEHUB NEXUS. Implemented secure authentication and user management systems while optimizing frontend performance.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'MVC'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    featured: false
  },
  {
    title: 'WordPress / Strapi CMS Solutions',
    description: 'Developed custom CMS solutions at VENKTERTECH including theme development, plugin integration and content architecture. Streamlined content workflows using PHP and headless CMS API integrations.',
    tags: ['WordPress', 'Strapi', 'PHP', 'Headless CMS', 'REST API'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    featured: false
  },
  {
    title: 'Full Stack E-Commerce & Blog Platforms',
    description: 'Designed and deployed responsive full stack web applications using HTML/CSS, JavaScript and Node.js/Python. Managed RESTful API integration and database operations for functional e-commerce and blog platforms.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Python', 'REST API'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    featured: false
  }
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Projects</h2>
        <div className="section-line" />

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              className={`card ${styles.card} ${p.featured ? styles.featured : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {p.featured && <span className={styles.featuredBadge}>Featured</span>}
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.description}</p>
              <div className={styles.tags}>
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className={styles.links}>
                <a href={p.github} target="_blank" rel="noreferrer" className={styles.link}>
                  <FiGithub /> Code
                </a>
                {p.live !== '#' && (
                  <a href={p.live} target="_blank" rel="noreferrer" className={styles.link}>
                    <FiExternalLink /> Live
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }} />
        ))}
      </div>

      <div className={styles.inner}>
        {/* Left — Text */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p className={styles.greeting} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            👋 Hello, I'm
          </motion.p>

          <motion.h1 className={styles.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Abinivesh M
          </motion.h1>

          <motion.div className={styles.roles} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className={styles.role}>Cloud & DevOps Enthusiast</span>
            <span className={styles.dot}>•</span>
            <span className={styles.role}>DevOps Learner</span>
            <span className={styles.dot}>•</span>
            <span className={styles.role}>CS Student @ SECE</span>
          </motion.div>

          <motion.p className={styles.bio} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Passionate CS student at SECE with hands-on experience in Cloud (AWS, Azure),
            MERN stack, and ML-powered applications. I love building scalable solutions
            from web apps to intelligent systems.
          </motion.p>

          <motion.div className={styles.actions} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <FiMail /> Get In Touch
            </button>
            <a href="/resume.pdf" download className="btn btn-outline">
              <FiDownload /> Download CV
            </a>
          </motion.div>

          <motion.div className={styles.socials} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <a href="https://github.com/AbiniveshMayilsamy" target="_blank" rel="noreferrer" className={styles.social}>
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/abiniveshm" target="_blank" rel="noreferrer" className={styles.social}>
              <FiLinkedin size={20} />
            </a>
            <a href="mailto:abiniveshmayilsamy1@gmail.com" className={styles.social}>
              <FiMail size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Photo */}
        <motion.div
          className={styles.photoWrap}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.photoRing}>
            <img
              src="/profile.jpg"
              alt="Abinivesh M"
              className={styles.photo}
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div className={styles.photoPlaceholder}>
              <span>AM</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.scrollLine} />
        <span>Scroll Down</span>
      </div>
    </section>
  );
}

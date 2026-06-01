import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.inner}>
        {/* Left */}
        <motion.div className={styles.left} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <span className={styles.tag}>WELCOME TO MY UNIVERSE</span>

          <h1 className={styles.heading}>
            Turning <span className={styles.accent}>Ideas</span><br />
            <span className={styles.accent2}>Into Reality</span>
          </h1>

          <p className={styles.sub}>
            I'm <strong>Abinivesh M</strong>, a passionate{' '}
            <span className={styles.accentText}>Cloud & DevOps Engineer</span>
            <br />dedicated to building scalable, high-performance systems.
          </p>

          <div className={styles.socials}>
            <a href="https://github.com/AbiniveshMayilsamy" target="_blank" rel="noreferrer" className={styles.social}><FiGithub size={22} /></a>
            <a href="https://linkedin.com/in/abiniveshm" target="_blank" rel="noreferrer" className={styles.social}><FiLinkedin size={22} /></a>
            <a href="mailto:abiniveshmayilsamy1@gmail.com" className={styles.social}><FiMail size={22} /></a>
          </div>

          <div className={styles.ctas}>
            <a href="#contact" className={styles.btnPrimary}>
              Let's Collaborate <FiArrowRight />
            </a>
            <a href="/resume.pdf" download className={styles.btnOutline}>
              Get Resume <FiDownload />
            </a>
          </div>
        </motion.div>

        {/* Right — Code Block */}
        <motion.div className={styles.right} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className={styles.codeCard}>
            <div className={styles.codeBar}>
              <div className={styles.dots}>
                <span className={styles.dot1} />
                <span className={styles.dot2} />
                <span className={styles.dot3} />
              </div>
              <span className={styles.fileName}><span className={styles.pulse} />Portfolio.ts</span>
            </div>
            <div className={styles.codeBody}>
              <code>
                {[
                  { n: '01', c: <><span className={styles.kw}>const</span> <span className={styles.var}>developer</span> = {'{'}</> },
                  { n: '02', c: <span className={styles.ml}><span className={styles.prop}>name:</span> <span className={styles.str}>'Abinivesh M'</span>,</span> },
                  { n: '03', c: <span className={styles.ml}><span className={styles.prop}>role:</span> <span className={styles.str}>'Cloud & DevOps'</span>,</span> },
                  { n: '04', c: <span className={styles.ml}><span className={styles.prop}>skills:</span> [<span className={styles.str}>'AWS', 'Azure', 'MERN'</span>],</span> },
                  { n: '05', c: <span className={styles.ml}><span className={styles.prop}>passionate:</span> <span className={styles.bool}>true</span>,</span> },
                  { n: '06', c: <span className={styles.ml}><span className={styles.prop}>motto:</span> <span className={styles.str2}>"Build with Purpose"</span></span> },
                  { n: '07', c: '};' },
                  { n: '08', c: <><span className={styles.kw}>developer</span>.<span className={styles.var}>showcase</span>();</> },
                ].map(({ n, c }) => (
                  <div key={n} className={styles.codeLine}>
                    <span className={styles.lineNum}>{n}</span>
                    <p>{c}</p>
                  </div>
                ))}
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

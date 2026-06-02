import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiAward, FiGithub, FiArrowRight, FiDownload } from 'react-icons/fi';
import styles from './Hero.module.css';

const ROLES = ['Cloud Engineer', 'Full Stack Developer', 'Linux Admin Aspirant'];

function SplitText({ text, className, delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function CountUp({ target, duration = 1500, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const isNum = !isNaN(parseInt(target));
    if (!isNum) { setCount(target); return; }
    const end = parseInt(target);
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{typeof count === 'number' ? count : count}{suffix}</>;
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const cursorGlowRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cycle roles
  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Cursor glow follow
  useEffect(() => {
    const handleMove = (e) => {
      if (!cursorGlowRef.current) return;
      cursorGlowRef.current.style.left = `${e.clientX}px`;
      cursorGlowRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Cursor glow */}
      <div ref={cursorGlowRef} className={styles.cursorGlow} aria-hidden="true" />

      {/* Static bg glows */}
      <div className={styles.heroBgLight} aria-hidden="true" />
      <div className={styles.heroBgLight2} aria-hidden="true" />

      <div className={styles.content}>

        {/* Eyebrow */}
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className={styles.eyebrowBar} />
          <span className={styles.eyebrowTag}>[01]</span>
          <span className={styles.eyebrowText}>Portfolio — 2026</span>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>Available</span>
        </motion.div>

        {/* Big Name — split letter + vertical ticker */}
        <div className={styles.nameRow}>
          <div className={styles.nameWrap}>
            <SplitText text="ABINIVESH" className={styles.nameFirst} delay={0.2} />
            <SplitText text="MAYILSAMY" className={styles.nameLast} delay={0.5} />
          </div>

          {/* Vertical scrolling ticker */}
          <div className={styles.verticalTicker} aria-hidden="true">
            <div className={styles.tickerTrack}>
              {[
                '☁️ Cloud', '🐧 Linux', '⚡ AWS', '🔐 IAM', '🌐 VPC',
                '📦 S3', '🖥️ EC2', '🔧 CLI', '🚀 DevOps', '🔒 SSH',
                '☁️ Cloud', '🐧 Linux', '⚡ AWS', '🔐 IAM', '🌐 VPC',
                '📦 S3', '🖥️ EC2', '🔧 CLI', '🚀 DevOps', '🔒 SSH',
              ].map((item, i) => (
                <span key={i} className={styles.tickerItem}>{item}</span>
              ))}
            </div>
          </div>

          {/* Waving profile photo */}
          <motion.div
            className={styles.photoCol}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.photoGlow} />
            <motion.div
              className={styles.photoFrame}
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/profile.jpeg"
                alt="Abinivesh M"
                className={styles.photo}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className={styles.photoFallback}><span>AM</span></div>
            </motion.div>
            {/* Floating badge */}
            <motion.div
              className={styles.photoBadge}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className={styles.badgeDot} />
              Available for work
            </motion.div>
          </motion.div>
        </div>

        {/* Cycling role */}
        <div className={styles.roleWrap}>
          <motion.span
            key={roleIdx}
            className={styles.role}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {ROLES[roleIdx]}
          </motion.span>
        </div>

        {/* Sub */}
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Designing scalable AWS infrastructure, Linux systems, and full stack
          applications to deliver reliable, high-performance solutions.
        </motion.p>

        {/* Actions */}
        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <button type="button" className="btn shiny-cta" onClick={() => scrollTo('contact')}>
            <span>Let's Connect &nbsp;<FiArrowRight /></span>
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => scrollTo('projects')}>
            <span className="btn-dot" aria-hidden="true" />
            <span>Selected Work</span>
          </button>
          <a
            href="https://drive.google.com/uc?export=download&id=1JJvqBbdG4CX6PbnaDNU9gX6jGsRNRqcd"
            download
            className="btn btn-secondary"
          >
            <FiDownload />
            <span>Download CV</span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          <div className={styles.stat}>
            <span className={styles.statIcon}><FiGithub /></span>
            <span className={styles.statNum}><CountUp target="200" suffix="+" /></span>
            <span className={styles.statLabel}>Contributions</span>
          </div>
          <span className={styles.statSep} />
          <div className={styles.stat}>
            <span className={styles.statIcon}><FiAward /></span>
            <span className={styles.statNum}>Naan Mudhalvan</span>
            <span className={styles.statLabel}>Ambassador</span>
          </div>
          <span className={styles.statSep} />
          <div className={styles.stat}>
            <span className={styles.statIcon}><FiZap /></span>
            <span className={styles.statNum}><CountUp target="100" /></span>
            <span className={styles.statLabel}>PageSpeed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

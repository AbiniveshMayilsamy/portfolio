import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiZap, FiAward, FiGithub, FiArrowRight, FiDownload, FiCode } from 'react-icons/fi';
import styles from './Hero.module.css';
import CodingStats from './CodingStats';
import StarfieldBackground from './StarfieldBackground';
import ThreeAvatar from './ThreeAvatar';

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
          transition={{ duration: 0.6, delay: delay + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
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
    const end = parseInt(target);
    if (isNaN(end)) { setCount(target); return; }
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{count}{suffix}</>;
}

function BadgeCard({ imgSrc, alt, label, sublabel, delay = 0.5, animDelay = 1.2 }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      className={styles.badgeCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
    >
      <motion.img
        src={imgSrc}
        alt={alt}
        className={styles.badgeImg}
        animate={{ rotate: [0, 8, -8, 8, 0] }}
        transition={{ duration: 1.5, delay: animDelay, ease: 'easeInOut' }}
        style={{ transform: 'translateZ(20px)' }}
      />
      <span className={styles.badgeLabel} style={{ transform: 'translateZ(10px)' }}>{label}</span>
      {sublabel && (
        <span className={styles.badgeSublabel} style={{ transform: 'translateZ(12px)' }}>{sublabel}</span>
      )}
    </motion.div>
  );
}



export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const cursorGlowRef = useRef(null);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);

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
      <StarfieldBackground />
      <div ref={cursorGlowRef} className={styles.cursorGlow} aria-hidden="true" />
      <div className={styles.heroBgLight} aria-hidden="true" />
      <div className={styles.heroBgLight2} aria-hidden="true" />

      <div className={styles.heroLayout}>
        {/* LEFT — text content */}
        <div className={styles.content}>
          <motion.div className={styles.eyebrow} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <span className={styles.eyebrowBar} />
            <span className={styles.eyebrowTag}>[01]</span>
            <span className={styles.eyebrowText}>Portfolio — 2026</span>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Available</span>
          </motion.div>

          {/* Name + ticker side by side */}
          <div className={styles.nameRow}>
            <div className={styles.nameWrap}>
              <SplitText text="ABINIVESH" className={styles.nameFirst} delay={0.2} />
              <SplitText text="MAYILSAMY" className={styles.nameLast} delay={0.5} />
            </div>
            <div className={styles.verticalTicker} aria-hidden="true">
              <div className={styles.tickerTrack}>
                {['☁️ Cloud','🐧 Linux','⚡ AWS','🔐 IAM','🌐 VPC','📦 S3','🖥️ EC2','🔧 CLI','🚀 DevOps','🔒 SSH',
                  '☁️ Cloud','🐧 Linux','⚡ AWS','🔐 IAM','🌐 VPC','📦 S3','🖥️ EC2','🔧 CLI','🚀 DevOps','🔒 SSH',
                ].map((item, i) => <span key={i} className={styles.tickerItem}>{item}</span>)}
              </div>
            </div>
          </div>

          <div className={styles.roleWrap}>
            <motion.span key={roleIdx} className={styles.role}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >{ROLES[roleIdx]}</motion.span>
          </div>

          <motion.p className={styles.sub} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}>
            Designing scalable AWS infrastructure, Linux systems, and full stack applications to deliver reliable, high-performance solutions.
          </motion.p>

          <motion.div className={styles.actions} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.1 }}>
            <button type="button" className="btn shiny-cta" onClick={() => scrollTo('contact')}>
              <span>Let's Connect &nbsp;<FiArrowRight /></span>
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => scrollTo('projects')}>
              <span className="btn-dot" aria-hidden="true" /><span>Selected Work</span>
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowStats(true)}>
              <FiCode /><span>Read My Coding Stuff</span>
            </button>
            <a href="/Abinivesh_M_Resume.pdf" download="Abinivesh_M_Resume.pdf" className="btn btn-secondary">
              <FiDownload /><span>Download CV</span>
            </a>
          </motion.div>

          <motion.div className={styles.stats} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1.3 }}>
            <div className={styles.stat}><span className={styles.statIcon}><FiGithub /></span><span className={styles.statNum}><CountUp target="200" suffix="+" /></span><span className={styles.statLabel}>Contributions</span></div>
            <span className={styles.statSep} />
            <div className={styles.stat}><span className={styles.statIcon}><FiAward /></span><span className={styles.statNum}>Naan Mudhalvan</span><span className={styles.statLabel}>Ambassador</span></div>
            <span className={styles.statSep} />
            <div className={styles.stat}><span className={styles.statIcon}><FiZap /></span><span className={styles.statNum}><CountUp target="100" /></span><span className={styles.statLabel}>PageSpeed</span></div>
          </motion.div>
        </div>

        {/* RIGHT — badges + 3D tilt cloud card */}
        <div className={styles.cardCol}>
          <div className={styles.badgesRow}>
            <BadgeCard
              imgSrc="/aws-certified-solutions-architect-associate.png"
              alt="AWS Certified Solutions Architect – Associate"
              label="AWS Certified Solutions Architect"
              sublabel="Associate"
              delay={0.4}
              animDelay={1.0}
            />
            <BadgeCard
              imgSrc="/badge1.png"
              alt="AWS Certified Cloud Practitioner"
              label="AWS Certified Cloud Practitioner"
              sublabel="Foundational"
              delay={0.55}
              animDelay={1.3}
            />
          </div>

          <motion.div
            className={styles.avatarStage}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ThreeAvatar />
          </motion.div>
        </div>
      </div>
      <CodingStats isOpen={showStats} onClose={() => setShowStats(false)} />
    </section>
  );
}

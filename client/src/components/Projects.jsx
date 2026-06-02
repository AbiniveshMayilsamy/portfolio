import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import styles from './Projects.module.css';

const projects = [
  {
    num: '01',
    title: 'Neuro-Nav',
    sub: 'Vision-Based Automated Guided Vehicle (AGV) with ROS 2',
    year: '2026',
    tags: ['ROS 2', 'NVIDIA Jetson', 'Python', 'OpenCV'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    previewType: 'tailor'
  },
  {
    num: '02',
    title: 'Agentic AI Loan System',
    sub: 'AI-Driven Architecture for Autonomous Loan Approval — 2nd Prize Fiestaa\'26',
    year: '2026',
    tags: ['Python', 'Agentic AI', 'ML', 'Automation'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    previewType: 'mern'
  },
  {
    num: '03',
    title: 'VocalMood',
    sub: 'Real-Time Psychiatric Voice Emotion Detection Using RNN',
    year: '2025',
    tags: ['Python', 'TensorFlow', 'RNN', 'MySQL'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    previewType: 'voice'
  },
  {
    num: '04',
    title: 'Virtual Tailor',
    sub: 'Custom Cloth Measurement Using Computer Vision',
    year: '2025',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    previewType: 'tailor'
  },
  {
    num: '05',
    title: 'MERN Stack Applications',
    sub: 'Scalable Full Stack Solutions & CMS Integrations',
    year: '2024',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/AbiniveshMayilsamy',
    live: '#',
    previewType: 'cms'
  }
];

function TextRoll({ text, hover }) {
  return (
    <span className={styles.textRoll} aria-label={text}>
      <span 
        className={styles.textRollRow}
        style={{ transform: hover ? 'translateY(-100%)' : 'translateY(0)' }}
      >
        {text.split('').map((char, i) => (
          <span key={i} className={styles.textRollLetter} style={{ '--i': i }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      <span 
        className={`${styles.textRollRow} ${styles.textRollClone}`} 
        aria-hidden="true"
        style={{ transform: hover ? 'translateY(-100%)' : 'translateY(0)' }}
      >
        {text.split('').map((char, i) => (
          <span key={i} className={styles.textRollLetter} style={{ '--i': i }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Framer Motion spring cursor coordinates
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { stiffness: 250, damping: 25 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    // Position the preview box relative to the mouse cursor
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY - 120);
  };

  const getPreviewContent = (type) => {
    switch (type) {
      case 'tailor':
        return (
          <div className={`${styles.previewCard} ${styles.tailorBg}`}>
            <div className={styles.gridOverlay} />
            <svg viewBox="0 0 100 100" className={styles.svgDraw}>
              {/* Clothing outline */}
              <path d="M20 20 L40 10 L60 10 L80 20 L75 35 L68 35 L68 85 L32 85 L32 35 L25 35 Z" 
                fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3, 3" />
              {/* Scanning laser line */}
              <line x1="10" y1="50" x2="90" y2="50" stroke="#00D4FF" strokeWidth="1.5" className={styles.laserAnim} />
              {/* Measurement indicators */}
              <circle cx="40" cy="10" r="2" fill="var(--accent)" />
              <circle cx="60" cy="10" r="2" fill="var(--accent)" />
              <circle cx="32" cy="50" r="2" fill="var(--accent)" />
              <circle cx="68" cy="50" r="2" fill="var(--accent)" />
            </svg>
            <div className={styles.previewMeta}>
              <span>GRID ALIGNMENT: OK</span>
              <span>CALIBRATING...</span>
            </div>
          </div>
        );
      case 'voice':
        return (
          <div className={`${styles.previewCard} ${styles.voiceBg}`}>
            <div className={styles.waveContainer}>
              <div className={styles.waveBar} />
              <div className={styles.waveBar} />
              <div className={styles.waveBar} />
              <div className={styles.waveBar} />
              <div className={styles.waveBar} />
              <div className={styles.waveBar} />
              <div className={styles.waveBar} />
            </div>
            <div className={styles.previewMeta}>
              <span>EMOTION: HAPPY (85%)</span>
              <span>AUDIO SIGNAL ACTIVE</span>
            </div>
          </div>
        );
      case 'mern':
        return (
          <div className={`${styles.previewCard} ${styles.mernBg}`}>
            <div className={styles.nodeGrid}>
              <div className={styles.nodePoint} />
              <div className={styles.nodeLine} />
              <div className={styles.nodePoint} />
              <div className={styles.nodeLine} />
              <div className={styles.nodePoint} />
            </div>
            <div className={styles.previewMeta}>
              <span>REACT 19 / NODE</span>
              <span>API RESP: 200 OK</span>
            </div>
          </div>
        );
      case 'cms':
        return (
          <div className={`${styles.previewCard} ${styles.cmsBg}`}>
            <div className={styles.cmsLayout}>
              <div className={styles.cmsHeader} />
              <div className={styles.cmsBody}>
                <div className={styles.cmsBlock} />
                <div className={styles.cmsBlock} />
              </div>
            </div>
            <div className={styles.previewMeta}>
              <span>STRAPI v5 ACTIVE</span>
              <span>SCHEMA COMPILED</span>
            </div>
          </div>
        );
      case 'ecommerce':
        return (
          <div className={`${styles.previewCard} ${styles.ecomBg}`}>
            <div className={styles.ecomLayout}>
              <div className={styles.ecomCard} />
              <div className={styles.ecomCard} />
            </div>
            <div className={styles.previewMeta}>
              <span>CART ADDED: +1</span>
              <span>STRIPE CONNECTED</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="section" id="projects" onMouseMove={handleMouseMove}>
      <div className="section-header">
        <p className="section-eyebrow">
          <span className="bar" aria-hidden="true"></span>
          <span className="tag">[02]</span>
          Selected Work / 2024 — 2026
        </p>
        <h2 className="section-title">What I've <em>built</em>.</h2>
      </div>

      <div className={styles.worksList}>
        {projects.map((proj, idx) => (
          <div
            key={proj.num}
            className={styles.workItem}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={styles.workLink}>
              <span className={styles.workNum}>{proj.num}</span>

              <div className={styles.titleCol}>
                <h3 className={styles.workTitle}>
                  <TextRoll text={proj.title} hover={hoveredIndex === idx} />
                </h3>
                <span className={styles.workSub}>{proj.sub}</span>
              </div>

              <div className={styles.tagsCol}>
                {proj.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tagLabel}>
                    {tag}
                  </span>
                ))}
              </div>

              <span className={styles.workYear}>{proj.year}</span>
              
              <div className={styles.linksCol}>
                <a href={proj.github} target="_blank" rel="noreferrer" className={styles.iconLink} aria-label="GitHub Repository">
                  <FiGithub />
                </a>
              </div>
              
              <span className={styles.workArrow} style={{ transform: hoveredIndex === idx ? 'translate(4px, -4px)' : 'none' }}>↗</span>
            </div>

            {/* Mobile preview block inline */}
            {isMobile && (
              <div className={styles.mobilePreview}>
                {getPreviewContent(proj.previewType)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Cursor Preview Box */}
      {!isMobile && hoveredIndex !== null && (
        <motion.div
          className={styles.cursorPreview}
          style={{
            x: cursorX,
            y: cursorY,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {getPreviewContent(projects[hoveredIndex].previewType)}
        </motion.div>
      )}
    </section>
  );
}

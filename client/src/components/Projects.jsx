import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import styles from './Projects.module.css';

const projects = [
  { num: '01', title: 'Neuro-Nav', sub: 'Vision-Based Automated Guided Vehicle (AGV) with ROS 2', year: '2026', tags: ['ROS 2', 'NVIDIA Jetson', 'Python', 'OpenCV'], github: 'https://github.com/AbiniveshMayilsamy', previewType: 'tailor' },
  { num: '02', title: 'Agentic AI Loan System', sub: "AI-Driven Architecture for Autonomous Loan Approval — 2nd Prize Fiestaa'26", year: '2026', tags: ['Python', 'Agentic AI', 'ML', 'Automation'], github: 'https://github.com/AbiniveshMayilsamy', previewType: 'mern' },
  { num: '03', title: 'VocalMood', sub: 'Real-Time Psychiatric Voice Emotion Detection Using RNN', year: '2025', tags: ['Python', 'TensorFlow', 'RNN', 'MySQL'], github: 'https://github.com/AbiniveshMayilsamy', previewType: 'voice' },
  { num: '04', title: 'Virtual Tailor', sub: 'Custom Cloth Measurement Using Computer Vision', year: '2025', tags: ['Python', 'OpenCV', 'TensorFlow', 'Flask'], github: 'https://github.com/AbiniveshMayilsamy', previewType: 'shirt' },
  { num: '05', title: 'MERN Stack Applications', sub: 'Scalable Full Stack Solutions & CMS Integrations', year: '2024', tags: ['MongoDB', 'Express', 'React', 'Node.js'], github: 'https://github.com/AbiniveshMayilsamy', previewType: 'cms' },
];

function TextRoll({ text, hover }) {
  return (
    <span className={styles.textRoll} aria-label={text}>
      <span className={styles.textRollRow} style={{ transform: hover ? 'translateY(-100%)' : 'translateY(0)' }}>
        {text.split('').map((char, i) => (
          <span key={i} className={styles.textRollLetter} style={{ '--i': i }}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
      <span className={`${styles.textRollRow} ${styles.textRollClone}`} aria-hidden="true" style={{ transform: hover ? 'translateY(-100%)' : 'translateY(0)' }}>
        {text.split('').map((char, i) => (
          <span key={i} className={styles.textRollLetter} style={{ '--i': i }}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
    </span>
  );
}

function PreviewContent({ type }) {
  switch (type) {
    case 'tailor':
      return (
        <div className={`${styles.previewCard} ${styles.tailorBg}`}>
          <div className={styles.gridOverlay} />
          <svg viewBox="0 0 100 100" className={styles.svgDraw}>
            {/* AGV body */}
            <rect x="30" y="40" width="40" height="28" rx="4" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
            {/* Wheels */}
            <circle cx="38" cy="72" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
            <circle cx="62" cy="72" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
            <circle cx="38" cy="72" r="2" fill="var(--accent)" />
            <circle cx="62" cy="72" r="2" fill="var(--accent)" />
            {/* Camera/sensor on top */}
            <rect x="44" y="32" width="12" height="8" rx="2" fill="none" stroke="#00ff88" strokeWidth="1" />
            <circle cx="50" cy="36" r="2.5" fill="#00ff88" opacity="0.8" />
            <line x1="50" y1="32" x2="50" y2="40" stroke="none" />
            {/* Scan beam */}
            <line x1="50" y1="30" x2="20" y2="18" stroke="#00ff88" strokeWidth="0.8" strokeDasharray="2,2" className={styles.laserAnim} />
            <line x1="50" y1="30" x2="80" y2="18" stroke="#00ff88" strokeWidth="0.8" strokeDasharray="2,2" className={styles.laserAnim} />
            {/* ROS label */}
            <text x="50" y="58" textAnchor="middle" fill="rgba(153,255,0,0.7)" fontSize="7" fontFamily="monospace">ROS 2</text>
            {/* Ground line */}
            <line x1="15" y1="80" x2="85" y2="80" stroke="rgba(153,255,0,0.2)" strokeWidth="1" />
            {/* Path dots */}
            <circle cx="20" cy="80" r="1.5" fill="var(--accent)" opacity="0.5" />
            <circle cx="50" cy="80" r="1.5" fill="var(--accent)" opacity="0.5" />
            <circle cx="80" cy="80" r="1.5" fill="var(--accent)" opacity="0.5" />
          </svg>
          <div className={styles.previewMeta}><span>NEURO-NAV AGV</span><span>VISION: ACTIVE</span></div>
        </div>
      );
    case 'voice':
      return (
        <div className={`${styles.previewCard} ${styles.voiceBg}`}>
          <div className={styles.waveContainer}>
            {[...Array(7)].map((_, i) => <div key={i} className={styles.waveBar} />)}
          </div>
          <div className={styles.previewMeta}><span>EMOTION: HAPPY (85%)</span><span>AUDIO SIGNAL ACTIVE</span></div>
        </div>
      );
    case 'mern':
      return (
        <div className={`${styles.previewCard} ${styles.mernBg}`}>
          <div className={styles.nodeGrid}>
            <div className={styles.nodePoint} /><div className={styles.nodeLine} />
            <div className={styles.nodePoint} /><div className={styles.nodeLine} />
            <div className={styles.nodePoint} />
          </div>
          <div className={styles.previewMeta}><span>REACT 19 / NODE</span><span>API RESP: 200 OK</span></div>
        </div>
      );
    case 'cms':
      return (
        <div className={`${styles.previewCard} ${styles.cmsBg}`}>
          <div className={styles.cmsLayout}>
            <div className={styles.cmsHeader} />
            <div className={styles.cmsBody}><div className={styles.cmsBlock} /><div className={styles.cmsBlock} /></div>
          </div>
          <div className={styles.previewMeta}><span>STRAPI v5 ACTIVE</span><span>SCHEMA COMPILED</span></div>
        </div>
      );
    case 'shirt':
      return (
        <div className={`${styles.previewCard} ${styles.tailorBg}`}>
          <div className={styles.gridOverlay} />
          <svg viewBox="0 0 100 100" className={styles.svgDraw}>
            <path d="M20 20 L40 10 L60 10 L80 20 L75 35 L68 35 L68 85 L32 85 L32 35 L25 35 Z" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#00ff88" strokeWidth="1.5" className={styles.laserAnim} />
            <circle cx="40" cy="10" r="2" fill="var(--accent)" />
            <circle cx="60" cy="10" r="2" fill="var(--accent)" />
            <circle cx="32" cy="50" r="2" fill="var(--accent)" />
            <circle cx="68" cy="50" r="2" fill="var(--accent)" />
          </svg>
          <div className={styles.previewMeta}><span>GRID ALIGNMENT: OK</span><span>CALIBRATING...</span></div>
        </div>
      );
    default: return null;
  }
}

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="section" id="projects">
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
                {proj.tags.slice(0, 3).map(tag => <span key={tag} className={styles.tagLabel}>{tag}</span>)}
              </div>
              <span className={styles.workYear}>{proj.year}</span>
              <div className={styles.linksCol}>
                <a href={proj.github} target="_blank" rel="noreferrer" className={styles.iconLink} aria-label="GitHub">
                  <FiGithub />
                </a>
              </div>
              <span className={styles.workArrow} style={{ transform: hoveredIndex === idx ? 'translate(4px,-4px)' : 'none' }}>↗</span>
            </div>

            {/* Inline preview — expands on hover */}
            <motion.div
              className={styles.inlinePreview}
              initial={false}
              animate={hoveredIndex === idx ? { height: 160, opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <PreviewContent type={proj.previewType} />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

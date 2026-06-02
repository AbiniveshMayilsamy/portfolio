import { useEffect, useRef } from 'react';
import styles from './StarfieldBackground.module.css';

const NUMBERS = ['01', '00', '10', '11', 'AWS', 'EC2', 'S3', 'IAM', 'CLI', '404', '200', 'SSH', 'TCP', 'DNS', 'VPC', '443', 'CDN', 'API', 'GIT', 'ENV'];

export default function StarfieldBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const count = 28;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = styles.floatNum;
      el.textContent = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];

      const size = 0.65 + Math.random() * 0.7;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 18 + Math.random() * 22;
      const delay = -(Math.random() * duration);
      const opacity = 0.04 + Math.random() * 0.1;

      el.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        font-size: ${size}rem;
        opacity: ${opacity};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;

      container.appendChild(el);
      particles.push(el);
    }

    return () => particles.forEach(el => el.remove());
  }, []);

  return (
    <div className={styles.bg}>
      {/* Orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />
      <div className={styles.orb4} />
      {/* Grid */}
      <div className={styles.grid} />
      {/* Stars */}
      <div className={styles.stars1} />
      <div className={styles.stars2} />
      {/* Floating numbers container */}
      <div ref={containerRef} className={styles.numbersLayer} />
    </div>
  );
}

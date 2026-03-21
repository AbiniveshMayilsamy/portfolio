import { useEffect, useState } from 'react';
import api from '../api';
import styles from './Marquee.module.css';

// Static fallback achievements shown even before any uploads
const STATIC = [
  '🏆 Competition Winner',
  '☁️ AWS Certified — Intellipaat',
  '🎓 IIT Madras — ML & Computer Vision',
  '✅ Oracle Java Fundamentals Badge',
  '🥇 HackerRank SQL Advanced',
  '🎪 TN Skills Naan Mudhalvan Ambassador',
  '🚀 MERN Stack Developer',
  '🤖 ML & Computer Vision Projects',
];

export default function Marquee() {
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    api.get('/api/gallery?category=prize')
      .then(r => setPrizes(r.data))
      .catch(() => {});
  }, []);

  const items = [
    ...prizes.map(p => `🏆 ${p.title}`),
    ...STATIC
  ];

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.sep}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

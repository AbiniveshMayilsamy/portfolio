import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Gallery.module.css';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'event', label: '🎪 Events' },
  { value: 'prize', label: '🏆 Prizes' },
  { value: 'photo', label: '📸 Photos' },
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');

  return (
    <section className="section" id="gallery">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Gallery</h2>
        <div className="section-line" />

        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text2)' }}>
            <p style={{ fontSize: '2.5rem' }}>📸</p>
            <p style={{ marginTop: '0.5rem' }}>Photos coming soon — check back later!</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import styles from './Gallery.module.css';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'event', label: '🎪 Events' },
  { value: 'prize', label: '🏆 Prizes' },
  { value: 'photo', label: '📸 Photos' },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.get('/api/gallery').then(r => setItems(r.data)).catch(() => {});
  }, []);

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);



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
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text2)' }}>
              <p style={{ fontSize: '2.5rem' }}>📸</p>
              <p style={{ marginTop: '0.5rem' }}>No photos yet — upload from the Admin panel!</p>
            </div>
          )}
          {filtered.map((item, i) => (
            <motion.div
              key={item._id}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLightbox(item)}
            >
              <div className={styles.imgWrap}>
                <img src={item.filename} alt={item.title} className={styles.img} />
                <div className={styles.overlay}>
                  <span className={styles.catBadge}>
                    {item.category === 'event' ? '🎪 Event' : item.category === 'prize' ? '🏆 Prize' : '📸 Photo'}
                  </span>
                </div>
              </div>
              <div className={styles.info}>
                <p className={styles.title}>{item.title}</p>
                {item.description && <p className={styles.desc}>{item.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <img src={lightbox.filename} alt={lightbox.title} className={styles.lightboxImg} />
            <div className={styles.lightboxInfo}>
              <span className="tag">
                {lightbox.category === 'event' ? '🎪 Event' : lightbox.category === 'prize' ? '🏆 Prize' : '📸 Photo'}
              </span>
              <p className={styles.lightboxTitle}>{lightbox.title}</p>
              {lightbox.description && <p className={styles.lightboxDesc}>{lightbox.description}</p>}
            </div>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import styles from './Gallery.module.css';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'event', label: '🎪 Events' },
  { value: 'prize', label: '🏆 Prizes' },
  { value: 'photo', label: '📸 Photos' },
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get('/api/gallery');
        setItems(res.data);
      } catch (err) {
        console.error('Error fetching gallery items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <section className="section" id="gallery">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="bar"></span>
            <span>SNAPSHOTS</span>
            <span className="tag">GALLERY</span>
          </div>
          <h2 className="section-title">
            Moments &amp; <em>Achievements</em>
          </h2>
        </div>

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

        {loading ? (
          <div className={styles.loader}>
            <div className={styles.spinner} />
            <p>Loading achievements...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className={styles.grid}>
            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
                onClick={() => setActivePhoto(item)}
              >
                <div className={styles.imgWrap}>
                  <img src={item.filename} alt={item.title} className={styles.img} />
                  <div className={styles.overlay}>
                    <span className={styles.catBadge}>
                      {item.category.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.title}>{item.title}</h3>
                  {item.description && <p className={styles.desc}>{item.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📸</div>
            <h3 className={styles.emptyTitle}>No highlights here yet</h3>
            <p className={styles.emptyDesc}>
              Achievements and events are being uploaded. Please check back later!
            </p>
          </div>
        )}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.lightboxClose} onClick={() => setActivePhoto(null)}>
                &times;
              </button>
              <img
                src={activePhoto.filename}
                alt={activePhoto.title}
                className={styles.lightboxImg}
              />
              <div className={styles.lightboxInfo}>
                <span className={styles.lightboxCat}>
                  {activePhoto.category.toUpperCase()}
                </span>
                <h3 className={styles.lightboxTitle}>{activePhoto.title}</h3>
                {activePhoto.description && (
                  <p className={styles.lightboxDesc}>{activePhoto.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

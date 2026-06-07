import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import axios from 'axios';
import styles from './Gallery.module.css';

const API_BASE = import.meta.env.VITE_API_URL || '';

const EVENTS = [
  { _id: 'e1', filename: '/event 1.jpeg', title: 'Event 1', category: 'event' },
  { _id: 'e2', filename: '/event 2.jpeg', title: 'Event 2', category: 'event' },
  { _id: 'e3', filename: '/event 3.jpeg', title: 'Event 3', category: 'event' },
  { _id: 'e4', filename: '/event 4.jpeg', title: 'Event 4', category: 'event' },
  { _id: 'e5', filename: '/event 5.jpeg', title: 'Event 5', category: 'event' },
  { _id: 'e6', filename: '/event 6.jpeg', title: 'Event 6', category: 'event' },
  { _id: 'e7', filename: '/event 7.jpeg', title: 'Event 7', category: 'event' },
  { _id: 'e8', filename: '/event 8.jpeg', title: 'Event 8', category: 'event' },
];

const CERTIFICATES = [
  { _id: 'c1',  filename: '/Certificate 1.jpeg',     title: 'Certificate 1',  category: 'prize' },
  { _id: 'c2',  filename: '/Certificate 2.jpeg',     title: 'Certificate 2',  category: 'prize' },
  { _id: 'c3',  filename: '/Certificate 3.jpeg',     title: 'Certificate 3',  category: 'prize' },
  { _id: 'c4',  filename: '/Certificate 4.jpeg',     title: 'Certificate 4',  category: 'prize' },
  { _id: 'c5',  filename: '/Certificate 5.jpeg',     title: 'Certificate 5',  category: 'prize' },
  { _id: 'c6',  filename: '/Certificate 6.jpeg',     title: 'Certificate 6',  category: 'prize' },
  { _id: 'c7',  filename: '/Certificate 7.jpeg',     title: 'Certificate 7',  category: 'prize' },
  { _id: 'c8',  filename: '/Certificate 8.jpeg',     title: 'Certificate 8',  category: 'prize' },
  { _id: 'c9',  filename: '/Certificate 9.jpeg',     title: 'Certificate 9',  category: 'prize' },
  { _id: 'c10', filename: '/Certificate 10.jpeg',    title: 'Certificate 10', category: 'prize' },
  { _id: 'c11', filename: '/Certificate 11.jpeg',    title: 'Certificate 11', category: 'prize' },
  { _id: 'c12', filename: '/Certificate 12.jpeg',    title: 'Certificate 12', category: 'prize' },
  { _id: 'c13', filename: '/Certificate 13.jpeg',    title: 'Certificate 13', category: 'prize' },
  { _id: 'c14', filename: '/Certificate 14.jpeg',    title: 'Certificate 14', category: 'prize' },
  { _id: 'c15', filename: '/Certificate 15.jpeg',    title: 'Certificate 15', category: 'prize' },
  { _id: 'c16', filename: '/Certificate 16.jpeg',    title: 'Certificate 16', category: 'prize' },
  { _id: 'c17', filename: '/Certificate 17.jpeg',    title: 'Certificate 17', category: 'prize' },
  { _id: 'c18', filename: '/Certificate 18.jpeg',    title: 'Certificate 18', category: 'prize' },
  { _id: 'c19', filename: '/Certificate 19.jpeg',    title: 'Certificate 19', category: 'prize' },
  { _id: 'c20', filename: '/Certificate 20.jpeg.png',title: 'Certificate 20', category: 'prize' },
  { _id: 'c21', filename: '/Certificate 21.jpeg.png',title: 'Certificate 21', category: 'prize' },
  { _id: 'c22', filename: '/Certificate 22.jpeg.png',title: 'Certificate 22', category: 'prize' },
  { _id: 'c23', filename: '/Certificate 23.png',     title: 'Certificate 23', category: 'prize' },
];

function GalleryCard({ item, onClickItem }) {
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
      className={styles.card}
      onClick={() => onClickItem(item)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
    >
      <img src={item.filename} alt={item.title} className={styles.img} />
    </motion.div>
  );
}

function MarqueeRow({ items, reverse = false, onClickItem }) {
  const doubled = [...items, ...items];
  return (
    <div className={styles.marqueeWrap}>
      <div className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ''}`}>
        {doubled.map((item, i) => (
          <GalleryCard key={i} item={item} onClickItem={onClickItem} />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [apiItems, setApiItems] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/gallery`, { timeout: 8000 })
      .then(res => setApiItems(res.data))
      .catch(() => {});
  }, []);

  const allEvents = [...EVENTS, ...apiItems.filter(i => i.category === 'event')];
  const allCerts  = [...CERTIFICATES, ...apiItems.filter(i => i.category === 'prize')];

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

        <div className={styles.rowLabel}>🎪 Events</div>
        <MarqueeRow items={allEvents} onClickItem={setActivePhoto} />

        <div className={styles.rowLabel}>🏆 Certificates</div>
        <MarqueeRow items={allCerts} reverse onClickItem={setActivePhoto} />

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
                <span className={styles.lightboxCat}>{activePhoto.category.toUpperCase()}</span>
                <h3 className={styles.lightboxTitle}>{activePhoto.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

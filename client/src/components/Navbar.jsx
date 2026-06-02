import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const menuLinks = [
  { label: 'About', index: '01', id: 'about' },
  { label: 'Tech Stack', index: '02', id: 'skills' },
  { label: 'Selected Work', index: '03', id: 'projects' },
  { label: 'Experience', index: '04', id: 'experience' },
  { label: 'Education', index: '05', id: 'education' },
  { label: 'Gallery', index: '06', id: 'gallery' },
  { label: 'FAQs', index: '07', id: 'faq' },
  { label: 'Contact', index: '08', id: 'contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Brand Logo */}
          <div className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            AM<span className={styles.dot}>.</span>
          </div>

          {/* Actions on right */}
          <div className={styles.actions}>
            <button 
              type="button" 
              className="btn shiny-cta shiny-cta--compact" 
              onClick={() => scrollTo('contact')}
            >
              <span>Let's Talk &rarr;</span>
            </button>

            {/* Burger Button */}
            <button
              type="button"
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={styles.burgerBar} />
              <span className={styles.burgerBar} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.overlayGrid} />

            <div className={styles.overlayInner}>
              <div className={styles.overlayHeading}>
                <span className={styles.eyebrow}>[MENU]</span>
                <span className={styles.horizontalLine} />
              </div>

              <nav className={styles.overlayNav}>
                <ul className={styles.overlayList}>
                  {menuLinks.map((link, idx) => (
                    <motion.li
                      key={link.id}
                      className={styles.overlayItem}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    >
                      <button
                        type="button"
                        className={styles.overlayLink}
                        onClick={() => scrollTo(link.id)}
                      >
                        <span className={styles.overlayIndex}>[{link.index}]</span>
                        <span className={styles.overlayLabel}>{link.label}</span>
                        <span className={styles.overlayArrow}>&rarr;</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className={styles.overlayFooter}>
                <p className={styles.copyright}>&copy; 2026 Abinivesh M. All rights reserved.</p>
                <div className={styles.socials}>
                  <a href="https://linkedin.com/in/abiniveshm" target="_blank" rel="noreferrer">LinkedIn</a>
                  <span>/</span>
                  <a href="https://github.com/AbiniveshMayilsamy" target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

const links = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Gallery', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        AM<span>.</span>
      </div>
      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l} onClick={() => scrollTo(l)}>{l}</li>
        ))}
      </ul>
      <button className={styles.hamburger} onClick={() => setOpen(!open)}>
        {open ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>
    </nav>
  );
}

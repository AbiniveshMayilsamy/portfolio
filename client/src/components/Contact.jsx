import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import { FiSend, FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await api.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section ${styles.contactSection}`} id="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-line" />

        <div className={styles.grid}>
          <div className={styles.info}>
            <p className={styles.intro}>
              I'm currently open to internship opportunities and exciting projects.
              Whether you have a question, a project idea, or just want to say hi —
              my inbox is always open!
            </p>
            <div className={styles.contactLinks}>
              <a href="mailto:abiniveshmayilsamy1@gmail.com" className={styles.contactLink}>
                <FiMail className={styles.contactIcon} />
                <div>
                  <p className={styles.contactLabel}>Email</p>
                  <p className={styles.contactValue}>abiniveshmayilsamy1@gmail.com</p>
                </div>
              </a>
              <a href="https://linkedin.com/in/abiniveshm" target="_blank" rel="noreferrer" className={styles.contactLink}>
                <FiLinkedin className={styles.contactIcon} />
                <div>
                  <p className={styles.contactLabel}>LinkedIn</p>
                  <p className={styles.contactValue}>linkedin.com/in/abiniveshm</p>
                </div>
              </a>
              <a href="https://github.com/AbiniveshMayilsamy" target="_blank" rel="noreferrer" className={styles.contactLink}>
                <FiGithub className={styles.contactIcon} />
                <div>
                  <p className={styles.contactLabel}>GitHub</p>
                  <p className={styles.contactValue}>github.com/AbiniveshMayilsamy</p>
                </div>
              </a>
            </div>
          </div>

          <form className={`card ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className={styles.field}>
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                required
              />
            </div>
            {status === 'success' && (
              <p className={styles.success}>✅ Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className={styles.error}>❌ Something went wrong. Please try again.</p>
            )}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FiSend /> {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

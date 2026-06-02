import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import api from '../api';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // Post directly to Express backend
      const res = await api.post('/api/contact', form);
      if (res.data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      console.warn('Backend contact failed, falling back to mailto link', err);
      // Fallback: Open client email client
      window.location.href = `mailto:abiniveshmayilsamy1@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="section-header">
        <p className="section-eyebrow">
          <span className="bar" aria-hidden="true"></span>
          <span className="tag">[08]</span>
          Contact / Get In Touch
        </p>
        <h2 className="section-title">Start a <em>project.</em></h2>
      </div>

      <div className={styles.grid}>
        {/* Info Column */}
        <div className={styles.infoCol}>
          <p className={styles.intro}>
            I'm currently seeking **Full Stack &amp; Machine Learning internships**.
            If you've got an ambitious project, a query, or simply want to chat engineering — let's build something.
          </p>

          <div className={styles.contactLinks}>
            <a href="mailto:abiniveshmayilsamy1@gmail.com" className={styles.contactCard}>
              <div className={styles.iconBox}><FiMail /></div>
              <div className={styles.meta}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>abiniveshmayilsamy1@gmail.com</span>
              </div>
            </a>

            <a href="https://linkedin.com/in/abiniveshm" target="_blank" rel="noreferrer" className={styles.contactCard}>
              <div className={styles.iconBox}><FiLinkedin /></div>
              <div className={styles.meta}>
                <span className={styles.label}>LinkedIn</span>
                <span className={styles.value}>linkedin.com/in/abiniveshm</span>
              </div>
            </a>

            <a href="https://github.com/AbiniveshMayilsamy" target="_blank" rel="noreferrer" className={styles.contactCard}>
              <div className={styles.iconBox}><FiGithub /></div>
              <div className={styles.meta}>
                <span className={styles.label}>GitHub</span>
                <span className={styles.value}>github.com/AbiniveshMayilsamy</span>
              </div>
            </a>
          </div>
        </div>

        {/* Form Column */}
        <motion.div
          className={styles.formCol}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Name</label>
              <input
                className={styles.input}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What should I call you?"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input
                className={styles.input}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="where@can.i.reply"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Your Message</label>
              <textarea
                className={styles.textarea}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Let's coordinate on details..."
                rows={5}
                required
              />
            </div>

            {status === 'success' && (
              <p className={styles.success}>&nbsp; Message submitted successfully!</p>
            )}

            <button type="submit" className="btn shiny-cta" style={{ width: '100%' }} disabled={loading}>
              <span>{loading ? 'Submitting...' : 'Send Message'} &nbsp; <FiSend /></span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}


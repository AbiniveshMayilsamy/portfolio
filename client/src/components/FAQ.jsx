import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import styles from './FAQ.module.css';

const faqs = [
  {
    num: '01',
    question: 'What technologies do you specialize in?',
    answer: 'My core stack revolves around the MERN stack (MongoDB, Express.js, React 19, Node.js) and Python (Flask, OpenCV, TensorFlow). I also work with headless CMS platforms (Strapi, WordPress), version control (Git/GitHub), database modeling (MySQL, MongoDB), and cloud fundamentals (AWS, Azure).'
  },
  {
    num: '02',
    question: 'Are you open to internships or freelance opportunities?',
    answer: 'Yes! I am actively looking for Full Stack Developer and Machine Learning/Python internships. I am also open to freelance projects where I can build responsive websites, integrate APIs, or script automation pipelines.'
  },
  {
    num: '03',
    question: 'Where are you currently studying?',
    answer: 'I am pursuing my B.E. in Computer Science & Engineering at Sri Eshwar College of Engineering, Coimbatore, India. I was admitted via lateral entry after completing my Diploma in Computer Engineering at Nachimuthu Polytechnic College with a 92.5% aggregate.'
  },
  {
    num: '04',
    question: 'Do you offer source code access for your personal projects?',
    answer: 'Absolutely. All my major projects, such as the Virtual Tailor measurement engine and Vocal Mood emotion classification system, are fully open source on my GitHub. You can view the repositories, check the implementation details, or fork them for your own experiments.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section" id="faq">
      <div className="section-header">
        <p className="section-eyebrow">
          <span className="bar" aria-hidden="true"></span>
          <span className="tag">[07]</span>
          Frequently Asked Questions
        </p>
        <h2 className="section-title">Common <em>questions.</em></h2>
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
              <button
                type="button"
                className={styles.questionButton}
                onClick={() => toggleFAQ(idx)}
                aria-expanded={isOpen}
              >
                <span className={styles.questionNum}>[{faq.num}]</span>
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.toggleIcon}>
                  {isOpen ? <FiMinus /> : <FiPlus />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={styles.answerWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.answerText}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

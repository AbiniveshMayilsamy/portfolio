import styles from './Marquee.module.css';

const items = [
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

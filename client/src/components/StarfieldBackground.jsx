import styles from './StarfieldBackground.module.css';

export default function StarfieldBackground() {
  return (
    <div className={styles.bg}>
      <div className={styles.stars1} />
      <div className={styles.stars2} />
      <div className={styles.stars3} />
    </div>
  );
}

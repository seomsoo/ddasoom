// src/components/RecordButton.tsx
import styles from './RecordButton.module.css';

export default function RecordButton() {
  return (
    <div className={`${styles.wrap} mt-20`}>
      <div className={styles.circle}>
        <div className="wave1" />
        <div className="wave2" />
      </div>
    </div>
  );
}

'use client';

import styles from './RecordButton.module.css';

interface RecordButtonProps {
  onClick: () => void;
  isRecording: boolean;
}

export default function RecordButton({ onClick, isRecording }: RecordButtonProps) {
  return (
    <div className={styles.wrap}>
      <div className={`${styles.circle} ${isRecording ? styles.recording : ''}`} onClick={onClick}>
        <div className={`${styles.innerCircle} ${isRecording ? styles.recordingInner : ''}`} />
      </div>
    </div>
  );
}

import styles from './WaveAnimation.module.css';

export default function WaveAnimation() {
  return (
    <div className={styles.wavesContainer}>
      <svg
        className={styles.waves}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className={styles.parallax}>
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(70, 130, 180, 0.7)" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(100, 149, 237, 0.5)" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(135, 206, 250, 0.3)" />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="#87CEFA" />
        </g>
      </svg>
    </div>
  );
}

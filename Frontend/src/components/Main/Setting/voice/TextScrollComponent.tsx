'use client';

import { useEffect } from 'react';

import script from './scriptData';
import styles from './TextScrollComponent.module.css';

interface TextScrollComponentProps {
  isRecording: boolean;
  currentLine: number;
  setCurrentLine: React.Dispatch<React.SetStateAction<number>>;
  onTextEnd: () => void; // 텍스트가 끝날 때 호출되는 함수
}

export default function TextScrollComponent({
  isRecording,
  currentLine,
  setCurrentLine,
  onTextEnd,
}: TextScrollComponentProps) {
  useEffect(() => {
    if (isRecording && currentLine < script.length - 1) {
      const line = script[currentLine];
      const duration = Math.max(3000, line.length * 100);

      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, duration);

      return () => clearTimeout(timeout);
    } else if (isRecording && currentLine >= script.length - 1) {
      // 마지막 줄에 도달한 경우 onTextEnd 호출
      onTextEnd();
    }
  }, [isRecording, currentLine, setCurrentLine, onTextEnd]);

  const visibleLines = 5;
  const startLine = Math.max(0, currentLine - Math.floor(visibleLines / 2));
  const endLine = Math.min(script.length, currentLine + Math.floor(visibleLines / 2));

  return (
    <div className={styles.container}>
      {script.slice(startLine, endLine + 1).map((line, index) => {
        const actualIndex = startLine + index;
        let lineClass = styles.futureLine;

        if (actualIndex < currentLine) {
          lineClass = styles.pastLine;
        } else if (actualIndex === currentLine) {
          lineClass = styles.currentLine;
        }

        // 첫 두 줄 강조 스타일 추가
        if (actualIndex === 0 || actualIndex === 1) {
          lineClass = `${lineClass} ${styles.firstTwoLines}`;
        }

        return (
          <p
            key={actualIndex}
            className={`${styles.textLine} ${lineClass}`}
            style={{
              transform: `translateY(${(index - 2) * 1.2}rem)`,
              opacity: actualIndex === currentLine ? 1 : 0.5,
            }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

import { ReactNode } from 'react';

export interface QAData {
  questions: string[];
  answers: ReactNode[];
}

export interface GroundingData {
  imageQA: QAData;
  soundQA: QAData;
  nothingQA: QAData;
}

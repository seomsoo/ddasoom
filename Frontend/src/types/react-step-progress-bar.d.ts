declare module 'react-step-progress-bar' {
  import * as React from 'react';

  interface ProgressBarProps {
    percent: number;
    filledBackground?: string;
    unfilledBackground?: string;
    height?: number;
    stepPositions?: number[];
    children?: React.ReactNode;
  }

  interface StepProps {
    children: (props: { accomplished: boolean; index: number }) => React.ReactNode;
    position?: number;
    transition?: 'scale' | 'rotate' | 'skew';
  }

  export class ProgressBar extends React.Component<ProgressBarProps> {}
  export class Step extends React.Component<StepProps> {}
}

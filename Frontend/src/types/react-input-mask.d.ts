// src/types/react-input-mask.d.ts
declare module 'react-input-mask' {
  import * as React from 'react';

  export interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string;
    alwaysShowMask?: boolean;
    formatChars?: { [key: string]: string };
    permanents?: number[];
    beforeMaskedValueChange?: (
      newState: { value: string; selection: { start: number; end: number } },
      oldState: { value: string; selection: { start: number; end: number } },
      userInput: string,
    ) => { value: string; selection: { start: number; end: number } } | undefined;
  }

  const InputMask: React.FC<InputMaskProps>;
  export default InputMask;
}

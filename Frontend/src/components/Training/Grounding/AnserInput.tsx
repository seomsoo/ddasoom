import { ChangeEvent } from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AnswerInput({ value, onChange }: AnswerInputProps) {
  return (
    <article className="my-6">
      <span className="text-xl font-nanumBold text-gray5">
        <input
          type="text"
          className="w-full h-full bg-transparent caret-transparent outline-none resize-none text-center"
          placeholder="생각나는 대로 적어주세요"
          value={value}
          onChange={onChange}
        />
      </span>
    </article>
  );
}

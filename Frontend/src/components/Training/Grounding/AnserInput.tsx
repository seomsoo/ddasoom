import { ChangeEvent } from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AnswerInput({ value, onChange }: AnswerInputProps) {
  return (
    <article className="my-8">
      <div className="flex flex-col items-center text-xl font-nanumBold ">
        <input
          type="text"
          className="w-11/12 h-full p-4 rounded-xl border-4 border-[#b2e8b2] bg-white caret-[#b2e8b2] outline-none resize-none text-center
            focus:border-[#6fdc6f] focus:bg-[#f0fff4] transition-colors duration-300"
          placeholder="생각나는 대로 적어주세요!"
          value={value}
          onChange={onChange}
        />
      </div>
    </article>
  );
}

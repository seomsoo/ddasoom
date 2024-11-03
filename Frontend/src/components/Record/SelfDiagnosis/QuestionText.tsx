import React from 'react';

interface QuestionTextProps {
  text: string;
}

export default function QuestionText({ text }: QuestionTextProps) {
  return (
    <h2
      className="text-2xl font-nanumBold mt-10 w-72 h-36 "
      dangerouslySetInnerHTML={{
        __html: text.replace(/(?:\n|,)/g, '<br />'),
      }}
    />
  );
}

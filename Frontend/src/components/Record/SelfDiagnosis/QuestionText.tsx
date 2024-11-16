import Image from 'next/image';

interface QuestionProps {
  question: string;
  gif: string;
}

export default function Question({ question, gif }: QuestionProps) {
  const questionLines = question.split(',').map((line, index) => (
    <span key={index}>
      {line.trim()}
      <br />
    </span>
  ));

  return (
    <div className="mt-5 flex flex-col items-center">
      <span className="font-hakgyoansimR h-24 text-3xl">{questionLines}</span>
      <div className="flex flex-col items-center w-full">
        <div className="w-72 h-72 items-center border-[8px] mt-4 border-[#e4f5db] bg-white rounded-full relative flex justify-center overflow-hidden">
          <Image src={gif} alt="Self Diagnosis Visual" width={192} height={192} className="w-48 h-48" />
        </div>
      </div>
    </div>
  );
}

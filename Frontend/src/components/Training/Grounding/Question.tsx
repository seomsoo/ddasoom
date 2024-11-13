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
      <span className="font-hakgyoansimR h-24 text-3xl ">{questionLines}</span>
      <div className="flex flex-col items-center mt-8 w-full">
        <div className="w-64 h-64 items-center border-[8px] border-[#e4f5db] rounded-full relative overflow-hidden">
          <img src={gif} alt="Grounding Visual" className="w-full h-full items-center flex justify-center" />
        </div>
      </div>
    </div>
  );
}

import { praiseMessages } from '@/constants/PraiseMessages';
import Good from '@/videos/Good.gif';

export function RandomPraise() {
  const randomEncouragement =
    praiseMessages.encouragements[Math.floor(Math.random() * praiseMessages.encouragements.length)];
  const randomReminder = praiseMessages.reminders[Math.floor(Math.random() * praiseMessages.reminders.length)];

  const reminderLines = randomReminder.split(',');

  return (
    <>
      <span className="text-4xl ">{randomEncouragement}</span>

      <img
        src={Good.src}
        className="w-56 h-72 my-12 transition-opacity duration-300 ease-in-out opacity-100 animate-grow"
        alt="Good"
      />
      <div className="text-2xl flex flex-col h-32 space-y-2">
        {reminderLines.map((line, index) => (
          <span key={index} className="text-center">
            {line.trim()}
          </span>
        ))}
      </div>
    </>
  );
}

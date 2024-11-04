import { praiseMessages } from '@/constants/PraiseMessages';
import DdasomiSvg from '@/svgs/ddasomi.svg';

export function RandomPraise() {
  const randomEncouragement =
    praiseMessages.encouragements[Math.floor(Math.random() * praiseMessages.encouragements.length)];
  const randomReminder = praiseMessages.reminders[Math.floor(Math.random() * praiseMessages.reminders.length)];

  const reminderLines = randomReminder.split(',');

  return (
    <>
      <span className="text-4xl ">{randomEncouragement}</span>

      <DdasomiSvg className="w-72 h-72 mt-12" />
      <article className="text-2xl flex flex-col h-32 space-y-2">
        {reminderLines.map((line, index) => (
          <span key={index} className="text-center">
            {line.trim()}
          </span>
        ))}
      </article>
    </>
  );
}

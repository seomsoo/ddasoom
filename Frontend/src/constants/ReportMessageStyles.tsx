import Blue from '@/svgs/Ddasomiz/blueDdasom.svg';
import White from '@/svgs/Ddasomiz/whiteSomi.svg';
import Yellow from '@/svgs/Ddasomiz/yellowSomi.svg';
import Ddasom2 from '@/svgs/greensunglass.svg';

export const reportMessageStyles = (count: number) => {
  const countColor =
    count > 7 ? 'text-green-500' : count > 5 ? 'text-blue-500' : count > 3 ? 'text-yellow-500' : 'text-gray-500';

  const messageColor =
    count > 7 ? 'text-green-800' : count > 5 ? 'text-blue-800' : count > 3 ? 'text-yellow-800' : 'text-gray-500';

  const message = (
    <>
      {count > 3 ? (
        <>
          {count > 7 ? '정말 대단해요!' : count > 5 ? '멋지게 잘 하고 있어요!' : '꾸준히 노력하는 모습이 아주 좋아요!'}
          <span className={countColor}>{count}일</span> 훈련을 성공적으로 이어가고 있어요!
        </>
      ) : (
        <p>
          공황 발작 대처를 위해 꾸준한 훈련이 중요합니다. <br /> 앞으로 함께 연습해볼까요?
        </p>
      )}
    </>
  );

  const icon =
    count > 7 ? (
      <Ddasom2 />
    ) : count > 5 ? (
      <Blue className="w-32 h-24" />
    ) : count > 3 ? (
      <Yellow className="w-36 h-28" />
    ) : (
      <White className="w-36 h-28" />
    );

  return { message, messageColor, icon };
};

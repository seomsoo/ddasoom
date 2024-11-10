import AppleSvg from '@/svgs/apple.svg';
import EarSound from '@/svgs/earSound.svg';
import Footprint from '@/svgs/footPrint.svg';
import { GroundingData } from '@/types/GroundingDataTypes';

export const groundingData: GroundingData = {
  imageQA: {
    questions: [
      '지금 보이는, 이미지는 무엇인가요?',
      '가장 먼저, 보인 색깔은 무엇인가요?',
      '눈앞에 보이는 게, 가볍게 느껴지나요?, 무겁게 느껴지나요?',
      '지금 보이는 이미지는, 차가운 느낌인가요?, 따뜻한 느낌인가요?',
      '이미지를 보고, 어떤 감정이 떠오르나요?',
    ],
    answers: [<AppleSvg key="apple" />, <EarSound key="earSound" />, <Footprint key="footprint" />],
  },
  soundQA: {
    questions: [
      '지금 들리는, 소리는 무엇인가요?',
      '지금 들리는, 소리의 높이는 어떠한가요?',
      '이 소리가, 차분하게 들리나요?, 활기차게 느껴지나요?',
      '소리가 점점 커지나요?, 작아지고 있나요?',
    ],
    answers: [<AppleSvg key="apple" />, <EarSound key="earSound" />, <Footprint key="footprint" />],
  },
  nothingQA: {
    questions: [
      '지금 밟고 있는 곳은, 폭신한가요? 단단한가요?',
      '지금 주변에서, 들리는 소리는 무엇인가요?',
      '지금 어떤 냄새가 나나요?',
      '입안의 작은 맛을, 그대로 느껴보세요., 어떤 맛이 느껴지나요?',
      '지금 손끝에, 닿는 감촉은 어떤가요?, 그대로 느껴보세요.',
    ],
    answers: [<AppleSvg key="apple" />, <EarSound key="earSound" />, <Footprint key="footprint" />],
  },
};

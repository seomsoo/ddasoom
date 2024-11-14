import GroundingCat from '@/videos/Grounding/GroundingCat.gif';
import GroundingClothes from '@/videos/Grounding/GroundingClothes.gif';
import GroundingColor from '@/videos/Grounding/GroundingColor.gif';
import GroundingEar from '@/videos/Grounding/GroundingEar.gif';
import GroundingFamily from '@/videos/Grounding/GroundingFamily.gif';
import GroundingFoot from '@/videos/Grounding/GroundingFoot.gif';
import GroundingHand from '@/videos/Grounding/GroundingHand.gif';
import GroundingLeaf from '@/videos/Grounding/GroundingLeaf.gif';
import GroundingMouse from '@/videos/Grounding/GroundingMouse.gif';
import GroundingNose from '@/videos/Grounding/GroundingNose.gif';
import GroundingSnow from '@/videos/Grounding/GroundingSnow.gif';
import GroundingSound from '@/videos/Grounding/GroundingSound.gif';

export const groundingData = {
  imageQA: [
    { id: '001', question: '지금 보이는, 이미지는 무엇인가요?', gif: GroundingCat.src },
    { id: '002', question: '가장 먼저, 보인 색깔은 무엇인가요?', gif: GroundingColor.src },
    { id: '003', question: '눈앞에 보이는 게, 가볍게 느껴지나요?, 무겁게 느껴지나요?', gif: GroundingLeaf.src },
    { id: '004', question: '지금 보이는 이미지는, 차가운 느낌인가요?, 따뜻한 느낌인가요?', gif: GroundingSnow.src },
    { id: '005', question: '이미지를 보고, 어떤 감정이 떠오르나요?', gif: GroundingFamily.src },
  ],
  soundQA: [
    { id: '006', question: '지금 들리는, 소리는 무엇인가요?', gif: GroundingSound.src, sound: '/sounds/rainy.mp3' },
    {
      id: '007',
      question: '지금 들리는, 소리의 높이는 어떠한가요?',
      gif: GroundingSound.src,
      sound: '/sounds/fire.mp3',
    },
    {
      id: '008',
      question: '이 소리가, 차분하게 들리나요?, 활기차게 느껴지나요?',
      gif: GroundingSound.src,
      sound: '/sounds/bird_valley.mp3',
    },
    {
      id: '009',
      question: '소리가 점점 커지나요?, 작아지고 있나요?',
      gif: GroundingSound.src,
      sound: '/sounds/grassBug.mp3',
    },
  ],
  nothingQA: [
    { id: '010', question: '지금 밟고 있는 곳은, 폭신한가요? 단단한가요?', gif: GroundingFoot.src },
    { id: '011', question: '지금 주변에서, 들리는 소리는 무엇인가요?', gif: GroundingEar.src },
    { id: '012', question: '지금, 어떤 냄새가 나나요?', gif: GroundingNose.src },
    { id: '013', question: '입안의 작은 맛을, 그대로 느껴보세요., 어떤 맛이 느껴지나요?', gif: GroundingMouse.src },
    { id: '014', question: '지금 손끝에, 닿는 감촉은 어떤가요?, 그대로 느껴보세요.', gif: GroundingHand.src },
    { id: '015', question: '입고 있는 옷의, 촉감에 집중해보세요, 어떤 느낌인가요?', gif: GroundingClothes.src },
  ],
};

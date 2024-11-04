import { SelfDiagnosisData } from '@/types/SelfDiagnosisDataTypes';

export const questions: SelfDiagnosisData[] = [
  { id: '1', text: '심장이 두근거리고, 맥박이 빨라진다.', options: ['네', '아니요'] },
  { id: '2', text: '심하게 땀을 흘린다.', options: ['네', '아니요'] },
  { id: '3', text: '두려움으로 인한, 손발 몸에 떨림이 느껴진다.', options: ['네', '아니요'] },
  { id: '4', text: '숨이 가쁘고, 숨 막히는 느낌이 든다.', options: ['네', '아니요'] },
  { id: '5', text: '질식할 것 같은 기분이 든다.', options: ['네', '아니요'] },
  { id: '6', text: '가슴이 답답하고, 불편감이 느껴진다.', options: ['네', '아니요'] },
  { id: '7', text: '구토감이 느껴지고, 속이 불편해진다.', options: ['네', '아니요'] },
  { id: '8', text: '현기증이 오고, 어지럽거나 쓰러질 것 같다.', options: ['네', '아니요'] },
  {
    id: '9',
    text: '내가 아닌 것 같고, 비현실적인 느낌이 든다.',
    options: ['네', '아니요'],
  },
  { id: '10', text: '혹시 이러다 미치는 게, 아닐까 하는 두려움에, 사로잡히게 된다.', options: ['네', '아니요'] },
  { id: '11', text: '죽을 것 같은 공포감이 든다.', options: ['네', '아니요'] },
  { id: '12', text: '감각이 둔해지거나, 따끔거리는 느낌이 든다.', options: ['네', '아니요'] },
  { id: '13', text: '몸에 오한이 나거나, 얼굴이 화끈거린다.', options: ['네', '아니요'] },
];

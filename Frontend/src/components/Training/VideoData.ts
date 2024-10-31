// src/data/videoData.ts
import fireplaceVideo from '@/asset/Video/fireplace.mp4';
import windVideo from '@/asset/Video/wind.mp4';

type VideoData = {
  src?: string;
  text: string;
  type: 'video' | 'text';
};

export const videoData: Record<string, VideoData> = {
  fireplace: {
    src: fireplaceVideo, // import한 비디오 파일 사용
    text: '상단의 소리를 키우고 캠프파이어에 집중하세요',
    type: 'video',
  },
  wind: {
    src: windVideo, // import한 비디오 파일 사용
    text: '상단의 소리를 키우고 바람을 느껴보세요',
    type: 'video',
  },
  other: {
    text: '이 콘텐츠는 비디오가 아닌 다른 유형입니다.',
    type: 'text',
  },
};

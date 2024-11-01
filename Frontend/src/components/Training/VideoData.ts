// src/data/videoData.ts
import fireplaceVideo from '../../../public/videos/fireplace.mp4';
import windVideo from '../../../public/videos/wind.mp4';

type VideoData = {
  src?: string;
  introText: string;
  focusText: string;
  type: 'video' | 'text';
};

export const videoData: Record<string, VideoData> = {
  fireplace: {
    src: fireplaceVideo,
    introText: '상단의 소리를 키우고',
    focusText: '따뜻함을 느껴보세요.',
    type: 'video',
  },
  wind: {
    src: windVideo,
    introText: '상단의 소리를 키우고',
    focusText: '바람을 느껴보세요.',
    type: 'video',
  },
  other: {
    introText: '이 콘텐츠는 비디오가 아닌',
    focusText: '다른 유형입니다.',
    type: 'text',
  },
};

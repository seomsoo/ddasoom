import { VideoData } from '@/types/VideoDataTypes';

import fireplaceVideo from '../../public/videos/fireplace.mp4';
import waveVideo from '../../public/videos/wave.mp4';
import windVideo from '../../public/videos/wind.mp4';

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
  wave: {
    src: waveVideo,
    introText: '상단의 소리를 키우고',
    focusText: '물결을 느껴보세요.',
    type: 'video',
  },
};

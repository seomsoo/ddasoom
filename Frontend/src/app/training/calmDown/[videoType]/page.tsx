// src/app/training/calmdown/[videoType]/page.tsx
import VideoPlayer from '@/components/Training/VideoPlayer';

type PageProps = {
  params: {
    videoType: string;
  };
};

export default function VideoPage({ params }: PageProps) {
  return <VideoPlayer videoType={params.videoType} />;
}

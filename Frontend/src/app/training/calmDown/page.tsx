import VideoSelector from '@/components/Training/VideoSelector';
export default function CalmDownTrainingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">원하는 콘텐츠를 선택하세요</h1>
      <VideoSelector />
    </div>
  );
}

// src/components/VideoSelector.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function VideoSelector() {
  const router = useRouter();

  const handleVideoSelect = (videoType: string) => {
    router.push(`/training/calmDown/${videoType}`);
  };

  return (
    <div className="flex space-x-4">
      <button onClick={() => handleVideoSelect('fireplace')} className="px-4 py-2 bg-blue-500 rounded">
        캠프파이어
      </button>
      <button onClick={() => handleVideoSelect('wind')} className="px-4 py-2 bg-green-500 rounded">
        바람
      </button>
    </div>
  );
}

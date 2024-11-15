'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// 필요한 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

interface SelfDiagnosisProgressProps {
  progressCount: number;
  totalPanicDoubtCount: number;
}

export default function SelfDiagnosisProgress({ progressCount, totalPanicDoubtCount }: SelfDiagnosisProgressProps) {
  const percentage = progressCount ? Math.round((totalPanicDoubtCount / progressCount) * 100) : 0;

  const getStatusText = () => {
    if (percentage <= 25) return '양호';
    if (percentage <= 50) return '주의';
    if (percentage <= 75) return '심각';
    return '위험';
  };

  // 진행률에 따라 색상 적용
  const getBackgroundColor = () => {
    if (percentage > 75) return ['#a78bfa', '#a78bfa', '#a78bfa', '#a78bfa'];
    if (percentage > 50) return ['#a78bfa', '#a78bfa', '#a78bfa', '#e5e7eb'];
    if (percentage > 25) return ['#a78bfa', '#a78bfa', '#e5e7eb', '#e5e7eb'];
    return ['#a78bfa', '#e5e7eb', '#e5e7eb', '#e5e7eb'];
  };

  // Chart.js 데이터와 옵션 설정
  const data = {
    labels: ['Progress', 'Remaining', '', ''],
    datasets: [
      {
        data: [25, 25, 25, 25], // 4등분
        backgroundColor: getBackgroundColor(), // 각 부분 색상
        borderColor: '#ffffff', // 경계선 색상
        borderWidth: 3, // 경계선 두께
      },
    ],
  };

  const options = {
    rotation: -90, // 시작 각도 (위쪽에서 시작)
    circumference: 180, // 반원으로 그리기
    cutout: '70%', // 가운데 빈 공간 비율
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false, // 비율 유지하지 않음
  };

  return (
    <div className="relative flex flex-col items-center">
      <span className="text-lg text-gray-700">공황 증상 의심 체크</span>
      <p className="flex items-baseline mt-1 text-xxs text-gray4">
        <span className="text-lg text-green-500 mr-1">{progressCount}번</span>
        <span>의 자가진단 중</span>
        <span className="text-lg text-green-500 ml-1">{totalPanicDoubtCount}회</span> 공황 증상이 의심되었어요.
      </p>
      <div className="relative  mt-4" style={{ width: '200px', height: '100px' }}>
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-main1 top-10">
          <span className="text-2xl">{percentage}%</span>
          <span className="text-sm mt-1">{getStatusText()}</span>
        </div>
      </div>
    </div>
  );
}

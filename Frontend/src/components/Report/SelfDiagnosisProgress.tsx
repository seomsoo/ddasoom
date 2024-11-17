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
    if (percentage === 0) return '결과 없음';
    if (percentage <= 20) return '양호';
    if (percentage <= 40) return '주의';
    if (percentage <= 60) return '심각';
    if (percentage <= 80) return '위험';
    return '매우 위험';
  };

  // 진행률에 따라 색상 적용
  const getBackgroundColor = () => {
    if (percentage > 80) return ['#dcedc8', '#c5e1a5', '#aed581', '#8bc34a', '#466e18'];
    if (percentage > 60) return ['#dcedc8', '#c5e1a5', '#aed581', '#8bc34a', '#f1f8e9'];
    if (percentage > 40) return ['#dcedc8', '#c5e1a5', '#aed581', '#f1f8e9', '#f1f8e9'];
    if (percentage > 20) return ['#dcedc8', '#c5e1a5', '#f1f8e9', '#f1f8e9', '#f1f8e9'];
    if (percentage === 0) return ['#f1f8e9', '#f1f8e9', '#f1f8e9', '#f1f8e9', '#f1f8e9'];
    return ['#dcedc8', '#f1f8e9', '#f1f8e9', '#f1f8e9', '#f1f8e9'];
  };

  // Chart.js 데이터와 옵션 설정
  const data = {
    labels: ['', '', '', '', ''], // 레이블을 비워두어 표시되지 않도록 함
    datasets: [
      {
        data: [20, 20, 20, 20, 20],
        backgroundColor: getBackgroundColor(), // 각 부분 색상
        borderColor: '#bcfaaa', // 경계선 색상
        borderWidth: 1, // 경계선 두께
      },
    ],
  };

  const options = {
    rotation: -90, // 시작 각도 (위쪽에서 시작)
    circumference: 180, // 반원으로 그리기
    cutout: '65%', // 가운데 빈 공간 비율
    plugins: {
      legend: { display: false }, // 범례 표시하지 않음
      tooltip: { enabled: false }, // 툴팁 비활성화
      datalabels: { display: false }, // 데이터 레이블 비활성화
    },
    maintainAspectRatio: false, // 비율 유지하지 않음
  };

  return (
    <div className="relative flex flex-col items-center w-64 rounded-3xl py-2">
      <div className="relative mt-2" style={{ width: '200px', height: '100px' }}>
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white top-12 font-nanumBold">
          <span className="text-2xl">{percentage}%</span>
          <span className="text-sm mt-1 ">{getStatusText()}</span>
        </div>
      </div>
      <p className="flex items-baseline text-xxs font-nanumBold text-main3 mt-4">
        <span className="text-sm text-[#36a53c] mr-1 font-nanumBold">{progressCount}번</span>
        <span>의 자가진단 중</span>
        <span className="text-sm text-[#ff6f6f] mx-1 font-nanumBold">{totalPanicDoubtCount}번</span> 공황 증상이
        의심되었어요.
      </p>
    </div>
  );
}

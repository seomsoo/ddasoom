import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Chart.js에서 사용할 요소들을 등록합니다.
ChartJS.register(ChartDataLabels, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DailyReportChartProps {
  label: string;
  currentValue: number; // 이번 달 값
  previousValue: number; // 전달 값
}

export default function DailyReportChart({ label, currentValue, previousValue }: DailyReportChartProps) {
  const chartData = {
    labels: ['저번 달', '이번 달'],
    datasets: [
      {
        // label: label,
        data: [previousValue, currentValue],
        backgroundColor: ['rgba(239, 241, 243)', 'rgba(142, 187, 91)'],
      },
    ],
  };

  // 명시적으로 ChartOptions 타입을 지정
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // 비율을 유지하지 않도록 설정
    aspectRatio: 1.5, // 너비와 높이의 비율 설정
    plugins: {
      legend: {
        display: false, // 범례를 표시하지 않도록 설정
      },
      title: {
        display: true,
        text: `${label}`,
        padding: {
          top: 20,
          bottom: 20,
        },
      },
      tooltip: {
        enabled: true, // 툴팁 활성화 (사용자가 막대를 클릭하면 보이는 툴팁)
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        offset: -2,
        formatter: (value: number) => value, // 수치를 막대 위에 표시
      },
    },
    layout: {
      padding: {
        top: -20, // 차트의 상단 여백을 추가하여 타이틀과 막대 그래프 간의 간격 조절
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false, // y축을 표시하지 않도록 설정
      },
      x: {
        grid: {
          display: true, // x축의 기준선 표시
        },
        ticks: {
          display: false, // x축의 레이블을 표시하지 않도록 설정
        },
      },
    },
  };

  return (
    <div style={{ width: '67px', height: '200px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

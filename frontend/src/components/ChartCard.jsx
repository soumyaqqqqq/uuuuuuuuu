
// ChartCard.jsx
import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);









import { useMemo } from 'react';

const baseChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  animation: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#4b5563',
        boxWidth: 14,
        font: { size: 12 }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#6b7280' },
      grid: { display: false }
    },
    y: {
      ticks: { color: '#6b7280' },
      grid: { color: '#e5e7eb' }
    }
  }
};

const ChartCard = ({ title, type, data }) => {
  // Memoize options and data to prevent chartjs re-mounting
  const chartOptions = useMemo(() => baseChartOptions, []);
  const chartData = useMemo(() => data, [data]);

  let chart = null;
  if (type === 'pie') chart = <Pie data={chartData} options={chartOptions} />;
  else if (type === 'bar') chart = <Bar data={chartData} options={chartOptions} />;
  else if (type === 'line') chart = <Line data={chartData} options={chartOptions} />;

  return (
    <div style={{
      backgroundColor: '#f9fafb',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      flex: '1',
      minWidth: '300px',
      maxWidth: '400px',
      height: '420px', // Fixed height to prevent layout shift
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}>
      <h4 style={{ marginBottom: '12px', fontSize: '16px', color: '#374151' }}>{title}</h4>
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        {chart}
      </div>
    </div>
  );
};

export default ChartCard;

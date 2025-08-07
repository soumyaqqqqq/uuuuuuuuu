
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









const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
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
  const chartMap = {
    pie: <Pie data={data} options={chartOptions} />,
    bar: <Bar data={data} options={chartOptions} />,
    line: <Line data={data} options={chartOptions} />
  };

  return (
    <div style={{
      backgroundColor: '#f9fafb',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      flex: '1',
      minWidth: '300px',
      maxWidth: '400px',
      height: '100%', // Fill grid cell
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}>
      <h4 style={{ marginBottom: '12px', fontSize: '16px', color: '#374151' }}>{title}</h4>
      <div style={{ flex: 1, position: 'relative' }}>
        {chartMap[type]}
      </div>
    </div>
  );
};

export default ChartCard;

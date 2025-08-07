import React from 'react';
import ChartCard from '../components/ChartCard';
import {
  topStatesVaccination,
  vaccinationPie,
  infectedPie,
  vaccineInfectionTrend
} from '../data/vaccinationData';

const GraphsPage = () => {
  return (
    <div style={{ marginLeft: '260px', padding: '32px 18px', background: '#f4f6f8', minHeight: '100vh' }}>
      <div style={{
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(44,44,84,0.07)',
        padding: '32px 28px',
        marginBottom: '32px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h1 style={{
          fontSize: '30px',
          fontWeight: 'bold',
          marginBottom: '18px',
          color: '#2e3a59',
          letterSpacing: '1px'
        }}> 
        Vaccination Insights Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: 0 }}>
          Explore vaccination and infection trends across India.
        </p>
      </div>

      <section style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(44,44,84,0.05)',
        padding: '28px 22px',
        marginBottom: '32px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3 style={{ marginBottom: '18px', color: '#4a4a4a', fontWeight: 600 }}>🧩 Distribution Overview</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '28px',
          marginBottom: '10px',
          alignItems: 'start', // ensures chart heights don't misalign the grid
          boxSizing: 'border-box'
        }}>
          <ChartCard title="Vaccination Distribution" type="pie" data={vaccinationPie} />
          <ChartCard title="Infection Distribution" type="pie" data={infectedPie} />
          <ChartCard title="Vaccinated vs Infected Over Time" type="line" data={vaccineInfectionTrend} />
        </div>
      </section>

      <section style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(44,44,84,0.05)',
        padding: '28px 22px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3 style={{ marginBottom: '18px', color: '#4a4a4a', fontWeight: 600 }}>📌 Statewise Trends</h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px'
        }}>
          <ChartCard title="Top 10 States by Vaccination Count" type="bar" data={topStatesVaccination} />
        </div>
      </section>
    </div>
  );
};

export default GraphsPage;

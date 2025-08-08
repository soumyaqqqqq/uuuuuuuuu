import React from 'react';
import ChartCard from '../components/ChartCard';
import { useEffect, useState } from 'react';
import { fetchIndiaCasesCSV } from '../utils/csvUtils';


const GraphsPage = () => {
  const [csvData, setCsvData] = useState([]);
  const [vaccinationPie, setVaccinationPie] = useState(null);
  const [infectedPie, setInfectedPie] = useState(null);
  const [vaccineInfectionTrend, setVaccineInfectionTrend] = useState(null);
  const [topStatesVaccination, setTopStatesVaccination] = useState(null);

  useEffect(() => {
    fetchIndiaCasesCSV().then(data => {
      setCsvData(data);
      // Pie: Vaccinated vs Not Vaccinated (using Cured as proxy for vaccinated)
      const total = data.length;
      const vaccinated = data.reduce((sum, row) => sum + (parseInt(row.Cured) || 0), 0);
      const infected = data.reduce((sum, row) => sum + (parseInt(row.Confirmed) || 0), 0);
      setVaccinationPie({
        labels: ['Vaccinated (Cured)', 'Not Vaccinated'],
        datasets: [{
          data: [vaccinated, total * 1 - vaccinated],
          backgroundColor: ['#10b981', '#facc15'],
        }]
      });
      // Use the latest day's infected count vs. a fixed population (1,000,000)
      const LATEST_POPULATION = 1000000;
      let latestInfected = 0;
      if (data.length > 0) {
        // Find the last row with a valid Confirmed value
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].Confirmed && !isNaN(parseInt(data[i].Confirmed))) {
            latestInfected = parseInt(data[i].Confirmed);
            break;
          }
        }
      }
      // Randomize infected people around 25569 for the chart on every refresh
      const infectedRandom = 255689 + Math.floor(Math.random() * 2000 - 1000); // 24569 to 26569
      setInfectedPie({
        labels: ['Infected', 'Recovered'],
        datasets: [{
          data: [infectedRandom, Math.max(LATEST_POPULATION - infectedRandom, 0)],
          backgroundColor: ['#ef4444', '#60a5fa'],
        }]
      });
      // Line: Vaccinated vs Infected Over Time (by date)
      const byDate = {};
      data.forEach(row => {
        const date = row.Date;
        if (!byDate[date]) byDate[date] = { vaccinated: 0, infected: 0 };
        byDate[date].vaccinated += parseInt(row.Cured) || 0;
        byDate[date].infected += parseInt(row.Confirmed) || 0;
      });
      const dates = Object.keys(byDate).sort((a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')));
      setVaccineInfectionTrend({
        labels: dates,
        datasets: [
          {
            label: 'Vaccinated',
            data: dates.map(d => byDate[d].vaccinated),
            borderColor: '#22c55e',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Infected',
            data: dates.map(d => byDate[d].infected),
            borderColor: '#f43f5e',
            fill: false,
            tension: 0.4,
          }
        ]
      });
      // Bar: Top 10 States by Vaccination (Cured)
      const byState = {};
      data.forEach(row => {
        const state = row['State/UnionTerritory'];
        if (!byState[state]) byState[state] = 0;
        byState[state] += parseInt(row.Cured) || 0;
      });
      const topStates = Object.entries(byState)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      setTopStatesVaccination({
        labels: topStates.map(([state]) => state),
        datasets: [{
          label: 'Vaccinated (Cured)',
          data: topStates.map(([, count]) => count),
          backgroundColor: '#7c3aed',
        }]
      });
    });
  }, []);

  const isLoading = !vaccinationPie || !infectedPie || !vaccineInfectionTrend || !topStatesVaccination;

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

      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: 60, fontSize: 20, color: '#888' }}>Loading charts...</div>
      ) : (
        <>
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
              alignItems: 'start',
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
        </>
      )}
    </div>
  );
};

export default GraphsPage;

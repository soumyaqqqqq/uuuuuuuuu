
import ChartCard from '../components/ChartCard';
import '../styles/LandingPage.css';
import { useState } from 'react';

const LandingPage = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [reminderText, setReminderText] = useState('');

  const handleSetReminder = () => {
    const select = document.getElementById('reminder-date');
    const text = select ? select.options[select.selectedIndex].text : '';
    setReminderText(text);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  return (
    <div className="landing-page">
      <div className="welcome-banner">
        <div className="left">
          <h2>Welcome, Dr. Shabrina</h2>
          <p>Have a nice day at work</p>
          <span className="date">Thursday, 28 Jan 2021</span>
        </div>
        <div className="right">
          <img src="/vite.svg" alt="Doctor" className="doctor-img" />
        </div>
      </div>

      <div className="cards-row">
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <ChartCard title="Patient" value="1032" icon="👩‍⚕️" />
          <span style={{marginTop: 8, color: '#6b7280', fontSize: 14}}>Total patients registered today</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <ChartCard title="Consultation" value="207" icon="💬" />
          <span style={{marginTop: 8, color: '#6b7280', fontSize: 14}}>Consultations completed</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <ChartCard title="Inject" value="128" icon="💉" />
          <span style={{marginTop: 8, color: '#6b7280', fontSize: 14}}>Vaccinations administered</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <ChartCard title="Surgery" value="48" icon="🏥" />
          <span style={{marginTop: 8, color: '#6b7280', fontSize: 14}}>Surgeries performed</span>
        </div>
      </div>

      <div className="calendar-placeholder" style={{background: '#fff', borderRadius: 16, padding: 24, margin: '32px 0', boxShadow: '0 2px 12px rgba(44,44,84,0.05)'}}>
        <h3 style={{marginBottom: 12, color: '#2e3a59'}}>Upcoming Vaccination Drives</h3>
        <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: 12}}>
          <thead>
            <tr style={{background: '#f3f4f6'}}>
              <th style={{padding: 8, borderRadius: 8, textAlign: 'left'}}>Date</th>
              <th style={{padding: 8, borderRadius: 8, textAlign: 'left'}}>Event</th>
              <th style={{padding: 8, borderRadius: 8, textAlign: 'left'}}>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding: 8}}>10 Aug 2025</td>
              <td style={{padding: 8}}>Vaccination Drive - Polio</td>
              <td style={{padding: 8}}>Community Center A</td>
            </tr>
            <tr>
              <td style={{padding: 8}}>15 Aug 2025</td>
              <td style={{padding: 8}}>Vaccination Drive - COVID-19 Booster</td>
              <td style={{padding: 8}}>Health Clinic B</td>
            </tr>
            <tr>
              <td style={{padding: 8}}>22 Aug 2025</td>
              <td style={{padding: 8}}>Vaccination Drive - Hepatitis B</td>
              <td style={{padding: 8}}>School Hall C</td>
            </tr>
          </tbody>
        </table>
        <div style={{marginTop: 20, display: 'flex', alignItems: 'center', gap: 12}}>
          <label htmlFor="reminder-date" style={{fontWeight: 500, color: '#374151'}}>Select date for reminder:</label>
          <select id="reminder-date" style={{padding: '6px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 15}}>
            <option value="10 Aug 2025">10 Aug 2025 - Polio</option>
            <option value="15 Aug 2025">15 Aug 2025 - COVID-19 Booster</option>
            <option value="22 Aug 2025">22 Aug 2025 - Hepatitis B</option>
          </select>
          <button
            style={{padding: '7px 18px', background: '#b14df3ff', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer'}}
            onClick={handleSetReminder}
          >
            Set Reminder
          </button>
        </div>
        {showSnackbar && (
          <div style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 30,
            margin: '0 auto',
            width: 'fit-content',
            background: '#2563eb',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: 8,
            fontWeight: 500,
            fontSize: 16,
            boxShadow: '0 2px 12px rgba(44,44,84,0.15)',
            zIndex: 9999,
            transition: 'opacity 0.3s',
          }}>
            Reminder set for: {reminderText}
          </div>
        )}
      </div>

      <div className="about-section" style={{marginTop: 40, background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(44,44,84,0.05)'}}>
        <h3 style={{marginBottom: 12, color: '#2e3a59'}}>About This App</h3>
        <p style={{marginBottom: 8}}>
          <b>Pages:</b>
          <ul style={{margin: '8px 0 16px 20px'}}>
            <li><b>Landing Page:</b> Quick overview, welcome banner, and stats cards for patient, consultation, injection, and surgery counts.</li>
            <li><b>Graphs Page:</b> Interactive charts visualizing vaccination and infection data from real CSV datasets.</li>
            <li><b>Map Page:</b> Geospatial visualization of vaccination coverage and infection risk by region (using GeoJSON).</li>
            <li><b>Centers Page:</b> List and details of vaccination centers and their schedules.</li>
          </ul>
          <b>Key Components:</b>
          <ul style={{margin: '8px 0 0 20px'}}>
            <li><b>ChartCard:</b> Reusable chart display for bar, pie, and line charts (powered by Chart.js).</li>
            <li><b>SideBar:</b> Navigation menu for switching between pages.</li>
            <li><b>ChennaiMap:</b> Map visualization for city/regional data.</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;

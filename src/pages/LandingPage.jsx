import ChartCard from '../../frontend/src/components/ChartCard';
import '../styles/LandingPage.css';

const LandingPage = () => {
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
        <ChartCard title="Patient" value="1032" icon="👩‍⚕️" />
        <ChartCard title="Consultation" value="207" icon="💬" />
        <ChartCard title="Inject" value="128" icon="💉" />
        <ChartCard title="Surgery" value="48" icon="🏥" />
      </div>

      <div className="calendar-placeholder">
        <h3>Upcoming Schedule (Timeline view)</h3>
        <p>(Coming soon... calendar and vaccine appointments)</p>
      </div>
    </div>
  );
};

export default LandingPage;

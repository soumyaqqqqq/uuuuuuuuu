import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import LandingPage from './pages/LandingPage';
import GraphsPage from './pages/GraphsPage';
import MapPage from './pages/MapPage';
import CentersPage from './pages/CentersPage';

function App() {
  return (
    <div className="app-container" style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '20px', flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/graphs" element={<GraphsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/centers" element={<CentersPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// import { Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';

// function App() {
//   return (
//     <div>
//       <h1>Routing Works</h1>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


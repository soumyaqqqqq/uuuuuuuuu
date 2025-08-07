import React from 'react';
import IndiaVaccinationMap from '../components/ChennaiMap';

const MapPage = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h2>Vaccination Coverage Map</h2>
      <div style={{ marginTop: 24 }}>
        <IndiaVaccinationMap />
      </div>
    </div>
  );
};

export default MapPage;

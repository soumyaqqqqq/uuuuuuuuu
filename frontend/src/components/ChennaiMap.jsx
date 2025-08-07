import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

// Color scale function
function getVaccinationColor(vaccinated) {
  if (vaccinated > 20000000) return '#08519c';
  if (vaccinated > 10000000) return '#3182bd';
  if (vaccinated > 5000000) return '#6baed6';
  if (vaccinated > 2000000) return '#9ecae1';
  if (vaccinated > 1000000) return '#c6dbef';
  if (vaccinated > 500000) return '#deebf7';
  if (vaccinated > 100000) return '#f7fbff';
  return '#ffffff';
}

export default function IndiaVaccinationMap() {
  const [geoData, setGeoData] = useState(null);
  const [data, setData] = useState({});
  const mapRef = useRef();

  useEffect(() => {
    fetch('http://localhost:8000/geojson/wards')
      .then(res => res.json())
      .then(data => setGeoData(data));

    fetch('http://localhost:8000/outbreak/wards')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  const styleFeature = (feature) => {
    const state = feature.properties.st_nm;
    const vaccinated = data[state]?.vaccinated || 0;
    return {
      color: '#999',
      weight: 1,
      fillOpacity: 0.7,
      fillColor: getVaccinationColor(vaccinated),
    };
  };

  const onEachFeature = (feature, layer) => {
    const state = feature.properties.st_nm;
    const vaccinated = data[state]?.vaccinated || 0;
    layer.bindTooltip(`${state}<br/>Vaccinated: ${vaccinated.toLocaleString()}`, { sticky: true });
    layer.on({
      click: () => {
        const map = mapRef.current;
        if (map && layer.getBounds().isValid()) {
          map.fitBounds(layer.getBounds(), { maxZoom: 6 });
        }
      },
    });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <h2 style={{ marginBottom: '10px' }}>India Vaccination Choropleth Map</h2>

      <div style={{
        position: 'relative',
        width: '90vw',
        maxWidth: '1200px',
        height: '80vh',
        border: '2px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <MapContainer
          center={[22.9734, 78.6569]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          whenCreated={mapInstance => { mapRef.current = mapInstance; }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {geoData && (
            <GeoJSON
              data={geoData}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>

        {/* Legend */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          background: 'white',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 0 6px rgba(0,0,0,0.2)',
          fontSize: '12px',
          lineHeight: '1.5',
          maxWidth: '220px'
        }}>
          <b>Vaccination Count (Choropleth)</b>
          <div><span style={{ background: '#08519c', width: 12, height: 12, display: 'inline-block', marginRight: 6 }}></span> &gt; 20,000,000</div>
          <div><span style={{ background: '#3182bd', width: 12, height: 12, display: 'inline-block', marginRight: 6 }}></span> &gt; 10,000,000</div>
          <div><span style={{ background: '#6baed6', width: 12, height: 12, display: 'inline-block', marginRight: 6 }}></span> &gt; 5,000,000</div>
          <div><span style={{ background: '#9ecae1', width: 12, height: 12, display: 'inline-block', marginRight: 6 }}></span> &gt; 2,000,000</div>
          <div><span style={{ background: '#c6dbef', width: 12, height: 12, display: 'inline-block', marginRight: 6 }}></span> &gt; 1,000,000</div>
          <div><span style={{ background: '#deebf7', width: 12, height: 12, display: 'inline-block', marginRight: 6 }}></span> &gt; 500,000</div>
          <div><span style={{ background: '#f7fbff', width: 12, height: 12, display: 'inline-block', marginRight: 6 }}></span> &gt; 100,000</div>
          <div><span style={{ background: '#ffffff', width: 12, height: 12, display: 'inline-block', marginRight: 6, border: '1px solid #ccc' }}></span> ≤ 100,000</div>
        </div>
      </div>
    </div>
  );
}

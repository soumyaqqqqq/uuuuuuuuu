const ChartCard = ({ title, value, icon }) => (
  <div className="card">
    <div className="icon">{icon}</div>
    <div className="text">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  </div>
);

export default ChartCard;

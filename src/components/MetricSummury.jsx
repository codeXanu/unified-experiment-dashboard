export default function MetricSummary({ metrics }) {
    return (
      <div className="metrics-grid">
        {Object.entries(metrics).map(([key, value]) => (
          <div className="metric-box" key={key}>
            <strong>{key}</strong>
            <p>{value}</p>
          </div>
        ))}
      </div>
    );
  }
  
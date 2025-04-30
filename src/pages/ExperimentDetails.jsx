import { useParams } from "react-router-dom";
import experiments from "../data/experiments";
import MetricSummary from "../components/MetricSummury";
import Chart from "../components/Chart";

export default function ExperimentDetails() {
  const { id } = useParams();
  const experiment = experiments.find((exp) => exp.id === id);

  if (!experiment) return <p>Experiment not found</p>;

  return (
    <div className="container">
      <h2 className="text-xl font-semibold text-blue-500 m-1" >{experiment.name}</h2>
      <MetricSummary metrics={experiment.metrics} />
      <Chart data={experiment.chartData} />
    </div>
  );
}

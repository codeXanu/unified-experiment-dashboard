import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function Chart({ data }) {
  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: "Effect Size Over Time",
        data: data.values,
        fill: true,
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "#4F46E5",
        tension: 0.4
      }
    ]
  };

  return <Line data={chartData} />;
}

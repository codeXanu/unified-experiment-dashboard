import { Link } from "react-router-dom";

export default function Experiment({ experiment }) {
  const statusColor = experiment.status === "Running" ?  "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800" ;
  return (
    <Link to={`/experiment/${experiment.id}`}
    >
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden mb-4 mt-4">

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{experiment.name}</h2>
              <p className="text-sm text-gray-500">Started: {experiment.startDate}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
              {experiment.status}
            </span>
          </div>
        
          <div className="mt-4 grid grid-cols-3 gap-2 ">
            {Object.entries(experiment.metrics).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-2 rounded border border-blue-500">
                <p className="text-xs text-gray-500">{key}</p>
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

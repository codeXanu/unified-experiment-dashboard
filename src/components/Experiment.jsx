import { Link } from "react-router-dom";

export default function Experiment({ experiment }) {
  return (
    <Link to={`/experiment/${experiment.id}`}
    >
      <div className="card bg-white rounded-2xl shadow p-4 border border-gray-200 " >
        <div>
            <h3 className="text-xl font-semibold text-gray-800 m-1" >{experiment.name}</h3>
            <p className="text-md text-blue-500 m-1" >Start Date: {experiment.startDate}</p>
        </div>
        <p className="text-md text-blue-500 m-1" >
          {
            experiment.status ==="Running" ? 
            <span className="inline-flex items-center rounded-md bg-blue-300 px-2 py-1 text-xs font-medium text-gray-900 ">
                {experiment.status}
            </span> 
            :
            <span className="inline-flex items-center rounded-md bg-green-300 px-2 py-1 text-xs font-medium text-gray-900 ">
                {experiment.status}
            </span> 
          }
           
        </p>
      </div>
    </Link>
  );
}

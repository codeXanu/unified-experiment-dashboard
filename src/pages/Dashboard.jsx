import React from "react";
import Experiment from "../components/Experiment";
import experiments from '../data/experiments'

export default function Dashboard() {
    return(
        <div className="container">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
            <select
            //   value={continent}
            //   onChange={(e) => setContinent(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <option value="">Status</option>
                <option  value="completed">Completed</option>
                <option  value="running">Running</option>
            
            </select>

        <select
        //   value={country}
        //   onChange={(e) => setCountry(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Start Date</option>
          
            <option value="something">01/04/2025</option>
         
        </select>

        <select
            //   value={continent}
            //   onChange={(e) => setContinent(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <option value="">Metrics</option>
            
                <option  value="running">Running</option>
            
            </select>

        <button
        //   onClick={resetFilters}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Clear Filters
        </button>
      </div>
        <h1 className="text-4xl font-bold text-blue-600 mb-3" >All Experiments</h1>
        <div className="experiment-list">
          {experiments.map((exp) => (
            <Experiment key={exp.id} experiment={exp} />
          ))}
        </div>
      </div>
    )
}
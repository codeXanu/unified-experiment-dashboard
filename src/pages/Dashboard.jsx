import React from "react";
import Experiment from "../components/Experiment";
// import experiments from '../data/experiments'

export default function Dashboard() {
    const [filteredExperiments, setFilteredExperiments ] = React.useState([])
    const [experimentDate, setExperimentDate] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [experiments, setExperiments] = React.useState([]);
    // console.log(status)
    // console.log(experimentDates)
    
    const startDates = [...new Set(experiments.map(exp => exp.startDate))];
    // console.log(startDates);
    // console.log(experimentDate)

    React.useEffect(() => {
        async function fetchExperiments() {
            try {
                const res = await fetch('https://plankton-app-lxvci.ondigitalocean.app/api/experiments');
                const data = await res.json();
                setExperiments(data);
                setFilteredExperiments(data); // Initialize display
            } catch (err) {
                console.error('Failed to fetch experiments:', err);
            }
        }
    
        fetchExperiments();
    }, []);
    

    React.useEffect(()=>{
        let filtered = experiments ;
        if (status) {
            filtered = filtered.filter((exp) =>
              exp.status.toLowerCase() === status.toLowerCase()
            );
        }
        if(experimentDate) {
            filtered = filtered.filter((exp) =>
                exp.startDate === experimentDate
              );  
        }
        setFilteredExperiments(filtered)
    },[status, experimentDate, experiments])

    function resetFilters() {
        setStatus("")
        setExperimentDate("")
    }

    
    return(
        <div className="container">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <option value="">Status</option>
                <option  value="Completed">Completed</option>
                <option  value="Running">Running</option>
            </select>

        <select
          value={experimentDate}
          onChange={(e) => setExperimentDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Start Date</option>
            { startDates.map((date, index)=>(
                <option key={index} value={date} >{date}</option>
            ) )}
         
        </select>

        <select
            //   value={continent}
            //   onChange={(e) => setContinent(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <option value="">Metrics</option>
                <option  value="running">Metrics</option>
            </select>

        <button
          onClick={resetFilters}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Clear Filters
        </button>
      </div>
        <h1 className="text-4xl font-bold text-blue-600 mb-3" >All Experiments</h1>
        <div className="experiment-list">
          {filteredExperiments.map((exp) => (
            <Experiment key={exp.id} experiment={exp} />
          ))}
        </div>
      </div>
    )
}
import React from "react";
import Experiment from "../components/Experiment";


export default function Dashboard() {
    const [filteredExperiments, setFilteredExperiments] = React.useState([]);
    const [experimentDate, setExperimentDate] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [experiments, setExperiments] = React.useState([]);
    const [showMetricsFilters, setShowMetricsFilters] = React.useState(false);
    
    // Metrics filters
    const [effectSizeRange, setEffectSizeRange] = React.useState({ min: 0, max: 10 });
    const [confidenceRange, setConfidenceRange] = React.useState({ min: 0, max: 100 });
    const [steadyState, setSteadyState] = React.useState("All");
    
    const startDates = [...new Set(experiments.map(exp => exp.startDate))];

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
    
    // Apply all filters whenever any filter changes
    React.useEffect(() => {
        let filtered = experiments;
        
        // Status filter
        if (status) {
            filtered = filtered.filter((exp) =>
              exp.status.toLowerCase() === status.toLowerCase()
            );
        }
        
        // Date filter
        if(experimentDate) {
            filtered = filtered.filter((exp) =>
                exp.startDate === experimentDate
            );  
        }
        
        // Effect Size filter
        filtered = filtered.filter(exp => {
            // Parse the percentage value (removing the % sign)
            const effectSize = parseFloat(exp.metrics["Effect Size"]);
            return effectSize >= effectSizeRange.min && effectSize <= effectSizeRange.max;
        });
        
        // Confidence Interval filter
        filtered = filtered.filter(exp => {
            // Parse the percentage value (removing the % sign)
            const confidence = parseFloat(exp.metrics["Confidence Interval"]);
            return confidence >= confidenceRange.min && confidence <= confidenceRange.max;
        });
        
        // Steady State filter
        if (steadyState !== "All") {
            filtered = filtered.filter(exp => 
                exp.metrics["Steady State"] === steadyState
            );
        }
        
        setFilteredExperiments(filtered);
    }, [
        status, 
        experimentDate, 
        experiments, 
        effectSizeRange, 
        confidenceRange, 
        steadyState
    ]);

    // Reset all filters
    function resetFilters() {
        setStatus("");
        setExperimentDate("");
        setEffectSizeRange({ min: 0, max: 10 });
        setConfidenceRange({ min: 0, max: 100 });
        setSteadyState("All");
    }
    
    // Handle range input changes
    const handleRangeChange = (setter, field, value) => {
        setter(prev => ({
            ...prev,
            [field]: parseFloat(value)
        }));
    };

    return(
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <h1 className="text-5xl font-bold text-blue-600 mb-8 text-center ">All Experiments</h1>
                
                {/* Basic Filters (Status and Date) */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-2 rounded w-full sm:w-1/4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Running">Running</option>
                    </select>

                    <select
                        value={experimentDate}
                        onChange={(e) => setExperimentDate(e.target.value)}
                        className="border p-2 rounded w-full sm:w-1/4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Start Date</option>
                        {startDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>

                    <button
                        onClick={() => setShowMetricsFilters(!showMetricsFilters)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                    >
                        {showMetricsFilters ? 'Hide Metrics Filters' : 'Show Metrics Filters'}
                    </button>

                    <button
                        onClick={resetFilters}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                    >
                        Clear All Filters
                    </button>
                </div>
                
                {/* Metrics Filters */}
                {showMetricsFilters && (
                    <div className="bg-white shadow rounded-lg p-4 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Filter by Metrics</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Effect Size Filter */}
                            <div className="border rounded-md p-4">
                                <h3 className="font-medium mb-2">Effect Size (%)</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <label className="text-sm text-gray-600">Min: {effectSizeRange.min}%</label>
                                            <span className="text-sm text-gray-600">{effectSizeRange.min}%</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="10" 
                                            step="0.1"
                                            value={effectSizeRange.min}
                                            onChange={(e) => handleRangeChange(setEffectSizeRange, "min", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <label className="text-sm text-gray-600">Max: {effectSizeRange.max}%</label>
                                            <span className="text-sm text-gray-600">{effectSizeRange.max}%</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="10" 
                                            step="0.1"
                                            value={effectSizeRange.max}
                                            onChange={(e) => handleRangeChange(setEffectSizeRange, "max", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Confidence Interval Filter */}
                            <div className="border rounded-md p-4">
                                <h3 className="font-medium mb-2">Confidence Interval (%)</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <label className="text-sm text-gray-600">Min: {confidenceRange.min}%</label>
                                            <span className="text-sm text-gray-600">{confidenceRange.min}%</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="100" 
                                            step="1"
                                            value={confidenceRange.min}
                                            onChange={(e) => handleRangeChange(setConfidenceRange, "min", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <label className="text-sm text-gray-600">Max: {confidenceRange.max}%</label>
                                            <span className="text-sm text-gray-600">{confidenceRange.max}%</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="100" 
                                            step="1"
                                            value={confidenceRange.max}
                                            onChange={(e) => handleRangeChange(setConfidenceRange, "max", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Steady State Filter */}
                            <div className="border rounded-md p-4">
                                <h3 className="font-medium mb-2">Steady State</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            checked={steadyState === "All"}
                                            onChange={() => setSteadyState("All")}
                                            className="mr-2"
                                        />
                                        All
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            checked={steadyState === "Yes"}
                                            onChange={() => setSteadyState("Yes")}
                                            className="mr-2"
                                        />
                                        Yes
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            checked={steadyState === "No"}
                                            onChange={() => setSteadyState("No")}
                                            className="mr-2"
                                        />
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 bg-gray-50 p-3 rounded-md">
                            <p className="text-sm text-gray-600">
                                Showing {filteredExperiments.length} of {experiments.length} experiments
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Experiment List */}
            <div className="experiment-list">
                {filteredExperiments.length > 0 ? (
                    filteredExperiments.map((exp) => (
                        <Experiment key={exp.id} experiment={exp} />
                    ))
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow text-center">
                        <p className="text-lg text-gray-600 mb-4">No experiments match your current filters.</p>
                        <button 
                            onClick={resetFilters}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
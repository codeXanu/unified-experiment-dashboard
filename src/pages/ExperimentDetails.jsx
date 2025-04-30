import React, {useRef} from "react";
import { useParams } from "react-router-dom";
import experiments from "../data/experiments";
import MetricSummary from "../components/MetricSummury";
import Chart from "../components/Chart";
import ChartByD3 from "../components/ChartByD3";
import { useReactToPrint } from "react-to-print";

export default function ExperimentDetails() {
   
  const { id } = useParams();
  const experiment = experiments.find((exp) => exp.id === id);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  if (!experiment) return <p>Experiment not found</p>;
  return (
    <>
        <div className="container" ref={contentRef} >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-blue-500 m-1 " >{experiment.name}</h2>
                {
                    experiment.status === "Running" ?
                    <h2  className="inline-flex items-center rounded-md bg-blue-300 text-gray-900 px-2 py-1 text-xs font-medium " > {experiment.status}</h2> :
                    <h2  className="inline-flex items-center rounded-md bg-green-300 text-gray-900 px-2 py-1 text-xs font-medium " > {experiment.status}</h2>
                }
               
            </div>    
        <MetricSummary metrics={experiment.metrics} />
        <Chart data={experiment.chartData} />
        <div className="mt-15">
            <ChartByD3 data={experiment.chartData} />
        </div>
        </div>
        <div className="text-right m-2">
            <button onClick={reactToPrintFn}  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" >Print</button>
        </div>
    </>
  );
}

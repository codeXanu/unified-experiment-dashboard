import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import experiments from "../data/experiments";
import MetricSummary from "../components/MetricSummury";
import Chart from "../components/Chart";
import ChartByD3 from "../components/ChartByD3";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';




export default function ExperimentDetails() {
  const { id } = useParams();
  const experiment = experiments.find((exp) => exp.id === id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  


  if (!experiment) return <p>Experiment not found</p>;

  // Function to generate and download CSV
  const downloadCSV = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add experiment details
    csvContent += `Experiment Name,${experiment.name}\n`;
    csvContent += `Status,${experiment.status}\n`;
    csvContent += `Start Date,${experiment.startDate}\n\n`;
    
    // Add metrics
    csvContent += "Metrics\n";
    Object.entries(experiment.metrics).forEach(([key, value]) => {
      csvContent += `${key},${value}\n`;
    });
    
    csvContent += "\nChart Data\n";
    csvContent += "Date,Value\n";
    
    // Add chart data
    experiment.chartData.dates.forEach((date, index) => {
      csvContent += `${date},${experiment.chartData.values[index]}\n`;
    });
    
    // Create download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${experiment.name}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDropdownOpen(false);
  };

  function downloadPDF() {
    const input = document.getElementById('pdfContent');
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });
  
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('experiment-report.pdf');
    });
  } 

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {/* MODIFIED: Added targetRef to the container div for PDF capture */}
        <div className="p-8" id="pdfContent" >
            <div className="flex items-center justify-between" >
            <h2 className="text-xl font-semibold text-blue-500 m-1">{experiment.name}</h2>
            {experiment.status === "Running" ? (
                <h2 className="inline-flex items-center rounded-md bg-blue-300 text-gray-900 px-2 py-1 text-xs font-medium">
                {experiment.status}
                </h2>
            ) : (
                <h2 className="inline-flex items-center rounded-md bg-green-300 text-gray-900 px-2 py-1 text-xs font-medium">
                {experiment.status}
                </h2>
            )}
            </div>
            {/* MODIFIED: Added class for better PDF styling */}
            <div className="flex flex-col">
                <MetricSummary metrics={experiment.metrics} />
                <Chart data={experiment.chartData} />
                <div className="mt-15 flex justify-center">
                    <ChartByD3 data={experiment.chartData} />
                </div>
            </div>
        </div>
      
      {/* MODIFIED: Added class to hide during PDF export */}
        <div className="text-right m-2 relative pdf-hide">
            <div className="inline-block">
            <button
                onClick={toggleDropdown}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer flex items-center"
            >
                Export ▼
            </button>
            
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                    <li>
                    {/* MODIFIED: Changed to use react-to-pdf handler */}
                    <button
                        onClick={downloadPDF}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                        Download as PDF
                    </button>
                    </li>
                    <li>
                    <button
                        onClick={downloadCSV}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                        Download as CSV
                    </button>
                    </li>
                </ul>
                </div>
            )}
            </div>
        </div>

     
    </>
  );
}
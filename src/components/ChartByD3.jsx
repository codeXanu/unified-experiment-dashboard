import React from "react";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ChartByD3 ({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const chart = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.dates)
      .range([0, width])
      .padding(0.3);

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data.values)])
      .nice()
      .range([height, 0]);

    chart.append("g").call(d3.axisLeft(y));
      
    // horizontal grid lines
    chart.append("g")
    .attr("class", "grid")
    .call(
      d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat("") // removes tick labels
    )
    .selectAll("line")
    .attr("stroke", "#e0e0e0")
    .attr("stroke-dasharray", "8");

    chart
      .selectAll(".bar")
      .data(data.values)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (_, i) => x(data.dates[i]))
      .attr("y", (d) => y(d))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d))
      .attr("fill", "#4F46E5");
  }, [data]);

  return <svg ref={chartRef}></svg>;
}

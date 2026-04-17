import { useState } from "react";
import "./App.css";
import { scaleLinear, scaleBand } from "d3";

const data = [
  { count: 6, name: "Hantavirus" },
  { count: 7, name: "Tularemia" },
  { count: 7, name: "Dengue" },
  { count: 9, name: "Ebola" },
  { count: 11, name: "E. coli" },
  { count: 15, name: "Tuberculosis" },
  { count: 17, name: "Salmonella" },
  { count: 18, name: "Vaccinia" },
  { count: 54, name: "Brucella" },
];

const labels = data.map((d) => d.name);
const blueLabels = data.map((d) => (d.count < 8 ? d.name : null));

const width = 600;
const height = 400;
const marginSides = 24;
const marginTop = 24;
const marginBottom = 4;
const marginLinesTop = 32;
const marginLinesBottom = 12;

export default function App() {
  // scaleLinear
  const xScale = scaleLinear()
    .domain([0, 55])
    .range([marginSides, width - marginSides]);

  // scaleBand
  const yScale = scaleBand()
    .domain(labels)
    .range([height - marginBottom, marginTop]) //reversing range means first items are plotted at bottom
    .padding(0.34);

  const lines = [...Array(11).keys()].map((n) => (n + 1) * 5);

  const tickLabels = [...Array(12).keys()].map((n) => n * 5);

  const allLines = lines.map((l, i) => (
    <line
      key={i}
      x1={xScale(l)}
      y1={marginLinesTop}
      x2={xScale(l)}
      y2={height - marginLinesBottom}
      stroke="#ebebeb"
      strokeWidth={1}
    />
  ));

  const allTicks = tickLabels.map((t, i) => (
    <text
      key={i}
      x={xScale(t)}
      y={24}
      textAnchor="middle"
      fontSize={12}
      fill="#838383"
    >
      {t}
    </text>
  ));

  const allLabels = data.map((d, i) => (
    <text
      key={i}
      x={blueLabels.includes(d.name) ? xScale(d.count) + 32 - marginSides : 32}
      y={yScale(d.name) + yScale.bandwidth() / 2}
      textAnchor="start"
      dominantBaseline="middle"
      fontSize={14}
      fill={blueLabels.includes(d.name) ? "#076FA2" : "#ffffff"}
    >
      {d.name}
    </text>
  ));

  const xAxis = (
    <line
      x1={marginSides}
      y1={marginLinesTop}
      x2={marginSides}
      y2={height - marginLinesBottom}
      stroke="#08060d"
      strokeWidth={1}
    />
  );

  const allBars = data.map((d, i) => (
    <rect
      key={i}
      x={marginSides}
      y={yScale(d.name)}
      height={yScale.bandwidth()}
      width={xScale(d.count) - marginSides} // -margin because x starts at margin
      fill="#076FA2"
    />
  ));

  return (
    <>
      <section className="hero">
        <div className="text-group hero-text">
          <svg width={width} height={10}>
            <line
              x1={0}
              y1={0}
              x2={width - 80}
              y2={0}
              stroke="#E5011C"
              strokeWidth={1}
            />
            <rect width={36} height={10} fill="#E5011C" />
          </svg>
          <h1>Escape artists</h1>
          <p>Number of laboratory-acquired infections, 1970-2021.</p>
        </div>
        <svg width={width} height={height}>
          <rect width={width} height={height} fill="#ffffff" />
          {allLines}
          {allBars}
          {xAxis}
          {allTicks}
          {allLabels}
        </svg>
        <div className="text-group meta-text">
          <p className="source">
            Sources: Laboratory-Acquired Infection Database; American Biological
            Safety Association
          </p>
          <p className="source">The Economist</p>
        </div>
      </section>
    </>
  );
}

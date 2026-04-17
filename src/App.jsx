import "./App.css";
import { scaleLinear, scaleBand } from "d3";
import { VerticalLines } from "./VerticalLines";

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

const MARGIN = {
  top: 16,
  bottom: 0,
  left: 24,
  right: 24,
  lines: 8,
};

const marginLinesTop = 8;
const marginLinesBottom = 8;

const boundsWidth = width - MARGIN.left - MARGIN.right;
const boundsHeight = height - MARGIN.top - MARGIN.bottom;

export default function App() {
  // scaleLinear
  const xScale = scaleLinear().domain([0, 55]).range([0, boundsWidth]);

  // scaleBand
  const yScale = scaleBand()
    .domain(labels)
    .range([boundsHeight, 0]) //reversing range means first items are plotted at bottom
    .padding(0.34);

  const allLabels = data.map((d, i) => (
    <text
      key={i}
      x={blueLabels.includes(d.name) ? xScale(d.count) + 8 : 8}
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
      x1={0}
      y1={marginLinesTop}
      x2={0}
      y2={boundsHeight - marginLinesBottom}
      stroke="#08060d"
      strokeWidth={1}
    />
  );

  const allBars = data.map((d, i) => (
    <rect
      key={i}
      x={0} // x starts at 0, relative to bounding box
      y={yScale(d.name)}
      height={yScale.bandwidth()}
      width={xScale(d.count)}
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
          <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
            <rect width={boundsWidth} height={boundsHeight} fill="#ffffff" />

            <g transform={`translate(0, ${MARGIN.lines})`}>
              <VerticalLines
                xScale={xScale}
                pixelsPerTick={50}
                boundsHeight={boundsHeight}
                MARGIN={MARGIN.lines}
              />
            </g>
            {allBars}
            {xAxis}
            {allLabels}
          </g>
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

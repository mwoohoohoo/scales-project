export const VerticalLines = ({
  xScale,
  pixelsPerTick,
  boundsHeight,
  MARGIN,
}) => {
  const range = xScale.range();

  const width = range[1] - range[0];
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

  return (
    <>
      {/* Ticks and labels */}
      {xScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value} transform={`translate(${xScale(value)}, 0)`}>
          <line y2={boundsHeight - MARGIN * 2} stroke="#ebebeb" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: `translateY(-${MARGIN}px)`,
              fill: "#838383",
              fontSize: "12px",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

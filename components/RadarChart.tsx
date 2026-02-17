"use client";

interface RadarChartProps {
  data: {
    structure: number;
    substance: number;
    impact: number;
    authenticity: number;
  };
  size?: number;
}

export function RadarChart({ data, size = 240 }: RadarChartProps) {
  const center = size / 2;
  const radius = (size - 60) / 2; // Leave room for labels
  
  // 4 axes at 90° intervals (top, right, bottom, left)
  const axes = [
    { label: "structure", angle: -90, value: data.structure },
    { label: "substance", angle: 0, value: data.substance },
    { label: "impact", angle: 90, value: data.impact },
    { label: "authenticity", angle: 180, value: data.authenticity },
  ];

  // Convert angle + distance to x,y coordinates
  const polarToCartesian = (angle: number, distance: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: center + distance * Math.cos(radian),
      y: center + distance * Math.sin(radian),
    };
  };

  // Generate grid lines (circles at 25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1];
  
  // Generate the data polygon points
  // Normalize scores: category averages are typically 5-10, so normalize to 0-1 based on max 10
  const dataPoints = axes.map((axis) => {
    const normalizedValue = Math.min(axis.value / 10, 1); // Max score per category is 10
    return polarToCartesian(axis.angle, normalizedValue * radius);
  });

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Label positions (slightly outside the chart)
  const labelPositions = axes.map((axis) => {
    const pos = polarToCartesian(axis.angle, radius + 25);
    return { ...pos, label: axis.label, value: axis.value };
  });

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={axes
              .map((axis) => {
                const p = polarToCartesian(axis.angle, level * radius);
                return `${p.x},${p.y}`;
              })
              .join(" ")}
            fill="none"
            stroke="var(--border-default)"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {axes.map((axis) => {
          const end = polarToCartesian(axis.angle, radius);
          return (
            <line
              key={axis.label}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="var(--border-default)"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill="var(--accent)"
          fillOpacity={0.2}
          stroke="var(--accent)"
          strokeWidth="2"
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="var(--accent)"
          />
        ))}

        {/* Labels */}
        {labelPositions.map((pos) => (
          <g key={pos.label}>
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-[var(--text-tertiary)]"
              style={{ fontSize: "11px" }}
            >
              {pos.label}
            </text>
            <text
              x={pos.x}
              y={pos.y + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-semibold fill-[var(--text-primary)]"
              style={{ fontSize: "12px" }}
            >
              {pos.value.toFixed(1)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

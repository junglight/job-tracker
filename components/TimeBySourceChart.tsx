"use client";

import {
  PieChart,
  Pie,
  Sector,
  PieSectorShapeProps,
} from "recharts";

type ChartData = {
  source: string;
  hours: number;
};

const COLORS = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f472b6",
  "#a78bfa",
  "#fb7185",
];

function CustomPieSlice(props: PieSectorShapeProps) {
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      stroke="#ffffff"
    />
  );
}

export default function TimeBySourceChart({
  data,
}: {
  data: ChartData[];
}) {
  return (
    <PieChart width={500} height={300}>
      <Pie
        data={data}
        dataKey="hours"
        nameKey="source"
        outerRadius={100}
        shape={CustomPieSlice}
        label={({ name, percent }) =>
        `${name} ${((percent ?? 0) * 100).toFixed(1)}%`
        }
      />
    </PieChart>
  );
}
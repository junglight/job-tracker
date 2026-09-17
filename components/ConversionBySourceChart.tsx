"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";

type ChartData = {
  source: string;
  conversionRate: number;
};

const COLORS = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f472b6",
  "#a78bfa",
  "#fb7185",
];

export default function ConversionBySourceChart({
  data,
}: {
  data: ChartData[];
}) {
  return (
  <div>
    <BarChart
      width={600}
      height={300}
      data={data}
    >
      <XAxis 
        dataKey="source" 
        interval={0}
        angle={-20}
        textAnchor="end"
        height={70}
      />

      <YAxis domain={[0, 110]} />

      <Bar dataKey="conversionRate">
        <LabelList
          dataKey="conversionRate"
          position="top"
          formatter={(value) => `${Number(value).toFixed(1)}%`}
        />

        {data.map((entry, index) => (
          <Cell
            key={entry.source}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Bar>
    </BarChart>
        <p className="mt-2 text-xs text-zinc-500">
        Conversion Rate = percentage of applications from a source that reached Phone Screen or beyond.
        </p>
  </div>
);
}
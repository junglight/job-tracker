"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  source: string;
  conversionRate: number;
};

export default function ConversionBySourceChart({
  data,
}: {
  data: ChartData[];
}) {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
    >
      <XAxis dataKey="source" />
      <YAxis domain={[0, 100]} />
      <Bar
        dataKey="conversionRate"
        fill="#60a5fa"
      />
    </BarChart>
  );
}
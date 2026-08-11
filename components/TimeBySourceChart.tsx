"use client";

import { PieChart, Pie } from "recharts";

type ChartData = {
  source: string;
  hours: number;
};

export default function TimeBySourceChart({
  data,
}: {
  data: ChartData[];
}) {
  return (
    <div>
      {/* <p className="mb-4 text-white">
        {JSON.stringify(data)}
      </p> */}

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="hours"
          nameKey="source"
          outerRadius={100}
          fill="#60a5fa"
          stroke="#ffffff"
          label
        />
      </PieChart>
    </div>
  );
}
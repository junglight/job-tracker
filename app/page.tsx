import Link from "next/link";
import { supabase } from "@/lib/supabase";
import TimeBySourceChart from "@/components/TimeBySourceChart";
import ConversionBySourceChart from "@/components/ConversionBySourceChart";
export const dynamic = "force-dynamic";

type Application = {
  id: string;
  company: string;
  role: string;
  source: string;
  status: string;
  time_spent_hours: number | null;
  created_at: string;
};

export default async function Home() {

  // Get active applications
  const { data, error } = await supabase
    .from("applications")
    .select("id, company, role, source, status, time_spent_hours, created_at")
    .eq("archived", false)
    .order("created_at", { ascending: false });

  if (error) {
    return <main>Error: {error.message}</main>;
  }

  const applications = (data ?? []) as Application[];

  // 1. Total applications
  const totalApplications = applications.length;


  // 2. Applications that reached phone screen or beyond
  const convertedStatuses = [
    "Phone Screen",
    "Interviewing",
    "Onsite",
    "Offer",
  ];

  const convertedApplications = applications.filter((application) =>
    convertedStatuses.includes(application.status)
  );

  const conversionRate =
    totalApplications > 0
      ? (convertedApplications.length / totalApplications) * 100
      : 0;


  // 3. Total hours spent
  const totalHours = applications.reduce(
    (total, application) =>
      total + Number(application.time_spent_hours || 0),
    0
  );

  const averageHoursPerInterview =
    convertedApplications.length > 0
      ? totalHours / convertedApplications.length
      : 0;

      const timeBySource: Record<string, number> = {};

applications.forEach((application) => {
  const source = application.source;

  if (!timeBySource[source]) {
    timeBySource[source] = 0;
  }

  timeBySource[source] += Number(
    application.time_spent_hours || 0
  );
});

// 3.a. Time by source data for chart
  const timeBySourceData = Object.entries(timeBySource).map(
    ([source, hours]) => ({
      source,
      hours,
    })
  );

    // 4. Find best source
    const sourceStats: Record<
      string,
      { total: number; converted: number }
    > = {};

  applications.forEach((application) => {
    if (!sourceStats[application.source]) {
      sourceStats[application.source] = {
        total: 0,
        converted: 0,
      };
    }

    sourceStats[application.source].total += 1;

    if (convertedStatuses.includes(application.status)) {
      sourceStats[application.source].converted += 1;
    }
  });

  const conversionBySourceData = Object.entries(sourceStats).map(
  ([source, stats]) => ({
    source,
    conversionRate:
      stats.total > 0
        ? (stats.converted / stats.total) * 100
        : 0,
  })
);

  let bestSource = "-";
  let bestConversionRate = 0;

  Object.entries(sourceStats).forEach(([source, stats]) => {
    const rate = stats.converted / stats.total;

    if (rate > bestConversionRate) {
      bestConversionRate = rate;
      bestSource = source;
    }
  });


  return (
    <main className="p-8">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Job Search ROI Dashboard
        </h1>

        <Link
          href="/applications"
          className="underline font-medium"
        >
          View Applications
        </Link>
      </div>


      {/* ROI metric cards */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm">
        <p className="text-sm text-zinc-400">
            Total Applications
          </p>

        <p className="mt-2 text-3xl font-bold">            
          {totalApplications}
          </p>
        </div>


      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm">
        <p className="text-sm text-zinc-400">
            Phone Screen Conversion
          </p>

        <p className="mt-2 text-3xl font-bold">  
            {conversionRate.toFixed(1)}%
          </p>
        </div>


      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm">
        <p className="text-sm text-zinc-400">
            Avg Hours per Interview
          </p>

        <p className="mt-2 text-3xl font-bold">  
            {averageHoursPerInterview.toFixed(1)}
          </p>
        </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm">
        <p className="text-sm text-zinc-400">
            Best Source
          </p>

        <p className="mt-2 text-3xl font-bold">  
            {bestSource}
          </p>
        </div>

      </div>

      <section className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Time Spent by Source
        </h2>

        <TimeBySourceChart data={timeBySourceData} />
      </section>

      <section className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Conversion Rate by Source
        </h2>

        <ConversionBySourceChart data={conversionBySourceData} />
      </section>

      
      {/* Recent applications */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Recent Applications
        </h2>

        <table className="w-full border-collapse">
          <thead className="bg-zinc-100 text-black">
            <tr>
              <th className="border p-3 text-left">Company</th>
              <th className="border p-3 text-left">Role</th>
              <th className="border p-3 text-left">Source</th>
              <th className="border p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.slice(0, 5).map((application) => (
              <tr key={application.id}>
                <td className="border p-3 text-white">
                  <Link
                    href={`/applications/${application.id}`}
                    className="text-blue-600 underline"
                  >
                    {application.company}
                  </Link>
                </td>

                <td className="border p-3">
                  {application.role}
                </td>

                <td className="border p-3">
                  {application.source}
                </td>

                <td className="border p-3">
                  {application.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
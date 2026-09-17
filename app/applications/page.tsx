import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; source?: string }>;
}) {
  const { search, status, source } = await searchParams;

  let query = supabase
  .from("applications")
  .select("*")
  .eq("archived", false);

if (search) {
  query = query.or(
    `company.ilike.%${search}%,role.ilike.%${search}%`
  );
}
if (status) {
  query = query.eq("status", status);
}

  if (source) {
  query = query.eq("source", source);
}
const { data: applications, error } = await query;

if (error) {
  return (
    <main>
      <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-red-300">
        Error: {error.message}
      </div>
    </main>
  );
}

if (!applications || applications.length === 0) {
  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold">Applications</h1>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-zinc-400">
          No applications yet.
        </p>
      </div>
    </main>
  );
}
  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Applications</h1>
      <form className="mb-6  flex flex-wrap gap-3">
        <input
          type="text"
          name="search"
          defaultValue={search || ""}
          placeholder="Search company or role"
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
        />
        <select
          name="status"
          defaultValue={status || ""}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
        >
          <option value="">All statuses</option>
          <option>Waiting</option>
          <option>Rejected</option>
          <option>Phone Screen</option>
          <option>Interviewing</option>
          <option>Onsite</option>
          <option>Offer</option>
          <option>Withdrawn</option>
        </select>

        <select
          name="source"
          defaultValue={source || ""}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
        >
          <option value="">All sources</option>
          <option>LinkedIn</option>
          <option>Cold Email</option>
          <option>Recruiter</option>
          <option>Referral</option>
          <option>Company Website</option>
          <option>Other</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-white px-4 py-2 font-medium text-black hover:bg-zinc-200"
        >
          Search
        </button>

      </form>
    
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full border-collapse">
        <thead className="bg-zinc-900">

          <tr>
            <th className="p-3 text-left text-sm font-semibold text-zinc-300">Company</th>
            <th className="p-3 text-left text-sm font-semibold text-zinc-300">Role</th>
            <th className="p-3 text-left text-sm font-semibold text-zinc-300">Source</th>
            <th className="p-3 text-left text-sm font-semibold text-zinc-300">Status</th>
            <th className="p-3 text-left text-sm font-semibold text-zinc-300">Date Applied</th>
            <th className="p-3 text-left text-sm font-semibold text-zinc-300">Hours</th>
          </tr>
        </thead>

        <tbody>
          {applications?.map((application) => (
            <tr key={application.id}>
              <td className="border p-3">
                <Link
                  href={`/applications/${application.id}`}
                  className="font-medium text-blue-600  underline">
                    
                  {application.company}
                </Link></td>
                            <td className="border p-3">{application.role}</td>
              <td className="border p-3">{application.source}</td>
              <td className="border p-3">{application.status}</td>
              <td className="border p-3">{application.date_applied
                  ? new Date(application.date_applied).toLocaleDateString()
                  : "-"}
              </td>
              <td className="border p-3">{application.time_spent_hours}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </main>
  );
}
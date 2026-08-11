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
    return <div className="p-8">Error: {error.message}</div>;
  }
  if (!applications || applications.length === 0) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Applications</h1>
      <p>No applications yet.</p>
    </main>
  );
}
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Applications</h1>
      <form className="mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search || ""}
          placeholder="Search company or role"
          className="border rounded p-2 mr-2"
        />
        <select
          name="status"
          defaultValue={status || ""}
          className="border rounded p-2 mr-2"
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
          className="border rounded p-2 mr-2"
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
          className="rounded bg-black px-4 py-2 text-white"
        >
          Search
        </button>

      </form>

      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="bg-zinc-100">

          <tr>
            <th className="border p-3 text-left">Company</th>
            <th className="border p-3 text-left">Role</th>
            <th className="border p-3 text-left">Source</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Date Applied</th>
            <th className="border p-3 text-left">Hours</th>
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
    </main>
  );
}
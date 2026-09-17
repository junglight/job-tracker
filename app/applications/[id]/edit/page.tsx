import { updateApplication } from "./actions";

import { supabase } from "@/lib/supabase";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const updateApplicationWithId = updateApplication.bind(null, id);

  const { data: application, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return <main className="p-8">Error: {error.message}</main>;
  }

  if (!application) {
    return <main className="p-8">Application not found.</main>;
  }

  return (
    <main className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Application
      </h1>

    <form action={updateApplicationWithId} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Company</label>
          <input
            name="company"
            defaultValue={application.company}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            name="role"
            defaultValue={application.role}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            defaultValue={application.status}
            className="w-full border rounded p-2"
          >
            <option>Waiting</option>
            <option>Rejected</option>
            <option>Phone Screen</option>
            <option>Interviewing</option>
            <option>Onsite</option>
            <option>Offer</option>
            <option>Withdrawn</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Source</label>
          <select
            name="source"
            defaultValue={application.source}
            className="w-full border rounded p-2"
          >
            <option>LinkedIn</option>
            <option>Cold Email</option>
            <option>Recruiter</option>
            <option>Referral</option>
            <option>Company Website</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date Applied</label>
          <input
            type="date"
            name="date_applied"
            defaultValue={application.date_applied || ""}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Time Spent (hours)</label>
          <input
            type="number"
            name="time_spent_hours"
            step="0.25"
            min="0"
            defaultValue={application.time_spent_hours}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Job URL</label>
          <input
            type="url"
            name="job_url"
            defaultValue={application.job_url || ""}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            defaultValue={application.notes || ""}
            rows={4}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save Changes
        </button>

      </form>
    </main>
  );
}
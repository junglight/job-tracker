import { addApplication } from "./actions";

export default function NewApplicationPage() {
  return (
    <main className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Application</h1>

      <form action={addApplication} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-300">Company</label>
          <input
            type="text"
            name="company"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-zinc-300">Role</label>
          <input
            type="text"
            name="role"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-zinc-300">Source</label>
          <select
            name="source"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            required
          >
            <option value="">Select source</option>
            <option>LinkedIn</option>
            <option>Cold Email</option>
            <option>Recruiter</option>
            <option>Referral</option>
            <option>Company Website</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-zinc-300">Date Applied</label>
          <input
            type="date"
            name="date_applied"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-zinc-300">Time Spent (hours)</label>
          <input
            type="number"
            name="time_spent_hours"
            step="0.25"
            min="0"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-zinc-300">Status</label>
          <select
            name="status"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            required
          >
            <option value="">Select status</option>
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
          <label className="block mb-1 text-sm font-medium text-zinc-300">Job URL</label>
          <input
            type="url"
            name="job_url"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-zinc-300">Notes</label>
          <textarea
            name="notes"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-white px-4 py-2 font-medium text-black hover:bg-zinc-200"
        >
          Add Application
        </button>
      </form>
    </main>
  );
}
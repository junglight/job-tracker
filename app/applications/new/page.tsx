import { addApplication } from "./actions";

export default function NewApplicationPage() {
  return (
    <main className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Application</h1>

      <form action={addApplication} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Company</label>
          <input
            type="text"
            name="company"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            name="role"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Source</label>
          <select
            name="source"
            className="w-full border rounded p-2"
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
          <label className="block mb-1 font-medium">Date Applied</label>
          <input
            type="date"
            name="date_applied"
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
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            className="w-full border rounded p-2"
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
          <label className="block mb-1 font-medium">Job URL</label>
          <input
            type="url"
            name="job_url"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Application
        </button>
      </form>
    </main>
  );
}
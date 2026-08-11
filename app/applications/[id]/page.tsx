import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { archiveApplication } from "./actions";

export default async function ApplicationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const archiveApplicationWithId = archiveApplication.bind(null, id);

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
        {application.company}
      </h1>

      <div className="space-y-3">
        <p><strong>Role:</strong> {application.role}</p>
        <p><strong>Source:</strong> {application.source}</p>
        <p><strong>Status:</strong> {application.status}</p>
        <p><strong>Date Applied:</strong> {application.date_applied || "-"}</p>
        <p><strong>Time Spent:</strong> {application.time_spent_hours} hours</p>
        <p><strong>Job URL:</strong> {application.job_url || "-"}</p>
        <p><strong>Notes:</strong> {application.notes || "-"}</p>
      </div>
      <Link
        href={`/applications/${application.id}/edit`}
        className="inline-block mt-6 rounded bg-black px-4 py-2 text-white"
      >
        Edit Application
      </Link>
      <form action={archiveApplicationWithId} className="inline-block ml-3">
      <button
        type="submit"
        className="rounded border px-4 py-2"
      >
        Archive
      </button>
    </form>
    </main>
  );
}
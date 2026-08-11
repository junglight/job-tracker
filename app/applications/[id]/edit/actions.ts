"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function updateApplication(id: string, formData: FormData) {
  const { error } = await supabase
    .from("applications")
    .update({
      company: formData.get("company"),
      role: formData.get("role"),
      source: formData.get("source"),
      status: formData.get("status"),
      date_applied: formData.get("date_applied") || null,
      time_spent_hours: Number(formData.get("time_spent_hours")) || 0,
      job_url: formData.get("job_url") || null,
      notes: formData.get("notes") || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/applications/${id}`);
}

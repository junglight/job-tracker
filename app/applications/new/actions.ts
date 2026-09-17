"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function addApplication(formData: FormData) {
  const { error } = await supabase.from("applications").insert({
    company: formData.get("company"),
    role: formData.get("role"),
    source: formData.get("source"),
    date_applied: formData.get("date_applied") || null,
    time_spent_hours: Number(formData.get("time_spent_hours")) || 0,
    status: formData.get("status"),
    job_url: formData.get("job_url") || null,
    notes: formData.get("notes") || null,
    archived: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/applications");
}
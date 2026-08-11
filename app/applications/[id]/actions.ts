"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function archiveApplication(id: string) {
  const { error } = await supabase
    .from("applications")
    .update({
      archived: true,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/applications");
}
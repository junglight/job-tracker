import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("applications")
    .select("*");

  if (error) {
    return <pre>Error: {error.message}</pre>;
  }

  return (
    <div>
      <h1>Supabase Connection Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
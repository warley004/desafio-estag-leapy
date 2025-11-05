// src/lib/directus.ts
export type Talent = {
  id: string;
  user_id: string; // por enquanto só UUID
  department?: string | null;
  current_status?: string | null;
  orchestrator_state?: string | null;
  pdi_plan_ready?: boolean | null;
  date_updated?: string | null;
};

const BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL!;
const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN!;

export async function fetchTalentsBasic(): Promise<Talent[]> {
  const params = new URLSearchParams();
  params.set("limit", "10");
  params.set(
    "fields",
    "id,user_id,department,current_status,orchestrator_state,pdi_plan_ready,date_updated"
  );
  params.set("sort", "-date_updated");

  const res = await fetch(`${BASE_URL}/items/talents?${params.toString()}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });

  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

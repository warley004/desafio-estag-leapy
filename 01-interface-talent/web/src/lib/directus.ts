// src/lib/directus.ts

export type Talent = {
  id: string;
  user_id: string;
  department?: string | null;
  current_status?: string | null;
  orchestrator_state?: string | null;
  pdi_plan_ready?: boolean | null;
  date_updated?: string | null;
};

export type TalentWithUser = Talent & {
  user_email?: string | null;
};

const BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL!;
const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN!;

const defaultHeaders = {
  Authorization: `Bearer ${TOKEN}`,
};

async function fetchUsersByIds(
  ids: string[]
): Promise<Record<string, string | null>> {
  if (!ids.length) return {};

  const params = new URLSearchParams();
  params.set("filter[id][_in]", ids.join(","));
  params.set("fields", "id,email");
  params.set("limit", String(ids.length));

  const res = await fetch(`${BASE_URL}/users?${params.toString()}`, {
    headers: defaultHeaders,
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Erro ao buscar usuários:", await res.text());
    return {};
  }

  const json = await res.json();

  const map: Record<string, string | null> = {};
  if (Array.isArray(json.data)) {
    for (const user of json.data) {
      map[user.id] = user.email ?? null;
    }
  }

  return map;
}

type FetchTalentsParams = {
  page?: number;
  limit?: number;
};

export async function fetchTalentsPage(
  paramsInput: FetchTalentsParams = {}
): Promise<{ talents: TalentWithUser[]; total: number }> {
  const { page = 1, limit = 10 } = paramsInput;

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  params.set(
    "fields",
    "id,user_id,department,current_status,orchestrator_state,pdi_plan_ready,date_updated"
  );
  params.set("sort[]", "-date_updated");

  const res = await fetch(`${BASE_URL}/items/talents?${params.toString()}`, {
    headers: defaultHeaders,
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Erro ao buscar talentos:", await res.text());
    throw new Error("Falha ao buscar talentos");
  }

  const json = await res.json();
  const talents: Talent[] = Array.isArray(json.data) ? json.data : [];
  const total: number = json.meta?.total ?? talents.length;

  // pega user_ids únicos
  const userIds = Array.from(
    new Set(talents.map((t) => t.user_id).filter(Boolean))
  );

  // busca emails desses users
  const usersMap = await fetchUsersByIds(userIds);

  // monta array enriquecido
  const enriched: TalentWithUser[] = talents.map((t) => ({
    ...t,
    user_email: usersMap[t.user_id] ?? null,
  }));

  return { talents: enriched, total };
}

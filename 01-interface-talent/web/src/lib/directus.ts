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
  user_first_name?: string | null;
  user_last_name?: string | null;
  user_full_name?: string | null;
};

const BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL!;
const TOKEN =
  process.env.NEXT_PUBLIC_DIRECTUS_TOKEN ??
  process.env.NEXT_PUBLIC_DIRECTUS_STATIC_TOKEN ??
  "";

const defaultHeaders: HeadersInit = {
  Authorization: `Bearer ${TOKEN}`,
};

// ---------- Helpers de usuários ----------

type UserInfo = {
  email: string | null;
  first_name: string | null;
  last_name: string | null;
};

async function fetchUsersByIds(
  ids: string[]
): Promise<Record<string, UserInfo>> {
  if (!ids.length) return {};

  const params = new URLSearchParams();
  params.set("filter[id][_in]", ids.join(","));
  params.set("fields", "id,email,first_name,last_name");
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

  const map: Record<string, UserInfo> = {};
  if (Array.isArray(json.data)) {
    for (const user of json.data) {
      map[user.id] = {
        email: user.email ?? null,
        first_name: user.first_name ?? null,
        last_name: user.last_name ?? null,
      };
    }
  }

  return map;
}

// ---------- Talents + join com users ----------

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

  // busca infos dos usuários
  const usersMap = await fetchUsersByIds(userIds);

  // monta array enriquecido com nome + email
  const enriched: TalentWithUser[] = talents.map((t) => {
    const user = usersMap[t.user_id];

    const first = user?.first_name ?? null;
    const last = user?.last_name ?? null;
    const fullNameRaw = `${first ?? ""} ${last ?? ""}`.trim();
    const fullName =
      fullNameRaw.length > 0
        ? fullNameRaw
        : user?.email ?? null;

    return {
      ...t,
      user_email: user?.email ?? null,
      user_first_name: first,
      user_last_name: last,
      user_full_name: fullName,
    };
  });

  return { talents: enriched, total };
}

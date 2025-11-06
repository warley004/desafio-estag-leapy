// src/lib/directus.ts

// ---------- Tipos básicos ----------

export type Talent = {
  id: string;
  user_id: string;
  department?: string | null;
  current_status?: string | null;
  orchestrator_state?: string | null;
  pdi_plan_ready?: boolean | null;
  date_updated?: string | null;
  leader_id?: number | null;
  target_role_id?: number | null;
};

export type TalentWithUser = Talent & {
  user_email?: string | null;
  user_first_name?: string | null;
  user_last_name?: string | null;
  user_full_name?: string | null;
  leader_name?: string | null;
  target_role_name?: string | null;
};

const BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL!;
const TOKEN =
  process.env.NEXT_PUBLIC_DIRECTUS_TOKEN ??
  process.env.NEXT_PUBLIC_DIRECTUS_STATIC_TOKEN ??
  "";

const defaultHeaders: HeadersInit = {
  Authorization: `Bearer ${TOKEN}`,
};

// ---------- Users ----------

type UserInfo = {
  email: string | null;
  first_name: string | null;
  last_name: string | null;
};

function buildFullName(user?: UserInfo): string | null {
  if (!user) return null;

  const first = user.first_name ?? "";
  const last = user.last_name ?? "";
  const full = `${first} ${last}`.trim();

  if (full.length > 0) return full;
  if (user.email) return user.email;
  return null;
}

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

// ---------- Target Roles ----------

async function fetchTargetRolesByIds(
  ids: number[]
): Promise<Record<number, string | null>> {
  if (!ids.length) return {};

  const params = new URLSearchParams();
  params.set("filter[id][_in]", ids.join(","));
  params.set("fields", "id,name,title,label");
  params.set("limit", String(ids.length));

  const res = await fetch(
    `${BASE_URL}/items/target_roles?${params.toString()}`,
    {
      headers: defaultHeaders,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Erro ao buscar target_roles:", await res.text());
    return {};
  }

  const json = await res.json();

  const map: Record<number, string | null> = {};
  if (Array.isArray(json.data)) {
    for (const role of json.data) {
      const label =
        role.name ?? role.title ?? role.label ?? null;
      map[role.id] = label;
    }
  }

  return map;
}

// ---------- Leaders (internship_leaders) ----------

type LeaderRecord = {
  user_id: string | null;
  position: string | null;
  department: string | null;
};

async function fetchLeadersByIds(
  ids: number[]
): Promise<Record<number, LeaderRecord>> {
  if (!ids.length) return {};

  const params = new URLSearchParams();
  params.set("filter[id][_in]", ids.join(","));
  params.set("fields", "id,user_id,position,department");
  params.set("limit", String(ids.length));

  const res = await fetch(
    `${BASE_URL}/items/internship_leaders?${params.toString()}`,
    {
      headers: defaultHeaders,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Erro ao buscar internship_leaders:", await res.text());
    return {};
  }

  const json = await res.json();

  const map: Record<number, LeaderRecord> = {};
  if (Array.isArray(json.data)) {
    for (const leader of json.data) {
      map[leader.id] = {
        user_id: leader.user_id ?? null,
        position: leader.position ?? null,
        department: leader.department ?? null,
      };
    }
  }

  return map;
}

// ---------- Talents + joins ----------

type FetchTalentsParams = {
  page?: number;
  limit?: number;
  searchEmail?: string;
  department?: string;
  status?: string;
  orchestratorState?: string;
  pdiReady?: boolean;
  leaderId?: number;
  targetRoleId?: number;
  startDate?: string;
  endDate?: string;   
};


export async function fetchTalentsPage(
  paramsInput: FetchTalentsParams = {}
): Promise<{ talents: TalentWithUser[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    searchEmail,
    department,
    status,
    orchestratorState,
    pdiReady,
    leaderId,
    targetRoleId,
    startDate,
    endDate,
  } = paramsInput;

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  params.set("meta", "filter_count");

    // filtros simples pelos campos do talento

  if (department) {
    params.set("filter[department][_eq]", department);
  }

  if (status) {
    params.set("filter[current_status][_eq]", status);
  }

  if (orchestratorState) {
    params.set("filter[orchestrator_state][_eq]", orchestratorState);
  }

  if (pdiReady === true) {
    params.set("filter[pdi_plan_ready][_eq]", "true");
  }

  if (leaderId != null) {
    params.set("filter[leader_id][_eq]", String(leaderId));
  }

  if (targetRoleId != null) {
    params.set("filter[target_role_id][_eq]", String(targetRoleId));
  }

  if (startDate) {
    // talentos que começam a partir dessa data
    params.set("filter[start_date][_gte]", startDate);
  }

  if (endDate) {
    // talentos que terminam até essa data
    params.set("filter[end_date][_lte]", endDate);
  }


    // Se tiver busca por e-mail, primeiro descobrimos os user_ids
  let userIdsFilter: string[] | null = null;

  if (searchEmail && searchEmail.trim() !== "") {
    const q = searchEmail.trim();

    const searchParams = new URLSearchParams();
    // usa filtro "contém" no email (case-insensitive no Postgres)
    searchParams.set("filter[email][_icontains]", q);
    searchParams.set("fields", "id");
    searchParams.set("limit", "100"); // limite razoável de usuários

    const usersRes = await fetch(
      `${BASE_URL}/users?${searchParams.toString()}`,
      {
        headers: defaultHeaders,
        cache: "no-store",
      }
    );

    if (!usersRes.ok) {
      console.error("Erro ao buscar usuários por email:", await usersRes.text());
      // se der erro aqui, consideramos que não achou ninguém
      userIdsFilter = [];
    } else {
      const usersJson = await usersRes.json();
      const ids = Array.isArray(usersJson.data)
        ? usersJson.data.map((u: any) => u.id).filter(Boolean)
        : [];
      userIdsFilter = ids;
    }

    // Se não achou nenhum usuário com esse email, já devolve vazio
    if (!userIdsFilter?.length) {
      return { talents: [], total: 0 };
    }
  }

  params.set(
    "fields",
    [
      "id",
      "user_id",
      "department",
      "current_status",
      "orchestrator_state",
      "pdi_plan_ready",
      "date_updated",
      "leader_id",
      "target_role_id",
      "start_date",
      "end_date",
    ].join(",")
  );
  params.set("sort[]", "-date_updated");

  if (userIdsFilter && userIdsFilter.length) {
    params.set("filter[user_id][_in]", userIdsFilter.join(","));
  }

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
  const total: number = json.meta?.filter_count ?? talents.length;

  // IDs únicos de leaders e roles
  const leaderIds = Array.from(
    new Set(
      talents
        .map((t) => t.leader_id)
        .filter((id): id is number => id !== null && id !== undefined)
    )
  );
  const targetRoleIds = Array.from(
    new Set(
      talents
        .map((t) => t.target_role_id)
        .filter((id): id is number => id !== null && id !== undefined)
    )
  );

  // busca leaders e roles em paralelo
  const [leadersMap, targetRolesMap] = await Promise.all([
    fetchLeadersByIds(leaderIds),
    fetchTargetRolesByIds(targetRoleIds),
  ]);

  // IDs de usuários dos talentos + líderes
  const talentUserIds = talents.map((t) => t.user_id).filter(Boolean);
  const leaderUserIds = Object.values(leadersMap)
    .map((l) => l.user_id)
    .filter((id): id is string => Boolean(id));

  const allUserIds = Array.from(
    new Set([...talentUserIds, ...leaderUserIds])
  );

  const usersMap = await fetchUsersByIds(allUserIds);

  // monta array enriquecido
  const enriched: TalentWithUser[] = talents.map((t) => {
    const talentUser = usersMap[t.user_id];
    const leaderRecord =
      t.leader_id !== null && t.leader_id !== undefined
        ? leadersMap[t.leader_id]
        : undefined;
    const leaderUser =
      leaderRecord && leaderRecord.user_id
        ? usersMap[leaderRecord.user_id]
        : undefined;

    const targetRoleName =
      t.target_role_id !== null && t.target_role_id !== undefined
        ? targetRolesMap[t.target_role_id] ?? null
        : null;

    const talentFullName = buildFullName(talentUser);
    const leaderFullName = buildFullName(leaderUser);

    return {
      ...t,
      user_email: talentUser?.email ?? null,
      user_first_name: talentUser?.first_name ?? null,
      user_last_name: talentUser?.last_name ?? null,
      user_full_name: talentFullName,
      leader_name: leaderFullName,
      target_role_name: targetRoleName,
    };
  });

  return { talents: enriched, total };
}

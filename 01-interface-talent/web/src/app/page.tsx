// src/app/page.tsx

import Link from "next/link";
import { fetchTalentsPage } from "@/lib/directus";
import TalentCard from "@/components/TalentCard";
import EmailSearchInput from "@/components/EmailSearchInput";
import FiltersSidebar from "@/components/FiltersSidebar";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const qParam = resolvedSearchParams?.q;
  const pageParam = resolvedSearchParams?.page;
  const departmentParam = resolvedSearchParams?.department;
  const statusParam = resolvedSearchParams?.status;
  const orchestratorParam = resolvedSearchParams?.orchestrator;
  const pdiParam = resolvedSearchParams?.pdi;
  const leaderParam = resolvedSearchParams?.leader;
  const roleParam = resolvedSearchParams?.role;
  const startDateParam = resolvedSearchParams?.startDate;
  const endDateParam = resolvedSearchParams?.endDate;

  const searchEmail =
    typeof qParam === "string" && qParam.trim() !== ""
      ? qParam.trim()
      : undefined;

  const department =
    typeof departmentParam === "string" && departmentParam.trim() !== ""
      ? departmentParam.trim()
      : undefined;

  const status =
    typeof statusParam === "string" && statusParam.trim() !== ""
      ? statusParam.trim()
      : undefined;

  const orchestratorState =
    typeof orchestratorParam === "string" &&
    orchestratorParam.trim() !== ""
      ? orchestratorParam.trim()
      : undefined;

  const pdiReady =
    typeof pdiParam === "string" && pdiParam === "true"
      ? true
      : undefined;

  const leaderId =
    typeof leaderParam === "string" &&
    leaderParam !== "" &&
    !Number.isNaN(Number(leaderParam))
      ? Number(leaderParam)
      : undefined;

  const targetRoleId =
    typeof roleParam === "string" &&
    roleParam !== "" &&
    !Number.isNaN(Number(roleParam))
      ? Number(roleParam)
      : undefined;

  const startDate =
    typeof startDateParam === "string" && startDateParam !== ""
      ? startDateParam
      : undefined;

  const endDate =
    typeof endDateParam === "string" && endDateParam !== ""
      ? endDateParam
      : undefined;

  const page =
    typeof pageParam === "string" && !Number.isNaN(Number(pageParam))
      ? Math.max(1, Number(pageParam))
      : 1;

  const limit = 8;

  const { talents, total } = await fetchTalentsPage({
    page,
    limit,
    searchEmail,
    department,
    status,
    orchestratorState,
    pdiReady,
    leaderId,
    targetRoleId,
    startDate,
    endDate,
  });

  const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

  const buildHref = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(newPage));
    if (searchEmail) params.set("q", searchEmail);
    if (department) params.set("department", department);
    if (status) params.set("status", status);
    if (orchestratorState) params.set("orchestrator", orchestratorState);
    if (pdiReady === true) params.set("pdi", "true");
    if (leaderId != null) params.set("leader", String(leaderId));
    if (targetRoleId != null) params.set("role", String(targetRoleId));
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR COM FILTROS */}
      <FiltersSidebar
        department={department}
        status={status}
        orchestratorState={orchestratorState}
        startDate={startDate}
        endDate={endDate}
        leaderId={leaderId ?? null}
        targetRoleId={targetRoleId ?? null}
        pdiReady={pdiReady}
      />

      {/* CONTEÚDO PRINCIPAL */}
      <section className="flex-1 px-8 py-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Talentos</h1>
            <p className="text-gray-400 text-sm">
              {total} resultados encontrados
            </p>
          </div>

          <div className="w-full md:w-72">
            <EmailSearchInput />
          </div>
        </header>

        {talents.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Nenhum talento encontrado para os filtros atuais.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {talents.map((t) => (
              <TalentCard key={t.id} talent={t} />
            ))}
          </div>
        )}

        <footer className="mt-8 flex items-center justify-between text-gray-500 text-sm">
          <span>
            Página {page} de {totalPages}
          </span>

          <div className="flex gap-3">
            <Link
              href={buildHref(page - 1)}
              aria-disabled={page === 1}
              className={`px-3 py-1 rounded-md border border-gray-700 ${
                page === 1
                  ? "opacity-40 pointer-events-none"
                  : "hover:bg-[#1b1d21]"
              }`}
            >
              Anterior
            </Link>
            <Link
              href={buildHref(page + 1)}
              aria-disabled={page >= totalPages}
              className={`px-3 py-1 rounded-md border border-gray-700 ${
                page >= totalPages
                  ? "opacity-40 pointer-events-none"
                  : "hover:bg-[#1b1d21]"
              }`}
            >
              Próxima
            </Link>
          </div>
        </footer>
      </section>
    </div>
  );
}

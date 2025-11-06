// src/app/page.tsx
import Link from "next/link";
import { fetchTalentsPage } from "@/lib/directus";
import TalentCard from "@/components/TalentCard";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const qParam = resolvedSearchParams?.q;
  const pageParam = resolvedSearchParams?.page;

  const searchEmail =
    typeof qParam === "string" && qParam.trim() !== ""
      ? qParam.trim()
      : undefined;

  const page =
    typeof pageParam === "string" && !Number.isNaN(Number(pageParam))
      ? Math.max(1, Number(pageParam))
      : 1;

  const limit = 8; // quantos talentos por página

  const { talents, total } = await fetchTalentsPage({
    page,
    limit,
    searchEmail,
  });

  const totalPages =
    total > 0 ? Math.ceil(total / limit) : 1;

  // helper pra manter ?q=... na navegação
  const buildHref = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(newPage));
    if (searchEmail) params.set("q", searchEmail);
    return `/?${params.toString()}`;
  };

  return (
    <section>
      <header className="flex justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Talentos</h1>
          <p className="text-gray-400 text-sm">
            {total} resultados encontrados
          </p>
        </div>

        <form className="w-72" action="/" method="GET">
          <input
            type="text"
            name="q"
            placeholder="Buscar por e-mail"
            defaultValue={searchEmail ?? ""}
            className="w-full bg-[#1b1d21] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </form>
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
  );
}

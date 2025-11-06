// src/app/page.tsx
import { fetchTalentsPage } from "@/lib/directus";
import TalentCard from "@/components/TalentCard";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const qParam = resolvedSearchParams?.q;
  const searchEmail =
    typeof qParam === "string" && qParam.trim() !== ""
      ? qParam.trim()
      : undefined;

  const { talents, total } = await fetchTalentsPage({
    page: 1,
    limit: 10,
    searchEmail,
  });

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

      <div className="grid grid-cols-2 gap-6">
        {talents.map((t) => (
          <TalentCard key={t.id} talent={t} />
        ))}
      </div>

      <footer className="mt-8 text-gray-500 text-sm">Página 1 de 10</footer>
    </section>
  );
}

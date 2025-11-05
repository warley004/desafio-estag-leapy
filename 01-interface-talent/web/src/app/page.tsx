// src/app/page.tsx
import { fetchTalentsPage } from "@/lib/directus";
import TalentCard from "@/components/TalentCard";

export default async function Page() {
  const { talents, total } = await fetchTalentsPage({ page: 1, limit: 10 });

  return (
    <section>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Talentos</h1>
          <p className="text-gray-400 text-sm">
            {total} resultados encontrados
          </p>
        </div>
        <input
          type="text"
          placeholder="Buscar por e-mail"
          className="bg-[#1b1d21] border border-gray-700 rounded-md px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
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

import { fetchTalentsBasic } from "@/lib/directus";

export default async function Page() {
  const talents = await fetchTalentsBasic();

  return (
    <main className="min-h-screen bg-zinc-50 p-10 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Lista de Talentos</h1>

      {!talents.length ? (
        <p className="text-gray-500">Nenhum talento encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {talents.map((t) => (
            <li key={t.id} className="p-4 border rounded bg-white shadow-sm">
              <p>
                <strong>User ID (UUID):</strong> {t.user_id}
              </p>
              <p>
                <strong>Departamento:</strong> {t.department || "Não informado"}
              </p>
              <p>
                <strong>Status:</strong> {t.current_status || "Não informado"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

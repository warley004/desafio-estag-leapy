import { fetchTalentsPage } from "@/lib/directus";

export default async function Page() {
  const { talents, total } = await fetchTalentsPage({ page: 1, limit: 10 });

  return (
    <main className="min-h-screen bg-zinc-50 p-10 text-gray-900">
      <h1 className="text-2xl font-bold mb-2">Lista de Talentos</h1>
      <p className="text-sm text-gray-600 mb-6">
        Total de talentos: <strong>{total}</strong>
      </p>

      {!talents.length ? (
        <p className="text-gray-500">Nenhum talento encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {talents.map((t) => (
            <li
              key={t.id}
              className="p-4 border rounded bg-white shadow-sm hover:shadow transition"
            >
              <p>
                <strong>Email:</strong>{" "}
                {t.user_email || "Sem email (user órfão)"}
              </p>
              <p>
                <strong>User ID:</strong> {t.user_id}
              </p>
              <p>
                <strong>Departamento:</strong>{" "}
                {t.department || "Não informado"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {t.current_status || "Não informado"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

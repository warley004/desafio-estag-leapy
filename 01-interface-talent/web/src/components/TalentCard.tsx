// src/components/TalentCard.tsx
import { TalentWithUser } from "@/lib/directus";

function formatDate(dateString?: string | null) {
  if (!dateString) return null;
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return null;

  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function TalentCard({ talent }: { talent: TalentWithUser }) {
  const name =
    talent.user_full_name ||
    talent.user_email ||
    "Talento sem nome";

  const email = talent.user_email ?? "sem-email@example.com";

  // Status (ACTIVE / INACTIVE / etc)
  const status = talent.current_status ?? "INDEFINIDO";
  const statusClasses =
    status === "ACTIVE"
      ? "bg-green-500/20 text-green-400"
      : status === "INACTIVE"
      ? "bg-yellow-500/20 text-yellow-300"
      : "bg-gray-500/20 text-gray-300";

  // PDI
  const pdiReady = talent.pdi_plan_ready === true;
  const pdiLabel = pdiReady ? "PDI pronto" : "PDI pendente";
  const pdiClasses = pdiReady
    ? "bg-violet-500/20 text-violet-300"
    : "bg-gray-600/30 text-gray-200";

  // Período
  const start = formatDate(talent.start_date);
  const end = formatDate(talent.end_date);
  const periodLabel =
    start && end
      ? `${start} – ${end}`
      : start
      ? `${start} – sem data de fim`
      : "Não definido";

  return (
    <div className="bg-[#1b1d21] rounded-2xl p-5 shadow hover:shadow-lg transition flex flex-col gap-4">
      {/* Top row: avatar, name, email, status */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-semibold text-gray-100">
          {name.charAt(0).toUpperCase()}
        </div>

        {/* Name + email */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm sm:text-base text-white truncate">
            {name}
          </p>
          <p className="text-xs sm:text-sm text-gray-400 truncate">
            {email}
          </p>
        </div>

        {/* Status pill */}
        <span
          className={`text-xs px-3 py-1 rounded-full ${statusClasses} whitespace-nowrap`}
        >
          {status}
        </span>
      </div>

      {/* Bottom grid: department / role / orchestrator / leader / period / PDI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-200">
        <div>
          <p className="text-gray-400 font-medium">Departamento</p>
          <p className="text-white">
            {talent.department || "Não informado"}
          </p>
        </div>

        <div>
          <p className="text-gray-400 font-medium">Cargo</p>
          <p className="text-white">
            {talent.target_role_name || "Não informado"}
          </p>
        </div>

        <div>
          <p className="text-gray-400 font-medium">Orchestrator State</p>
          <p className="text-white">
            {talent.orchestrator_state || "Não definido"}
          </p>
        </div>

        <div>
          <p className="text-gray-400 font-medium">Liderança</p>
          <p className="text-white">
            {talent.leader_name || "Não informado"}
          </p>
        </div>

        <div>
          <p className="text-gray-400 font-medium">Período</p>
          <p className="text-white">
            {periodLabel}
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-gray-400 font-medium">PDI</p>
          <span className={`inline-flex mt-1 w-fit px-3 py-1 rounded-full text-xs ${pdiClasses}`}>
            {pdiLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

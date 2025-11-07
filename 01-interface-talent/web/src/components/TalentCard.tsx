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

function getStatusVisual(status: string) {
  if (status === "ACTIVE") {
    return {
      background: "bg-emerald-500/10",
      text: "text-emerald-400",
      glow: "shadow-[0_0_18px_rgba(16,185,129,0.45)]",
    };
  }

  if (status === "INACTIVE") {
    return {
      background: "bg-yellow-500/10",
      text: "text-yellow-300",
      glow: "shadow-[0_0_18px_rgba(234,179,8,0.45)]",
    };
  }

  return {
    background: "bg-slate-500/10",
    text: "text-slate-300",
    glow: "shadow-[0_0_18px_rgba(100,116,139,0.35)]",
  };
}

function getGradientAccent(status: string) {
  switch (status) {
    case "ACTIVE":
      return "from-emerald-500/80 via-emerald-400/50 to-transparent";
    case "INACTIVE":
      return "from-amber-400/80 via-amber-300/40 to-transparent";
    case "ONBOARDING":
      return "from-sky-500/80 via-sky-400/40 to-transparent";
    case "PENDING":
    case "PENDING_FIRST_ACCESS":
      return "from-violet-500/80 via-violet-400/40 to-transparent";
    default:
      return "from-slate-400/60 via-slate-300/30 to-transparent";
  }
}

export default function TalentCard({ talent }: { talent: TalentWithUser }) {
  const name =
    talent.user_full_name ||
    talent.user_email ||
    "Talento sem nome";

  const email = talent.user_email ?? "sem-email@example.com";

  // Status (ACTIVE / INACTIVE / etc)
  const status = talent.current_status ?? "INDEFINIDO";
  const statusVisual = getStatusVisual(status);

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
    <div className="group relative isolate flex h-full w-full flex-col gap-5 overflow-hidden rounded-2xl border border-transparent bg-[#1b1d21] p-6 shadow-[0_12px_30px_rgba(10,10,15,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#7c3aed33] hover:shadow-[0_24px_45px_rgba(15,15,20,0.55)]">
      <span
        className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 translate-y-[-35%] scale-110 bg-gradient-to-b ${getGradientAccent(status)} opacity-0 transition duration-300 group-hover:opacity-60`}
        aria-hidden
      />

      <span
        className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition duration-300 group-hover:border-[#7c3aed4d]"
        aria-hidden
      />
      {/* Top row: avatar, name, email, status */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#7c3aed] to-[#8b5cf6] text-lg font-semibold text-gray-100 shadow-[0_12px_30px_rgba(124,58,237,0.35)]">
          <span className="absolute inset-[2px] rounded-full bg-[#1b1d21]" aria-hidden />
          <span className="relative">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Name + email */}
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-semibold text-white sm:text-base">
            {name}
          </p>
          <p className="truncate text-xs text-gray-400 sm:text-sm">
            {email}
          </p>
        </div>

        {/* Status pill */}
        <span
          className={`relative overflow-hidden rounded-full px-3 py-1 text-xs font-medium ${statusVisual.background} ${statusVisual.text}`}
        >
          {status}
          <span
            className={`absolute inset-0 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 ${statusVisual.glow}`}
            aria-hidden
          />
        </span>
      </div>

      {/* Bottom grid: department / role / orchestrator / leader / period / PDI */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-xs text-gray-200 sm:grid-cols-2 sm:text-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Departamento
          </p>
          <p className="text-sm font-medium text-white sm:text-base">
            {talent.department || "Não informado"}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Cargo
          </p>
          <p className="text-sm font-medium text-white sm:text-base">
            {talent.target_role_name || "Não informado"}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Orchestrator State
          </p>
          <p className="text-sm font-medium text-white sm:text-base">
            {talent.orchestrator_state || "Não definido"}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Liderança
          </p>
          <p className="text-sm font-medium text-white sm:text-base">
            {talent.leader_name || "Não informado"}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Período
          </p>
          <p className="text-sm font-medium text-white sm:text-base">
            {periodLabel}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            PDI
          </p>
          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${pdiClasses}`}
          >
            <span className="relative h-2 w-2 rounded-full bg-current shadow-[0_0_12px_currentColor]" aria-hidden />
            {pdiLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

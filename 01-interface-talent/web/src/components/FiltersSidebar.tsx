
type FiltersSidebarProps = {
  department?: string;
  status?: string;
  orchestratorState?: string;
  startDate?: string;
  endDate?: string;
  leaderId?: number | null;
  targetRoleId?: number | null;
  pdiReady?: boolean;
};

export default function FiltersSidebar({
  department,
  status,
  orchestratorState,
  startDate,
  endDate,
  leaderId,
  targetRoleId,
  pdiReady,
}: FiltersSidebarProps) {
  // URL para limpar apenas o PERÍODO, mantendo os outros filtros
  const paramsWithoutPeriod = new URLSearchParams();

  if (department) paramsWithoutPeriod.set("department", department);
  if (status) paramsWithoutPeriod.set("status", status);
  if (orchestratorState)
    paramsWithoutPeriod.set("orchestrator", orchestratorState);
  if (leaderId != null) paramsWithoutPeriod.set("leader", String(leaderId));
  if (targetRoleId != null)
    paramsWithoutPeriod.set("role", String(targetRoleId));
  if (pdiReady) paramsWithoutPeriod.set("pdi", "true");

  const clearPeriodHref =
    paramsWithoutPeriod.toString().length > 0
      ? `/?${paramsWithoutPeriod.toString()}`
      : "/";

  return (
    <aside className="w-full max-w-xs bg-[#111217] border-r border-gray-800 px-5 py-6 flex flex-col gap-6 h-screen overflow-y-auto">

      {/* 🔹 HEADER COM LOGO E TÍTULO */}
      <div className="flex items-center gap-2 mb-4">
        {/* Imagem da logo */}
        
          {/* Troque o caminho abaixo pela sua imagem real */}
          <img
            src="/images/LeapyLogo.png"
            width={110}
            height={110}
            className="object-contain"
            />

        {/* Título */}
        <h1 className="text-[15px] font-semibold text-gray-100 tracking-wide">
          Leapy Talents
        </h1>
      </div>

      <form action="/" method="GET" className="flex flex-col gap-5">
        {/* Department */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">
            Departamento
          </label>
          <select
            name="department"
            defaultValue={department ?? ""}
            className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Todos</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Product">Product</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        {/* Current Status */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">
            Status
          </label>
          <select
            name="status"
            defaultValue={status ?? ""}
            className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Todos</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="ONBOARDING">ONBOARDING</option>
          </select>
        </div>

        {/* Orchestrator State */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">
            Orchestrator State
          </label>
          <select
            name="orchestrator"
            defaultValue={orchestratorState ?? ""}
            className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Todos</option>
            <option value="ONBOARDING">ONBOARDING</option>
            <option value="PENDING_FIRST_ACCESS">
              PENDING_FIRST_ACCESS
            </option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        {/* Período */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">Período</label>

          {/* empilha os dois campos em coluna para não “invadir” o conteúdo */}
          <div className="grid grid-cols-1 gap-2">
            <input
              type="date"
              name="startDate"
              defaultValue={startDate ?? ""}
              className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="date"
              name="endDate"
              defaultValue={endDate ?? ""}
              className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* linkzinho pra limpar só o período */}
          <a
            href={clearPeriodHref}
            className="text-[11px] text-gray-400 hover:text-gray-200 underline mt-1 inline-block"
          >
            Limpar período
          </a>
        </div>

        {/* Leader */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">Liderança</label>
          <select
            name="leader"
            defaultValue={leaderId != null ? String(leaderId) : ""}
            className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Todos</option>

            <optgroup label="Design">
              <option value="11">Ines Freitas</option>
              <option value="16">Marina Costa</option>
              <option value="6">Thiago Cardoso</option>
              <option value="1">João Mendes</option>
            </optgroup>

            <optgroup label="Engineering">
              <option value="5">Luiza Freitas</option>
              <option value="15">Ines Mendes</option>
              <option value="20">João Mendes</option>
              <option value="10">Patrícia Mendes</option>
            </optgroup>

            <optgroup label="Marketing">
              <option value="13">Camila Freitas</option>
              <option value="3">Lucas Araujo</option>
              <option value="8">Luiza Silva</option>
              <option value="18">Francisco Ferreira</option>
            </optgroup>

            <optgroup label="Operations">
              <option value="4">Francisco Nunes</option>
              <option value="14">Marina Araujo</option>
              <option value="19">Marina Ferreira</option>
              <option value="9">Patrícia Cardoso</option>
            </optgroup>

            <optgroup label="Product">
              <option value="2">Marina Ferreira</option>
              <option value="12">Marina Cardoso</option>
              <option value="7">Rafael Mendes</option>
            </optgroup>
          </select>
        </div>

        {/* Cargo */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">Cargo</label>
          <select
            name="role"
            defaultValue={targetRoleId != null ? String(targetRoleId) : ""}
            className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Todos</option>
            {/* Ajuste os IDs / títulos conforme target_roles */}
            <option value="1">Frontend Developer</option>
            <option value="2">Backend Developer</option>
            <option value="3">Fullstack Developer</option>
            <option value="4">Product Manager</option>
            <option value="5">Data Analyst</option>
            <option value="6">DevOps Engineer</option>
            <option value="7">QA Engineer</option>
            <option value="8">UX Designer</option>
            <option value="9">Mobile Developer</option>
            <option value="10">Machine Learning Engineer</option>
          </select>
        </div>

        {/* PDI Pronto – toggle */}
        <div className="space-y-1">
        <label className="flex items-center justify-between text-xs font-medium text-gray-400">
            <span>PDI Pronto</span>

            <span className="inline-flex items-center">
            <input
                type="checkbox"
                name="pdi"
                value="true"
                defaultChecked={pdiReady}
                className="sr-only peer"
            />
            <span
                className="
                flex w-10 h-5 items-center rounded-full bg-gray-600
                peer-checked:bg-violet-500
                transition-colors px-0.5
                peer-checked:justify-end
                "
            >
                <span
                className="
                    h-4 w-4 rounded-full bg-white shadow
                    transition-all
                "
                />
            </span>
            </span>
        </label>
        </div>

        {/* Botões: aplicar + limpar tudo */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-sm font-medium text-white rounded-md py-2.5 transition"
          >
            Aplicar filtros
          </button>

          {/* Limpar TODOS os filtros: volta pra / sem query params */}
          <a
            href="/"
            className="w-full text-center text-xs text-gray-400 hover:text-gray-200 underline"
          >
            Limpar todos os filtros
          </a>
        </div>
      </form>
    </aside>
  );
}

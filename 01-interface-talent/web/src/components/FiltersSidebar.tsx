import CustomSelect, { type SelectOption } from "@/components/CustomSelect";
import DateRangePicker from "@/components/DateRangePicker";

const departmentOptions: SelectOption[] = [
  { value: "", label: "Todos" },
  { value: "Engineering", label: "Engineering" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Product", label: "Product" },
  { value: "Operations", label: "Operations" },
];

const statusOptions: SelectOption[] = [
  { value: "", label: "Todos" },
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
  { value: "ONBOARDING", label: "ONBOARDING" },
];

const orchestratorOptions: SelectOption[] = [
  { value: "", label: "Todos" },
  { value: "ONBOARDING", label: "ONBOARDING" },
  { value: "PENDING_FIRST_ACCESS", label: "PENDING_FIRST_ACCESS" },
  { value: "COMPLETED", label: "COMPLETED" },
];

const leaderOptions: SelectOption[] = [
  { value: "", label: "Todos" },
  { value: "11", label: "Ines Freitas", group: "Design" },
  { value: "16", label: "Marina Costa", group: "Design" },
  { value: "6", label: "Thiago Cardoso", group: "Design" },
  { value: "1", label: "João Mendes", group: "Design" },
  { value: "5", label: "Luiza Freitas", group: "Engineering" },
  { value: "15", label: "Ines Mendes", group: "Engineering" },
  { value: "20", label: "João Mendes", group: "Engineering" },
  { value: "10", label: "Patrícia Mendes", group: "Engineering" },
  { value: "13", label: "Camila Freitas", group: "Marketing" },
  { value: "3", label: "Lucas Araujo", group: "Marketing" },
  { value: "8", label: "Luiza Silva", group: "Marketing" },
  { value: "18", label: "Francisco Ferreira", group: "Marketing" },
  { value: "4", label: "Francisco Nunes", group: "Operations" },
  { value: "14", label: "Marina Araujo", group: "Operations" },
  { value: "19", label: "Marina Ferreira", group: "Operations" },
  { value: "9", label: "Patrícia Cardoso", group: "Operations" },
  { value: "2", label: "Marina Ferreira", group: "Product" },
  { value: "12", label: "Marina Cardoso", group: "Product" },
  { value: "7", label: "Rafael Mendes", group: "Product" },
];

const roleOptions: SelectOption[] = [
  { value: "", label: "Todos" },
  { value: "1", label: "Frontend Developer" },
  { value: "2", label: "Backend Developer" },
  { value: "3", label: "Fullstack Developer" },
  { value: "4", label: "Product Manager" },
  { value: "5", label: "Data Analyst" },
  { value: "6", label: "DevOps Engineer" },
  { value: "7", label: "QA Engineer" },
  { value: "8", label: "UX Designer" },
  { value: "9", label: "Mobile Developer" },
  { value: "10", label: "Machine Learning Engineer" },
];

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
          <CustomSelect
            name="department"
            options={departmentOptions}
            value={department ?? ""}
            ariaLabel="Selecionar departamento"
          />
        </div>

        {/* Current Status */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">
            Status
          </label>
          <CustomSelect
            name="status"
            options={statusOptions}
            value={status ?? ""}
            ariaLabel="Selecionar status"
          />
        </div>

        {/* Orchestrator State */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">
            Orchestrator State
          </label>
          <CustomSelect
            name="orchestrator"
            options={orchestratorOptions}
            value={orchestratorState ?? ""}
            ariaLabel="Selecionar orchestrator state"
          />
        </div>

        {/* Período */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">Período</label>

          <DateRangePicker startDate={startDate} endDate={endDate} />

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
          <CustomSelect
            name="leader"
            options={leaderOptions}
            value={leaderId != null ? String(leaderId) : ""}
            ariaLabel="Selecionar liderança"
          />
        </div>

        {/* Cargo */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">Cargo</label>
          <CustomSelect
            name="role"
            options={roleOptions}
            value={targetRoleId != null ? String(targetRoleId) : ""}
            ariaLabel="Selecionar cargo"
          />
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

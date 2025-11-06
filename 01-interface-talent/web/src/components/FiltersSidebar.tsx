"use client";

import { useSearchParams } from "next/navigation";

export default function FiltersSidebar() {
  const searchParams = useSearchParams();

  const searchEmail = searchParams.get("q") ?? "";
  const department = searchParams.get("department") ?? "";
  const status = searchParams.get("status") ?? "";
  const orchestrator = searchParams.get("orchestrator") ?? "";
  const pdi = searchParams.get("pdi") ?? ""; // "true" ou ""

  const pdiChecked = pdi === "true";

  return (
    <form action="/" method="GET" className="space-y-5 mt-4">
      {/* mantém o e-mail digitado quando aplicar filtros */}
      <input type="hidden" name="q" value={searchEmail} />

      {/* Department */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-400">
          Department
        </label>
        <select
          name="department"
          defaultValue={department}
          className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Todos</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Product">Product</option>
          {/* ajuste conforme seus departments reais */}
        </select>
      </div>

      {/* Current Status */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-400">
          Current Status
        </label>
        <select
          name="status"
          defaultValue={status}
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
          defaultValue={orchestrator}
          className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Todos</option>
          <option value="ONBOARDING">ONBOARDING</option>
          <option value="IN_FLOW">IN_FLOW</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="BLOCKED">BLOCKED</option>
          {/* ajusta esses valores pros que realmente aparecem no seu seed */}
        </select>
      </div>

      {/* PDI Pronto (toggle) */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-gray-400">PDI Pronto</div>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <span className="text-xs text-gray-400">Somente prontos</span>
          <input
            type="checkbox"
            name="pdi"
            value="true"
            defaultChecked={pdiChecked}
            className="h-4 w-4 accent-violet-500"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full mt-2 px-4 py-2 rounded-md bg-violet-600 text-sm font-medium hover:bg-violet-500 transition"
      >
        Aplicar filtros
      </button>
    </form>
  );
}

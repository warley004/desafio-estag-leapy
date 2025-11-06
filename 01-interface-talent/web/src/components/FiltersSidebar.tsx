"use client";

import { useSearchParams } from "next/navigation";

export default function FiltersSidebar() {
  const searchParams = useSearchParams();

const searchEmail = searchParams.get("q") ?? "";
  const department = searchParams.get("department") ?? "";
  const status = searchParams.get("status") ?? "";
  const orchestrator = searchParams.get("orchestrator") ?? "";
  const pdi = searchParams.get("pdi") ?? ""; // "true" ou ""

  const leader = searchParams.get("leader") ?? "";
  const role = searchParams.get("role") ?? "";
  const startDate = searchParams.get("startDate") ?? "";
  const endDate = searchParams.get("endDate") ?? "";

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

      {/* Período (start_date / end_date) */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-400">Período</label>
        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            defaultValue={startDate}
            className="flex-1 bg-[#14161a] border border-gray-700 rounded-md px-2 py-2 text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="date"
            name="endDate"
            defaultValue={endDate}
            className="flex-1 bg-[#14161a] border border-gray-700 rounded-md px-2 py-2 text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Leader */}
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">Leader</label>
                <select
                    name="leader"
                    defaultValue={leader}
                    className="w-full bg-[#14161a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 max-h-48 overflow-y-auto">
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


      {/* Cargo (target_role_id) */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-400">Cargo</label>
        <select
          name="role"
          defaultValue={role}
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

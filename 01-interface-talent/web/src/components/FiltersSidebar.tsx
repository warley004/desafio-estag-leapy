"use client";

import { useSearchParams } from "next/navigation";

export default function FiltersSidebar() {
  const searchParams = useSearchParams();

  const searchEmail = searchParams.get("q") ?? "";
  const department = searchParams.get("department") ?? "";
  const status = searchParams.get("status") ?? "";

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
          {/* ajuste conforme os departments do seed */}
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
          {/* coloca aqui os outros statuses se tiver */}
        </select>
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

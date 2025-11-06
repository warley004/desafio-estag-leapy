// src/components/TalentCard.tsx
import React from "react";
import { TalentWithUser } from "@/lib/directus";

export default function TalentCard({ talent }: { talent: TalentWithUser }) {
  const name =
    talent.user_full_name ||
    talent.user_email ||
    "Talento sem nome";

  const email = talent.user_email ?? "sem-email@example.com";

  const status = talent.current_status ?? "INDEFINIDO";
  const statusClasses =
    status === "ACTIVE"
      ? "bg-green-500/20 text-green-400"
      : status === "INACTIVE"
      ? "bg-yellow-500/20 text-yellow-300"
      : "bg-gray-500/20 text-gray-300";

  return (
    <div className="bg-[#1b1d21] rounded-2xl p-5 shadow hover:shadow-lg transition flex flex-col gap-4">
      {/* Top row: avatar, name, email, status */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-semibold">
          {name.charAt(0).toUpperCase()}
        </div>

        {/* Name + email */}
        <div className="flex-1">
          <p className="font-semibold text-sm sm:text-base text-white">
            {name}
          </p>
          <p className="text-xs sm:text-sm text-gray-400">{email}</p>
        </div>

        {/* Status pill */}
        <span
          className={`text-xs px-3 py-1 rounded-full ${statusClasses} whitespace-nowrap`}
        >
          {status}
        </span>
      </div>

      {/* Bottom grid: department / role / orchestrator / leader */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-200">
        <div>
          <p className="text-gray-400 font-medium">Department</p>
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
          <p className="text-gray-400 font-medium">Leader</p>
          <p className="text-white">
            {talent.leader_name || "Não informado"}
          </p>
        </div>
      </div>
    </div>
  );
}

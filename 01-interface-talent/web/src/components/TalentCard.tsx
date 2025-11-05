import React from "react";
import { TalentWithUser } from "@/lib/directus";

export default function TalentCard({ talent }: { talent: TalentWithUser }) {
  return (
    <div className="bg-[#1b1d21] rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold">
          {talent.user_email?.charAt(0).toUpperCase() ?? "?"}
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="font-semibold text-white">{talent.user_email}</p>
          <p className="text-gray-400 text-sm">{talent.department || "Sem departamento"}</p>
        </div>

        {/* Status Badge */}
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            talent.current_status === "ACTIVE"
              ? "bg-green-500/20 text-green-400"
              : talent.current_status === "INACTIVE"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {talent.current_status || "Indefinido"}
        </span>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>
          <strong>Orchestrator:</strong>{" "}
          {talent.orchestrator_state || "Não definido"}
        </p>
        <p>
          <strong>PDI:</strong>{" "}
          {talent.pdi_plan_ready ? "Pronto" : "Pendente"}
        </p>
      </div>
    </div>
  );
}

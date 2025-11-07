/// <reference types="vitest" />

import { render, screen } from "@testing-library/react";
import TalentCard from "../TalentCard";
import type { TalentWithUser } from "@/lib/directus";

const baseTalent: TalentWithUser = {
  id: "talent-1",
  user_id: "user-1",
  department: "Engineering",
  current_status: "ACTIVE",
  orchestrator_state: "ONBOARDING",
  pdi_plan_ready: true,
  date_updated: "2025-01-01T00:00:00.000Z",
  leader_id: 4,
  target_role_id: 2,
  start_date: "2025-08-01",
  end_date: "2025-12-01",
  user_email: "talent@example.com",
  user_first_name: "Talent",
  user_last_name: "Tester",
  user_full_name: "Talent Tester",
  leader_name: "Leader Name",
  target_role_name: "Backend Developer",
};

describe("TalentCard", () => {
  it("renders complete talent information with positive status cues", () => {
    render(<TalentCard talent={baseTalent} />);

    expect(screen.getByText("Talent Tester")).toBeInTheDocument();
    expect(screen.getByText("talent@example.com")).toBeInTheDocument();
    expect(screen.getByText("Backend Developer")).toBeInTheDocument();
    expect(screen.getByText("PDI pronto")).toBeInTheDocument();
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
  });

  it("falls back to neutral labels when data is missing", () => {
    const sparseTalent: TalentWithUser = {
      id: "talent-2",
      user_id: "user-2",
      department: null,
      current_status: null,
      orchestrator_state: null,
      pdi_plan_ready: false,
      date_updated: null,
      leader_id: null,
      target_role_id: null,
      start_date: null,
      end_date: null,
      user_email: "fallback@example.com",
      user_first_name: null,
      user_last_name: null,
      user_full_name: null,
      leader_name: null,
      target_role_name: null,
    };

    render(<TalentCard talent={sparseTalent} />);

  expect(screen.queryByText("Talento sem nome")).not.toBeInTheDocument();
  expect(screen.getAllByText("fallback@example.com")).toHaveLength(2);
  expect(screen.getAllByText("Não informado")).toHaveLength(3);
  expect(screen.getAllByText("Não definido")).toHaveLength(2);
    expect(screen.getByText("PDI pendente")).toBeInTheDocument();
  });
});

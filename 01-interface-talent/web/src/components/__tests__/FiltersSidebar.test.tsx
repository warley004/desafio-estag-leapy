/// <reference types="vitest" />

import { render, screen, within } from "@testing-library/react";
import FiltersSidebar from "../FiltersSidebar";

describe("FiltersSidebar", () => {
  it("pre-populates inputs for an active filter set", () => {
    const { container } = render(
      <FiltersSidebar
        department="Design"
        status="ACTIVE"
        orchestratorState="ONBOARDING"
        startDate="2025-04-01"
        endDate="2025-05-01"
        leaderId={11}
        targetRoleId={3}
        pdiReady
      />
    );

  const departmentTrigger = screen.getByLabelText("Selecionar departamento");
  const statusTrigger = screen.getByLabelText("Selecionar status");
  const orchestratorTrigger = screen.getByLabelText("Selecionar orchestrator state");

  expect(within(departmentTrigger).getByText("Design")).toBeInTheDocument();
  expect(within(statusTrigger).getByText("ACTIVE")).toBeInTheDocument();
  expect(within(orchestratorTrigger).getByText("ONBOARDING")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /PDI Pronto/i })).toBeChecked();
  expect(screen.getByText("01 abr. 2025 até 01 mai. 2025")).toBeInTheDocument();

    const hiddenDepartment = container.querySelector(
      "input[name='department']"
    ) as HTMLInputElement;
    const hiddenLeader = container.querySelector(
      "input[name='leader']"
    ) as HTMLInputElement;
    const startInput = container.querySelector(
      "input[name='startDate']"
    ) as HTMLInputElement;
    const endInput = container.querySelector(
      "input[name='endDate']"
    ) as HTMLInputElement;

    expect(hiddenDepartment.value).toBe("Design");
    expect(hiddenLeader.value).toBe("11");
    expect(startInput.value).toBe("2025-04-01");
    expect(endInput.value).toBe("2025-05-01");
  });

  it("shows neutral placeholders when no filters are provided", () => {
    render(<FiltersSidebar />);

  const departmentTrigger = screen.getByLabelText("Selecionar departamento");
  const statusTrigger = screen.getByLabelText("Selecionar status");
  const orchestratorTrigger = screen.getByLabelText("Selecionar orchestrator state");

  expect(within(departmentTrigger).getByText("Todos")).toBeInTheDocument();
  expect(within(statusTrigger).getByText("Todos")).toBeInTheDocument();
  expect(within(orchestratorTrigger).getByText("Todos")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /PDI Pronto/i })).not.toBeChecked();
    expect(screen.getByText(/Nenhum período selecionado/i)).toBeInTheDocument();
  });
});

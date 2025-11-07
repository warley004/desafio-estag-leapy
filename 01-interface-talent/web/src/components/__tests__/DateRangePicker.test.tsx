/// <reference types="vitest" />

import { fireEvent, render, screen } from "@testing-library/react";
import DateRangePicker from "../DateRangePicker";

describe("DateRangePicker", () => {
  it("renders the summary for a full range", () => {
    render(
      <DateRangePicker startDate="2025-09-05" endDate="2025-09-19" />
    );

    expect(screen.getByText(/Intervalo personalizado/i)).toBeInTheDocument();
    expect(screen.getByText(/05.*set.*2025.*19.*set.*2025/i)).toBeInTheDocument();

    const startInput = document.querySelector(
      "input[name='startDate']"
    ) as HTMLInputElement;
    const endInput = document.querySelector(
      "input[name='endDate']"
    ) as HTMLInputElement;

    expect(startInput.value).toBe("2025-09-05");
    expect(endInput.value).toBe("2025-09-19");
  });

  it("adjusts the end date when a later start date is provided", () => {
    const { container } = render(
      <DateRangePicker startDate="2025-09-01" endDate="2025-09-10" />
    );

    const startInput = container.querySelector(
      "input[name='startDate']"
    ) as HTMLInputElement;
    const endInput = container.querySelector(
      "input[name='endDate']"
    ) as HTMLInputElement;

    fireEvent.change(startInput, { target: { value: "2025-10-05" } });

    expect(startInput.value).toBe("2025-10-05");
    expect(endInput.value).toBe("2025-10-05");
  });

  it("handles ranges with only an end date provided", () => {
    render(<DateRangePicker endDate="2025-07-12" />);

    expect(screen.getByText(/Até .*12.*jul.*2025/i)).toBeInTheDocument();
  });
});

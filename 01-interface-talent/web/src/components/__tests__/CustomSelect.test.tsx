/// <reference types="vitest" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomSelect, { type SelectOption } from "../CustomSelect";

const options: SelectOption[] = [
  { value: "", label: "Todos" },
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
];

describe("CustomSelect", () => {
  it("selects an option successfully and updates the hidden input", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CustomSelect name="department" options={options} value="" />
    );

    const trigger = screen.getByRole("button", { name: /Todos/i });
    await user.click(trigger);

    const engineeringOption = screen.getByRole("option", { name: "Engineering" });
    await user.click(engineeringOption);

    expect(trigger).toHaveTextContent("Engineering");

    const hiddenInput = container.querySelector(
      "input[name='department']"
    ) as HTMLInputElement;
    expect(hiddenInput.value).toBe("engineering");
  });

  it("falls back to the placeholder when selecting the empty option", async () => {
    const user = userEvent.setup();
    const { container, rerender } = render(
      <CustomSelect name="department" options={options} value="engineering" />
    );

    const trigger = screen.getByRole("button", { name: /Engineering/i });
    await user.click(trigger);

    const emptyOption = screen.getByRole("option", { name: "Todos" });
    await user.click(emptyOption);

    expect(trigger).toHaveTextContent("Todos");

    let hiddenInput = container.querySelector(
      "input[name='department']"
    ) as HTMLInputElement;
    expect(hiddenInput.value).toBe("");

    rerender(
      <CustomSelect
        name="department"
        options={options.filter((option) => option.value !== "")}
        value=""
        placeholder="Selecione"
      />
    );

    const placeholderTrigger = screen.getByRole("button", { name: /Selecione/i });
    expect(placeholderTrigger).toBeInTheDocument();
  });
});

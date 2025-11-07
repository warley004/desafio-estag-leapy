/// <reference types="vitest" />

import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import EmailSearchInput from "../EmailSearchInput";

const pushMock = vi.fn();
const mockUseSearchParams = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => mockUseSearchParams(),
}));

describe("EmailSearchInput", () => {
  beforeEach(() => {
    pushMock.mockClear();
    mockUseSearchParams.mockReset();
    vi.useFakeTimers();
    window.history.replaceState({}, "", "/?page=2&department=Engineering");
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("propagates the typed email after the debounce interval", async () => {
    mockUseSearchParams.mockReturnValue({
      get: (key: string) => (key === "q" ? null : null),
    });

    render(<EmailSearchInput />);

    const input = screen.getByPlaceholderText(/Buscar por e-mail/i);
    fireEvent.change(input, { target: { value: "newuser@example.com" } });

    await vi.advanceTimersByTimeAsync(300);

    expect(pushMock).toHaveBeenCalledWith(
      "/?page=1&department=Engineering&q=newuser%40example.com",
      { scroll: false }
    );
  });

  it("removes the query parameter when the input is cleared", async () => {
    mockUseSearchParams.mockReturnValue({
      get: (key: string) => (key === "q" ? "old@example.com" : null),
    });

    render(<EmailSearchInput />);

    const input = screen.getByPlaceholderText(/Buscar por e-mail/i);
    expect((input as HTMLInputElement).value).toBe("old@example.com");

    fireEvent.change(input, { target: { value: "" } });
    await vi.advanceTimersByTimeAsync(300);

    expect(pushMock).toHaveBeenCalledWith(
      "/?page=1&department=Engineering",
      { scroll: false }
    );
  });
});

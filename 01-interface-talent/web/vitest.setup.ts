import "@testing-library/jest-dom";
import { vi } from "vitest";

if (!("showPicker" in HTMLInputElement.prototype)) {
  Object.defineProperty(HTMLInputElement.prototype, "showPicker", {
    configurable: true,
    value: vi.fn(),
  });
}

if (!("scrollIntoView" in Element.prototype)) {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  });
}

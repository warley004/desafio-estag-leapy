"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState, useId } from "react";

export type SelectOption = {
  value: string;
  label: string;
  group?: string;
};

type CustomSelectProps = {
  name: string;
  options: SelectOption[];
  value?: string | null;
  placeholder?: string;
  ariaLabel?: string;
};

export default function CustomSelect({
  name,
  options,
  value,
  placeholder = "Selecione",
  ariaLabel,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value ?? "");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listboxId = useId();

  useEffect(() => {
    setSelectedValue(value ?? "");
  }, [value]);

  const flatOptions = useMemo(() => options, [options]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;
    const current = optionRefs.current[highlightedIndex];
    current?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, isOpen]);

  const groupedOptions = useMemo(() => {
    return options.reduce<
      { key: string; label?: string; items: SelectOption[] }[]
    >((acc, option) => {
      const key = option.group ?? "__ungrouped";
      const existing = acc.find((group) => group.key === key);

      if (existing) {
        existing.items.push(option);
        return acc;
      }

      acc.push({
        key,
        label: option.group,
        items: [option],
      });
      return acc;
    }, []);
  }, [options]);

  const selectedOption = flatOptions.find(
    (option) => option.value === selectedValue,
  );

  const openListbox = () => {
    setIsOpen((previous) => {
      const next = !previous;
      if (!next) {
        return next;
      }

      const currentIndex = flatOptions.findIndex(
        (option) => option.value === selectedValue,
      );

      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      return next;
    });
  };

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        openListbox();
        return;
      }

      setHighlightedIndex((prev) => {
        const next = prev + 1;
        return next >= flatOptions.length ? 0 : next;
      });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        openListbox();
        return;
      }

      setHighlightedIndex((prev) => {
        const next = prev - 1;
        return next < 0 ? flatOptions.length - 1 : next;
      });
    } else if (event.key === "Enter" || event.key === " ") {
      if (!isOpen) {
        event.preventDefault();
        openListbox();
        return;
      }

      event.preventDefault();
      const option = flatOptions[highlightedIndex];
      if (option) {
        handleSelect(option);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <input name={name} type="hidden" value={selectedValue} />

      <button
        type="button"
        className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0f11] ${
          isOpen
            ? "border-[#7c3aed] bg-[#16181e] shadow-[0_0_0_2px_rgba(124,58,237,0.25)]"
            : "border-[#2f2f3a] bg-[#14161a] hover:border-[#7c3aed80]"
        }`}
        onClick={openListbox}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && highlightedIndex >= 0
            ? `${listboxId}-${highlightedIndex}`
            : undefined
        }
        aria-label={ariaLabel}
      >
        <span className="truncate text-left text-gray-200">
          {selectedOption?.label ?? placeholder}
        </span>
        <svg
          aria-hidden="true"
          className={`h-4 w-4 text-[#b694ff] transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-auto rounded-2xl border border-[#272832] bg-[#101117] p-2 shadow-[0_24px_48px_rgba(12,12,16,0.45)] backdrop-blur-md"
        >
          {groupedOptions.map((group) => {
            if (group.items.length === 0) return null;

            return (
              <div key={group.key} className="mb-1">
                {group.label && (
                  <p className="px-2 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6e6f7d]">
                    {group.label}
                  </p>
                )}
                <ul className="flex flex-col gap-1">
                  {group.items.map((option) => {
                    const optionIndex = flatOptions.indexOf(option);
                    if (optionIndex === -1) {
                      return null;
                    }
                    const isSelected = option.value === selectedValue;
                    const isHighlighted = optionIndex === highlightedIndex;

                    return (
                      <li key={`${option.value}-${option.label}`}>
                        <button
                          type="button"
                          role="option"
                          id={`${listboxId}-${optionIndex}`}
                          aria-selected={isSelected}
                          onClick={() => handleSelect(option)}
                          onMouseEnter={() => setHighlightedIndex(optionIndex)}
                          onMouseDown={(event) => event.preventDefault()}
                          ref={(node) => {
                            optionRefs.current[optionIndex] = node;
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            isSelected
                              ? "bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white"
                              : isHighlighted
                              ? "bg-[#1d1f27] text-white"
                              : "text-gray-200 hover:bg-[#1b1d24]"
                          }`}
                        >
                          <span className="truncate">{option.label}</span>
                          {isSelected && (
                            <svg
                              aria-hidden="true"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5.5 12.5L10 17l8.5-10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

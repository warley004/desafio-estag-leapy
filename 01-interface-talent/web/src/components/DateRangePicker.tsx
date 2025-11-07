"use client";
"use client";

import type { FocusEvent, MouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type DateRangePickerProps = {
  startDate?: string;
  endDate?: string;
};

type DateInputElement = HTMLInputElement & {
  showPicker?: () => void;
};

function normalizeDate(value?: string | null): string {
  if (!value) return "";
  const trimmed = value.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : "";
}

function formatDisplayLabel(value: string): string {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(" de ", " ")
    .replace(" de ", " ");
}

export default function DateRangePicker({ startDate, endDate }: DateRangePickerProps) {
  const [startValue, setStartValue] = useState(() => normalizeDate(startDate));
  const [endValue, setEndValue] = useState(() => normalizeDate(endDate));
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startInputRef = useRef<DateInputElement>(null);
  const endInputRef = useRef<DateInputElement>(null);

  useEffect(() => {
    setStartValue(normalizeDate(startDate));
  }, [startDate]);

  useEffect(() => {
    setEndValue(normalizeDate(endDate));
  }, [endDate]);

  const summaryLabel = useMemo(() => {
    if (startValue && endValue) {
      return `${formatDisplayLabel(startValue)} até ${formatDisplayLabel(endValue)}`;
    }
    if (startValue) {
      return `A partir de ${formatDisplayLabel(startValue)}`;
    }
    if (endValue) {
      return `Até ${formatDisplayLabel(endValue)}`;
    }
    return "Nenhum período selecionado";
  }, [startValue, endValue]);

  const openStartPicker = () => {
    const node = startInputRef.current;
    if (!node) return;
    if (typeof node.showPicker === "function") {
      node.showPicker();
    } else {
      node.click();
    }
  };

  const openEndPicker = () => {
    const node = endInputRef.current;
    if (!node) return;
    if (typeof node.showPicker === "function") {
      node.showPicker();
    } else {
      node.click();
    }
  };

  const handleStartChange = (value: string) => {
    const normalized = normalizeDate(value);
    setStartValue(normalized);

    if (normalized && endValue && normalized > endValue) {
      setEndValue(normalized);
    }
  };

  const handleEndChange = (value: string) => {
    const normalized = normalizeDate(value);
    setEndValue(normalized);

    if (normalized && startValue && normalized < startValue) {
      setStartValue(normalized);
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && containerRef.current?.contains(nextTarget)) {
      return;
    }
    setIsFocused(false);
  };

  const clearStart = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setStartValue("");
  };

  const clearEnd = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setEndValue("");
  };

  const containerClasses = `relative flex items-center gap-3 rounded-xl border px-4 py-4 transition-all duration-200 ${
    isFocused
      ? "border-[#7c3aed] bg-[#16181e] shadow-[0_0_0_2px_rgba(124,58,237,0.35)]"
      : "border-[#2f2f3a] bg-[#14161a] hover:border-[#7c3aed80]"
  }`;

  const chipBase =
    "relative flex-1 min-w-[140px] rounded-lg border border-[#2f2f3a] bg-[#1a1b22] px-3 py-2 text-left transition hover:border-[#7c3aed66]";

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      <div className="flex flex-1 flex-col gap-2 text-left">
        <span className="text-[11px] uppercase tracking-wide text-[#6e6f7d]">
          Intervalo personalizado
        </span>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={openStartPicker}
            className={`${chipBase} ${
              startValue ? "border-[#7c3aed] bg-[#171821]" : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wide text-[#818297]">
                Início
              </span>
              <span className="text-sm font-medium text-gray-100">
                {startValue ? formatDisplayLabel(startValue) : "Selecionar data"}
              </span>
            </div>

            {startValue && (
              <span
                className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#242634] text-xs text-gray-300 transition hover:bg-[#7c3aed] hover:text-white"
                onMouseDown={clearStart}
                title="Limpar data inicial"
              >
                ×
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={openEndPicker}
            className={`${chipBase} ${
              endValue ? "border-[#7c3aed] bg-[#171821]" : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wide text-[#818297]">
                Fim
              </span>
              <span className="text-sm font-medium text-gray-100">
                {endValue ? formatDisplayLabel(endValue) : "Selecionar data"}
              </span>
            </div>

            {endValue && (
              <span
                className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#242634] text-xs text-gray-300 transition hover:bg-[#7c3aed] hover:text-white"
                onMouseDown={clearEnd}
                title="Limpar data final"
              >
                ×
              </span>
            )}
          </button>
        </div>

        <span className="text-xs text-[#6e6f7d]">{summaryLabel}</span>
      </div>

      <svg
        aria-hidden="true"
        className="h-5 w-5 text-[#b694ff]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7 9h10M7 13h10M9 5v2m6-2v2M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input
        ref={startInputRef}
        type="date"
        name="startDate"
        value={startValue}
        onChange={(event) => handleStartChange(event.target.value)}
        className="absolute h-0 w-0 opacity-0"
        tabIndex={-1}
        aria-hidden="true"
      />
      <input
        ref={endInputRef}
        type="date"
        name="endDate"
        value={endValue}
        onChange={(event) => handleEndChange(event.target.value)}
        className="absolute h-0 w-0 opacity-0"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}

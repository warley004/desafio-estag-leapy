"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailSearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initialQuery);

  // Se a URL mudar (ex: limpar filtros), sincroniza o input
  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  // Debounce: espera 500ms depois de parar de digitar
  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = searchParams.toString();
      const params = new URLSearchParams(current);

      if (value && value.trim() !== "") {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }

      // sempre que mudar a busca, volta pra página 1
      params.set("page", "1");

      router.push(`/?${params.toString()}`, { scroll: false });
    }, 250); // 250ms de debounce

    return () => clearTimeout(timeout);
  }, [value, searchParams, router]);

  return (
    <input
      type="text"
      placeholder="Buscar por e-mail"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full bg-[#1b1d21] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
    />
  );
}

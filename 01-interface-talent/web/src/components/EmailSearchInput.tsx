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

  // Debounce: espera 250ms depois de parar de digitar
  useEffect(() => {
  const timeout = setTimeout(() => {
    // pega os parâmetros ATUAIS da URL
    const params = new URLSearchParams(window.location.search);

    if (value && value.trim() !== "") {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }

    // sempre que a busca mudar, volta pra página 1
    params.set("page", "1");

    router.push(`/?${params.toString()}`, { scroll: false });
  }, 250);

  return () => clearTimeout(timeout);
  }, [value, router]);

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

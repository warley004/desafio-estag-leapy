// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import FiltersSidebar from "@/components/FiltersSidebar";

export const metadata: Metadata = {
  title: "Leapy Talents",
  description: "Dashboard de talentos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-gray-100">
        <div className="flex min-h-screen">
          {/* SIDEBAR GLOBAL */}
          <aside className="w-64 bg-[#050509] border-r border-gray-900 px-6 py-6 flex flex-col">
            {/* Logo / título */}
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <span className="text-violet-400 text-xl">➜</span>
                <span className="font-semibold text-lg">Leapy Talents</span>
              </div>
            </div>

            <h2 className="text-xs font-semibold tracking-wide text-gray-400">
              FILTROS
            </h2>

            {/* AQUI entram os dropdowns de fato */}
            <FiltersSidebar />

            {/* se quiser deixar aqueles itens de texto (Department, Current Status...)
                como "tabs", pode removê-los ou mantê-los abaixo só como legenda */}
          </aside>

          {/* CONTEÚDO */}
          <main className="flex-1 px-10 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

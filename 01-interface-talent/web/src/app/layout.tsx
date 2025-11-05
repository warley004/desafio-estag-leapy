// src/app/layout.tsx
import "@/app/globals.css";

export const metadata = {
  title: "Leapy Talents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0e0f11] text-white min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#15171a] p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-lg font-semibold mb-8 flex items-center gap-2">
              <span className="text-violet-400">➜</span> Leapy Talents
            </h1>

            <nav className="space-y-6 text-sm">
              <div>
                <h2 className="text-gray-400 uppercase text-xs mb-3 tracking-wider">
                  Filtros
                </h2>
                <ul className="space-y-2">
                  <li className="cursor-pointer hover:text-violet-400">Department</li>
                  <li className="cursor-pointer hover:text-violet-400">Current Status</li>
                  <li className="cursor-pointer hover:text-violet-400">Orchestrator State</li>
                  <li className="cursor-pointer hover:text-violet-400">Período</li>
                  <li className="cursor-pointer hover:text-violet-400">PDI Pronto</li>
                </ul>
              </div>
            </nav>
          </div>

          <button className="mt-8 bg-violet-600 text-sm px-4 py-2 rounded-md hover:bg-violet-700 transition">
            Aplicar
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}

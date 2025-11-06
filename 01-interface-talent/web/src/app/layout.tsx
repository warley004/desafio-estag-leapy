// src/app/layout.tsx
import "@/app/globals.css";

export const metadata = {
  title: "Leapy Talents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0e0f11] text-white min-h-screen flex">
        <main className="flex-1 p-10 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}

// src/app/layout.tsx
import "@/app/globals.css";

export const metadata = {
  title: "Leapy Talents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0e0f11] text-white h-screen overflow-hidden flex">
        {children}
      </body>
    </html>
  );
}

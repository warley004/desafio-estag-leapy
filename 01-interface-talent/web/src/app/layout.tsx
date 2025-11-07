// src/app/layout.tsx
import "@/app/globals.css";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
      <body
        className={`${nunitoSans.className} bg-[#0e0f11] text-white h-screen overflow-hidden flex`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reff",
  description: "Uma rede social para criar, conversar e pertencer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

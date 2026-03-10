import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "NEXO",
  description: "NEXO Free: Markdown para PDF com anexos",
  icons: {
    icon: "/brand/nexo_logo_primary.svg",
    shortcut: "/brand/nexo_logo_primary.svg",
    apple: "/brand/nexo_logo_primary.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

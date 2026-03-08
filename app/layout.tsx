import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Release Approval Kit",
  description: "Sessão free para converter markdown em PDF com anexos",
  icons: {
    icon: "/brand/rak_icon.svg",
    shortcut: "/brand/rak_icon.svg",
    apple: "/brand/rak_icon_512.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

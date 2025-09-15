import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_KR({ subsets: ["latin"], weight: ["400","500","700"] });

export const metadata: Metadata = {
  title: "Kudamm Agentur",
  description: "Studium · Sprachkurs · Au-Pair · Arbeit · Reise – Dein Korea-Partner",
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={noto.className}>{children}</body>
    </html>
  );
}

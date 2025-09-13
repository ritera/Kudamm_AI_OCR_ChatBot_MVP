import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Kudamm OCR",
  description: "간결하고 빠른 문서 OCR 웹 서비스",
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={noto.className}>
        {children}
      </body>
    </html>
  );
}

import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0F172A",   // 텍스트 대비
          accent: "#00B294"     // 밝은 포인트 (민트)
        }
      }
    }
  },
  plugins: [typography]
} satisfies Config;

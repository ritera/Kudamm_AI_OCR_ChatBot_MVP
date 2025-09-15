import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });

  // 실제 OCR 서버가 있으면 next.config.mjs rewrites 사용(BACKEND_URL 설정) 또는 여기서 fetch로 포워딩
  const demo = `# Demo OCR
- Datei: ${file.name}
- Ergebnis: (Hier erscheint der OCR-Text)
`;
  return NextResponse.json({ text: demo });
}

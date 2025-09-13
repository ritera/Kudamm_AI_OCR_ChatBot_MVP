import { NextRequest, NextResponse } from "next/server";

/**
 * 샘플 OCR 엔드포인트
 * - 실제 환경: formData의 file을 백엔드 OCR 서버(Tesseract, PaddleOCR, 클라우드 API 등)로 전달 후 결과 반환
 * - 여기서는 데모 목적으로 고정 문구를 반환합니다.
 */
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    // ⚠️ 실제 OCR 연동 지점
    // const buf = Buffer.from(await file.arrayBuffer());
    // const result = await fetch(process.env.OCR_SERVER_URL!, { method: "POST", body: buf, headers: {...} }).then(r => r.json());

    const demo = `# 데모 OCR 결과
- 파일명: ${file.name}
- 추출 텍스트: (여기에 OCR 결과가 들어갑니다)

이 영역은 샘플입니다. /app/api/ocr/route.ts에서 실제 OCR 서버로 프록시하도록 코드 교체하세요.`;

    return NextResponse.json({ text: demo });
  } catch (e) {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

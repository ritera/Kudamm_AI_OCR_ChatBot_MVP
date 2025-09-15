import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.email || !body?.message) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  // TODO: 이메일 전송/CRM 연동
  return NextResponse.json({ ok: true });
}

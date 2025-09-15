import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });
  // TODO: 실제 메일링 서비스 연동(Mailchimp 등)
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TARGET = process.env.BACKEND_URL || "http://backend:8000";

function forwardHeaders(src: Headers) {
  const h = new Headers(src);
  h.delete("host");
  h.delete("content-length");
  return h;
}

export async function POST(req: NextRequest) {
  const res = await fetch(`${TARGET}/api/translate`, {
    method: "POST",
    headers: forwardHeaders(req.headers),
    body: req.body
  });
  return new NextResponse(res.body, { status: res.status, headers: res.headers });
}

export async function GET(req: NextRequest) {
  const { search } = new URL(req.url);
  const res = await fetch(`${TARGET}/api/translate${search}`, {
    method: "GET",
    headers: forwardHeaders(req.headers)
  });
  return new NextResponse(res.body, { status: res.status, headers: res.headers });
}

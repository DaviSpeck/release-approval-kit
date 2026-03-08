import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", service: "release-approval-kit", ts: new Date().toISOString() });
}

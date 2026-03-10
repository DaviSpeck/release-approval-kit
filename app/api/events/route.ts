import { createHash } from "node:crypto";
import { z } from "zod";

export const runtime = "nodejs";

const eventSchema = z.object({
  eventName: z.string().trim().min(1).max(80),
  eventSource: z.string().trim().min(1).max(40).default("web_ui"),
  path: z.string().trim().min(1).max(300),
  referrer: z.string().trim().max(500).optional().default(""),
  payload: z.record(z.unknown()).optional().default({})
});

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url, serviceRoleKey };
}

function getClientIpHash(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const realIp = request.headers.get("x-real-ip") ?? "";
  const candidate = forwardedFor.split(",")[0]?.trim() || realIp.trim();
  if (!candidate) {
    return "";
  }

  return createHash("sha256").update(candidate).digest("hex");
}

export async function POST(request: Request) {
  const config = getSupabaseConfig();
  if (!config) {
    return Response.json(
      { error: "misconfigured_server", message: "Variáveis do Supabase ausentes para registrar eventos." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json", message: "JSON inválido." }, { status: 400 });
  }

  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "invalid_payload", message: "Payload de evento inválido.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const ipHash = getClientIpHash(request);

  const insertResponse = await fetch(`${config.url}/rest/v1/event_log`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: config.serviceRoleKey,
      authorization: `Bearer ${config.serviceRoleKey}`,
      prefer: "return=minimal"
    },
    body: JSON.stringify({
      event_name: parsed.data.eventName,
      event_source: parsed.data.eventSource,
      path: parsed.data.path,
      referrer: parsed.data.referrer,
      user_agent: userAgent,
      ip_hash: ipHash,
      payload: parsed.data.payload,
      created_at: new Date().toISOString()
    }),
    cache: "no-store"
  });

  if (!insertResponse.ok) {
    return Response.json(
      { error: "event_insert_failed", message: "Não foi possível registrar o evento." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}

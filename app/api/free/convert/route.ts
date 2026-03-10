import { NextRequest } from "next/server";
import { z } from "zod";
import { FREE_LIMITS, formatBytes } from "@/lib/config/free-limits";
import { buildPdfFromMarkdown } from "@/lib/services/pdf/simple-pdf";

export const runtime = "nodejs";

const dataUrlPattern = /^data:([^;,]+);base64,([A-Za-z0-9+/=]+)$/;

const attachmentSchema = z.object({
  fileName: z.string().trim().min(1).max(FREE_LIMITS.fileName.maxChars),
  mimeType: z.string().trim().min(1),
  dataUrl: z.string().trim().min(1)
});

const requestSchema = z.object({
  markdown: z.string().trim().min(1).max(FREE_LIMITS.markdown.maxChars),
  fileName: z.string().trim().max(FREE_LIMITS.fileName.maxChars).optional(),
  attachments: z.array(attachmentSchema).max(FREE_LIMITS.attachments.maxFiles).default([])
});

function extractDataUrlInfo(dataUrl: string) {
  const match = dataUrlPattern.exec(dataUrl);
  if (!match) {
    return null;
  }

  const mimeType = match[1].toLowerCase();
  const base64 = match[2];
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  const bytes = Math.floor((base64.length * 3) / 4) - padding;

  return { mimeType, bytes };
}

function sanitizeSourceName(fileName?: string) {
  const base = (fileName ?? "documento")
    .replace(/\.md$/i, "")
    .replace(/[^\w.\- ]+/g, " ")
    .trim()
    .slice(0, FREE_LIMITS.fileName.maxChars);

  return base.length > 0 ? base : "documento";
}

export async function POST(request: NextRequest) {
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (Number.isFinite(contentLength) && contentLength > FREE_LIMITS.request.maxBodyBytes) {
      return Response.json(
        {
          error: "payload_too_large",
          message: `Payload acima do limite (${formatBytes(FREE_LIMITS.request.maxBodyBytes)}).`
        },
        { status: 413 }
      );
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json", message: "JSON inválido no corpo da requisição." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: "invalid_payload",
        message: "Revise os limites de markdown, nome de arquivo e anexos.",
        details: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  let totalAttachmentBytes = 0;
  for (const attachment of parsed.data.attachments) {
    const dataUrl = extractDataUrlInfo(attachment.dataUrl);
    if (!dataUrl) {
      return Response.json(
        { error: "invalid_attachment_data", message: `Anexo "${attachment.fileName}" com data URL inválida.` },
        { status: 400 }
      );
    }

    if (!FREE_LIMITS.attachments.allowedMimeTypes.includes(dataUrl.mimeType as (typeof FREE_LIMITS.attachments.allowedMimeTypes)[number])) {
      return Response.json(
        {
          error: "unsupported_attachment_type",
          message: `Formato não permitido em "${attachment.fileName}". Tipos aceitos: ${FREE_LIMITS.attachments.allowedMimeTypes.join(", ")}.`
        },
        { status: 415 }
      );
    }

    if (attachment.mimeType.toLowerCase() !== dataUrl.mimeType) {
      return Response.json(
        { error: "mime_mismatch", message: `Tipo MIME inconsistente no anexo "${attachment.fileName}".` },
        { status: 400 }
      );
    }

    if (dataUrl.bytes > FREE_LIMITS.attachments.maxFileBytes) {
      return Response.json(
        {
          error: "attachment_too_large",
          message: `Anexo "${attachment.fileName}" excede ${formatBytes(FREE_LIMITS.attachments.maxFileBytes)}.`
        },
        { status: 413 }
      );
    }

    totalAttachmentBytes += dataUrl.bytes;
  }

  if (totalAttachmentBytes > FREE_LIMITS.attachments.maxTotalBytes) {
    return Response.json(
      {
        error: "attachments_too_large",
        message: `Total de anexos excede ${formatBytes(FREE_LIMITS.attachments.maxTotalBytes)}.`
      },
      { status: 413 }
    );
  }

  const sourceName = sanitizeSourceName(parsed.data.fileName);
  const fileName = `${sourceName}.pdf`;

  try {
    const bytes = await buildPdfFromMarkdown({
      markdown: parsed.data.markdown,
      sourceName,
      attachments: parsed.data.attachments
    });

    return new Response(bytes, {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="${fileName}"`,
        "cache-control": "no-store"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "conversion_failed";
    return Response.json({ error: "pdf_generation_failed", message }, { status: 500 });
  }
}

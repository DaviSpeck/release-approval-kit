import { NextRequest } from "next/server";
import { z } from "zod";
import { buildPdfFromMarkdown } from "@/lib/services/pdf/simple-pdf";

export const runtime = "nodejs";

const attachmentSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.string().min(1),
  dataUrl: z.string().min(1)
});

const requestSchema = z.object({
  markdown: z.string().min(1),
  fileName: z.string().optional(),
  attachments: z.array(attachmentSchema).max(12).default([])
});

export async function POST(request: NextRequest) {
  const parsed = requestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json({ error: "invalid_payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const totalAttachmentBytes = parsed.data.attachments.reduce((sum, item) => sum + item.dataUrl.length, 0);

  if (totalAttachmentBytes > 20 * 1024 * 1024) {
    return Response.json({ error: "attachments_too_large", message: "Total de anexos excede 20MB." }, { status: 413 });
  }

  const sourceName = (parsed.data.fileName ?? "release-notes").replace(/\.md$/i, "");
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

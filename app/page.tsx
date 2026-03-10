"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FREE_LIMITS, formatBytes } from "@/lib/config/free-limits";

type AttachmentPayload = {
  fileName: string;
  mimeType: string;
  dataUrl: string;
};

type AttachmentPreview = AttachmentPayload & {
  id: string;
  sizeBytes?: number;
};

function toDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("file_read_failed"));
    reader.readAsDataURL(file);
  });
}

function getAttachmentSizeBytes(attachment: AttachmentPreview) {
  if (typeof attachment.sizeBytes === "number" && Number.isFinite(attachment.sizeBytes) && attachment.sizeBytes >= 0) {
    return attachment.sizeBytes;
  }

  const match = /^data:[^;,]+;base64,([A-Za-z0-9+/=]+)$/.exec(attachment.dataUrl);
  if (!match) {
    return 0;
  }

  const base64 = match[1];
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.max(0, Math.floor((base64.length * 3) / 4) - padding);
}

export default function HomePage() {
  const [markdown, setMarkdown] = useState("# Release Notes\n\n- Ajuste no checkout\n- Correção na API\n- Atualização de textos da tela inicial");
  const [fileName, setFileName] = useState("release-notes.md");
  const [attachments, setAttachments] = useState<AttachmentPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Pronto para converter.");
  const markdownLength = markdown.length;
  const markdownNearLimit = markdownLength > Math.floor(FREE_LIMITS.markdown.maxChars * 0.9);

  async function onMarkdownFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const text = await file.text();
    if (text.length > FREE_LIMITS.markdown.maxChars) {
      setStatus(
        `Markdown excede o limite de ${FREE_LIMITS.markdown.maxChars.toLocaleString("pt-BR")} caracteres.`
      );
      event.target.value = "";
      return;
    }

    setMarkdown(text);
    setFileName(file.name);
    setStatus(`Arquivo markdown carregado: ${file.name}`);
  }

  async function onAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const remainingSlots = FREE_LIMITS.attachments.maxFiles - attachments.length;
    if (remainingSlots <= 0) {
      setStatus(`Limite de ${FREE_LIMITS.attachments.maxFiles} anexos atingido.`);
      event.target.value = "";
      return;
    }

    const selected = files.slice(0, remainingSlots);
    const rejected: string[] = [];
    const acceptedFiles = selected.filter((file) => {
      const mimeType = file.type.toLowerCase();
      if (!FREE_LIMITS.attachments.allowedMimeTypes.includes(mimeType as (typeof FREE_LIMITS.attachments.allowedMimeTypes)[number])) {
        rejected.push(`${file.name} (tipo não permitido)`);
        return false;
      }

      if (file.size > FREE_LIMITS.attachments.maxFileBytes) {
        rejected.push(`${file.name} (acima de ${formatBytes(FREE_LIMITS.attachments.maxFileBytes)})`);
        return false;
      }

      return true;
    });

    const currentTotalBytes = attachments.reduce((sum, item) => sum + getAttachmentSizeBytes(item), 0);
    const nextTotalBytes = acceptedFiles.reduce((sum, file) => sum + file.size, currentTotalBytes);
    if (nextTotalBytes > FREE_LIMITS.attachments.maxTotalBytes) {
      setStatus(
        `Total de anexos excede ${formatBytes(FREE_LIMITS.attachments.maxTotalBytes)}. Remova arquivos e tente novamente.`
      );
      event.target.value = "";
      return;
    }

    if (acceptedFiles.length === 0) {
      setStatus(
        rejected.length > 0
          ? `Nenhum anexo aceito. ${rejected.join("; ")}`
          : "Nenhum anexo válido selecionado."
      );
      event.target.value = "";
      return;
    }

    const next = await Promise.all(
      acceptedFiles.map(async (file, index) => ({
        id: `${Date.now()}-${index}-${file.name}`,
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        dataUrl: await toDataUrl(file),
        sizeBytes: file.size
      }))
    );

    setAttachments((prev) => [...prev, ...next].slice(0, FREE_LIMITS.attachments.maxFiles));
    if (rejected.length > 0) {
      setStatus(`${next.length} anexo(s) carregado(s). Ignorados: ${rejected.join("; ")}`);
    } else {
      setStatus(`${next.length} anexo(s) carregado(s).`);
    }
    event.target.value = "";
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  }

  async function convertToPdf(event: FormEvent) {
    event.preventDefault();

    if (markdown.trim().length === 0) {
      setStatus("Informe conteúdo markdown para gerar o PDF.");
      return;
    }

    if (markdown.length > FREE_LIMITS.markdown.maxChars) {
      setStatus(`Markdown acima do limite de ${FREE_LIMITS.markdown.maxChars.toLocaleString("pt-BR")} caracteres.`);
      return;
    }

    const totalAttachmentBytes = attachments.reduce((sum, item) => sum + getAttachmentSizeBytes(item), 0);
    if (totalAttachmentBytes > FREE_LIMITS.attachments.maxTotalBytes) {
      setStatus(`Total de anexos acima de ${formatBytes(FREE_LIMITS.attachments.maxTotalBytes)}.`);
      return;
    }

    setLoading(true);
    setStatus("Gerando PDF...");

    try {
      const payload = {
        markdown,
        fileName,
        attachments: attachments.map<AttachmentPayload>(({ fileName: name, mimeType, dataUrl }) => ({
          fileName: name,
          mimeType,
          dataUrl
        }))
      };

      const response = await fetch("/api/free/convert", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message ?? errorBody.error ?? "conversion_failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName.replace(/\.md$/i, "") + ".pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);

      setStatus("PDF gerado com sucesso (anexos incluídos no final).");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro inesperado";
      setStatus(`Falha na conversão: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="site">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <section className="shell hero">
        <header className="topbar reveal">
          <div className="brand">
            <img alt="NEXO" className="brand-icon" src="/brand/nexo_logo_primary.svg" />
            <div className="brand-copy">
              <strong>NEXO</strong>
              <span>Markdown para PDF</span>
            </div>
          </div>
          <p className="eyebrow">NEXO FREE</p>
        </header>

        <div className="hero-content reveal delay-1">
          <p className="kicker">Markdown para PDF com anexos</p>
          <h1>Gere um PDF limpo e inclua fotos na aba final de anexos.</h1>
          <p className="lead">
            Fluxo sem autenticação para desenvolvimento: upload de `.md`, upload de imagens e geração de PDF em um
            clique.
          </p>
        </div>
      </section>

      <section className="shell studio reveal delay-2">
        <div className="studio-copy">
          <h2>Conversor MD → PDF</h2>
          <p>Agora com anexos visuais no final do documento (2 imagens por página, sem corte).</p>
          <ul>
            <li>Sessão anônima</li>
            <li>Markdown principal</li>
            <li>Aba de anexos no final do PDF</li>
          </ul>
        </div>

        <div className="studio-grid">
          <form className="panel" onSubmit={convertToPdf}>
            <label htmlFor="md-file">Arquivo markdown (.md)</label>
            <input id="md-file" type="file" accept=".md,text/markdown,text/plain" onChange={onMarkdownFileChange} />

            <label htmlFor="image-files">Fotos para anexos (opcional)</label>
            <input id="image-files" type="file" accept="image/*" multiple onChange={onAttachmentChange} />

            <div className="attachments-list">
              {attachments.length === 0 ? (
                <small>Nenhuma foto anexada.</small>
              ) : (
                attachments.map((item) => (
                  <div className="attachment-item" key={item.id}>
                    <img alt={item.fileName} src={item.dataUrl} />
                    <div>
                      <strong>{item.fileName}</strong>
                      <small>
                        {item.mimeType} · {formatBytes(getAttachmentSizeBytes(item))}
                      </small>
                    </div>
                    <button onClick={() => removeAttachment(item.id)} type="button">
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>

            <label htmlFor="markdown">Conteúdo markdown</label>
            <div className="markdown-counter" aria-live="polite">
              <span className={markdownNearLimit ? "counter-warn" : undefined}>
                {markdownLength.toLocaleString("pt-BR")} / {FREE_LIMITS.markdown.maxChars.toLocaleString("pt-BR")} caracteres
              </span>
            </div>
            <textarea
              id="markdown"
              rows={14}
              maxLength={FREE_LIMITS.markdown.maxChars}
              value={markdown}
              onChange={(event) => setMarkdown(event.target.value)}
            />
            <small className="limit-hint">
              Limites: até {FREE_LIMITS.markdown.maxChars.toLocaleString("pt-BR")} caracteres de markdown, até{" "}
              {FREE_LIMITS.attachments.maxFiles} anexos, {formatBytes(FREE_LIMITS.attachments.maxFileBytes)} por anexo e{" "}
              {formatBytes(FREE_LIMITS.attachments.maxTotalBytes)} no total. Tipos:{" "}
              {FREE_LIMITS.attachments.allowedMimeTypes.join(", ")}.
            </small>

            <div className="submit-row">
              <button disabled={loading || !markdown.trim()} type="submit">
                {loading ? "Convertendo..." : "Gerar PDF"}
              </button>
              <small className="status-text">{status}</small>
            </div>
          </form>

          <article className="panel output">
            <div className="output-head">
              <h3>Preview do markdown</h3>
              <small>{fileName}</small>
            </div>
            <pre>{markdown}</pre>
          </article>
        </div>
      </section>
    </main>
  );
}

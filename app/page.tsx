"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type AttachmentPayload = {
  fileName: string;
  mimeType: string;
  dataUrl: string;
};

type AttachmentPreview = AttachmentPayload & {
  id: string;
};

function toDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("file_read_failed"));
    reader.readAsDataURL(file);
  });
}

export default function HomePage() {
  const [markdown, setMarkdown] = useState("# Release Notes\n\n- Ajuste no checkout\n- Correção na API\n- Atualização de textos da tela inicial");
  const [fileName, setFileName] = useState("release-notes.md");
  const [attachments, setAttachments] = useState<AttachmentPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Pronto para converter.");

  async function onMarkdownFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const text = await file.text();
    setMarkdown(text);
    setFileName(file.name);
    setStatus(`Arquivo markdown carregado: ${file.name}`);
  }

  async function onAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const next = await Promise.all(
      files.map(async (file, index) => ({
        id: `${Date.now()}-${index}-${file.name}`,
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        dataUrl: await toDataUrl(file)
      }))
    );

    setAttachments((prev) => [...prev, ...next].slice(0, 12));
    setStatus(`${next.length} anexo(s) carregado(s).`);
    event.target.value = "";
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  }

  async function convertToPdf(event: FormEvent) {
    event.preventDefault();
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
            <img alt="Release Approval Kit" className="brand-lockup" src="/brand/rak_lockup_horizontal_2x.png" />
          </div>
          <p className="eyebrow">FREE SESSION</p>
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
                      <small>{item.mimeType}</small>
                    </div>
                    <button onClick={() => removeAttachment(item.id)} type="button">
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>

            <label htmlFor="markdown">Conteúdo markdown</label>
            <textarea
              id="markdown"
              rows={14}
              value={markdown}
              onChange={(event) => setMarkdown(event.target.value)}
            />

            <button disabled={loading || !markdown.trim()} type="submit">
              {loading ? "Convertendo..." : "Gerar PDF"}
            </button>
            <small>{status}</small>
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

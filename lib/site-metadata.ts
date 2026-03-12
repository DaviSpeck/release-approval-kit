export const SITE_NAME = "NEXO";
export const SITE_HOST_FALLBACK = "http://localhost:3000";

export const DEFAULT_TITLE =
  "NEXO | Markdown-to-PDF automation for engineering teams";

export const DEFAULT_DESCRIPTION =
  "Convert Markdown into branded, corporate-ready PDFs with an API and web UI. NEXO helps engineering teams automate documentation delivery, reports, release notes, and stakeholder-ready PDFs.";

export const DEFAULT_KEYWORDS = [
  "markdown to pdf",
  "markdown to pdf api",
  "markdown pdf generator",
  "documentation automation",
  "docs as code",
  "pdf generation",
  "developer tools",
  "technical writing",
  "release notes pdf",
  "engineering documentation",
  "report generator",
  "github actions pdf",
];

export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const deploymentUrl = process.env.VERCEL_URL?.trim();

  const candidate = explicitUrl || vercelUrl || deploymentUrl || SITE_HOST_FALLBACK;
  const normalized = candidate.startsWith("http") ? candidate : `https://${candidate}`;

  return normalized.replace(/\/+$/, "");
}

export type ExampleDocument = {
  slug: string;
  fileName: string;
  title: {
    pt: string;
    en: string;
  };
  summary: {
    pt: string;
    en: string;
  };
  markdown: string;
};

export const EXAMPLE_DOCUMENTS: ExampleDocument[] = [
  {
    slug: "release-summary",
    fileName: "release-summary.md",
    title: {
      pt: "Resumo de release",
      en: "Release summary",
    },
    summary: {
      pt: "Atualização executiva com highlights, escopo, riscos e próximos passos.",
      en: "Executive update with highlights, scope, risks, and next steps.",
    },
    markdown: `# Release Summary

## Highlights

- Added SSO support for internal users
- Reduced API latency by 32%
- Closed 14 production bugs

## Scope

- Authentication improvements
- API performance work
- Operational stability updates

## Risks

- Rollback playbook still needs final review
- Metrics dashboard thresholds need verification after rollout

## Next Steps

1. Validate the staging checklist
2. Roll out gradually
3. Share the final PDF with stakeholders
`,
  },
  {
    slug: "architecture-review",
    fileName: "architecture-review.md",
    title: {
      pt: "Revisao de arquitetura",
      en: "Architecture review",
    },
    summary: {
      pt: "Documento para lideranca e engenharia com contexto, decisao tecnica e trade-offs.",
      en: "A leadership-friendly architecture memo with context, technical decision, and trade-offs.",
    },
    markdown: `# Architecture Review

## Context

We need a reliable path to transform Markdown documentation into stakeholder-ready PDFs without forcing teams to copy content into slides or documents.

## Proposed Flow

1. Authors write in Markdown
2. NEXO validates and renders the document
3. Playwright generates the PDF output

## Decision

Use a Next.js application with a dedicated conversion route and Playwright-based PDF rendering.

## Component Overview

| Layer | Responsibility |
| --- | --- |
| Web UI | Upload files, preview output, trigger generation |
| API route | Validate payload, apply limits, invoke rendering |
| PDF service | Convert Markdown HTML into paginated PDF |

## Trade-offs

- Faster iteration with one codebase for UI and API
- Consistent output because rendering stays browser-based
- Higher runtime cost than a plain Markdown export

## Risks

- Large files increase render time
- Browser availability must be managed in CI and deploys

## Recommendation

Approve the architecture for the v0.1 release and focus next on templates, CLI automation, and richer Markdown fidelity.
`,
  },
  {
    slug: "security-audit-summary",
    fileName: "security-audit-summary.md",
    title: {
      pt: "Resumo de auditoria de seguranca",
      en: "Security audit summary",
    },
    summary: {
      pt: "Exemplo de handoff com achados, severidade, mitigacoes e status.",
      en: "Audit-style handoff with findings, severity, mitigations, and status.",
    },
    markdown: `# Security Audit Summary

## Scope

Review of the public conversion flow, waitlist capture, and technical event logging for NEXO Free.

## Findings Snapshot

| Area | Severity | Status |
| --- | --- | --- |
| Conversion payload validation | Medium | Mitigated |
| Waitlist duplicate protection | Low | Mitigated |
| Secret handling in local environments | High | Needs follow-up |

## Key Findings

### 1. Conversion API validation

The conversion endpoint validates file counts, payload size, attachment size, and logo constraints before rendering.

### 2. Waitlist duplicate handling

The waitlist flow guards against duplicate e-mails and returns a clear response for already-registered users.

### 3. Local secret exposure risk

Local development can become unsafe if service-role or provider keys are committed into tracked environment files.

## Recommended Actions

1. Move production secrets to deployment environment variables only
2. Add a pre-release checklist for environment hygiene
3. Keep free-tier logging as best-effort, never blocking the core conversion flow

## Executive Summary

The product is in a solid position for public validation, with the highest-priority follow-up focused on secret-management discipline before broader launch.
`,
  },
];

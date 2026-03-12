# NEXO

<p align="center">
  English | <a href="./README.pt-BR.md">Português (Brasil)</a>
</p>

<p align="center">
  <img src="public/brand/nexo_logo_primary.svg" alt="NEXO logo" width="220" />
</p>

<p align="center">
  <strong>Convert Markdown into corporate-ready PDFs, automatically.</strong>
</p>

<p align="center">
  NEXO is a developer tool for turning Markdown documentation into polished, branded PDF reports for engineering, product, compliance, and delivery workflows.
</p>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-alpha-f59e0b" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca" />
  <img alt="PDF Engine" src="https://img.shields.io/badge/PDF-Playwright-45ba63" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-22c55e" />
</p>

NEXO helps developers and engineering teams automate one of the most painful last-mile documentation tasks: converting raw Markdown into PDF deliverables that are presentable outside the engineering org.

Today, this repository implements **NEXO Free**: a browser-based and API-driven Markdown-to-PDF workflow with support for attachments and custom branding.

## Markdown In. Corporate PDF Out.

```text
Markdown docs / release notes / ADRs / reports
                    |
                    v
                  NEXO
      parse + style + paginate + brand
                    |
                    v
       Corporate-ready PDF for sharing
```

Use NEXO when you need to turn technical documentation into PDFs for:

- release approvals
- client-facing reports
- architecture reviews
- internal status updates
- compliance or audit handoffs
- technical writer handoffs from Markdown sources

## Quick Example

### 1. Write Markdown

```md
# Release Summary

## Highlights
- Added SSO support
- Reduced API latency by 32%
- Closed 14 production bugs

## Risks
- Pending rollback playbook review

## Next Steps
1. Validate staging checklist
2. Share PDF with stakeholders
```

### 2. Convert with NEXO

```bash
curl -X POST http://localhost:3000/api/free/convert \
  -H "Content-Type: application/json" \
  -o release-summary.pdf \
  -d '{
    "documents": [
      {
        "fileName": "release-summary.md",
        "markdown": "# Release Summary\n\n## Highlights\n- Added SSO support\n- Reduced API latency by 32%",
        "attachments": []
      }
    ]
  }'
```

See more reusable examples in [docs/examples/README.md](./docs/examples/README.md).

### 3. Get a polished PDF

- ready to download
- paginated for A4 output
- branded footer and visual document structure
- suitable for sharing outside GitHub or your docs stack

## Why NEXO?

Markdown is the best authoring format for developers, but it is rarely the best delivery format for stakeholders.

Teams often end up with one of these bad options:

- manually copy content into Google Docs, Word, or Slides
- export plain text or poorly formatted HTML to PDF
- maintain duplicate versions of the same document
- delay documentation handoff because final formatting is tedious

NEXO closes that gap.

It lets teams keep writing in Markdown while automating the transformation into presentation-ready PDFs that fit real business workflows.

## Features

- Convert Markdown to polished PDFs through a web UI or API
- Upload up to 3 documents per request
- Attach supporting images per document for appendix-style output
- Add custom logo branding to generated PDFs
- Generate PDFs with Playwright for consistent browser-quality rendering
- Preserve a shareable PDF output for non-technical stakeholders
- Fit naturally into CI/CD and GitHub-based documentation workflows
- Run locally with a simple Next.js setup
- Support serverless Chromium and local Chrome fallback strategies

## Example Outputs

NEXO is designed for documentation automation across common engineering workflows:

| Input | Output |
| --- | --- |
| `release-notes.md` | Executive-ready release PDF for approval or distribution |
| `adr-042.md` | Architecture decision PDF for reviews, sign-off, or archival |
| `incident-summary.md` | Post-incident report PDF with evidence attachments |
| `delivery-report.md` | Client-facing delivery summary in branded PDF format |

Output characteristics:

- clean A4 layout
- branded footer
- structured headings and readable spacing
- attachment appendix pages when images are included

## Installation

### Prerequisites

- Node.js
- Yarn
- Playwright Chromium for PDF generation

### Run locally

```bash
yarn install
yarn playwright install chromium
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### Available endpoint

- `GET /api/health`
- `POST /api/free/convert`

## Usage Notes

Current limits in **NEXO Free**:

- up to 3 Markdown documents per request
- up to 120,000 characters per document
- up to 4 attachments per document
- up to 8 attachments total
- up to 4 MB per attachment
- up to 16 MB total attachment size
- accepted attachment types: `png`, `jpeg`, `webp`

If Chromium is not available locally:

```bash
yarn playwright install chromium
```

NEXO can also fall back to a locally installed Google Chrome, or use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` when needed.

## CI/CD and GitHub Automation

NEXO is built for documentation automation, not just one-off exports.

Typical automation patterns:

- generate stakeholder PDFs from Markdown on every GitHub release
- convert `/docs` content into downloadable report artifacts in CI
- package release notes as PDFs for approval flows
- produce branded reports from engineering docs without manual formatting

Example GitHub Actions step:

```yaml
- name: Generate PDF with NEXO
  run: |
    curl -X POST "${NEXO_BASE_URL}/api/free/convert" \
      -H "Content-Type: application/json" \
      --data @payload.json \
      --output docs-report.pdf
```

## Who NEXO Is For

- developers who already write in Markdown
- engineering teams that need stakeholder-friendly outputs
- technical writers working from repository-based source docs
- DevOps or platform teams building documentation pipelines
- teams that want branded PDFs without manual layout work

## Roadmap

Current and planned direction for NEXO:

- [x] Markdown-to-PDF conversion
- [x] Attachment appendix support
- [x] Multi-document conversion
- [x] Custom logo support
- [x] Browser-based upload workflow
- [ ] richer Markdown rendering for tables and code blocks
- [ ] reusable PDF themes and templates
- [ ] GitHub-native workflows for converting repository docs
- [ ] CLI for local and CI automation
- [ ] hosted NEXO Pro approval and governance workflows

## Contributing

Contributions are welcome, especially around:

- Markdown rendering quality
- PDF layout and theming
- GitHub and CI integrations
- API ergonomics
- docs, examples, and sample workflows

Recommended contribution flow:

1. Open an issue describing the problem or proposal.
2. Keep changes focused and easy to review.
3. Include reproduction steps for bugs.
4. Share screenshots or sample PDFs for output-related changes when possible.

If you plan to contribute major changes, start with an issue so the direction stays aligned.

Full contributor guidance is available in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Repository Positioning Tips

To improve GitHub discovery and developer adoption, consider adding these repository topics:

- `markdown-to-pdf`
- `documentation`
- `docs-as-code`
- `developer-tools`
- `pdf-generation`
- `technical-writing`
- `devrel`
- `github-actions`
- `cicd`
- `nextjs`

Suggested demo assets for the repository:

- a short GIF showing `.md` upload to PDF download
- a before/after image comparing raw Markdown and final PDF
- one sample PDF in `/docs/examples/`
- one CI example in `.github/workflows/`

Suggested repository structure improvements:

- `docs/examples/` for sample Markdown and generated PDFs
- `docs/assets/` for screenshots and demo GIFs
- `.github/workflows/` for automation examples
- `CONTRIBUTING.md` for contributor onboarding
- `LICENSE` at the repository root for open-source clarity

Repository support files already included:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SECURITY.md](./SECURITY.md)
- [.github/workflows/ci.yml](./.github/workflows/ci.yml)
- [.github/workflows/example-pdf-export.yml](./.github/workflows/example-pdf-export.yml)

## License

This repository is licensed under the [MIT License](./LICENSE).

Note: [docs/LICENSE](./docs/LICENSE) still contains a separate proprietary notice for documentation assets. If that is no longer intentional, it should be reviewed to avoid mixed licensing signals.

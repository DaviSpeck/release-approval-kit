# NEXO CLI

The NEXO CLI is maintained in a dedicated repository:

- GitHub: [DaviSpeck/nexo-cli](https://github.com/DaviSpeck/nexo-cli)

It exists for batch conversion and command-line workflows while keeping the hosted NEXO backend as the source of truth.

## How it works

The CLI sends conversion jobs to:

- `https://nexo.speck-solutions.com.br/api/free/convert`

That means:

- PDF rendering stays aligned with the hosted product
- free-mode limits remain the same as the website
- usage continues to be counted in Supabase
- the backend can distinguish `CLI` and `WEBSITE` traffic

## Install

```bash
npm install -g nexo-md-to-pdf-cli
```

## Usage

```bash
nexo release-summary.md
nexo release-summary.md --output ./release-summary.pdf
nexo a.md b.md c.md --output-dir ./pdfs
nexo release-summary.md --logo ./brand.svg --logo-tone light
```

To point the CLI to another environment:

```bash
nexo release-summary.md --api-base-url http://localhost:3000
```

## Current scope

- Markdown conversion is supported
- optional logo is supported
- attachments are intentionally out of scope for this first CLI version

# NEXO Examples

This folder contains small, reusable examples for local testing, demos, and CI workflows.

## Files

- `release-summary.md`: sample Markdown input
- `architecture-review.md`: architecture memo example
- `security-audit-summary.md`: security handoff example
- `payload.json`: sample request body for `POST /api/free/convert`

Generated sample PDFs are available in `public/examples/`:

- `public/examples/release-summary.pdf`
- `public/examples/architecture-review.pdf`
- `public/examples/security-audit-summary.pdf`

## Run Locally

Start the app:

```bash
yarn install
yarn playwright install chromium
yarn dev
```

Then generate a PDF:

```bash
curl -X POST http://localhost:3000/api/free/convert \
  -H "Content-Type: application/json" \
  --data @examples/payload.json \
  --output release-summary.pdf
```

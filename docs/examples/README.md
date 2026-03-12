# NEXO Examples

This folder contains small, reusable examples for local testing, demos, and future CI workflows.

## Files

- `release-summary.md`: sample Markdown input
- `payload.json`: sample request body for `POST /api/free/convert`

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
  --data @docs/examples/payload.json \
  --output docs/examples/release-summary.pdf
```

This example intentionally uses no attachments so it is easy to test and adapt.

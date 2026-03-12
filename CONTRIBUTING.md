# Contributing to NEXO

Thanks for your interest in improving NEXO.

NEXO is positioned as a developer tool for Markdown-to-PDF automation, so the best contributions are the ones that make the product clearer, more reliable, or easier to adopt.

## Good Contribution Areas

- Markdown rendering and PDF quality
- API ergonomics and request validation
- GitHub and CI/CD integration examples
- docs, samples, and onboarding improvements
- branding, templates, and output consistency
- accessibility and UX improvements in the web flow

## Before You Start

1. Search existing issues and pull requests.
2. Open an issue for larger changes or anything that affects product direction.
3. Keep proposals concrete: what problem exists, what changes, and how we can validate it.

## Local Setup

```bash
yarn install
yarn playwright install chromium
yarn dev
```

Open `http://localhost:3000`

Useful commands:

```bash
yarn typecheck
yarn build
```

## Contribution Guidelines

- Keep pull requests focused and easy to review.
- Prefer small, incremental changes over broad refactors.
- Update docs when behavior, limits, or API usage changes.
- If you change PDF output, include screenshots or sample output when possible.
- If you add a new workflow, explain the developer use case clearly.

## Pull Request Checklist

- The change solves a specific problem.
- Documentation is updated when needed.
- The feature or fix is scoped tightly.
- Type checking and build pass locally when relevant.
- New behavior is explained clearly in the PR description.

## Reporting Bugs

Please include:

- expected behavior
- actual behavior
- steps to reproduce
- sample Markdown or payload if relevant
- environment details when useful

## Proposing Features

The strongest feature requests usually explain:

- who the feature is for
- the workflow being improved
- why current behavior is insufficient
- how success should be measured

## Code of Conduct

Be respectful, constructive, and specific. Good open-source collaboration depends on clarity and kindness.

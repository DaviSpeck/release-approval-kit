# NEXO

<p align="center">
  <a href="./README.md">English</a> | Português (Brasil)
</p>

<p align="center">
  <img src="public/brand/nexo_logo_primary.svg" alt="Logo do NEXO" width="220" />
</p>

<p align="center">
  <strong>Converta Markdown em PDFs com aparência corporativa, automaticamente.</strong>
</p>

<p align="center">
  O NEXO é uma ferramenta para desenvolvedores que transforma documentação em Markdown em PDFs polidos e prontos para compartilhar com stakeholders.
</p>

## O Que O NEXO Faz

```text
Markdown / release notes / ADRs / relatórios
                     |
                     v
                   NEXO
      parse + estilo + paginação + branding
                     |
                     v
      PDF profissional pronto para entrega
```

O repositório hoje implementa o **NEXO Free**:

- conversão de Markdown para PDF via web UI ou API
- múltiplos documentos por requisição
- anexos em formato de apêndice
- branding com logo customizada

## Exemplo Rápido

```bash
curl -X POST http://localhost:3000/api/free/convert \
  -H "Content-Type: application/json" \
  -o relatorio.pdf \
  -d '{
    "documents": [
      {
        "fileName": "release-summary.md",
        "markdown": "# Release Summary\n\n## Highlights\n- Added SSO support",
        "attachments": []
      }
    ]
  }'
```

## Por Que NEXO?

Times técnicos escrevem em Markdown, mas o formato final esperado por clientes, liderança, compliance e áreas não técnicas quase sempre é PDF.

Sem automação, isso costuma virar:

- trabalho manual em Google Docs ou Word
- retrabalho de formatação
- duplicação de conteúdo
- lentidão para aprovar ou distribuir documentos

O NEXO reduz esse atrito ao manter o Markdown como fonte de verdade e automatizar a entrega final.

## Recursos

- conversão de Markdown para PDF com layout pronto para compartilhamento
- upload de até 3 documentos por requisição
- até 4 anexos por documento e 8 no total
- suporte a logo customizada
- renderização com Playwright
- encaixe natural em CI/CD e fluxos com GitHub

## Instalação

```bash
yarn install
yarn playwright install chromium
yarn dev
```

Abra `http://localhost:3000`

## Endpoints

- `GET /api/health`
- `POST /api/free/convert`

## Exemplos

Veja exemplos reutilizáveis em [docs/examples/README.md](./docs/examples/README.md).

## Contribuição

As orientações de contribuição estão em [CONTRIBUTING.md](./CONTRIBUTING.md).

## Licença

Este repositório usa a [MIT License](./LICENSE).

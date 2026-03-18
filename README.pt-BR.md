# NEXO

<p align="center">
  <a href="./README.md">English</a> | Português (Brasil)
</p>

<p align="center">
  <img src="public/brand/nexo_logo_primary.svg" alt="Logo do NEXO" width="220" />
</p>

<p align="center">
  <strong>Markdown -> automação de PDFs corporativos para workflows de documentação de times dev.</strong>
</p>

<p align="center">
  O NEXO transforma documentação em Markdown em PDFs polidos e compartilháveis por web UI e API, para que times de engenharia entreguem documentos prontos para stakeholders sem retrabalho manual.
</p>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-v0.1%20free-2563eb" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6" />
  <img alt="PDF Engine" src="https://img.shields.io/badge/PDF-Playwright-45ba63" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-22c55e" />
</p>

![Demo do NEXO](public/video-to-gif-nexo.gif)

O NEXO é uma ferramenta open-source para equipes que já escrevem em Markdown, mas precisam de uma saída mais clara para liderança, aprovações de release, relatórios para clientes, revisões de arquitetura e handoffs de compliance.

## Early Access

O conversor gratuito já está no ar para validação e feedback inicial.

- teste o produto localmente com a web UI ou com os exemplos de API deste repositório
- teste a versão hospedada em [nexo.speck-solutions.com.br](https://nexo.speck-solutions.com.br/)
- use a waitlist em [nexo.speck-solutions.com.br/pricing](https://nexo.speck-solutions.com.br/pricing) para validar interesse
- trate a waitlist como sinal de demanda antes de investir em distribuição paga

## Por Que NEXO

Markdown é ótimo para escrever, versionar e colaborar. Quase nunca é o melhor formato para a entrega final.

O NEXO fecha essa lacuna com:

- renderização de PDF em navegador via Playwright
- conversão de múltiplos documentos em uma única requisição
- anexos opcionais como páginas de apêndice
- suporte a logo personalizada para saída com branding
- web UI simples e API pronta para automação
- repositório dedicado de CLI para conversão em lote via API hospedada

## Fluxo

```text
Markdown / release notes / ADRs / relatórios
                    |
                    v
                  NEXO
      parse + estilo + paginação + branding
                    |
                    v
       PDF corporativo pronto para compartilhar
```

Casos de uso comuns:

- resumos de release para fluxos de aprovação
- ADRs e revisões de arquitetura
- relatórios de entrega para clientes
- sumários de incidentes com evidências
- documentação de compliance e auditoria

## Exemplo Rápido

Escreva o Markdown:

```md
# Release Summary

## Highlights
- Added SSO support
- Reduced API latency by 32%
- Closed 14 production bugs

## Risks
- Rollback playbook still needs final review

## Next Steps
1. Validate the staging checklist
2. Share the PDF with stakeholders
```

Gere um PDF via API:

```bash
curl -X POST http://localhost:3000/api/free/convert \
  -H "Content-Type: application/json" \
  --data @examples/payload.json \
  --output release-summary.pdf
```

O PDF gerado sai paginado para A4 e pronto para circular fora do GitHub ou da sua stack interna de docs.

## CLI

O NEXO também tem um repositório dedicado para workflows de linha de comando e uso em lote:

- Repositório: [github.com/DaviSpeck/nexo-cli](https://github.com/DaviSpeck/nexo-cli)
- Guia neste repo: [CLI.pt-BR.md](./CLI.pt-BR.md)

Instalação global:

```bash
npm install -g nexo-md-to-pdf-cli
```

Uso:

```bash
nexo release-summary.md
nexo a.md b.md --output-dir ./pdfs
nexo config set-logo ./brand.svg --logo-tone light
```

A CLI usa a API hospedada da NEXO, então renderização, limites do modo Free e contagem de uso no Supabase continuam centralizados no produto principal. Ela também permite salvar uma logo padrão com `nexo config set-logo`, evitando repetir `--logo` em toda conversão recorrente. Nesta primeira versão, anexos ficam fora do escopo de propósito.

## Exemplos Reais

Você já tem 3 exemplos reais no repositório:

- `examples/release-summary.md`
- `examples/architecture-review.md`
- `examples/security-audit-summary.md`

E também 3 PDFs reais prontos para download:

- `public/examples/release-summary.pdf`
- `public/examples/architecture-review.pdf`
- `public/examples/security-audit-summary.pdf`

## Uso da API

Health check:

```bash
curl http://localhost:3000/api/health
```

Requisição de conversão:

```bash
curl -X POST http://localhost:3000/api/free/convert \
  -H "Content-Type: application/json" \
  -d '{
    "documents": [
      {
        "fileName": "release-summary.md",
        "markdown": "# Release Summary\n\n## Highlights\n- Added SSO support\n- Reduced API latency by 32%\n- Closed 14 production bugs",
        "attachments": []
      }
    ],
    "customLogo": {
      "fileName": "brand-mark.png",
      "mimeType": "image/png",
      "dataUrl": "data:image/png;base64,<sua-logo-em-base64>",
      "tone": "light"
    }
  }' \
  --output release-summary-branded.pdf
```

Limites atuais do plano Free:

- até 3 documentos Markdown por requisição
- até 120.000 caracteres por documento
- até 180.000 caracteres no total
- até 4 anexos por documento
- até 8 anexos no total
- até 4 MB por anexo
- até 16 MB de anexos no total
- logo opcional com até 2 MB
- anexos aceitos: `png`, `jpeg`, `webp`
- formatos aceitos para logo: `png`, `jpeg`, `webp`, `svg`

## Setup Local

Pré-requisitos:

- Node.js 22+
- Yarn 1.x
- Playwright Chromium

Instale e rode:

```bash
yarn install
yarn playwright install chromium
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000).

Comandos úteis:

```bash
yarn typecheck
yarn build
```

## Gere Seu Primeiro PDF

1. Rode a aplicação com `yarn dev`.
2. Abra a web UI em `http://localhost:3000`.
3. Envie `examples/release-summary.md` ou cole conteúdo em Markdown.
4. Adicione anexos ou uma logo, se quiser.
5. Gere o PDF pela interface ou pela API usando `examples/payload.json`.

## Estrutura do Projeto

```text
app/                  páginas e rotas da app Next.js
components/           componentes da interface
lib/                  geração de PDF, limites e serviços compartilhados
examples/             exemplos de Markdown e payloads da API
public/               assets estáticos, mídia e PDFs de exemplo
supabase/             migrations SQL para waitlist e logs
```

## Recursos

- conversão de Markdown para PDF por web UI e API
- renderização com Playwright para saída com qualidade de navegador
- conversão de múltiplos documentos em uma única requisição
- páginas de apêndice para screenshots e evidências
- suporte opcional a branding com logo personalizada
- layout amigável para PDFs em A4
- captação de waitlist com Supabase
- logging de eventos técnicos do conversor e da web UI
- exemplo de CI para gerar PDFs automaticamente
- preview expandido no desktop para revisar melhor o documento antes da geração

## Status da Release

`v0.1 - NEXO Free` hoje foca na experiência do conversor gratuito:

- conversão de Markdown para PDF sem autenticação
- fluxo de upload pelo navegador
- caminho API-first para automação local
- repositório dedicado de CLI para conversão hospedada em workflows de terminal
- suporte a branding e anexos
- waitlist e logging de eventos
- exemplo de CI para export repetível de PDF

## GitHub Launch Ready

Para o PASSO 1 da validação pública, este repositório agora tem:

- posicionamento claro logo no topo
- GIF visível na abertura
- exemplo concreto de API e setup local
- arquivos de exemplo em `examples/`
- PDFs reais de exemplo em `public/examples/`
- site público em [nexo.speck-solutions.com.br](https://nexo.speck-solutions.com.br/)
- suporte à waitlist implementado via [página de pricing](https://nexo.speck-solutions.com.br/pricing) e `/api/waitlist`

Antes de publicar o repo, defina a descrição no GitHub como:

`Markdown -> corporate PDF automation for developer documentation workflows.`

## Roadmap

- [x] Conversão de Markdown para PDF
- [x] Conversão de múltiplos documentos
- [x] Suporte a anexos em apêndice
- [x] Branding com logo personalizada
- [x] Web UI e API para uso local
- [x] Integração de waitlist e logging de eventos
- [x] Exemplo de CI para export automatizado de PDF
- [ ] Melhor fidelidade de Markdown para tabelas e blocos de código
- [ ] Temas e templates reutilizáveis
- [x] Repositório dedicado de CLI para CI e automação local
- [ ] Workflows GitHub-native para repositórios de docs
- [ ] Recursos hospedados do NEXO Pro para colaboração e governança

## Contribuição

Contribuições são bem-vindas, especialmente em:

- fidelidade de renderização de Markdown
- qualidade de layout do PDF
- ergonomia da API
- exemplos de CI e GitHub automation
- docs, onboarding e workflows de demonstração

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para o guia de contribuição.

## Licença

Este repositório está sob a [MIT License](./LICENSE).

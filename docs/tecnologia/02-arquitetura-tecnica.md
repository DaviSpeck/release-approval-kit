# 02. Arquitetura Técnica Sugerida

## Diretriz
Stack unificada com **Next.js para front e back**, priorizando velocidade de execução do MVP vendável.

## Visão Geral (Next Fullstack)
- App Web: Next.js (App Router)
- API: Route Handlers do Next.js
- Jobs assíncronos: background worker (fila)
- Auth e dados: Firebase Auth + Firestore
- Arquivos: Firebase Storage
- Imagens/evidências: Cloudinary (upload otimizado + CDN)
- PDF: Playwright (HTML/CSS -> PDF)
- Billing: AbacatePay (checkout/assinatura + webhook)

## Modos de Uso
### Modo Free (não autenticado)
1. Usuário sobe `.md` e imagens
2. Sistema gera preview HTML
3. Worker gera PDF
4. Artefatos com retenção curta (24h-72h)

### Modo Paid (autenticado)
1. Login (Google, GitHub ou e-mail/senha)
2. Validação de e-mail obrigatória
3. Coleta de dados básicos (incluindo telefone)
4. Assinatura via AbacatePay
5. Liberação de recursos pagos (GitHub, histórico, colaboração)
6. Geração por fonte: intervalo de commits ou Pull Request

## Integrações
### GitHub API (Paid)
- OAuth com escopo mínimo de leitura
- Compare `base...head`, commits, arquivos alterados
- Ingestão por PR: metadados, commits do PR, arquivos, comentários e status checks

### AbacatePay (Paid)
- Criação de checkout/assinatura
- Retorno de eventos por webhook (`paid`, `failed`, `canceled`)
- Atualização de plano no Firestore por evento confirmado

### Conversão MD -> PDF
- Render server-side com template de impressão
- Playwright para evitar corte de imagem e preservar layout
- Regra de confiabilidade: imagens em apêndice ao final do documento
- Layout determinístico de evidências: 2 imagens por página, mesmo frame e mesma proporção visual

### Cloudinary (imagens)
- Upload assinado
- Transformações para padronizar resolução
- Entrega via CDN para preview rápido

### IA (sumarização e narrativa)
- Camada de abstração de provider (sem acoplamento a um único modelo)
- Fase inicial: modelo gratuito/open-source
- Evolução: fallback e upgrade para modelo pago conforme volume/qualidade exigida

## Segurança
- Free: sessão anônima com token temporário e rate limit
- Paid: Firebase Auth + controle por workspace
- E-mail verificado para ativar recursos sensíveis
- Token GitHub criptografado e segregado por tenant
- Webhook AbacatePay validado por assinatura/segredo
- URLs temporárias para download de PDF

## Custos e Trade-offs
- Custo variável: LLM + renderização PDF + processamento de imagem
- Firebase acelera MVP, mas exige controle de leitura/escrita para evitar custo surpresa
- Cloudinary reduz carga de processamento de imagem no app
- AbacatePay simplifica cobrança local, mas adiciona dependência de webhook confiável

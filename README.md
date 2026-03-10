# NEXO

Marca do produto: **NEXO**.

Arquitetura de oferta:
- **NEXO Free**: sessão não autenticada para converter **Markdown em PDF** com anexos.
- **NEXO Pro**: fluxo pago para **aprovação de release** com integrações e governança.

Escopo implementado neste repositório hoje: **NEXO Free**.

## Status atual
- Next.js fullstack configurado
- Upload de arquivo `.md` no navegador
- Upload múltiplo de imagens para anexos
- Conversão para PDF com layout melhorado
- Seção final de anexos (2 imagens por página, sem recorte)

## Fluxo implementado
1. Usuário faz upload de `.md` (ou cola markdown)
2. Usuário adiciona fotos opcionais para anexos
3. Front envia para `POST /api/free/convert`
4. API gera PDF e retorna para download
5. PDF sai com conteúdo principal + aba de anexos no final

## Decisão de naming
- Nome principal do sistema: **NEXO**
- Linguagem de onboarding no free: **Markdown para PDF**
- Linguagem de evolução no pago: **Aprovação de release**

## Identidade visual
- Logo principal usada pelo sistema: `public/brand/nexo_logo_primary.svg`
- Versão mono usada em contextos discretos (ex.: PDF): `public/brand/nexo_logo_primary_mono.svg`
- Favicon e ícones do app: derivados de `public/brand/nexo_logo_primary.(svg|png)`

## Endpoints
- `GET /api/health`
- `POST /api/free/convert`

## Como rodar
1. Instalar dependências:
   ```bash
   yarn install
   ```
2. Instalar browser do Playwright (obrigatório para gerar PDF):
   ```bash
   yarn playwright install chromium
   ```
3. Rodar local:
   ```bash
   yarn dev
   ```
4. Abrir:
   ```
   http://localhost:3000
   ```

## Limites atuais
- Markdown: até 120.000 caracteres
- Máximo de 8 anexos por conversão
- Máximo de 4MB por anexo
- Total de anexos limitado a 16MB
- Tipos de anexo permitidos: `image/png`, `image/jpeg`, `image/webp`

## Se der erro de Chromium
- Primeiro rode: `yarn playwright install chromium`
- Alternativa: usar Chrome local com `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` apontando para o executável

## Próxima etapa (opcional)
- Migrar UI para Tailwind CSS
- Renderização de markdown mais rica (tabelas, bloco de código)
- Compressão automática de imagens antes do envio

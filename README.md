# Nexo

Marca do produto: **Nexo**.

Arquitetura de oferta:
- **Nexo Free**: sessão não autenticada para converter **Markdown em PDF** com anexos.
- **Nexo Pro**: fluxo pago para **aprovação de release** com integrações e governança.

Escopo implementado neste repositório hoje: **Nexo Free**.

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
- Nome principal do sistema: **Nexo**
- Linguagem de onboarding no free: **Markdown para PDF**
- Linguagem de evolução no pago: **Aprovação de release**

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
- Máximo de 12 imagens por conversão
- Total de anexos limitado a ~20MB no payload

## Se der erro de Chromium
- Primeiro rode: `yarn playwright install chromium`
- Alternativa: usar Chrome local com `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` apontando para o executável

## Próxima etapa (opcional)
- Migrar UI para Tailwind CSS
- Renderização de markdown mais rica (tabelas, bloco de código)
- Compressão automática de imagens antes do envio

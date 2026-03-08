# 04. Fluxos de Usuário

## Fluxo Gratuito (sem autenticação)
1. Entrar no produto sem login
2. Subir arquivo `.md`
3. Subir imagens de evidência
4. Ajustar preview
5. Gerar e baixar PDF
6. Aviso de retenção temporária da sessão

## Primeiro Uso Pago
1. Criar conta / login
2. Criar workspace
3. Conectar GitHub
4. Selecionar repositório
5. Definir template padrão

## Geração de Pacote de Aprovação (Paid)
1. Selecionar fonte: `base/head` ou `PR`
2. Coletar diff e commits (ou dados do PR)
3. Classificar mudanças (backend/frontend/infra/docs)
4. Gerar narrativa (fato + inferência)
5. Gerar checklist e evidências sugeridas
6. Exportar MD e PDF

## Edição Manual do MD (Paid)
1. Abrir editor
2. Ajustar conteúdo
3. Salvar nova versão
4. Registrar autor/data

## Regeneração de PDF
1. Acionar "Regenerar PDF"
2. Worker renderiza versão atual do MD
3. Sistema monta apêndice de imagens com layout padronizado (2 por página)
4. Sistema substitui asset do PDF

## Versionamento / Histórico (Paid)
1. Listar runs por repositório
2. Visualizar versões por pacote
3. Comparar conteúdo entre versões
4. Exportar artefatos finais

# 01. PRD Enxuto e Completo

## Premissas
- Ainda sem diff real de repositório nesta documentação.
- Conteúdo abaixo é proposta de produto vendível (SaaS freemium).
- Em uso real, separar sempre "Fato do diff" de "Inferência".

## Problema
Times técnicos perdem tempo para converter alterações de código em documentação de aprovação clara para públicos executivos. Isso gera atraso, retrabalho e baixa qualidade de decisão.

## ICP / Personas
- Engenheiro(a) responsável por release
- Tech Lead / Engineering Manager
- PM/PO
- Diretoria e stakeholders de negócio
- Consultor/freelancer que precisa gerar PDF executivo sem integração complexa

## Jobs to be Done
1. Gerar pacote de aprovação em minutos a partir do diff
2. Entender impacto/risco sem ler código
3. Manter histórico versionado e auditável de releases
4. Gerar PDF profissional a partir de `.md` + imagens mesmo sem login

## Proposta de Valor
Converter mudanças de produto/código em:
- Markdown técnico+executivo editável
- PDF executivo pronto para compartilhar
- Checklist de validação sugerido
- Evidências visuais recomendadas

## Modelo de Produto (Freemium)
### Gratuito (sem autenticação)
- Upload de `.md`
- Upload de imagens de evidência
- Geração de PDF com layout executivo
- Sessão temporária (sem histórico persistente de longo prazo)
- Limites de uso para controle de custo (execuções/dia e tamanho de arquivo)

### Pago (com autenticação)
- Integração com GitHub (base/head e Pull Request)
- Geração automática via diff
- Histórico versionado de runs e artefatos
- Templates por workspace
- Colaboração e governança por time

### Evolução comercial recomendada
- Pro: profissional individual com histórico + GitHub
- Team: múltiplos usuários, papéis, auditoria e políticas

## Escopo MVP vs Pós-MVP
### MVP (vendável)
- Fluxo gratuito sem login (MD + imagens -> PDF)
- Fluxo pago com login + GitHub (commits e PR)
- Geração de narrativa técnica e executiva
- Histórico básico (plano pago)
- Camada de IA iniciando com provider gratuito e preparada para upgrade

### Pós-MVP
- Integrações GitLab/Bitbucket
- Captura automática de evidências (E2E)
- Regras por compliance/domínio
- Publicação para Confluence/Notion/Jira

## Métricas de Sucesso
### Produto
- Tempo para 1o PDF (modo free) < 3 min
- Tempo para 1o pacote com GitHub (paid) < 10 min
- % pacotes com edição manual < 20%
- % usuários free que geram 2o PDF na mesma semana

### Negócio
- Conversão free -> paid
- MRR e churn por coorte
- Redução do lead time de aprovação
- ARPA por workspace (com atenção ao salto Pro -> Team)

## Riscos e Mitigações
- Free tier custoso: limites de uso (páginas, tamanho de imagem, execuções/dia)
- Resumo impreciso do diff: separar fato/inferência com rastreabilidade
- PDF com layout ruim: engine com CSS paginado e testes de template
- Instabilidade de modelo gratuito: fallback e troca por provider pago via feature flag
- Escopo OAuth excessivo: escopos mínimos + auditoria
- Baixa adoção: onboarding rápido no modo gratuito

# 08. Backlog Priorizado (Estimativa)

## Método
MoSCoW + pontos relativos (story points)

## Épicos e Histórias
- Upload `.md` + imagens em sessão anônima (Must, 8 pts)
- Geração de PDF com template executivo (Must, 8 pts)
- Layout determinístico de evidências no PDF (2 por página, proporção fixa) (Must, 5 pts)
- Retenção temporária e limpeza automática de sessão free (Must, 5 pts)
- Autenticação (Google, GitHub, e-mail/senha) (Must, 8 pts)
- Verificação de e-mail + onboarding com telefone obrigatório (Must, 5 pts)
- Integração GitHub por base/head e por Pull Request (Must, 8 pts)
- Integração AbacatePay (checkout + webhook) (Must, 8 pts)
- Pipeline IA para resumo/checklist/evidências (Must, 8 pts)
- Abstração de provider de IA (gratuito inicial + fallback + pago opcional) (Must, 5 pts)
- Histórico e versionamento (Should, 8 pts)
- Segurança e governança multi-tenant (Should, 5 pts)
- Observabilidade e controle de custo (Could, 3 pts)

## Dependências
- PDF depende de template HTML/CSS de impressão
- GitHub depende de OAuth + gestão segura de token + leitura de PR
- Billing depende de webhook idempotente e assinatura validada
- Histórico depende de modelo de dados de runs/pacotes

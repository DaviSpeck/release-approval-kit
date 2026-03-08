# 11. Modelo Comercial (Freemium)

## Estratégia
Entrada por valor imediato (gerar PDF sem login) e expansão para recursos de times com integração GitHub e histórico.

## Planos
### Free (sem conta)
- Upload de `.md`
- Upload de imagens com limite
- Geração de PDF
- Sem integração GitHub
- Marca d'agua discreta no PDF
- Retenção curta (sem histórico permanente)

### Pro (conta + workspace)
- Login com Google/GitHub/e-mail
- GitHub integrado (base/head)
- Geração automática de pacote de aprovação
- Histórico e versionamento
- Templates e colaboração

### Sugestão de evolução: plano Team (intermediário)
- Todos os recursos do Pro
- Múltiplos assentos e permissões por papel
- Biblioteca de templates do time
- SLA de suporte e trilha de auditoria

## Cobrança
- Gateway: AbacatePay
- Ciclo: mensal e anual (definir depois)
- Ativação do Pro após confirmação de pagamento
- Downgrade controlado em falha/cancelamento

## Gatilhos de Upgrade
- Necessidade de histórico
- Trabalho recorrente com PR/release
- Uso por mais de 1 pessoa
- Necessidade de governança e rastreabilidade

## Sugestões de embalagem (recomendadas)
### Free (otimizado para aquisição)
- Limite por execução: até 1 `.md`, até 10 imagens, até 20 páginas de PDF
- Limite diário: até 3 PDFs por IP/sessão
- Sem histórico e sem colaboração
- Objetivo: demonstrar valor em menos de 5 minutos

### Pro (otimizado para profissional individual)
- Limite mensal de execuções com IA (definir faixa inicial)
- Histórico completo por workspace
- Integração GitHub e exportação sem marca d'agua
- Objetivo: converter usuário recorrente de release

### Team (otimizado para squads)
- Assentos adicionais
- Papéis (admin/editor/viewer)
- Logs de auditoria e políticas de retenção
- Objetivo: expandir ticket médio e reduzir churn

## Regras de paywall sugeridas
- Geração manual de PDF permanece no Free (com limites)
- Recursos de automação por diff ficam no Paid
- Histórico, versionamento e colaboração ficam no Paid
- Webhooks e integrações externas ficam no Team

## Métricas Comerciais
- Taxa de ativação do Free
- Conversão Free -> Pro
- Receita mensal recorrente (MRR)
- Churn e expansão por workspace

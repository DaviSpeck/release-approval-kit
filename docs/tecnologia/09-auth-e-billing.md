# 09. Auth e Billing (Firebase + AbacatePay)

## Fluxo de Cadastro
1. Usuário escolhe: Google, GitHub ou e-mail/senha
2. Sistema cria conta no Firebase Auth
3. Se provider for e-mail/senha: enviar verificação de e-mail
4. Onboarding obrigatório: nome + telefone
5. Só liberar integração GitHub e histórico após `email_verified=true`

## Fluxo de Upgrade para Pro
1. Usuário clica em "Assinar Pro"
2. Backend cria sessão de pagamento no AbacatePay
3. Usuário conclui checkout
4. AbacatePay envia webhook para backend
5. Backend valida assinatura do webhook
6. Atualiza `PlanSubscription.status=active`
7. Recursos Pro liberados

## Regras de Produto
- Free: sem login, sem histórico persistente
- Conta criada sem e-mail verificado: acesso limitado
- Telefone obrigatório para plano Pro (suporte/cobrança)
- Webhook deve ser idempotente (`external_event_id` único)

## Campos mínimos de onboarding
- Nome completo
- E-mail
- Telefone (com DDI)
- Aceite de termos

## Riscos técnicos e mitigação
- Evento duplicado de webhook: idempotência por `external_event_id`
- Inconsistência de plano: reconciliação diária com gateway
- Conta fake: exigir e-mail verificado antes de ações críticas

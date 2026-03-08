# 06. Qualidade do Documento Gerado

## Critérios Mínimos para "Aprovável"
- Escopo explícito: repositório, fonte (`base/head` ou `PR`), período
- Fatos do diff com rastreabilidade
- Impactos e riscos claros
- Checklist com critérios verificáveis
- Evidências requeridas listadas
- PDF com layout estável de evidências (sem corte e sem distorção)

## Estrutura Padrão
1. Resumo executivo
2. Escopo da release
3. Fatos do diff
4. Inferências e premissas
5. Impactos
6. Riscos e mitigação
7. Checklist de validação
8. Evidências necessárias
9. Apêndice de evidências (imagens)
10. Aprovação/sign-off

## Regras de Consistência
- Datas em ISO com timezone
- Fonte sempre explícita: `commit_range` ou `pr_number`
- Arquivos afetados compatíveis com diff
- Declarações sem prova devem ser marcadas como inferência
- Imagens no apêndice final com proporção fixa e 2 por página
- Nenhuma imagem pode ser recortada; aplicar `contain` com margem interna

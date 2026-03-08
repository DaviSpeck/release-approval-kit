# 10. Entregáveis Finais

## Nome do Produto (10 opções)
1. AprovaDiff
2. ReleaseBrief
3. Merge2Board
4. ExecRelease
5. Diff2Decision
6. ApprovaKit
7. ShipNote
8. Code2Approval
9. ReleaseDossier
10. BoardReady

## Tagline (10 opções)
1. Do diff à decisão, sem ruído.
2. Transforme código em aprovação executiva.
3. Release claro, aprovação rápida.
4. Menos retrabalho, mais previsibilidade.
5. Documentação de aprovação em minutos.
6. Evidência técnica em linguagem de negócio.
7. Seu release pronto para diretoria.
8. Do GitHub ao PDF executivo.
9. Risco explícito, validação objetiva.
10. A ponte entre engenharia e decisão.

## Elevator Pitch
Produto que transforma alterações de código entre branches em um pacote de aprovação completo e rastreável, com resumo técnico e executivo, riscos, checklist e evidências recomendadas. Em vez de montar documentação manual, o time gera MD editável e PDF executivo em minutos, separando fatos do diff de inferências para acelerar decisão com menos retrabalho.

## Exemplo de Saída (Markdown)
```md
# Pacote de Aprovação de Release

## Resumo Executivo
- Fato do diff: [DADO_DO_DIFF]
- Inferência: [HIPOTESE_BASEADA_NO_DIFF]

## Escopo
- Repositório: [org/repo]
- Base: [main]
- Head: [feature/x]
- Data: [YYYY-MM-DDThh:mm:ss-03:00]

## Fatos do Diff
- `src/api/orders.ts` (modified, +42 -10)
- `src/ui/CheckoutPage.tsx` (modified, +55 -18)

## Inferências
- Possível impacto em conversão mobile (inferência)

## Riscos e Mitigações
- Risco: regressão no cálculo de frete
- Mitigação: teste E2E de cenários críticos

## Checklist de Validação
- [ ] Fluxo principal completo
- [ ] Cenário de erro
- [ ] Regressão visual mobile
- [ ] Telemetria pós-release

## Evidências Necessárias
- Desktop antes/depois
- Mobile antes/depois
- Estado de erro

## Aprovação
- Técnico: [nome]
- Produto: [nome]
- Status: [Aprovado/Ajustes]
```

## Exemplo de Saída (JSON de Metadados)
```json
{
  "run_id": "run_01JXYZ",
  "workspace_id": "ws_123",
  "repo": "org/repo",
  "base_ref": "main",
  "head_ref": "feature/x",
  "status": "completed",
  "started_at": "2026-03-07T10:00:00-03:00",
  "finished_at": "2026-03-07T10:02:30-03:00",
  "artifacts": {
    "markdown_asset_id": "asset_md_789",
    "pdf_asset_id": "asset_pdf_456"
  },
  "summary": {
    "files_changed": 12,
    "additions": 340,
    "deletions": 97,
    "change_classes": ["backend", "frontend", "docs"]
  },
  "sections": [
    { "key": "fatos_diff", "source_type": "fact" },
    { "key": "inferencias", "source_type": "inference" }
  ],
  "assumptions": [
    "Sem acesso à telemetria nesta execução",
    "Sem anexos visuais no momento da geração"
  ]
}
```

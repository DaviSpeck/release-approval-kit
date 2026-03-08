# 05. Prompting Layer (IA)

## Regras Gerais de Tom
- Objetivo e verificável
- Sem exagero ou marketingês
- Linguagem clara para técnico e executivo
- Separação obrigatória entre fatos e inferências

## Fontes Suportadas
- Fonte 1: intervalo de commits (`base..head`)
- Fonte 2: Pull Request (número/URL do PR)
- Regra: respostas devem citar a fonte usada (`commit_range` ou `pr_number`)

## Prompt Base (Resumo Técnico)
```txt
Tarefa: resumir alterações de uma fonte de mudança.
Fonte pode ser: (a) BASE/HEAD ou (b) Pull Request.
Retorne JSON com: fonte, fatos_diff, inferencias, riscos_tecnicos, duvidas.
Regras:
- fatos_diff: apenas evidências explícitas no diff/commits/arquivos.
- inferencias: hipóteses claramente rotuladas.
- citar arquivos impactados por caminho.
- não inventar contexto não presente.
```

## Prompt Versão Executiva (Não Técnica)
```txt
Converta os fatos_diff em resumo executivo para liderança.
Inclua: o que mudou, impacto, riscos, como validar.
Mantenha seção separada para inferências.
Tom: objetivo, curto, sem jargão desnecessário.
```

## Prompt Checklist de Validação
```txt
Gere checklist priorizado (crítico/alto/médio/baixo).
Cada item deve conter: objetivo, passo, resultado esperado, evidência necessária.
Baseie-se em fatos_diff; se inferir, rotule como inferência.
```

## Prompt Evidências Visuais Faltantes
```txt
Sugira evidências visuais faltantes por cenário.
Categorias: desktop, mobile, antes/depois, estado de erro, acessibilidade.
Retorne: cenário, justificativa, prioridade.
Não sugerir captura para mudanças sem impacto visual.
Incluir instrução de diagramação: evidências serão anexadas no fim do PDF,
com 2 imagens por página em moldura de proporção fixa.
```

## Estratégia de Modelos (IA)
- Padrão inicial: provider gratuito/open-source
- Fallback: segundo provider gratuito para resiliência
- Upgrade: provider pago por feature flag quando precisão/latência exigir
- Telemetria mínima: custo por run, tempo por run e taxa de retry

# NEXO CLI

A CLI do NEXO é mantida em um repositório dedicado:

- GitHub: [DaviSpeck/nexo-cli](https://github.com/DaviSpeck/nexo-cli)

Ela existe para conversão em lote e workflows de linha de comando, mantendo o backend hospedado da NEXO como fonte única da verdade.

## Como funciona

A CLI envia as conversões para:

- `https://nexo.speck-solutions.com.br/api/free/convert`

Isso significa que:

- a renderização do PDF continua alinhada com o produto hospedado
- os limites do modo Free permanecem iguais aos do website
- o uso continua sendo contado no Supabase
- o backend consegue distinguir tráfego `CLI` e `WEBSITE`

## Instalação

```bash
npm install -g nexo-md-to-pdf-cli
```

## Uso

```bash
nexo release-summary.md
nexo release-summary.md --output ./release-summary.pdf
nexo a.md b.md c.md --output-dir ./pdfs
nexo release-summary.md --logo ./brand.svg --logo-tone light
nexo config set-logo ./brand.svg --logo-tone light
nexo config show
```

Para apontar a CLI para outro ambiente:

```bash
nexo release-summary.md --api-base-url http://localhost:3000
```

## Logo padrão salva

Se você usa a mesma logo em toda conversão, pode salvá-la uma vez e reutilizar automaticamente:

```bash
nexo config set-logo ./brand.svg --logo-tone light
nexo release-summary.md
```

Para inspecionar ou limpar essa configuração:

```bash
nexo config show
nexo config clear-logo
```

A CLI salva essa preferência local em `~/.nexo/config.json`. Se você passar `--logo` em um comando de conversão, essa logo explícita continua tendo prioridade naquela execução.

## Escopo atual

- conversão de Markdown suportada
- logo opcional suportada
- anexos ficam intencionalmente fora desta primeira versão da CLI

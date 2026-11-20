# B61: 2ª questão de vestibular nas 18 aulas de Álgebra com só 1

Iniciado em 20/11/2026 (Claude Code #2). **Parado por pedido do usuário** (fim da sessão) logo no começo: **nenhuma aula foi alterada**, nenhuma questão foi inserida, nenhum roteiro ou teste foi tocado.

## Estado exato

**Feito (só preparação, fora do repositório, no scratchpad da sessão):**
- Texto de todas as 258 PDFs de `C:\Users\mkf10\projetos\provas-oficiais` extraído com `pdftotext -enc UTF-8 -layout`. Atenção: sem `-enc UTF-8`, o pdftotext desta máquina grava em Latin-1 e as buscas por palavras acentuadas falham.
- Lista das 192 questões de vestibular já usadas no app (aula | banca | ano | adaptação | id), para não repetir questão.
- Script de busca nas provas extraídas (regex → arquivo, nº da questão mais próximo, trecho).
- Formato conferido:
  - **JSON** (`treino.vestibular`): `id`, `prompt`, `fala`, `fonte{banca, ano, adaptada, adaptacao, urls}`, `options[{id, label, correct, feedback}]`.
  - **Roteiro:** a vaga livre é o bloco V2 `PENDENTE-FONTE`, a substituir no formato de V1.
  - **Teste:** `it("vestibular: <Banca> <ano> Q<n> (gabarito oficial X)")` com a conta e `certa(id)`.

**Onde parou:** primeira aula, `algebra/equacoes-e-inequacoes/equacoes-exponenciais` (a que existe é UFPR 2024 Q08). A primeira busca ("equação exponencial", "solução real da equação") devolveu estas candidatas, **ainda não abertas nem conferidas**:
- UEL 2012 Q~2
- UEL 2013 Q~3
- UEL 2020 Q~3
- UERJ (revista de questões) p. 39 Q~22 e p. 46 Q~07
- ITA 2013 Q~10, ITA 2018 Q~22 e ITA 2021 Q~47, que o buscador marcou como possivelmente já usadas: conferir em `usadas.txt` ou com o comando de lista acima.

**Falta (todas as 18 aulas):**

| aula | já tem | 2ª questão |
|---|---|---|
| equacoes-exponenciais | UFPR 2024 | em busca (candidatas acima) |
| equacoes-logaritmicas | UFRGS 2022 | falta |
| equacoes-modulares | UFRGS 2022 | falta |
| equacoes-racionais | ENEM 2009 | falta |
| inequacoes-exponenciais-logaritmicas | ENEM 2017 | falta |
| inequacoes-modulares | Unicamp 2025 | falta |
| inequacoes-produto-quociente | UFRGS 2018 | falta |
| inequacoes-quadraticas | Unicamp 2025 | falta |
| funcao-exponencial | ENEM 2023 | falta |
| funcao-modular | UERJ 2025 | falta |
| logaritmos | ENEM 2019 | falta |
| transformacoes-graficos-de-funcoes | UFRGS 2025 | falta |
| determinantes-e-matriz-inversa | Unicamp 2021 | falta |
| numeros-complexos | UFRGS 2024 | falta |
| polinomios | Unicamp 2026 | falta |
| raizes-polinomiais-e-multiplicidade | Fuvest 2022 | falta |
| soma-da-pg-infinita | Unicamp 2021 | falta |
| somatorios-pa-pg | ENEM 2018 | falta |

## Método para retomar (régua B42/B45)

1. **Extrair o texto.** O scratchpad some com a sessão. Refazer em uma pasta qualquer:
   `for f in $(find provas-oficiais -name "*.pdf"); do pdftotext -enc UTF-8 -layout "$f" "<saida>/$(echo ${f#provas-oficiais/} | tr '/' '_' | sed 's/\.pdf$/.txt/')"; done`
2. **Listar as questões já usadas**, para checar repetição: varrer `content/**/aula-01.json`, `treino.vestibular[].fonte` (banca, ano, adaptacao).
3. **Para cada candidata:**
   - conferir a página **renderizada** do PDF, porque o texto extraído achata expoentes e frações (o renderizador via Chrome headless/PDFium funcionou na B42);
   - conferir o gabarito oficial e confirmar que a questão não foi anulada;
   - refazer a conta;
   - julgar o nível e o tema da aula;
   - testar a URL oficial em `urls.txt`: resposta 200 e mesmo tamanho da cópia local.
4. **Inserir:**
   - no JSON, um feedback por errada que reconstrói o erro e dá a certa, e uma fala que não entrega a resposta;
   - no roteiro, no lugar do V2 `PENDENTE-FONTE`;
   - no teste, com a conta.
5. **Validar:** `npx vitest run src/conteudo/<slug>.test.ts` e `npm run lint:content`, aula por aula.
6. **Registrar aqui** depois de cada aula. Aula sem candidata depois de procurar em 4 bancas: registrar onde procurou e seguir.

Nenhum servidor Vite ficou rodando.

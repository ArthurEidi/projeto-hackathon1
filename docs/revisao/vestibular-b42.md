# B42: fontes erradas, questões repetidas e candidatas de provas oficiais (19/11)

Agente: Claude Code #2. Briefing: `C:\Users\mkf10\projetos\briefing-b42.md`.

## Parte 1: pendências da B41

### Fontes corrigidas (ano, número na `adaptacao` e URL do api.enem.dev)

Conferi cada uma no cache `enem-cache/matematica.json`, com mesmo texto, alternativas e gabarito.

| aula | questão (id mantido) | antes | depois |
|---|---|---|---|
| principio-fundamental-da-contagem | `enem-2025-respostas` | ENEM 2025, URL projetoagathaedu | ENEM 2012, Questão 144, https://api.enem.dev/v1/exams/2012/questions/144 |
| principio-fundamental-da-contagem | `enem-2025-montadora` | ENEM 2025, idem | ENEM 2022, Questão 142, …/2022/questions/142 |
| principio-fundamental-da-contagem | `enem-2025-placas-do-2` | ENEM 2025, idem | ENEM 2020, Questão 141, …/2020/questions/141 |
| probabilidade-condicional | `enem-2025-declaracoes` | ENEM 2025, idem | ENEM 2019, Questão 173, …/2019/questions/173 |
| probabilidade-condicional | `enem-2017-atraso` (bônus) | ENEM 2017 sem número, URL projetoagathaedu | ENEM 2017, Questão 179, …/2017/questions/179. Identificada pelo script: alternativas 0,075 · 0,150 · 0,325 · 0,600 · 0,800 iguais às do cache, gabarito C = 0,325 igual ao da aula |

Os ids continuam com "2025", porque a B41 proibia mexer em id e o progresso do aluno pode depender dele. O aluno não vê o id: a tela mostra "ENEM 2012 (adaptada)" etc. Também atualizei os roteiros `docs/planos/principio-fundamental-da-contagem.md` (V2 a V4) e `probabilidade-condicional.md` (V2 e V4).

### Questões repetidas

Um script lista banca, ano, edição e número das 147 questões de vestibular de todas as aulas. Quando falta número, ele identifica a questão do ENEM pelo texto das alternativas no cache.

- **ENEM 2012/144** estava em `fatorial-e-permutacoes` (`enem-2012-enredo`) e em `principio-fundamental-da-contagem` (`enem-2025-respostas`). A conta é 5 · 6 · 9 = 270, princípio multiplicativo puro, sem ordenar objetos. Por isso **fica em `principio-fundamental-da-contagem`**.
  - Em `fatorial-e-permutacoes` ela foi trocada pela **ENEM 2020/163** (`enem-2020-anagramas`): anagramas de I AM POTTER com vogais e consoantes intercaladas. Ela cobre exatamente o passo de "letras repetidas" da aula (n!/(a! b! …)).
  - Não estava em `docs/fontes-candidatas/fatorial-e-permutacoes.md`. Achei-a no cache procurando questões de anagrama, permutação e fila ainda não usadas.
  - No original, as alternativas são imagens. Baixei as 5 do enem.dev e as abri: A) 9!, B) 4! 5!, C) 2 × 4! 5!, D) 9!/2, E) 4! 5!/2. O gabarito do cache é E.
  - Conta: consoantes M, P, T, T, R nas 5 casas ímpares, 5!/2! = 60; vogais I, A, O, E nas 4 pares, 4! = 24; total 1 440 = 4! · 5!/2. Cada errada tem o seu erro no feedback:
    - 9!: sem intercalar nem descontar o T;
    - 4! 5!: esquece o T repetido;
    - 2 × 4! 5!: deixa começar por vogal, o que não cabe com 5 consoantes e 4 vogais;
    - 9!/2: desconta o T, mas não intercala.
  - Teste do capítulo (`src/conteudo/fatorial-e-permutacoes.test.ts`) e roteiro (V2) atualizados.
- **Item 4(d) de `docs/PROXIMOS-PASSOS.md`** (2023/138, 2021/142, 2022/167, 2019/153 e 2021/178 em duas aulas): o script não acha mais nenhuma delas repetida. Já tinham sido trocadas antes. Depois da troca acima, **não resta nenhuma questão repetida** nas 147.

Validação da parte 1: `npm run lint:content` ok; vitest de `fatorial-e-permutacoes` (11), `principio-fundamental-da-contagem` (11) e `probabilidade-condicional` (10), todos passando.

## Parte 2: auditoria das candidatas B40 (provas oficiais)

(em andamento)

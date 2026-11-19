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

**Como conferi.** O Read de PDF não funciona nesta máquina (falta o poppler), e a instalação do PyMuPDF foi negada pela permissão. Por isso renderizei cada página citada pelo Chrome headless já instalado, com um script de CDP no scratchpad, e abri as imagens: prova na página indicada e gabarito oficial. Para a UFRGS, o gabarito vem do `gabarito.html` oficial. Para UFPR e Unicamp, o próprio caderno oficial marca a resposta (► na UFPR; "Alternativa correta" na Prova Comentada da Unicamp). Resolvi cada questão. O nível foi julgado contra o recorte (itens d e g) do roteiro de cada aula, com o critério do briefing: um aluno que acabou de fazer a aula consegue resolver com esforço?

Nenhuma das 27 questões distintas foi anulada. Todas existem com o número e o gabarito indicados pelo Gemini. São 29 entradas: a ITA 2021 Q42 foi proposta para duas aulas e a UFRGS 2022 Q57 também.

| aula | candidata | PDF confere? | conta confere? | nível ok? | veredito |
|---|---|---|---|---|---|
| equacoes-exponenciais | UFPR 2024, 1ª fase, Q08 | sim (p. 4; ► D) | sim: T(0) = 180, T = 90 ⇒ a^(0,05t) = 5/2 = a^1,6 ÷ a^0,7 = a^0,9 ⇒ t = 18 | sim: logₐ2 = 0,7 lido como a^0,7 = 2 recai em bases iguais (a fala explica) | **aprovada, inserida** |
| equacoes-exponenciais | ITA 2021 Q47 | sim (p. 15; gabarito C) | sim: (59/7)^x = 59, x ≈ 1,91 ∈ (4/3, 5/2] | não: exige comparar 59 com 7⁴ e 59³ com 7⁵ (ou logaritmos), fora de "bases iguais e substituições" | recusada (nível) |
| equacoes-exponenciais | ITA 2020 Q41 | sim (p. 16; A) | sim: produto telescópico = log₂8 · log₃9 = 6 | não: produto de logaritmos com mudança de base | recusada (nível/tema) |
| equacoes-logaritmicas | UFRGS 2022 Q49 | sim (p. 26; A) | sim: u² + u − 12 = 0 ⇒ x = 8 ou 1/16 | sim | **aprovada, inserida** |
| equacoes-logaritmicas | ITA 2022 Q41 | sim (p. 16; B) | sim: log₁₂₀(2⁹ · 3³ · 5³) = log₁₂₀ 120³ = 3 | não: é uma expressão, não uma equação, e usa propriedades e mudança de base | recusada (tema/nível) |
| equacoes-logaritmicas | Unicamp 2021 Q26 | sim (p. 38; "Alternativa Correta: b") | sim: log(1/x) + log(100x) = log 100 = 2 | não é equação; usa log do produto, que o roteiro deixa fora ("aqui traduzimos para potências") | recusada (tema) |
| equacoes-modulares | UFRGS 2022 Q57 | sim (p. 30; B) | sim: \|x − 2\| + \|x\| = 4 ⇒ x = −1 ou 3; retângulo √2 × 3√2 = 6 | sim: os cruzamentos são "soma de distâncias = 4" | **aprovada, inserida** |
| equacoes-quadraticas | UFPR 2025, 1ª fase, Q05 | sim (p. 3; ► A) | sim: (x + 1)(x − 3) ⇒ b + c = −5 | sim | **aprovada, inserida** |
| equacoes-quadraticas | UFRGS 2024 Q48 | sim (p. 33; D) | sim: (−15)⁻² = 1/225 | sim | **aprovada, inserida** |
| equacoes-quadraticas | UFRGS 2025 Q63 | sim (p. 34; C) | sim: raízes 2 e 3, M_H = 12/5 = 2,4 | sim | aprovada, **não inserida** (limite de 2 por aula; os distratores das outras duas reconstroem erros melhor) |
| expressoes-algebricas-e-produtos-notaveis | Fuvest 2020, prova V, Q20 | sim (p. 7; gabarito da prova V, Q20 = A) | sim: b − a = 1, a² − b² = −3 ⇒ a + b = 3 (a = 1, b = 2) | com esforço: o cubo da diferença está no panorama, não no recorte, e a fala dá a expansão | **aprovada, inserida** |
| expressoes-algebricas-e-produtos-notaveis | UFRGS 2022 Q47 | sim (p. 25; B) | sim: (I) e (II) falsas, (III) de (√a − √b)² ≥ 0 | sim: (I) é o erro clássico de (a + b)² | **aprovada, inserida** |
| fatoracao-algebrica | UFRGS 2022 Q48 | sim (p. 25; B) | sim: a + b = 6, ab = 3 ⇒ (1/2)⁻² = 4 | sim: soma e produto lidos de (x − a)(x − b) | **aprovada, inserida** |
| fatoracao-algebrica | UFPR 2023, 1ª fase, Q10 | sim (p. 4; ► e) | sim: (c + 5)(c − 4) = 0 ⇒ c = 4; a + b = 16 ⇒ 15 | sim | **aprovada, inserida** |
| inequacoes-modulares | Unicamp 2025 Q52 | sim (p. 49; "Alternativa Correta: C") | sim: 0 ≤ x ≤ 4, 2 ≤ y ≤ 4 ⇒ x + y ≤ 8 | sim: é o "interior" da aula | **aprovada, inserida** |
| inequacoes-modulares | ITA 2017 Q7 | sim (p. 2; gabarito de Matemática Q7 = C) | sim: inteiros −4, −2 e 0 | não: módulo de uma quadrática, com casos | recusada (nível) |
| inequacoes-produto-quociente | ITA 2021 Q42 | sim (p. 14; D) | sim: com base > 0, equivale a (x² + x)(2x² − x − 1) ≤ 0 ⇒ [−1, −1/2] ∪ [0, 1] | não: o passo b^e ≤ 1 ⇔ (b − 1)e ≤ 0 (potência de base variável) não é da aula | recusada (nível) |
| inequacoes-quadraticas | Unicamp 2025 Q54 | sim (p. 50; "Alternativa Correta: B") | sim: (x − 2)(x − 6) < 0 ⇒ 3, 4, 5 | sim | **aprovada, inserida** |
| inequacoes-quadraticas | ITA 2021 Q42 | idem acima | sim | não | recusada (nível) |
| valor-absoluto-e-distancia | UFRGS 2022 Q57 | sim | sim | correlata (função modular e área) | não inserida aqui: a mesma questão entrou em `equacoes-modulares`, e a parte 1 pede para não repetir |
| valor-absoluto-e-distancia | ITA 2011 Q9 | sim (p. 3; gabarito Q9 = A) | sim: produtos 5 e −1 ⇒ −5 | não: módulo de quadrática em dois casos, fora de "distância na reta" | recusada (nível) |
| binomio-de-newton | ITA 2025, 1ª fase, Q3 | sim (p. 2; C) | sim: expoentes 11 − 2(i + j), sempre ímpares ⇒ 0 | sim: termo geral com atenção à paridade | **aprovada, inserida** |
| binomio-de-newton | ITA 2018, Matemática, Q3 | sim (p. 2; B) | sim: k = 8, 495a⁴b⁸ = 7920, b = a/2 ⇒ a = 2, b = 1 ⇒ 3 | com esforço: termo geral, PG e potência; a fala guia | **aprovada, inserida** |
| combinacoes-com-repeticao | ITA 2021 Q53 | sim (p. 16; B) | sim: Σ (43 − 2k), k = 3..21, = 19² = 361 (também por força bruta no teste) | com esforço: distribuição com mínimo e um vínculo | **aprovada, inserida** |
| leitura-de-tabelas-e-graficos | UFRGS 2022 Q59 | sim (p. 32; A) | sim: 960 ÷ 5 = 192 min = 3 h 12 min | sim: a tabela vira texto sem perder dado | **aprovada, inserida** |
| leitura-de-tabelas-e-graficos | UFRGS 2025 Q73 | sim (p. 39; E) | não refiz com segurança: depende de contar ícones de medalha no infográfico | não: o infográfico é a própria tarefa e está fora do recorte ("aqui: tabelas simples, barras, linhas e setores") | recusada (figura/tema) |
| elipse | ITA 2024 Q48 | sim (p. 17; C) | sim: (x − 2)²/(λ + 4) + (y − 5)²/λ = 1; o círculo (centro (2, 6), raio 2) cabe só se λ ≥ 9; e² = 4/(λ + 4) é máxima em λ = 9 | não: elipse com parâmetro e centro fora da origem; a aula fica no centro na origem | recusada (nível) |
| parabola-conica | ITA 2009, Matemática, Q16 | sim (p. 4; gabarito Q16 = E) | sim: (x − 1)² = 2(y − 1/4) ⇒ 4p = 2 ⇒ p = 1/2 | com esforço: completar o quadrado (já visto em quadráticas) e comparar com x² = 4py; a fala guia | **aprovada, inserida** |
| posicoes-relativas-de-retas | ITA 2024 Q47 | sim (p. 17; A) | sim, numericamente: inclinação 0,10102 = 5 − 2√6 e corte 1,58918 = 5√3 − 5√2 | não: perpendicular à bissetriz de um ângulo, com coordenadas irracionais | recusada (nível) |

**Resumo:** 27 questões distintas; **17 aprovadas** (16 inseridas e a UFRGS 2025 Q63 de reserva) e **10 recusadas**: 8 por nível ou tema (as ITA 2021 Q42/Q47, 2020 Q41, 2022 Q41, 2017 Q7, 2011 Q9 e 2024 Q47/Q48), 1 por tema (Unicamp 2021 Q26) e 1 por figura (UFRGS 2025 Q73). Das recusadas, 8 são do ITA. O que o ITA tem acima do ensino médio regular ficou de fora, mesmo com o gabarito certo.

## Parte 3: o que entrou em cada aula

16 questões em 12 aulas, todas em `treino.vestibular`. Cada uma tem:
- `prompt` resumido sem perder dados;
- as alternativas da prova;
- `correct` pelo gabarito oficial;
- `fala` com a dica que a aula sustenta;
- feedback de cada errada que reconstrói o erro que leva àquele valor e termina com a resposta certa (GUIA §2 regra 1). Onde nenhum erro dá exatamente o valor, o feedback testa o valor;
- `fonte` com banca, ano, `adaptada`/`adaptacao` (fase e número da questão) e `urls` oficiais.

Antes de usar, testei as 12 URLs de prova e as 8 de gabarito: todas respondem 200, e cada PDF tem **o mesmo tamanho em bytes** da cópia local que abri. A URL da prova da UFRGS 2024 não estava nas candidatas; achei-a na página oficial de aquisição de provas da Coperse: `…/2023/12/1o-DIA-PROVA-2024.pdf`.

| aula | questões inseridas (id) |
|---|---|
| equacoes-exponenciais | `ufpr-2024-bolo` (UFPR 2024 Q08) |
| equacoes-logaritmicas | `ufrgs-2022-log2` (UFRGS 2022 Q49) |
| equacoes-modulares | `ufrgs-2022-area-modulos` (UFRGS 2022 Q57) |
| equacoes-quadraticas | `ufpr-2025-b-mais-c` (UFPR 2025 Q05) · `ufrgs-2024-potencia-raizes` (UFRGS 2024 Q48) |
| expressoes-algebricas-e-produtos-notaveis | `fuvest-2020-cubos` (Fuvest 2020 V Q20) · `ufrgs-2022-afirmacoes-raizes` (UFRGS 2022 Q47) |
| fatoracao-algebrica | `ufrgs-2022-inverso-raizes` (UFRGS 2022 Q48) · `ufpr-2023-triplas` (UFPR 2023 Q10) |
| inequacoes-modulares | `unicamp-2025-modulos` (Unicamp 2025 Q52) |
| inequacoes-quadraticas | `unicamp-2025-composta` (Unicamp 2025 Q54) |
| binomio-de-newton | `ita-2025-termo-independente` (ITA 2025 Q3) · `ita-2018-pg-binomio` (ITA 2018 Q3) |
| combinacoes-com-repeticao | `ita-2021-balas` (ITA 2021 Q53) |
| leitura-de-tabelas-e-graficos | `ufrgs-2022-tempo-medio` (UFRGS 2022 Q59) |
| parabola-conica | `ita-2009-parabola` (ITA 2009 Q16) |

Exemplos de erro reconstruído no feedback:
- 1/8 ou 16 = raízes de u com sinal trocado; −4 ou 3 = parou em u = log₂x;
- −4 = f(1) = 1 + b + c; −1 = raízes com sinal trocado em (x − 1)(x + 3);
- 225 = (−15)², esquecendo o expoente negativo;
- 9 = esquecer o fator 3 em 3(a² − b²) = −9;
- 14 triplas = descartar a = b = 8;
- 5 inteiros = tratar < 0 como ≤ 0;
- 722 = 2 · 361, contando a troca de B e D;
- 2 = 4p e 1 = 2p na parábola;
- "inferior a três horas" = ler 192 min como 1,92 h.

**Testes:** os 7 testes que exigiam vestibular vazio (6 com `toEqual([])` e o `semVestibular` de leitura) foram trocados por contas que conferem cada gabarito oficial. As outras 5 aulas ganharam um bloco "vestibular (B42, provas oficiais)", com força bruta onde cabe (361 balas, 15 triplas, inteiros de g(f(x)) < 0, área pela fórmula do laço). **Roteiros:** a seção de vestibular dos 12 `docs/planos/<slug>.md` ganhou um bloco B42 com enunciado, fala, fonte com URLs, alternativas e conta. Os espaços PENDENTE-FONTE seguem abertos.

**Aulas que continuam sem vestibular:**
- `inequacoes-produto-quociente`, `valor-absoluto-e-distancia`, `elipse` e `posicoes-relativas-de-retas`: candidatas recusadas, ou repetida no caso de valor absoluto;
- `equacoes-irracionais`, `quartis-percentis-e-boxplot` e `vetores-no-plano`: a B40 não achou candidata.

**Validação final:** `npm run lint:content` "conteúdo ok"; `npm run typecheck` sem erros; `npx vitest run` com 132 arquivos e 2121 testes, todos passando. O script de repetidas lista 163 questões de vestibular e nenhuma repetida.

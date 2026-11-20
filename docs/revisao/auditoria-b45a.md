# Auditoria B45a: vestibular de trigonometria (19/11)

Auditor: Claude Code #2. A entrega auditada é do Antigravity (Gemini Neon), registrada em `docs/revisao/vestibular-b45a.md`. Ela traz 6 questões em `formulas-de-adicao-e-arco-duplo`, `identidades-trigonometricas` e `equacoes-trigonometricas`. A aula `inequacoes-trigonometricas` não foi tocada, porque o Antigravity ainda procura questões para ela.

## Método (o da B42)

Para cada questão:

1. Abri a página do PDF oficial renderizada (Chrome headless) e o gabarito oficial:
   - PDF de gabarito do ITA;
   - `gabarito.html` da UFRGS;
   - "Alternativa Correta" na prova comentada da Unicamp;
   - ► no caderno da UFPR.
2. Refiz a conta.
3. Julguei o nível contra o recorte e a posição da aula na trilha (`content/taxonomy.json`).
4. Comparei o enunciado do app com o original, para ver se algum dado se perdeu.
5. Conferi se cada feedback de alternativa errada reconstrói o erro exato e dá a resposta certa.
6. Testei as URLs oficiais: todas as 9 respondem 200 e têm o mesmo tamanho em bytes da cópia local.

## Resultado por questão

| aula | questão (id) | página e gabarito | conta | nível | veredito |
|---|---|---|---|---|---|
| formulas-de-adicao-e-arco-duplo | UFPR 2025 Q08 (`ufpr-2025-cos-2x`) | p. 3, ►C (7/25) | 1 − 2·(9/25) = 7/25 | ok | **aprovada com correção de feedback** |
| formulas-de-adicao-e-arco-duplo | UFRGS 2022 Q51 (`ufrgs-2022-sen-2a`) | p. 27; gabarito Matemática 51 = D (24/25) | cos α = 4/5 ⇒ 2·(3/5)·(4/5) = 24/25 | ok | **aprovada com ajuste de texto** |
| identidades-trigonometricas | Unicamp 2025 Q50 (`unicamp-2025-sen-pi12`) | p. 48 da prova comentada; "Alternativa Correta: A" | cos²(π/12) = (2 + √3)/4 ⇒ sen(π/12) = √(2 − √3)/2 | ok (a fórmula do meio-arco vem no enunciado) | **aprovada com correção de feedback** |
| identidades-trigonometricas | UFPR 2024 Q05 (`ufpr-2024-soma-quadrado`) | p. 3, ►E (1,6) | 1 + sen(2x) = 1 + 3/5 = 1,6 | ok (a fala lembra 2·sen x·cos x = sen 2x) | **aprovada com correção de feedback** |
| equacoes-trigonometricas | ITA 2017 Q2 (`ita-2017-sec-cossec`) | p. 1; gabarito oficial Matemática 2 = A (0) | cos θ = −1 ⇒ ±π (ali sen θ = 0); sen θ = −1 ⇒ −π/2 (ali cos θ = 0) ⇒ 0 soluções | **ressalva corrigida**, ver abaixo | **aprovada com correção de enunciado e feedback** |
| equacoes-trigonometricas | UFPR 2020 Q17 (`ufpr-2020-mare`) | p. 7, ►a | máximos em t = 8 e 20; n(5) = n(11) = 4; máximo − mínimo = 7 − 1 = 6 | ok | **aprovada com correção de enunciado e feedback** |

Nenhuma questão foi reprovada. Os gabaritos, as contas e as URLs da entrega estavam certos. Os problemas estavam nos textos.

## O que estava errado e foi corrigido

### UFPR 2025 Q08

- Alternativa b (3/25): o feedback dizia que o aluno "eleva o denominador ao quadrado sem elevar o 3". Esse erro levaria a sen²x = 3/25 e cos 2x = 19/25, não a 3/25. O diagnóstico era falso.
- Alternativa a (2/25): o texto "(seria 1 − 23/25)" não corresponde a erro nenhum.
- Correção: as duas alternativas não saem de nenhuma fórmula do arco duplo, e agora os feedbacks dizem isso e mostram a conta certa.
- Alternativa e: tirei o "mais uma vez" do texto.

### UFRGS 2022 Q51

- Alternativas c e e: tirei o "!" e deixei explícito o erro de tratar sen 2α como 2·sen α.

### Unicamp 2025 Q50

- Alternativa c: o feedback inventava um erro de subtração, 4 − (2 + √3) = 3 − √3, que não acontece. A própria Comvest diz que c e d não saem de erros simples.
- Agora o feedback mostra a conta certa.
- A banca estava como "UNICAMP"; passei para "Unicamp", o mesmo nome das outras aulas.

### UFPR 2024 Q05

- Alternativa a (0,8): o feedback dava dois diagnósticos especulativos. O erro real é que 0,8 = 4/5 = cos(2x), que vem de cos²x − sen²x. Corrigido; o teste agora confere cos(2x) = 0,8.
- Alternativa d (1,4): o diagnóstico "1 + 0,4" não se sustentava. Agora o feedback mostra a expansão certa e nota que (sen x − cos x)² daria 0,4.

### ITA 2017 Q2 (nível)

- Na trilha, `equacoes-trigonometricas` vem **antes** de `identidades-trigonometricas`, a aula que define sec θ e cossec θ (`content/taxonomy.json`). Do jeito que estava, o aluno via "sec" e "cossec" sem definição.
- O núcleo da questão é o tema da aula: resolver cos θ = −1 e sen θ = −1 numa volta e checar o domínio. Por isso a questão fica, com as definições acrescentadas ao enunciado: "Com sec θ = 1/cos θ e cossec θ = 1/sen θ, …". A `fonte.adaptacao` registra o acréscimo.
- Feedback da alternativa a: "anula cossec" foi trocado por "cossec θ não existe", porque "anular" sugere valer zero.
- Feedback da alternativa b: reescrito para descrever o erro de verdade, que é aceitar uma das raízes sem ver que o outro fator não existe nela.
- Feedback da alternativa c: reescrito para dizer onde cada fator deixa de existir.
- O teste agora varre os ângulos de π/4 em π/4 e confirma que nenhum zera um fator mantendo o outro definido.

### UFPR 2020 Q17

- Enunciado: a afirmativa 4 virou "variação 3m", que se confunde com a amplitude (que também é 3 m). O original diz "a diferença entre o nível mais alto e o nível mais baixo é de 3 metros". Agora o enunciado diz "máx − mín = 3 m", e também tirei o "2x/dia".
- Alternativa c: o feedback agora reconstrói o erro, que é ler o deslocamento t − 5 como máximo às 5 h e mínimo 6 h depois.
- Padronizei as horas como "8 h".

### Roteiros

As 6 questões tinham entrado num apêndice no fim de `docs/planos/<slug>.md`, fora das vagas V. Por isso o `lint:planos` contava "0 reais, 4 pend." nas três aulas.

Restaurei os roteiros e pus cada questão numa vaga V, no formato que o lint lê: tabela de opções, fonte com "(adaptada)" e URL, e conta de conferência. Agora as três aulas estão com "2 reais, 2 pend." e status ok.

## Validação

- `lint:content`: ok.
- `lint:planos`: ok nas 3 aulas.
- vitest dos 3 capítulos: 45 testes passando.
- `tsc --noEmit`: ok.
- vitest completo: 2 143 de 2 143.

**Arquivos alterados:**

- `content/geometria/trigonometria/{formulas-de-adicao-e-arco-duplo,identidades-trigonometricas,equacoes-trigonometricas}/aula-01.json`;
- os 3 `docs/planos/<slug>.md`;
- `src/conteudo/identidades-trigonometricas.test.ts` e `src/conteudo/equacoes-trigonometricas.test.ts`, com asserções reforçadas;
- este registro.

Os testes da B45a em `formulas-de-adicao-e-arco-duplo.test.ts` ficaram como estavam.

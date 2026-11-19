# Revisão B39r: correções da B39a em `escala/` e `grupos/` (19/11, Claude Code #2)

Escopo: correções do Antigravity para os achados da revisão B35 (`docs/revisao/codigo-b33-codex.md`, seções `escala` e `grupos`), publicadas em 268a0d2. Só relatório; nenhum código foi editado. Na segunda parte atualizei os registros de `docs/entregas/`.

## Método

- **Código de antes:** o commit 268a0d2 traz as pastas inteiras (eram novas), então `git show` não isola a B39a. Comparei com o backup `wip-b33` (71499d9, anterior à B37/B39), via `git diff 71499d9 268a0d2 -- src/widgets/common/escala src/widgets/common/grupos`. As mudanças nessas pastas se limitam às correções e a ajustes de desenho da B37.
- **"O teste falharia com o código antigo?"** Conferido por execução, não por leitura. Copiei `src/` para o scratchpad, troquei `calc.ts`, `desenho.ts` e `params.ts` de `escala/` e `grupos/` pelas versões de 71499d9, mantive os testes novos e rodei `vitest`. Resultado: **os 9 testes novos falham**, todos por asserção, no cenário do achado (mensagens abaixo). No repositório atual as duas pastas passam: 23/23.
- **Casos de borda:** um script de sondagem desenhou os dois widgets num contexto 2D falso, que grava texto (largura de 0,6 · fonte por caractere) e círculos. Rodei o mesmo script no código novo e no antigo, para separar o que a B39a introduziu do que já existia.

## escala

| Achado B35 | Resolve o cenário? | O teste falharia antes? | Caso de borda novo? |
|---|---|---|---|
| **Alta**: quadro só até milhares/milésimos (`a = 2`, `n = ±4` mostrava 0) | **Sim.** `quadroOrdens` lê os algarismos de `toPrecision(10)`/`toExponential()` e estende as colunas até o maior e o menor algarismo não nulo. Sonda: 20000 → `10⁴:2 UM:0 C:0 D:0 U:0`; 0,0002 → `U:0 d:0 c:0 m:0 10⁻⁴:2`. Bônus: 123,456 antes saía `C:1 D:2 U:3 d:4 c:6` (arredondado para 123,46); agora sai `… c:5 m:6` | **Sim**: `expected undefined to match object { exp: 4, digito: '2' }` (escala.test.ts:89) | **Baixa**: o número de colunas não tem teto. 2·10¹⁰ e 1/3 dão 13 colunas de ~25 px em 360 px, e os cabeçalhos "10⁻¹"/"10⁻²" chegam a encostar. A aula usa n ∈ [−2; 2] (máx. 5 colunas). Sugestão: limitar a ~9 colunas e marcar "…" no lado cortado |
| **Média**: referência de `normalizar` com `n_ref = 1` dizia "20·10¹" | **Sim.** `aRef = valorDe(valor, −n_ref)` = 20 · 10⁻¹ = 2 → "Referência: 2·10¹" | **Sim**: `expected [ … ] to include 'Referência: 2·10¹'` (:102) | Não |
| **Média**: `n = 3` com `faixa_n = [−2; 2]` punha o marcador sobre 10² | **Sim.** A régua passa a ir de min(faixa, n) a max(faixa, n); com n = 3 o rótulo "2·10³" fica na marca 10³ (teste e sonda: 0 sobreposições) | **Sim**: `expected undefined to be defined` (a marca 10³ não existia; :114) | **Baixa**: a expansão também não tem teto. Sonda (faixa [−2; 2]): n = 10 dá 13 marcas e 5 pares de rótulos encostados ("10⁹" × "10¹⁰" na régua, "10⁻¹" × "10⁻²" no quadro); n = 20 dá 80 pares sobrepostos. No código antigo eram 0 e 1, mas com o marcador no lugar errado. Com n = 20 o chip "N = 200000000000000000000" sai do canvas nos dois códigos. A aula não chega lá. Sugestão: rotular de k em k marcas quando passar de ~8, ou indicar "fora da régua" além de um limite |
| **Baixa**: `estaNormalizado` com tolerância (aceitava 0,9999999995) | **Sim.** `a ≥ 1 && a < 10` exatos | **Sim**: `expected true to be false` (:122) | Não. Receio conferido: sem a tolerância, um resíduo de ponto flutuante poderia tirar 1 ou 10 da faixa. Mas o `a` do modo normalizar vem de `valorDe` (arredonda a 10 algarismos) e, na sonda, `"0.7+0.3"` e `"$a*0.1"` (a = 10) dão `a = 1`, `normalizado = 1` |

## grupos

| Achado B35 | Resolve o cenário? | O teste falharia antes? | Caso de borda novo? |
|---|---|---|---|
| **Alta**: `a = 4`, `b = 6`, `m = 24` mostrava "MMC = 24" | **Sim.** Compara com `mmc(a, b)`; 24 mostra "múltiplo comum" e "Múltiplo comum de 4 e 6 (MMC = 12)". Sonda confirma 12 → "MMC = 12" | **Sim**: `expected [ 'm = 24', 'MMC = 24', … ] to not include 'MMC = 24'` (grupos.test.ts:105) | **Baixa** (observação para autores): as métricas não distinguem o MMC de outro múltiplo comum (24 também emite `resto: 0`). A aula sobe m de 1 em 1 a partir de valor menor, então o primeiro zero é 12. Com passo que pule o 12 (ex.: 8, 16, 24), `resto ≤ 0` concluiria em 24. Sugestão: métrica `eh_mmc` |
| **Média**: d = −3 virava 1 e d = 2,5 virava 3 | **Parcial.** Schema recusa literal fora de inteiro; `dividirInteiros` lança `RangeError`; desenho mostra "Divisor inválido: use inteiro ≥ 1". **Mas as métricas não:** `metricasGrupos` devolve `resto: NaN` e `q: 0`, e o widget converte NaN em 0 (`GruposWidget.tsx:19`). Sonda: d = 2,5, −3 e 0 emitem `{ n: 6, d, q: 0, resto: 0 }`. Uma meta `resto ≤ 0` concluiria com divisor inválido (antes também concluía, pela divisão por 3). **Gravidade média.** Sugestão: com divisor inválido, não emitir `q`/`resto` (o motor dá falso para métrica ausente) e emitir `valido: 0` | **Sim**: `expected true to be false` no schema (:110), antes das partes de cálculo e desenho. O teste **não** cobre as métricas, por isso a lacuna acima passa | `RangeError` só seria risco se algum chamador pulasse a validação. Os três chamadores (`calc.ts:142`, `desenho.ts:203`, `desenho.ts:399`) validam antes. **Baixa**: no modo `mmc`, `m` via slider não é validado depois de avaliado; m = 2,5 vira 3 no desenho e nas métricas (sonda), o mesmo padrão do achado. A aula usa passo inteiro |
| **Média**: n = d = 40 estourava a caixa e o canvas | **Sim**, no eixo x: as fichas quebram em fileiras dentro da caixa. Sonda: x de −167 a 535 (antigo) passa a 40 a 328 (novo) em 368 px | **Sim**: `expected -173.5 to be greater than or equal to 0` (:133) | **Baixa**: agora a caixa cresce para baixo sem limite. n = d = 200 põe a última fileira em y = 262 (+ raio 6,5) num canvas de 265 px; antes era só x. O estouro vertical com muitos grupos já existia antes e continua igual: n = 200, d = 7 e n = 120, d = 1 vão até y ≈ 580 e 545. O teste só olha x. Sugestão: reduzir o raio ou parar com "+ k fichas" quando não couber; testar y também |
| **Média**: `fatoracao` com `mostrar_resto: false` escrevia "12 = 5·2 + 2" | **Sim.** Rodapé "12 fichas em grupos de 5"; o teste confere também a ausência de "r = 2" e "Sobra: r = 2" | **Sim**: `expected [ … ] to not include '12 = 5·2 + 2'` (:142) | Não |
| **Baixa**: n = 1 terminava em "1 = " | **Sim.** "0 não tem fatoração prima" / "1 não tem fatoração prima" | **Sim**: `expected [ … ] to not include '0 = '` (:152) | Não |

## Resumo

- Os **9 achados** de escala e grupos foram atacados e **todos os 9 testes novos falham com o código antigo, pelo motivo certo** (execução no scratchpad).
- **8 resolvidos; 1 parcial:** em grupos, divisor inválido continua emitindo `resto = 0` (média; a aula não é afetada porque seu `d` vem de slider inteiro).
- **Casos de borda novos ou que sobraram, todos baixos e fora da faixa das aulas:** quadro de ordens e régua de escala sem teto de colunas/marcas (n = 10 encosta, n = 20 sobrepõe); grupos crescendo na vertical (n = d = 200 passa 3,5 px da borda; o estouro com muitos grupos já existia); `m` não inteiro via slider no mmc; métrica do mmc não distingue o mínimo.
- **Lacunas de teste:** o teste do divisor não olha as métricas, e o das 40 fichas não olha o eixo y.

## Parte 2: `docs/entregas/`

Os 4 capítulos aparecem em 3 registros de uma linha. Reescrevi só as 4 linhas: cada uma diz o widget próprio de cada passo (com a seção do GUIA e o registro `docs/visual/widget-b33<letra>.md`) e a validação de 19/11 (`npx vitest run src/conteudo/<slug>.test.ts`), sem descrever a adaptação.

| Arquivo | Capítulo | Widget próprio (passos) | vitest |
|---|---|---|---|
| `Shell.md` | notacao-cientifica-e-ordem-grandeza | `escala_decimal` §5.21: p1 potencia, p2 normalizar, p3 ordem; figura em p4 e p5 | 6/6 |
| `Antigravity.md` | sistemas-numericos-e-divisibilidade | `grupos_inteiros` §5.22: p2, p3, p4; figura em p5 e p6 (p1 `reta_numerica`, como no roteiro) | 16/16 |
| `Antigravity2.md` | divisao-polinomial-e-teorema-do-resto | `divisao_polinomial` §5.23: p1 constante, p3 chave (p2, p4–p6 `plano_cartesiano`/`plano_figura`, como no roteiro) | 11/11 |
| `Antigravity2.md` | sistemas-lineares-e-escalonamento | `sistema_escalonado` §5.24: p2, p3, p4; figura em p5 e p6 (p1 `plano_cartesiano`, como no roteiro) | 11/11 |

Os passos por widget foram lidos das aulas (`content/.../aula-01.json`), e o "como no roteiro" foi conferido em `docs/planos/<slug>.md`. A nota antiga "vestibular vazio" da notação científica estava desatualizada (a aula tem 2 questões) e foi corrigida.

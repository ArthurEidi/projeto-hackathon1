# Desafios com 4 alternativas — Frente B14d

| slug | opção (label) | certa? | erro que gera o valor (conta) | o que a figura mostra |
|---|---|---|---|---|
| `divisao-polinomial-e-teorema-do-resto` | `0` (`micro-erro`) | não | Confundiu `x = 2` com raiz da curva (`P(2) = 0`) | Raízes `±1` em `c4` e guia vertical `x = 2` (`c1`) sobre `P(x) = x² − 1` |
| `divisao-polinomial-e-teorema-do-resto` | `3` (`micro-acerto`) | sim | `P(2) = 2² − 1 = 4 − 1 = 3` | Figura inicial (`P(x) = x² − 1`) |
| `divisao-polinomial-e-teorema-do-resto` | `−1` (`termo-constante`) | não | Leu o termo constante / avaliou em `x = 0`: `P(0) = 0² − 1 = −1` | Intercepto Y marcado e ponto `(0; −1)` em `c4` sobre `x² − 1` |
| `divisao-polinomial-e-teorema-do-resto` | `5` (`sinal-constante`) | não | Trocou o sinal do termo constante (`−1` → `+1`): `2² + 1 = 5` | Curva `x² + 1` com ponto `(2; 5)` em `c4` e guia `x = 2` (`c1`) |
| `numeros-complexos` | `7` (`micro-erro`) | não | Somou os catetos diretamente: `3 + 4 = 7` | `z = 3 + 4i` e conjugado, destaque em `c1` e `c2` (`modulo: false`) |
| `numeros-complexos` | `25` (`esqueceu-raiz`) | não | Calculou `|z|²` e esqueceu a raiz: `3² + 4² = 9 + 16 = 25` | `z = 3 + 4i` sem conjugado e sem módulo, destaque em `c3` |
| `numeros-complexos` | `5` (`micro-acerto`) | sim | `|3 + 4i| = √(3² + 4²) = √25 = 5` | `z = 3 + 4i`, conjugado e módulo visíveis, destaque em `c4` |
| `numeros-complexos` | `√7` (`subtraiu-quadrados`) | não | Subtraiu os quadrados dos catetos: `√(4² − 3²) = √(16 − 9) = √7` | `z = 3 + 4i` sem conjugado e sem módulo, destaque em `c1` e `c2` |
| `polinomios` | `6` (`micro-erro`) | não | Somou os coeficientes sem sinal: `3 + 2 + 1 = 6` (mesmo distrator do treino f2) | `3x³ − 2x + 1` junto de `x⁶ (grau 6)` em `c1` |
| `polinomios` | `4` (`soma-expoentes`) | não | Somou os expoentes dos termos com `x`: `3 + 1 = 4` | `3x³ − 2x + 1` junto de `x⁴ (grau 4)` em `c1` |
| `polinomios` | `1` (`termo-menor`) | não | Olhou para o termo constante `1` ou o expoente de `−2x¹` (`1`) | `3x³ − 2x + 1` junto de `−2x + 1 (grau 1)` em `c1` |
| `polinomios` | `3` (`micro-acerto`) | sim | Maior expoente com coeficiente não nulo em `3x³ − 2x + 1` é `3` | Figura inicial (`3x³ − 2x + 1`) |
| `raizes-polinomiais-e-multiplicidade` | `1` (`micro-acerto`) | sim | Fator `(x − 1)²` tem raiz `x = 1` com multiplicidade `2` | Figura inicial (`(x − 1)²(x + 2)` com raízes marcadas) |
| `raizes-polinomiais-e-multiplicidade` | `−2` (`micro-erro`) | não | Pegou a raiz do outro fator `(x + 2)`, que tem multiplicidade `1` | Ponto `(−2; 0)` e guia vertical `cruza em −2` em `c1` |
| `raizes-polinomiais-e-multiplicidade` | `−1` (`sinal-trocado-fator`) | não | Copiou `−1` direto de `(x − 1)²` sem igualar a zero (`P(−1) = (−2)²·1 = 4 ≠ 0`) | Ponto `(−1; 4)` e guia vertical `x = −1` em `c1` |
| `raizes-polinomiais-e-multiplicidade` | `2` (`termo-positivo`) | não | Copiou `+2` de `(x + 2)` ou o expoente `2` (`P(2) = 1²·4 = 4 ≠ 0`) | Ponto `(2; 4)` e guia vertical `x = 2` em `c1` |
| `sequencias-pa-pg` | `−6` (`o2`) | não | Contou 5 avanços em vez de 4 (`a₁ + 5d = 4 + 5·(−2) = −6`) | PA com 6 termos, barra `a₆ = −6` acesa (maestro: a figura com `d = −10` desenhava outra PA; voltou a de antes, aceita na B11d) |
| `sequencias-pa-pg` | `−4` (`o1`) | sim | `a₅ = 4 + (5 − 1)·(−2) = 4 − 8 = −4` | PA `a₁ = 4, d = −2, termos = 5`, barra `a₅ = −4` acesa |
| `sequencias-pa-pg` | `12` (`sinal-trocado`) | não | Trocou o sinal da razão (`d = +2`): `4 + 4·2 = 12` | PA crescente `a₁ = 4, d = 2, termos = 5`, barra `a₅ = 12` acesa |
| `sequencias-pa-pg` | `64` (`usou-pg`) | não | Confundiu PA com PG (`q = −2`): `4 · (−2)⁴ = 64` | PG `a₁ = 4, q = −2, termos = 5`, barra `a₅ = 64` acesa |
| `sequencias-recursivas-e-padroes` | `4` (`o2`) | não | Somou `1` ao último termo como PA (`a₄ + 1 = 3 + 1 = 4`) | Barra `a₄ = 3` acesa com degraus (`+0, +1, +1`) |
| `sequencias-recursivas-e-padroes` | `7` (`soma-todos`) | não | Somou todos os 4 termos anteriores (`1 + 1 + 2 + 3 = 7`) | Todas as 4 barras (`a₁..a₄`) acesas |
| `sequencias-recursivas-e-padroes` | `5` (`o1`) | sim | `a₅ = a₄ + a₃ = 3 + 2 = 5` | Barras `a₁..a₅` com `a₅ = 5` acesa |
| `sequencias-recursivas-e-padroes` | `6` (`multiplicou-ultimos`) | não | Multiplicou os dois últimos termos (`a₃ · a₄ = 2 · 3 = 6`) | Barras `a₃ = 2` e `a₄ = 3` acesas com degraus |
| `soma-da-pg-infinita` | `14` (`o2`) | não | Somou só os 3 primeiros termos: `S₃ = 8 + 4 + 2 = 14` | PG com `n = 3` (`S₃ = 14` na torre acumulada, `limite: false`) |
| `soma-da-pg-infinita` | `12` (`soma-dois-termos`) | não | Somou só os 2 primeiros termos: `S₂ = 8 + 4 = 12` | PG com `n = 2` (`S₂ = 12` na torre acumulada, `limite: false`) |
| `soma-da-pg-infinita` | `4` (`segundo-termo`) | não | Calculou só `a₁ · q = 8 · 0,5 = 4` | PG com `n = 2`, `acumular: false`, barra `a₂ = 4` acesa |
| `soma-da-pg-infinita` | `16` (`o1`) | sim | `S∞ = 8 ÷ (1 − 0,5) = 16` | PG com `n = 6`, torre acumulada e linha `limite: true` (`16`) |
| `somatorios-pa-pg` | `40` (`o1`) | sim | `S₅ = 5 · (2 + 14) ÷ 2 = 40` | PA com `n = 5` e `acumular: true` (`S₅ = 40`) |
| `somatorios-pa-pg` | `26` (`o2`) | não | Omitiu o 5º termo: `S₄ = 2 + 5 + 8 + 11 = 26` | PA com `n = 4` e `acumular: true` (`S₄ = 26`) |
| `somatorios-pa-pg` | `80` (`esqueceu-dividir-dois`) | não | Fez `n · (a₁ + a₅) = 5 · (2 + 14) = 80` sem dividir por `2` | 5 barras de altura `16` com `acumular: true` (`S₅ = 80`) |
| `somatorios-pa-pg` | `16` (`somou-extremos`) | não | Somou apenas os extremos: `a₁ + a₅ = 2 + 14 = 16` | PA sem torre acumulada com `a₁ = 2` e `a₅ = 14` acesos |
| `solidos-de-revolucao` | `Dois cilindros (20π)` (`cc20`) | não | Calculou `π·2²·2 + π·2²·3 = 8π + 12π = 20π` (tratou o cone como cilindro) | Peças separadas (`juntar: 0`), destaque em `c2` |
| `solidos-de-revolucao` | `Só um cone (4π)` (`co4`) | não | Considerou apenas o cone do topo: `(π·2²·3)/3 = 4π` | Peças separadas (`juntar: 0`), destaque em `c1` |
| `solidos-de-revolucao` | `Cilindro + cone (12π)` (`cc12`) | sim | `V = π·2²·2 + (π·2²·3)/3 = 8π + 4π = 12π` | Silo montado (`juntar: 1`), destaque em `c4` |
| `solidos-de-revolucao` | `Cilindro + cone (6π)` (`cc6`) | não | Esqueceu de elevar `r = 2` ao quadrado: `π·2·2 + (π·2·3)/3 = 4π + 2π = 6π` | Peças separadas (`juntar: 0`), destaque em `c1` e `c2` |

**Validação final:** `npx vitest run --configLoader native` nos 9 testes da B14d: **9/9 arquivos, 106/106 testes passando**; `npm run lint:content`: **`conteúdo ok` (exit 0)**; `npm run typecheck`: **0 erros nos arquivos da B14d** (erros apenas em `determinantes-e-matriz-inversa.test.ts` e `matrizes-determinantes-sistemas.test.ts` da frente B14c em andamento). Limitações de widget: em `vetores_figura` (`modo: "complexo"`) não há rótulo numérico de `|z|² = 25` ou `√7`, então as figuras das erradas diferenciam os destaques (`highlight`) e ocultam o conjugado mantendo `modulo: false` para não entregar `5`; em `solido_3d_figura` (`modo: "composicao"`), o widget não desenha dois cilindros nem altera o cone para cilindro na sobreposição, então as erradas usam `juntar: 0` com `highlight` distinto por opção (`c2`, `c1`, `c1+c2`).

**Auditoria do maestro (15/11):** contas refeitas e fotos em 400 px (`C:\Users\mkf10\projetos\capturas-b14cd\`). Ajustes: `polinomios` (6): feedback passou a dizer o erro exato (soma dos coeficientes sem sinal, como no treino f2); `sequencias-pa-pg` (−6): voltou a figura de 6 termos; `numeros-complexos`: as figuras de 7 e √7 eram iguais à inicial, agora 7 desenha z = 7 + 0i (as partes na mesma reta) e √7 desenha o triângulo com 4 na hipotenusa (Módulo = 4); `solidos-de-revolucao`: as erradas eram quase iguais à inicial, agora "dois cilindros" apaga o cone, "só um cone" apaga o cilindro e 6π desenha o silo com r ≈ 1,41 (r² = 2). Pendência de layout: em `solidos-de-revolucao` o enunciado tem 4 linhas e a figura 3D é alta; a 4ª opção fica abaixo do rodapé em 400 × 860 e exige rolar.

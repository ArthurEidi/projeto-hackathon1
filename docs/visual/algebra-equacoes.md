# Conferência visual — Álgebra (Equações e Matrizes)

| slug | passo | defeito | tipo | corrigido? |
|---|---|---|---|---|
| equacoes-exponenciais | p2 (mesma-altura) | `marcar.encontro: true` exibe `(3; 8)` antes de o aluno arrastar (exigido pela métrica `no_encontro`) | widget | sim (etiqueta do encontro só aparece quando o ponto arrastado chega lá; o ponto já mostra (3; 8) ao chegar, sem etiqueta dupla; `revelaEncontro` em desenhoPlano.ts; B1, 14/11, recapturado em 400 px) |
| equacoes-exponenciais | p3 (base-neutra) | Rótulo da curva `y = 1` omitido/recortado perto do eixo x | widget | sim (rótulo de curva ganha 3ª tentativa sem a faixa de 10% das bordas; `y = 1` aparece acima da reta; B1, 14/11, recapturado em 400 px) |
| equacoes-exponenciais | p4 (conferir-previsao) | `marcar.encontro: true` exibia `(3; 8)`, entregando a resposta `3` de `2ˣ=8` | conteúdo | sim |
| equacoes-exponenciais | p5 (fechamento) | Fórmula `bᵘ = bᵛ ⇔ u = v (b > 0 e b ≠ 1)` cortada à esquerda; `ponto` + `marcar.encontro` duplicava `(3; 8)` sobrepondo `y = 8` | conteúdo | sim |
| equacoes-irracionais | p3 (rejeitar-sinal) | `ponto.curva: null` agrupa rótulos `0` e `1,41` perto da origem tocando `y = x` | widget | sim (já resolvido por d76a4b9 (rotulosPlano): `0` e `1,41` separados e longe de `y = x`; B1, 14/11, recapturado em 400 px) |
| equacoes-irracionais | p5 (fechamento) | `ponto` + `marcar.encontro` desenhava duas etiquetas roxas `(2; 2)` | conteúdo | sim |
| equacoes-logaritmicas | p5 (fechamento) | `ponto` + `marcar.encontro` duplicava `(4; 2)` sobrepondo `y = 2`; subscrito cru `log_b` na fórmula e na fala | conteúdo | sim |
| equacoes-modulares | p1 (caso-neutro) | `reta_numerica` recorta etiquetas de distância/ponto (`0` e `1`) na borda inferior do cartão | widget | sim |
| equacoes-modulares | p3 (deslocar-centro) | Etiqueta `(−1; 2)` sobrepõe o rótulo cinza `y = |x|` | widget | sim (já resolvido por d76a4b9 (rotulosPlano); B1, 14/11, recapturado em 400 px) |
| equacoes-modulares | p4 (conferir-previsao) | `marcar.encontro: true` exibia `(−1; 2)` e `(3; 2)`, entregando a resposta `−1 e 3` de `|x−1|=2` | conteúdo | sim |
| equacoes-modulares | p5 (fechamento) | Token `"|x"` colocava `|` dentro da caixa de `x`, separando do `|` final | conteúdo | sim |
| equacoes-primeiro-grau | p4 (conferir-previsao) | `marcar.encontro: true` exibia `(2; 0)`, entregando a resposta `2` de `2x−4=0` | conteúdo | sim |
| equacoes-primeiro-grau | p5 (fechamento) | `ponto` + `marcar.encontro` duplicava `(2; 0)` sobrepondo `y = 0` | conteúdo | sim |
| equacoes-quadraticas | p4 (deslocar-centro) | Etiqueta azul `(1; −1)` sobrepõe a etiqueta roxa da raiz `2` | widget | sim (já resolvido por d76a4b9 (rotulosPlano); B1, 14/11, recapturado em 400 px) |
| equacoes-quadraticas | p6 (fechamento) | Fórmula `x = (−b ± √Δ)/(2a); Δ = b² − 4ac; raízes` cortada nas duas laterais em 400px | conteúdo | sim |
| equacoes-racionais | p5 (fechamento) | `ponto` + `marcar.encontro` desenhava duas etiquetas roxas `(2; 1)` | conteúdo | sim |
| expressoes-algebricas-e-produtos-notaveis | p4 (conferir-previsao) | `retangulo_areas_figura` exibe `Lado = 3`, `Área = 9` e `4 + 2 + 2 + 1 = 9`, entregando a resposta `9` | widget | sim |
| expressoes-algebricas-e-produtos-notaveis | p5 (fechamento) | Tokens `"(a"`, `"+b"`, `")² = a² + 2ab + b²"` agrupavam parênteses dentro das caixas | conteúdo | sim |
| fatoracao-algebrica | p3 (fator-comum) | Etiqueta `(1; −1)` sobrepõe a etiqueta roxa da raiz `2` | widget | sim (já resolvido por d76a4b9 (rotulosPlano); B1, 14/11, recapturado em 400 px) |
| fatoracao-algebrica | p4 (conferir-previsao) | `marcar.raizes: true` exibia `0` e `2` no gráfico, entregando a resposta `0 e 2` de `x(x−2)=0` | conteúdo | sim |
| inequacoes-exponenciais-logaritmicas | p1, p2, p5 | Etiqueta `(0; 1)` sobrepõe o rótulo escuro `y = 1` | widget | sim (`(0; 1)` separado desde d76a4b9; letras dos eixos agora reservadas, e `y = 1` deixou de cobrir o `x` (p2, p5); B1, 14/11, recapturado em 400 px) |
| inequacoes-exponenciais-logaritmicas | p5 (fechamento) | Token `"b"` separado de `"ᵘ > bᵛ ⇔ "` soltava o expoente `ᵘ` fora da caixa | conteúdo | sim |
| inequacoes-modulares | p1, p2 | `reta_numerica` recorta etiquetas de distância/ponto na borda inferior do cartão | widget | sim |
| inequacoes-modulares | p5 (fechamento) | Tokens `"|x"` e `"− c| < r"` prendiam barras de módulo dentro das caixas | conteúdo | sim |
| inequacoes-primeiro-grau | — | sem achados (5 imagens) | — | — |
| inequacoes-produto-quociente | p4 (conferir-previsao) | `trechos` (`x < −1`) e `pontos` (`−1` aberto) já exibiam que `x = −1` está fora da solução | conteúdo | sim |
| inequacoes-quadraticas | p2 (entre-raizes) | Etiqueta `(−2; 3)` cortada na borda superior do cartão (`y` ajustado de `[-3, 3]` para `[-3, 4]`) | conteúdo | sim |
| determinantes-e-matriz-inversa | p3 (colapso) | Em `transformacao_2d` com `A = I`, etiquetas `(1; 1)` e `(2; 1)` de entrada e saída se sobrepõem | widget | sim |
| determinantes-e-matriz-inversa | p5 (fechamento) | Token único `) · [[d, −b], [−c, a]]; ad − bc ≠ 0` cortado nas duas laterais em 400px | conteúdo | sim |
| matrizes-determinantes-sistemas | p1, p2 | Em `transformacao_2d` com `A = I`, etiquetas `(0; 1)` e `(1; 1)` de entrada e saída se sobrepõem | widget | sim |
| matrizes-determinantes-sistemas | p4 (encontro-sistema) | `marcar.encontro: true` exibe `(2; 1)` antes de o aluno arrastar (exigido pela métrica `no_encontro`) | widget | sim (etiqueta `(2; 1)` só quando o ponto chega ao encontro (mesma correção de equacoes-exponenciais p2); B1, 14/11, recapturado em 400 px) |
| matrizes-determinantes-sistemas | p5 (conferir-previsao) | `transformacao_2d_figura` exibe `(2; 3)` no vetor imagem, entregando a resposta `(2;3)` | widget | sim |
| sistemas-lineares-e-escalonamento | p1, p2 | Etiquetas de ponto `(0; 3)` e `(1; 2)` sobrepõem rótulos das retas (`2x + y = 4`, `x + y = 3`, `y = 2`) | widget | sim (já resolvido por d76a4b9 (rotulosPlano); B1, 14/11, recapturado em 400 px) |
| sistemas-lineares-e-escalonamento | p6 (fechamento) | `ponto` + `marcar.encontro` desenhava duas etiquetas `(1; 2)` sobrepondo `x + y = 3` e `y = 2` | conteúdo | sim |

## Resumo

- **Total:** 17 capítulos inspecionados (90 capturas iniciais + recapturas de verificação), **33 achados** no total: **17 de conteúdo** (todos corrigidos) e **16 de widget** (**6 corrigidos** em `reta_numerica`, `transformacao_plano`/`transformacao_figura` e `retangulo_areas`/`retangulo_areas_figura`; **10 pendentes** exclusivos de `plano_cartesiano`).

### Padrões recorrentes
1. **Spoiler em `micro_challenge` (`conferir-previsao`):** `marcar.encontro: true`, `marcar.raizes: true` ou `trechos`/`pontos` abertos na figura inicial entregam a resposta antes de o aluno escolher (`equacoes-exponenciais`, `equacoes-modulares`, `equacoes-primeiro-grau`, `fatoracao-algebrica`, `inequacoes-produto-quociente`). Nos widgets `retangulo_areas_figura` e `transformacao_2d_figura`, o próprio widget exibe o valor final (`Área = 9`, `(2; 3)`).
2. **Etiqueta duplicada em `concept_lock` (`fechamento`):** combinar `ponto` na solução com `marcar.encontro: true` desenha duas etiquetas idênticas sobrepostas ou colidindo com rótulos de curvas (`equacoes-exponenciais`, `equacoes-irracionais`, `equacoes-logaritmicas`, `equacoes-primeiro-grau`, `equacoes-racionais`, `sistemas-lineares-e-escalonamento`).
3. **Fórmulas do `concept_lock` em 400px:** tokens longos sem quebra cortam nas laterais (`equacoes-exponenciais`, `equacoes-quadraticas`, `determinantes-e-matriz-inversa`), parênteses/barras de módulo/expoentes ficam presos ou separados das caixas (`equacoes-modulares`, `expressoes-algebricas-e-produtos-notaveis`, `inequacoes-exponenciais-logaritmicas`, `inequacoes-modulares`), ou usam subscrito cru (`log_b` em `equacoes-logaritmicas`).
4. **Colisão e recorte em widgets:** `reta_numerica` recorta etiquetas de distância na borda inferior; `plano_cartesiano` colide etiquetas de ponto/raiz/curva; `transformacao_2d` sobrepõe etiquetas de entrada e saída quando `A = I`.

### 5 achados mais graves
1. **`determinantes-e-matriz-inversa` (`p5`):** fórmula do `concept_lock` cortada nas duas bordas em 400px (`conteúdo`, corrigido).
2. **`equacoes-quadraticas` (`p6`):** fórmula de Bhaskara cortada nas duas bordas em 400px (`conteúdo`, corrigido).
3. **`expressoes-algebricas-e-produtos-notaveis` (`p4`):** `retangulo_areas_figura` exibe `Área = 9` e `4 + 2 + 2 + 1 = 9` na pergunta sobre a área (`widget`, pendente).
4. **`equacoes-modulares` (`p4`) / `fatoracao-algebrica` (`p4`):** `marcar.encontro` / `marcar.raizes` na figura inicial do `micro_challenge` entregava as soluções exatas (`conteúdo`, corrigido).
5. **`inequacoes-quadraticas` (`p2`):** etiqueta `(−2; 3)` cortada na borda superior do plano cartesiano (`conteúdo`, corrigido).

# B14c: desafios com 4 alternativas (álgebra, funções e matrizes)

Frente B14c, Claude Code #2 (Máquina B), 15/11/2026. Em cada capítulo, o `micro_challenge` passou de 2 para 4 alternativas (1 certa, 3 erradas). Só o bloco `options` mudou; `prompt`, `lines`, `duvida`, figura inicial e ids de passo ficaram iguais. Os feedbacks das erradas que já existiam e citavam a resposta certa foram reescritos. Posição da certa: 3, 1, 4, 2, 3, 1, 4, 2, 1, 4, 2, 3 (3 vezes cada posição).

Figura: "base" = figura inicial do desafio; a opção sobrescreve só os campos citados (merge raso).

| slug | opção (label) | certa? | erro que gera o valor (conta) | o que a figura mostra |
|---|---|---|---|---|
| funcao-composta-e-inversa | 2x − 1 | não | trocou só o sinal do 1 de 2x + 1; 2·3 − 1 = 5 ≠ 1 (não leva f(1) = 3 de volta a 1) | base + reta 2x − 1 (c4), que não passa pelo reflexo (3; 1) |
| funcao-composta-e-inversa | 1/(2x + 1) | não | usou 1/f(x) (inverso multiplicativo); 1/(2·3 + 1) = 1/7 ≠ 1 | base + curva racional 0,5/(x + 0,5) = 1/(2x + 1) (c1) |
| funcao-composta-e-inversa | (x − 1)/2 | **sim** | x = 2y + 1 ⇒ y = (x − 1)/2; (3 − 1)/2 = 1 | base + reta f⁻¹ (c2) |
| funcao-composta-e-inversa | x/2 − 1 | não | desfez na mesma ordem de f (dividiu antes de subtrair); 3/2 − 1 = 0,5 ≠ 1 | base + reta x/2 − 1 (c1, destacada) |
| funcao-definida-por-partes | −2 | **sim** | −2 < 0 ⇒ f(x) = x ⇒ f(−2) = −2 | ponto no trecho x < 0 (c4) |
| funcao-definida-por-partes | −4 | não | usou a regra do trecho x ≥ 0: 2·(−2) = −4 | trecho 2x prolongado para x < 0 e ponto (−2; −4) nele |
| funcao-definida-por-partes | −6 | não | somou as duas regras: x + 2x = 3x; 3·(−2) = −6 | trechos originais em fantasma + reta "x + 2x" com ponto (−2; −6) |
| funcao-definida-por-partes | 0 | não | leu a saída na fronteira x = 0 em vez da entrada: 2·0 = 0 | ponto (0; 0) na fronteira + guia vertical "fronteira" |
| funcao-exponencial | −4 | não | o menos do expoente virou sinal da saída: −(2²) = −4 | guia horizontal y = −4 (abaixo do eixo, onde a curva nunca chega) e guia x = −2 |
| funcao-exponencial | 4 | não | ignorou o sinal do expoente: 2² = 4 | ponto (2; 4) da curva + guia x = −2 |
| funcao-exponencial | −1/4 | não | inverteu, mas levou o menos para a saída: −(2⁻²) = −1/4 | assíntota y = 0 marcada + guia y = −1/4 abaixo dela |
| funcao-exponencial | 1/4 | **sim** | 2⁻² = 1/2² = 1/4 | ponto (−2; 0,25) da curva (c2) |
| funcao-modular | (−1; −2) | não | trocou os sinais de h e k; na curva, f(−1) = −|−2| + 2 = 0 ≠ −2 | ponto (−1; 0) da curva |
| funcao-modular | (1; 2) | **sim** | |x − 1| = 0 em x = 1; f(1) = 2 | ponto (1; 2) (c4) |
| funcao-modular | (−1; 2) | não | trocou só o sinal de h: vértice de −|x + 1| + 2 | base + V de −|x + 1| + 2 (c1) |
| funcao-modular | (1; −2) | não | levou o menos da frente para k: vértice de −|x − 1| − 2 | base + V de −|x − 1| − 2 (c3) |
| funcao-quadratica | (−1; 1) | não | trocou os dois sinais: vértice de (x + 1)² + 1; na curva, f(−1) = 4 − 1 = 3 ≠ 1 | ponto (−1; 3) da curva |
| funcao-quadratica | (0; 0) | não | tomou o intercepto/raiz pelo vértice: f(0) = 0, mas raízes 0 e 2 e f(1) = −1 < 0 | ponto (0; 0) + raízes marcadas |
| funcao-quadratica | (1; −1) | **sim** | (x − 1)² = 0 em x = 1; f(1) = −1 | ponto (1; −1) (c4) |
| funcao-quadratica | (−1; −1) | não | trocou só o sinal de h: vértice de (x + 1)² − 1 = x² + 2x | base + parábola (x + 1)² − 1 (c1) |
| funcao-racional | x=2 e y=1 | **sim** | x − 2 = 0 ⇒ x = 2; termo de fora +1 ⇒ y = 1 | assíntotas da curva marcadas |
| funcao-racional | x=−2 e y=−1 | não | trocou os sinais dos deslocamentos: assíntotas de 1/(x + 2) − 1 | assíntotas extras x = −2 e y = −1 (janela x de −3 a 6 para x = −2 aparecer) |
| funcao-racional | x=1 e y=2 | não | trocou os papéis: o +1 de fora virou a vertical e o 2 do denominador a horizontal | assíntotas extras x = 1 e y = 2, longe da curva |
| funcao-racional | x=2 e y=0 | não | esqueceu o +1: assíntotas de 1/(x − 2) | base + curva 1/(x − 2) (c1) colada em y = 0 |
| introducao-a-funcoes | É função | não | olhou os pontos separados; x = 1 tem duas saídas (2 e 4): {1, 1} tem 1 entrada para 2 pontos | guia vertical x = 1 cruzando as duas alturas (figura que já existia) |
| introducao-a-funcoes | É função injetora | não | usou o teste da reta horizontal: as saídas 2 e 4 têm uma entrada cada ({2, 4} tem 2 valores) | guias horizontais y = 2 e y = 4 |
| introducao-a-funcoes | É função constante | não | confundiu entrada repetida (x = 1 nos dois pontos) com saída repetida (2 ≠ 4) | base + reta horizontal "constante" y = 2 (c2) |
| introducao-a-funcoes | Não é função | **sim** | x = 1 tem duas saídas, 2 e 4 | base com destaque em c4 |
| logaritmos | 8 | não | deu o argumento como resposta; 2⁸ ≠ 8 | ponto (8; 8) na reta y = x |
| logaritmos | 3 | **sim** | 2³ = 8 ⇒ log₂(8) = 3 | ponto (8; 3) do log (c2) |
| logaritmos | 4 | não | dividiu o argumento pela base: 8 ÷ 2 = 4; 2⁴ = 16 ≠ 8 | ponto (4; 2) do log (log₂ 4 = 2) |
| logaritmos | 256 | não | elevou 2 ao argumento: 2⁸ = 256 | guia vertical x = 8 com 2ˣ (destacada) saindo do quadro muito antes |
| transformacoes-graficos-de-funcoes | (1;2) | **sim** | (0;0) vai 1 à direita (x − 1) e 2 para cima (+2): vértice de −(x−1)²+2 | ponto (1; 2) na curva (c4) |
| transformacoes-graficos-de-funcoes | (−1;−2) | não | inverteu os dois sentidos: vértice de −(x+1)²−2 | base + parábola −(x+1)²−2 (c1); janela y de −5 a 4 |
| transformacoes-graficos-de-funcoes | (1;−2) | não | refletiu também o +2: −(f(x − 1) + 2) = −(x−1)²−2 | base + parábola −(x−1)²−2 (c4); janela y de −5 a 4 |
| transformacoes-graficos-de-funcoes | (−1;2) | não | leu x − 1 como 1 à esquerda: vértice de −(x+1)²+2 | base + parábola −(x+1)²+2 (c1) |
| determinantes-e-matriz-inversa | diag(−2;−1) | não | negou A em vez de inverter; diag(−2;−1)·diag(2;1) = diag(−4;−1) ≠ I | composição: (1; 1) vai a (−4; −1) |
| determinantes-e-matriz-inversa | diag(1;2) | não | trocou a e d (adjunta) sem dividir por det = 2; diag(1;2)·diag(2;1) = diag(2;2) ≠ I | composição: (1; 1) vai a (2; 2) |
| determinantes-e-matriz-inversa | diag(1;0,5) | não | dividiu A por det = 2 sem trocar a e d: diag(2/2; 1/2); produto diag(2;0,5) ≠ I | composição: (1; 1) vai a (2; 0,5) |
| determinantes-e-matriz-inversa | diag(0,5;1) | **sim** | 2·0,5 = 1 e 1·1 = 1: produto = I | composição volta a (1; 1) |
| matrizes-determinantes-sistemas | (2;6) | não | dobrou as duas coordenadas: diag(2;2)·(1;3) = (2;6) | matriz diag(2;2) com a imagem |
| matrizes-determinantes-sistemas | (2;3) | **sim** | (2·1; 1·3) = (2;3) | imagem ligada |
| matrizes-determinantes-sistemas | (1;6) | não | pôs o 2 na direção y: diag(1;2)·(1;3) = (1;6) | matriz diag(1;2) com a imagem |
| matrizes-determinantes-sistemas | (2;0) | não | parou em 1·(coluna 1) = (2;0), sem somar 3·(coluna 2) | matriz [[2,0],[0,0]] (sem a 2ª coluna): plano achatado, det 0, imagem (2;0) |
| sistemas-lineares-e-escalonamento | Infinitas | não | confundiu 0 = 1 com 0 = 0 (que viria de 2x + 2y = 4: 4 − 2·2 = 0) | retas coincidentes x + y = 2 e 2x + 2y = 4 (figura que já existia) |
| sistemas-lineares-e-escalonamento | Uma | não | achou que 2 equações e 2 incógnitas dão sempre uma solução; det = 1·2 − 1·2 = 0 | cursor em x = 2 mostrando alturas diferentes (0 e 0,5) nas duas retas |
| sistemas-lineares-e-escalonamento | Nenhuma | **sim** | L₂ − 2L₁: 0x + 0y = 5 − 2·2 = 1, impossível | as duas retas paralelas destacadas |
| sistemas-lineares-e-escalonamento | Duas | não | contou uma solução por equação; (1; 1) cumpre L₁ (1 + 1 = 2), mas não L₂ (2 + 2 = 4 ≠ 5) | ponto (1; 1) na reta x + y = 2, fora da outra |

**Validação:** `npx vitest run` nos 12 testes: 12 arquivos, 118 testes passando; `npm run lint:content`: conteúdo ok; `npm run typecheck`: sem erros. Cada teste ganhou `toHaveLength(4)`, a conta de cada errada nova e a lista de legendas na ordem do JSON (todas distintas). As asserções antigas (`find(!correct)` = errada original) continuam valendo porque a errada original segue sendo a primeira errada.

**Dúvidas e limitações de widget:**
- `introducao-a-funcoes`: a aula desenha os pontos (1; 2) e (1; 4) sobre as retas y = x + 1 e y = x + 3 (o widget não tem ponto solto). Na figura de "É função injetora", as guias y = 2 e y = 4 também cortam as retas em outros x; a figura serve para mostrar o teste horizontal, mas não é limpa.
- `funcao-definida-por-partes`, opção "0": a guia vertical x = 0 coincide com o eixo y; o que se vê é a etiqueta "fronteira" e o ponto (0; 0).
- `logaritmos`, opção "256": não dá para marcar (8; 256) no quadro; a figura mostra a guia x = 8 e a curva 2ˣ saindo pelo topo.
- `sistemas-lineares-e-escalonamento`: "Duas" é o distrator mais fraco (erro de contagem, menos comum que os outros).
- Figuras das erradas antigas que mostravam a resposta foram trocadas: em `funcao-exponencial` (ponto em x = −2 mostrava 0,25) e em `logaritmos` (ponto (8; 3) no log). Em `transformacoes-graficos-de-funcoes`, o cursor antigo em x = −1 mostrava g(−1) = −2, o que fazia (−1; −2) parecer certo; virou a parábola do erro.
- Não fotografei as figuras em 400 px; fica para a auditoria (B14e).

**Auditoria do maestro (15/11):** contas refeitas, nenhum feedback de errada cita a certa, fotos em 400 px de cada alternativa depois de VERIFICAR (`C:\Users\mkf10\projetos\capturas-b14cd\`): 12/12 aprovados. Achado de layout: com legenda acima de 10 caracteres as 4 opções viram lista e a 4ª ficava abaixo do rodapé em 400 × 860 (`introducao-a-funcoes`, `determinantes-e-matriz-inversa`); corrigido em `src/ui/styles.css` (cartões da lista com 44 px e espaço de 8 px). Ressalva: em `funcao-exponencial` (−1/4) o rótulo "y = −1/4" encosta no da assíntota.

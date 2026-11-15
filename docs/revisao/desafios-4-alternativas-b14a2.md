# B14a2: desafios com 4 alternativas (expressões, fatoração e inequações)

Frente B14a2 (resto da B14a), feita por Claude Code #2 (Máquina B) em 15/11/2026. Nas 7 aulas de `content/algebra/equacoes-e-inequacoes/` abaixo, o `micro_challenge` passou de 2 para 4 alternativas (1 certa, 3 erradas). Só o bloco `options` mudou; `prompt`, `lines`, figura inicial e ids de passo ficaram iguais. Os feedbacks das erradas que já existiam e citavam a resposta certa foram reescritos. Posição da certa: 4, 2, 1, 3, 2, 4, 1.

Enunciados de 16 a 38 caracteres. Legendas novas com até 10 caracteres; a única maior é "Fora de [−1; 1]" (15), que já existia em `inequacoes-quadraticas` e deixa esse desafio em lista (o enunciado tem 16 caracteres).

Figura: "base" = figura inicial do desafio; a opção sobrescreve só os campos citados (merge raso).

| slug | opção (label) | certa? | erro que gera o valor (conta) | o que a figura mostra |
|---|---|---|---|---|
| expressoes-algebricas-e-produtos-notaveis | 5 | não | só os quadrados: 2² + 1² = 5, sem as faixas ab | a² e b² destacados (figura que já existia) |
| expressoes-algebricas-e-produtos-notaveis | 6 | não | dobrou o lado em vez de elevar ao quadrado: (2 + 1)·2 = 6 | modo raiz: quadrado de área 6, "Lado = 2,45" (≠ 3) |
| expressoes-algebricas-e-produtos-notaveis | 7 | não | uma faixa ab só: 4 + 2 + 1 = 7 | modo raiz: quadrado de área 7, lado ≈ 2,65 (≠ 3) |
| expressoes-algebricas-e-produtos-notaveis | 9 | **sim** | 4 + 2 + 2 + 1 = 9 | as 4 peças destacadas e a área total |
| fatoracao-algebrica | Só 2 | não | dividiu por x e perdeu a raiz 0 | x(x − 2) em fantasma + reta x − 2 com a raiz (figura que já existia) |
| fatoracao-algebrica | 0 e 2 | **sim** | x = 0 ou x − 2 = 0 | raízes marcadas |
| fatoracao-algebrica | 0 e −2 | não | sinal trocado no fator: −2 zera x(x + 2), mas em x(x − 2) dá (−2)(−4) = 8 ≠ 0 | original em fantasma + parábola x² + 2x com as raízes −2 e 0 |
| fatoracao-algebrica | Só 1 | não | tomou o vértice pelo zero: 1·(1 − 2) = −1 ≠ 0 | ponto (1; −1) e vértice marcado |
| inequacoes-exponenciais-logaritmicas | x<0 | **sim** | base 0,5 decresce: (0,5)ˣ > (0,5)⁰ ⇒ x < 0 | ponto (−1; 2) |
| inequacoes-exponenciais-logaritmicas | x>0 | não | manteve a ordem de base crescente; (0,5)¹ = 0,5 < 1 | ponto (1; 0,5) (figura que já existia) |
| inequacoes-exponenciais-logaritmicas | x<1 | não | escreveu 1 como (0,5)¹ (é (0,5)⁰); x = 0,5 dá ≈ 0,71 < 1 | ponto (0,5; 0,71) + guia x = 1 |
| inequacoes-exponenciais-logaritmicas | x∈ℝ | não | confundiu "sempre > 0" com "> 1"; (0,5)² = 0,25 | assíntota y = 0 marcada + ponto (2; 0,25) |
| inequacoes-modulares | [−2; 2] | não | incluiu os extremos: |2| = 2, não < 2 | trecho fechado (figura que já existia) |
| inequacoes-modulares | (−∞; 2) | não | tirou o módulo (x < 2); −3 < 2, mas |−3| = 3 | trecho até 2 e ponto "|−3| = 3" |
| inequacoes-modulares | (−2; 2) | **sim** | −2 < x < 2 | trecho aberto |
| inequacoes-modulares | [0; 2) | não | só os positivos; |−1| = 1 < 2 ficou de fora | trecho [0; 2) e ponto "|−1| = 1" fora dele |
| inequacoes-primeiro-grau | x > 1 | não | não inverteu ao dividir por −2; −2·2 + 2 = −2 | trecho x > 1 (figura que já existia) |
| inequacoes-primeiro-grau | x < 1 | **sim** | −2x > −2 ⇒ x < 1 | trecho x < 1 |
| inequacoes-primeiro-grau | x < −1 | não | passou o 2 sem trocar o sinal: −2x > 2 ⇒ x < 2/(−2) = −1; mas x = 0 dá 2 > 0 | trecho x < −1 e o ponto 0 fora dele |
| inequacoes-primeiro-grau | x ≤ 1 | não | fechou o extremo: −2·1 + 2 = 0, não > 0 | só o ponto 1 fechado com "−2·1 + 2 = 0" |
| inequacoes-produto-quociente | Sim | não | o ≥ aceita 0, mas valor 0 pede numerador zero (x = 1); em −1 zera o denominador | ponto −1 rotulado "x + 1 = 0" e ponto 1 (o rótulo antigo "x=−1 não pode" entregava a resposta) |
| inequacoes-produto-quociente | Sim: dá 0 | não | tratou −2 ÷ 0 como 0 | ponto −1 rotulado "−2 ÷ 0 = ?" |
| inequacoes-produto-quociente | Não: dá −2 | não | olhou só o numerador: −1 − 1 = −2 | ponto −1 rotulado "x − 1 = −2" |
| inequacoes-produto-quociente | Não | **sim** | x + 1 = 0 em −1: a fração não existe | −1 aberto e 1 fechado |
| inequacoes-quadraticas | [−1; 1] | **sim** | (x − 1)(x + 1) ≤ 0 entre as raízes, inclusive | ponto (0; −1) |
| inequacoes-quadraticas | Fora de [−1; 1] | não | pegou o sinal positivo; f(2) = 3 > 0 | ponto (2; 3) (figura que já existia) |
| inequacoes-quadraticas | (−1; 1) | não | deixou as raízes de fora; f(1) = 0 satisfaz ≤ 0 | ponto (1; 0) em destaque |
| inequacoes-quadraticas | x ≤ 1 | não | tirou a raiz de x² ≤ 1 sem o ±; f(−2) = 3 > 0 | ponto (−2; 3) |

**Validação:** `npx vitest run` nos 7 testes: 7 arquivos, 119 testes passando; `npm run lint:content`: conteúdo ok; `npm run typecheck`: sem erros. Cada teste ganhou `toHaveLength(4)`, a conta de cada errada nova e a lista de legendas na ordem do JSON. As asserções antigas foram mantidas.

**Dúvidas e limitações de widget:**
- `inequacoes-produto-quociente` é uma pergunta de sim/não. Mantive "Sim" e "Não" (o teste confere a certa "Não") e acrescentei duas com o motivo: "Sim: dá 0" e "Não: dá −2". Ficam 2 de cada lado, para a certa não ser a única diferente. "Não: dá −2" tem a conclusão certa com a conta errada; o feedback não confirma a conclusão, só manda calcular o denominador.
- `expressoes-algebricas-e-produtos-notaveis`: o modo `produto` não deixa tirar uma faixa, então as erradas 6 e 7 usam o modo `raiz` (quadrado de área 6 ou 7, com o lado que não dá 3).
- `inequacoes-primeiro-grau`, "x ≤ 1": a figura mostra só o extremo fechado com a conta; desenhar o trecho mostraria a direção certa.
- Não fotografei as figuras em 400 px; fica para a auditoria.

**Auditoria do maestro (15/11):** contas das 21 erradas refeitas (ex.: `expressoes` 7 = a² + ab + b² = 4 + 2 + 1, uma faixa só; `inequacoes-primeiro-grau` x < −1 = −2x > 2 sem trocar o sinal do 2), nenhum feedback de errada cita a certa, fotos em 400 px de cada alternativa depois de VERIFICAR (`C:\Users\mkf10\projetos\capturas-b14a2\`): 7/7 aprovados. Ajustes: em `inequacoes-produto-quociente` a certa passou de "Não" para "Não: não existe" (com "Não: dá −2" entre as erradas, "Não" sozinho era ambíguo: quem marcava a conta errada chegava à mesma conclusão), com feedback que explica o motivo; em `fatoracao-algebrica` (Só 1) o rótulo (1; −1) saía duas vezes, ficou só o ponto.

# Conferência visual: geometria (frente 5, Máquina B)

Método: app em `npx vite --port 5191`, Chrome headless dirigido pelo protocolo DevTools (viewport 400 × 860, `mobile: true`, mouse emulado), screenshot real de cada passo, arraste/toque de verdade no canvas e cliques nos botões da aula. Cada `micro_challenge` foi respondido com ao menos um distrator e depois com a certa. O mouse emulado deixa a dica (`Dica`) aberta quando o cursor para sobre um rótulo; isso não foi contado como defeito (no toque não acontece).

Tipo: **conteúdo** = corrigível no `aula-01.json`; **widget** = só a Máquina A corrige (`src/widgets/common/**`).

## Achados

| slug | passo | defeito | tipo |
|---|---|---|---|
| plano-cartesiano-distancia-e-ponto-medio | 2 `pitagoras` | A pergunta "quanto mede AB?" já vem respondida no canvas: o chip "d = 5" aparece desde o início. | widget (`pontos_no_plano` sempre mostra d; falta opção para esconder) |
| plano-cartesiano-distancia-e-ponto-medio | 4 `ponto-medio` | B continua arrastável; se o aluno mover B antes de ligar M, a fala de conclusão "M = (3; 3,5)" fica falsa. | conteúdo (pôr `fixos: ["a","b"]`) |
| plano-cartesiano-distancia-e-ponto-medio | 5 `desafio-6-8` | A figura do desafio mostra "d = 10", a resposta certa, antes de o aluno responder. | widget (`pontos_figura` sempre mostra d) |
| plano-cartesiano-distancia-e-ponto-medio | 5 `desafio-6-8` | Enunciado fala em O(0; 0) e P(6; 8); a figura rotula os pontos como A e B. | widget (rótulos fixos A/B) |
| plano-cartesiano-distancia-e-ponto-medio | 6 `fechamento` | Com quadrados e ponto médio ligados, o chip de baixo mostra "M(3; 3,5)" no lugar de "d = 5", e a fórmula da tela é a da distância d. | widget (o chip de M substitui o de d) |
| reta-equacao-e-inclinacao | 1, 2, 4 (todos em `pontos_no_plano` modo reta) | Os botões "Quadrados" e "Ponto médio" aparecem no modo reta, onde não fazem parte da aula; o chip "d = …" também aparece e não tem papel ali. A linha "m = …; n = …", que é o que importa nesta aula, sai em letra pequena (13 px) espremida abaixo do chip d. | widget (modo reta deveria esconder as chaves e o d, e dar destaque a m e n) |
| reta-equacao-e-inclinacao | 1, 2, 4 | A reta infinita é desenhada além da malha: atravessa a borda do plano e passa por cima do chip "Δx = …" e da área dos rótulos. | widget (recortar a reta na caixa da malha) |
| reta-equacao-e-inclinacao | 1 `mesma-altura` | Quando o passo conclui no meio do arraste, a fala de conclusão (4 linhas) empurra o canvas 20 px para baixo e B "pula" um quadradinho a mais (soltei em y = 5, ficou y = 6). Mesmo efeito em `plano-cartesiano-distancia-e-ponto-medio` passo 1. | widget/UI (layout muda durante o arraste) |
| reta-equacao-e-inclinacao | 3 `corte-no-eixo-y` e 6 `fechamento` | O triângulo "anda 1, sobe 2" começa em x = 0, então o chip "1" do degrau fica logo abaixo do ponto de corte, ao lado do chip "1" do intercepto: dois "1" colados, fácil de confundir. | conteúdo (pôr `triangulo.x` em 1) |
| reta-equacao-e-inclinacao | 5 `desafio-equacao`, alt. "y = 4x − 1" | O chip "+2" do triângulo fica escondido atrás do rótulo "(1; 3)" do ponto; a figura de erro não mostra o degrau que deveria mostrar. | conteúdo (tirar `coordenadas` do ponto nessa opção ou mover o triângulo) |
| reta-equacao-e-inclinacao | 5 `desafio-equacao`, alt. "y = x + 2" | O rótulo "(3; 7)" encosta no rótulo da curva "y = 2x + 1" no topo da janela. | conteúdo (aumentar `y` até 9) e widget (rótulos não se evitam) |
| reta-equacao-e-inclinacao | 6 `fechamento` | A fórmula "y = m x + n ; m = Δy / Δx" (12 peças) não cabe em 400 px: o "y" sai cortado à esquerda e o "Δx" à direita. | conteúdo (encurtar a fórmula; ex.: tirar "; m = Δy/Δx" e deixar Δy/Δx na definição) |

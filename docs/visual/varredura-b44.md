# Varredura automática B44a

Viewport de 400 × 860 px em navegador headless e Vite em modo dev. Todas as aulas publicadas da taxonomia.

Cada passo foi aberto pelo atalho de desenvolvimento e conferido no estado inicial. O treino foi acessado pelo convite após o último passo, até a primeira questão básica.

A checagem usa os elementos esperados de cada tipo de passo e lê os pixels dos canvases 2D para identificar superfícies inteiramente brancas ou transparentes. O navegador emula `prefers-reduced-motion: reduce`, que desativa a animação de entrada do app. Na execução inicial, essa animação chegou a registrar 425 px de largura e elementos invisíveis durante a montagem do passo. A borda direita é medida ao longo de toda a tela rolável, com tolerância de 0,5 px para arredondamento. A medição ignora elementos invisíveis, a geometria interna de SVGs e a parte recortada por ancestrais com `overflow-x: hidden` ou `clip`. Elementos repetidos com o mesmo seletor aparecem agrupados por tela.

| Aula | Passo | Problema | Detalhe |
| --- | --- | --- | --- |
| — | — | — | Nenhum problema detectado. |

**Total:** 104 aulas, 560 passos e 104 treinos verificados (104 abriram). 0 registro(s) de problema.

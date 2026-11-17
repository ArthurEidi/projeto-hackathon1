# Correções B32: `solido_3d` sem a resposta antes de concluir (16–17/11/2026)

Escopo: os 2 casos que a B29b deixou para widget (`piramides` p2 e `poliedros-e-relacao-de-euler` p1). Começada por Claude Code #2 em 16/11 e interrompida sem commit (limite do Claude); terminada e conferida pelo maestro em 17/11.

## Widget

- `src/widgets/common/solido/params.ts`: `rotulo_apotema` (modo `piramide`) e `rotulo_euler` (modo `poliedro`), ambos `z.boolean().default(true)`. O padrão mantém as outras 8 aulas que usam `solido_3d` como estavam.
- `src/widgets/common/solido/cenas.ts`: com `rotulo_apotema: false`, os segmentos do apótema (parado e na abertura em estrela) ficam sem rótulo; com `rotulo_euler: false`, o placar mostra só `V`, `A` e `F`.
- GUIA §5.7: bloco "Acréscimo de 17/11".

## Aulas

- `piramides` p2 (`abrir-paredes`): `"antes_de_concluir": { "rotulo_apotema": false }`. A fala pergunta a altura de cada triângulo; antes, o chip `5` aparecia já com 0% aberto.
- `poliedros-e-relacao-de-euler` p1: `"antes_de_concluir": { "rotulo_euler": false }`. A fala pergunta quanto dá 4 − 6 + 4; antes, o chip `V − A + F = 2` estava na tela.
- A métrica de conclusão não depende das chaves novas (`abrir ≥ 100`; `solidos_vistos ≥ 3`).

## Testes

- `solido.test.ts`: padrão mostra o 5 e a soma; com `false` tira só eles (pirâmide com abrir 0, 50 e 100).
- `piramides.test.ts` e `poliedros-e-relacao-de-euler.test.ts`: com `paramsDoPasso` e o estado não concluído, o 5 e a soma não aparecem; concluído, aparecem.

## Prova visual (400 × 860, `C:\Users\mkf10\projetos\capturas-b32\depois`)

- `piramides-p2.png`, `piramides-p2-abrir=50.png`: segmento do apótema sem número. `piramides-p2-abrir=100.png`: chip `5`, fala `done`, CONTINUAR verde.
- `poliedros-e-relacao-de-euler-p1.png`: placar `V 4 · A 6 · F 4`. Depois de clicar tetraedro, cubo e octaedro: `V 6 · A 12 · F 8 · V − A + F = 2`, fala `done`, CONTINUAR verde.

Com isso, os 25 casos de "figura que entrega a resposta" da B27c/d estão resolvidos (23 nas B29a/b e B31a/b, 2 aqui).

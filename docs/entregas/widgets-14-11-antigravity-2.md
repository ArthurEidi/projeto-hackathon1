# Entrega de ajustes em widgets — Antigravity #2 (14/11)

Documentação complementar no formato do `docs/GUIA-CAPITULOS.md` §5 para os parâmetros adicionados nesta entrega.

### 5.18 `retangulo_areas` + `retangulo_areas_figura` (acréscimo)

Pasta `common/areas/`; novo campo comum opcional em `base` (válido nos modos `produto`, `raiz`, `escala`):

- `mostrar?: { total?: boolean }`: padrão `{ total: true }`. Quando `total: false`, oculta a etiqueta `Área = ...` e a linha de fórmula/soma inferior, mantendo visíveis a decomposição das peças, a referência tracejada e `Lado = ...` (centralizado quando `total: false`). Útil em `micro_challenge` em que a pergunta pede a área total.

```json
{"modo":"produto","a":2,"b":1,"retirar":false,"referencia":true,"mostrar":{"total":false}}
```

### 5.20 `transformacao_plano` + `transformacao_figura` (acréscimo)

Pasta `common/transformacao/`; novo campo opcional dentro de `mostrar`:

- `mostrar.imagem?: boolean`: padrão `true`. Quando `false`, oculta a etiqueta de coordenadas `(x'; y')` do vetor imagem no painel único (a seta do vetor imagem continua visível). Útil em `micro_challenge` em que a pergunta pede as coordenadas da imagem.
- Além disso, quando `mostrar.imagem` é `true` e a caixa de coordenadas da imagem intersecta a da entrada (por exemplo, `A = I`), a etiqueta da imagem é afastada verticalmente para evitar sobreposição.

```json
{"matriz":[[2,0],[0,1]],"vetor":[1,3],"janela":[-1,4],"mostrar":{"malha":true,"quadrado":true,"colunas":true,"det":true,"identidade":true,"imagem":false}}
```

### 5.2 `reta_numerica` + `reta_figura` (acréscimo)

Arquivos `RetaNumericaWidget.tsx`, `desenhoReta.ts` e `params.ts`; novo campo opcional em `RetaNumerica`:

- `mostrar?: { distancia?: boolean }`: padrão `{ distancia: true }`. Quando `distancia: false`, oculta o badge numérico da distância abaixo do segmento roxo (tanto com `ponto.centro` quanto com `ponto.distanciaZero`), mantendo o segmento, a seta de deslocamento e os rótulos dos pontos visíveis. Útil em `micro_challenge` em que a pergunta pede o valor da distância.

```json
{"intervalo":[-4,4],"marcas":1,"pontos":[{"x":-2,"cor":"c1","rotulo":"−2"},{"x":1,"cor":"c2","rotulo":"1"}],"ponto":{"x":-2,"arrastavel":false,"cor":"c1","centro":1,"corCentro":"c2","corDistancia":"c4"},"mostrar":{"distancia":false}}
```

# Correções visuais B31a — widget `barras` (16/11/2026)

Alterações em `src/widgets/common/barras/`, `docs/GUIA-CAPITULOS.md` §5.3 e `content/aritmetica/proporcionalidade/descontos-acrescimos-e-indices/aula-01.json`. Capturas de todas as 15 aulas que usam `barras` em `C:\Users\mkf10\projetos\capturas-b31a\{antes,depois}`.

## Alterações

1. **`descontos-acrescimos-e-indices` p3 (`teste-de-fronteira`):**
   - `src/widgets/common/barras/params.ts`: adicionado parâmetro opcional `valores: z.enum(["sempre", "ao_tocar"]).default("sempre")` no modo `categorias` (padrão mantém o comportamento atual em todas as outras aulas).
   - `src/widgets/common/barras/desenho.ts`: quando `p.valores === "ao_tocar"`, os valores acima das barras/linhas só são desenhados após o toque na barra (`tocadas.has(i)`).
   - `content/aritmetica/proporcionalidade/descontos-acrescimos-e-indices/aula-01.json`: ligado `"valores": "ao_tocar"` em p3.
   - Prova: `depois/descontos-acrescimos-e-indices-p3.png` (sem números inicialmente) → `depois/descontos-acrescimos-e-indices-p3-concluido.png` (`100`, `110`, `99` exibidos após tocar nas 3 barras + `CONTINUAR` verde).

2. **`medidas-de-tendencia-central` p4 (`par-e-moda`, estado concluído):**
   - `src/widgets/common/barras/desenho.ts`: em `desenharPontos`, quando `mostrar.fila` está ativo, `yViga` passa a `h * 0.56` (de `h * 0.5`) e o piso vertical dos chips `mediana` e `moda` sobe de `16` para `60` (`yTopo` mínimo `58`), mantendo o chip `mediana 6` abaixo das fichas da fila (`y = 14..44`). Quando `mostrar.fila` é `false`, nada muda.
   - Prova: `depois/medidas-de-tendencia-central-p4-concluido.png` (`mediana 6` legível abaixo de `[8]` e `[10]`, sem encostar em `moda` + `CONTINUAR` verde).

3. **Documentação e testes:**
   - `docs/GUIA-CAPITULOS.md` §5.3: documentado `valores: "sempre" | "ao_tocar"` em `categorias`.
   - `src/widgets/common/barras/barras.test.ts`: adicionados 2 testes para `valores: "ao_tocar"` e posicionamento de `mediana` com `fila: true`.

## Validação executada

- `npx vitest run src/widgets/common/barras` + testes das 15 aulas que usam `barras`: **16 arquivos, 186/186 testes passaram**.
- `npm run lint:content`: `conteúdo ok`.
- `npm run typecheck`: `tsc --noEmit` passou sem erros.

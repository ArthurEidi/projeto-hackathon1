# Widgets pendentes

Lista única dos widgets que os planos em `docs/planos/` pedem e que ainda **não existem** no app. Cada agente acrescenta os seus no fim, no mesmo formato. Antes de criar um widget novo, confira se um daqui já serve.

**Já existem** (não listar aqui): `plano_cartesiano` / `plano_figura`, `reta_numerica` / `reta_figura` (em `src/widgets/common/`, ver GUIA §5), `revolution`, `generatrix` e `cone_figure` (só Cones).

**Convenções para todos** (iguais às de `src/widgets/common/`):
- Arquivos em `src/widgets/common/` (widget comum) ou `src/widgets/<unidade>/` (só um capítulo). Schema zod em `params.ts`, sem React; registro em `src/widgets/params.ts` e `registry.ts`.
- Cores só por marca (`h r g c1 c2 c3 c4`) ou `ink` / `muted`; rótulos com `chip()`; quando um rótulo tem marca com glossário, empurrar `hits.push({ key: marca, ... })` para a dica.
- Valores numéricos aceitam `"$id"` (slider) no widget; a figura irmã aceita só números e um campo `highlight: Marca[]` (obrigatório se for usada em `concept_lock`).
- Métricas são números (0/1 para eventos); o passo conclui com `gte` e/ou `lte`.
- Arraste com encaixe (`passo`) para que a resposta exata seja alcançável.

---

## Do lote de Claude Code (setores 8, 9 e 13)

### 1. `grade_resultados` + figura `grade_figura`
**Capítulos:** principio-fundamental-da-contagem, fatorial-e-permutacoes, arranjos-e-combinacoes, combinacoes-com-repeticao, binomio-de-newton, probabilidade-espaco-amostral, probabilidade-uniao-e-intersecao, probabilidade-condicional, eventos-independentes, experimentos-binomial-e-repetidos.

**O que desenha:** resultados possíveis como casas tocáveis, em vários modos.

| Modo | Desenho | Usado em |
|---|---|---|
| `grade` | linhas × colunas (etapa 1 × etapa 2); células acendem; chave "pode repetir" apaga a diagonal | PFC, probabilidade |
| `arvore` | n níveis de galhos com rótulos (a/b, cara/coroa, sucesso/fracasso); pontas tocáveis; pontas agrupadas em barras por contagem | PFC, binômio, binomial, independência |
| `fila` | caixas (lugares) e fichas arrastáveis; cada caixa mostra quantas fichas ainda cabem; cadeado para prender ficha | fatorial, permutações |
| `escada` | barras n, n − 1, …, 1 e o produto | fatorial |
| `pares` | grade n × n sem diagonal; chave "a ordem importa?" funde AB e BA | arranjos e combinações |
| `lista` | arranjos empilhados por grupo (k! ordens por pilha) | arranjos e combinações |
| `barras` | barras de C(n, k) ou P(k) para k = 0..n | arranjos (simetria), binomial |
| `pascal` | linhas do triângulo; tocar mostra as duas setas de cima | binômio |
| `bolinhas_e_barras` | fileira de k bolinhas e n − 1 barras arrastáveis; caixas em cima com a contagem | combinações com repetição |
| `caixas` | itens iguais em n caixas; chave "pelo menos um" entrega 1 a cada | combinações com repetição |
| `sorteio` | casas do espaço amostral (1 × 6, 6 × 6, 2 × 2, urna); régua 0–1 com a fração acesa | probabilidade |
| `dois_eventos` | A em c1, B em c2, interseção listrada em c3; botões "unir", "tirar repetidas", "complemento" | união e interseção |
| `pista` | chave de pista B que acinzenta as casas fora de B; régua compara P(A) e P(A dado B) | condicional, independência |
| `tabela` | tabela de dupla entrada; tocar linha ou coluna a transforma na pista | condicional |

**Params principais:** `modo`; `etapas: number[]` ou `itens: string[]`; `n`, `k` (aceitam `"$id"`); `evento: number[]` (casas do evento pedido); `eventos: { a, b }`; `pista`; `p` (chance de sucesso, em %); `repetir: boolean`; `ordem: boolean`; `highlight: Marca[]`.

**Métricas:** `total`, `celulas_tocadas`, `marcadas_certas` (casas do evento pedido acesas), `pontas_tocadas`, `pontas_k1`, `pontas_k2` (pontas com k sucessos), `filas_montadas`, `distribuicoes_vistas`, `modo_ou`, `repetir_desligado`, `ordem_desligada`, `iguais_ligado`, `letra_presa`, `regra_ligada`, `uniu`, `descontou`, `complemento_visto`, `pista_ligada`, `linha_meninas` / `coluna_oculos` (genérico: `linha_tocada`, `coluna_tocada`), `extremos_vistos`, `intersecao_vista`, `chave_ligada`.

**Figura `grade_figura`:** mesmo desenho, estático, com overrides por opção (ex.: acender diagonal, mostrar pilha de ordens, trocar modo "e" por "ou").

### 2. `barras` + figura `barras_figura`
**Capítulos:** leitura-de-tabelas-e-graficos, distribuicao-de-frequencias-e-amostragem, medidas-de-tendencia-central, medidas-de-dispersao, quartis-percentis-e-boxplot.

| Modo | Desenho | Usado em |
|---|---|---|
| `barras` / `linha` / `setores` | a mesma tabela em três formas; chave de tipo; slider do início do eixo; setores mostram % e ângulo | leitura de gráficos |
| `coleta` | botões adicionam respostas; chave régua absoluta × relativa | frequências |
| `amostragem` | população fictícia com % real; sorteia amostra de tamanho n; rastro da % medida; chave "amostra viciada" | frequências |
| `pontos` | valores como pesos arrastáveis numa régua; apoio da média (equilíbrio), bandeira da mediana, moda; setas de desvio; chave "quadrados" sobre os desvios e quadrado médio (variância, lado = desvio padrão); botão "pôr em fila"; modo nivelamento (despejar e redistribuir) | tendência central, dispersão |
| `fila` | fichas ordenadas com marcadores Q1, Q2, Q3 arrastáveis; boxplot desenhado a partir deles; valor atípico vira ponto solto | quartis e boxplot |

**Params principais:** `modo`; `dados: number[]` ou `categorias: { nome, valor }[]`; `tipo` (`barras`/`linha`/`setores`); `eixo_inicio` (aceita `"$id"`); `populacao: { real: number }`; `n` (`"$id"`); `vicio: boolean`; `arrastaveis: number[]` (índices); `espalhar` (`"$s"`: valores = média ± s); `highlight`.

**Métricas:** `barras_tocadas`, `tipo_linha`, `tipo_setores`, `respostas`, `regua_relativa`, `vicio_ligado`, `arrastes`, `equilibrio` (1 quando o apoio está na média), `maior_valor`, `meios_tocados`, `desvios_ligados`, `somou`, `quadrados_ligados`, `q2_certo`, `cortes_certos`, `caixa_desenhada`.

### 3. `pontos_no_plano` + figura `pontos_figura`
**Capítulos:** plano-cartesiano-distancia-e-ponto-medio, reta-equacao-e-inclinacao.

**O que desenha:** plano com malha e 2 (ou 3) pontos arrastáveis com encaixe inteiro; segmento AB; degraus Δx (c1) e Δy (c2) formando o triângulo retângulo; chave "quadrados" sobre catetos e hipotenusa; chave "ponto médio" (c4); modo `reta`: reta infinita por A e B, m e corte n, e "m indefinido" com Δx = 0; opção de prender B à reta (desliza só sobre ela).

**Params:** `a: [x, y]`, `b: [x, y]`, `fixos: ("a" | "b")[]`, `modo: "segmento" | "reta"`, `prender_na_reta: boolean`, `mostrar: { quadrados, medio, degraus }`, `highlight`.

**Métricas:** `dx`, `dy`, `distancia`, `quadrados_ligados`, `medio_ligado`, `pontos_vistos`, `dx_zero`.

### 4. `vetores_no_plano` + figura `vetores_figura`
**Capítulo:** vetores-no-plano.

**O que desenha:** setas com cauda e ponta arrastáveis (encaixe inteiro), componentes como degraus (c1, c2), encaixe ponta-cauda e resultante (c3); multiplicação por k (slider) com o vetor original em cinza; chave "módulo" com o triângulo dos componentes (c4).

**Params:** `vetores: { id, cauda: [x, y], comp: [a, b], arrastavel: "cauda" | "ponta" | "nenhum", preso_em?: id }[]`, `escalar?: "$k"`, `mostrar_soma: boolean`, `highlight`.

**Métricas:** `origens_vistas`, `v_comprimento`, `modulo_ligado` (o slider `k` entra sozinho).

### 5. `circunferencia_no_plano` + figura `circunferencia_figura`
**Capítulo:** circunferencia-equacao-e-posicoes.

**O que desenha:** centro arrastável (c1), raio por slider (c2), curva (c3); ponto P arrastável com sua distância ao centro (c4), colorido dentro/sobre/fora; posições com d = r ficam marcadas (modo "descobrir a curva" com a curva oculta); reta horizontal y = k por slider com os pontos comuns e o rótulo secante/tangente/exterior; segunda circunferência opcional; equação escrita que se atualiza.

**Params:** `centro: [a, b]` (aceita `"$id"`), `raio` (`"$id"`), `curva_oculta: boolean`, `ponto?: [x, y]`, `reta_y?: "$k"`, `segunda?: { centro, raio }`, `highlight`.

**Métricas:** `pontos_sobre`, `estados_vistos` (0–3), `centro_x` (ou slider `a`), `k`.

### 6. `lugar_geometrico` + figura `lugar_figura`
**Capítulos:** parabola-conica, elipse, hiperbole.

**O que desenha:** focos (c3 / c1) e, na parábola, a diretriz (c2); ponto P arrastável (ou preso à curva) com os segmentos de distância e suas medidas (c4); pontos que passam no teste ficam marcados (c3); a curva pode estar oculta até o aluno descobri-la. Modos:
- `parabola`: PF = distância à diretriz; botão "igualar" mostra a álgebra até x² = 4py; slider p; fantasma de p anterior.
- `elipse`: "barbante" de comprimento 2a; P só anda com o barbante esticado; slider c (focos juntos = circunferência); tocar o topo desenha o triângulo a, b, c.
- `hiperbole`: slider da diferença 2a (0 = mediatriz); P preso ao ramo; chave "retângulo" (2a × 2b) e assíntotas; slider de zoom.

**Params:** `modo`, `p` / `a` / `c` / `diferenca` (aceitam `"$id"`), `curva_oculta`, `prender_na_curva`, `mostrar: { retangulo, assintotas, triangulo }`, `zoom` (`"$id"`), `highlight`.

**Métricas:** `vertice_achado`, `pontos_sobre`, `pontos_vistos`, `igualou`, `topo_tocado`, `triangulo_ligado` (sliders `p`, `c`, `diferenca`, `zoom` entram sozinhos).

### 7. Extensões do `plano_cartesiano` existente
**Capítulos:** posicoes-relativas-de-retas, reta-equacao-e-inclinacao.

- `marcar.angulo: boolean` — desenha o ângulo entre as curvas 0 e 1 no ponto de encontro e acende um quadradinho de ângulo reto (marca c4) quando m₁ · m₂ = −1. Métrica `angulo_reto` (0/1).
- `coincidentes` — métrica 0/1 quando as curvas 0 e 1 são a mesma; a curva 1 passa a ser desenhada tracejada sobre a 0.
- `intercepto_tocado` — métrica 0/1 ao tocar o marcador de `interceptoY`.

### 8. `solido_3d` (corte do cone) — opcional
**Capítulos:** parabola-conica, elipse, hiperbole (abertura e panorama); provavelmente também os capítulos de geometria espacial de outros agentes.

**O que desenha:** cone duplo com um plano de corte inclinável; a seção aparece colorida (circunferência, elipse, parábola, hipérbole). Reaproveitar `coneScene.ts` e `math3d/`.

**Params:** `inclinacao` (`"$id"`, graus), `altura_do_corte`. **Métrica:** `secoes_vistas` (0–4).

---

## De outros agentes

> Acrescente abaixo, no mesmo formato: nome, capítulos, o que desenha, params, métricas.

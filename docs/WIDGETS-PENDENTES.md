# Widgets pendentes

Lista única dos widgets que os planos em `docs/planos/` pedem e que ainda **não existem** no app. Cada agente acrescenta os seus no fim, no mesmo formato. Antes de criar um widget novo, confira se um daqui já serve.

**Já existem** (não listar aqui): `plano_cartesiano` / `plano_figura`, `reta_numerica` / `reta_figura`, extensões do plano (entradas 7 e 10, GUIA §5.1), `grade_resultados` / `grade_figura` (entrada 1, GUIA §5.4; os 14 modos foram unificados em 11: `grade`, `sorteio`, `pares`, `dois_eventos` e `pista` são o modo `casas` com chaves), `barras` / `barras_figura` (entradas 2 e 9; o modo `barras`/`linha`/`setores` chama-se `categorias`, e `coleta` é a chave `coleta: true` dele) (em `src/widgets/common/`, ver GUIA §5), `revolution`, `generatrix` e `cone_figure` (só Cones).

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

> Consolidado por Claude Code (Opus, widgets) a partir de todos os `WIDGET NOVO` de `docs/planos/*.md`. Os nomes que cada plano usou estão em "Aliases"; ao escrever o JSON, use o **nome canônico**. As entradas 1–8 acima (lote de Claude Code) continuam valendo e entram na tabela de prioridade do fim.

### 9. `barras` — modos novos `sequencia` e `parte_todo` (estende a entrada 2)
**Aliases:** `barras` (PA/PG, financeira, somatórios…), `barras-percentuais`, `faixas-fracionarias`.
**Capítulos:** sequencias-pa-pg, sequencias-recursivas-e-padroes, somatorios-pa-pg, soma-da-pg-infinita, matematica-financeira, taxas-equivalentes-e-inflacao, descontos-acrescimos-e-indices (`sequencia`); razao-proporcao-porcentagem, fracoes-e-decimais (`parte_todo`). Somados aos 5 da entrada 2: **14 capítulos**.

| Modo | Desenho | Usado em |
|---|---|---|
| `sequencia` | colunas discretas nos índices 1..N (sem ligar índices intermediários); só os termos até `n` acendem; degrau entre vizinhos rotulado `+d` (c3) ou `×q` (c4); série fantasma de referência; chave `acumular` mostra a soma parcial Sₙ; linha do limite (PG infinita) | PA/PG, recorrência, somatórios, juros, índices |
| `parte_todo` | barra do todo dividida em `partes` iguais, `pintadas` acesas; régua 0–100 % embaixo; fração, razão e % escritas; barra de referência em cinza | razão/porcentagem, frações |

**Params (`sequencia`):** `regra: "pa" | "pg" | "recorrencia"` (recorrência aₙ₊₁ = q·aₙ + d, que cobre PA, PG e juros), `a1`, `d`, `q` (aceitam `"$id"`), `termos` (N), `n` (`"$n"`: até onde acende), `degraus`, `acumular`, `limite`, `fantasma: { regra, a1, d, q }`, `cores`, `highlight`.
**Params (`parte_todo`):** `partes`, `pintadas` (aceitam `"$id"`), `todo` (rótulo do todo), `referencia: { partes, pintadas }`, `mostrar: { fracao, porcento, razao }`, `highlight`.
**Métricas:** `termo_n` (último termo aceso), `soma_n`, `sinal_trocou` (0/1), `barras_tocadas`; `fracao`, `porcento`, `equivalente` (0/1: mesma fração da referência).
**Lacunas pedidas pelo coordenador (pendentes, entram depois do `solido_3d`):** (1) `sequencia` com recorrência de dois termos (`a2`, regra aₙ₊₂ = p·aₙ₊₁ + q·aₙ; Fibonacci) para sequencias-recursivas-e-padroes; (2) `categorias` com `degraus: true` (rótulo +d entre barras vizinhas, maior crescimento destacado); (3) `pontos` com alerta "mediana sem ordenar" e a conta soma ÷ quantidade desenhada na régua.

### 10. Extensões do `plano_cartesiano` — curvas e marcas novas (estende a entrada 7)
**Aliases:** `plano-radical`, `plano-log-dominio`, `plano-racional`, `grafico-racional`, `plano-polinomial`, `plano-proporcional`, `transformador-de-graficos`, `seletor-por-partes`.
**Capítulos:** equacoes-irracionais, equacoes-logaritmicas, equacoes-racionais, funcao-racional, grandezas-direta-e-inversa, polinomios, raizes-polinomiais-e-multiplicidade, transformacoes-graficos-de-funcoes, funcao-definida-por-partes, posicoes-relativas-de-retas (**10**; funcao-quadratica ganha vértice/eixo; reta-equacao-e-inclinacao também precisa da entrada 3).

- **Tipos de curva novos:** `raiz` a·√(x − b) + c · `racional` a/(x − b) + c · `cubica` a·x³ + b·x² + c·x + d · `potencia` a·(x − b)ⁿ + c.
- **Transformação de qualquer curva** (`transformador-de-graficos`): `transforma: { a, b, h, k }` na curva → a·f(b·(x − h)) + k.
- **Por partes** (`seletor-por-partes`): uma curva por trecho, cada uma com `dominio: { de, ate, abreDe, abreAte }`, e o ponto com `curva: [0, 1]` (vale a 1ª curva definida no x); bolinhas abertas/fechadas nos extremos.
- **Domínio e buracos:** `dominio` por curva (acima); `furos: number[]` (bolinha vazia); `assintotas: { x?: number[], y?: number[] }` tracejadas; o ponto não entra fora do domínio.
- **Ponto independente** (`cursor independente`): `ponto.curva: null` → o ponto anda no eixo x e mostra a altura de cada curva naquele x.
- **Retângulo sob o ponto** (`plano-proporcional`): `ponto.retangulo: true` → retângulo da origem a (x, y) com a área x·y (c4).
- **Marcas** da entrada 7: `marcar.angulo`, `coincidentes`, `intercepto_tocado`.
- **Vértice e eixo de simetria** (pedido do coordenador, capítulo funcao-quadratica): `marcar.vertice` → ponto (x_v; y_v) da primeira quadrática não fantasma com rótulo; `marcar.eixo` → reta tracejada x = x_v. Cor em `cores.vertice` (padrão c4). Métrica `no_vertice` (0/1: ponto arrastável em x_v).
- **Exponencial** (pedido do coordenador): `triangulo.modo: "fator"` → degrau "anda 1, ×b" (seta com rótulo `×b` na cor da base) em vez de "+a"; `cores.base` para a base b ter cor própria no rótulo da curva; `marcar.assintota` → assíntota horizontal y = c tracejada da primeira exponencial não fantasma.
- **Logaritmos** (pedido do coordenador): `ponto.espelho: true` → segundo ponto (y; x) refletido em y = x, ligado ao primeiro por um segmento perpendicular tracejado, andando junto no arraste; `marcar.assintota` também desenha x = b (x = 0 no log puro) para logaritmo; `guias: { diagonal: true }` → y = x como guia cinza fina (não entra em `curvas`, não conta para encontro/raízes). Métrica `espelho_visto` (0/1).
- **Periódicas** (pedido do coordenador, modelos-periodicos-e-amplitude): campo `fase` em `seno`/`cosseno` → a·sen(b·(x − fase)) + c; `marcar.fase` desenha a seta de 0 até a fase no eixo da linha média; `marcar.periodo` desenha a chave de um período T = 2π/b com o rótulo; `marcar.faixa` desenha linha média (y = c), topo (c + |a|) e fundo (c − |a|) como guias cinza rotuladas. Guias livres: `guias.horizontais: { y, rotulo?, cor? }[]` e `guias.verticais` (não são curvas: não entram em encontro/raízes).
- **Métricas novas:** `ramos_visitados`, `trechos_visitados`, `fora_do_dominio` (0/1), `no_furo` (0/1), `parametros_testados`.

### 11. Extensões da `reta_numerica`
**Aliases:** `intervalos-operacoes`, `distancia-na-reta`.
**Capítulos:** conjuntos-e-intervalos, valor-absoluto-e-distancia (**2**).

- `operacao: { a: Trecho, b: Trecho, modo: "uniao" | "intersecao" | "diferenca" | "$id" }` → três trilhas (A c1, B c2, resultado c4), extremos abertos/fechados calculados.
- `ponto.centro: number` → seta de c até x (x − c, c3) e segmento |x − c| (c4); `distanciaZero` é o caso c = 0.
- `ponto.centro` aceita `"$h"`; o centro h ganha marcador próprio (`ponto.vertice: true` → bolinha + rótulo "h" na `corCentro`, pedido do coordenador para funcao-modular).
- **Métricas:** `pertence` (0/1 no resultado), `distancia` (|x − c|).

### 12. `geometria_triangulo` + figura `geometria_triangulo_figura`
**Aliases:** `geometria_plana` (modos Pitágoras, triângulo, semelhança/Tales, relações métricas, notáveis, lei dos senos e cossenos, trigonometria no triângulo retângulo).
**Capítulos:** teorema-de-pitagoras, trigonometria-no-triangulo-retangulo, relacoes-metricas-triangulo-retangulo, lei-dos-senos-e-cossenos, triangulos-congruencia-e-propriedades, triangulos-notaveis-e-construcoes, semelhanca-e-teorema-de-tales (**7**).

> `geometria_plana` foi pedido por 15 planos com desenhos sem núcleo comum (triângulos, polígonos, círculos, paralelas). Foi dividido em `geometria_triangulo`, `geometria_poligono` (com `paralelas`) e `geometria_circulo`; o prefixo `geometria_` mantém a busca fácil.

| Modo | Desenho | Usado em |
|---|---|---|
| `pitagoras` | triângulo retângulo, catetos b (c1), c (c2) por slider; quadrados quadriculados sobre os 3 lados; a² = b² + c² | Pitágoras |
| `razoes` | triângulo retângulo na malha com θ (c4) e escala k; CO (c1), CA (c2), HIP (c3); painel sen, cos, tg que não mudam com k | trigonometria no triângulo retângulo |
| `metricas` | apoiado na hipotenusa a (c1), altura h (c3), projeções m, n (c2); giro dos triângulos menores; quadrado b² × retângulo a·m | relações métricas |
| `cossenos` / `senos` | b, c fixos e ângulo A por slider (a² ao vivo vs b² + c² − 2bc·cos A); inscrito em circunferência de raio R (a/sen A = 2R) | lei dos senos e cossenos |
| `angulos` | vértice arrastável, paralela à base, 3 ângulos (c1, c2, c3) encaixando na meia-volta; "fechar 3 barras" | congruência e propriedades |
| `notaveis` | quadrado cortado pela diagonal (45-45-90), equilátero cortado pela altura (30-60-90); compasso traçando a mediatriz (c4) | notáveis e construções |
| `semelhanca` | paralela deslizante à base; triângulo menor (c1), original (c2), ângulos iguais (c3), razão k | semelhança e Tales |

**Params:** `modo`; `b`, `c`, `a`, `angulo`, `k`, `L`, `m`, `r` (aceitam `"$id"`); `vertice?: [x, y]` com `passo`; `quadrados`, `malha`, `fantasma`, `highlight`.
**Métricas:** `a`, `area_b2`, `area_c2`, `area_a2`, `razao_sen`, `razao_cos`, `razao_tg`, `soma_angulos`, `vertices_movidos`, `giro_feito`, `fecha`, `se_cruzam`, `k`.

### 13. `geometria_poligono` + figura `geometria_poligono_figura`
**Aliases:** `geometria_plana` (modos malha, polígonos e quadriláteros, regulares e ladrilho, isometrias e homotetia, paralelas).
**Capítulos:** perimetro-e-area-de-figuras-planas, poligonos-e-quadrilateros, poligonos-regulares, transformacoes-isometrias-e-homotetia, angulos-retas-paralelas (**5**).

| Modo | Desenho | Usado em |
|---|---|---|
| `malha` | retângulo, paralelogramo, triângulo, trapézio com b (c1), h (c2); área (c3), perímetro (c4); corte e encaixe | perímetro e área |
| `poligono` | n-ágono convexo; diagonais de um vértice (n − 2 triângulos); externos que viram um círculo ao encolher; paralelogramo articulado | polígonos e quadriláteros |
| `regular` | n-ágono regular inscrito; ângulo central (c1), externo (c2), interno (c3); ladrilho com fresta (c4) | polígonos regulares |
| `isometria` | "F" na malha: translação, reflexão, rotação por slider, homotetia de razão k (também k < 0) | isometrias e homotetia |
| `paralelas` | r ∥ s cortadas por t com α por slider; 8 ângulos em dois grupos (c1 = α, c2 = 180° − α) | ângulos e paralelas |

**Params:** `modo`; `forma`, `b`, `h`, `n`, `angulo`, `encolher`, `k` (aceitam `"$id"`); `diagonais`, `externos`, `ladrilho`, `transformacao`, `highlight`.
**Métricas:** `area`, `perimetro`, `triangulos`, `soma_internos`, `soma_externos`, `formas_testadas`, `ladrilho_fechado`, `orientacao_trocada`, `razao_area`, `inclinou`.

### 14. `geometria_circulo` + figura `geometria_circulo_figura`
**Aliases:** `geometria_plana` (modos circunferência, roda desenrolada, área do círculo, setor e coroa).
**Capítulos:** circunferencia-arcos-e-angulos, comprimento-da-circunferencia, area-do-circulo-e-setores (**3**).

| Modo | Desenho | Usado em |
|---|---|---|
| `arcos` | O, A e B arrastáveis na borda (encaixe em graus); arco (c1), central (c2), inscrito com vértice V (c3), cordas (c4) | arcos e ângulos |
| `roda` | roda de diâmetro d (c2) rolando numa pista graduada (1, 2, 3, π); rastro C (c3) ou arco α (c4) | comprimento |
| `fatias` | disco em N setores que se abrem num "paralelogramo" πr × r; setor α (c3); coroa (c4) | área do círculo |

**Params:** `modo`; `r`, `R`, `d`, `giro`, `N`, `angulo`, `furo` (aceitam `"$id"`); `pontos: { a, b, v }`, `arrastaveis`, `highlight`.
**Métricas:** `central`, `inscrito`, `arco`, `rastro`, `voltas`, `area_setor`, `area_coroa`.

### 15. `ciclo_trigonometrico` + figura `ciclo_trigonometrico_figura`
**Aliases:** `ciclo_trigonometrico`, `ciclo-figura`, `ciclo_trigonometrico` + `plano_cartesiano`.
**Capítulos:** radianos-e-ciclo-trigonometrico, seno-cosseno-tangente-no-ciclo, funcoes-trigonometricas, identidades-trigonometricas, formulas-de-adicao-e-arco-duplo, equacoes-trigonometricas, inequacoes-trigonometricas (**7**).

**O que desenha:** circunferência de raio 1; P arrastável (encaixe em `passo` graus) ou por slider; arco de A(1; 0) a P; projeções sen e cos; tangente em x = 1; fita do arco em radianos e mostrador em graus; contador de voltas; simétricos nos quadrantes; triângulo de hipotenusa 1 com barras sen²θ + cos²θ = 1; giros α + β com barra sen(α + β) vs sen α + sen β; reta y = k com os dois encontros; arco solução aceso (extremos abertos/fechados); gráfico ao lado traçado pelo ponto.
**Params:** `angulo` (graus, `"$id"`), `unidade`, `passo`, `mostrar: { seno, cosseno, tangente, fita, voltas, simetricos, pitagorica }`, `soma?: { alfa, beta }`, `alvo?: { seno?, cosseno? }`, `arco?: { de, ate, abreDe, abreAte }`, `grafico?: "sen" | "cos"`, `fantasma`, `cores`, `highlight`.
**Métricas:** `angulo`, `rad`, `voltas`, `quadrantes`, `no_alvo`, `solucoes_marcadas`, `dentro`, `x_rad`.

### 16. `solido_3d` + figura `solido_3d_figura` (amplia a entrada 8)
**Aliases:** `solido_3d`, `solido_3d_figura`.
**Capítulos:** prismas-e-paralelepipedos, piramides, cilindros, esferas, troncos-de-solidos, solidos-de-revolucao, poliedros-e-relacao-de-euler, posicoes-relativas-no-espaco, projecoes-cortes-e-planificacoes, areas-e-volumes-por-composicao (**10**; mais as 3 cônicas, opcional).

| Modo | Desenho |
|---|---|
| `revolucao` | perfil 2D (retângulo, triângulo, trapézio, semicírculo, retângulo afastado `d` do eixo) girando até 360°; troca de eixo |
| `prisma` | base (a × b, triângulo 3-4-5, hexágono) em camadas de cubos até h; diagonal espacial; paredes planificadas |
| `piramide` | h (c1), apótema da base (c2) e da pirâmide (c3); faces em estrela; 3 pirâmides num prisma |
| `cilindro` / `esfera` | rótulo desenrolando (2πr × h); corte a distância d (triângulo R, d, r); esfera no cilindro |
| `tronco` | cone/pirâmide cortado a h' do vértice; k, k², k³; separar a ponta |
| `poliedro` | tetraedro … truncado; placar V, A, F; serrar quina; faces soltas |
| `espaco` | esqueleto de cubo ABCD-EFGH com retas r, s móveis |
| `vistas` | 3 sombras ortogonais; plano de corte; molde do dado fechando |
| `composicao` | cilindro + cone, cápsula, cavidade |
| `corte_cone` | cone duplo com plano inclinável (entrada 8) |

**Params:** `modo`, `solido`, dimensões (`r`, `h`, `R`, `d`, `a`, `b`, `giro`, `abrir`, `corte`, `k`: aceitam `"$id"`), `camera`, `fantasma`, `highlight`. Reaproveitar `coneScene.ts` e `math3d/`.
**Métricas:** `giro`, `volume`, `area`, `camadas`, `perfis_girados`, `solidos_vistos`, `euler`, `vistas_vistas`, `posicoes_vistas`, `aberto`.

### 17. `transformacao_plano` + figura `transformacao_figura`
**Aliases:** `transformacao_plano`, `transformacao-figura`.
**Capítulos:** matrizes-determinantes-sistemas, determinantes-e-matriz-inversa (**2**).

**O que desenha:** malha e quadrado unitário deformados por A 2×2 (entradas `"$id"`); colunas de A como setas (c2); v (c1) e Av (c3); área orientada = det A (c4, o quadrado "vira" quando det < 0); identidade fantasma; composição B depois A em três painéis.
**Params:** `matriz`, `depois?`, `vetor?`, `mostrar: { malha, quadrado, colunas, det }`, `highlight`. **Métricas:** `det`, `area`, `orientacao`, `v_x`, `v_y`.

### 18. `vetores_no_plano` — modo `complexo` (estende a entrada 4)
**Aliases:** `plano-complexo`, `plano-complexo-figura`.
**Capítulos:** vetores-no-plano, numeros-complexos (**2**).

Eixos Re / Im; z = a + bi como seta (a c1, b c2, vetor c3); multiplicação por iⁿ gira 90° por passo com rastro 1, i, −1, −i; soma ponta-cauda; conjugado (muted) e módulo pelo triângulo (c4).
**Params:** `z`, `w?`, `potencia_i?`, `mostrar: { conjugado, modulo, soma }`. **Métricas:** `modulo`, `re`, `im`, `giros`.

### 19. `retangulo_areas` + figura `retangulo_areas_figura`
**Aliases:** `areas-produtos`, `quadrado-raiz`, `figura-escala`.
**Capítulos:** expressoes-algebricas-e-produtos-notaveis, potencias-e-radicais, unidades-conversoes-e-escalas (**3**).

| Modo | Desenho |
|---|---|
| `produto` | quadrado de lado a (c1) + acréscimo b (c2): peças a², ab, ab, b² (c3); `retirar` mostra (a − b)² |
| `raiz` | quadrado de área A (c3) e lado √A (c4); área 1 em cinza |
| `escala` | figura de lado L (c1) ampliada por k (c2): lado ×k, área ×k² (c3); segmento em m/dm/cm |

**Params:** `modo`, `a`, `b`, `A`, `L`, `k`, `e` (aceitam `"$id"`), `retirar`, `referencia`, `highlight`. **Métricas:** `area`, `lado`, `pecas`, `razao_area`.

### 20. `maquinas_funcao` + figura `maquinas_figura`
**Aliases:** `diagrama-funcao`, `encadeador-de-funcoes`.
**Capítulos:** introducao-a-funcoes, funcao-composta-e-inversa (**2**).

Diagrama de flechas (o aluno liga entradas a saídas; aviso quando uma entrada recebe duas) e máquinas encadeadas g → f com a entrada passando por cada caixa; inverter a ordem; máquina inversa.
**Params:** `modo: "flechas" | "maquinas"`, `entradas`, `saidas`, `ligacoes`, `maquinas`, `x` (`"$id"`), `highlight`. **Métricas:** `entradas_com_uma_saida`, `entradas_testadas`, `ordens_testadas`, `inversa_testada`.

### 21. Widgets de um capítulo só

**Prontos em 19/11 (B33 + correções B39): GUIA §5.21 a §5.24.** A especificação abaixo é a original; as métricas e parâmetros finais estão no GUIA.

- **`escala_decimal`** (notacao-cientifica-e-ordem-grandeza): quadro de ordens e régua de potências de 10; a·10ⁿ com a (c1), n (c2), valor (c3); faixa 1 ≤ a < 10; régua logarítmica. Métricas `n`, `normalizado`.
- **`divisao_polinomial`** (divisao-polinomial-e-teorema-do-resto): quadro da divisão por etapas (`etapa` por slider) com Q e R; o passo 1 usa `plano_cartesiano`. Métricas `etapa`, `resto`.
- **`sistema_escalonado`** (sistemas-lineares-e-escalonamento): matriz aumentada com L₂ ← L₂ − k·L₁; pivôs (c4); retas do sistema 2×2 (originais fantasma). Métricas `k`, `zerou`, `t`.
- **`grupos_inteiros`** (sistemas-numericos-e-divisibilidade): n fichas em fileiras de d; q (c3), resto (c4); duas trilhas para MMC; árvore de fatoração. Métricas `d`, `resto`, `m`.

---

## Prioridade (capítulos destravados por widget)

"Destrava" = capítulo cujos passos só esperam por esse widget. A ordem de implementação segue esta tabela.

| # | Widget canônico | Capítulos | Situação |
|---|---|---|---|
| 1 | `barras` (entradas 2 + 9) | 14 | **pronto** (GUIA §5.3) |
| 2 | Extensões do `plano_cartesiano` (7 + 10) | 10 (+ funcao-quadratica, funcao-exponencial, logaritmos, modelos-periodicos melhorados) | **pronto** (GUIA §5.1) |
| 3 | `grade_resultados` (1) | 10 | **pronto** (GUIA §5.4) |
| 4 | `solido_3d` (8 + 16) | 10 (+3 com `lugar_geometrico`) | **pronto** (inclui `corte_cone`, GUIA §5.7) |
| 5 | `geometria_triangulo` (12) | 7 | **pronto** (GUIA §5.10) |
| 6 | `ciclo_trigonometrico` (15) | 7 | **pronto** (GUIA §5.11) |
| 7 | `geometria_poligono` (13) | 5 | **pronto** (GUIA §5.12) |
| 8 | `lugar_geometrico` (6) | 3 | implementado e testado (GUIA §5.14); revisão visual pendente |
| 9 | `geometria_circulo` (14) | 3 | **pronto** (GUIA §5.13) |
| 10 | `retangulo_areas` (19) | 3 | implementado e testado (GUIA §5.18); revisão visual pendente |
| 11 | `pontos_no_plano` (3) | 2 | implementado e testado (GUIA §5.15); revisão visual pendente |
| 12 | Extensões da `reta_numerica` (11) | 2 | **pronto** (GUIA §5.2) |
| 13 | `transformacao_plano` (17) | 2 | **pronto** (GUIA §5.20) |
| 14 | `vetores_no_plano` + `complexo` (4 + 18) | 2 | implementado e testado (GUIA §5.17); revisão visual pendente |
| 15 | `maquinas_funcao` (20) | 2 | **pronto** (GUIA §5.19) |
| 16 | `circunferencia_no_plano` (5) | 1 | implementado e testado (GUIA §5.16); revisão visual pendente |
| 17 | `escala_decimal`, `divisao_polinomial`, `sistema_escalonado`, `grupos_inteiros` (21) | 1 cada | **pronto** (19/11, B33/B39; GUIA §5.21 a §5.24) |

Capítulos que já andam com `plano_cartesiano` / `reta_numerica`: funções afim, quadrática, exponencial, modular, logaritmos; equações e inequações de 1º e 2º grau, modulares, exponenciais e logarítmicas, produto-quociente; fatoração.

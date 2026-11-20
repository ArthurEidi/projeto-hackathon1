# B47: falas do treino que aparecem antes de Verificar (19/11)

Agente: Claude Code #2. O achado é do Codex #2, na B45c: a UFRGS 2025 Q71 já foi corrigida em 8711dc8.

## Por que importa

Em `src/treino/Treino.tsx`, a `Pergunta` mostra `questao.fala` como a linha do Paco (`StepLayout line={fala}`) desde a fase "escolhendo", antes do botão Verificar. Isso vale para **todas** as etapas do treino (fáceis, médias, desafios e vestibular), não só para o vestibular.

Regra usada: a fala pode dar estratégia e lembrar a ferramenta. Ela **não pode**:

- dar o valor certo;
- descrever uma propriedade que só a alternativa certa tem;
- eliminar alternativas até sobrar uma.

## Parte 1: varredura das falas

**Script:** `b47_falas.py`, no scratchpad. Ele lista aula, etapa, id, fala e o rótulo da alternativa certa, e marca dois casos:

- LABEL: a fala contém o rótulo da certa;
- NUM: a fala contém um número do rótulo da certa que não está no enunciado.

**Números:** 1 432 questões de treino nas 104 aulas; 437 têm `fala` própria. Destas, 184 são de vestibular, 249 de desafios e 4 de fáceis/médias. As outras usam as falas-padrão de `src/treino/falas.ts`. O script marcou 27.

**Leitura manual:** como o script não pega descrição de propriedade nem eliminação, li as 413 falas fora das aulas da B45 em curso, cada uma junto com todas as alternativas. As aulas da B45 (`funcao-modular`, `funcao-racional`, `inequacoes-trigonometricas`, `angulos-retas-paralelas`, `circunferencia-arcos-e-angulos`, `relacoes-metricas-triangulo-retangulo`, `solidos-de-revolucao`, `vetores-no-plano`, `quartis-percentis-e-boxplot` e `equacoes-irracionais`) não foram tocadas.

**36 falas reprovadas e reescritas.** Das 27 marcadas pelo script, a maioria era falso positivo: falas que repetem números do enunciado ou dão estratégia. Várias das 36 reprovadas não tinham sido marcadas pelo script.

Quando o roteiro (`docs/planos/<slug>.md`) trazia a mesma fala, ele foi atualizado junto, em 31 dos 36 casos. A aula `cones` não tem esse texto no roteiro. Os roteiros de `experimentos-binomial-e-repetidos`, `poligonos-e-quadrilateros` e `taxas-equivalentes-e-inflacao` não registram fala para essas questões.

| aula | id | por que falhava | fala antiga | fala nova |
|---|---|---|---|---|
| razao-proporcao-porcentagem | `enem-2017-celular` | dava o valor (1/4) | Com velocidade constante, d = v · t torna a razão das distâncias igual à razão dos tempos: 25% = 1/4. | Com a mesma velocidade, d = v · t: como a razão dos tempos passa para a razão das distâncias? |
| area-do-circulo-e-setores | `pizza-dobro-do-diametro` | dava o valor (4) | Dobrar o raio ou o diâmetro multiplica a área por 2² = 4! | A área depende do raio ao quadrado. O que acontece com ela quando o raio dobra? |
| sistemas-numericos-e-divisibilidade | `enem-2009-cpf` | fazia a conta e dava d₁ = 0 | S₁ = 10·1 + 9·2 + … + 2·9 = 210 (resto 1 ⇒ d₁ = 0); depois S₂ = 10·2 + … + 3·9 + 2·0 = 244. | Some cada algarismo vezes o seu peso, ache o resto por 11 e aplique a regra; repita para d₂ com d₁ já no fim. |
| sistemas-numericos-e-divisibilidade | `enem-2012-ordens` | a lista de ordens terminava exatamente na resposta | Conte as ordens da direita para a esquerda: unidade, dezena, centena, unidade de milhar, dezena de milhar e centena de milhar. | Conte as ordens da direita para a esquerda, em grupos de três: unidades, milhares, milhões. |
| somatorios-pa-pg | `enem-2018-tenis` | descrevia a soma da alternativa certa (começando em 64) | Na 1ª fase, 128 tenistas formam 64 duplas (64 jogos); depois 32, 16 e assim por diante. | Cada partida elimina um tenista. Quantos precisam ser eliminados até sobrar o campeão? |
| introducao-a-funcoes | `enem-2021-hospedagem` | descrevia a combinação que só a certa tem (s sobre d·n, não sobre L) | O total das diárias é d·n, e a taxa percentual s incide sobre d·n (não sobre L). | Separe as parcelas do preço: diárias, limpeza e serviço. Sobre qual valor a taxa s é calculada? |
| funcao-quadratica | `enem-2009-alcool` | montava o próprio V(x) pedido | Multiplique a nova quantidade (10.000 + 100x) pelo novo preço em reais (1,50 − 0,01x). | Escreva a nova quantidade e o novo preço, em reais, em função de x; a receita é quantidade × preço. |
| taxas-equivalentes-e-inflacao | `taxas-equivalentes-e-inflacao-d5` | descrevia a certa (doze fatores de 1,02) | Última. Doze fatores de 1,02 se multiplicam. | Última. Pense em dois meses: 2% sobre um saldo que já rendeu 2% dá exatamente 4%? |
| circunferencia-equacao-e-posicoes | `completar-quadrado` | dava (x − 3)², isto é, o centro | Última. x² − 6x é o começo de (x − 3)². | Última. Complete o quadrado nos termos em x e compare com (x − a)² + (y − b)² = r². |
| formulas-de-adicao-e-arco-duplo | `periodo-produto-seno-cosseno` | dava 3·(2 sen x cos x), o f(x) da certa | Note que 6 · sen x · cos x = 3 · (2 · sen x · cos x). | Procure 2 · sen x · cos x dentro da expressão e troque pelo arco duplo. |
| fatorial-e-permutacoes | `enem-2020-anagramas` | apontava o /2 (T repetido) que separa a certa | São 5 consoantes e 4 vogais: a fila começa e termina em consoante. E o T aparece duas vezes. | Conte vogais e consoantes e veja que casas cada grupo ocupa. Alguma letra se repete? |
| conjuntos-e-intervalos | `enem-2020-amostras` | calculava a interseção (30) e mandava subtrair de 100 | Ache a interseção com (100 + 110) − (200 − 20) = 30 e subtraia de 100. | Quem tem A ou B são 200 − 20. Use a união para achar quem tem as duas e tire esse grupo de A. |
| conjuntos-e-intervalos | `enem-2018-pena` | dizia qual redução vai com qual extremo (a armadilha da questão) | O mínimo reduz o menor valor em 2/3 (sobra 1/3 de 5) e o máximo reduz o maior em 1/6 (sobra 5/6 de 15). | Para cada extremo da nova pena, escolha a pena e a redução que o tornam o menor ou o maior possível. |
| potencias-e-radicais | `enem-2012-mamiferos` | dava 8^(2/3) = (∛8)², isto é, 4 | Substitua m por 8m: o fator é 8^(2/3) = (∛8)². | Troque m por 8m na lei e separe o fator que fica multiplicando k · m^(2/3). |
| potencias-e-radicais | `enem-2010-petroleo` | fazia a conta inteira (10⁷ · 10²) | Escreva 1 000 como 100 × 10 = 10² × 10 e multiplique 10⁷ por 10² somando os expoentes. | Quantas vezes 1 000 L de óleo é maior que 10 L? A água contaminada cresce na mesma proporção. |
| sistemas-numericos-e-divisibilidade | `enem-2021-romano` | fazia a conversão pedida (M, CD, LX, IX) | Converta por blocos: M = 1 000, CD = 400, LX = 60 e IX = 9; depois faça 2050 − ano. | Leia o número em blocos: letra menor antes de uma maior subtrai, como em IV. Depois faça 2050 menos o ano. |
| taxas-equivalentes-e-inflacao | `enem-2011-aplicacao` | dava 0,76C = 3 800 | Perdeu 0,30C e ganhou 0,20 · 0,30C = 0,06C; sobrou 0,76C = 3 800. | Escreva a perda e a recuperação em função do capital C e iguale o que sobrou a R$ 3 800. |
| razao-proporcao-porcentagem | `enem-2022-caged` | resolvia a armadilha (sobra 25% = 1/4) | Se caiu 75%, o valor de 2013 representa apenas 25% (1/4) do total de 2012. | Se caiu 75%, que fração do valor de 2012 sobrou em 2013? |
| parabola-conica | `ita-2009-parabola` | dava o quadrado completado (x − 1)² = 2(y − 1/4) | Complete o quadrado: (x − 1)² = 2(y − 1/4). Compare com x² = 4py: a distância vértice-foco é \|p\|. | Complete o quadrado em x e compare com (x − h)² = 4p(y − k): a distância vértice-foco é \|p\|. |
| plano-cartesiano-distancia-e-ponto-medio | `diagonal-unitaria` | eliminava todas as inteiras (sobrava só √2) | Última. Nem toda distância é inteira. | Última. Use Pitágoras com os deslocamentos em x e em y. |
| posicoes-relativas-de-retas | `d5-posicoes-relativas-de-retas` | "uma em pé, outra deitada" já é a resposta | Última. Desenhe as duas: uma em pé, outra deitada. | Última. Desenhe as duas retas no plano cartesiano e compare as suas direções. |
| experimentos-binomial-e-repetidos | `k-mais-provavel` | dava a linha 1, 4, 6, 4, 1 | Última. Pense nas barras 1, 4, 6, 4, 1. | Última. Conte quantas sequências de 4 moedas dão cada número de caras. |
| experimentos-binomial-e-repetidos | `enem-2009-celulares-defeito` | descrevia a expressão da certa | Multiplique o número de escolhas C(4, 2) pelas chances de 2 defeitos e 2 perfeitos. | Quantas ordens diferentes têm exatamente 2 defeituosos? E qual a chance de uma dessas ordens? |
| fatorial-e-permutacoes | `enem-2009-copa` | dizia "sem ordem" e "com ordem", a certa | Veja se a ordem importa: o grupo de 4 cidades é sem ordem; escolher mandante e visitante tem ordem. | Em cada etapa, pergunte: trocar a ordem dos escolhidos muda o resultado? |
| cilindros | `dobrar-raio-metade-altura` | dava ×4 e ÷2 | O raio entra ao quadrado (×4) e a altura entra simples (÷2)! | Veja como r e h entram em V = πr²h e aplique as duas mudanças ao mesmo tempo. |
| cones | `geratriz-3-3` | "não é inteiro" eliminava 6, 18 e 9 | Nem sempre a resposta é um número inteiro. | A geratriz é a hipotenusa do triângulo de catetos altura e raio. |
| cones | `enem-2022-cone` | dava 0,81 = (r/R)² | Com altura fixa, o volume varia com r²: 1 − 0,19 = 0,81 = (r_novo / R)². | Com a altura fixa, o volume é proporcional a r². Que fração do volume sobra, e que razão de raios dá essa fração? |
| esferas | `esferas-no-cilindro-nivel` | dava a fração vazia (1/3) | Em cada fatia de altura 2R, a esfera ocupa 2/3 e deixa 1/3 vazio! | Calcule o volume do tubo e o das três bolas, e subtraia. |
| esferas | `enem-2022-docinhos` | fazia a conta 2³ · 3 | Compare a razão dos raios ao cubo (2³) e multiplique pela razão das quantidades (150 / 50). | Compare o volume de um docinho grande com o de um pequeno; depois a massa total dos 150 com a dos 50. |
| piramides | `enem-2009-piramide-pentagonal` | era a justificativa da certa | A interseção do plano com cada face atingida gera um lado do polígono de corte. | Conte as faces da pirâmide e pense no que o plano deixa em cada face que atravessa. |
| posicoes-relativas-no-espaco | `soma-determinacao-planos` | "cada trio fecha uma face" já conta as 4 faces | Cada trio de vértices fecha uma face da pirâmide. | Três pontos não alinhados determinam um plano. Quantos trios saem de 4 pontos? |
| prismas-e-paralelepipedos | `enem-2021-conteiner` | descrevia paredes 1D e piso 2D (a certa) | As paredes têm perímetro × altura (1D × fixa), enquanto o piso é comprimento × largura (2D). | Escreva a área das paredes e a do piso com comprimento, largura e altura; depois dobre comprimento e largura. |
| poligonos-e-quadrilateros | `enem-2012-losango-perimetro` | dava os lados 2r e 3r | Na Figura 1 o lado do losango mede 2r; na Figura 2, com dois raios dobrados, o lado mede r + 2r = 3r. | Em cada figura, o lado do losango é a soma de dois raios. Compare os perímetros. |
| transformacoes-isometrias-e-homotetia | `d1-duas-reflexoes-paralelas` | "inverte e desinverte" descrevia a translação | O 1º espelho inverte o sentido e o 2º desinverte de volta! | Desenhe uma letra F e reflita duas vezes, em espelhos paralelos. Como ela termina? |
| triangulos-congruencia-e-propriedades | `enem-2018-remos` | apontava AB = AC e A > 90°, a certa | Observe ao mesmo tempo os dois lados iguais (AB = AC) e o ângulo A = 170° > 90°. | Classifique o triângulo duas vezes: pelos lados e pelo maior ângulo. |
| areas-e-volumes-por-composicao | `lapis-cilindro-mais-cone` | dava a fração das aparas (2/3) | Na faixa de 3 cm da ponta, o cone guarda 1/3 e as aparas levam 2/3! | Compare o volume do cilindro de 3 cm com o do cone que ficou no lugar dele. |

**Falas mantidas (amostra do critério):**

- As que lembram uma fórmula ("Use T = 2π/B e isole B", "o raio do círculo inscrito vale A/p").
- As que montam o primeiro passo sem fechar a conta ("Converta 15 m = 1 500 cm e 90 m = 9 000 cm; resolva…").
- As que lembram um fato geral ("o módulo nunca é negativo").
- As falas-padrão "Antes de escolher, confira as condições…".

Nos casos limite, como "Os degraus são de 2 em cada direção", "Peso 2 é como contar a prova duas vezes" e "Some as barras k = 2 e k = 3", a fala foi mantida quando dá o caminho mas o aluno ainda precisa fazer a conta e escolher entre alternativas que continuam plausíveis.

**Validação da parte 1:** `lint:content` ok, `tsc --noEmit` ok, vitest completo 2 143/2 143.

**Observação fora do escopo:** `docs/planos/taxas-equivalentes-e-inflacao.md` tem 127 linhas com texto corrompido (mojibake, como "NÃ£o", "â€œ"), desde o commit d9c8598 (B10a).

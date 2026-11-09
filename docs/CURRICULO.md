# Currículo de Matemática do Ensino Médio — mapa de capítulos

## Escopo e convenções

Este é um mapa de planejamento abrangente para Matemática do Ensino Médio brasileiro, organizado em aulas visuais pequenas. A BNCC define competências e habilidades integradas aos campos de números, álgebra, geometria, grandezas e medidas, probabilidade e estatística; ela não determina uma única lista nacional rígida de capítulos.[1] A matriz do ENEM e programas de vestibulares acrescentam objetos e granularidades próprias, que variam por exame e edição.[2][3] Portanto, a lista abaixo combina o núcleo curricular com tópicos recorrentes em provas — não afirma que cada item seja uma habilidade BNCC isolada nem substitui o edital vigente.

Cada linha é um capítulo. Os pré-requisitos são slugs desta própria lista, na ordem didática sugerida. A última coluna descreve a máquina visual central, preferencialmente com um componente reutilizável da seção 5 de `GUIA-CAPITULOS.md`.

Legenda de estado: ✅ existe plano em `docs/planos/<slug>.md`; 🟢 já implementado no app. `funcao-afim` possui plano e está em implementação; `cones` já está implementado. Sem marca: capítulo ainda sem plano/implementação.

## 1. Conjuntos, números, razões e medidas

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
|  | `sistemas-numericos-e-divisibilidade` | Conjuntos numéricos, divisibilidade e fatoração prima | Conjuntos, números, razões e medidas | — | `reta_numerica`: localizar naturais, inteiros, racionais e reais; reorganizar unidades em grupos para enxergar divisores e fatores primos. |
| ✅ | `conjuntos-e-intervalos` | Conjuntos, operações e intervalos | Conjuntos, números, razões e medidas | `sistemas-numericos-e-divisibilidade` | `reta_numerica`: mover extremos abertos/fechados e combinar faixas por união, interseção e diferença. |
|  | `fracoes-e-decimais` | Frações, decimais e comparação de racionais | Conjuntos, números, razões e medidas | `sistemas-numericos-e-divisibilidade` | `reta_numerica`: dividir a unidade em partes iguais e alinhar frações, decimais e porcentagens equivalentes. |
|  | `potencias-e-radicais` | Potenciação, propriedades e radicais | Conjuntos, números, razões e medidas | `fracoes-e-decimais` | `plano_cartesiano`: variar base e expoente; comparar potência, raiz e comprimento de quadrados/cubos. |
|  | `valor-absoluto-e-distancia` | Valor absoluto como distância | Conjuntos, números, razões e medidas | `conjuntos-e-intervalos` | `reta_numerica`: arrastar um ponto e medir a distância não negativa até zero ou outro ponto. |
|  | `notacao-cientifica-e-ordem-grandeza` | Notação científica, estimativa e arredondamento | Conjuntos, números, razões e medidas | `potencias-e-radicais` | `reta_numerica`: deslocar a vírgula por potências de dez e comparar ordens de grandeza numa escala logarítmica conceitual. |
| ✅ | `razao-proporcao-porcentagem` | Razão, proporção e porcentagem | Conjuntos, números, razões e medidas | `fracoes-e-decimais` | `barras`: ajustar duas quantidades proporcionais e observar a razão constante e a parte percentual do todo. |
|  | `grandezas-direta-e-inversa` | Grandezas diretamente e inversamente proporcionais | Conjuntos, números, razões e medidas | `razao-proporcao-porcentagem` | `plano_cartesiano`: aumentar uma grandeza e ver a outra crescer em proporção direta ou cair mantendo o produto. |
|  | `unidades-conversoes-e-escalas` | Unidades, conversões, escala e erro de medida | Conjuntos, números, razões e medidas | `razao-proporcao-porcentagem` | `geometria_plana`: ampliar uma figura por escala; converter unidades e visualizar precisão como faixa de medida. |

## 2. Funções

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
| ✅ | `introducao-a-funcoes` | Ideia de função, domínio, imagem e gráficos | Funções | `conjuntos-e-intervalos` | `plano_cartesiano`: arrastar a entrada pela máquina e acompanhar saída, tabela, domínio permitido e ponto no gráfico. |
| 🟢 | `funcao-afim` | Função afim: taxa de variação e intercepto | Funções | `introducao-a-funcoes`, `razao-proporcao-porcentagem` | `plano_cartesiano`: sliders a e b giram e deslocam a reta; comparar com a curva fantasma y=x. |
| ✅ | `funcao-quadratica` | Função quadrática: parábola, raízes e vértice | Funções | `funcao-afim`, `expressoes-algebricas-e-produtos-notaveis` | `plano_cartesiano`: variar a,b,c e observar concavidade, eixo, vértice e encontros com o eixo x. |
| ✅ | `funcao-modular` | Função modular e transformações do gráfico | Funções | `valor-absoluto-e-distancia`, `introducao-a-funcoes` | `plano_cartesiano` + `reta_numerica`: deslocar a referência de distância e dobrar os dois ramos em V. |
| ✅ | `funcao-exponencial` | Função exponencial: crescimento e decaimento | Funções | `potencias-e-radicais`, `introducao-a-funcoes` | `plano_cartesiano`: alterar a base e avançar o expoente, comparando multiplicação repetida e reta de referência. |
| ✅ | `logaritmos` | Logaritmos: inversa da exponencial e domínio | Funções | `funcao-exponencial` | `plano_cartesiano`: espelhar exponencial e log em y=x e restringir o argumento a x>0. |
|  | `funcao-racional` | Funções racionais e assíntotas simples | Funções | `polinomios`, `introducao-a-funcoes` | `plano_cartesiano`: mover x ao redor dos zeros do denominador e ver ramos separados por assíntotas. |
|  | `funcao-definida-por-partes` | Função definida por sentenças e gráficos | Funções | `introducao-a-funcoes`, `funcao-afim` | `plano_cartesiano`: selecionar o intervalo de x e observar qual regra assume o ponto móvel em cada trecho. |
|  | `funcao-composta-e-inversa` | Função composta e função inversa | Funções | `introducao-a-funcoes`, `funcao-afim` | `plano_cartesiano`: encadear duas máquinas e trocar coordenadas dos pontos pela reflexão em y=x. |
|  | `transformacoes-graficos-de-funcoes` | Translações, reflexões e escalas de gráficos | Funções | `introducao-a-funcoes`, `funcao-afim` | `plano_cartesiano`: sliders deslocam, refletem ou esticam uma curva mantendo a original como fantasma. |

## 3. Equações e inequações

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
|  | `expressoes-algebricas-e-produtos-notaveis` | Expressões algébricas e produtos notáveis | Equações e inequações | `potencias-e-radicais` | `geometria_plana`: rearranjar áreas de quadrados e retângulos para visualizar distributiva e produtos notáveis. |
|  | `fatoracao-algebrica` | Fatoração e zeros de expressões | Equações e inequações | `expressoes-algebricas-e-produtos-notaveis` | `plano_cartesiano`: alternar forma expandida e fatores, vendo em que entradas cada fator zera. |
|  | `equacoes-primeiro-grau` | Equações do primeiro grau | Equações e inequações | `expressoes-algebricas-e-produtos-notaveis` | `plano_cartesiano`: mover x até duas saídas coincidirem; a solução é o encontro das retas. |
|  | `inequacoes-primeiro-grau` | Inequações do primeiro grau e intervalos-solução | Equações e inequações | `equacoes-primeiro-grau`, `conjuntos-e-intervalos` | `reta_numerica`: cruzar a fronteira da igualdade e sombrear o lado em que a desigualdade é verdadeira. |
|  | `equacoes-quadraticas` | Equações quadráticas e interpretação das raízes | Equações e inequações | `funcao-quadratica`, `fatoracao-algebrica` | `plano_cartesiano`: deslocar a parábola até o eixo x e ler soluções como interceptos. |
|  | `inequacoes-quadraticas` | Inequações quadráticas | Equações e inequações | `equacoes-quadraticas`, `conjuntos-e-intervalos` | `plano_cartesiano`: colorir trechos acima/abaixo do eixo e projetar os intervalos-solução na reta. |
|  | `inequacoes-produto-quociente` | Inequações-produto e inequações-quociente | Equações e inequações | `fatoracao-algebrica`, `inequacoes-primeiro-grau` | `reta_numerica`: marcar zeros e pontos proibidos; atravessar cada fator para acompanhar a troca de sinal. |
|  | `equacoes-racionais` | Equações racionais e restrições do denominador | Equações e inequações | `funcao-racional`, `equacoes-primeiro-grau` | `plano_cartesiano`: mover x excluindo valores que anulam denominadores e testar interseções das expressões. |
|  | `equacoes-irracionais` | Equações com radicais e soluções espúrias | Equações e inequações | `potencias-e-radicais`, `equacoes-primeiro-grau` | `plano_cartesiano`: comparar os dois lados da igualdade e filtrar candidatos que violam a condição da raiz. |
|  | `equacoes-modulares` | Equações modulares | Equações e inequações | `funcao-modular` | `reta_numerica`: localizar entradas a distância fixa de uma referência, nos dois lados do vértice. |
|  | `inequacoes-modulares` | Inequações modulares | Equações e inequações | `funcao-modular`, `conjuntos-e-intervalos` | `reta_numerica`: variar um raio de distância e sombrear o interior ou exterior do intervalo. |
|  | `equacoes-exponenciais` | Equações exponenciais | Equações e inequações | `funcao-exponencial`, `potencias-e-radicais` | `plano_cartesiano`: comparar curvas de mesma base e localizar o expoente em que as saídas coincidem. |
|  | `equacoes-logaritmicas` | Equações logarítmicas e condições de existência | Equações e inequações | `logaritmos`, `equacoes-exponenciais` | `plano_cartesiano`: cruzar as curvas e manter apenas entradas com argumentos positivos. |
|  | `inequacoes-exponenciais-logaritmicas` | Inequações exponenciais e logarítmicas | Equações e inequações | `equacoes-exponenciais`, `equacoes-logaritmicas` | `plano_cartesiano`: comparar curvas e sombrear soluções, observando quando a base crescente ou decrescente inverte a ordem. |
|  | `equacoes-trigonometricas` | Equações trigonométricas | Equações e inequações | `funcoes-trigonometricas`, `radianos-e-ciclo-trigonometrico` | `ciclo_trigonometrico`: girar o ângulo e marcar todas as posições que repetem a mesma projeção. |
|  | `inequacoes-trigonometricas` | Inequações trigonométricas | Equações e inequações | `equacoes-trigonometricas`, `radianos-e-ciclo-trigonometrico` | `ciclo_trigonometrico`: girar pelo ciclo e destacar arcos em que seno, cosseno ou tangente satisfazem a condição. |

## 4. Sequências

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
| ✅ | `sequencias-pa-pg` | Sequências, PA e PG | Sequências | `introducao-a-funcoes`, `grandezas-direta-e-inversa` | `plano_cartesiano` (pontos) + `barras`: avançar o índice e comparar soma constante com multiplicação constante. |
|  | `somatorios-pa-pg` | Soma dos termos de PA e PG | Sequências | `sequencias-pa-pg` | `barras`: acumular termos em pilhas; comparar soma linear da PA com soma em blocos da PG. |
|  | `soma-da-pg-infinita` | Soma de uma PG infinita convergente | Sequências | `somatorios-pa-pg` | `barras`: adicionar termos sucessivos com razão entre 0 e 1 e observar os acréscimos encolherem rumo a um limite. |
|  | `sequencias-recursivas-e-padroes` | Padrões e sequências recursivas | Sequências | `sequencias-pa-pg` | `plano_cartesiano` (pontos): escolher termo inicial e regra de avanço; cada novo ponto depende do anterior. |

## 5. Matemática financeira

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
| ✅ | `matematica-financeira` | Porcentagem financeira, juros simples e compostos | Matemática financeira | `razao-proporcao-porcentagem`, `grandezas-direta-e-inversa` | `barras`: avançar períodos e ver juros simples somarem parcela fixa ou juros compostos multiplicarem o saldo. |
|  | `descontos-acrescimos-e-indices` | Descontos, acréscimos e índices percentuais | Matemática financeira | `matematica-financeira` | `barras`: aplicar fatores percentuais sucessivos a um preço-base e comparar a ordem das operações. |
|  | `taxas-equivalentes-e-inflacao` | Taxas equivalentes, inflação e poder de compra | Matemática financeira | `matematica-financeira`, `descontos-acrescimos-e-indices` | `plano_cartesiano` + `barras`: converter taxas por período e comparar saldo nominal com valor real. |

## 6. Matrizes e sistemas

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
| ✅ | `matrizes-determinantes-sistemas` | Matrizes, determinantes e sistemas lineares 2×2 | Matrizes e sistemas | `funcao-afim`, `equacoes-primeiro-grau` | `transformacao_plano` + `plano_cartesiano`: transformar a malha e interpretar soluções como interseções de retas. |
|  | `determinantes-e-matriz-inversa` | Determinantes, área orientada e matriz inversa | Matrizes e sistemas | `matrizes-determinantes-sistemas` | `transformacao_plano`: deformar o quadrado unitário; o determinante indica escala de área e invertibilidade. |
|  | `sistemas-lineares-e-escalonamento` | Sistemas lineares, classificação e escalonamento | Matrizes e sistemas | `matrizes-determinantes-sistemas`, `equacoes-primeiro-grau` | `plano_cartesiano`: mover retas entre cruzamento, paralelismo e coincidência; associar cada caso ao conjunto-solução. |

## 7. Polinômios e números complexos

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
| ✅ | `polinomios` | Polinômios: grau, termos e raízes | Polinômios e complexos | `expressoes-algebricas-e-produtos-notaveis`, `fatoracao-algebrica` | `plano_cartesiano`: ligar parcelas uma a uma e observar como a soma forma o gráfico e seus zeros. |
|  | `divisao-polinomial-e-teorema-do-resto` | Divisão de polinômios e teorema do resto | Polinômios e complexos | `polinomios` | `plano_cartesiano`: arrastar o valor candidato r e ler P(r) como resto da divisão por (x−r). |
|  | `raizes-polinomiais-e-multiplicidade` | Equações polinomiais, raízes e multiplicidade | Polinômios e complexos | `polinomios`, `divisao-polinomial-e-teorema-do-resto` | `plano_cartesiano`: alterar fatores repetidos e observar a curva cruzar ou apenas tocar o eixo em cada raiz. |
| ✅ | `numeros-complexos` | Números complexos no plano | Polinômios e complexos | `potencias-e-radicais`, `raizes-polinomiais-e-multiplicidade` | `plano_cartesiano` + `transformacao_plano`: somar vetores, refletir no eixo real e girar/escalar por multiplicação. |

## 8. Combinatória e probabilidade

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
|  | `principio-fundamental-da-contagem` | Princípio fundamental da contagem e diagramas de árvore | Combinatória e probabilidade | `fracoes-e-decimais` | `grade_resultados`: escolher uma opção por etapa e visualizar a árvore ou grade de combinações possíveis. |
|  | `fatorial-e-permutacoes` | Fatorial e permutações | Combinatória e probabilidade | `principio-fundamental-da-contagem` | `grade_resultados`: ordenar objetos distintos e contar quantas escolhas restam a cada posição. |
|  | `arranjos-e-combinacoes` | Arranjos e combinações | Combinatória e probabilidade | `fatorial-e-permutacoes` | `grade_resultados`: alternar seleção com/sem ordem e ver quais resultados passam a representar o mesmo grupo. |
|  | `combinacoes-com-repeticao` | Combinações com repetição e distribuição | Combinatória e probabilidade | `arranjos-e-combinacoes` | `grade_resultados`: distribuir itens idênticos entre recipientes e contar as configurações permitidas. |
|  | `binomio-de-newton` | Binômio de Newton e coeficientes binomiais | Combinatória e probabilidade | `arranjos-e-combinacoes`, `expressoes-algebricas-e-produtos-notaveis` | `grade_resultados`: organizar escolhas em níveis e ler os coeficientes que contam os termos da expansão. |
|  | `probabilidade-espaco-amostral` | Probabilidade, espaço amostral e eventos | Combinatória e probabilidade | `principio-fundamental-da-contagem` | `grade_resultados`: destacar resultados favoráveis sobre o total de resultados equiprováveis. |
|  | `probabilidade-uniao-e-intersecao` | União, interseção e complemento de eventos | Combinatória e probabilidade | `probabilidade-espaco-amostral`, `conjuntos-e-intervalos` | `grade_resultados`: colorir regiões A, B, A∪B e A∩B numa grade de resultados. |
|  | `probabilidade-condicional` | Probabilidade condicional | Combinatória e probabilidade | `probabilidade-uniao-e-intersecao` | `grade_resultados`: restringir a grade aos casos de B e contar que fração também pertence a A. |
|  | `eventos-independentes` | Eventos independentes e multiplicação de probabilidades | Combinatória e probabilidade | `probabilidade-condicional` | `grade_resultados`: comparar grade completa com subgrades; testar se a proporção de A muda após saber B. |
|  | `experimentos-binomial-e-repetidos` | Ensaios repetidos e distribuição binomial | Combinatória e probabilidade | `probabilidade-espaco-amostral`, `arranjos-e-combinacoes` | `grade_resultados`: enumerar sequências de sucesso/fracasso e agrupar por número de sucessos. |

## 9. Estatística

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
|  | `leitura-de-tabelas-e-graficos` | Leitura e comparação de tabelas e gráficos | Estatística | `fracoes-e-decimais`, `razao-proporcao-porcentagem` | `barras`: alternar barras, linhas e setores e responder perguntas mudando escala e destaque. |
|  | `distribuicao-de-frequencias-e-amostragem` | Frequências, população, amostra e amostragem | Estatística | `leitura-de-tabelas-e-graficos` | `barras`: adicionar observações à amostra e observar frequências absolutas e relativas mudarem. |
|  | `medidas-de-tendencia-central` | Média, mediana e moda | Estatística | `distribuicao-de-frequencias-e-amostragem` | `barras`: arrastar uma observação e comparar como média, mediana e moda respondem. |
|  | `medidas-de-dispersao` | Amplitude, variância e desvio padrão | Estatística | `medidas-de-tendencia-central` | `barras`: espalhar pontos mantendo a média e ver amplitude e dispersão aumentarem. |
|  | `quartis-percentis-e-boxplot` | Quartis, percentis e diagrama de caixa | Estatística | `medidas-de-dispersao` | `barras`: ordenar dados e arrastar os cortes que separam quartis e mediana. |

## 10. Geometria plana

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
|  | `angulos-retas-paralelas` | Ângulos, retas paralelas e transversais | Geometria plana | `conjuntos-e-intervalos` | `geometria_plana`: arrastar uma transversal e observar ângulos correspondentes, alternos e suplementares. |
|  | `triangulos-congruencia-e-propriedades` | Triângulos, congruência e propriedades | Geometria plana | `angulos-retas-paralelas` | `geometria_plana`: mover vértices e comparar lados/ângulos que mantêm ou quebram a congruência. |
|  | `semelhanca-e-teorema-de-tales` | Semelhança de triângulos e teorema de Tales | Geometria plana | `triangulos-congruencia-e-propriedades`, `razao-proporcao-porcentagem` | `geometria_plana`: deslizar uma paralela e observar triângulos semelhantes e razões correspondentes invariantes. |
|  | `teorema-de-pitagoras` | Teorema de Pitágoras | Geometria plana | `triangulos-congruencia-e-propriedades` | `geometria_plana`: deformar um triângulo retângulo e comparar áreas dos quadrados construídos sobre os lados. |
|  | `relacoes-metricas-triangulo-retangulo` | Relações métricas no triângulo retângulo | Geometria plana | `teorema-de-pitagoras`, `semelhanca-e-teorema-de-tales` | `geometria_plana`: mover a altura relativa à hipotenusa e observar os triângulos semelhantes e segmentos projetados. |
|  | `poligonos-e-quadrilateros` | Polígonos e quadriláteros: propriedades e ângulos | Geometria plana | `angulos-retas-paralelas`, `triangulos-congruencia-e-propriedades` | `geometria_plana`: alterar vértices e acompanhar soma dos ângulos e propriedades de cada quadrilátero. |
|  | `poligonos-regulares` | Polígonos regulares e ladrilhamentos | Geometria plana | `poligonos-e-quadrilateros` | `geometria_plana`: variar número de lados e ângulo central para testar encaixe sem lacunas no plano. |
|  | `perimetro-e-area-de-figuras-planas` | Perímetro e área de figuras planas | Geometria plana | `poligonos-e-quadrilateros`, `unidades-conversoes-e-escalas` | `geometria_plana`: arrastar vértices e contar quadrículas enquanto perímetro e área se atualizam separadamente. |
|  | `circunferencia-arcos-e-angulos` | Circunferência, arcos e ângulos | Geometria plana | `poligonos-regulares` | `geometria_plana`: mover pontos na circunferência e relacionar ângulo central, inscrito e arco correspondente. |
|  | `comprimento-da-circunferencia` | Comprimento da circunferência | Geometria plana | `circunferencia-arcos-e-angulos`, `razao-proporcao-porcentagem` | `geometria_plana`: desenrolar o contorno circular e comparar comprimento com diâmetro para revelar π. |
|  | `area-do-circulo-e-setores` | Área do círculo, setores e coroas circulares | Geometria plana | `perimetro-e-area-de-figuras-planas`, `circunferencia-arcos-e-angulos` | `geometria_plana`: abrir um setor em fatias e rearranjar como paralelogramo para visualizar a área. |
|  | `transformacoes-isometrias-e-homotetia` | Simetrias, isometrias e homotetia | Geometria plana | `poligonos-e-quadrilateros`, `unidades-conversoes-e-escalas` | `geometria_plana`: refletir, girar, transladar e ampliar a mesma figura, comparando medidas invariantes. |
|  | `triangulos-notaveis-e-construcoes` | Triângulos notáveis e construções geométricas | Geometria plana | `teorema-de-pitagoras`, `semelhanca-e-teorema-de-tales` | `geometria_plana`: ajustar lados de triângulos 3-4-5 e 30°-60°-90° e observar relações fixas. |

## 11. Trigonometria

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
|  | `trigonometria-no-triangulo-retangulo` | Trigonometria no triângulo retângulo | Trigonometria | `teorema-de-pitagoras`, `semelhanca-e-teorema-de-tales` | `geometria_plana`: arrastar um ângulo e observar razões seno, cosseno e tangente como proporções dos lados. |
|  | `lei-dos-senos-e-cossenos` | Lei dos senos e lei dos cossenos | Trigonometria | `trigonometria-no-triangulo-retangulo`, `triangulos-congruencia-e-propriedades` | `geometria_plana`: mover um vértice de triângulo oblíquo e atualizar lados, ângulos e relações de medida. |
|  | `radianos-e-ciclo-trigonometrico` | Graus, radianos e ciclo trigonométrico | Trigonometria | `trigonometria-no-triangulo-retangulo` | `ciclo_trigonometrico`: girar o raio e converter a mesma posição angular entre graus e radianos. |
|  | `seno-cosseno-tangente-no-ciclo` | Seno, cosseno, tangente e sinais por quadrante | Trigonometria | `radianos-e-ciclo-trigonometrico` | `ciclo_trigonometrico`: girar pelo ciclo e projetar coordenadas horizontal e vertical, observando sinais. |
|  | `identidades-trigonometricas` | Relações fundamentais e identidades trigonométricas | Trigonometria | `seno-cosseno-tangente-no-ciclo` | `ciclo_trigonometrico`: mover o ponto unitário e verificar continuamente `sen²+cos²=1`. |
|  | `funcoes-trigonometricas` | Gráficos das funções seno, cosseno e tangente | Trigonometria | `seno-cosseno-tangente-no-ciclo`, `introducao-a-funcoes` | `ciclo_trigonometrico`: girar o ângulo enquanto a projeção traça o gráfico periódico ao lado. |
|  | `modelos-periodicos-e-amplitude` | Modelagem periódica, amplitude, período e fase | Trigonometria | `funcoes-trigonometricas`, `funcao-afim` | `ciclo_trigonometrico`: ajustar amplitude, período e fase e alinhar a onda a dados de maré ou som. |
|  | `formulas-de-adicao-e-arco-duplo` | Fórmulas de adição e arco duplo | Trigonometria | `identidades-trigonometricas`, `funcoes-trigonometricas` | `ciclo_trigonometrico`: alterar um ângulo em duas partes e comparar seno/cosseno da soma com as rotações sucessivas. |

## 12. Geometria espacial

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
|  | `posicoes-relativas-no-espaco` | Retas, planos, paralelismo e perpendicularidade no espaço | Geometria espacial | `angulos-retas-paralelas` | `solido_3d`: girar uma cena com retas e planos para distinguir paralelos, concorrentes e reversos. |
|  | `projecoes-cortes-e-planificacoes` | Vistas, projeções, cortes e planificações | Geometria espacial | `posicoes-relativas-no-espaco`, `poligonos-e-quadrilateros` | `solido_3d`: girar o sólido, mover plano de corte e abrir a superfície em planificação. |
|  | `poliedros-e-relacao-de-euler` | Poliedros, elementos e relação de Euler | Geometria espacial | `projecoes-cortes-e-planificacoes` | `solido_3d`: contar vértices, arestas e faces enquanto se deforma ou abre um poliedro convexo. |
|  | `prismas-e-paralelepipedos` | Prismas e paralelepípedos | Geometria espacial | `poliedros-e-relacao-de-euler`, `perimetro-e-area-de-figuras-planas` | `solido_3d`: variar base e altura; abrir as faces e comparar área lateral e volume. |
|  | `piramides` | Pirâmides e volume | Geometria espacial | `poliedros-e-relacao-de-euler`, `perimetro-e-area-de-figuras-planas` | `solido_3d`: empilhar ou comparar três pirâmides que preenchem um prisma de mesma base e altura. |
|  | `troncos-de-solidos` | Troncos de pirâmides e cones | Geometria espacial | `piramides`, `cones`, `semelhanca-e-teorema-de-tales` | `solido_3d`: mover o plano de corte paralelo à base e acompanhar altura, áreas e volume remanescente. |
|  | `cilindros` | Cilindros, área e volume | Geometria espacial | `comprimento-da-circunferencia`, `area-do-circulo-e-setores` | `solido_3d`: desenrolar a lateral em retângulo e variar raio/altura para atualizar superfície e volume. |
| 🟢 | `cones` | Cones: rotação, geratriz, áreas e volume | Geometria espacial | `teorema-de-pitagoras`, `posicoes-relativas-no-espaco` | Cone implementado: girar o triângulo, arrastar a geratriz e revelar o corte meridiano. |
|  | `esferas` | Esferas, secções, área e volume | Geometria espacial | `circunferencia-arcos-e-angulos`, `area-do-circulo-e-setores` | `solido_3d`: mover um plano de corte e observar o círculo da secção variar com a distância ao centro. |
|  | `solidos-de-revolucao` | Sólidos de revolução e secções | Geometria espacial | `projecoes-cortes-e-planificacoes`, `perimetro-e-area-de-figuras-planas` | `solido_3d`: girar perfis planos distintos e comparar os sólidos e secções que cada perfil gera. |
|  | `areas-e-volumes-por-composicao` | Áreas e volumes de sólidos compostos | Geometria espacial | `prismas-e-paralelepipedos`, `cilindros`, `cones`, `esferas` | `solido_3d`: separar e recombinar sólidos simples; comparar volume total e superfícies expostas. |

## 13. Geometria analítica

| Estado | Slug | Capítulo | Setor | Pré-requisitos | Máquina visual central |
|---|---|---|---|---|---|
|  | `plano-cartesiano-distancia-e-ponto-medio` | Coordenadas, distância e ponto médio | Geometria analítica | `teorema-de-pitagoras`, `introducao-a-funcoes` | `plano_cartesiano`: arrastar dois pontos e atualizar deslocamentos, distância e ponto médio. |
|  | `vetores-no-plano` | Vetores no plano e operações | Geometria analítica | `plano-cartesiano-distancia-e-ponto-medio` | `transformacao_plano`: somar vetores ponta-cauda e variar componentes para mover o resultante. |
|  | `reta-equacao-e-inclinacao` | Equação da reta, inclinação e interceptos | Geometria analítica | `funcao-afim`, `plano-cartesiano-distancia-e-ponto-medio` | `plano_cartesiano`: selecionar dois pontos e observar inclinação e equação da reta atualizarem. |
|  | `posicoes-relativas-de-retas` | Posições relativas, ângulos e interseções de retas | Geometria analítica | `reta-equacao-e-inclinacao` | `plano_cartesiano`: variar coeficientes até as retas cruzarem, ficarem paralelas ou coincidirem. |
|  | `circunferencia-equacao-e-posicoes` | Equação e posições relativas de circunferências | Geometria analítica | `plano-cartesiano-distancia-e-ponto-medio`, `comprimento-da-circunferencia` | `plano_cartesiano`: mover centro e raio e visualizar tangência, secância ou ausência de interseção. |
|  | `parabola-conica` | Parábola como lugar geométrico e cônica | Geometria analítica | `plano-cartesiano-distancia-e-ponto-medio`, `funcao-quadratica` | `plano_cartesiano`: mover foco e diretriz e traçar pontos equidistantes de ambos. |
|  | `elipse` | Elipse como lugar geométrico | Geometria analítica | `plano-cartesiano-distancia-e-ponto-medio` | `plano_cartesiano`: arrastar dois focos e traçar pontos cuja soma das distâncias permanece fixa. |
|  | `hiperbole` | Hipérbole como lugar geométrico | Geometria analítica | `plano-cartesiano-distancia-e-ponto-medio` | `plano_cartesiano`: mover focos e traçar pontos com diferença constante das distâncias aos focos. |

## Contagem

**Total: 104 capítulos**, distribuídos em 13 setores. O total inclui os capítulos já planejados e implementados; os estados são marcadores de andamento, não itens adicionais.

## Fontes de referência

[1] Ministério da Educação, *Base Nacional Comum Curricular — Ensino Médio*, área de Matemática e suas Tecnologias, competências e habilidades: https://www.gov.br/mec/pt-br/cne/bncc_ensino_medio.pdf

[2] INEP, *Matriz de Referência do ENEM*, Matemática e suas Tecnologias: https://download.inep.gov.br/download/enem/matriz_referencia.pdf

[3] FUVEST, *Programa do Vestibular 2026*, Matemática e suas Tecnologias: https://www.fuvest.br/wp-content/uploads/fuvest2026_programa-vestibular.pdf

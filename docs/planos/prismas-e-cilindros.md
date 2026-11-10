# Plano — Prismas e cilindros

## a) Ancoragem mecânica
A máquina de extrusão (`V = A_base · h`) pega uma figura plana de área `A_base` (polígono no prisma ou círculo de raio `r` no cilindro) e a arrasta verticalmente por uma altura `h` (variável independente), empilhando fatias idênticas até construir o sólido 3D. A área lateral é a fita desenrolada do contorno da base (`Perímetro_base · h`).

## b) Visual de partida
Palco 3D ortográfico (`solido_3d`): base plana que se eleva com o slider de altura `h`, seletor de formato da base (quadrado, triângulo, hexágono até círculo de raio `r`), corte transversal deslizante e controle de planificação (abrir as faces laterais e as duas tampas num plano).

## c) Caso neutro
Cubo unitário `1 × 1 × 1` (ou fatia inicial de altura `h = 1` sobre a base): quando `h = 1`, o volume numérico `V` é exatamente igual à própria área da base (`V = A_base · 1`), funcionando como o "primeiro andar" de blocos que será multiplicado ao subir `h`.

## d) Panorama e recorte
Situar poliedros prismáticos (paralelepípedo, cubo, prisma triangular/hexagonal), cilindro circular reto, planificação, área lateral/total, volume por empilhamento (`A_base · h`) e diagonal do paralelepípedo. Escopo: prismas retos e cilindro reto com foco na unificação `A_base · h` e planificação. Deixar troncos oblíquos truncados para além do recorte.

## e) Progressão por contraste
1. Figura plana (`h = 0`, área `A_base`, volume `0`) versus fatia unitária (`h = 1`) versus pilha de altura `h` (`V = A_base · h`).
2. Prisma quadrangular → hexagonal → cilindro circular: quanto mais lados tem a base, mais o prisma se aproxima do cilindro, mantendo a mesma regra `A_base · h`.
3. Superfície fechada 3D versus planificação 2D: a lateral curva do cilindro, quando cortada e esticada, revela um simples retângulo de base `2πr` e altura `h`.
4. Dobrar a altura `h` (volume dobra: `2V`) versus dobrar o raio `r` da base (área da base quadruplica e o volume quadruplica: `4V`).

## f) Dedução causal da forma
Como todas as seções horizontais de um prisma ou cilindro têm exatamente a mesma forma e área da base (sem afunilar), cada unidade de altura acrescenta a mesma quantidade `A_base` de volume — logo `V = A_base · h` (no cilindro, `πr²h`). Na superfície lateral, desenrolar a parede ao redor da base estica seu contorno num retângulo cuja largura é obrigatoriamente o perímetro da base (`2πr` no cilindro) e cuja altura é `h`. E no paralelepípedo `a × b × c`, a diagonal do chão mede `√(a² + b²)` por Pitágoras, que combinada com a altura vertical `c` forma outro triângulo retângulo de hipotenusa `D = √(a² + b² + c²)`.

## g) Simulação espacial e fronteiras
Deslizar o plano de corte horizontal de `0` a `h` mostra que a seção transversal é invariante em toda a altura. Inclinar a pilha lateralmente (princípio de Cavalieri) mantém a área de cada fatia e a altura `h`, preservando o volume `A_base · h`, mas aumenta as arestas laterais (deixando de ser reto). Na fronteira `h = 0` ou `r = 0`, o sólido degenera sem volume.

## h) Roteiro da lição

1. **Fala:** “Se a base é um retângulo `3 × 2` com 6 quadradinhos e levantamos uma camada de altura `h = 1`, quantos cubinhos `1×1×1` temos? Temos 6, exatamente o número da área da base.” **Widget §5.5 — `solido_3d`:** mostra a base plana `3×2` (`h = 0`) subindo para `h = 1` e formando 1 camada de 6 cubos unitários.
2. **Fala:** “E se empilharmos 4 camadas iguais (`h = 4`) sobre essa mesma base de área 6? Cada andar soma 6 cubinhos, totalizando `V = 6 × 4 = 24`.” **Widget §5.5 — `solido_3d`:** aluno arrasta o slider `h` de 1 até 4, vendo as camadas empilharem e o chip `V = A_base × h = 24`.
3. **Fala:** “Num paralelepípedo `3 × 4 × 12`, como achar a diagonal que atravessa o espaço de um canto no chão ao canto oposto no teto? Primeiro Pitágoras no chão dá `5` (`3²+4²=5²`), e depois Pitágoras com a altura `12` dá `13` (`5²+12²=13²`).” **Widget §5.5 — `solido_3d`:** destaca o triângulo retângulo no piso (3-4-5) e ergue o triângulo vertical (5-12-13) dentro da caixa transparente.
4. **Fala:** “O que muda na regra do volume se trocarmos a base retangular por um triângulo ou um hexágono? Nada na lógica: toda fatia horizontal continua igual à base, então `V = A_base · h` continua valendo.” **Widget §5.5 — `solido_3d`:** alterna a base entre triângulo, hexágono e círculo enquanto um plano de corte desliza mostrando a seção constante.
5. **Fala:** “De que movimento nasce o cilindro reto de raio `r` e altura `h`? De um retângulo `r × h` girando `360°` em torno de um de seus lados, ou de um círculo de área `πr²` subindo por `h`.” **Widget §5.5 — `solido_3d`:** aluno gira o retângulo de `0°` a `360°` gerando o cilindro com `V = πr²h`.
6. **Fala:** “Se cortarmos a parede lateral de uma lata cilíndrica de cima a baixo e abrirmos na mesa, que figura plana aparece? Aparece um retângulo cuja base é o comprimento da circunferência da tampa (`2πr`) e a altura é `h`.” **Widget §5.5 — `solido_3d`:** slider de planificação desenrola a lateral do cilindro em um retângulo `2πr × h` e rebate os dois círculos `πr²`.
7. **Fala:** “Num cilindro de raio `r = 3` e altura `h = 5`, o que aumenta mais o volume: dobrar a altura ou dobrar o raio? Dobrar a altura apenas dobra o volume, mas dobrar o raio multiplica a área da base (`πr²`) por 4!” **Widget §5.5 — `solido_3d`:** compara lado a lado o cilindro base fantasma com `2h` (volume `2x`) e com `2r` (volume `4x`).
8. **Fala:** “Se entortarmos uma pilha de moedas para o lado sem mudar a quantidade de moedas nem a altura da pilha, o volume muda? Não: pelo princípio de Cavalieri, mesma área por fatia na mesma altura garante o mesmo volume.” **Widget §5.5 — `solido_3d`:** slider de cisalhamento inclina a pilha de discos mantendo `A_base` e `h` constantes.

## i) Questões pós-lição (6)
Quatro alternativas verificando empilhamento `A_base · h`, planificação do cilindro e escala do raio.

1. **Um prisma reto tem base triangular de área 15 cm² e altura 8 cm. Qual é o seu volume?** A) 23 cm³ B) 60 cm³ C) 120 cm³ D) 240 cm³. **Gabarito: C.** Feedback: como a seção não afunila, o volume é `A_base × h = 15 × 8 = 120 cm³`.
2. **Ao planificar a superfície lateral de um cilindro reto de raio `r` e altura `h`, obtemos…** A) um círculo de raio `h` B) um triângulo de base `2r` C) um retângulo de lados `2πr` e `h` D) um quadrado de lado `r`. **Gabarito: C.** Feedback: a borda da base circular desenrolada mede `2πr` e mantém a altura `h`.
3. **Qual é o volume de um cilindro reto de raio `r = 2 cm` e altura `h = 5 cm`?** A) `10π cm³` B) `20π cm³` C) `25π cm³` D) `40π cm³`. **Gabarito: B.** Feedback: a área da base é `π·2² = 4π` e o volume é `4π × 5 = 20π cm³`.
4. **Se dobrarmos o raio da base de um cilindro mantendo a mesma altura, seu volume fica multiplicado por…** A) 2 B) 3 C) 4 D) 8. **Gabarito: C.** Feedback: como o raio entra ao quadrado na área da base (`πr²`), dobrar `r` multiplica o volume por `2² = 4`.
5. **Um paralelepípedo retângulo tem dimensões 3 cm, 4 cm e 12 cm. Quanto mede sua diagonal espacial?** A) 13 cm B) 15 cm C) 19 cm D) 12 cm. **Gabarito: A.** Feedback: `D = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13 cm`.
6. **Quantos centímetros quadrados de papelão são necessários para fazer uma caixa cúbica fechada de aresta 3 cm?** A) 9 cm² B) 27 cm² C) 36 cm² D) 54 cm². **Gabarito: D.** Feedback: o cubo tem 6 faces quadradas de área `3² = 9 cm²`, totalizando `6 × 9 = 54 cm²`.

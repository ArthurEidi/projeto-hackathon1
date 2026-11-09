# Plano — Introdução a funções

## a) Ancoragem mecânica
Função é uma máquina que recebe uma entrada permitida x e entrega exatamente uma saída y: `x → regra → f(x)`. Domínio é o conjunto de entradas aceitas; contradomínio é o universo de saídas combinado; imagem são as saídas que a máquina realmente produz. A regra pode ser visual, numérica ou algébrica.

## b) Visual de partida
Palco: máquina de entrada/saída ligada a um plano cartesiano. Slider escolhe x; um ponto entra na máquina, aparece o cálculo e o ponto `(x,f(x))` se move no gráfico. Alternar entre tabela, setas domínio→imagem e gráfico. Um modo “testar vertical” permite traçar uma linha vertical sobre uma relação candidata.

## c) Caso neutro
Começar com `f(x)=x`: a máquina devolve a entrada sem alterar; no gráfico, os pontos ficam sobre `y=x`. Comparar com `f(x)=x+1` depois, para que a mudança de saída tenha uma referência visível. Usar entradas −1, 0 e 2.

## d) Panorama e recorte
Apresentar função como relação unívoca, domínio, contradomínio, imagem, tabela, diagrama e gráfico. Recorte inicial: reconhecer função e ler imagens/antecedentes em exemplos simples. Deixar composição, inversa e funções definidas por partes para capítulos próprios.

## e) Progressão por contraste
1. Máquina `x→x` versus `x→x+1`: entrada igual, saída alterada.
2. Múltiplas entradas com mesma saída (`x²`) ainda podem formar função.
3. Uma entrada ligada a duas saídas não é função; evidenciar a falha no diagrama e no teste da reta vertical.
4. Distinguir imagem de contradomínio: o desenho pode ocupar só parte do conjunto de saídas declarado.

## f) Dedução causal da forma
O gráfico de uma função passa no teste da reta vertical porque para cada x só existe um y. A reta horizontal falhar não impede que seja função: duas entradas podem gerar o mesmo resultado. Imagem é o conjunto das alturas realmente alcançadas ao variar x permitido, não todas as alturas imagináveis. Cada representação responde à mesma pergunta: “o que sai para esta entrada?”.

## g) Simulação espacial e fronteiras
Usar `f(x)=x²` para mostrar que entradas −2 e 2 podem chegar a 4. Restringir o domínio a `[0,3]` e observar que parte do gráfico some e a imagem muda. Testar relações `x²=y` como relação de dois ramos: se x for a entrada, um x pode associar-se a dois y; se y for entrada, pode haver outra leitura. Deixar claro que função depende da escolha de entrada.

## h) Roteiro da lição

1. **Fala:** “Se a entrada é −1 e a regra é `f(x)=x`, o que sai? −1: esta máquina devolve a entrada intacta.” **Widget §5.1 — `plano_cartesiano`:** exibir a curva fantasma y=x; o aluno arrasta o ponto de entrada e acompanha a imagem sobre a diagonal.
2. **Fala:** “Quando x vai de 0 para 1, quanto muda a saída nessa máquina? Também 1, porque entrada e saída caminham juntas.” **Widget §5.1 — `plano_cartesiano`:** mover o marcador pela reta e observar tabela, coordenadas e ponto atualizados.
3. **Fala:** “Agora somo 1: para x=2, a saída fica 2 ou 3? Fica 3, e o ponto sobe uma unidade.” **Widget §5.1 — `plano_cartesiano`:** slider b passa de 0 a 1; comparar y=x com y=x+1.
4. **Fala:** “Uma entrada pode ter duas saídas e ainda ser função? Não; para x=2, duas alturas diferentes quebrariam a regra de uma saída por entrada.” **Widget §5.1 — `plano_cartesiano`:** testar uma relação com dois pontos na mesma vertical e traçar a linha de verificação.
5. **Fala:** “E duas entradas podem chegar à mesma saída? Sim: −2 e 2 dão 4 em `x²`, sem quebrar a regra.” **Widget §5.1 — `plano_cartesiano`:** escolher a família quadrática e mover x entre −2 e 2; o mesmo y recebe duas entradas.
6. **Fala:** “Se o contradomínio vai de 0 a 5, mas o gráfico só alcança 1 e 4, a imagem precisa preencher tudo? Não; imagem é só o que a máquina alcança.” **Widget §5.1 — `plano_cartesiano`:** comparar faixa de saídas declarada com os pontos efetivamente visitados.
7. **Fala:** “Se eu permito apenas x de 0 a 2, o ponto em x=−1 continua no gráfico da função escolhida? Não; a fórmula existe, mas essa entrada ficou fora do domínio.” **Widget §5.1 — `plano_cartesiano`:** limitar a janela/domínio pelo controle e ocultar o trecho não permitido.
8. **Fala:** “Então o que define uma função: cada saída ser diferente ou cada entrada ter uma única saída? É uma única saída por entrada.” **Widget §5.1 — `plano_cartesiano`:** alternar entre diagrama de setas, tabela e gráfico para confirmar a mesma regra nas três representações.

## i) Questões pós-lição (6)
Quatro alternativas, uma resposta certa e feedback explicativo, no estilo do treino existente.

1. **Uma função pode mandar dois valores de x para o mesmo y?** A) Não, nunca. B) Sim, por exemplo `x²`: −2 e 2 dão 4. C) Só se y for zero. D) Só se o domínio tiver dois elementos. **Gabarito: B.** Feedback: a exigência é uma saída por entrada, não entradas distintas por saída.
2. **Qual relação não define y como função de x?** A) `y=x+1` B) `y=x²` C) `y=±√x` D) `y=2x`. **Gabarito: C.** Feedback: para x positivo, aparecem duas saídas.
3. **Se `f(x)=2x` e x=3, qual é a saída?** A) 3 B) 5 C) 6 D) 9. **Gabarito: C.** Feedback: a entrada é duplicada pela máquina.
4. **O domínio de `f(x)=x+4` é `{0,1,2}`. Qual é a imagem?** A) `{0,1,2}` B) `{4,5,6}` C) `{1,2,3}` D) `{4}`. **Gabarito: B.** Feedback: aplique a regra a cada entrada permitida.
5. **Uma função tem contradomínio `{0,1,2,3,4}` e imagem `{1,3}`. Qual frase é correta?** A) A imagem inclui todos do contradomínio. B) A máquina realmente alcança 1 e 3, mas não precisa alcançar os demais. C) A função não existe. D) O domínio é `{1,3}`. **Gabarito: B.** Feedback: imagem é o conjunto das saídas atingidas.
6. **O gráfico de uma função falha no teste da reta vertical se uma vertical corta o desenho em…** A) nenhum ponto. B) exatamente um ponto. C) dois pontos distintos. D) um ponto no eixo x. **Gabarito: C.** Feedback: o mesmo x teria duas saídas diferentes.
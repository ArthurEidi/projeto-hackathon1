# Revisão B35 dos widgets B33

Referências de código relativas a `src/widgets/common/<pasta>/`. As verificações de largura abaixo são de código, sem medição em navegador.

## divisao

Aula de divisão polinomial, passos 1 e 3. Por 1, Q = x² − 1. Por 2, Q = 0,5x² − 0,5. Ambos têm resto zero. Na chave, x(x − 2) deixa 2x − 1 e 2(x − 2) deixa 3 = P(2). As metas d ≥ 2 e etapa ≥ 2 ocorrem no último valor dos controles. A primeira retirada mostra corretamente «x + ?». Vitest passou nos 10 testes.

- **Média** — `desenho.ts:154` e `:164`. O passo 1 pergunta se aparece resto ao dividir por 2. Já em d = 1, o selo permanente e o rodapé anunciam resto zero. Reservar a conclusão para o divisor pedido e testar os textos nos dois estados.
- **Média** — `calc.ts:87`, `params.ts:35`. Um divisor como 10⁻¹² passa no contrato e a conta o classifica como zero. Por −2, a conta regular dá −0,5x² + 0,5 corretamente. Usar a mesma regra de zero exato na validação e na operação e testar os dois sinais.
- **Média** — `calc.ts:135` e `:146`. Uma meta baseada só em resto aceita uma divisão inválida por zero ou o resto final 3 já na etapa 0 da chave. Os passos atuais usam d e etapa. Emitir uma métrica de resultado disponível e exigir a etapa válida na conclusão.
- **Baixa** — `desenho.ts:195` e `:242`. Quatro coeficientes de oito algarismos são aceitos. A expressão atravessa a chave (202 px úteis à esquerda em 400 px) e a identidade excede o rodapé. Medir e quebrar as expressões. O canvas simulado em `divisao.test.ts:95` atribui 40 px a qualquer texto e não verifica o conteúdo desenhado.

## escalonado

Na aula de sistemas, passo 2, L₂ − kL₁ dá [2−k, 1−k | 4−3k]. Só k = 2 zera x e produz −y = −2, logo (1, 2). No passo 3, z = t, y = 2 − t e x = 1. O controle t entra diretamente nas métricas do motor, portanto t = 1 conclui. No passo 4, a última linha é 0 = t, compatível em 0 e impossível em 1. No desafio, a figura inicial oculta a classificação e exibe a contradição pedida. Vitest passou nos 10 testes.

- **Média** — `calc.ts:170` e `escalonado.test.ts:90`. No caso da dúvida do passo 3, substituir a última linha por 0 = 0 mantém x = 3 − (2 − z) − z = 1. O cálculo propaga o valor desconhecido de z e devolve x indeterminado. O teste exige esse resultado e verifica a identidade à parte. Propagar expressões afins das variáveis livres e exigir x = 1 no retorno.
- **Média** — `desenho.ts:43`, `calc.ts:177`. O mesmo sistema produz quatro linhas de substituição (três equações e «z livre»), mas reserva altura para três. O rodapé seguinte pode ficar fora do canvas no celular. Dimensionar pela quantidade efetivamente desenhada e testar a última coordenada.
- **Média** — `desenho.ts:250`. Em um sistema com solução única e plano, desativar `mostrar.solucao` esconde a legenda, mas o ponto continua marcando a resposta. Condicionar também o ponto a essa opção e conferir o estado oculto no teste de desenho.
- **Média** — `params.ts:60` e `calc.ts:140`. Em substituir, as linhas [1,1,3] e [2,1,4] são aceitas. Ambas têm pivô em x e a tabela declara «y livre», embora a classificação encontre (1,2). Verificar a forma escalonada após avaliar os controles antes de gerar a tabela.

## grupos

Aula de divisibilidade. No passo 2, d = 1, 2, 3 dá 6, 3, 2 grupos, sempre sem sobra. No passo 3, para m = 4, 8, 12, os pares de sobras são (0,4), (0,2), (0,0). MMC = 12 e MDC = 2. No passo 4, 12 = 2²·3 e os divisores 3, 4, 5 produzem (q,r) = (4,0), (3,0), (2,2). As três metas exigem o último valor alcançável. O desafio oculta o valor numérico de r e permite contar as fichas. Vitest passou nos 7 testes.

- **Alta** — `desenho.ts:311` e `:315`. Com a = 4, b = 6 e m = 24, o selo afirma «MMC = 24». O teste de divisibilidade identifica qualquer múltiplo comum. Comparar m com mmc(a,b) e testar 12 e 24. A faixa da aula termina em 12.
- **Média** — `calc.ts:17`, `params.ts:16`. d = −3 vira 1 e d = 2,5 vira 3. O controle pode indicar um divisor e o desenho efetuar outra divisão. Validar inteiro positivo também após avaliar expressões e mostrar o estado inválido.
- **Média** — `desenho.ts:93` e `:137`. Com n = d = 40 a caixa encolhe para a largura disponível, mas a fileira mantém espaçamento fixo e sai da caixa e do canvas de 400 px. Distribuir fichas por linhas ou escalonar também as posições.
- **Média** — `desenho.ts:415`. Em fatoração com n = 12, d = 5 e mostrar_resto desativado, o rodapé ainda escreve «12 = 5·2 + 2». Aplicar a opção também à identidade e verificar a ausência do resto no texto desenhado.
- **Baixa** — `desenho.ts:414` e `calc.ts:27`. Com n = 1 a lista de primos é vazia e o rodapé termina em «1 = ». Tratar explicitamente 0 e 1 e explicar que não têm decomposição em fatores primos.

## escala

Na aula de notação científica, passo 1, n de −2 a 2 gera 0,02, 0,2, 2, 20 e 200. A primeira subida de 0 a 1 atende à meta. No passo 2, 20·10⁰ = 2·10¹, com coeficiente normalizado só em n = 1. No passo 3, 2 e 3 estão abaixo de √10 e 4 acima, portanto 200 e 300 têm ordem 10², e 400 tem ordem 10³. A meta a ≥ 4 coincide com a mudança. A figura do desafio mostra 200 sem marcar a notação correta. Vitest passou nos 7 testes.

- **Alta** — `calc.ts:76`. O quadro só expande até milhares e milésimos. Com a = 2 e n = 4, o selo indica 20000 e o quadro mostra apenas 0. Com n = −4, 0,0002 também vira 0 no quadro. Derivar as casas necessárias do número e testar os algarismos nas duas extremidades.
- **Média** — `desenho.ts:205`. Em normalizar com valor = 20 e n_ref = 1, a referência exibida é 20·10¹ = 200. Calcular o coeficiente de referência como 20/10¹ = 2. O n_ref = 0 da aula mascara o erro.
- **Média** — `desenho.ts:171` e `calc.ts:126`. Para faixa_n = [−2,2] e n = 3, o marcador de 2·10³ fica sobre a marca 10². Expandir o eixo para conter o expoente resolvido ou indicar explicitamente que está fora dele.
- **Baixa** — `calc.ts:39` e `escala.test.ts:20`. O predicado de 1 ≤ a < 10 aceita 0,9999999995 e rejeita 9,9999999995. Aplicar as desigualdades do enunciado e testar os vizinhos dos dois limites.

## Conferência final

Após o git diff --stat, a comparação por SHA-256 incluiu também os arquivos novos fora do índice. Foram relidos os desenhos de escalonado e escala e os passos das aulas de sistemas, notação científica e divisibilidade. O ajuste concorrente no posicionamento dos rótulos do plano preserva o desenho do ponto de solução quando a legenda está oculta. As metas e contas registradas acima correspondem aos passos relidos. Nas quatro suítes individuais passaram 34 testes.

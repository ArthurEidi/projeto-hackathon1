# Revisão cruzada B45r da B44b

Revisão de `c99658d`, comparada com seu pai `770a8c4`. Os casos de tamanho da B44b passaram. A revisão encontrou quatro pendências para futuras configurações, três em escala e uma na conclusão de passos de MMC. Nas configurações das aulas atuais, a mudança visual observada além da grade foi um tom de texto mais escuro na divisão.

## Achados

1. **Média · MMC com total fracionário ainda pode concluir um passo que usa a métrica `m`.** Com `{ modo: "mmc", a: 4, b: 6, m: "$m" }`, controle `m = 11,5` e regra `{ metric: "m", gte: 11 }`, o canvas mostra «Total inválido: use inteiro ≥ 1». O widget emite `m = NaN` e `isComplete` recusa a regra com essas métricas. A mesma chamada usando a composição do `InteractiveCanvas` devolve `true` porque o controle bruto é aplicado por último e sobrescreve `NaN`. O teste da B44b cobre a emissão, mas não essa composição. A aula atual usa o controle de 4 a 12 em incrementos de 4, portanto a falha fracionária não é acionada ali. Um teste de integração deve cobrir a regra sobre `m` e a regra sobre `eh_mmc`. [Composição das métricas](../../src/steps/InteractiveCanvas.tsx#L26) · [Validação do MMC](../../src/widgets/common/grupos/calc.ts#L122)

2. **Média · O chip de valor pode revelar a resposta quando a notação está oculta.** Com `{ modo: "potencia", a: 2, n: -3, mostrar_notacao: false }`, o valor é 0,002. Como o formato de duas casas devolve «0», a B44b exibe «N = 2·10⁻³». Isso mostra a expressão que um desafio de notação pode pedir ao aluno. O valor precisa de formatação decimal com precisão suficiente nessa modalidade. O desafio atual usa 200 e continua com «N = 200». [Formatação do chip](../../src/widgets/common/escala/desenho.ts#L131) · [Captura do caso](../../../capturas-b45r/escala-expoente-oculto.png)

3. **Média · O chip de `N` pode cobrir o expoente embora caiba no canvas.** Com `{ modo: "potencia", a: 1.234567891, n: 20 }`, o Chrome mediu, num canvas de 364 px, `c2` em x = 149,2–214,8 e `c3` em x = 177,8–359,0. Os dois chips se sobrepõem em 37,0 px e a captura mostra o valor de `n` encoberto. O teste de x verifica o contorno do canvas com `a = 2`. O encaixe também precisa considerar o espaço entre os chips. [Posicionamento do chip](../../src/widgets/common/escala/desenho.ts#L131) · [Captura do caso](../../../capturas-b45r/escala-chips-extremos.png)

4. **Baixa · O espaçamento da régua pode retirar a graduação ativa.** Com `{ modo: "potencia", a: 2, n: 2, faixa_n: [-6, 6], n_ref: 0 }`, a régua marca −6, −4, −3, −1, 1, 3, 4 e 6. Os pontos ativo e de referência e os rótulos acima da linha aparecem, porém as graduações de 2 e 0 que existiam antes somem. A cobertura de `n = ±20` só testa expoentes ativos nos extremos. Para faixas largas, a seleção pode reservar os extremos e as graduações dos pontos usados na atividade e preencher os lugares restantes com as demais marcas. [Amostragem da régua](../../src/widgets/common/escala/desenho.ts#L180) · [Captura do caso](../../../capturas-b45r/escala-regua-interna.png)

## Casos da B44b reproduzidos

| Widget | Resultado da revisão |
| --- | --- |
| Escala | Em `a = 2` e `n = ±20`, a régua passa de 23 para 8 marcas, mantém os extremos e o chip de `N` cabe. O quadro de ordens mostra até nove colunas e reticências, com o algarismo significativo visível nos dois testes. |
| Grupos | Num canvas de 364 × 262, os casos 200 ÷ 200, 200 ÷ 7 e 120 ÷ 1 mostram respectivamente 119, 32 e 36 fichas. As 81, 168 e 84 omitidas batem com as legendas. Os três desenhos ficam dentro da área reservada. Em 200 ÷ 7, as quatro fichas de sobra continuam em um quadro próprio. Para `a = 4` e `b = 6`, `eh_mmc` é 0, 1 e 0 para os totais 8, 12 e 24. |
| Divisão | Com quatro coeficientes de oito algarismos, a captura em canvas de 364 px confirma que o dividendo fica à esquerda da chave e a identidade cabe no rodapé. O Chrome recebe limites de 176 e 348 px para essas linhas. A compressão deixa as expressões mais longas difíceis de ler em 400 px, em especial a identidade. [Captura do caso](../../../capturas-b45r/divisao-coeficientes-longos.png) |
| Grade | No p5 de probabilidade, a grade passou de 2 × 10 para 4 × 5. Os números de 1 a 20 permanecem em ordem. As cores dos múltiplos, as listras em 10 e 20 e o contador continuam visíveis. O enunciado, as alternativas e o botão permanecem nas mesmas posições. [Antes](../../../capturas-b44b/antes/probabilidade-uniao-e-intersecao-p5.png) · [Depois](../../../capturas-b45r/probabilidade-uniao-e-intersecao-p5.png) |

## Capturas das aulas atuais

Foram abertas as 18 imagens de 400 × 860 px. Elas foram geradas com uma cópia temporária de `scripts/captura-aula.mjs` fora do repositório, com `--no-sandbox` para iniciar o Chrome no ambiente, movimento reduzido e espera pela presença do canvas. Os PNGs ficam em `C:/Users/mkf10/projetos/capturas-b45r`.

| Aula | Passos capturados | Conferência |
| --- | --- | --- |
| Notação científica e ordem de grandeza | 1 a 5 | Quadro, régua, chips e controles legíveis no estado inicial. O desafio mantém «N = 200». [p1](../../../capturas-b45r/notacao-cientifica-e-ordem-grandeza-p1.png) · [p4](../../../capturas-b45r/notacao-cientifica-e-ordem-grandeza-p4.png) |
| Sistemas numéricos e divisibilidade | 1 a 6 | Grupos, trilhas do MMC, árvore e fechamento cabem no palco. [p2](../../../capturas-b45r/sistemas-numericos-e-divisibilidade-p2.png) · [p3](../../../capturas-b45r/sistemas-numericos-e-divisibilidade-p3.png) · [p4](../../../capturas-b45r/sistemas-numericos-e-divisibilidade-p4.png) |
| Divisão polinomial e teorema do resto | 1 a 6 | Gráfico, quadro algébrico e chave legíveis no estado inicial. [p1](../../../capturas-b45r/divisao-polinomial-e-teorema-do-resto-p1.png) · [p3](../../../capturas-b45r/divisao-polinomial-e-teorema-do-resto-p3.png) |
| Probabilidade de união e interseção | 5 | A grade 4 × 5 deixa o contador e todas as casas visíveis. [p5](../../../capturas-b45r/probabilidade-uniao-e-intersecao-p5.png) |

A comparação do texto, das posições, das fichas e das áreas de toque antes e depois também cobriu os valores configurados de slider, figuras de resposta e destaques do fechamento. Foram comparados 20 estados de escala, 22 de grupos e 7 de divisão. Em quatro estados da divisão, o texto de `notaQueCabe` para `ink` passou de `#4B4B4B` a `#1B1B1B`. A geometria e o texto permaneceram iguais nos estados comparados. [Cor usada na divisão](../../src/widgets/common/divisao/desenho.ts#L45)

`npm run typecheck`, os 136 testes focados e a suíte completa do Vitest (2.130 testes em 132 arquivos) passaram. `npm run lint:content` passou com um preload temporário para contornar a falha de `os.userInfo()` neste ambiente Windows.

## Correções B46

| Achado | Reprodução antes da correção | Correção e verificação |
| --- | --- | --- |
| Notação oculta | O teste com `a = 2`, `n = −3` e `mostrar_notacao: false` recebia «N = 2·10⁻³». | O chip usa representação decimal nessa modalidade. O teste passou com «N = 0,002». |
| Sobreposição do chip de `N` | Com `a = 1,234567891` e `n = 20`, o alvo de `N` avançava sobre o alvo do expoente. | O cabeçalho mede as etiquetas, preserva as posições que cabem e redistribui as demais com espaço entre elas. O teste passou com os alvos separados e dentro do canvas. |
| Graduações da régua | O teste com faixa `[−6, 6]`, `n = 2` e `n_ref = 0` encontrava oito marcas, mas deixava 0 e 2 de fora. | A régua mantém as graduações obrigatórias e preenche as maiores lacunas até oito marcas. O teste passou com −6, 0, 2 e 6 entre oito posições distintas. |
| Conclusão de MMC | O teste do `InteractiveCanvas` e o Chrome reproduziram o botão Continuar habilitado com `m = 11,5` e `gte: 11`. Com `eh_mmc`, o caso fracionário já ficava bloqueado. | No modo MMC, o passo calcula as métricas com a mesma função do widget e os parâmetros e controles atuais. Essas métricas prevalecem sobre controles com o mesmo nome. Assim, `NaN` bloqueia a conclusão mesmo antes de o widget emitir métricas para a nova posição do slider. |

Os três testes de escala falharam contra uma cópia temporária do desenho no `HEAD` e passaram com a correção. A comparação do desenho e dos alvos a 364 px de canvas preservou os 20 estados da aula de notação científica.

O teste de regressão em `src/widgets/common/grupos/grupos-conclusao.test.tsx` falhou antes da correção com `m = 11,5` e passou depois. No Chrome, esse total ficou bloqueado pelas regras sobre `m`, `eh_mmc` e `resto`. O total 12 concluiu pelas três regras e 24 ficou bloqueado pela regra sobre `eh_mmc`. No passo atual de divisibilidade, 4 e 8 mantiveram Continuar bloqueado, 12 o liberou e voltar a 8 preservou a conclusão. A composição de métricas dos outros widgets e modos preserva a precedência anterior.

O typecheck, os 38 testes focados de grupos e escala e os 2.154 testes da suíte completa passaram. O lint de conteúdo passou com um preload temporário para contornar a falha de `os.userInfo()` no Windows.

A varredura completa com `node scripts/varre-aulas.mjs 5246` verificou 104 aulas, 560 passos e 104 treinos. Todos os treinos abriram e houve zero problemas. O relatório gerado pela varredura ficou em uma pasta temporária para preservar o arquivo da revisão visual no repositório.

### B46b

O registro aceita uma função pura opcional `metricas(params, controls)`. O `InteractiveCanvas` usa essa função durante a renderização, com os parâmetros efetivos do passo. As métricas calculadas prevalecem sobre controles de mesmo nome. Widgets sem a função continuam emitindo métricas por `onMetric`, com a mesma precedência de antes.

Grupos, escala, divisão polinomial e sistema escalonado delegam às funções de cálculo existentes. O registro valida os parâmetros com os schemas existentes e preserva o tratamento de valores não finitos de cada widget. O teste de grupos usa o registro real. O teste do passo com um widget falso cobre a precedência nos dois sentidos e o caso sem função.

A comparação dos 31 estados de controle nos 11 passos afetados confirmou os mesmos resultados de conclusão. A suíte completa passou com 2.186 testes em 137 arquivos. O typecheck e o lint de conteúdo passaram.

**Estado na parada da B46b.** Refatoração genérica e testes gravados nos arquivos do registro, em `src/steps/InteractiveCanvas.tsx`, `src/steps/InteractiveCanvas.test.tsx` e no teste de conclusão de grupos. A varredura final informou 104 aulas, 560 passos e 104 treinos abertos, com zero problemas. A execução foi interrompida no encerramento, após um aviso sobre a limpeza do perfil temporário do Chrome. Nenhuma correção técnica está pendente. O marcador `PRONTO B46b` ficou pendente devido ao pedido de parada.

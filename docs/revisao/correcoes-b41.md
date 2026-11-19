# Correções B41: feedbacks e enunciados do vestibular (aritmética e álgebra), 19/11

Agente: Claude Code #2. Entrada: `docs/revisao/auditoria-vestibular-b36-algebra.md` (Codex, completa) e `docs/revisao/auditoria-vestibular-b36.md` (Codex #2, aritmética, parcial). Cada achado foi refeito à mão contra o original: cache `enem-cache/matematica.json` por ano e número, e as imagens em `public/vestibular/` para matrizes e tabelas. Só mudei `feedback`, `prompt` e `fala` em `treino.vestibular`. Não mexi em ids, ordem, `correct`, imagens nem `fonte`.

## Critério 3 descartado

O critério 3 da B36 ("com 3 ou mais alternativas, o feedback de errada não dá o valor certo") **foi descartado em 19/11 pelo maestro**. Ele vale para os desafios da aula (`micro_challenge`), que têm segunda tentativa; o vestibular fica no treino. No treino:
- o GUIA §2, regra 1, manda o feedback de **toda** opção errada dizer a resposta certa (o checklist do GUIA, linha 364, repete);
- a interface pinta de verde a alternativa certa logo depois do erro (`src/treino/Treino.tsx`, função `estado`, e o comentário "errou, vê a resposta certa").

Por isso **não mexi** nos achados que eram só "Revela o gabarito": 130 em álgebra. Os feedbacks continuam terminando com a resposta certa. Valem os critérios 1 (alternativa `correct` = gabarito), 2 (o feedback descreve um erro que leva exatamente àquele valor) e 4 (o enunciado resumido preserva os dados).

Regra que segui no critério 2: se existe um erro plausível que dá **exatamente** o valor da alternativa, o feedback passa a descrevê-lo. Se não existe (distrator sem caminho de erro), um teste numérico correto daquele valor é o diagnóstico honesto, e o achado é recusado quando o teste atual já está certo.

## Álgebra

Critério 1: nas 33 questões, a alternativa `correct` é a do gabarito. Conferi:
- 30 pelo `correctAlternative` do cache, mais a conta;
- ENEM 2014 PPL/159 pela transcrição em plataformaassaad.com.br (a URL da `fonte`): gabarito E = 0,13;
- Cefet-MG 2015/18 e Unicamp 2016 só pela conta (18 e 2), sem o caderno original.

2011/180 tem defeito no **cache**, não na aula: as duas entradas omitem a opção 0 e dão D = 5. A conta (LT = 3q − 12 ≥ 0 ⇒ q ≥ 4) confirma o 4 marcado na aula.

### Corrigidos (33 textos em 20 questões: 26 feedbacks, 6 enunciados, 1 fala)

| aula | questão | alternativa | achado da B36 procede? | antes → depois | conta |
|---|---|---|---|---|---|
| equacoes-primeiro-grau | ENEM 2011/159 | E · 350(n + 100 000) = 150(n + 120 000) | sim (crit. 2) | "Inverteu taxa fixa com preço por km…" → "Pôs os fixos (350 e 150) multiplicando e somou a n o preço por km em reais. O certo é 100n + 350 = 120n + 150." | Trocar fixo com preço por km daria 350n + 100 = 150n + 120, não E. Em E o fixo multiplica e o preço por km entra em reais dentro do parêntese |
| equacoes-primeiro-grau | ENEM 2010/169 | E · 8,0 m e 9,0 m | sim (crit. 2) | teste "Com x ≥ 8, os saltos somam ≥ 20,1" → "Tomou a média 5,8 como o 3º salto e somou 2,7: 8,5 m. Mas 3x − 3,9 = 17,4 dá x = 7,1 m (entre 7,0 m e 8,0 m)." | 17,4/3 = 5,8; 5,8 + 1,2 + 1,5 = 8,5 ∈ [8; 9] |
| inequacoes-exponenciais-logaritmicas | ENEM 2017/137 | enunciado | sim (crit. 4 e conta) | "Com prestação P(n)≤400 pela fórmula, log 1,013≈0,005, …, qual o menor número de parcelas n?" → "Use log 1,013 ≈ 0,005, log 400 ≈ 2,602 e log 335 ≈ 2,525: com essas aproximações, qual o menor n com P(n) ≤ 400 pela fórmula?" | P ≤ 400 ⇔ 335 · 1,013ⁿ ≥ 400. Com as aproximações: n ≥ 0,077/0,005 = 15,4 ⇒ 16 (gabarito D). Sem elas: n ≥ log(400/335)/log 1,013 = 13,7 ⇒ 14; P(14) = 392,94 (ver destaque) |
| inequacoes-exponenciais-logaritmicas | ENEM 2017/137 | B · 14 | sim (conta) | "14 ainda fica abaixo de 15,4…" → "Com as aproximações dadas, 14 · 0,005 = 0,070 < 0,077: não basta. De 0,005n ≥ 0,077 vem n ≥ 15,4, logo n = 16." | 14 · 0,005 = 0,070 |
| inequacoes-exponenciais-logaritmicas | ENEM 2017/137 | C · 15 | sim (afirmação falsa) | "15 é menor que 15,4, **então P ainda passa de 400**…" → "15 trunca 15,4: com as aproximações, 15 · 0,005 = 0,075 ainda é menor que 0,077. O menor inteiro com n ≥ 15,4 é 16." | Pela fórmula exata, P(15) = 369,04 < 400: a frase antiga era falsa |
| inequacoes-primeiro-grau | ENEM 2011/180 | C · 3 | sim (crit. 2) | teste "LT(3) = −3" → "3 é a margem por unidade (5 − 2), não a quantidade: com q = 3, LT = −3. De 3q − 12 ≥ 0 vem q ≥ 4." | 5 − 2 = 3 |
| inequacoes-primeiro-grau | ENEM 2011/180 | E · 5 | sim (crit. 2) | "Com q = 5 o lucro já é 3, mas 4 já zera…" → "5 exige lucro positivo (3q − 12 > 0). Não ter prejuízo admite lucro zero: 3q − 12 ≥ 0 dá q ≥ 4." | 3q − 12 > 0 ⇒ q > 4 ⇒ 5 |
| inequacoes-primeiro-grau | ENEM 2021/173 | A · 6 | sim (crit. 2) | teste "6·35 = 210 < 300" → "6 é 300 ÷ 55 ≈ 5,5 arredondado: somou os dois preços como uma lavagem só. Só completas: 35n ≥ 300 dá n ≥ 8,57, logo 9." | 300/55 = 5,45 ⇒ 6 |
| inequacoes-primeiro-grau | ENEM 2010/155 | A · 476 | sim (crit. 2) | "Só os 500 folhetos do 2º tipo já usam 500 selos…" → "476 = 1.000 ÷ 2,10 supõe o mesmo número de folhetos dos dois tipos. São 500 do 2º; a sobra de 275 compra 423: 923." | 1.000/(0,65 + 1,45) = 476,19 |
| inequacoes-primeiro-grau | ENEM 2010/155 | C · 923 (correta) | sim (conta) | "275/0,65 = 423 extras" → "275/0,65 ≈ 423,1, ou seja, 423 extras" | 275/0,65 = 423,08; 423 · 0,65 = 274,95 |
| funcao-afim | ENEM 2014 PPL/159 | enunciado | sim (crit. 4) | "…Em 6 km, qual a diferença entre os custos médios por km?" → "Táxi A: R$ 3,45 + R$ 2,05/km; táxi B: R$ 3,60 + R$ 1,90/km. Em 6 km, que valor mais se aproxima da diferença dos custos médios por km?" | O original pede o valor que "mais se aproxima"; a diferença exata é 0,125, que não está entre as opções |
| funcao-afim | ENEM 2014 PPL/159 | B · 0,45 | sim (crit. 2, feedback genérico) | "Os custos médios são 2,625 e 2,50…" → "0,45 por km daria 6 · 0,45 = 2,70 entre as corridas, mas elas diferem 15,75 − 15,00 = 0,75. Por km: 0,75 ÷ 6 ≈ 0,13." | 3,45 + 12,30 = 15,75; 3,60 + 11,40 = 15,00 |
| funcao-afim | ENEM 2014 PPL/159 | C · 0,38 | sim (crit. 2) | "Confira os totais…" → "0,38 ≈ 0,75 ÷ 2: dividiu a diferença pelos dois táxis, não pelos 6 km. Por km: 0,75 ÷ 6 = 0,125 ≈ 0,13." | 0,75/2 = 0,375 ≈ 0,38 |
| funcao-afim | ENEM 2014 PPL/159 | D · 0,33 | sim (crit. 2, genérico) | "A diferença por km é…" → "0,33 por km daria 6 · 0,33 = 1,98 entre as corridas, mas elas diferem 0,75. Por km: 0,75 ÷ 6 = 0,125 ≈ 0,13." | 6 · 0,33 = 1,98 |
| funcao-afim | Cefet-MG 2015/18 | A · 14 | sim (genérico) | "As 10 corridas pagam 50…" → "Com média 14, seriam 10 · 5 + 2 · 140 = 330 reais, não 410. Tirando os 50 fixos: 360 ÷ 2 = 180 km, 18 por corrida." | 50 + 280 = 330 |
| funcao-afim | Cefet-MG 2015/18 | B · 16 | sim (genérico) | "Tire os 10 × 5 = 50 fixos…" → "Com média 16, seriam 10 · 5 + 2 · 160 = 370 reais, não 410. Tirando os 50 fixos: …" | 50 + 320 = 370 |
| funcao-afim | ENEM 2012/166 | C · 13 | sim (crit. 2) | teste "oferta 32, demanda 20" → "13 vem de 4P − 2P = 46 − 20: os termos mudaram de lado sem trocar o sinal. Certo: 6P = 66, P = 11." | 2P = 26 ⇒ 13 |
| funcao-afim | ENEM 2012/166 | D · 23 | sim (genérico) | "Igualando … P = 11" → "23 zera só a demanda (46 − 2 · 23 = 0), e a oferta seria 72. Igualando −20 + 4P = 46 − 2P: 6P = 66, P = 11." | −20 + 92 = 72 |
| funcao-afim | Unicamp 2016 | A · 5 | sim (genérico) | "Não precisa achar a e b…" → "5 é só um dos números dentro de f. Como f(3) + f(5) = 8a + 2b = 2 · f(4) = 4, a resposta é f(4) = 2." | f(3) + f(5) = 8a + 2b = 2(4a + b) |
| funcao-afim | Unicamp 2016 | C · 3 | sim (genérico) | "f(3) + f(5) = … Então a resposta é f(4) = 2." → "3 também é só um argumento. Primeiro some f(3) + f(5) = 2 · f(4) = 4; depois aplique f: f(4) = 2." | idem |
| funcao-definida-por-partes | ENEM 2023/158 | enunciado | sim (crit. 4) | "…Quantos n dão lucro ≥ R$ 800?" → "Peixe a R$ 5/kg: 1 ajudante dá 300 kg e cada extra +100 kg; custo R$ 900 + 250n + 4% da venda. Menor n (até 5) com lucro ≥ R$ 800?" | L = 0,96 · 5(200 + 100n) − 900 − 250n = 60 + 230n: 290, 520, 750, 980, 1.210. Sem "menor", 4 e 5 servem; o original diz "até 5 ajudantes" e "quantidade mínima" |
| funcao-exponencial | ENEM 2023/159 | enunciado | sim (crit. 4) | "…Com 5 L de produto (1 L por 200 000 larvas), em quantos dias aplicar?" → "100 larvas multiplicam-se por 10 a cada 3 dias. Os 5 L de produto (1 L por 200 000 larvas) vão de uma vez, na dose exata: em quantos dias?" | O original exige aplicar tudo de uma vez, na dose exata: 5 · 200 000 = 10⁶ = 100 · 10^(t/3) ⇒ t = 12. Sem isso, 2, 4 ou 6 dias também "cabem" nos 5 L |
| funcao-quadratica | ENEM 2022/150 | enunciado e fala | sim (crit. 4) | "Saque a 1,5 m do piso segue y = …" → "Na parábola y = −x²/6 − 7x/3 + 12, y é medido de um eixo 1,5 m acima do piso. Tetos: …"; fala "…some os 1,5 m da altura inicial em relação ao piso" → "…some os 1,5 m entre o eixo e o piso." | O original mede y a partir de um eixo 1,5 m acima do piso. y_v = 121/6 ≈ 20,17; + 1,5 = 21,67 > 21 (IV) e < 40 (V) |
| introducao-a-funcoes | ENEM 2011/156 | enunciado | sim (crit. 4) | "…o varejo somou 880.605 vagas após aumento de 4.300…" → "Em fevereiro (x = 2), o varejo tinha 880.605 trabalhadores, 4.300 a mais que em janeiro (x = 1). Qual função dá os trabalhadores y?" | No original, 880.605 são trabalhadores com carteira e 4.300 é o incremento de vagas; y conta trabalhadores |
| sistemas-lineares-e-escalonamento | ENEM 2023/175 | A · 4,68 | sim (crit. 2) | teste "R$ 0,52 por tíquete" → "4,68 vem de ler cinco centavos como 0,50: 5v + 1 = 3,60 dá v = 0,52. Com 0,05: 5v = 3,50, v = 0,70 e 9v = 6,30." | a = 2v + 0,50 ⇒ 2a + v = 5v + 1; 9 · 0,52 = 4,68 |
| sistemas-lineares-e-escalonamento | ENEM 2023/175 | E · 10,65 | sim (crit. 2) | teste "v ≈ 1,18 …" → "10,65 vem de trocar as cartelas (a + 2v = 3,60) e usar a = v + 0,05: 3v = 3,55. Com 2a + v e a = 2v + 0,05 sai 6,30." | 3v = 3,55 ⇒ v = 1,1833; 9v = 10,65 |
| sistemas-lineares-e-escalonamento | ENEM 2018/178 | B · 42 | sim (vago) | "42 daria B = 210, que não fecha o sistema…" → "Com x = 42, B = 210 e 4x − y = 158 dá y = 10; mas as vendas seriam 42 + 90 + 30 = 162. O sistema dá x = 48." | 168 − y = 158 ⇒ y = 10 |
| sequencias-pa-pg | ENEM 2018/141 | A · R$ 512 000 | sim (crit. 2) | "512 000 usa 64 postes em vez de 66…" → "512 000 usa 64 postes: contou só os de dentro dos 65 intervalos. Com as duas pontas são 66: R$ 528 000,00." | (1.380 − 80)/20 = 65 intervalos; 65 − 1 = 64; 64 · 8.000 = 512.000 |
| sequencias-pa-pg | ENEM 2019/155 | A · Rolamento | sim (crit. 2) | teste de posição → "Usou bloco de 5 (códigos 1 a 5): 2 015 = 5 · 403 cai no 5º termo, 1. O bloco tem 8: 2 015 = 8 · 251 + 7, termo 3, Caixa de direção." | 5 · 403 = 2.015; 5º termo de (5, 4, 3, 2, 1) é 1 |
| sequencias-pa-pg | ENEM 2019/155 | B · Catalisador | sim (crit. 2) | teste de posição → "Arredondou 2 015 ÷ 8 ≈ 251,9 para 252 blocos e caiu no último termo, 4. São 251 blocos e resto 7: termo 3, Caixa de direção." | 2.015/8 = 251,875; último termo do bloco = 4 |
| sequencias-recursivas-e-padroes | ENEM 2013/173 | D · 35 | sim (afirmação errada) | "35 corresponde a **mais de** 374 anos após 1755" → "O ciclo 35 só começa em 1755 + 34 · 11 = 2129, depois de 2101. De 346 = 31 · 11 + 5 vem o 32º ciclo." | 34 · 11 = 374: o ciclo 35 começa exatamente 374 anos depois |
| somatorios-pa-pg | ENEM 2018/162 | B | sim (termo errado) | "Falta o + 1 da partida final entre os 2 **semifinalistas**" → "Para nos 2 finalistas: falta o + 1 da partida final. O certo é 64 + 32 + 16 + 8 + 4 + 2 + 1." | 4 semifinalistas jogam 2 partidas; os 2 finalistas jogam 1 |

> **Destaque para o maestro, ENEM 2017/137 (alternativa correta mantida):** o gabarito oficial (D = 16) só sai com as aproximações de log que a prova fornece. Pela fórmula exata, P(14) = 392,94 ≤ 400 e o mínimo seria 14 (alternativa B). Não troquei `correct`. O enunciado da aula agora manda usar as aproximações, e os feedbacks de 14 e 15 falam só nelas (o de 15 dizia algo falso). Se preferir, a questão pode sair do treino.

### Recusados (o achado não procede pelos critérios 1, 2 ou 4)

| aula | questão | alternativas | motivo |
|---|---|---|---|
| equacoes-primeiro-grau | ENEM 2009/151 | A 14, B 17, C 22, E 57 | Nenhum erro plausível dá exatamente esses valores (5c + 350 = 510 ⇒ 32). O teste numérico atual está certo: 70 + 350 = 420, 85 + 350 = 435, 110 + 350 = 460, 285 + 350 = 635 |
| inequacoes-exponenciais-logaritmicas | ENEM 2017/137 | A 12, E 17 | A: P(12) = 452,8 > 400, como diz o texto. E: o texto já nomeia o erro (17 serve, mas não é o menor) |
| inequacoes-primeiro-grau | ENEM 2011/180 | A 0, B 1 | A: o texto nomeia o erro (esquecer o custo fixo: LT(0) = −12). B: sem caminho de erro; o teste LT(1) = 5 − 14 = −9 está certo |
| inequacoes-primeiro-grau | ENEM 2022/163 | C 22,0, E 37,5 | Sem caminho de erro exato. Testes certos: 600.000 + 480.000 · 1,22 = 1.185.600 ≤ 1.224.000; 600.000 + 480.000 · 1,375 = 1.260.000 > 1.224.000 |
| inequacoes-primeiro-grau | ENEM 2010/155 | D 965 | Sem caminho de erro exato. Teste certo: 965 · 0,65 + 500 · 0,80 = 627,25 + 400 = 1.027,25 > 1.000 |
| funcao-afim | Cefet-MG 2015/18 | D 20 | O texto já diz o erro (ignorar a parte fixa) e "perto de 20" é honesto: 410/10/2 = 20,5 |
| funcao-afim | ENEM 2012/166 | A 5 | O texto já mostra que 5 zera só a oferta (oferta 0, demanda 36) |
| funcao-definida-por-partes | ENEM 2023/158 | A 1, B 2, C 3, E 5 | 1 a 3 não atingem a meta: lucros 290, 520 e 750 conferem com 60 + 230n. E: o texto diz o erro (5 serve, mas 4 é o mínimo). O defeito real era o enunciado (corrigido acima) |
| funcao-quadratica | ENEM 2022/150 | A, B, E | Sem caminho de erro exato; as comparações com 21,67 m estão certas. O defeito real era o enunciado (corrigido acima) |
| matrizes-determinantes-sistemas | ENEM 2019/144 | D, E | São somas de coluna corretas, conferidas na imagem: quinta 1 + 1 + 3 + 1 + 4 = 10, sexta 2 + 2 + 2 + 0 + 4 = 10, segunda 11 |
| matrizes-determinantes-sistemas | ENEM 2021/157 | D 4 | Coluna 4 = 2 + 2 + 3 + 0 + 4 = 11 e coluna 5 = 12, conferidas na imagem |
| matrizes-determinantes-sistemas | ENEM 2021/164 | A 22, C 26, D 33, E 39 | Tabela conferida: I = (12, 4, 3) e II = (18, 3, 2), logo 6t = p + s e o máximo é 24. Nenhum erro dá exatamente 22, 26, 33 ou 39; "abaixo/passa dos 10 kg" está certo |
| sistemas-lineares-e-escalonamento | ENEM 2022/146 | A 10 | O teste "10 voltas no maior dão 4.000 m" está certo e não há erro exato |
| sistemas-lineares-e-escalonamento | ENEM 2018/178 | C 47 | O teste está certo: 4 · 47 − y = 158 ⇒ y = 30 e 4x − 3y = 98 ≠ 90 |
| sequencias-pa-pg | ENEM 2019/155 | C Amortecedor, D Pastilha | Sem um erro único que leve a eles; a posição citada no texto (1ª; 4ª/6ª do bloco) está certa |
| inequacoes-primeiro-grau | ENEM 2011/180 | D (cache) | Defeito do cache (opção 0 omitida, D = 5), não da aula; a aula está certa (q = 4) |

### Totais de álgebra

- Conferidas por mim: **33 questões e 163 alternativas** (contas refeitas; o `correct` confere com o gabarito nas 33).
- Achados da B36 em álgebra: **140 linhas**.
  - **130** têm "Revela o gabarito" (critério 3, descartado). Destas, **75** são só isso e ficaram como estão.
  - As outras **55** também dizem "o texto não reconstrói o erro" (critério 2): **24 procedem** (feedback reescrito) e **31 não procedem** (tabela de recusados).
  - **10** são de outro tipo: 6 enunciados (2017/137, 2014 PPL/159, 2023/158, 2023/159, 2022/150, 2011/156), 3 de conta ou termo (2010/155 C, 2013/173 D, 2018/162 B) e 1 do cache (2011/180). **9 procedem**; o do cache não pede mudança na aula.
- Mudanças: **33 textos em 20 questões e 12 aulas**: 26 feedbacks (24 do critério 2, mais 2010/155 C e 2018/162 B), 6 enunciados e 1 fala. O 2013/173 D está nas duas listas e conta uma vez.
- Recusados: **31 alternativas**, na tabela acima.
- Validação: `npm run lint:content` ok; `npx vitest run` dos 12 capítulos alterados, todos passando (10, 18, 19, 8, 10, 9, 9, 10, 11, 10, 10, 10 testes).

## Aritmética

Como o relatório do Codex #2 era parcial (ele mesmo diz que "a comparação integral dos quatro critérios em todas as 59 permanece incompleta" e que nem todas as contas das erradas estão feitas), **auditei as 59 questões e as 295 alternativas do zero**, pelos critérios 1, 2 e 4.

Critério 1: em todas as 59 a alternativa `correct` confere com a conta. Contra o original, conferi 52:
- 47 pelo cache, por ano e número da `fonte`;
- 5 identificadas pelo texto, também no cache: 2012/144 ("enem-2025-respostas"), 2022/142 ("enem-2025-montadora"), 2020/141 ("enem-2025-placas-do-2"), 2019/173 ("enem-2025-declaracoes") e 2013/150 ("enem-2013-idiomas", sem número na `fonte`).

As imagens de 2018/145, 2021/151 e 2023/140 foram abertas e conferem com os feedbacks:
- 2018/145: 50, 17, 15, 10, 6 e 2 trabalhadores, 111 acidentes;
- 2021/151: acumulado 5, 15, 20, 35, 55, 70, 85 de 105;
- 2023/140: moda 3, mediana 4, média 665/160.

Sete não têm original local (UEG 2005, ENEM 2019 PPL das chaves, ENEM 2021 PPL das máquinas, ENEM 2017 da chuva, ENEM 2020 digital do GOL, UFT 2013 e EsSA 2012). Nelas conferi só a conta: o gabarito marcado sai dos dados do enunciado.

### Corrigidos (45 textos em 28 questões e 14 aulas: 40 feedbacks e 5 enunciados)

| aula | questão | alternativa | origem / procede? | antes → depois (resumo) | conta |
|---|---|---|---|---|---|
| fracoes-e-decimais | ENEM 2022/164 | 4,800 | B36, sim | "esquece as 24 horas" → a conta inteira | 60 · 60 = 3.600 min; 3.600/48 = 75 jatos; 360/75 = 4,8 |
| fracoes-e-decimais | ENEM 2021/178 | 1 600 000 | minha, sim (vago) | "erra os 50 lotes" → "paga só 40 lotes a R$ 30 mil (60 no total)" | 400.000 + 40 · 30.000 = 1.600.000 |
| sistemas-numericos-e-divisibilidade | ENEM 2009/156 | 9 e 1 | B36, sim | texto confuso → "põe d₂ = 9 na frente e, no lugar de d₁ = 0, escreve o resto r = 1" | S₁ = 210 = 19 · 11 + 1; S₂ = 244 = 22 · 11 + 2 |
| arranjos-e-combinacoes | UEG 2005 | 128 | minha, sim | "128 é 2⁷" → "2⁸ ÷ 2: cada matéria a um dia, sem exigir 4 por dia, e divide pela troca de dias" | 256/2 = 128 |
| arranjos-e-combinacoes | ENEM 2019/156 | 69 | minha, sim (atribuía erro inexistente) | "erra a contagem das duplas restantes" → "não sai da contagem por etapas…" | 6 · 5 · 3 = 90; 105 − 15 = 90 |
| eventos-independentes | ENEM 2019/159 | 99 | minha, sim (vago) | "trata como linear" → "passa de 99%, mas não é o mínimo" | (1/2)⁷ = 1/128 < 1/100 |
| eventos-independentes | ENEM 2019/159 | 51 | B36, sim | "supõe que as chances se somam" (51 · 1/2 ≠ 99%) → "também passa, mas sobra placa" | idem |
| fatorial-e-permutacoes | ENEM 2011/174 | enunciado | minha, sim (crit. 4) | "senhas de 5 dígitos em ordem crescente" (lê-se como algarismos crescentes) → "números de 5 algarismos, listados em ordem crescente" | 3 · 4! + 2 · 3! + 2 · 2! = 88 antes; posição 89 |
| fatorial-e-permutacoes | ENEM 2012/144 | enunciado | B36, sim (crit. 4) | "1 **cômico** (de 9)", "cada aluno escolhe" → "280 alunos dão respostas distintas: … 1 **cômodo** (de 9)" | 5 · 6 · 9 = 270; 280 − 270 = 10 |
| principio-fundamental-da-contagem | ENEM 2019 PPL | 12 | minha, sim (texto dizia "soma", que dá 8) | → "12 = 4 · 3 conta pares ordenados de chaves" | 2⁴ = 16 |
| principio-fundamental-da-contagem | ENEM 2012/144 (registrada 2025) | 20 | minha, sim (genérico) | → "20 = 5 + 6 + 9 soma as opções" | |
| principio-fundamental-da-contagem | idem | 119 | minha, sim ("parece vir de somas parciais") | → "119 a mais exigiria só 161 respostas" | 280 − 119 = 161 |
| principio-fundamental-da-contagem | ENEM 2020/141 (registrada 2025) | 157 | minha, sim (atribuía erro que dá 138, não 157) | "Não desconte repetições" → contagem por casa | 100 + 30 + 30 = 160; quartos com algum 2 = 138 |
| probabilidade-condicional | ENEM 2013/150 | 5/8 | B36, sim | → "supõe que ninguém fala os dois idiomas: 500 em 500 + 300 = 800" | 600 + 500 − 900 = 200 falam os dois |
| probabilidade-condicional | ENEM 2013/150 | 5/14 | minha, sim (genérico) | → "500/1 400 divide pela soma 600 + 500 + 300" | |
| probabilidade-condicional | ENEM 2019/173 (registrada 2025) | 0,1125 | minha, sim (genérico) | → "0,05 + 0,0625 não pesa a taxa das demais por 0,80" | 0,8 · 0,0625 = 0,05 |
| probabilidade-condicional | ENEM 2021 PPL | 15,6% | minha, sim (genérico) | → "0,005 ÷ 0,032 é a parte de M1" | 0,25 · 0,02 = 0,005; 0,005/0,032 = 15,6% |
| probabilidade-condicional | ENEM 2021 PPL | 43,7% | minha, sim (genérico) | → "(0,005 + 0,009) ÷ 0,032 junta M1 e M2" | 0,014/0,032 = 43,75% |
| probabilidade-condicional | ENEM 2021 PPL | 56,2% | minha, sim (genérico) | → "0,018 ÷ 0,032 é a parte de M3" | 0,45 · 0,04 = 0,018 |
| probabilidade-condicional | ENEM 2017 (chuva) | 0,075 | B36, sim | "Faltou o caminho com chuva" (daria 0,175) → "0,3 · 0,25 cruza a chance de chuva com o atraso sem chuva" | 0,3 · 0,25 = 0,075 |
| probabilidade-condicional | ENEM 2017 (chuva) | 0,600 | B36, sim | "Não se somam 0,5 e 0,25" (daria 0,75) → "não pesa os caminhos pela chance de chuva" + conta | 0,15 + 0,175 = 0,325 |
| probabilidade-uniao-e-intersecao | ENEM 2020 digital | 20 | minha, sim ("desconta demais") | → "25 − 5 tira os comuns e esquece os 10 terminados em 4" | 25 + 10 − 5 = 30 |
| medidas-de-dispersao | ENEM 2021/146 | 9,5 | minha, sim (vago) | → "10 − 0,5 desconta da média o aumento do desvio" | 1,5/X < 0,1 ⇒ X > 15 |
| medidas-de-tendencia-central | UFT 2013 | 1,46 | minha, sim (genérico) | → teste: "somariam 21,9 m e o grupo 55,9 m, não 57,75 m" | 15 · 1,46 = 21,9 |
| medidas-de-tendencia-central | UFT 2013 | 1,55 | minha, sim ("não por 20 ou 35" dá 1,19 e 0,68) | → teste: 23,25 e 57,25 | 15 · 1,55 = 23,25 |
| medidas-de-tendencia-central | UFT 2013 | 1,60 | minha, sim (genérico) | → "faz a média das médias: (1,70 + x)/2 = 1,65" | x = 1,60 |
| medidas-de-tendencia-central | EsSA 2012 | 20%, 25%, 30% | minha, sim (genéricos) | → teste de cada: médias 8,2, 8,3 e 8,4, não 9,0 | 0,2 · 9,8 + 0,8 · 7,8 = 8,2 etc. |
| medidas-de-tendencia-central | ENEM 2020/165 | 2,08 | minha, sim ("erra a soma… ou o desconto") | → "conta 16 atletas: 16 × 0,06 = 0,96 m" | (7,30 + 0,96 − 2,02)/3 = 2,08 |
| descontos-acrescimos-e-indices | ENEM 2022/167 | enunciado e 100,00 | minha, sim (sinal) | "-2%" com hífen → "−2%" (regra 5 do briefing B16) | |
| descontos-acrescimos-e-indices | ENEM 2022/167 | 42,00 maior | minha, sim ("confunde percentuais") | → "trata os 2% como acréscimo: 1 100 · 1,02 = 1 122, que passa 1 080 em 42" | 1.122 − 1.080 = 42 |
| descontos-acrescimos-e-indices | ENEM 2019/153 | 1.349,00 | minha, sim ("não sai de nenhuma das taxas") | → "aplica os 10% só sobre o aumento: 1 250 + 90 + 9" | 1.250 · 0,072 = 90 |
| grandezas-direta-e-inversa | ENEM 2020/160 | 14 | B36, sim | → "gasto de 280 km: esqueceu a volta e não descontou o 1 L" | 280 · 5/100 = 14 |
| grandezas-direta-e-inversa | ENEM 2021/159 | enunciado | minha, sim (crit. 4) | "Três pessoas trocam um pneu… com um grupo reduzido" → "4 grupos de 3 trocam os 4 pneus juntos em 4 s… Se um grupo fica com 2…" | O original tem 4 grupos em paralelo; sem isso, os distratores 4,5 e 4,4 não fazem sentido |
| grandezas-direta-e-inversa | ENEM 2021/159 | 4,5 | minha, sim | → "média dos grupos, (6 + 4 + 4 + 4) ÷ 4" | |
| grandezas-direta-e-inversa | ENEM 2021/159 | 4,4 | minha, sim | → "4 · 12/11 trata as 11 pessoas como uma equipe só" | 48/11 = 4,36 |
| matematica-financeira | ENEM 2019/150 | 398,02 | B36, sim | "fica abaixo do valor certo" → "desconta a 1ª por dois meses: 202 ÷ 1,01² = 198,02" | 198,02 + 200 = 398,02 |
| matematica-financeira | ENEM 2019/150 | 401,94 | B36, sim | "não desconta a 2ª por 1,01²" (daria 402) → "202 + 204,02 · 0,98" | 202 + 199,94 = 401,94 |
| matematica-financeira | ENEM 2019/150 | 404,00 | B36, sim | → "traz as parcelas só ao 1º mês: 202 e 204,02 ÷ 1,01 = 202" | |
| matematica-financeira | ENEM 2018/175 | 20 | minha, sim (genérico) | → teste: "P = 1 000, total 20 000; 16 · 1 232 = 19 712" | |
| matematica-financeira | ENEM 2018/175 | 58 | minha, sim ("vem de erro no sistema") | → "58 é o coeficiente de P = 58N − 232, da 2ª equação" | 58N − 232 = 40N + 200 ⇒ N = 24 |
| razao-proporcao-porcentagem | ENEM 2023/167 | (3,5 ; 4,0) | minha, sim ("subestima") | → "arredonda 57,5 pacotes para baixo: 57 · 4 = 228 e 8/228 ≈ 3,5%" | 1.150 · 5 = 5.750 folhas |
| razao-proporcao-porcentagem | ENEM 2022/154 | enunciado | B36, sim (crit. 4) | "foram criadas 28 900 vagas … em 2012?" → "Jan./2013: 1 794 272 admissões e 1 765 372 desligamentos, ou 28 900 vagas criadas, 75% menos que em jan./2012. Quantas vagas em jan./2012?" | Os feedbacks de 441 343 e 448 568 citavam dados que o enunciado omitia; o original compara janeiro com janeiro |

### Destaques para o maestro (não editei, porque a regra da B41 proíbe mexer em `fonte`)

- **Ano errado na `fonte` (aparece "ENEM 2025 (adaptada)" para o aluno)**, conferido no cache:
  - `principio-fundamental-da-contagem/enem-2025-respostas` = ENEM 2012/144;
  - `enem-2025-montadora` = ENEM 2022/142;
  - `enem-2025-placas-do-2` = ENEM 2020/141;
  - `probabilidade-condicional/enem-2025-declaracoes` = ENEM 2019/173.

  Também é preciso trocar a URL pela do api.enem.dev.
- **Questão repetida:** ENEM 2012/144 está em `fatorial-e-permutacoes` (enem-2012-enredo) e em `principio-fundamental-da-contagem` (enem-2025-respostas).

### Recusados (achado da B36 que não procede, ou alternativa que conferi e mantive)

| aula | questão | alternativa | motivo |
|---|---|---|---|
| fracoes-e-decimais | ENEM 2022/164 | 12,000 | O texto já reconstrói o erro: 360 ÷ 30 jatos diários = 12 |
| sistemas-numericos-e-divisibilidade | ENEM 2009/156 | 0 e 1 | Nenhum erro dá d₂ = 1. O texto é honesto: "não sai da regra; S₂ = 244, resto 2, 11 − 2 = 9" |
| sistemas-numericos-e-divisibilidade | ENEM 2021/176 | enunciado | "Monumento" no lugar de "cidade fundada" muda o contexto, mas preserva os dados (MCDLXIX, 2050) e a conta (2050 − 1469 = 581) |
| distribuicao-de-frequencias-e-amostragem | ENEM 2021/151 | enunciado (800) | A pergunta resumida é a do original ("menor preço p para o qual pelo menos 50% … inferior a p"). A ambiguidade de faixa é da prova |
| eventos-independentes, experimentos-binomial | ENEM 2021/142, 2019/159, 2009/145 | enunciado (independência) | Os originais também não explicitam a independência; acrescentá-la mudaria a questão em relação à prova |
| demais alternativas | 59 questões | — | Conferi cada conta. Onde não há erro exato que leve ao valor, o teste numérico atual está certo e ficou. Por exemplo: 2016/154 (as 5 frações); 2019/158 (30, 15, 6, 3 dias); 2011/160 (13.300 e 17.100: 0,76C ≠ 3.800); 2022/137 (40, 44, 52/64); 2020/138 (1 : 100.000) |

Achados da B36 em aritmética:
- **59 linhas** de "revela ou identifica a resposta correta" (critério 3, descartado). Nenhuma mudou por esse motivo.
- **18 linhas** de "outros achados":
  - 12 procedem e foram corrigidos: 2013/150 5/8; 2017 0,075 e 0,600; 2022/164 4,800; 2009/156 9 e 1; 2019/159 51; 2020/160 14; 2019/150 404, 398,02 e 401,94; 2012/144 enunciado; 2022/154 enunciado.
  - 4 procedem, mas são de `fonte` (ano errado) e foram para o destaque acima.
  - 6 não procedem: 2022/164 12,000; 2009/156 0 e 1; 2021/176 enunciado; 2021/151 formulação; e as duas linhas de independência.

### Totais de aritmética

- Conferidas por mim: **59 questões e 295 alternativas**; o `correct` confere nas 59.
- Corrigidas: **45 textos em 28 questões e 14 aulas** (40 feedbacks e 5 enunciados). Doze vieram dos achados da B36; os outros 33 saíram da minha auditoria.
- Validação: `npm run lint:content` ok; `npx vitest run` dos 14 capítulos alterados, todos passando.

## Totais da B41

- **Conferidas:** 92 questões e 458 alternativas (33 e 163 em álgebra; 59 e 295 em aritmética).
- **Corrigidas:** 78 textos em 48 questões e 26 aulas (66 feedbacks, 11 enunciados, 1 fala).
- **Achados da B36 recusados:** 31 em álgebra (critério 2), mais 6 linhas em aritmética. Os 130 + 59 do critério 3 foram descartados por regra (GUIA §2 regra 1).
- **`correct` errado:** nenhum. Destaques: ENEM 2017/137 (gabarito oficial depende das aproximações); 4 fontes com ano 2025 errado; uma questão repetida (ENEM 2012/144); o cache 2011/180 sem a opção 0.

# Auditoria por amostragem da revisão do Hydrogen (álgebra)

Auditor: Claude Code (13/11/2026). Critério: gabarito de cada alternativa, feedback de cada errada (descreve o erro que leva àquela alternativa e traz a resposta certa), distratores de fato errados, falas dos passos matematicamente verdadeiras.

| slug | problemas | detalhe |
|---|---|---|
| inequacoes-produto-quociente | 0 | Conferidas as 4 falas de passos, o desafio dos passos e as 12 questões de treino (faceis, medias, desafios), 44 alternativas; gabaritos e feedbacks corretos. |
| equacoes-irracionais | 0 | Conferidas as falas dos 3 passos interativos, o desafio e a dúvida, e as 12 questões de treino (44 alternativas); todas as contas e os diagnósticos dos distratores conferem (ex.: d5 só x = 7 passa de x ≥ 4; d2 sem solução). |
| divisao-polinomial-e-teorema-do-resto | 2 | Falas dos 4 passos, dúvidas e 12 questões de treino conferidas (gabaritos todos certos). Dois feedbacks de distrator descreviam um erro que não leva àquela alternativa, ambos em `m2` (x²+1 por x+1): (1) alt. "0": "Você ignorou o termo constante positivo" → "Você tratou o +1 como −1: 1−1=0" (ignorar o +1 daria 1, não 0); (2) alt. "−2": "Você elevou −1 ao quadrado e manteve o sinal negativo (−1−1)" → "Você inverteu o sinal do resultado: −(1+1)=−2" (a conta antiga dava −1+1=0, não −2). Vitest 10/10 e lint ok. |
| sistemas-lineares-e-escalonamento | 1 | Falas dos 5 passos (só lidas, não editadas) e 12 questões de treino conferidas; gabaritos certos. `d5`, alt. "(3−t;−t;t)": "Você errou o sinal de y ao passar z em y−z=0" → "Você errou o sinal de y (−t) e subtraiu só z ao isolar x" (com y=−t, x=3−y−z daria 3; a alternativa só aparece se também se subtrai apenas z). Só o treino foi editado. Vitest 10/10 e lint ok. |

## Veredito

Amostra: 4 capítulos, 3 problemas (0, 0, 2, 1), nenhum gabarito errado e nenhuma fala de passo falsa. Todos os problemas são do mesmo tipo: **feedback de distrator que descreve um erro que não leva àquela alternativa** (a conta citada dá outro número). Cerca de 0,75 problema por capítulo, perto do 1 por capítulo da revisão do Opus, contra 1 erro em 25 capítulos do Hydrogen.

Conclusão: a revisão do Hydrogen foi **branda**. Ela parece conferir gabaritos e falas, mas não refaz a conta de cada distrator para ver se o erro descrito produz aquele valor. Sugestão: nova passada, em todos os capítulos de álgebra, só sobre os feedbacks dos distratores (refazer a conta que o feedback atribui ao aluno e checar se dá o rótulo da alternativa); os dois erros achados em `divisao-polinomial` (m2) mostram o padrão. Ressalva: amostra de 4 de 25, e eu não sei se o único erro do Hydrogen estava entre estes 4.

# Auditoria das 40 questões do ENEM inseridas em 14/11 (aritmética e álgebra)

Auditor: Claude Code (Opus 5.5), Máquina B, 14/11/2026. Método: cada `treino.vestibular` com URL da api.enem.dev foi comparado com o enunciado e as alternativas originais (cache local da API, 652 questões de matemática de 2009 a 2023). Conferido: o resumo do `prompt` tem todos os dados e não muda a pergunta; o gabarito; cada feedback de errada refeito na conta (o erro descrito precisa dar aquele rótulo).

Resultado: **40/40 gabaritos e resumos corretos**; **26 feedbacks e 1 fala corrigidos** em 12 aulas (as questões repetidas em dois capítulos foram corrigidas nas duas cópias). Nenhum enunciado precisou de mudança.

| slug | questão | alternativa | defeito → correção |
|---|---|---|---|
| sistemas-lineares-e-escalonamento | ENEM 2023/175 | 10,65 | "a = v − 0,05 (3v = 3,55)": essa troca dá 3v = 3,70 e 11,10. → verificação direta: v ≈ 1,18 faz 2a + v ≈ 6,02 ≠ 3,60. |
| sistemas-lineares-e-escalonamento | ENEM 2018/178 | 47; 79 | "não fecha a paridade"; "soma ou divide errado" (vagos). → 47 dá y = 30 e 4x − 3y = 98 ≠ 90; 79 é 158 ÷ 2. |
| fracoes-e-decimais | ENEM 2022/164 | 0,125 | "erra o total de minutos". → 0,125 = 360 ÷ (60 × 48), lendo 48 como jatos por dia. |
| fracoes-e-decimais, unidades-conversoes-e-escalas | ENEM 2021/178 | 700 000; 2 200 000 | 700 000 "erra a conversão/quantidade" e 2 200 000 "não desconta as ruas" (isso dá 2 800 000). → 700 000 loteia os 0,9 ha das ruas (30 lotes); 2 200 000 seriam 80 lotes. |
| notacao-cientifica-e-ordem-grandeza | ENEM 2019/140 | fala | "até ficar entre o 1 e o 1" (frase quebrada). → "até ficar logo depois do 1". |
| eventos-independentes, probabilidade-espaco-amostral | ENEM 2023/138 | 68 | "esquece as 12 brancas". → 68 = 80 − 12 desconta só as brancas e esquece as 4 pretas. |
| eventos-independentes, probabilidade-espaco-amostral | ENEM 2021/142 | 9 | "Não some 1/2 nove vezes". → 9 vem do numerador de 9/10. |
| eventos-independentes | ENEM 2019/159 | 51; 50 | "Não divida 100 por 2" estava no 51 (100 ÷ 2 = 50). → 50 = 100 ÷ 2; 51 supõe chances que se somam. |
| medidas-de-tendencia-central | ENEM 2020/165 | 1,96 | "média dos 4 sem o ganho" (não dá 1,96). → com 1,96 a média do time vai a 1,97. |
| descontos-acrescimos-e-indices, taxas-equivalentes-e-inflacao | ENEM 2019/153 | R$ 1.349,00 | "Não some 9 reais" (sem sentido). → não sai de nenhuma das taxas; mostra 1 340 × 1,10. |
| descontos-acrescimos-e-indices | ENEM 2019/176 | 25,0% | não explicava o 25%. → 25% é o aumento do m², não o desconto. |
| grandezas-direta-e-inversa | ENEM 2020/160 | 14 | "não considera a volta ou erra a sobra". → 14 L cobre 280 km, sem a volta de 80 km. |
| grandezas-direta-e-inversa | ENEM 2019/152 | R$ 6.200,00 | "proporcional direto a 2/10" (confuso). → é a parte da máquina de 2 anos numa divisão direta. |
| matematica-financeira | ENEM 2023/161 | 23,3% | "erra a aproximação na raiz". → com 1,233 as parcelas valem ≈ 882, não 900. |
| matematica-financeira | ENEM 2019/150 | 398,02; 401,94; 404,00 | "subtrai 1% e 2%" dá 399,92; "desconta só 1%" dá 401,98; "juro simples errado" (vago). → contas que fecham, e 404 = 2 × 202. |
| razao-proporcao-porcentagem | ENEM 2022/154 | 441 343; 448 568 | "mistura o total de admissões" estava no 441 343, que é 25% dos desligamentos. → cada um diz de onde vem (desligamentos e admissões × 0,25). |

Padrão: o mesmo da auditoria de 13/11, **feedback que descreve um erro que não produz aquele número**. Os demais 13 capítulos (28 questões) não tinham defeito. Lint e os 12 testes dos capítulos editados passaram (111 testes).

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

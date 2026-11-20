# Auditoria B45c — Função modular, Q22 da UERJ

**Veredito.** Mantive a questão `uerj-cbmerj-2025-modular`. O caderno e o comentário oficial confirmam **B = 8**. O conteúdo cabe na aula, a fala funciona como dica e as quatro alternativas coincidem com as da prova. Explicitei o domínio real no enunciado e reescrevi os feedbacks de A e C.

## Fonte e nível

A Revista Eletrônica do Vestibular, no subdomínio `www.revista.vestibular.uerj.br` de `uerj.br`, lista o concurso ABMDPII/CBMERJ 2025 e aponta para o PDF `51.pdf`. Comparei as páginas do site com o arquivo local `provas-oficiais/uerj-revista-questoes/51.pdf`. A questão 22 aparece na página 25 do PDF (p. 13 impressa). Seu comentário na página 26 (p. 14 impressa) registra B, resolve a conta e classifica o item como médio, com 41,77% de acertos. O gabarito conferido é o comentário institucional no mesmo arquivo. A tentativa de baixar o PDF diretamente para comparar os bytes encontrou um certificado expirado. A verificação de conteúdo usou o PDF local e a versão aberta pelo navegador de consulta no endereço institucional. [Índice da Revista da UERJ](https://www.revista.vestibular.uerj.br/questao/) · [Enunciado](https://www.revista.vestibular.uerj.br/arquivos/pdf/questao/51.pdf#page=25) · [Gabarito comentado](https://www.revista.vestibular.uerj.br/arquivos/pdf/questao/51.pdf#page=26)

Para todo x real com −5 < x < 0, temos x − 3 < 0 e x + 5 > 0. Assim, y = (3 − x) + (x + 5) = 8. A aula ensina a trocar de ramo conforme a posição de x em relação à referência h, além de interpretar módulo como distância. A questão aplica essa regra às referências −5 e 3, sem precisar de conteúdo posterior.

## Enunciado, fala e feedbacks

- **Enunciado.** A versão resumida já preservava a expressão, a desigualdade estrita e a pergunta. Recoloquei a condição explícita de x real, presente no caderno. Texto aplicado “Para x real com −5 < x < 0, qual é o valor de y = |x − 3| + |x + 5|?”
- **Fala.** Mantida. Antes de Verificar, ela pede que o aluno observe os sinais de x − 3 e x + 5. O aluno ainda precisa determinar os sinais, reescrever os termos e obter a soma.
- **A — 4.** Antes, o feedback só refutava o valor. Para x = −1, contar apenas o primeiro módulo dá 4. O segundo também vale 4 nessa entrada. Texto aplicado “Com x = −1, contar só o primeiro módulo dá |−4| = 4. Somando os dois no intervalo, y = (3 − x) + (x + 5) = 8.”
- **C — 2x + 4.** Antes, o feedback só testava a expressão em x = −1. Apagar as barras dá (x − 3) + (x + 5) = 2x + (5 − 3). Um segundo erro, calcular 5 − 3 como 4, produz exatamente 2x + 4. O texto apresenta a combinação de dois erros como uma forma de chegar à escolha. Texto aplicado “Tirar as barras sem checar os sinais e calcular 5 − 3 como 4 dá 2x + 4. A soma correta é (3 − x) + (x + 5) = 8.”
- **D — 2x + 8.** Mantido. Trocar apenas o sinal do termo −3, mantendo o coeficiente de x positivo, dá (x + 3) + (x + 5) = 2x + 8. O feedback corrige o primeiro módulo para 3 − x e informa 8.
- **B — 8.** Mantido. O feedback aplica as duas regras de sinal e mostra a soma.

Atualizei o roteiro para registrar o gabarito comentado, os distratores e o estado real do vestibular. O teste agora confere a ordem e o texto das quatro alternativas, a marcação exclusiva de B e os dois ramos dos módulos em amostras internas, inclusive perto dos limites do intervalo.

Passaram os 10 testes do capítulo, a suíte completa (2.143 testes em 132 arquivos), o typecheck e o lint de conteúdo.

## Estado na parada da sessão

B45r parte 1 (varredura B44a), auditoria da Q71 da UFRGS e auditoria da Q22 da UERJ concluídas. A Q22 foi o último trabalho. Aula, roteiro e teste atualizados, relatório gravado e validações concluídas. A auditoria B45d ainda não foi iniciada e aguarda a entrega.

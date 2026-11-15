# B14a1: desafios com 4 alternativas (equações)

Frente B14a1 (parte de equações da B14a), feita por Claude Code #2 (Máquina B) em 15/11/2026. As 7 aulas de `content/algebra/equacoes-e-inequacoes/equacoes-*` tiveram o `micro_challenge` levado de 2 para 4 alternativas (1 certa, 3 erradas). Ficaram fora, com o Codex: `expressoes-algebricas-e-produtos-notaveis`, `fatoracao-algebrica` e as `inequacoes-*`. Só o bloco `options` mudou; `prompt`, `lines`, figura inicial e ids de passo ficaram iguais. Os feedbacks das erradas que já existiam e citavam a resposta certa foram reescritos. Posição da certa: 3, 1, 4, 2, 3, 1, 4. Todas as legendas têm até 10 caracteres, e os enunciados continuam curtos (o maior tem 42 caracteres; a maior legenda, 8).

Figura: "base" = figura inicial do desafio; a opção sobrescreve só os campos citados (merge raso).

| slug | opção (label) | certa? | erro que gera o valor (conta) | o que a figura mostra |
|---|---|---|---|---|
| equacoes-exponenciais | 4 | não | dividiu 8 pela base: 8 ÷ 2 = 4; 2⁴ = 16 ≠ 8 | ponto (4; 16) da curva (figura que já existia) |
| equacoes-exponenciais | √8 | não | trocou base e expoente: x² = 8 ⇒ x = √8; 2^√8 ≈ 7,1 ≠ 8 | base + parábola y = x² (c1) cortando y = 8 |
| equacoes-exponenciais | 3 | **sim** | 2³ = 8 | destaque c4 |
| equacoes-exponenciais | 256 | não | elevou 2 ao 8: 2⁸ = 256 | janela x até 9, guia x = 8 e 2ˣ (destacada) saindo pelo topo bem antes |
| equacoes-irracionais | 2 | **sim** | √(2 + 2) = 2 | ponto (2; 2) e encontro |
| equacoes-irracionais | −1 | não | candidato falso do quadrado: √(−1 + 2) = 1 ≠ −1 | cursor em x = −1 com as duas alturas diferentes (figura que já existia) |
| equacoes-irracionais | −1 e 2 | não | aceitou os dois candidatos de x² − x − 2 = 0 sem testar | parábola y = x² e reta y = x + 2 com os 2 encontros (a equação depois de elevar ao quadrado) |
| equacoes-irracionais | Nenhuma | não | elevou só o lado da raiz: x + 2 = x ⇒ 2 = 0 | retas paralelas y = x + 2 e y = x |
| equacoes-logaritmicas | 2 | não | igualou x − 1 a 1 (o log "sumiu"); log₂(2 − 1) = 0 ≠ 1 | ponto (2; 0) da curva (figura que já existia) |
| equacoes-logaritmicas | 1 | não | isolou x com o sinal trocado: x = 2 − 1; em x = 1 o argumento é 0 | assíntota x = 1 marcada + guia "x = 1" |
| equacoes-logaritmicas | 4 | não | leu log₂x − 1 = 1 ⇒ log₂x = 2 ⇒ x = 4; na equação certa, log₂(4 − 1) = log₂3 ≠ 1 | base + curva log₂x − 1 (c1) com o ponto (4; 1) |
| equacoes-logaritmicas | 3 | **sim** | x − 1 = 2¹ ⇒ x = 3 | ponto (3; 1) e encontro |
| equacoes-modulares | 1 e 3 | não | tomou o centro por solução: |1 − 1| = 0 ≠ 2 | ponto (1; 0) (figura que já existia) |
| equacoes-modulares | −1 e 3 | **sim** | x − 1 = ±2 ⇒ x = −1 ou 3 | destaque c4 |
| equacoes-modulares | 3 | não | só o caso x − 1 = 2; faltou x − 1 = −2 | ponto (3; 2) em destaque |
| equacoes-modulares | −3 e 1 | não | centro trocado, resolveu |x + 1| = 2; |−3 − 1| = 4 ≠ 2 | janela x de −4 a 5, base + V de |x + 1| (c1) |
| equacoes-primeiro-grau | −2 | não | sinal trocado: x = −4/2; a reta vale −8 em −2 | ponto (−2; −8) (figura que já existia) |
| equacoes-primeiro-grau | 4 | não | parou em 2x = 4 sem dividir; a reta vale 4 em x = 4 | ponto (4; 4) |
| equacoes-primeiro-grau | 2 | **sim** | 2x = 4 ⇒ x = 2 | encontro marcado |
| equacoes-primeiro-grau | 1/2 | não | dividiu 2 por 4; a reta vale −3 em 0,5 | ponto (0,5; −3) |
| equacoes-quadraticas | Nenhuma | **sim** | Δ = 0² − 4·1·1 = −4 < 0; x² + 1 ≥ 1 | vértice e guia "mín = 1" |
| equacoes-quadraticas | Duas | não | resolveu x² = 1 (±1) em vez de x² = −1 | parábola x² − 1 com as raízes ±1 (figura que já existia) |
| equacoes-quadraticas | Uma | não | esqueceu o c no discriminante: Δ = 0² − 4·1·0 = 0 | original em fantasma + parábola y = x² com a raiz 0 |
| equacoes-quadraticas | Duas: ±i | não | contou as raízes complexas (i² = −1), que não são reais | guia "raízes reais" sobre o eixo x, que a parábola não toca |
| equacoes-racionais | {1} | não | aceitou x = 1 de x + 1 = 2, mas x − 1 = 0 no denominador | ponto (1; 2) no furo (figura que já existia) |
| equacoes-racionais | {2} | não | cortou o −1 de cima com o de baixo: x²/x = x = 2; mas (4 − 1)/(2 − 1) = 3 ≠ 2 | base + reta y = x (c1) com o ponto (2; 2) |
| equacoes-racionais | {±√3} | não | ignorou o denominador: x² − 1 = 2 ⇒ x = ±√3; a fração dá ≈ 2,73 em √3 | base + parábola y = x² − 1 (c1) cortando y = 2 |
| equacoes-racionais | ∅ | **sim** | único candidato x = 1 é proibido | destaque c2 |

**Validação:** `npx vitest run` nos 7 testes: 7 arquivos, 71 testes passando; `npm run lint:content`: conteúdo ok; `npm run typecheck`: sem erros. Cada teste ganhou `toHaveLength(4)`, a conta de cada errada nova e a lista de legendas na ordem do JSON. As asserções antigas (`find(!correct)` = errada original) continuam valendo, porque a errada original segue sendo a primeira errada.

**Dúvidas e limitações de widget:**
- `equacoes-quadraticas`, "Duas: ±i": o plano não desenha raízes complexas; a figura só aponta o eixo x (guia "raízes reais"), que a parábola não toca. Como a pergunta pede contagem, a 4ª opção também é uma contagem.
- `equacoes-irracionais`, "−1 e 2": a figura mostra a equação depois de elevar ao quadrado (os 2 encontros), sem indicar qual deles serve.
- `equacoes-exponenciais`, "256": não cabe o ponto (8; 256); a figura mostra a guia x = 8 e a curva saindo pelo topo (mesma solução aprovada em `logaritmos`).
- Não fotografei as figuras em 400 px; fica para a auditoria.

**Auditoria do maestro (15/11):** contas das 21 erradas refeitas (ex.: `equacoes-logaritmicas` 4 = ler log₂x − 1 = 1 ⇒ x = 2² = 4; `equacoes-racionais` {±√3} = x² − 1 = 2), nenhum feedback de errada cita a certa (as ocorrências do script são dados do enunciado, como 2x = 4), fotos em 400 px de cada alternativa depois de VERIFICAR (`C:\Users\mkf10\projetos\capturas-b14a1\`): 7/7 aprovados. Retoque: na certa de `equacoes-logaritmicas` o rótulo (3; 1) saía duas vezes (ponto e encontro); ficou só o ponto. Ressalva: a figura de "Duas: ±i" em `equacoes-quadraticas` é só a guia do eixo x.

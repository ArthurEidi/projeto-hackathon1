# B14b: desafios com 4 alternativas (aritmética, conjuntos e proporcionalidade)

Frente B14b, feita por Claude Code #2 (Máquina B) em 15/11/2026 no lugar do Codex #2, que ficou sem permissão de rodar comandos. Em cada capítulo, o `micro_challenge` passou de 2 para 4 alternativas (1 certa, 3 erradas). Só o bloco `options` mudou; `prompt`, `lines`, figura inicial e ids de passo ficaram iguais. Os feedbacks das erradas que já existiam e citavam a resposta certa foram reescritos. Posição da certa: 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4 (3 vezes cada posição).

Figura: "base" = figura inicial do desafio; a opção sobrescreve só os campos citados (merge raso).

| slug | opção (label) | certa? | erro que gera o valor (conta) | o que a figura mostra |
|---|---|---|---|---|
| conjuntos-e-intervalos | [2; 3] | **sim** | [max(0, 2); min(3, 5)] = [2; 3] | operação interseção (resultado c4) |
| conjuntos-e-intervalos | [0; 5] | não | fez a união: [min(0, 2); max(3, 5)] | operação união (figura que já existia) |
| conjuntos-e-intervalos | [2; 5] | não | maior início e também maior fim: [max(0, 2); max(3, 5)] = B | A e o trecho [2; 5] = B (c3) com o ponto 4 ∉ A |
| conjuntos-e-intervalos | [0; 2) | não | fez a diferença A − B = [0; 2) | operação diferença |
| fracoes-e-decimais | 0,2 | não | escreveu o denominador depois da vírgula: 1/2 → 0,2 | ponto e trecho até 0,2 (figura que já existia) |
| fracoes-e-decimais | 0,5 | **sim** | 1 ÷ 2 = 0,5 | ponto 0,5 no fim do trecho 1/2 |
| fracoes-e-decimais | 1,2 | não | juntou numerador e denominador com vírgula: 1 e 2 → 1,2 | reta de 0 a 2: trecho 1/2 e ponto 1,2 depois do 1 |
| fracoes-e-decimais | 2 | não | dividiu na ordem inversa: 2 ÷ 1 = 2 | reta de 0 a 2,5: trecho 1/2 e ponto "2 ÷ 1" |
| notacao-cientifica-e-ordem-grandeza | 20·10¹ | não | mesmo valor (20·10 = 200), mas coeficiente 20 ≥ 10 | barra com rótulo "20·10¹ = 200" |
| notacao-cientifica-e-ordem-grandeza | 2·10³ | não | contou os 3 algarismos de 200: 2·10³ = 2000 | barra de 10 partes de 200 ("2·10³ = 2000", todo "10 × 200"), referência cinza 1/10 |
| notacao-cientifica-e-ordem-grandeza | 2·10² | **sim** | 200 = 2·10², 1 ≤ 2 < 10 | barra com rótulo "2·10² = 200" |
| notacao-cientifica-e-ordem-grandeza | 2·10⁻² | não | expoente negativo: 2·10⁻² = 0,02 (para números < 1) | 1 de 100 partes de 2 pintada ("2·10⁻² = 0,02") |
| potencias-e-radicais | −2 | não | o menos do expoente virou sinal: −(2¹) = −2 | guias y = −2 (abaixo do eixo) e x = −1; sem o ponto em x = −1 |
| potencias-e-radicais | 2 | não | ignorou o sinal: 2¹ = 2 | ponto (1; 2) da curva + guia x = −1 |
| potencias-e-radicais | −0,5 | não | inverteu e levou o menos: −(2⁻¹) = −0,5 | assíntota y = 0 marcada + guia y = −0,5 abaixo dela |
| potencias-e-radicais | 0,5 | **sim** | 2⁻¹ = 1/2 = 0,5 | ponto (−1; 0,5) (c1) |
| sistemas-numericos-e-divisibilidade | 0 | **sim** | 6 = 3·2 + 0 | figura inicial (sem sobrescrita) |
| sistemas-numericos-e-divisibilidade | 2 | não | deu o quociente: 6 ÷ 3 = 2 grupos | 2 grupos de 3 pintados ("2×3 = 6", figura que já existia) |
| sistemas-numericos-e-divisibilidade | 3 | não | parou no 1º grupo: 6 − 3 = 3, mas 3 ≥ 3 ainda forma outro grupo | 2 grupos de 3, só 1 pintado ("1 grupo = 3") |
| sistemas-numericos-e-divisibilidade | 6 | não | tomou o dividendo (total de fichas) pelo resto | 6 fichas pintadas ("fichas = 6") |
| valor-absoluto-e-distancia | −3 | não | deslocamento com sinal: −2 − 1 = −3, sem o módulo | trecho "desloc. −3" (figura que já existia) |
| valor-absoluto-e-distancia | 3 | **sim** | ∣−2 − 1∣ = 3 | distância ligada |
| valor-absoluto-e-distancia | 1 | não | somou: ∣−2 + 1∣ = 1 | pontos −2, 1 e o ponto "−2 + 1" em −1 |
| valor-absoluto-e-distancia | 2 | não | contou as marcas entre os pontos (−1 e 0), não os passos | pontos −2, 1 e as marcas "1ª" (−1) e "2ª" (0) |
| descontos-acrescimos-e-indices | R$ 100 | não | tirou 10% de R$ 100, não de R$ 110: 110 − 10 = 100 | barras 100, 110 e "−R$ 10" = 100 acesa (antes acendia a barra certa 99) |
| descontos-acrescimos-e-indices | R$ 110 | não | parou no aumento: 100·1,1 = 110 | base com a barra 110 acesa |
| descontos-acrescimos-e-indices | R$ 99 | **sim** | 100·1,1·0,9 = 99 | barras 100, 110, 99 com a 99 acesa |
| descontos-acrescimos-e-indices | R$ 90 | não | esqueceu o aumento: 100·0,9 = 90 | barras 100 e "−10%" = 90 acesa |
| grandezas-direta-e-inversa | 12 | não | proporção direta: 6·2 = 12 (2·12 = 24 ≠ 6) | reta y = 6x e ponto (2; 12) com retângulo de área 24 (antes era igual à figura da certa) |
| grandezas-direta-e-inversa | 6 | não | não atualizou y: 6/1 = 6 (2·6 = 12 ≠ 6) | guia y = 6 e guia x = 2 (a curva passa abaixo) |
| grandezas-direta-e-inversa | 4 | não | manteve a soma x + y = 6: 6 − 2 = 4 (2·4 = 8 ≠ 6) | reta x + y = 6 e ponto (2; 4) com retângulo de área 8 |
| grandezas-direta-e-inversa | 3 | **sim** | 6/2 = 3; 2·3 = 6 | ponto (2; 3) na hipérbole com retângulo de área 6 |
| matematica-financeira | R$ 121 | **sim** | 100·1,1² = 121 | 3 termos acesos, o 3º destacado |
| matematica-financeira | R$ 120 | não | juro simples: 100 + 2·10 = 120 | sequência PA +10 (100, 110, 120), 3º destacado (antes acendia a barra 121) |
| matematica-financeira | R$ 110 | não | parou no 1º período: 100·1,1 = 110 | 2 termos acesos e o 2º destacado; 3º só no contorno |
| matematica-financeira | R$ 101 | não | elevou só a taxa: 100·(1 + 0,1²) = 101 | 2 termos PA +1 (100, 101) com a PG 100, 110 em fantasma |
| razao-proporcao-porcentagem | 4 | não | metade (50%): 8/2 = 4 | 2 de 4 partes pintadas (figura que já existia) |
| razao-proporcao-porcentagem | 2 | **sim** | 25/100·8 = 2 | 1 de 4 partes pintada, todo 8 |
| razao-proporcao-porcentagem | 32 | não | multiplicou por 4 em vez de dividir: 8·4 = 32 | 4 de 4 partes de 8 pintadas ("8 · 4 = 32") |
| razao-proporcao-porcentagem | 200 | não | esqueceu de dividir por 100: 25·8 = 200 | 1 de 4 partes de um todo 800 ("25 · 8 = 200", "T = 800") |
| taxas-equivalentes-e-inflacao | 5% | não | subtraiu as taxas: 10 − 5 = 5 | as duas barras acesas com o degrau −5 (antes mostrava a barra certa 104,76) |
| taxas-equivalentes-e-inflacao | 15% | não | somou as taxas: 10 + 5 = 15 | barra "10% + 5%" = 115 acesa |
| taxas-equivalentes-e-inflacao | ≈ 4,76% | **sim** | 1,10 ÷ 1,05 − 1 = 1/21 ≈ 4,76% | barra "Valor real" 104,76 acesa |
| taxas-equivalentes-e-inflacao | ≈ −4,55% | não | dividiu ao contrário: 1,05 ÷ 1,10 − 1 ≈ −4,55% | barra "Preços ÷ salário" = 95,45 acesa |
| unidades-conversoes-e-escalas | 8 | não | ampliou só uma dimensão: (2·2)·2 = 8, retângulo 4 × 2 | retângulo 4 × 2 sobre o fantasma 2 × 2 (antes era igual à figura da certa) |
| unidades-conversoes-e-escalas | 4 | não | área antes de ampliar: 2·2 = 4 | quadrado original com a conta de área, sem perímetro |
| unidades-conversoes-e-escalas | 32 | não | usou k³ (regra do volume): 4·2³ = 32 | retângulo 8 × 4 (área 32), que não é um quadrado |
| unidades-conversoes-e-escalas | 16 | **sim** | (2·2)² = 16 | ampliação k = 2 com as 4 cópias |

**Validação:** `npx vitest run` nos 12 testes: 12 arquivos, 104 testes passando; `npm run lint:content`: conteúdo ok; `npm run typecheck`: sem erros. Cada teste ganhou `toHaveLength(4)`, a conta de cada errada nova e a lista de legendas na ordem do JSON. `descontos-acrescimos-e-indices` não tinha teste do desafio: ganhou um `it` novo. As asserções antigas continuam valendo (em `grandezas-direta-e-inversa`, a errada original "12" segue sendo a primeira errada).

**Dúvidas e limitações de widget:**
- Corrigi figuras de erradas antigas que mostravam a resposta ou eram iguais à da certa: `descontos` (acendia a barra 99), `matematica-financeira` (acendia a barra 121), `taxas-equivalentes` (mostrava a barra 104,76), `potencias-e-radicais` (o ponto em x = −1 mostrava 0,5), `grandezas` e `unidades` (figura igual à da certa).
- `unidades-conversoes-e-escalas`, opção "4": a figura é o quadrado original e difere da inicial só por esconder o perímetro e destacar a área. A malha não tem como mostrar "esqueceu de ampliar" de outro jeito sem desenhar o quadrado certo.
- `matematica-financeira`, opção "R$ 101": o erro (1 + 0,1²) é um fator só; a figura mostra um degrau +1 em 2 colunas, com a PG de 10% em fantasma para comparar.
- `notacao-cientifica`, opções "2·10³" e "2·10⁻²": o modo `parte_todo` não tem escala logarítmica; as figuras mostram "10 partes de 200" e "1 centésimo de 2".
- `valor-absoluto`, opção "2" (contou as marcas): é o distrator menos comum dos três.
- Não fotografei as figuras em 400 px; fica para a auditoria (B14e). As de `barras_figura` e `geometria_poligono_figura` (b = 8 na malha) merecem olhar primeiro.

**Auditoria do maestro (15/11):** refeitas as contas das 36 erradas e conferido que nenhum feedback de errada cita o valor certo (script sobre os 47 desafios da B14). Fotos em 400 px do estado inicial e de cada alternativa depois de VERIFICAR (`C:\Users\mkf10\projetos\capturas-b14b\tira-<slug>.png`, fora do repositório): 12/12 aprovados, sem corte nem rolagem lateral. Ressalvas menores: em `potencias-e-radicais` (−0,5) o rótulo "y = −0,5" encosta no da assíntota; em `notacao-cientifica` (2·10⁻²) as 100 partes ficam densas.

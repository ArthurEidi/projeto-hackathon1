# Revisão: `geometria/geometria-analitica/reta-equacao-e-inclinacao`

Duas frentes neste capítulo: (1) troca da adaptação em `plano_cartesiano` pelo widget `pontos_no_plano`, como pede o roteiro `docs/planos/reta-equacao-e-inclinacao.md` (lacuna listada em `docs/PROXIMOS-PASSOS.md`, "Trocar adaptações"); (2) revisão do briefing de geometria (distratores com conta, passos params × falas). Arquivos tocados: `aula-01.json` do capítulo e `src/conteudo/reta-equacao-e-inclinacao.test.ts`. `src/widgets` não foi editado.

## 1. Troca de widget (roteiro §h)

| passo | antes (adaptação) | agora |
|---|---|---|
| 1 `mesma-altura` | `plano_cartesiano`, slider m de 0 a 2 | `pontos_no_plano` modo reta, A(1; 2) fixo, B(4; 2) livre; conclui com `dy ≥ 3` |
| 2 `razao-constante` | `plano_cartesiano`, ponto arrastável, `ponto_x ≥ 2` | `pontos_no_plano` modo reta, A(0; 1), B(2; 5), `prender_na_reta`; conclui com `pontos_vistos ≥ 3` |
| 3 `corte-no-eixo-y` | `plano_cartesiano` + ponto arrastável | `plano_cartesiano` (o roteiro manda manter), sem o ponto arrastável; `intercepto_tocado ≥ 1`; dúvida do roteiro |
| 4 | `desafio-fronteira` (micro_challenge da reta vertical, adaptação) | `reta-vertical`: `pontos_no_plano` modo reta, A(1; 1) fixo, B(3; 3) livre; conclui com `dx_zero ≥ 1` |
| 5 | (não existia) | `desafio-equacao` do roteiro: reta por (1; 3) e (3; 7), figura `plano_figura` com janela x ∈ [−4; 6], y ∈ [−2; 8] para (3; 7) caber |
| 6 `fechamento` | fórmula y = m x + n; m = Δy/Δx | idem, com definições e fala do roteiro; `outro` do roteiro |

**Glossário remapeado (desvio consciente do roteiro).** O roteiro usa c1 = coeficiente angular, c2 = coeficiente linear, c4 = Δx. Mas o `pontos_no_plano` pinta, sem opção de cor, Δx em c1, Δy em c2 e a reta/pontos em c3 (`pontos/desenho.ts`). Com o glossário do roteiro, tocar no rótulo "Δx" abriria a dica "Coeficiente angular". Fica: c1 = passo horizontal Δx, c2 = passo vertical Δy, c3 = reta, c4 = coeficiente linear n. Nos passos em `plano_cartesiano`, o degrau "sobe" do `triangulo` usa c2 (é Δy para Δx = 1) e `interceptoY` usa c4. Na fórmula do fechamento, m fica sem marca e m = Δy (c2) / Δx (c1).

## 2. Revisão do briefing

| slug | erradas conferidas | feedbacks reescritos | passos corrigidos | exemplos |
|---|---|---|---|---|
| reta-equacao-e-inclinacao | 39 (36 do treino + 3 do `desafio-equacao`) | 21 (19 no treino + 2 no desafio; 1 distrator trocado) | 1 (fala de conclusão do passo 1, vinda do roteiro) | ver abaixo |

**Passo corrigido.** `mesma-altura`, done do roteiro: "Subindo B 3 em 3 passos, ela sobe 1 por passo: m = 3/3 = 1." → "Subindo B, Δy deixa de ser 0 e a reta gira; em (4; 5), m = 3/3 = 1." Conta: `complete_when` é `dy ≥ 3` e B é livre, então B = (6; 5) conclui com m = 3/5, B = (0; 5) com m = 3/(−1) = −3 e B = (1; 5) com m indefinido; "m = 1" só vale em (4; 5).

Conferidos sem correção: passo 2, B preso a y = 2x + 1 com A(0; 1): para x = −3, 1, 4, Δy/Δx = (−5 − 1)/(−3) = 2, (3 − 1)/1 = 2, (9 − 1)/4 = 2 (também no teste); a fala "Δy/Δx = 2 em qualquer par" vale para toda posição. Passo 4: `dx_zero` só vale 1 com B em x = 1 e y ≠ 1, o que dá exatamente "x = 1, inclinação indefinida". Passo 3: corte de y = 2x + 1 em x = 0 é 1.

**Distratores reescritos (antes → depois, conta que prova):**
- `delta-y-por-delta-x` alt. "Δx = 1 e Δy = 3" (nenhuma conta com (1; 2) e (3; 6) dá 1 e 3; feedback genérico "Subtraia as coordenadas") → **alternativa trocada** por "Δx = 4 e Δy = 8", feedback "Somou as coordenadas: 1 + 3 = 4 e 2 + 6 = 8".
- `m-3` alt. "4": "m = (8 − 2)/(3 − 1) = 3" (genérico) → "Dividiu 8 por 2 sem subtrair o 2 de A" (8/2 = 4).
- `ponto-na-reta` alt. "1": "Substituindo x = 2 temos 5" → "Esqueceu o 3: fez 2 − 1 = 1"; alt. "7": "5 (não 7)" → "Somou o 1 em vez de subtrair: 6 + 1 = 7".
- `reta-2-1-4-5` alt. "y = 2x + 1": "Para x = 2 daria 5" → "Usou o 1 de (2; 1) como n" (n = yA = 1); alt. "y = x − 1": "A inclinação correta é m = 2" → "Dividiu Δy = 4 por 4, o x de B" (m = 4/4 = 1, n = 1 − 1·2 = −1); alt. "y = 4x − 7": acrescentada a conta n = 1 − 4·2 = −7.
- `alinhados` alt. "4": "a inclinação mudaria para 1" → "Somou só 1 ao 3" (3 + 1 = 4); alt. "6" → "Multiplicou 3 por m = 2" (3·2 = 6); alt. "3" → "Repetiu a altura 3".
- `corte-no-eixo-x` alt. "x = −3": "obtemos x = +3" → "chegou a 2x = −6" (x = −6/2 = −3).
- `m-0` alt. "1" → "1 é a altura comum dos dois pontos" (y = 1 nos dois); `m-1-corte-0` alt. "y = 2x" → "Somou o passo 1 com a subida 1" (1 + 1 = 2), alt. "y = 1" e "y = x + 1" com o erro dito (sem o x; 1 usado também como n); `corte-em-3` alt. "(3; 0)" e "(2; 3)" com o erro dito (ordem trocada; m e n juntos num ponto); `delta` alt. "Δx = 3 e Δy = 6" (coordenadas de chegada); `reta-vertical` alt. "y = 4x" (Δy = 4 usado como m).
- `desafio-equacao` (texto do roteiro): "y = 4x − 1" ganhou a conta n = 3 − 4·1 = −1; "y = 2x + 3" → "3 é a altura em x = 1, não em x = 0" (n = yA = 3).

Conferidos sem mudança (exemplos): `m-negativo` alt. "−1/2": Δx/Δy = 3/(−6) = −1/2; `m-3` alt. "1/3": 2/6 = 1/3; `equacao-m-menos-1` alt. "y = 4x − 1": m e n trocados, 4·x + (−1).

Gabaritos: nenhum alterado (todos conferidos no teste).

**Total:** 1 capítulo; 39 erradas conferidas; 21 feedbacks reescritos (1 alternativa trocada); 1 fala de passo corrigida; widget trocado em 3 passos + 1 passo novo do roteiro.

## Dúvidas não resolvidas

- Glossário remapeado (ver §1): se o maestro preferir o do roteiro, é preciso dar cor configurável aos degraus no `pontos_no_plano` (arquivo da Máquina A).
- O widget `pontos_no_plano` mostra os botões "Quadrados" e "Ponto médio" também no modo reta; não atrapalham, mas não fazem parte desta aula.
- Conferência visual em 400 px não feita (sem navegador nesta sessão).
- Vestibular continua vazio (V1 a V4 são PENDENTE-FONTE no roteiro).

# Plano — Combinações com repetição e distribuição

**Aula:** 1 — Bolinhas e Barras · Distribuir itens iguais em caixas diferentes
**Caminho:** aritmetica / combinatoria-e-probabilidade / combinacoes-com-repeticao
**Pré-requisitos que o aluno já domina:** combinações C(n, k), princípio multiplicativo.

## a) Ancoragem mecânica
A máquina recebe k itens idênticos e n caixas diferentes e devolve de quantos jeitos os itens podem ser distribuídos (caixas podem ficar vazias). Entradas: n e k; saída: o número de distribuições. Trocar dois itens entre si não muda nada, porque eles são iguais; só importa quantos vão para cada caixa.

## b) Visual de partida
WIDGET NOVO `grade_resultados` em modo bolinhas-e-barras: uma fileira com k bolinhas (c2) e n − 1 barras separadoras (c1) arrastáveis. Acima, as caixas mostram quantas bolinhas ficaram em cada uma. Uma lista guarda as distribuições já vistas.

## c) Caso neutro
Uma caixa só: todas as bolinhas vão para ela, há 1 jeito. Sem barra, nada se separa. Depois acrescentamos uma caixa (uma barra) por vez.

## d) Panorama e recorte
Contagens com repetição aparecem em loterias, soluções de equações e probabilidade. Aqui: itens idênticos em caixas distintas, com e sem a regra "pelo menos um em cada".

## e) Progressão por contraste
1. 1 caixa: 1 jeito (referência).
2. 2 caixas e 3 balas: 4 jeitos (3+0, 2+1, 1+2, 0+3); não é 2³ porque as balas são iguais.
3. Cada jeito vira uma fileira ●●|●: contar distribuições = escolher onde ficam as barras.
4. 3 caixas e 3 balas: 5 símbolos, escolher 2 lugares para barras, C(5, 2) = 10.
5. "Pelo menos uma por caixa": dar uma a cada primeiro e distribuir o resto.

## f) Dedução causal da forma
Toda distribuição é uma fileira de k bolinhas e n − 1 barras, e toda fileira assim é uma distribuição. A fileira tem n + k − 1 símbolos, e só falta escolher quais posições são bolinhas. Por isso o total é C(n + k − 1, k).

## g) Simulação espacial e fronteiras
Com 0 itens há 1 jeito (todas vazias). Exigir pelo menos um por caixa só é possível se k ≥ n; com k = n há 1 jeito. Equações x + y + z = k com naturais são o mesmo problema: cada variável é uma caixa.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Barras | Separadores entre caixas: n caixas usam n − 1 barras. |
| c2 | Itens iguais | Os k itens idênticos que serão distribuídos. |
| c3 | Distribuições | Quantos jeitos diferentes existem de repartir os itens. |
| c4 | Item garantido | Item já entregue para cumprir "pelo menos um em cada". |

### Passo 1 — `uma-caixa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `grade_resultados` (modo caixas) — 3 balas iguais (c2) e n crianças; lista das distribuições possíveis aparece ao lado. Emite `total`.
- **Sliders:** `n` · "Crianças" · 1..2 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Três balas iguais e uma criança só: de quantos jeitos dá para distribuir? Depois acrescente uma criança."
- **Interação do aluno:** move n e vê a lista passar de 1 para 4 distribuições.
- **Conclusão:** `n ≥ 2`
- **Paco (conclusão):** "Com 2 crianças: 3 e 0, 2 e 1, 1 e 2, 0 e 3. São 4 jeitos, e não 2 · 2 · 2, porque as balas são iguais."
- **Tati (dúvida):** `fim` — P: "Isso ainda é combinação?" / R: "É combinação com repetição. Hoje: itens iguais em caixas diferentes."

### Passo 2 — `bolinhas-e-barras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6
- **Widget:** `grade_resultados` (modo bolinhas-e-barras) — fileira ●●●| com a barra (c1) arrastável entre as 4 posições; as caixas em cima se atualizam. Emite `distribuicoes_vistas`.
- **Sliders:** nenhum
- **Paco (abertura):** "Escreva cada jeito como bolinhas e uma barra: ●●|● quer dizer 2 e 1. Arraste a barra por todas as posições."
- **Interação do aluno:** arrasta a barra; cada posição nova entra na lista.
- **Conclusão:** `distribuicoes_vistas ≥ 4`
- **Paco (conclusão):** "Cada jeito é só escolher onde fica a barra entre 4 lugares. Por isso são 4."

### Passo 3 — `tres-caixas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `grade_resultados` (modo bolinhas-e-barras) — 3 bolinhas e 2 barras; o aluno arrasta as duas barras. Contador C(5, 2) aparece depois de 6 fileiras.
- **Sliders:** nenhum
- **Paco (abertura):** "Com 3 crianças são 2 barras entre as bolinhas. Quantas fileiras de 5 símbolos dá para montar?"
- **Interação do aluno:** monta fileiras diferentes arrastando as barras.
- **Conclusão:** `distribuicoes_vistas ≥ 6`
- **Paco (conclusão):** "Basta escolher 2 lugares de 5 para as barras: C(5, 2) = 10 jeitos."

### Passo 4 — `pelo-menos-uma`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `grade_resultados` (modo caixas) — 5 balas, 3 crianças; chave "cada uma ganha pelo menos 1": ligada, uma bala vai para cada caixa (c4) e sobram 2 bolinhas e 2 barras. Emite `regra_ligada`.
- **Sliders:** nenhum
- **Paco (abertura):** "E se cada criança precisar ganhar pelo menos uma bala? Ligue a regra e veja quanto sobra para distribuir."
- **Interação do aluno:** liga a chave e vê 3 balas irem uma para cada caixa.
- **Conclusão:** `regra_ligada ≥ 1`
- **Paco (conclusão):** "Dê uma bala para cada uma primeiro. Sobram 2, e elas se distribuem livremente: C(4, 2) = 6 jeitos."
- **Tati (dúvida):** `fim` — P: "E se forem 2 balas para 3 crianças?" / R: "Aí é impossível dar pelo menos uma para cada. O total é 0."

### Passo 5 — `desafio-equacao`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — três caixas rotuladas x, y, z e 4 bolinhas.
- **Paco (abertura):** "Uma equação também é distribuição: cada variável é uma caixa."
- **Enunciado:** "Quantas soluções com números naturais tem x + y + z = 4?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a64` | 64 | não | "64 = 4³ trataria as unidades como diferentes. Elas são iguais: C(6, 2) = 15." | 4 bolinhas numeradas, depois os números somem |
| `a4` | 4 | não | "4 é o total a distribuir. Fileira com 4 bolinhas e 2 barras: C(6, 2) = 15." | fileira ●●●●|| |
| `a15` | 15 | **sim** | "Isso. 6 símbolos, 2 lugares para as barras: C(6, 2) = 15." | fileira com as 2 barras destacadas em c1 |
| `a12` | 12 | não | "12 esquece as soluções com zero. Com naturais, o zero vale: C(6, 2) = 15." | caixa vazia piscando |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — fileira ●●|●| com caixas 2, 1, 0.
- **Fórmula:** `total`→c3 · `=` · `C(` · `n`→c1 · `+` · `k`→c2 · `− 1, k)`
- **Definições:** "Combinação com repetição: escolher k itens de n tipos, podendo repetir tipo." · "Bolinhas e barras: k bolinhas e n − 1 barras numa fileira de n + k − 1 símbolos." · "Pelo menos um: entregue um a cada caixa e distribua o resto."
- **Paco (abertura):** "Toda distribuição é uma fileira de bolinhas e barras. Por isso contar distribuições é escolher os lugares das bolinhas."
- **Dica (hint):** "Toque em uma letra para ver o que ela conta na fileira."

**Frase de encerramento (outro):** "Você transformou distribuições em fileiras de bolinhas e barras, e contou tudo com uma única combinação."

## i) Treino pós-aula

### Fáceis

#### F1 — `duas-bolas-duas-caixas`
- **Enunciado:** "De quantos jeitos 2 bolas iguais podem ser colocadas em 2 caixas?"
- **Conta de conferência:** 2+0, 1+1, 0+2 = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. 2 e 0, 1 e 1, 0 e 2." |
| `a4` | 4 | não | "4 = 2² trata as bolas como diferentes. Iguais, são 3 jeitos." |
| `a2` | 2 | não | "Faltou o 1 e 1. São 3 jeitos." |
| `a1` | 1 | não | "Há mais de um: 2 e 0, 1 e 1, 0 e 2. São 3." |

#### F2 — `ler-fileira`
- **Enunciado:** "Na fileira ●|●●, quantas bolinhas ficaram na segunda caixa?"
- **Conta de conferência:** depois da barra há 2 bolinhas

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | **sim** | "Certo. Depois da barra vêm 2 bolinhas." |
| `a1` | 1 | não | "1 é a primeira caixa, antes da barra. A segunda tem 2." |
| `a3` | 3 | não | "3 é o total. A segunda caixa, depois da barra, tem 2." |
| `a0` | 0 | não | "A segunda caixa é o que vem depois da barra: 2 bolinhas." |

#### F3 — `barras-para-4`
- **Enunciado:** "Quantas barras são necessárias para separar 4 caixas?"
- **Conta de conferência:** n − 1 = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. Entre 4 caixas há 3 divisões." |
| `a4` | 4 | não | "Com 4 barras surgiriam 5 caixas. Para 4 caixas: 3 barras." |
| `a5` | 5 | não | "5 barras fariam 6 caixas. Para 4 caixas: 3 barras." |
| `a2` | 2 | não | "2 barras separam só 3 caixas. Para 4: 3 barras." |

#### F4 — `caixas-diferentes`
- **Enunciado:** "As balas são iguais. Dar 2 para Ana e 1 para Bia é diferente de dar 1 para Ana e 2 para Bia?"
- **Conta de conferência:** as caixas (crianças) são distintas

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sim` | Sim | **sim** | "Isso. As balas são iguais, mas as crianças não: 2 e 1 não é 1 e 2." |
| `nao` | Não | não | "As crianças são diferentes, então 2 e 1 é outra distribuição que 1 e 2." |

### Médias

#### M1 — `quatro-balas-duas`
- **Enunciado:** "De quantos jeitos 4 balas iguais podem ser repartidas entre 2 crianças?"
- **Conta de conferência:** C(5, 1) = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Certo. A barra pode ficar em 5 lugares: 4+0 até 0+4." |
| `a16` | 16 | não | "16 = 2⁴ trata as balas como diferentes. Iguais: 5 jeitos." |
| `a4` | 4 | não | "Faltou um extremo: 4 e 0 e 0 e 4 contam. São 5." |
| `a8` | 8 | não | "8 seria 4 · 2. A barra tem 5 lugares: 5 jeitos." |

#### M2 — `tres-bolas-sabores`
- **Enunciado:** "Uma taça leva 3 bolas, escolhidas entre 3 sabores, podendo repetir. Quantas taças diferentes?"
- **Conta de conferência:** C(3 + 3 − 1, 3) = C(5, 3) = 10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 | **sim** | "Isso. 3 bolinhas e 2 barras: C(5, 2) = 10." |
| `a27` | 27 | não | "27 = 3³ conta a ordem das bolas. Na taça a ordem não importa: 10." |
| `a1` | 1 | não | "1 seria sem repetir sabor. Podendo repetir: C(5, 2) = 10." |
| `a6` | 6 | não | "6 esquece taças como 3 bolas do mesmo sabor. Com elas: 10." |

#### M3 — `x-mais-y-6`
- **Enunciado:** "Quantas soluções com naturais tem x + y = 6?"
- **Conta de conferência:** x de 0 a 6: 7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a7` | 7 | **sim** | "Certo. x vai de 0 a 6, e y completa: 7 soluções." |
| `a6` | 6 | não | "Faltou o zero: x = 0 também vale. São 7." |
| `a36` | 36 | não | "36 seria escolher x e y livres. Com a soma fixa em 6: 7." |
| `a5` | 5 | não | "5 conta só positivos. Com naturais o zero entra: 7." |

### Desafios

#### D1 — `xyz-5`
- **Enunciado:** "Quantas soluções naturais tem x + y + z = 5?"
- **Conta de conferência:** C(7, 2) = 21

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a21` | 21 | **sim** | "Isso. 5 bolinhas e 2 barras: C(7, 2) = 21." |
| `a15` | 15 | não | "15 é C(6, 2), com uma bolinha a menos. Para 5: C(7, 2) = 21." |
| `a10` | 10 | não | "10 é C(5, 2), sem contar as barras na fileira. São 7 símbolos: 21." |
| `a125` | 125 | não | "125 = 5³ não respeita a soma 5. A conta é C(7, 2) = 21." |

#### D2 — `seis-balas-pelo-menos-uma`
- **Enunciado:** "6 balas iguais para 3 crianças, cada uma com pelo menos uma. Quantas distribuições?"
- **Fala do Paco:** "Entregue uma bala para cada criança antes de contar."
- **Conta de conferência:** sobram 3: C(5, 2) = 10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 | **sim** | "Certo. Sobram 3 balas para 3 crianças: C(5, 2) = 10." |
| `a28` | 28 | não | "28 = C(8, 2) ignora a regra. Dando uma a cada, sobram 3: C(5, 2) = 10." |
| `a20` | 20 | não | "Depois de dar uma a cada, a fileira tem 5 símbolos: C(5, 2) = 10." |
| `a3` | 3 | não | "3 são as balas que sobram. Distribuí-las dá C(5, 2) = 10." |

#### D3 — `positivos-x-y-5`
- **Enunciado:** "Quantas soluções com inteiros positivos tem x + y = 5?"
- **Conta de conferência:** x de 1 a 4: 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 | **sim** | "Isso. 1+4, 2+3, 3+2, 4+1: positivos tiram o zero." |
| `a6` | 6 | não | "6 inclui 0 + 5 e 5 + 0. Positivos não aceitam zero: 4." |
| `a5` | 5 | não | "5 inclui um caso com zero. Só positivos: 4." |
| `a1` | 1 | não | "Há mais de um par: 1+4, 2+3, 3+2, 4+1. São 4." |

#### D4 — `pasteis`
- **Enunciado:** "Você compra 4 pastéis escolhendo entre 3 sabores, podendo repetir. Quantas compras diferentes?"
- **Conta de conferência:** C(4 + 3 − 1, 2) = C(6, 2) = 15

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a15` | 15 | **sim** | "Certo. 4 bolinhas e 2 barras: C(6, 2) = 15." |
| `a81` | 81 | não | "81 = 3⁴ conta a ordem de compra. No pacote a ordem não importa: 15." |
| `a4` | 4 | não | "4 são os pastéis. As compras são C(6, 2) = 15." |
| `a12` | 12 | não | "12 = 4 · 3 não é contagem de distribuições. Bolinhas e barras: 15." |

#### D5 — `zero-balas`
- **Enunciado:** "De quantos jeitos 0 balas podem ser distribuídas entre 3 crianças?"
- **Fala do Paco:** "Última. Pense na fileira só de barras."
- **Conta de conferência:** C(2, 0) = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1` | 1 | **sim** | "Isso. Todas ficam sem bala: um jeito só, a fileira ||." |
| `a0` | 0 | não | "Existe um jeito: ninguém ganha nada. Total 1." |
| `a3` | 3 | não | "3 são as crianças. Com 0 balas, só há a distribuição vazia: 1." |
| `inf` | Infinitos | não | "Sem balas não há o que variar. É 1 jeito só." |

### Vestibular

**B42 (19/11/2026): questões de provas oficiais conferidas no PDF e inseridas na aula** (registro em `docs/revisao/vestibular-b42.md`). Os espaços PENDENTE-FONTE abaixo continuam abertos para outras questões.

#### `ita-2021-balas` — ITA 2021
- **Enunciado:** "De quantos modos se distribuem 48 balas iguais nas tigelas A, B, C e D, com pelo menos 3 em cada e B com tantas quanto D?"
- **Fala do Paco:** "Fixe B = D = k e conte os modos de completar A + C = 48 − 2k com pelo menos 3 em cada. Depois some em k."
- **Fonte:** ITA 2021 (adaptada); 1ª fase, Questão 53: enunciado resumido (balas iguais explicitado); alternativas e gabarito oficial (B) mantidos. https://www.vestibular.ita.br/provas/2021_fase1.pdf · https://www.vestibular.ita.br/provas/gabarito_2021.pdf
- **Alternativas:** 190 · **361** · 722 · 1083 · 1444
- **Conta de conferência:** B = D = k (3 a 21); A + C = 48 − 2k com A, C ≥ 3: 43 − 2k modos; 37 + 35 + … + 1 = 361 (B).

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** soluções naturais de x + y + z = k.
- **Onde procurar:** Fuvest, ITA, Unicamp ("soluções inteiras não negativas").

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** compra com repetição de sabores ou tipos.
- **Onde procurar:** UFRGS, PUC-SP ("tipos de salgados", "sorvete").

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** distribuição com "pelo menos um em cada".
- **Onde procurar:** EsPCEx, Mackenzie, UERJ.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** distinguir combinação simples e com repetição.
- **Onde procurar:** ENEM ou UFPR com escolha de itens repetíveis.

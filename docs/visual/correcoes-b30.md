# Correções B30 — gráfico da tangente no ciclo e áreas no sólido composto (16/11/2026, Claude Code #2)

Capturas em 400 × 860, na pasta `C:\Users\mkf10\projetos\capturas-b30`:

- `antes` e `depois`: os passos alvo com o slider em cada valor, feitos com `ferramentas-b27\captura-slider.mjs`;
- `todas-antes` e `todas-depois`: o estado inicial de todas as aulas dos dois widgets.

**Porta:** o briefing indicava 5272, mas outro processo subia e derrubava servidores nela durante a sessão. Uma subida minha falhou com "Port 5272 is already in use" e, segundos depois, a porta estava livre. Para não medir o servidor errado, usei a 5301. Todas as capturas "antes" foram refeitas nela com o código ainda sem mudanças.

## 1. `ciclo_trigonometrico`: `grafico: "tg"` (`funcoes-trigonometricas` p3, `grafico-tangente`)

- **Antes:** o widget só tinha `grafico: "sen" | "cos"`. O p3 mostrava apenas o ciclo com a reta tangente, e a B24a tinha trocado a fala do roteiro por uma sobre "a altura na reta tangente".
- **Widget** (`src/widgets/common/ciclo/params.ts`, `desenho.ts`): novo valor `"tg"` no enum. Sem ele, nada muda: a função do seno e do cosseno ficou intocada, e a da tangente é uma função nova, `desenharGraficoTg`. Ela desenha:
  - **Assíntotas:** linhas tracejadas em π/2 e 3π/2.
  - **Ramos:** cortados em |tg| ≤ 1,3 pela função `ramosTangente`, que dá os ramos [0; a], [π − a; π + a] e [2π − a; 2π], com a = atan 1,3. Assim a curva nunca risca a assíntota.
  - **Curva:** a guia cinza cobre de 0 a 2π, e o trecho colorido vai até o ângulo atual.
  - **Marcos:** π/2, π, 3π/2 e 2π.
  - **Ponto e valor:** o ponto do gráfico fica ligado ao ponto da reta x = 1 por uma linha tracejada (a altura da reta tangente vira a altura do gráfico). O valor `tg …` fica num chip junto ao ponto do gráfico, e por isso o chip do ciclo não aparece nesse modo (ficaria repetido).
  - **Em 90° (e 270°):** a nota "não existe" fica no alto da assíntota, à direita da linha tracejada.
- **Aula:** `"grafico": "tg"` no p3, e a fala do roteiro voltou, em forma de pergunta:
  - intro: "Na tangente, cos 90° = 0 cria uma barreira vertical em π/2 (90°). Avance até 180° (π): a curva já começou a se repetir?";
  - conclusão: "Sim: a tangente se repete a cada π (180°), metade do período do seno. E como sobe e desce sem fim, sua imagem é todos os reais."
- **Capturas** `depois\funcoes-trigonometricas-p3-theta=*.png`:

  | θ | o que se vê |
  |---|---|
  | 0° | `tg 0` na origem do gráfico |
  | 45° | `tg 1`, com a linha tracejada vindo da reta tangente |
  | 90° | "não existe" na assíntota; o primeiro ramo sobe e para antes dela |
  | 135° | `tg −1` no segundo ramo |
  | 180° | `tg 0` em π, com o segundo ramo inteiro colorido: a altura voltou a zero e o desenho começa a se repetir |

## 2. `solido_3d` `composicao` `cavidade`: `areas` (`areas-e-volumes-por-composicao` p3)

- **Antes:** a fala dizia que a área aumenta, mas a figura só tinha os chips de volume.
- **Widget** (`src/widgets/common/solido/params.ts`, `cenas.ts`): o novo `areas` é booleano opcional, com padrão `false`, que deixa a figura como antes. Com ele ligado, vale só para a montagem `cavidade`:

  | slider `cavar` | o que aparece |
  |---|---|
  | 0% | borda da tampa realçada em c3 e o chip "área da tampa 9π" |
  | 50% | também "área do funil 15π" (c4) |
  | 100% | "área 42π − 9π + 15π = 48π", e a conta do volume vira "volume 36π − 12π = 24π" para não se confundir com a da área |

  - A função `areasCavidade(r, h, hc)` faz as contas: tampa πr², funil πr·√(r² + hc²), peça inteira 2πr² + 2πrh. Ela também gera a métrica `area_pi`.
  - **Valores do roteiro:** r = 3, h = 4, hc = 4, g = 5. A tampa é π·3² = 9π, o funil π·3·5 = 15π e a peça 18π + 24π = 42π, então 42π − 9π + 15π = 48π.
  - A borda da tampa é desenhada com segmentos, porque um polígono fica por baixo das malhas e a face do cilindro o cobriria.
- **Aula:** `"areas": true` no p3. Com os números agora na figura, a conclusão voltou ao roteiro: "A área aumenta! Tiramos a tampa plana de 9π, mas abrimos lá dentro uma parede inclinada maior (πrg = 15π)." Isso reverte o ajuste da B25c, que tinha tirado os números porque a figura não os mostrava.
- **Capturas** `depois\areas-e-volumes-por-composicao-p3-cavar=0/50/100.png` conferidas: os chips aparecem conforme o slider, sem sobreposição. A figura do desafio que também usa `cavidade` não liga `areas` e ficou igual.

## Testes novos e prova de que falham sem a mudança

- **`ciclo.test.ts`:**
  - o schema aceita `"tg"`, e `"sen"` continua como antes;
  - `ramosTangente`: os ramos ficam dentro de |tg| ≤ 1,3, não contêm π/2 nem 3π/2, e o 2º ramo é o 1º deslocado de π;
  - com o gráfico, `tg 1` aparece uma vez só em 45° e "não existe" em 90°; sem o gráfico, o ciclo segue com `tg 1` e "tg não existe".
- **`solido.test.ts`:** a conta 42π − 9π + 15π = 48π; o placar padrão igual ao de antes; os placares com `areas` em 0, 0,5 e 1.
- **Aulas:**
  - `funcoes-trigonometricas.test.ts` confere o p3 com `grafico: "tg"`, a fala em pergunta e tg 0 = tg π = 0;
  - `areas-e-volumes-por-composicao.test.ts` confere o p3 com `areas: true`, a conta da área no fim e a conclusão com 9π e 15π.
- **Prova:** com o `ciclo/params.ts` do último commit no lugar, os testes falharam (2 falhas em 40). Com o bloco de áreas do sólido desligado, também (1 falha em 32). Com o código restaurado, conferido por `cmp`, todos passaram.

## Comparação de todas as aulas dos dois widgets

- **O que foi comparado:** o estado inicial de todos os passos das 17 aulas que usam `ciclo_trigonometrico` ou `solido_3d`, em 85 capturas. A comparação foi pixel a pixel, com tolerância de 8 por canal.
- **Resultado:**
  - 20 capturas saíram idênticas.
  - 63 só diferem na área do mascote animado.
  - 2 mudam fora dela, e são exatamente as alvo: `funcoes-trigonometricas-p3` e `areas-e-volumes-por-composicao-p3`.
- `esferas` não foi tocada (frente B29b). As capturas dela entram na comparação só como leitura.

## Validação

- `npx vitest run src/widgets/common/ciclo src/widgets/common/solido` mais os testes das 17 aulas: 19 arquivos, 293 testes, todos passaram.
- `npm run lint:content`: "conteúdo ok".
- `npm run typecheck`: terminou com código 0, sem erros.

## Arquivos

- `src/widgets/common/ciclo/params.ts`, `desenho.ts` e `ciclo.test.ts`
- `src/widgets/common/solido/params.ts`, `cenas.ts` e `solido.test.ts`
- `docs/GUIA-CAPITULOS.md`: §5.7 (`areas`) e §5.11 (tabela de `grafico` e acréscimo `grafico: "tg"`)
- `content/geometria/trigonometria/funcoes-trigonometricas/aula-01.json` (p3) e `src/conteudo/funcoes-trigonometricas.test.ts`
- `content/geometria/geometria-espacial/areas-e-volumes-por-composicao/aula-01.json` (p3) e `src/conteudo/areas-e-volumes-por-composicao.test.ts`
- `docs/visual/correcoes-b30.md`

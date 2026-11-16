# Revisão de vestibular com imagem — Frente B23a (16/11/2026, Claude Code #2)

Cada questão foi refeita a partir da imagem em `public/vestibular/` e conferida com `correctAlternative` do cache `enem-cache/matematica.json`. As 6 bateram e foram inseridas em `treino.vestibular`. Os rótulos das alternativas foram conferidos por script: são iguais ao texto do cache, sem o ponto final.

- `matrizes-determinantes-sistemas` | ENEM 2019/144 | A | somas das colunas (dias) 3+3+2+3+0 = 11, 2+2+2+2+2 = 10, 0+4+2+4+0 = 10, 1+1+3+1+4 = 10, 2+2+2+0+4 = 10: segunda-feira | `/vestibular/enem-2019-144-1.png`
- `matrizes-determinantes-sistemas` | ENEM 2021/157 | E | destino = coluna j; colunas somam 4, 8, 10, 11, 12: região 5. As linhas, que são a origem, somam 13, 11, 7, 7, 7 (distrator A) | `/vestibular/enem-2021-157-5.png`
- `matrizes-determinantes-sistemas` | ENEM 2021/164 | B | 12c+4k+3s+m = 18c+3k+2s+m = 10 dá k+s = 6c; a viagem II (18, 3, 2) sem 1 calça e 1 sapato fica com 18+6 = 24 camisetas. O teste confere com três valores de (c, k) e mala m livre | `/vestibular/enem-2021-164-1.png`
- `distribuicao-de-frequencias-e-amostragem` | ENEM 2018/145 | D | (0·50+1·17+2·15+3·10+4·6+5·2)/100 = 111/100 = 1,11 | `/vestibular/enem-2018-145-1.png`
- `distribuicao-de-frequencias-e-amostragem` | ENEM 2021/151 | C | histograma 5, 10, 5, 15, 20, 15, 15, 10, 5, 5 (total 105); acumulado até 700 mil = 35 < 52,5 e até 800 mil = 55 ≥ 52,5: p = 800 | `/vestibular/enem-2021-151-1.png`
- `distribuicao-de-frequencias-e-amostragem` | ENEM 2023/140 | E | frequências 10, 10, 55, 25, 0, 50, 10 (total 160); moda 3; 80º e 81º valores = 4; média 665/160 ≈ 4,16; moda < mediana < média | `/vestibular/enem-2023-140-1.png`

## Observações

- **Feedbacks de 2021/164:** para 22, 26, 33 e 39 não achei uma conta errada típica que leve exatamente a esses números. Em vez de inventar uma, o feedback diz que a mala fica abaixo dos 10 kg (22) ou passa deles (26, 33, 39) e mostra a troca de 6 camisetas por 1 calça + 1 sapato. Nas outras 5 questões, cada feedback errado aponta o erro que leva ao valor: somar linhas em vez de colunas, somar só os valores sem ponderar, dividir por 50 em vez de 100, confundir a frequência 55 com a moda, parar na barra mais alta para a mediana etc.
- **Testes:**
  - `src/conteudo/distribuicao-de-frequencias-e-amostragem.test.ts` tinha `semVestibular(L)`, que exige vestibular vazio. Troquei por um teste que confere as 3 contas. O arquivo não estava na lista da B23, mas sem a troca o teste do capítulo falharia.
  - `src/conteudo/matrizes-determinantes-sistemas.test.ts` ganhou o teste equivalente para as 3 questões.
- **Roteiros:**
  - `docs/planos/matrizes-determinantes-sistemas.md`: V1 = 2019/144, V2 = 2021/157, V4 = 2021/164. V3 (domínio, sinal ou caso de fronteira) segue PENDENTE-FONTE.
  - `docs/planos/distribuicao-de-frequencias-e-amostragem.md`: V1 = 2018/145, V2 = 2023/140, V3 = 2021/151. A habilidade original de V2 era amostra viciada e ficou anotada como sem candidata. V4 (total a partir de porcentagem) segue PENDENTE-FONTE.
- Não mexi em `public/vestibular/` nem em `docs/fontes-candidatas/`.

## Validação

- `npx vitest run src/conteudo/matrizes-determinantes-sistemas.test.ts src/conteudo/distribuicao-de-frequencias-e-amostragem.test.ts`: 2 arquivos, 20 testes, todos passaram.
- `npm run lint:content`: "conteúdo ok". O lint também confere que as 6 imagens existem.
- `npm run typecheck`: sem erros.

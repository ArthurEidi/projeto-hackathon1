# Auditoria B45d1 — Sólidos de Revolução

As duas questões foram aprovadas. Os gabaritos da seção Matemática nas cópias oficiais marcam **B na UFRGS 2025 Q70** e **E na UFRGS 2022 Q55**. Conferi as páginas renderizadas dos PDFs em `provas-oficiais/ufrgs-2025-1dia` e `provas-oficiais/ufrgs-2022-1dia`, com a ordem e o conteúdo das cinco alternativas de cada item. Os endereços institucionais tiveram falha de conexão nesta rodada. A conferência usou os PDFs e os HTMLs de gabarito já baixados. O [registro da coleta original](vestibular-b45d1.md) contém os tamanhos e os resultados HTTP obtidos na inserção.

- **UFRGS 2025, 1º dia, Q70.** A questão está na p. 37, tanto no PDF quanto no rodapé impresso. A pergunta abreviada preserva o quadrado de lado `a`, o eixo em uma diagonal e a rotação completa. [Caderno oficial, p. 37](https://www.ufrgs.br/coperse/wp-content/uploads/2024/12/Prova-1o-DIA.pdf#page=37) · [Gabarito oficial de Matemática](https://vestibular.ufrgs.br/cv2025/gabaritos/#matematica)
- **UFRGS 2022, 1º dia, Q55.** A questão está na p. 29 do PDF e do caderno impresso. A figura mostra o triângulo equilátero de lado 1 e o eixo passando por A, paralelo a BC. Essas relações determinam toda a configuração e foram mantidas em texto. Uma volta ao redor desse eixo mantém BC paralelo a ele. [Caderno oficial, p. 29](https://www.ufrgs.br/coperse/wp-content/uploads/2022/03/PROVAS-1o-DIA.pdf#page=29) · [Gabarito oficial de Matemática](https://vestibular.ufrgs.br/cv2022/gabaritos/#matematica)

## Conta e nível

**2025 Q70.** As duas diagonais do quadrado medem `a√2`, são perpendiculares e se dividem ao meio. A diagonal do giro serve de eixo e seus extremos viram os ápices de dois cones. Cada cone tem altura `a√2/2` e raio `a√2/2`, medido na outra diagonal. O volume de um cone é `(π/3)·(a√2/2)³ = a³π√2 / 12`. Somando os dois, **B, `a³π√2 / 6`**. A questão retoma a composição dos dois cones da aula. O D4 pratica o giro de um triângulo isósceles em torno da hipotenusa e o item oficial pede também obter as medidas a partir da diagonal do quadrado.

**2022 Q55.** A distância perpendicular de BC ao eixo é a altura do triângulo, `R = √(1 − (1/2)²) = √3/2`. Girar BC gera a superfície lateral de um cilindro de altura `1`. Os vazios gerados pelas regiões entre o eixo e os lados AB e AC são cones de raio `R` e altura `1/2` cada. O cilindro inteiro tem volume `πR² = 3π/4`, e os dois vazios somam `2·πR²·(1/2)/3 = π/4`. A diferença dá **E, `π/2`**. Por Pappus, a área do perfil é `√3/4` e o centroide está a `2R/3 = √3/3` do eixo, que toca apenas o vértice. O produto `(√3/4)·2π·(√3/3)` também dá `π/2`. A aula trabalha volume externo menos vazio e introduz Pappus no treino. A composição com duas cavidades é um passo a mais adequado ao vestibular.

## Falas e feedbacks

As falas aparecem antes de Verificar. Na Q70, Paco pede para traçar as diagonais e observar as distâncias dos vértices ao eixo. Na Q55, pede para imaginar o giro de BC e observar o espaço entre os lados inclinados e o eixo. O aluno ainda precisa identificar os sólidos e calcular suas medidas.

| Questão | Alternativa | Conferência do feedback |
| --- | --- | --- |
| 2025 Q70 | A, `a³π√2 / 12` | Contar uma metade do sólido dá o volume de um único cone. O feedback recupera a segunda metade e B. |
| 2025 Q70 | C, `a³π√2 / 4` | Substituir o fator `1/3` por `1/2` em ambos os cones dá `2·(π/2)·(a√2/2)³ = a³π√2 / 4`. |
| 2025 Q70 | D, `a³π√2 / 3` | Usar lado `a` como raio e manter a meia diagonal como altura dá `2·(π/3)·a²·(a√2/2) = a³π√2 / 3`. O feedback explicita qual medida foi mantida. |
| 2025 Q70 | E, `a³π√2 / 2` | Omitir `1/3` nos dois cones dá `2π·(a√2/2)³ = a³π√2 / 2`, volume do cilindro que contém os dois. |
| 2022 Q55 | A, `2π` | Usar `R = √3` no cilindro e nos dois cones dá `π·3 − 2·π·3·(1/2)/3 = 2π`. A explicação antiga apenas refutava o valor. |
| 2022 Q55 | B, `3π/2` | Quadrar só o numerador de `√3/2` dá `R² = 3/2`. Contar o cilindro de altura 1 sem descontar as cavidades dá `3π/2`. O texto anterior também propunha `R = √3` apenas no cilindro, o que daria `3π`. |
| 2022 Q55 | C, `π/4` | Calcular só as cavidades dá `2·π·(3/4)·(1/2)/3 = π/4`. O feedback subtrai esse valor do cilindro. |
| 2022 Q55 | D, `π/3` | Subtrair `1/2` no lugar de `(1/2)²` em Pitágoras dá `R² = 1/2`. A composição com esse raio dá `(2/3)·π·(1/2) = π/3`. A explicação antiga apenas refutava o valor. |

O feedback da alternativa correta de 2025 soma dois cones. O de 2022 calcula o volume do cilindro e subtrai as duas cavidades. Todos os distratores mostrados ao aluno terminam com o valor correto. Os testes agora verificam os cinco rótulos na ordem oficial e a marcação exclusiva de B e E. As contas usam lado 3 para o quadrado e comparam os dois métodos de volume para o triângulo.


## Validação

O roteiro repete as duas questões do JSON e mantém V3 e V4 pendentes de fonte. Conferi as opções, as URLs, os textos em UTF-8 e as contas dos oito distratores com aritmética exata.

Passaram `npm run typecheck` e `npm run lint:content`. O lint de conteúdo usou um ajuste temporário de processo para contornar `uv_os_get_passwd` no Windows. O lint de planos aprovou este roteiro, com 14 de 14 questões preenchidas válidas, e apontou erros nos roteiros de função modular e relações métricas no triângulo retângulo.

A suíte completa (`npx vitest run`) passou com 2.173 testes em 135 arquivos. A execução da aula e das verificações do motor de conteúdo passou com 340 testes em dois arquivos.

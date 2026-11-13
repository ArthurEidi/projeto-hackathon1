# Em andamento: quem está fazendo o quê

Este arquivo é a **reserva de frentes**. Serve para duas máquinas (ou dois coordenadores) não editarem os mesmos arquivos.

## Regras

1. **Antes de começar:** `git pull --rebase origin main` e leia a tabela abaixo.
2. **Reserve antes de trabalhar:** escolha uma frente livre de `docs/PROXIMOS-PASSOS.md`, acrescente uma linha aqui, faça commit só deste arquivo e `git push`. Se o push for recusado, alguém reservou antes: puxe de novo e escolha outra.
3. **Fique dentro dos arquivos da sua frente.** A coluna "Arquivos" é o limite. Precisa mexer fora? Anote em "Pedidos entre máquinas" e deixe para o dono.
4. **Arquivos com dono fixo** (só a máquina indicada edita, sempre):
   - `content/taxonomy.json`, `src/widgets/common/**`, `src/engine/**`, `src/steps/**`, `src/ui/**`, `scripts/**`, `package.json`, `CLAUDE.md`: **Máquina A**.
   - `docs/PROXIMOS-PASSOS.md` e este arquivo: as duas editam, sempre em commit próprio e pequeno, com pull antes.
5. **Publicar:** commits pequenos e frequentes (um por capítulo revisto ou por lote pequeno) e `npm run publicar` ao fim de cada lote. Nunca `push --force`, nunca reescrever histórico.
6. **Ao terminar a frente:** mova a linha para "Concluídas" com a data e o que ficou pendente.
7. Reserva sem commit novo há mais de 2 dias pode ser assumida por outra máquina, avisando em "Pedidos entre máquinas".

## Frentes reservadas

| Frente (nº em PROXIMOS-PASSOS) | Máquina / coordenador | Desde | Arquivos |
|---|---|---|---|
| 1. Revisão de texto: aritmética | A (Claude Code + agentes Maestri) | 13/11 | `content/aritmetica/**`, `docs/revisao/aritmetica.md` |
| 2. Revisão de texto: álgebra | A | 13/11 | `content/algebra/**`, `docs/revisao/algebra-*.md` |
| 3. Widgets (`maquinas_funcao`, acentos, `transformacao_plano`, `reta_numerica`) | A | 13/11 | `src/widgets/common/**`, GUIA §5, `WIDGETS-PENDENTES.md` |
| 4. Revisão de texto: geometria | **B: reservada para a segunda máquina** (confirme trocando esta linha pelo seu nome e data) | — | `content/geometria/**`, `docs/revisao/geometria-*.md` |
| 5. Conferência visual: geometria | **B: reservada para a segunda máquina** | — | `docs/visual/geometria.md`, `content/geometria/**` |

## Pedidos entre máquinas

Use para pedir algo em arquivo que não é seu (ex.: "widget X corta o rótulo no passo 3 de `elipse`"). Formato: data, quem pede, para quem, o quê.

- (vazio)

## Concluídas

- 13/11, A: os 103 capítulos escritos e registrados; 14 widgets; repositório publicado.

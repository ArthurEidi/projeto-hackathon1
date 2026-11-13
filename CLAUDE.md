# App de Matemática do Ensino Médio

App educativo (React 19 + TypeScript + Vite, sem backend). Cada capítulo é uma aula em JSON com passos interativos (widgets) e um treino de 16 questões. Foco: intuição visual e o método de 7 pilares (`docs/METODO.md`).

**Antes de qualquer coisa, leia `docs/PROXIMOS-PASSOS.md`**: lá estão o estado atual e a fila de trabalho em ordem de prioridade. Ao terminar uma sessão, atualize esse arquivo.

## Primeira vez nesta máquina

```bash
npm install
npm run lint:content && npm test && npm run typecheck   # tudo deve passar
npm run dev                                             # http://localhost:5173
```

Desenvolvido com Node 26 (não testado em versões anteriores). Python 3 só é usado pelos scripts auxiliares (`scripts/*.py`) e pelo Manim (opcional).

## Mapa do repositório

| Caminho | O que é |
|---|---|
| `docs/PROXIMOS-PASSOS.md` | Estado e fila de prioridades (comece aqui) |
| `docs/GUIA-CAPITULOS.md` | Formato do JSON de aula, receita de capítulo, contrato de widget, documentação de cada widget (§5) |
| `docs/METODO.md` | Os 7 pilares didáticos |
| `docs/CURRICULO.md` | Lista dos 104 conteúdos do EM |
| `docs/planos/<slug>.md` | Roteiro de cada capítulo (fonte do conteúdo da aula; gabaritos já conferidos) |
| `docs/WIDGETS-PENDENTES.md` | Especificação e prioridade dos widgets que faltam |
| `docs/REVISAO-GABARITOS.md` | Resultado da conferência às cegas dos gabaritos |
| `content/taxonomy.json` | Trilha: pilares, setores, unidades, aulas (só o coordenador edita) |
| `content/<pilar>/<setor>/<slug>/aula-01.json` | A aula |
| `src/conteudo/<slug>.test.ts` | Teste do capítulo (gabaritos por conta + passos completáveis) |
| `src/widgets/common/` | Widgets reutilizáveis (plano, reta, barras, grade, sólido, triângulo, ciclo, polígono, círculo) |
| `src/engine/` | Schema (zod), regras de texto, progresso |
| `scripts/` | Lints e `registra-capitulo.py` |

## Regras que valem sempre

1. **Validar antes de dizer que está pronto:** `npm run lint:content`, `npm test`, `npm run typecheck`. Antes de commit de widget ou de muitos capítulos, também `npm run build`.
2. **Nunca inventar fonte de vestibular.** Questão marcada `PENDENTE-FONTE` no roteiro fica fora da aula; `vestibular` pode ficar vazio.
3. **Regras de texto** (GUIA §2.4): o lint recusa emoji e setas como "↔" (use "⇔" ou palavras). Ids de slider só em minúsculas (`^\$[a-z0-9_]+$`).
4. **Pasta e `caminho.unidade` da aula = slug do roteiro.**
5. **Capítulo novo não cria widget.** Se o roteiro pede algo que o widget não faz, adapte ao que existe e anote a lacuna em `docs/PROXIMOS-PASSOS.md`.
6. **Propriedade de arquivos** (GUIA §4.1): quem escreve capítulo só toca `content/<...>/<slug>/` e `src/conteudo/<slug>.test.ts`; um único agente por vez mexe em `src/widgets/common/`; taxonomia, commits e build são do coordenador.
7. Commits pequenos, em português, um por capítulo ou widget. `git pull --rebase` antes de começar e `git push` ao terminar, porque duas máquinas trabalham neste repositório.

## Como registrar um capítulo entregue

```bash
python scripts/registra-capitulo.py <pilar>/<setor>/<slug> [icone] [--remove=unidade-provisoria]
npm run lint:content && npx vitest run src/conteudo/<slug>.test.ts && npm run typecheck
```

Confira depois o título e a posição da unidade em `content/taxonomy.json` (o script acrescenta no fim do setor).

# App de Matemática do Ensino Médio

App educativo (React 19 + TypeScript + Vite, sem backend). Cada capítulo é uma aula em JSON com passos interativos (widgets) e um treino de 16 questões. Foco: intuição visual e o método de 7 pilares (`docs/METODO.md`).

**Antes de qualquer coisa, leia nesta ordem:**

1. `docs/EM-ANDAMENTO.md`: quem está fazendo o quê e as regras para duas máquinas não entrarem em conflito. **Reserve a sua frente ali antes de editar qualquer arquivo.**
2. `docs/PROXIMOS-PASSOS.md`: estado atual e fila de trabalho em ordem de prioridade, com o que cada frente pode editar.

Se você está na segunda máquina, as frentes 4 e 5 (geometria) já estão reservadas para você. Ao terminar uma sessão, atualize os dois arquivos.

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
| `docs/EM-ANDAMENTO.md` | Reserva de frentes entre máquinas (comece aqui) |
| `docs/PROXIMOS-PASSOS.md` | Estado e fila de prioridades |
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
7. **Publicar sempre com `npm run publicar`** (valida tudo, rebaseia sobre o remoto e só então envia; se algo falhar, nada vai ao GitHub). Commits pequenos, em português. `git pull --rebase origin main` antes de começar. Nunca `push --force`.
8. **Arquivos com dono fixo** (`content/taxonomy.json`, `src/widgets/common/**`, `src/engine/**`, `scripts/**`): só a Máquina A edita. Veja `docs/EM-ANDAMENTO.md`.

## Como registrar um capítulo entregue (só Máquina A)

```bash
python scripts/registra-capitulo.py <pilar>/<setor>/<slug> [icone] [--remove=unidade-provisoria]
npm run lint:content && npx vitest run src/conteudo/<slug>.test.ts && npm run typecheck
```

Confira depois o título e a posição da unidade em `content/taxonomy.json` (o script acrescenta no fim do setor).

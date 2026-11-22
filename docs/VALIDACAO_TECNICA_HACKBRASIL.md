# Validação técnica da base: Hack Brasil 2026

Data: 21/11/2026. Continuação de `docs/AUDITORIA_BASE_HACKBRASIL.md`.

Nesta etapa, **nenhum arquivo de código, conteúdo ou configuração foi alterado.** As únicas mudanças no disco são as autorizadas ou inevitáveis:

- `node_modules/`, criado por `npm ci`;
- `dist/`, criado por `npm run build`;
- cache do Vite em `node_modules/.vite/`, criado pelo servidor de desenvolvimento;
- este relatório.

`node_modules/` e `dist/` estão no `.gitignore`. Conferi o `package.json` e o `package-lock.json` por SHA-256 antes e depois da instalação: estão idênticos.

Legenda: **[EXECUTADO]** = rodei e vi o resultado; **[INSPECIONADO]** = li no código ou na documentação; **[PENDENTE]** = não foi possível confirmar.

---

## 1. Ambiente identificado

| Item | Encontrado | Exigência real |
|---|---|---|
| Node.js | v24.14.0 [EXECUTADO] | `package.json` **não tem `engines`**. Não há `.nvmrc`, `.node-version` nem `.npmrc`. "Node 26" aparece só em `CLAUDE.md`, no `README.md` e no workflow `.github/workflows/pages.yml:27`. |
| npm | 11.9.0 | — |
| Gerenciador de versões | nenhum (nvm, fnm e volta ausentes) | — |
| Lockfile | `package-lock.json`, `lockfileVersion` 3, 99 pacotes, todos de `registry.npmjs.org` [INSPECIONADO] | — |

**Node 26 não é exigência técnica.** Os `engines` declarados no lockfile pelas ferramentas são estes [INSPECIONADO]:

| Pacote | Versão | `engines.node` | Node 24? |
|---|---|---|---|
| vite | 8.3.6 | `^20.19.0 \|\| >=22.12.0` | sim |
| rolldown (bundler do Vite) | 1.2.16 | `^20.19.0 \|\| >=22.12.0` | sim |
| @vitejs/plugin-react | 6.2.1 | `^20.19.0 \|\| >=22.12.0` | sim |
| vitest | 5.1.0 | `^22.12.0 \|\| ^24.0.0 \|\| >=26.0.0` | sim |
| typescript | 5.9.3 | `>=14.17` | sim |
| tsx | 4.23.15 | `>=18.0.0` | sim |
| esbuild | 0.28.2 | `>=18` | sim |

Node 24 atende todas as ferramentas, e a execução confirmou isso (§3 e §4). Node 26 é só a versão em que o projeto foi desenvolvido.

**Scripts de instalação (risco):** só `esbuild` (postinstall que valida o binário da plataforma, `@esbuild/win32-x64`, que já está no lockfile) e `fsevents` (só macOS, ignorado no Windows). Nenhum script do próprio projeto (`preinstall`/`postinstall`) [INSPECIONADO].

**Serviços externos:** nenhum em tempo de execução, exceto a fonte Nunito do Google Fonts (`index.html:8-9`). O app não tem backend, API ou banco [INSPECIONADO, confirmado na execução: nenhuma requisição de dados além dos arquivos locais].

### Scripts reais (`package.json`)

| Script | Comando | Categoria |
|---|---|---|
| `lint:content` | `tsx scripts/lint-content.ts` | validação dos JSON das aulas (schema, texto, imagens) |
| `lint:planos` | `tsx scripts/lint-planos.ts` | validação dos roteiros em `docs/planos/*.md` |
| `typecheck` | `tsc --noEmit` | tipagem |
| `test` | `vitest run` | testes unitários e de conteúdo |
| `build` | `tsc --noEmit && vite build` (`prebuild` roda `lint:content`) | produção |
| `dev` / `preview` | `vite --host` (`predev` roda `lint:content`) / `vite preview` | execução local |
| `manim`, `publicar` | Python/Manim; Git | não executados (opcional; exige Git) |

Não existe script de lint de código (ESLint ou Prettier), nem suíte separada de testes de integração ou E2E. A varredura no navegador é um script manual (`node scripts/varre-aulas.mjs <porta>`), fora do `package.json`.

---

## 2. Instalação de dependências

| Comando | Resultado |
|---|---|
| `npm ci` [EXECUTADO] | **sucesso em ~9 s**: "added 49 packages, and audited 50 packages"; **"found 0 vulnerabilities"**; nenhum aviso de `engines` nem de dependência incompatível. |

- O lockfile lista 99 entradas, e foram instalados 49 pacotes. A diferença são os binários opcionais de outras plataformas (esbuild e rolldown para Linux e macOS), que o npm ignora no Windows.
- `package.json` e `package-lock.json` não mudaram (SHA-256 igual antes e depois).
- Nenhum problema ligado à versão do Node.

---

## 3. Resultado dos testes e validações

| # | Comando | Resultado | Testes | Erros | Origem provável | Gravidade / impacto no MVP |
|---|---|---|---|---|---|---|
| 1 | `npm run lint:content` | **OK**, "conteúdo ok", exit 0 | — | 0 | — | — |
| 2 | `npm run typecheck` | **OK**, exit 0, sem saída | — | 0 | — | — |
| 3 | `npm test` | **OK**, exit 0, 17,4 s | **135/135 arquivos, 2.174 aprovados, 0 reprovados** | 0 | — | — |
| 4 | `npm run lint:planos` | **FALHA**, exit 1: "103 planos; 102 sem erro, 1 com erro" | — | 3 erros em `docs/planos/funcao-modular.md` | Ver abaixo | **Baixa.** Só documentação; não entra em `build`, `test`, `dev` nem `publicar`. |

**Detalhe da falha em `lint:planos`:**

```
funcao-modular.md
  erro   Vestibular: 2 questões (esperado 4)
  erro   uerj-cbmerj-2025-modular: 0 opções (2 a 5), 0 corretas, fonte sem '(adaptada)', fonte sem URL
  erro   pendente-fonte: 0 opções (2 a 5), 0 corretas, sem enunciado, fonte sem '(adaptada)', fonte sem URL
```

- **Causa:** a seção "Vestibular" do roteiro `docs/planos/funcao-modular.md` (linhas 238–259) foi escrita fora do formato que o lint espera. Falta a tabela de alternativas da V1, a linha "Fonte" não traz `(adaptada)` nem URL, e as vagas V2–V4 foram agrupadas num bloco só. Compare com o formato aceito em `docs/planos/funcao-quadratica.md` ("V1 — enem-2022-saque-volei", com tabela `id | Rótulo | Certa? | Feedback`).
- **A aula em si está correta:** `content/algebra/funcoes/funcao-modular/aula-01.json` tem a questão `uerj-cbmerj-2025-modular` e passa no `lint:content` e nos testes.
- **Hipótese:** o roteiro foi atualizado à mão durante a frente B45c (20/11), sem rodar `lint:planos`.
- O lint também resume: "180 questões reais, 230 PENDENTE-FONTE". O número difere das 188 questões no JSON porque o lint conta os roteiros, não as aulas.

**Lint de código (ESLint):** não existe no projeto, então não foi executado.

---

## 4. Resultado do build

| Comando | Resultado |
|---|---|
| `npm run build` [EXECUTADO] | **OK**, exit 0. `prebuild` (lint) ok, `tsc --noEmit` ok, Vite: **361 módulos, built in ~0,7 s**, **sem avisos**. |

| Saída | Tamanho | gzip |
|---|---|---|
| `dist/assets/index-*.js` (trilha, carga inicial) | 438,3 kB | **128,5 kB** |
| `dist/assets/LessonPlayer-*.js` (player e widgets, sob demanda) | 295,8 kB | 104,4 kB |
| `dist/assets/index-*.css` | 18,5 kB | 4,6 kB |
| `aula-01-*.js` (um chunk por aula, 104) | 15–19 kB cada | 4–6 kB |
| `dist/` total (com sprites, imagens e vídeo) | 6,8 MB | — |

A documentação dizia "JS inicial 423 kB" (B52); o medido agora é 438 kB. É coerente, considerando os commits posteriores.

---

## 5. Resultado da execução local

**Servidor** [EXECUTADO]: `npx vite --port 5173 --strictPort`, **sem `--host`** (só localhost). Mesmo binário do `npm run dev`, mas sem expor na rede local e sem o `predev`, que já tinha passado no item 1. Pronto em 623 ms; `GET /` → HTTP 200.

**Inspeção no navegador** [EXECUTADO, navegador embutido, viewport 1024 × 768; o app desenha uma coluna central de ~370 px]:

| Verificação | Resultado | Evidência |
|---|---|---|
| Página inicial (trilha) | **OK.** Boas-vindas do Paco e da Tati, botão "Vamos lá", faixa de matérias, pilares, setores e unidades. | captura e texto da página |
| Navegação entre aulas (por cliques) | **OK.** Vamos lá → Álgebra → Funções → Função Quadrática → "Aula 1: A Reta que Dobra" → rota `#/aula/algebra/funcoes/funcao-quadratica/aula-01`. | URL e captura |
| Aula com widget interativo (passo 1, `plano_cartesiano`) | **OK.** Arrastei o ponto sobre `y = x²` de x = 1 para −2 e depois para 2. O passo concluiu (`faixa_x ≥ 4`), "Continuar" foi habilitado e a fala mudou para a conclusão. | captura |
| Gráfico reage a variável (passo 2) | **OK.** O slider "Coeficiente quadrático" foi de 1 a −1: a parábola inverteu, a fantasma `y = x²` ficou de referência, o passo concluiu. Matematicamente coerente. | captura |
| Questão com alternativas (passo 4, desafio) | **OK.** Errada `(−1; 1)` → "Ainda não." e a figura passou a mostrar o ponto (−1; 3) na curva `(x − 1)² − 1`; confere: (−2)² − 1 = 3. "Tentar de novo" → `(1; −1)` → "Correto." | captura e texto |
| Fechamento e fim da aula | **OK.** Fórmula `f(x) = ax² + bx + c` com definições; "Concluir aula" levou ao convite do treino. | texto |
| Treino completo até o vestibular | **OK.** 7 básicas → "Ver resultado" → "Quero ir além" → 5 desafios → "Praticar com questões de vestibular" → **"VESTIBULAR 1 DE 2 · ENEM 2022 (adaptada)"**, a questão do vôlei, só com texto e 5 alternativas. | texto e captura |
| Erros no console | **Nenhum erro nem aviso.** Só as mensagens padrão do Vite e do React DevTools. | `read_console_messages` |

**Limites desta inspeção:** testei 1 aula das 104 e só em desktop. Não testei 400 px de largura, celular real, outras aulas, os widgets 3D, nem o vídeo. A varredura automática das 104 aulas (`scripts/varre-aulas.mjs`) **não foi executada** nesta etapa. Para clicar nas 12 perguntas do treino usei um script de teste no console; as respostas escolhidas foram a primeira alternativa de cada pergunta.

**Observações de interface (não são erros):**

- No desktop, o app ocupa uma coluna estreita (já registrado na auditoria). No telão, a figura fica pequena.
- No passo 1, passar o mouse sobre o rótulo do eixo abre uma dica ("Saída f(x)") que cobre parte do gráfico enquanto o ponteiro está ali.
- A fala da questão do vôlei mostra a notação crua `y_v` (subscrito em texto), em `content/algebra/funcoes/funcao-quadratica/aula-01.json`, `treino.vestibular[0].fala`.

**Conclusão:** a aplicação está **tecnicamente funcional** no fluxo testado (trilha → aula → widget → desafio → fechamento → treino → vestibular).

---

## 6. Problemas identificados

| # | Problema | Evidência | Gravidade | Ação |
|---|---|---|---|---|
| V1 | **Elegibilidade: o repositório atual provavelmente não serve para a submissão** (regras 6.1 e 6.2) | §8 | **Crítica** | Decisão da equipe antes de qualquer código novo |
| V2 | `lint:planos` falha em `docs/planos/funcao-modular.md` | §3 | Baixa | Corrigir o formato da seção Vestibular do roteiro (só documentação) |
| V3 | "Node 26" documentado como requisito sem ser exigido | §1 | Baixa | Documentar "Node ≥ 24" ou adicionar `engines` |
| V4 | `npm run dev` usa `--host` (expõe na rede local) | `package.json:10` | Baixa | Em evento, usar `npx vite` sem `--host` |
| V5 | Sem ESLint e sem teste E2E no `package.json` | §1 | Baixa | Opcional; a varredura headless cobre parte |
| V6 | Fala com `y_v` cru na questão do vôlei | §5 | Baixa | Tratar junto com a questão visual |

**Nenhum erro de execução, compilação, tipagem ou teste foi encontrado.**

---

## 7. Situação do controle de versão

| Item | Situação | Fonte |
|---|---|---|
| `.git` nesta cópia | **ausente** (ZIP). Não executei `git init` nem nenhuma operação de Git. | [EXECUTADO] |
| Repositório original | **`ArthurEidi/projeto-hackathon1`** no GitHub; **privado** em 15/11/2026 | `docs/HOSPEDAGEM.md:45-47` [INSPECIONADO] |
| Branch principal | `main` | `docs/HOSPEDAGEM.md:44`, `scripts/publicar.sh` |
| Branches de desenvolvimento citados | `wip-b33` (backup de 18/11; segundo a doc, "já apagado"), `wip-20-11` ("já foi todo publicado"), **`wip-20-11-noite`** (não auditado: B46b, B60–B62, B45b2/B45d3) | `docs/EM-ANDAMENTO.md`, `docs/PROXIMOS-PASSOS.md:73` |
| Histórico documentado | Fase 1 (commit `0f6f0c5`, data não registrada); **Fase 2 em 09/11/2026**; 103 capítulos escritos até 13/11; frentes B1 a B63 entre 13/11 e 20/11; último commit citado no main por volta de 20/11 (B57/B59 `d2cd6c4` e outros). | `docs/GUIA-CAPITULOS.md:11,29`; `EM-ANDAMENTO.md`; `PROXIMOS-PASSOS.md` |
| Datas dos arquivos nesta cópia | todos 20/11/2026 20:50 (data da extração do ZIP, sem valor de prova) | [EXECUTADO] |
| Data de criação do repositório e do primeiro commit | **[PENDENTE]**: só verificável no GitHub (`git log --reverse`, data de criação do repositório) | — |
| Autoria | A documentação descreve a maior parte do código e do conteúdo como produzida por agentes de IA (Claude Code, Codex, Antigravity/Gemini) coordenados em "Máquina A" e "Máquina B". | `docs/EM-ANDAMENTO.md` |

---

## 8. Pendências de elegibilidade

Fonte: <https://hackbrasil.com/regulamento> ("Última atualização: 18 de novembro de 2026"), lido em 21/11/2026.

**O que o regulamento exige (paráfrase):**

- **6.1:** o código entregue precisa estar em repositório(s) **público(s)** no GitHub, **criado(s) depois do fim da sessão de abertura (4/11/2026, 21h)**, com **todos os commits a partir desse momento**. Repositório criado antes, fork ou histórico importado de antes **desclassificam**.
- **6.2:** pode continuar uma ideia ou produto existente, mas **nenhum código anterior ao Evento que não seja público pode ser copiado**, "inclusive código privado do próprio time". A exceção é código aberto que já era público antes do Evento, copiado sem histórico e com a origem indicada no commit.
- **6.4:** ferramentas de IA (agentes, copilotos) são **permitidas e recomendadas**.
- **6.7:** o repositório deve ficar público pelo menos até 15/12.
- **8.4:** nenhum commit entre 30/11, 23h59, e 12/12.
- **7.2, entregáveis:** link do repositório, **link de demo no ar**, **vídeo de até 3 min**, descrição, trilha e aceite. **7.4:** os jurados não são obrigados a instalar nada.
- **9.1, critérios:** execução técnica, implementação técnica, impacto e comunicação, com pesos iguais.
- **Prazos:** submissão até **30/11/2026, 23h59**; final presencial em 12/12.

**Avaliação desta cópia (sem concluir elegibilidade):**

| Requisito | Situação | Status |
|---|---|---|
| Repositório criado depois de 4/11, 21h, com todos os commits depois disso | Data de criação de `ArthurEidi/projeto-hackathon1` e do commit `0f6f0c5` (Fase 1) **desconhecidas**. A Fase 2 é de 09/11, o que é compatível, mas não prova nada. | **[PENDENTE: crítico]** |
| Nenhum código anterior ao Evento copiado | Depende da resposta acima. Se o código ou a ideia vierem de antes de 4/11 em repositório privado, a regra 6.2 proíbe copiá-los. | **[PENDENTE: crítico]** |
| Repositório público | **Privado** em 15/11, segundo a doc. Precisa estar público na submissão e até 15/12. | **Não atendido hoje** (fácil de resolver, se o resto estiver ok) |
| Demo no ar | Não publicada (`docs/HOSPEDAGEM.md`; workflow só manual). Os jurados não precisam instalar: **a demo hospedada é obrigatória.** | **Não atendido hoje** |
| Vídeo de até 3 min | Não existe no repositório | **Não atendido hoje** |
| Uso de IA | Permitido (6.4) | OK |
| Equipe de 1 a 4 pessoas, maiores de 18 | Equipe declarada de 3 | Confirmar inscrição |
| Questões de prova e imagens de terceiros (6.5, 11.3) | 188 questões e 42 imagens de 17 bancas. As do ENEM vêm do INEP (material público); as das outras bancas exigem conferir os termos de uso. O regulamento não trata de questões de prova especificamente. | **[PENDENTE: médio]** |
| Trilha | O regulamento tem 7 trilhas; projeto fora da trilha pode ser inelegível (5.5). | **[PENDENTE]**: confirmar em qual trilha o projeto entra |

**Ação necessária (só a equipe pode fazer):** no GitHub, confirmar a data de criação de `ArthurEidi/projeto-hackathon1` e a data do primeiro commit (`git log --reverse --format="%h %ad %s" | head`). Se **qualquer** commit ou arquivo for anterior a 4/11/2026, 21h, este repositório **não pode** ser o repositório da submissão. Nesse caso, a equipe precisa decidir com a organização (oi@hackbrasil.com) se e como a base pode ser aproveitada. **Esta validação não conclui que o projeto é elegível.**

---

## 9. Viabilidade da questão de vôlei

### 9.1 Onde está e o que contém

- **Arquivo:** `content/algebra/funcoes/funcao-quadratica/aula-01.json`, em `treino.vestibular[0]`, id `enem-2022-saque-volei`.
- **Enunciado no app:** "Na parábola y = −x²/6 − 7x/3 + 12, y é medido de um eixo 1,5 m acima do piso. Tetos: 17, 18, 19, 21 e 40 m (I a V); onde a bola bate?"
- **Fonte:** ENEM 2022, questão 150 (adaptada), `https://api.enem.dev/v1/exams/2022/questions/150`. **Conferi a API agora:** o texto original fala de saque invalidado se a bola atinge o teto, batida a 1,5 m do piso, ginásios de 17, 18, 19, 21 e 40 m, e gabarito **D**. O enunciado original traz a equação e um desenho como imagens.
- **Alternativas:** `g1` (só I), `g12` (I e II), `g123` (I a III), **`g1234` (I a IV, correta)** e `g12345` (todos). Cada errada tem feedback que explica o erro: por exemplo, `g123` corresponde a esquecer de somar 1,5 m.
- **Também está no roteiro:** `docs/planos/funcao-quadratica.md`, seção "Vestibular", V1, com a conta de conferência.

### 9.2 Conta refeita [EXECUTADO]

| Grandeza | Valor |
|---|---|
| Δ | 121/9 ≈ 13,44 |
| Vértice | **x_v = −7**, y_v = 121/6 ≈ 20,17 m acima do eixo → **21,67 m acima do piso** |
| Raízes (bola na altura do eixo) | **x = −18** e **x = 4** |
| Teto I, 17 m (eixo + 15,5) | cruza em x ≈ −12,29 e −1,71 |
| Teto II, 18 m | x ≈ −11,69 e −2,31 |
| Teto III, 19 m | **x = −11 e x = −3** (exatos) |
| Teto IV, 21 m | **x = −9 e x = −5** (exatos) |
| Teto V, 40 m | não cruza |

Os números são favoráveis ao widget: vértice e raízes inteiros, e os tetos III e IV cruzam em x inteiros. Com o ponto arrastável encaixando em passos de 0,5, o aluno alcança exatamente esses pontos, e as métricas exatas (`no_vertice`, `no_encontro`, tolerância 1e-6) funcionam.

### 9.3 Como o `plano_cartesiano` representa a questão (sem código novo) [INSPECIONADO]

| Necessidade | Recurso existente | Onde |
|---|---|---|
| Trajetória | curva `tipo: "quadratica"`, `a: -1/6` (decimal), `b: -7/3`, `c: 12` | `src/widgets/common/params.ts:44-77` |
| Altura em relação ao **piso** | `transforma: { k: 1.5 }` desloca a curva 1,5 m para cima, e o eixo x passa a ser o piso | `params.ts` (`transforma`), `plot2d.ts:44-50` |
| Janela ampla | `x: [-19, 5]`, `y: [0, 42]` (ou `[0, 25]` sem o teto V) | `PlanoBase`, `params.ts:162-164` |
| Tetos I–V fixos com rótulo | `guias.horizontais: [{ v: 17, rotulo: "I" }, ...]` | `params.ts:175-177` |
| Teto móvel | 2ª curva `tipo: "afim"`, `a: 0`, `b: "$teto"`, mais um slider `teto` | `params.ts` (`Valor`) |
| Mostrar onde bate | `marcar.encontro: true` (encontros numéricos entre as curvas 0 e 1) | `desenhoPlano.ts:417-432`, `plot2d.ts:226-233` |
| Metas para concluir | `no_vertice`, `no_encontro`, `ponto_x`, `faixa_x` e o próprio slider `teto` (`gte`/`lte`) | `PlanoCartesianoWidget.tsx:3-19` |
| Não entregar a resposta antes | `antes_de_concluir` (por exemplo, esconder o encontro até o aluno chegar) | `src/engine/schema.ts:52-58` |
| Desafio com figura por erro | `micro_challenge` com `plano_figura` e `figure` por alternativa (5 alternativas não cabem: o desafio aceita **no máximo 4**; o treino aceita 5) | `schema.ts:96-112` |

**Roteiro possível, só JSON (5 passos):**

1. **Dados e contexto:** a trajetória já desenhada, eixo no piso e ponto na mão do jogador (x = −18, y = 1,5). O aluno arrasta pela curva (`faixa_x`) e vê a altura mudar.
2. **Ponto mais alto:** arrastar até o topo (`no_vertice`). O rótulo mostra (−7; 21,67).
3. **Tetos:** o slider `teto` sobe de 17 a 40 e as marcas de encontro aparecem ou somem. Meta: levar o teto até onde a bola deixa de tocar (`teto ≥ 22`). Fala de conclusão: "abaixo de 21,67 m a bola bate".
4. **Desafio:** "Em quantos ginásios o saque é invalidado?", com 4 alternativas (por exemplo: 3, 4, 5, "nenhum"), cada errada com a figura do erro. A errada "3" mostra a curva **sem** o +1,5 m (`transforma.k: 0`), que é o erro do distrator C do ENEM.
5. **Fechamento:** `y_v = −Δ/(4a)` com as marcas ligadas à figura.

Depois disso, a própria questão original do ENEM pode entrar no `treino.vestibular` da aula nova, com as 5 alternativas.

### 9.4 Riscos e limites técnicos

| Item | Situação |
|---|---|
| Janela grande (x de −19 a 5, y até 42) | **Nunca usada** em nenhuma aula: a maior hoje é `x [-2,4] × y [0,17]`. As marcas de eixo são calculadas automaticamente (`passoDeMarcas`), mas a legibilidade em 370 px **precisa ser vista na tela**. Mitigação sem código: `y: [0, 25]` e o teto V citado só no texto. |
| Coeficientes −1/6 e −7/3 | O JSON aceita só números (`Valor` = número ou `"$slider"`), então eles entram como −0,1667 e −2,3333. Erro de arredondamento ~1e-4 na altura; a métrica `no_vertice` usa o x do vértice calculado da própria curva, então funciona. O rótulo da curva é texto livre (`rotulo`), e é possível escrever a lei exata. |
| Desafio com 5 alternativas | O schema limita a 4 (`schema.ts:100`). Reformular a pergunta do desafio; as 5 alternativas originais ficam no treino. |
| Animação da bola no tempo | Não existe; o "movimento" é o arraste do ponto. Suficiente para a demo. |

### 9.5 Motor, arquivos e testes

- **Usa o motor atual?** Sim: os 4 tipos de passo existentes, sem mudar o motor.
- **Arquivos a criar:**
  - `content/algebra/funcoes/<slug>/aula-01.json` (por exemplo, `saque-de-volei-enem-2022`);
  - `src/conteudo/<slug>.test.ts`;
  - `docs/planos/<slug>.md` (roteiro, para manter o padrão do projeto e o `lint:planos`).
- **Arquivo a modificar:** `content/taxonomy.json`, com uma unidade nova (via `python scripts/registra-capitulo.py algebra/funcoes/<slug> parabola`).
- **Testes necessários** (padrão de `src/conteudo/funcao-quadratica.test.ts`):
  1. o JSON passa em `Lesson.parse`;
  2. cada `interactive_canvas` é completável (meta alcançável pelo slider ou pelo passo do ponto, sem começar concluído);
  3. a conta da questão: vértice (−7; 121/6), +1,5 = 121/6 + 3/2, encontros com 19 e 21 m em x inteiros, sem encontro em 40 m, usando `avaliar`/`vertice`/`encontros` de `plot2d.ts`;
  4. o gabarito do desafio e do treino bate com a conta;
  5. cada alternativa errada tem figura diferente da inicial.
- **Validação:** `npm run lint:content`, `npx vitest run src/conteudo/<slug>.test.ts`, `npm run typecheck`, `npm run lint:planos`; depois, olhar em 400 px e 1280 px.

### 9.6 O fluxo é acessível direto a partir da questão?

- **Hoje, não.** A questão aparece depois de 12 perguntas do treino da aula de função quadrática, como confirmei no navegador.
- **Sem mudar código:** a aula nova vira uma unidade própria na trilha (Álgebra → Funções). O aluno abre a "questão do vôlei" com 4 cliques a partir da trilha, sem passar pela aula de função quadrática. O título da unidade pode ser a própria questão ("Saque no teto: ENEM 2022").
- **Com mudança pequena (opcional, depois):** um link "ver resolução visual" no feedback da questão do treino exige um campo novo no schema (`QuestaoVestibular`) e um botão em `Treino.tsx`. Não é necessário para a demo.

### 9.7 Como demonstrar aos jurados

1. **0:00–0:20:** mostrar o enunciado original do ENEM 2022 (texto, como no treino) e dizer: "assim o aluno vê a questão".
2. **0:20–1:40:** abrir a aula da questão. Arrastar a bola pela trajetória até o topo (21,67 m) e subir o teto pelos ginásios: em 17, 18, 19 e 21 m aparecem os pontos onde a bola bate; acima de 21,67 m, nada.
3. **1:40–2:20:** no desafio, escolher de propósito a resposta sem os 1,5 m e mostrar a figura do erro; depois acertar.
4. **2:20–2:50:** fórmula do vértice ligada ao gráfico.
5. Gravar esse trecho no vídeo de até 3 minutos (regra 7.2) e publicar a demo (o júri não instala nada).

Escopo de física ou IA: **não é necessário** para esta demonstração. A trajetória do saque já é a ponte com a física, com o modelo da própria questão.

---

## 10. Próxima implementação recomendada

**Antes de qualquer código:** resolver a pendência crítica de elegibilidade (§8). A primeira tarefa **não é técnica**: a equipe precisa confirmar no GitHub a data de criação do repositório e do primeiro commit e, conforme a resposta, definir o repositório de submissão. Se for preciso um repositório novo, decidir com a organização o que pode ser trazido. A regra 6.2 proíbe copiar código privado anterior ao Evento.

**Tarefa técnica seguinte**, assim que o repositório de trabalho estiver definido: **aula "Saque no teto: ENEM 2022"**, só com conteúdo e teste:

1. roteiro em `docs/planos/<slug>.md`;
2. `content/algebra/funcoes/<slug>/aula-01.json` com os 5 passos da §9.3;
3. `src/conteudo/<slug>.test.ts` com as contas da §9.2;
4. registro na taxonomia;
5. validação com os 4 comandos mais a inspeção visual em 400 px e 1280 px (o ponto de atenção é a janela grande).

Estimativa: baixa a média complexidade e nenhum arquivo de motor ou widget alterado, então dá para trabalhar em paralelo com os outros dois desenvolvedores sem conflito.

Em paralelo, e sem depender do código:

- **publicar a demo** (Netlify ou Vercel, ou GitHub Pages com repositório público), obrigatória pela regra 7.2;
- **planejar o vídeo de 3 minutos**;
- **corrigir `docs/planos/funcao-modular.md`** para o `lint:planos` passar.

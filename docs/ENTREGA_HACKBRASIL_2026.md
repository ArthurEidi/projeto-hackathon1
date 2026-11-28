# Entrega: Hack Brasil 2026

Checklist de submissão da **Aula Visual**. Atualizado em **28/11/2026**.

**Prazo:** 30/11/2026, **23h59, horário de Brasília**. Fonte: <https://hackbrasil.com/regulamento> (versão de 27/11/2026, lida em 28/11/2026).

**Legenda:**

- ✅ **Concluído:** verificado nesta data.
- ⏳ **Pendente:** exige ação da equipe.
- ❔ **Não verificável daqui:** depende de informação que só a equipe ou a organização tem.

---

## 1. Dados do formulário (regulamento, item 7.2)

| Item | Situação | Conteúdo ou ação |
|---|---|---|
| Nome do projeto | ✅ proposto · ⏳ confirmar | **Aula Visual**. Atenção: o cabeçalho do app ainda mostra "Projeto Hack Brasil · Aprendizagem visual" (`src/paginas/BarraTopo.tsx`, `src/paginas/Inicio.tsx`, `index.html`). A equipe decide se alinha o app ao nome antes do prazo. |
| Frase de apresentação | ✅ proposta | "Aprenda Matemática, Física e Química explorando gráficos, simulações e experiências interativas." |
| Descrição | ✅ proposta | Texto abaixo (§1.1). |
| Trilha | ✅ proposta · ⏳ marcar no formulário | **Acesso à educação.** O regulamento (5.2) cita "ferramentas de aprendizado e ensino" e "apoio a professores e escolas". O problema e o público do projeto (estudantes do Ensino Médio) estão dentro da trilha, como exige o item 5.4. O enquadramento final é do júri (5.5). |
| Link do repositório | ✅ | <https://github.com/ArthurEidi/projeto-hackathon1>, **público** (verificado pela API do GitHub em 28/11). |
| Outros repositórios com código da submissão | ❔ | O regulamento (6.1 e 7.2) pede o link de **cada** repositório com código do projeto. Se a landing page (`hackbrasil-landing`) ou outro código fizer parte da entrega, esse repositório também precisa estar público e informado. |
| Link da demo | ⏳ | Ainda não publicada: `https://arthureidi.github.io/projeto-hackathon1/` responde **404** em 28/11. Passo a passo em `docs/HOSPEDAGEM.md`. |
| Link do vídeo (até 3 min, sem login) | ⏳ | Ainda não gravado. Roteiro em `docs/DEMO.md`. |
| Aceite do regulamento | ⏳ | Feito por quem envia o formulário, em nome do time (item 7.2 e 13.1). |

### 1.1 Descrição sugerida para o formulário

> Aula Visual é uma plataforma web gratuita para estudantes do Ensino Médio aprenderem Matemática, Física e Química por experimentação. Em vez de começar pela fórmula, cada aula parte de um gráfico ou simulação que o aluno manipula: muda o ângulo de um lançamento, inverte uma parábola, adiciona soluto a uma solução e vê a consequência na hora. Erros recebem feedback visual que mostra a origem do engano. Hoje são 107 aulas: 105 de Matemática, incluindo uma questão do ENEM 2022 transformada em experiência visual, 1 de Física (lançamento oblíquo) e 1 de Química (concentração de soluções). Roda no navegador e no celular, sem cadastro, com o progresso salvo no próprio aparelho. Feito em React, TypeScript e Vite, com aulas descritas em JSON e validadas por Zod, e 2.229 testes automatizados. O impacto na aprendizagem ainda não foi medido com estudantes.

---

## 2. Regras do projeto (item 6)

| Regra | Situação | Evidência ou ação |
|---|---|---|
| 6.1: repositório público, criado depois de 4/11/2026, 21h, com todos os commits depois disso | ✅ parcialmente verificado · ❔ confirmar | Repositório criado em **11/11/2026, 01:59 UTC** (API do GitHub). Commit mais antigo no `main`: `0f6f0c5`, **09/11/2026, 19:13 (−03:00)**, depois da abertura. Não é fork. **A equipe precisa confirmar** que nenhum código foi trazido de antes de 4/11 (item 6.2): o primeiro commit se chama "Snapshot antes da expansão dos capítulos". |
| 6.2: nenhum código privado anterior ao evento copiado | ❔ | Só a equipe sabe a origem do código do primeiro commit. Em caso de dúvida: oi@hackbrasil.com. |
| 6.4: uso de IA | ✅ | Permitido e recomendado. O desenvolvimento usou agentes de IA (registrado em `docs/EM-ANDAMENTO.md` e no README). O produto não usa IA. |
| 6.5: direitos de terceiros | ❔ | Questões de vestibular de 17 bancas (todas com fonte e marca "(adaptada)") e imagens de provas em `public/vestibular/`. ENEM/INEP é material público; os termos das demais bancas não foram conferidos. |
| 6.6: licença | ⏳ opcional | Não há `LICENSE`. Não é obrigatória, mas é recomendada. Nada impede os jurados de ler e executar o código. |
| 6.7: repositório público até 15/12/2026 | ⏳ | Não tornar privado nem apagar antes disso. |
| 6.9: sem dados pessoais reais | ✅ | O app não coleta dados; o progresso fica no `localStorage` do navegador. |
| 8.4: sem commits entre 30/11, 23h59, e a final (12/12) | ⏳ | Fazer o último commit e push **antes** de 30/11, 23h59. |

---

## 3. Produto e repositório

| Item | Situação | Evidência |
|---|---|---|
| README atualizado | ✅ | `README.md` reescrito em 28/11: problema, solução, funcionalidades, impacto, tecnologias, execução, qualidade e equipe. Faltam os links de demo e vídeo (marcados em comentário no topo) e a confirmação da equipe. |
| Build de produção | ✅ | `npm run build`, 28/11: sem erros e sem avisos. JS inicial 470,7 kB (138,5 kB gzip). |
| Build servido em subcaminho (como no GitHub Pages) | ✅ | `dist/` em `/projeto-hackathon1/`: página inicial, Matemática, Física, Química, questão do vôlei e Cones carregaram. Assets, personagens, vídeo e favicon com HTTP 200, sem erro no console. |
| Testes | ✅ | `npm test`, 28/11: **141 arquivos, 2.229 aprovados, 0 falhas**. |
| Validações | ✅ | `npm run lint:content` ok · `npm run lint:planos` ok (103 planos sem erro; corrigido em 28/11) · `npm run typecheck` ok. |
| Varredura visual das 107 aulas em 3 resoluções | ✅ (21/11) | `docs/visual/varredura-*.md`: 577 passos, 201/201 sliders, 0 problemas. **Não reexecutada em 28/11**, mas não houve mudança de código nem de conteúdo desde então (só documentação). |
| Capturas reais | ✅ | 13 imagens em `docs/screenshots/` (21/11), geradas por script com cliques e teclado, usadas no README. |
| Roteiro do vídeo (até 3 min) | ✅ | `docs/DEMO.md` (alvo de 2:40 a 2:50). |
| Workflow de publicação | ✅ | `.github/workflows/pages.yml` conferido; nenhuma mudança de infraestrutura necessária. |
| Demo publicada e testada | ⏳ | Seguir `docs/HOSPEDAGEM.md` e testar em janela anônima e no celular. |
| Vídeo gravado, publicado e testado sem login | ⏳ | Seguir `docs/DEMO.md`. Conferir duração < 3:00. |

---

## 4. Links testados

| Link | Situação em 28/11 |
|---|---|
| <https://github.com/ArthurEidi/projeto-hackathon1> | ✅ HTTP 200, público |
| <https://arthureidi.github.io/projeto-hackathon1/> | ⏳ HTTP 404 (Pages não ativado) |
| Vídeo | ⏳ não existe ainda |
| <https://hackbrasil.com/regulamento> | ✅ lido |

Repetir os testes **depois** de publicar, numa janela anônima, e de novo perto do prazo.

---

## 5. Equipe

| Item | Situação |
|---|---|
| Integrantes no README | ⏳ Só dois nomes são confirmáveis pelo histórico do Git: **Arthur Eidi Sugawara Furukita** (dono do repositório) e **Felipe Zotareli Froes**. O terceiro integrante precisa ser informado pela equipe. |
| Equipe de 1 a 4 pessoas, maiores de 18 anos, inscritas | ❔ Confirmar na inscrição. |
| Revisão do material (README, vídeo, formulário) por toda a equipe | ⏳ |

---

## 6. Ordem sugerida até o prazo

1. Equipe confirma: nome "Aula Visual", terceiro integrante, origem do código do primeiro commit (6.2) e se a landing também entra na entrega.
2. Commit e push destas mudanças de documentação no `main`.
3. Ativar o GitHub Pages e rodar o workflow (`docs/HOSPEDAGEM.md`). Testar o link.
4. Gravar e publicar o vídeo (`docs/DEMO.md`). Testar sem login.
5. Colocar os links no README (comentário no topo) e neste arquivo. Fazer o último commit e push **antes de 30/11, 23h59**.
6. Preencher e enviar o formulário. Guardar o comprovante.
7. Não fazer commits até a final, e manter o repositório público até 15/12.

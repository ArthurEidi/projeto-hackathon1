# Vestibular — Frente B45b (provas oficiais)

Agente: Antigravity #2. Briefings: `C:\Users\mkf10\projetos\briefing-b50.md` e `C:\Users\mkf10\projetos\briefing-b45.md`.

**Escopo final (redivisão de 20/11):**
1. `relacoes-metricas-triangulo-retangulo` — **1 questão inserida** (`ufrgs-2025-semicirculo-area`)
2. `angulos-retas-paralelas` — **vazia** (nenhuma candidata adequada após busca em 8 bancas)
3. `circunferencia-arcos-e-angulos` — **passada para o Antigravity #3** (aula não editada aqui; pista anotada abaixo)

## Candidatas avaliadas

| aula | candidata (banca/ano/nº, página) | gabarito | sua conta | nível ok? | veredito |
|---|---|---|---|---|---|
| relacoes-metricas-triangulo-retangulo | UFRGS 2025, 1º dia, Q72 (p. 38) | C (`10√(20x − x²)`) | Semicírculo de raio 10 ⇒ diâmetro BC = 20 e ∠BAC = 90°; altura AD dá projeções x e 20 − x ⇒ h² = x(20 − x) ⇒ h = √(20x − x²) ⇒ A(x) = (20 · h)/2 = 10√(20x − x²) | sim (ângulo reto no semicírculo + h² = m · n) | **aprovada, inserida** (`ufrgs-2025-semicirculo-area`) |
| angulos-retas-paralelas | UFPR 2022, 1ª fase, Q12 (p. 11) | D (`y² / √(x² − y²)`) | ΔABC ~ ΔEBD (OPV e ângulo reto): y / ED = √(x² − y²) / y ⇒ ED = y² / √(x² − y²) | não (tema é semelhança de triângulos + Pitágoras, não ângulos em paralelas) | recusada (tema) |
| angulos-retas-paralelas | UERJ 2024, 2º EQ, Q32 (p. 19) | D (`√3`) | Distância entre retas paralelas = altura do triângulo equilátero de lado 2 m = √3 m | não (tema é altura de triângulo equilátero / Pitágoras) | recusada (tema) |

## Onde procurou (B45b)

Além do cache do ENEM, foram pesquisadas as provas oficiais em `C:\Users\mkf10\projetos\provas-oficiais\`:
- Fuvest (2012–2026)
- Unicamp (2016–2026)
- UFRGS (2016–2025)
- UFPR (2020–2025)
- UERJ (2012–2027 e Revista de Questões)
- UFU (2019–2027)
- PUC-RS (2021–2023)
- UEL (2022–2026)

Para `angulos-retas-paralelas`, nenhuma questão objetiva isolada tratava apenas de ângulos em retas paralelas cortadas por transversal sem depender de trigonometria, áreas ou geometria espacial; por isso a aula permanece com `treino.vestibular: []`.

## Pista para `circunferencia-arcos-e-angulos` (Antigravity #3)

- **Fuvest 1993, 1ª fase** ("Os pontos A, B e C pertencem a uma circunferência γ e AC é lado de um polígono regular inscrito em γ. Sabendo-se que o ângulo ABC mede 18°..."): o PDF oficial está em `https://www.fuvest.br/wp-content/uploads/fuvest_1993_prova_primeira_fase.pdf` (baixado em `provas-oficiais/fuvest-1993-1fase/prova.pdf`), porém é escaneado (sem texto selecionável) e a página do acervo da Fuvest 1993 não traz PDF de gabarito separado.

## URLs testadas (HTTP 200 e mesmo tamanho da cópia local)

- UFRGS 2025 (1º dia, 4.902.377 bytes): `https://www.ufrgs.br/coperse/wp-content/uploads/2024/12/Prova-1o-DIA.pdf` e `https://vestibular.ufrgs.br/cv2025/gabaritos/`

## O que entrou

- `content/geometria/geometria-plana/relacoes-metricas-triangulo-retangulo/aula-01.json`: `ufrgs-2025-semicirculo-area` (UFRGS 2025, 1º dia, Q72).
- `docs/planos/relacoes-metricas-triangulo-retangulo.md`: vaga V3 preenchida.
- `src/conteudo/relacoes-metricas-triangulo-retangulo.test.ts`: teste da V3 conferindo a conta e o gabarito.
- `docs/fontes-candidatas/angulos-retas-paralelas.md` e `docs/fontes-candidatas/relacoes-metricas-triangulo-retangulo.md` atualizados.

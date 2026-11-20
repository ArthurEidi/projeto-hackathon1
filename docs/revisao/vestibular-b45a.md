# Registro B45a — Vestibular em provas oficiais (`geometria/trigonometria`)

Agente: Antigravity (Neon). Briefing: `C:\Users\mkf10\projetos\briefing-b45.md`.
Todas as candidatas foram verificadas visualmente nas páginas dos PDFs oficiais em `C:\Users\mkf10\projetos\provas-oficiais\`, com gabarito oficial não anulado, conta refeita e URL oficial testada (HTTP 200 com mesmo tamanho em bytes da cópia local).

## Tabela de candidatas avaliadas

| Aula | Candidata (banca/ano/nº, página) | Gabarito | Sua conta | Nível ok? | Veredito |
|---|---|---|---|---|---|
| `formulas-de-adicao-e-arco-duplo` | UFPR 2025, 1ª fase, Q08 (p. 3) | C (`7/25`) | `sen x = 3/5 ⇒ cos(2x) = 1 − 2·(9/25) = 7/25` | sim (arco duplo direto) | **aprovada, inserida** (`ufpr-2025-cos-2x`) |
| `formulas-de-adicao-e-arco-duplo` | UFRGS 2022, 1º dia, Q51 (p. 27) | D (`24/25`) | `sen α = 3/5` no 1º Q ⇒ `cos α = 4/5 ⇒ sen(2α) = 2·(3/5)·(4/5) = 24/25` | sim (arco duplo direto) | **aprovada, inserida** (`ufrgs-2022-sen-2a`) |
| `identidades-trigonometricas` | UNICAMP 2025, 1ª fase (Q), Q50 (p. 48) | a (`√(2 − √3)/2`) | `cos²(π/12) = (1 + √3/2)/2 = (2 + √3)/4 ⇒ sen²(π/12) = (2 − √3)/4 ⇒ √(2 − √3)/2` | sim (fórmula de `cos(x/2)` dada no enunciado + identidade fundamental) | **aprovada, inserida** (`unicamp-2025-sen-pi12`) |
| `identidades-trigonometricas` | UFPR 2024, 1ª fase, Q05 (p. 3) | E (`1,6`) | `[sen x + cos x]² = sen²x + cos²x + 2·sen x·cos x = 1 + 3/5 = 1,6` | sim (expansão + relação fundamental; fala lembra `2·sen x·cos x = sen 2x`) | **aprovada, inserida** (`ufpr-2024-soma-quadrado`) |
| `equacoes-trigonometricas` | ITA 2017, Matemática, Q2 (p. 1) | A (`0`) | `1 + sec θ = 0 ⇒ cos θ = −1 ⇒ θ = ±π` (anula `sen θ`, logo `cossec` não existe); `1 + cossec θ = 0 ⇒ sen θ = −1 ⇒ θ = −π/2` (anula `cos θ`, logo `sec` não existe) ⇒ `0` soluções | sim (equações `sen = −1`, `cos = −1` e domínio de inversas) | **aprovada, inserida** (`ita-2017-sec-cossec`) |
| `equacoes-trigonometricas` | UFPR 2020, 1ª fase, Q17 (p. 7) | a (`Somente a 1`) | `n(t) = 3·sen((t − 5)π/6) + 4` em `[0; 24]`: máximo (`sen = 1`) em `t = 8 h` e `20 h` (2×/dia → 1 V); `n(5) = n(11) = 4 m` (2 e 3 F); variação `7 − 1 = 6 m` (4 F) | sim (equação `sen = 1` e `sen = −1` em uma janela de 24 h) | **aprovada, inserida** (`ufpr-2020-mare`) |
| `equacoes-trigonometricas` | ITA 2015, Matemática, Q10 (p. 3) | D (`arccos(−4/5)` e `π`) | `2·sen x − cos x = 1 ⇒ cos x = −1` (`x = π`) ou `cos x = −4/5` | não (usa `arccos`, fora do recorte da aula) | recusada (nível/recorte) |
| `inequacoes-trigonometricas` | ITA 2025, 1ª fase, Q8 (p. 3) | — | domínio de raiz com `2·sen(2x) + 2·sen x − 2·cos x − 1` sobre `8(cos 2x + 1)` | não (nível olimpíada/ITA, fora do recorte da aula) | recusada (nível) |
| `inequacoes-trigonometricas` | ITA 2022, 1ª fase, Q53 (p. 18) | — | `cos(β + θ) ≤ cos(α + 2β)` em ângulos de triângulo | não (geometria/triângulos, fora do recorte no ciclo) | recusada (tema/nível) |

**Resumo:** 3 de 4 aulas preenchidas com **6 questões oficiais** (2 por aula, todas sem figura); `inequacoes-trigonometricas` mantida com `treino.vestibular: []` após varredura em **6 bancas** (55 provas oficiais: FUVEST 2013–2016 e 2018–2025, UNICAMP 2019–2026, UFRGS 2022/2024/2025, UFPR 2020/2022–2025, ITA 2008–2026 e IME 2023–2026).

## URLs oficiais testadas (HTTP 200 e tamanho exato da cópia local)

| Arquivo local (`provas-oficiais/`) | URL oficial | HTTP | Bytes (local = remoto) |
|---|---|---|---|
| `ufpr-2025-1fase/prova.pdf` | `https://servicos.nc.ufpr.br/documentos/ps2025/provas/Geral.pdf` | 200 | `1429162` |
| `ufpr-2025-1fase/gabarito.pdf` | `https://servicos.nc.ufpr.br/documentos/ps2025/provas/definitivo/Geral.pdf` | 200 | `1429569` |
| `ufrgs-2022-1dia/prova.pdf` | `https://www.ufrgs.br/coperse/wp-content/uploads/2022/03/PROVAS-1o-DIA.pdf` | 200 | `8518284` |
| `ufrgs-2022-1dia/gabarito.html` | `https://vestibular.ufrgs.br/cv2022/gabaritos/` | 200 | `51338` |
| `unicamp-2025-1fase/prova.pdf` | `https://www.comvest.unicamp.br/wp-content/uploads/2025/06/F1_2025.pdf` | 200 | `7587373` |
| `ufpr-2024-1fase/prova.pdf` | `https://servicos.nc.ufpr.br/documentos/ps2024/provas/Geral.pdf` | 200 | `938858` |
| `ita-2017-mat/prova.pdf` | `https://www.vestibular.ita.br/provas/matematica_2017.pdf` | 200 | `132171` |
| `ita-2017-mat/gabarito.pdf` | `https://www.vestibular.ita.br/provas/gabarito_2017.pdf` | 200 | `86076` |
| `ufpr-2020-1fase/prova.pdf` | `https://servicos.nc.ufpr.br/documentos/PS2020/provas1fase/ps2020_conhecimentos_gerais.pdf` | 200 | `2541669` |

## O que entrou em cada aula

- `formulas-de-adicao-e-arco-duplo`: `ufpr-2025-cos-2x` (UFPR 2025 Q08) e `ufrgs-2022-sen-2a` (UFRGS 2022 Q51).
- `identidades-trigonometricas`: `unicamp-2025-sen-pi12` (UNICAMP 2025 Q50) e `ufpr-2024-soma-quadrado` (UFPR 2024 Q05).
- `equacoes-trigonometricas`: `ita-2017-sec-cossec` (ITA 2017 Q2) e `ufpr-2020-mare` (UFPR 2020 Q17).
- `inequacoes-trigonometricas`: mantida vazia (documentado em `docs/fontes-candidatas/inequacoes-trigonometricas.md`).

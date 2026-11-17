# Correções B29a — `antes_de_concluir` nos 15 casos restantes da B27d (16/11/2026)

Aplicação de `antes_de_concluir` nos **15 casos restantes** de `docs/visual/entrega-resposta-b27d.md` (`inequacoes-modulares` p2 já estava pronto), mantendo as falas originais e sem alterações em `src/`. Capturas do estado inicial (`antes/`) e do estado concluído (`depois/`) em `C:\Users\mkf10\projetos\capturas-b29a`.

## Tabela de correções

| Caso | Capítulo e passo | `antes_de_concluir` aplicado | Ajuste em `complete_when` | Capturas (inicial → concluído) |
|---|---|---|---|---|
| 1 | `fatorial-e-permutacoes` p1 (`tres-amigos`) | `{ "escada": false }` | Mantido (`filas_montadas >= 3`) | `antes/fatorial-e-permutacoes-p1.png` → `depois/fatorial-e-permutacoes-p1.png` |
| 2 | `fatorial-e-permutacoes` p3 (`letras-iguais`) | `{ "listar": false }` | Mantido (`iguais_ligado >= 1`) | `antes/fatorial-e-permutacoes-p3.png` → `depois/fatorial-e-permutacoes-p3.png` |
| 3 | `medidas-de-tendencia-central` p4 (`par-e-moda`) | `{ "mostrar": { "mediana": false, "moda": false } }` | Mantido (`meios_tocados >= 2`) | `antes/medidas-de-tendencia-central-p4.png` → `depois/medidas-de-tendencia-central-p4.png` |
| 4 | `descontos-acrescimos-e-indices` p3 (`teste-de-fronteira`) | **Não alterado (regra 4)** | — | `barras` modo `categorias` não tem chave para ocultar o rótulo numérico de uma barra antes do toque (e remover a 3ª barra quebraria `barras_tocadas >= 3`). |
| 5 | `sistemas-numericos-e-divisibilidade` p3 (`divisores-e-multiplos`) | `{ "pontos": [4, 6] }` (sem `MMC = 12`) | Mantido (slider `m >= 12`) | `antes/sistemas-numericos-e-divisibilidade-p3.png` → `depois/sistemas-numericos-e-divisibilidade-p3-m=12.png` |
| 6 | `soma-da-pg-infinita` p1 (`caso-neutro`) | `{ "limite": false }` | Mantido (slider `n >= 4`) | `antes/soma-da-pg-infinita-p1.png` → `depois/soma-da-pg-infinita-p1-n=4.png` |
| 7 | `divisao-polinomial-e-teorema-do-resto` p3 (`montar-quociente`) | `{ "curvas": [P(x)] }` (sem `Q(x)` e `R`) | Mantido (slider `etapa >= 2`) | `antes/divisao-polinomial-e-teorema-do-resto-p3.png` → `depois/divisao-polinomial-e-teorema-do-resto-p3-etapa=2.png` |
| 8 | `equacoes-modulares` p2 (`dois-lados`) | `{ "pontos": [2] }` (sem `−2`) | Mantido (`ponto_x <= -2`) | `antes/equacoes-modulares-p2.png` → `depois/equacoes-modulares-p2.png` |
| 9 | `inequacoes-primeiro-grau` p1 (`caso-neutro`) | `{ "trechos": [], "pontos": [] }` | `ponto_x >= 1` (equivalente a `x > 0` com `passo: 1`) | `antes/inequacoes-primeiro-grau-p1.png` → `depois/inequacoes-primeiro-grau-p1.png` |
| 10 | `inequacoes-primeiro-grau` p2 (`mover-fronteira`) | `{ "trechos": [], "pontos": [0 muted] }` | `ponto_x >= 2` (equivalente a `x > 1` com `passo: 1`) | `antes/inequacoes-primeiro-grau-p2.png` → `depois/inequacoes-primeiro-grau-p2.png` |
| 11 | `inequacoes-primeiro-grau` p3 (`espelhar-ordem`) | `{ "trechos": [], "pontos": [] }` | `ponto_x <= 0` (equivalente a `x < 1` com `passo: 1`) | `antes/inequacoes-primeiro-grau-p3.png` → `depois/inequacoes-primeiro-grau-p3.png` |
| 12 | `inequacoes-modulares` p1 (`caso-neutro`) | `{ "trechos": [], "pontos": [] }` | `ponto_x >= 0 && <= 0` (equivalente a `|x| ≤ 0`) | `antes/inequacoes-modulares-p1.png` → `depois/inequacoes-modulares-p1.png` |
| 13 | `inequacoes-modulares` p3 (`trocar-para-exterior`) | `{ "trechos": [], "pontos": [] }` | `distancia >= 2` (equivalente a `|x| ≥ 2`; incluída em `inequacoes-modulares.test.ts`) | `antes/inequacoes-modulares-p3.png` → `depois/inequacoes-modulares-p3.png` |
| 14 | `inequacoes-produto-quociente` p1 (`caso-neutro`) | `{ "trechos": [], "pontos": [] }` | `ponto_x >= 1` (equivalente a `x ≥ 1`) | `antes/inequacoes-produto-quociente-p1.png` → `depois/inequacoes-produto-quociente-p1.png` |
| 15 | `inequacoes-produto-quociente` p2 (`produto-de-sinais`) | `{ "trechos": [], "pontos": [] }` | Mantido (`ponto_x >= 2`) | `antes/inequacoes-produto-quociente-p2.png` → `depois/inequacoes-produto-quociente-p2.png` |

## Validação executada

- `npx vitest run` nos 9 arquivos de teste dos capítulos alterados: **9 arquivos, 123/123 testes passaram**.
- `npm run lint:content`: `conteúdo ok`.
- Prova visual de conclusão em `400 × 860`: todos os 14 passos editados tiveram o estado inicial (resposta oculta) e o estado concluído (resposta exibida + botão `CONTINUAR` verde) capturados em `C:\Users\mkf10\projetos\capturas-b29a`.

## Auditoria do maestro (16/11)

Condições de conclusão trocadas conferidas (pontos andam de 1 em 1, então `ponto_x` com `gte`/`lte` aceita as mesmas posições que `dentro`; em `inequacoes-produto-quociente` p2 a condição ficou mais estrita, só x ≥ 2, como a fala pede). Capturas de início e de concluído abertas em `medidas-de-tendencia-central` p4 e `fatorial-e-permutacoes` p1. Pendência visual antiga do `barras` modo fila: no estado concluído de `medidas-de-tendencia-central` p4 o chip `mediana 6` fica atrás da fila de cartões. `descontos-acrescimos-e-indices` p3 segue aberto: `barras` modo `categorias` não tem chave para esconder o valor de uma barra.

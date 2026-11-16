# Conferência visual de vestibular com imagem — Frente B23v (B27a)

Capturas em `400 × 860` (estado inicial e após resposta errada) gravadas em `C:/Users/mkf10/projetos/capturas-b27a` (ferramenta fora do repositório em `C:/Users/mkf10/projetos/ferramentas-b27/captura-vestibular.mjs`):

- `matrizes-determinantes-sistemas` v1 (`enem-2019-acertos-por-dia`, ENEM 2019/144): matriz 5×5 (`308×236` → `368×282`) nítida e inteira, enunciado, `fala`, 5 opções e feedback visíveis sem corte e sem rolagem lateral (`scrollW=400`).
- `matrizes-determinantes-sistemas` v2 (`enem-2021-regiao-destino`, ENEM 2021/157): matriz `A` 5×5 (`466×334` → `368×264`) nítida e inteira, texto completo, opções e feedback visíveis sem rolagem lateral (`scrollW=400`).
- `matrizes-determinantes-sistemas` v3 (`enem-2021-mala-camisetas`, ENEM 2021/164): tabela das viagens I e II (`452×103` → `368×84`) nítida e inteira, 5 opções numéricas e feedback visíveis sem rolagem lateral (`scrollW=400`).
- `distribuicao-de-frequencias-e-amostragem` v1 (`enem-2018-media-acidentes`, ENEM 2018/145): quadro de acidentes (`338×172` → `368×187`) nítido e inteiro, 5 opções e feedback visíveis sem rolagem lateral (`scrollW=400`).
- `distribuicao-de-frequencias-e-amostragem` v2 (`enem-2021-histograma-precos`, ENEM 2021/151): histograma (`431×334` → `368×285`) legível e inteiro, enunciado, opções e feedback visíveis sem rolagem lateral (`scrollW=400`).
- `distribuicao-de-frequencias-e-amostragem` v3 (`enem-2023-media-mediana-moda`, ENEM 2023/140): gráfico de barras horizontais (`497×270` → `368×200`) nítido e inteiro, 5 opções e feedback visíveis sem rolagem lateral (`scrollW=400`).
- `inequacoes-exponenciais-logaritmicas` v1 (`enem-2017-emprestimo-log`, ENEM 2017/137): fórmula de `P` (`170×50` → `368×108`) legível e inteira, 5 opções numéricas e feedback visíveis sem rolagem lateral (`scrollW=400`).
- `experimentos-binomial-e-repetidos` v1 (`enem-2022-world-series`, ENEM 2022/137): **defeito visual de escala** (`scrollW=400`, feedback visível após responder, mas `.treino__imagem` com `width: 100%` estira a fração pequena `1/2` de `39×57` px para `368×538` px — ~9,4× — deixando-a pixelada e empurrando as alternativas para fora da tela inicial; o mesmo ocorre com as 5 alternativas em imagem `~40×60` px estiradas para `340×443..542` px cada). Como são frações simples, pode ser resolvido no CSS (`width: auto; max-width: 100%` ou limite para imagens pequenas) ou trocando as imagens de frações por texto (`1/2`, `35/64`…`52/64`).
- `experimentos-binomial-e-repetidos` v2 (`enem-2009-celulares-defeito`, ENEM 2009/145): sem imagem; enunciado, 5 opções e feedback completo visíveis sem corte e sem rolagem lateral (`scrollW=400`).
- `projecoes-cortes-e-planificacoes` v3 (`enem-2022-robo-cubo-projecao`, ENEM 2022/160): cubo em perspectiva (`255×215` → `368×310`) e projeções A..E (`~210×70` → `340×104..136`) nítidos e inteiros, sem rolagem lateral (`scrollW=400`), feedback visível.

## Correção do maestro (16/11)

`experimentos-binomial-e-repetidos` v1 (ENEM 2022/137): as imagens eram só frações (1/2 no enunciado e 35/64 a 52/64 nas alternativas) e ficavam esticadas e pixeladas pelo `width: 100%`. Viraram texto: o 1/2 entrou no enunciado e as alternativas passaram a ter rótulo `35/64` … `52/64` (sem `imagem`); feedbacks citam 42/64 em vez da letra C; teste atualizado. Recaptura em `C:/Users/mkf10/projetos/capturas-b27a-maestro`: 5 alternativas em grade, sem rolagem (`scrollW = 400`). Os PNG `enem-2022-137-*` continuam em `public/vestibular/` (citados em `docs/fontes-candidatas/`).

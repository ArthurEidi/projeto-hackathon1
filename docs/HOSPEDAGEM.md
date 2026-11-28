# Hospedagem do app

Preparado em 15/11/2026 (Máquina B, frente B15). As seções abaixo da primeira registram o histórico daquela data.

## Situação em 28/11/2026 e passo a passo para publicar

**Verificado em 28/11/2026:**

| Item | Situação |
|---|---|
| Repositório `ArthurEidi/projeto-hackathon1` | **Público** (API do GitHub: `"visibility": "public"`), branch padrão `main`, último commit `1097745` |
| GitHub Pages | **Ainda não ativado** (`has_pages: false`; `https://arthureidi.github.io/projeto-hackathon1/` responde 404) |
| Workflow `.github/workflows/pages.yml` | Adequado ao `main` atual, sem mudança de infraestrutura: `npm ci` → `npm test` → `npm run build` → publica `dist/`. Node 26 no CI (o projeto funciona com Node ≥ 22.12; 24 e 26 testados) |
| Base do Vite | `base: "./"` no build: os assets são relativos, então o `dist/` funciona no subcaminho `/projeto-hackathon1/` |
| Rotas | Por hash (`#/`, `#/materia/<id>`, `#/aula/<...>`): o Pages não precisa de reescrita de URL nem de `404.html` |
| Teste local do build | `npm run build` ok. `dist/` servido em `/projeto-hackathon1/` (como no Pages): página inicial, Matemática, Física, Química, questão do vôlei e aula de Cones carregaram. JS, CSS, personagens (`personagens/`), favicon e vídeo (`videos/cones_aula01_corte.mp4`) com HTTP 200, sem erro no console |
| Fontes | DM Sans, Manrope e Nunito vêm do Google Fonts (precisa de internet; sem ela, o navegador usa uma fonte reserva) |

**Para publicar (alguém com permissão de administrador no repositório):**

1. No GitHub, abrir **Settings → Pages**. Em **Build and deployment → Source**, escolher **GitHub Actions**.
2. Abrir **Actions → "Publicar no GitHub Pages" → Run workflow**, escolher a branch **`main`** e confirmar.
3. Esperar os dois jobs (`build` e `deploy`) ficarem verdes, cerca de 2 a 3 minutos. Se `npm test` ou `npm run build` falharem, nada é publicado.
4. Abrir `https://arthureidi.github.io/projeto-hackathon1/` numa **janela anônima** e conferir: página inicial, os três cards, uma aula de cada área e a questão do vôlei (`#/aula/algebra/funcoes/saque-de-volei-enem-2022/aula-01`).
5. Só depois disso, colocar o link no `README.md`, em `docs/ENTREGA_HACKBRASIL_2026.md` e no formulário.

**Se o workflow falhar por permissão:** em **Settings → Actions → General → Workflow permissions**, conferir se Actions estão permitidas no repositório. O próprio workflow já declara `pages: write` e `id-token: write`. O ambiente `github-pages` é criado sozinho na primeira publicação e aceita a branch padrão.

**Plano B (sem configurar o repositório):** rodar `npm run build` e arrastar a pasta `dist/` em **Netlify → Add new site → Deploy manually**. O link gerado também serve como demo.

**Atenção ao congelamento (regulamento, item 8.4):** depois de 30/11/2026, 23h59, não pode haver commits nos repositórios entregues (pelo menos para os finalistas) até a final. Publicar ou republicar a demo **a partir de um commit já existente** não cria commit, mas qualquer correção no código precisa entrar antes do prazo.

## O que o app precisa

- É um site estático: `npm run build` gera `dist/` (HTML, um JS, um CSS, `personagens/`, `materias/`, `videos/`). Não há backend; o progresso do aluno fica no navegador.
- As rotas são por hash (`#/aula/<pilar>/<setor>/<slug>/aula-01`), então qualquer servidor de arquivos serve: não precisa reescrever URL.
- Desde 15/11 o build usa **base relativa** (`vite.config.ts`: `base: "./"` no build). O mesmo `dist/` funciona na raiz de um domínio, num subcaminho (`usuario.github.io/projeto-hackathon1/`) ou numa pasta qualquer. Os vídeos (`/videos/...` no JSON da aula) passaram a ser resolvidos pela base do site (`src/steps/ManimVideo.tsx`).
- O atalho `?passo=N` (abrir uma aula num passo) só existe em `npm run dev`; no site publicado a aula sempre começa do passo 1.

## Conferir localmente antes de publicar

```bash
npm run build                 # lint do conteúdo + typecheck + build
npm run preview               # http://localhost:4173
```

Teste feito em 15/11: `dist/` copiado para uma pasta `projeto-hackathon1/` e servido com `python -m http.server`, imitando o subcaminho do GitHub Pages. Trilha, sprites, aula `funcao-quadratica` e o vídeo de `cones` (`/projeto-hackathon1/videos/cones_aula01_corte.mp4`, 200) carregaram em 400 px, sem erro de JS. Única falha: `favicon.ico` (o app não tem ícone; inofensivo).

## Abrir no próprio PC (atalho, B51)

Dê dois cliques em `scripts/abrir-app.cmd` ou num atalho para ele. Na Máquina A, desde 20/11, há o atalho **"App de Matemática"** na Área de Trabalho do OneDrive, com o ícone do Paco e "Iniciar em" na raiz do repositório. O ícone fica fora do repositório, em `C:\Users\mkf10\projetos\atalho-app\app-matematica.ico`.

O script:
1. Vai para a raiz do repositório e põe o Node no PATH, se precisar (`%ProgramFiles%\nodejs` ou `%USERPROFILE%\tools\node`).
2. Roda `npm install` só se faltar `node_modules/`.
3. Chama `scripts/abrir-app.mjs`, que roda `npm run build` só se `dist/` faltar ou for mais velho que o último commit ou que algum arquivo de `src/`, `content/`, `public/` e da configuração. Se o build falhar e houver um `dist/` anterior, abre esse.
4. Sobe `vite preview` em **http://localhost:4173/** (`--strictPort`) e abre o navegador padrão. A janela fica aberta: **fechar a janela desliga o app**.

Se o app já estiver no ar nessa porta, o atalho só abre o navegador. Se outro programa ocupar a 4173, a janela avisa e espera uma tecla. Para criar o atalho em outro PC, aponte um atalho para `scripts\abrir-app.cmd`, com "Iniciar em" na pasta do repositório.

Teste em 20/11 (capturas em `C:\Users\mkf10\projetos\capturas-b51`):
- Atalho aberto com `dist/` em dia: a página respondeu 200 e abriu a trilha em 400 px.
- Atalho aberto de novo com o app no ar: só abriu o navegador, sem subir um segundo servidor.
- Com conteúdo mais novo que o `dist/`: refez o build e subiu.
- Fechar a árvore da janela liberou a porta.

## Opção 1: GitHub Pages (preparada)

O workflow `.github/workflows/pages.yml` só roda à mão. Para publicar:

1. No GitHub: **Settings > Pages > Build and deployment > Source = "GitHub Actions"**.
2. **Actions > "Publicar no GitHub Pages" > Run workflow** (branch `main`). Ele roda `npm ci`, `npm test`, `npm run build` e publica o `dist/`.
3. O endereço fica `https://arthureidi.github.io/projeto-hackathon1/`. **O site é público** (qualquer um com o link abre).

**Atenção:** em 15/11 o repositório `ArthurEidi/projeto-hackathon1` é **privado**. No plano gratuito do GitHub, o Pages só funciona com repositório público; com repositório privado é preciso GitHub Pro (ou tornar o código público). Se o código deve continuar privado, a opção 2 abaixo publica só o site, sem expor o repositório.

Para tirar do ar: Settings > Pages > "Unpublish site" (ou desativar o Pages).

## Opção 2: Netlify ou Vercel (sem configurar nada no repositório)

Rodar `npm run build` e arrastar a pasta `dist/` para o painel "Deploy manually" do Netlify (ou importar o repositório com comando `npm run build` e pasta `dist`). Também gera um link público.

## Pendências conhecidas

- **Tamanho (B20, 15/11/2026):** aulas carregadas sob demanda. Antes, maior JS e JS inicial: **2.072,17 kB / 538,39 kB gzip**; depois, **683,05 kB / 213,81 kB gzip** (redução de 67% sem compressão e 60% com gzip). São 104 chunks de aula, de 9,76 a 18,84 kB; nenhum é baixado na trilha. O app e os widgets ainda compõem o maior chunk, acima do aviso de 500 kB do Vite; separar widgets fica como otimização futura.
- **Validação B20:** 128 arquivos / 2.003 testes aprovados e `npm run typecheck` aprovado. `npm run build` bloqueou no prebuild por `uv_os_get_passwd returned ENOMEM (not enough memory)` do tsx; as duas medições usaram `npm --ignore-scripts run build`, que executou TypeScript e Vite com sucesso, sem executar o lint. A validação completa do conteúdo continua pendente neste ambiente.
- **Preview B20:** `npx vite preview --port 5310 --strictPort`, Chrome headless com viewport de 400 × 860 via CDP. Trilha sem requisições de chunks de aula; abrir `#/aula/algebra/funcoes/funcao-quadratica/aula-01` baixou somente um chunk de aula e exibiu o gráfico, sem exceções JavaScript. Capturas locais em `%TEMP%/b20-trilha.png` e `%TEMP%/b20-aula.png`. Rotas e atalho de desenvolvimento `?passo=N` preservados.

- Sem favicon e sem manifesto de PWA (não instala como app no celular).
- A fonte Nunito vem do Google Fonts (precisa de internet).

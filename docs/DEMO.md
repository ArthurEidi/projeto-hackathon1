# Roteiro de Demonstração (3 a 5 minutos)

Guia prático para apresentar o **Matemática Interativa** ao júri do hackathon. Todo o fluxo roda localmente, sem backend e sem depender de internet.

## Preparação antes de começar (30 s)

1. Abra o app com dois cliques em `scripts/abrir-app.cmd` (sobe o build em `http://localhost:4173/` e abre o navegador) — ou rode `npm run dev` e abra `http://localhost:5173`.
2. Se quiser mostrar a experiência de **primeira viagem** (boas-vindas do Paco no topo da Trilha), abra em janela anônima ou limpe o `localStorage` no DevTools (`localStorage.clear()` e recarregue).
3. Deixe a janela em formato vertical (`~400 px` de largura) ou em tela cheia (`1280 × 800`): o app enquadra a coluna central automaticamente no desktop.

---

## Roteiro passo a passo (4 minutos)

### 1. Abertura na Trilha (`0:00 – 0:30`)
- **Cliques:**
  1. No topo da Trilha, deixe aparecer a fala inicial do Paco (*"Oi, eu sou o Paco. Aqui você aprende matemática mexendo nas figuras, um passo de cada vez."*) e clique em **`Vamos lá`**.
  2. Mostre os 3 pilares (**Aritmética**, **Álgebra**, **Geometria**) e aponte que a trilha já abre em **Aritmética** com a **Aula 01** (*Conjuntos numéricos, divisibilidade e fatoração prima*) pronta para clicar, sem esconder o começo.
- **O que falar:**
  > "Este é um app de Matemática do Ensino Médio inteiro — são 104 aulas publicadas em 3 pilares, rodando 100% local no navegador. Todo capítulo segue um método de 7 pilares focado em intuição visual: o aluno mexe na figura primeiro e só depois chega à fórmula. O Paco conduz a aula e a Tati acompanha a jornada."

---

### 2. Aula-modelo: Cones — O Triângulo que Gira (`0:30 – 2:00`)
*Caminho:* **Geometria** → **Geometria Espacial** → **Cones** → **Aula 01: O Triângulo que Gira**
*Por que mostrar:* concentra o widget 3D vivo, o arraste direto na figura, o vídeo curto do corte, o micro-desafio que reage ao erro, a fórmula tocável e o treino com 4 questões reais de vestibular.

- **Cliques:**
  1. **Passo 1 (widget 3D `revolution`):** arraste o controle **Giro** de `0°` até `360°` para girar o triângulo retângulo e formar o cone. Clique em **`Continuar`**.
  2. **Passo 2 (`generatrix`):** **arraste o ponto pela borda da base** (pelo menos meia volta) no próprio desenho — mostre o rótulo **`g = 5,0`** acompanhando o movimento sem mudar de tamanho. Clique em **`Continuar`**.
  3. **Passo 3 (`manim_video`):** aguarde os poucos segundos da animação do **corte meridiano** revelando o triângulo retângulo por dentro do cone (o botão **`Continuar`** libera automaticamente ao fim do vídeo). Clique em **`Continuar`**.
  4. **Passo 4 (`micro_challenge`):** na pergunta *"Um cone tem altura 4 e raio 3. Quanto mede a geratriz?"*, escolha **de propósito `7`** e clique em **`Verificar`** — mostre a figura se dividindo em cone + corte plano e explicando *aquele* erro (*"Você somou altura e raio..."*). Clique em **`Tentar de novo`**, marque **`5`**, clique em **`Verificar`** e em **`Continuar`**.
  5. **Passo 5 (`concept_lock`):** toque nos botões coloridos **`g²`**, **`h²`** e **`r²`** da fórmula — cada letra acende o segmento correspondente no cone 3D e no corte plano. Clique em **`Concluir aula`**.
  6. **Convite e Treino:** aparece a tela **Aula concluída** com Paco e Tati comemorando e o convite (*"São 7 perguntas, sem pressa."*). Clique em **`Quero treinar`** para mostrar a **Pergunta 1 de 7** com feedback imediato (e explique que o treino evolui em 3 etapas: básico, desafios e **vestibular** com 4 questões reais de Cefet-PR, UFSC 2004, UPE 2009 e ENEM 2022). Clique no **`×`** para sair do treino — mostre que a trilha lembra o pilar **Geometria** e marca **Aula 01: O Triângulo que Gira** como concluída.
- **O que falar:**
  > "Em vez de jogar `g² = h² + r²` no quadro, o aluno gira o triângulo e vê o cone nascer. No desafio, cada opção errada não diz só 'errou': a figura muda para mostrar o erro exato daquela conta. No fechamento, cada letra da fórmula está ligada por cor ao desenho. E ao terminar, o aluno passa para um treino em 3 níveis até questões reais de vestibular."

---

### 3. Álgebra visual: Função Quadrática — A Reta que Dobra (`2:00 – 2:45`)
*Caminho:* **Álgebra** → **Funções** → **Função Quadrática** → **Aula 01: A Reta que Dobra**
*Por que mostrar:* demonstra o pilar 5 (progressão por contraste: reta fantasma × parábola viva e parábola fantasma × concavidade invertida no `plano_cartesiano`).

- **Cliques:**
  1. **Passo 1:** em `f(x) = x²`, **arraste o ponto sobre a curva** de `x = −2` até `x = 2` para mostrar que os dois lados dão saída `4`, com a reta fantasma `y = x` de referência. Clique em **`Continuar`**.
  2. **Passo 2:** arraste o controle **Coeficiente quadrático** até **`−1`** para mostrar `f(x) = a·x²` virando a concavidade para baixo em contraste com a parábola fantasma `y = x²`.
  3. Saia no **`×`** (a trilha volta direto em **Álgebra**).
- **O que falar:**
  > "Aqui dá para ver o método em ação em Álgebra: colocamos o gráfico que o aluno já conhece como referência fantasma e dobramos ou invertemos a curva ao vivo, conectando a regra de sinais à concavidade sem decoreba."

---

### 4. Trigonometria no ciclo + Vestibular oficial (`2:45 – 3:30`)
*Caminho:* **Geometria** → **Trigonometria** → **Equações trigonométricas** → **Aula 01: Equações trigonométricas**
*Por que mostrar:* `ciclo_trigonometrico` vivo + questões auditadas de provas oficiais (**ITA 2017** e **UFPR 2020**).

- **Cliques:**
  1. **Passo 1:** arraste o controle **Giro em graus** até **`90`** para mostrar a altura chegando a `1`. Clique em **`Continuar`**.
  2. **Passo 2:** arraste **Giro em graus** até **`150`** e aponte a linha pontilhada `y = 0,5` cortando o ciclo em dois pontos (`30°` e `150°` têm a mesma altura).
  3. Saia no **`×`**.
- **O que falar:**
  > "Em Trigonometria, o ciclo é interativo: o aluno vê na linha horizontal `y = 0,5` por que uma equação tem duas soluções na primeira volta. Das 104 aulas, 98 já têm questões reais de vestibular — 188 questões de 17 bancas como ENEM, Fuvest, Unicamp, UFRGS, UFPR, UFU e ITA, todas conferidas em PDF e gabarito oficiais, nunca inventadas."

---

### 5. Aritmética e Probabilidade: A Fração da Grade (`3:30 – 4:15`)
*Caminho:* **Aritmética** → **Contagem e Probabilidade** → **Probabilidade, espaço amostral e eventos** → **Aula 01: A Fração da Grade**
*Por que mostrar:* fecha a demonstração nos 3 pilares usando `grade_resultados` (faces do dado + régua de probabilidade de `0` a `1`, sem fórmula solta).

- **Cliques:**
  1. **Passo 1:** na fila de 6 faces do dado, **toque nas faces pares (`2`, `4` e `6`)** e mostre a régua de probabilidade embaixo deslizando de `0` até `1/2` (`3/6`).
  2. Volte à trilha no **`×`** e recarregue a página (`F5`) — mostre que o Paco cumprimenta com *"Bom te ver de novo. Continue de onde parou."* e o progresso (incluindo Cones concluída) continua salvo localmente.
- **O que falar:**
  > "Com isso passamos pelos três pilares — Aritmética, Álgebra e Geometria — com 22 widgets interativos próprios. Por trás da interface, toda a qualidade é verificada por 2.174 testes automatizados, lints de conteúdo e uma varredura automática em Chrome headless que abre todas as 104 aulas e 560 passos sem nenhum erro."

---

### Bônus opcional (se o júri pedir mais 30 s)
- **Sistemas lineares, classificação e escalonamento** (`Álgebra` → `Matrizes e Sistemas` → `Sistemas lineares, classificação e escalonamento` → `Aula 01`): começa no `plano_cartesiano` (encontro de duas retas) e no **Passo 2** abre o widget sob medida `sistema_escalonado` (arraste **Múltiplo retirado k** até `2` para eliminar `x` de `L₂` visualmente), com 3 questões do ENEM (`2023`, `2022` e `2018`).

---

## Como os números foram medidos

Todos os números citados no `README.md` e neste roteiro foram obtidos diretamente do repositório em 20/11/2026 pelos comandos abaixo (sem estimativas):

1. **Testes automatizados (`135 arquivos`, `2.174 testes`):**
   ```bash
   npx vitest run
   ```
2. **Aulas (`104`), passos (`560`), questões autorais (`1.248`), questões de vestibular (`188` em `98` aulas, `17` bancas), roteiros (`104`) e widgets (`22` interativos, `21` figuras estáticas):**
   ```bash
   node -e "const fs=require('fs'),p=require('path');const t=JSON.parse(fs.readFileSync('content/taxonomy.json','utf8'));let set=0,un=0,au=0,pas=0,aut=0,av=0,qv=0,b=new Set();for(const pi of t.pilares)for(const s of pi.setores){set++;for(const u of s.unidades){un++;for(const a of u.aulas){if(!a.arquivo)continue;au++;const L=JSON.parse(fs.readFileSync(p.join('content',a.arquivo),'utf8'));pas+=L.steps.length;aut+=L.treino.faceis.length+L.treino.medias.length+L.treino.desafios.length;if(L.treino.vestibular.length){av++;qv+=L.treino.vestibular.length;L.treino.vestibular.forEach(q=>b.add(q.fonte.banca));}}}}console.log({pilares:t.pilares.length,setores:set,unidades:un,aulas:au,passos:pas,autorais:aut,aulasComVestibular:av,vestibular:qv,bancas:b.size,planos:fs.readdirSync('docs/planos').filter(f=>f.endsWith('.md')).length});"
   ```
3. **Varredura visual automática (`104 aulas`, `560 passos`, `104 treinos`, `0 problemas`):**
   ```bash
   node scripts/varre-aulas.mjs <porta>
   ```

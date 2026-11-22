# Capturas reais do app

Geradas em 21/11/2026 com `node scripts/captura-telas.mjs <porta>`, com o app rodando localmente (`npx vite --port <porta> --strictPort`).

## Como foram feitas

- O script abre o app num navegador headless (Chrome) e chega a cada estado por cliques e teclado, como um aluno faria. O atalho de desenvolvimento `?passo=N` só escolhe o passo inicial da aula.
- Nenhuma página foi editada e nenhuma imagem foi retocada.
- `prefers-reduced-motion` fica ligado, para que nenhuma animação seja capturada pela metade.
- O progresso que aparece em `10-inicio-com-progresso.png` é real: a aula do vôlei foi concluída pelo próprio script, na captura 09, clicando em "Concluir aula".

Para atualizar, rode de novo o mesmo comando. As imagens são sobrescritas.

## Arquivos

| Arquivo | Tela | Tamanho | Finalidade sugerida na landing |
|---|---|---|---|
| `01-inicio.png` | Página inicial: título, demonstração de lançamento (60°, 24 m/s), quadro de descoberta | 1440 × 900 | Abertura da galeria ("a plataforma") |
| `02-disciplinas.png` | Faixa das áreas e os três cards (Matemática, Física, Química) com contagem real de aulas | 1440 × 900 | Seção de disciplinas |
| `03-trilha-matematica.png` | Trilha de Matemática: pilar Álgebra, setor Funções, unidade Função Quadrática aberta | 1440 × 900 | "Uma base extensa de aulas" |
| `04-aula-funcao-quadratica.png` | Aula de Função Quadrática, passo 2: coeficiente a levado a −1, concavidade invertida, parábola-fantasma de referência | 1440 × 900 | Gráfico interativo de Matemática |
| `05-questao-volei.png` | Questão visual do ENEM 2022 (vôlei), passo 3: teto em 19 m, pontos onde a bola toca o teto | 1440 × 900 | Questão que vira experiência visual |
| `06-fisica-lancamento.png` | Física, passo 2: lançamentos a 30° (tracejado) e a 60°, mesmo alcance de 34,64 m | 1440 × 900 | Simulação de Física |
| `07-quimica-solucoes.png` | Química, passo 3: 20 g em 500 mL = 40 g/L (meta atingida), com mol/L | 1440 × 900 | Simulação de Química |
| `08-feedback-questao.png` | Desafio do vôlei com a alternativa C (erro de não somar 1,5 m): figura e explicação do erro | 1440 × 900 | Feedback que ensina |
| `09-conclusao.png` | Tela de aula concluída, com convite ao treino e acesso à próxima aula | 1440 × 900 | Progressão |
| `10-inicio-com-progresso.png` | Seção "Continuar aprendendo" e destaque da questão visual, com o progresso real gravado pelo app | 1440 × 900 | Progresso do estudante |
| `11-celular-inicio.png` | Página inicial no celular | 390 × 844 (DPR 2, imagem 780 × 1688) | Versão mobile |
| `12-celular-fisica.png` | Física no celular, passo 4: alvo a 20 m atingido com 15° | 390 × 844 (DPR 2) | Versão mobile da simulação |
| `13-celular-questao-volei.png` | Questão do vôlei no celular: resposta certa da altura máxima (21,67 m) com feedback | 390 × 844 (DPR 2) | Versão mobile da questão |

As imagens de desktop têm proporção 16:10, a mesma das miniaturas da galeria da landing (`.screenshot img { aspect-ratio: 16/10 }`).

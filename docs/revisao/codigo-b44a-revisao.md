# Revisão B45r da varredura B44a

O script detectou os três tipos de defeito pedidos no navegador. A prova usou uma cópia temporária do app em `c99658d`, com Vite em modo dev e Chrome headless em 400 × 860 px. Rodei `node scripts/varre-aulas.mjs <porta> notacao-cientifica-e-ordem-grandeza` em cinco cenários, com uma instância nova do Vite e do navegador em cada um. O script da varredura foi executado sem alterações.

| Cenário | Injeção na cópia | Resultado do relatório |
| --- | --- | --- |
| Controle inicial | Widget original. | Cinco passos verificados, treino aberto e zero registros. |
| Erro | No modo `potencia` de `EscalaWidget.tsx`, um efeito chamou `console.error("B45R_CONSOLE")` e agendou `throw new Error("B45R_EXCECAO")` em um timer. | Dois registros no passo 1. `console.error` com `B45R_CONSOLE` e `Exceção da página` com `Error: B45R_EXCECAO` e a origem no widget. |
| Rolagem lateral | No mesmo modo, um efeito anexou ao `body` a faixa visível `div#b45r-excesso`, com posição absoluta a partir de x = 0 e largura de 500 px. | Dois registros no passo 1. `Rolagem lateral` com `documentElement.scrollWidth = 500 px` e `Elemento além da borda` com `div#b45r-excesso → 500.0 px`. |
| Canvas vazio | O callback de desenho retornou logo após a limpeza do canvas no modo `potencia`. Em `normalizar`, preencheu a área com branco e retornou. Ambos mantiveram o elemento visível e com as dimensões normais. | Um registro de `Passo não renderizou` no passo 1 (transparente) e outro no passo 2 (branco opaco), ambos com o detalhe `canvas 1 (Escala decimal e notação científica) inteiramente branco ou transparente`. |
| Controle restaurado | Widget original restaurado na cópia. | Cinco passos verificados, treino aberto e zero registros. |

Nas três execuções com defeitos, a varredura também percorreu os cinco passos e abriu o treino. Validei as linhas por passo, tipo de achado e detalhe, além dos totais dos controles. As cinco execuções retornaram código 0. Os achados estão no relatório, portanto uma automação que use apenas o código de saída não os distingue do controle.

A prova cobre o estado inicial e um canvas 2D inteiramente vazio. A checagem por pixels aceita qualquer pixel visível que não seja branco, de modo que um desenho parcialmente apagado pode passar nesse critério.

Não consegui ver nenhuma imagem do projeto nesta sessão: Maestri CLI ausente, navegador conectado indisponível e início do Edge headless bloqueado pela revisão automática (aprovação de sandbox desabilitada).

# Widgets — Shell #2, 13/11/2026

| Widget | O que estava errado | O que mudou | Como conferiu a imagem |
|---|---|---|---|
| retangulo_areas (diagnóstico) | Vista ancorada na origem com limite mínimo 8; peças sem identificação; chips do rodapé a apenas 26 px para altura de 29 px. | Reserva e diagnóstico gravados antes da implementação. WidgetProps fornece valores, mas não limites dos sliders; cálculo pelo máximo exige integração do coordenador fora de common. | Não conferido: sem imagem; não considerar aprovado visualmente. |
| retangulo_areas (implementação parcial) | Origem à esquerda, peças sem rótulo, rodapé apertado e segmento de unidade sem extremos. | Vista centrada na extensão desenhada; figuras numéricas usam 80% da dimensão útil; escala fixa por limite para expressões; chips internos ou faixa externa para peças estreitas/nulas; referência identificada; rodapé separado; segmento com extremos. | Ainda sem imagem. Falta receber máximos dos sliders pelo motor e conferir todos os modos no navegador. Não aprovado visualmente. |
| retangulo_areas (testes acrescentados) | Faltavam regressões de enquadramento e colisão de chips. | Testes de centro, escala fixa com slider, ocupação de figura numérica e colisões em 400 px (b = 0, 0,1, 1 e 2, soma e retirada). | Testes de coordenadas não substituem screenshot; validação visual permanece pendente. |
| retangulo_areas (validação) | — | typecheck passou; 17 arquivos / 332 testes de widgets passaram. lint:content não completou: Node/tsx lançou uv_os_get_passwd ENOMEM. | Sem screenshot; não aprovado visualmente. |

## Retomada

- Entrega parcial: somente `src/widgets/common/areas/desenho.ts` e `areas.test.ts` alterados. Não houve commit, push, build, instalação de dependências nem edição de conteúdo por Shell #2.
- `retangulo_areas` ainda não concluído: faltam screenshots antes/depois de widget e figura, todos os modos; a escala das expressões ainda usa `limite`, pois `WidgetProps.controls` não traz mínimos/máximos. O coordenador precisa disponibilizar esses limites ao widget em `src/widgets/types.ts` e `src/steps/InteractiveCanvas.tsx` antes de calcular o enquadramento por todo o domínio dos sliders. Não use leitura da ordem de sliders no DOM como substituto desse contrato.
- Pendentes, na ordem: `lugar_geometrico`, `pontos_no_plano`, `circunferencia_no_plano`, `vetores_no_plano`, `maquinas_funcao`, `transformacao_plano`.
- `npm run typecheck`: passou. `npx vitest run src/widgets`: 17 arquivos, 332 testes passaram. `npm run lint:content`: duas tentativas falharam antes da validação por `uv_os_get_passwd ENOMEM` em Node 26.13.0/tsx.
- Comunicação final tentada com `maestri ask "Claude Code #2"`: falhou porque o executável indicado por `MAESTRI_CLI` não existe nesta sessão. `list` e `debug` também falharam pelo mesmo motivo.
- Vite temporário encerrado. A operação que criaria a página e iniciaria a captura foi rejeitada antes da execução; nenhum arquivo temporário foi criado (ausência de `visual-shell2*` conferida).

## Conferência do coordenador (Claude Code #2), 13/11, com imagem

Abri `expressoes-algebricas-e-produtos-notaveis` no navegador depois da correção parcial acima.

- `retangulo_areas` modo `produto`: agora centralizado e com rótulo em cada peça (a², ab, ab, b²). **Melhorou, mas continua pequeno**: com b = 2 a figura ocupa cerca de 30% da largura útil, e com b = 0 o quadrado inicial fica minúsculo. Com b = 0 os chips "ab", "ab", "b²" ficam soltos numa faixa embaixo, sem peça correspondente (aceitável, mas estranho).
- Causa do tamanho: a escala usa um limite fixo porque o widget não recebe o máximo dos sliders. Pendência do coordenador (arquivos fora de `common`): passar mínimos/máximos dos sliders ao widget em `src/widgets/types.ts` e `src/steps/InteractiveCanvas.tsx`.
- Os outros modos de `retangulo_areas` e os seis widgets seguintes continuam sem conferência com imagem.

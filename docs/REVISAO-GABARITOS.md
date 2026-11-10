# Revisão de gabaritos

## Conferência às cegas (10/11/2026) — válida

**Resultado: 1359 de 1359 questões com o gabarito confirmado; nenhuma divergência.**

Como foi feita:
1. `scripts/gabarito-cego/extrai.py` tirou de cada plano em `docs/planos/` todas as questões com tabela de alternativas (micro-desafios da aula, fáceis, médias, desafios e as 20 de vestibular já com fonte), **sem** a coluna "Certa?", sem feedbacks e sem a conta de conferência, com as alternativas embaralhadas e rotuladas A, B, C…
2. Dois agentes Gemini Flash resolveram os pacotes sem acesso ao gabarito (metade dos 103 planos cada), gravando letra e conta por questão.
3. `scripts/gabarito-cego/confere.py` comparou as respostas com a chave.

| Solucionador | Questões | Batem com o gabarito |
|---|---|---|
| Flash A (52 planos) | 682 | 682 |
| Flash B (51 planos) | 677 | 677 |
| Hermes, modelo gratuito (5 planos, 2ª opinião) | 66 | 63 |

As 3 divergências do Hermes (angulos-retas-paralelas D2; areas-e-volumes-por-composicao D2 e D5) são erro dele: nas três, a conta do Flash confirma o gabarito, e em D2 a própria conta do Hermes chega ao valor do gabarito.

**O que esta conferência NÃO cobre:**
- O texto dos feedbacks das alternativas erradas (o diagnóstico do erro). Na implementação dos primeiros capítulos apareceram diagnósticos errados em distratores (ex.: funcao-modular D5, funcao-exponencial D5). Eles são corrigidos quando o capítulo vira aula, e os testes de `src/conteudo/` recalculam os gabaritos.
- Os 392 itens de vestibular `PENDENTE-FONTE`, que ainda não têm questão.
- Cada questão foi resolvida por um solucionador só (os dois Flash não se sobrepõem).

Para repetir: `python scripts/gabarito-cego/extrai.py <chave.json>` (gera `Hackathon/gabarito-cego/packs`; o embaralhamento é determinístico) e `python confere.py` com `chave.json` na mesma pasta do script. A chave fica fora do repositório para não vazar aos solucionadores.

## Relatório anterior (09/11) — descartado

O relatório do Gemini Flash que declarava "0 erros em 1005 questões" foi descartado: era uma auditoria autodeclarada, com os nomes dos setores trocados, sem evidência de que as contas foram refeitas.

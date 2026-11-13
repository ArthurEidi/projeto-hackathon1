#!/usr/bin/env bash
# Publica no GitHub SOMENTE se tudo passar. Uso: npm run publicar
# Ordem: valida -> busca o remoto e rebaseia -> valida de novo se vieram commits -> push.
set -euo pipefail
cd "$(dirname "$0")/.."
valida() { npm run lint:content && npm test && npm run typecheck && npm run build; }
if [ -n "$(git status --porcelain)" ]; then
  echo "ERRO: há mudanças sem commit. Faça commit (ou descarte) antes de publicar."; git status --short; exit 1
fi
valida
antes=$(git rev-parse HEAD)
git pull --rebase origin main
if [ "$(git rev-parse HEAD)" != "$antes" ]; then echo "Vieram commits do remoto: validando de novo."; valida; fi
git push origin main
echo "Publicado: $(git log --oneline -1)"

export type Caixa = { x: number; y: number; w: number; h: number };
export type Ponto = { x: number; y: number };
export type Obstaculo = { caixa: Caixa; folgaX?: number; folgaY?: number };

export function caixaDoCentro(pos: Ponto, w: number, h: number): Caixa {
  return { x: pos.x - w / 2, y: pos.y - h / 2, w, h };
}

export function caixasColidem(a: Caixa, b: Caixa, folgaX = 6, folgaY = 4): boolean {
  return (
    a.x < b.x + b.w + folgaX &&
    b.x < a.x + a.w + folgaX &&
    a.y < b.y + b.h + folgaY &&
    b.y < a.y + a.h + folgaY
  );
}

export function dentroDosLimites(r: Caixa, limites: Caixa): boolean {
  return (
    r.x >= limites.x &&
    r.x + r.w <= limites.x + limites.w &&
    r.y >= limites.y &&
    r.y + r.h <= limites.y + limites.h
  );
}

function areaIntersecao(a: Caixa, b: Caixa, folgaX = 6, folgaY = 4): number {
  const mx = folgaX / 2;
  const my = folgaY / 2;
  const ix = Math.max(0, Math.min(a.x + a.w + mx, b.x + b.w + mx) - Math.max(a.x - mx, b.x - mx));
  const iy = Math.max(0, Math.min(a.y + a.h + my, b.y + b.h + my) - Math.max(a.y - my, b.y - my));
  return ix * iy;
}

export function colideComAlgum(r: Caixa, ocupados: readonly Obstaculo[]): boolean {
  return ocupados.some((o) => caixasColidem(r, o.caixa, o.folgaX ?? 6, o.folgaY ?? 4));
}

export function candidatosAoRedor(ancora: Ponto, preferido: Ponto, w: number, h: number): Ponto[] {
  const dx = Math.max(36, w / 2 + 16);
  const dy = Math.max(22, h / 2 + 10);
  return [
    preferido,
    { x: ancora.x + dx, y: ancora.y - dy },
    { x: ancora.x - dx, y: ancora.y - dy },
    { x: ancora.x + dx, y: ancora.y + dy },
    { x: ancora.x - dx, y: ancora.y + dy },
    { x: ancora.x, y: ancora.y - (dy + 4) },
    { x: ancora.x, y: ancora.y + (dy + 4) },
    { x: ancora.x + dx + 10, y: ancora.y },
    { x: ancora.x - dx - 10, y: ancora.y },
    { x: ancora.x, y: ancora.y - (dy + 34) },
    { x: ancora.x, y: ancora.y + (dy + 34) },
  ];
}

export function escolherPosicao(
  candidatos: readonly Ponto[],
  w: number,
  h: number,
  ocupados: readonly Obstaculo[],
  limites: Caixa,
): { pos: Ponto; caixa: Caixa; livre: boolean } {
  for (const pos of candidatos) {
    const r = caixaDoCentro(pos, w, h);
    if (dentroDosLimites(r, limites) && !colideComAlgum(r, ocupados)) {
      return { pos, caixa: r, livre: true };
    }
  }
  for (const pos of candidatos) {
    const r = caixaDoCentro(pos, w, h);
    if (!colideComAlgum(r, ocupados)) {
      return { pos, caixa: r, livre: true };
    }
  }
  let melhor = { pos: candidatos[0], caixa: caixaDoCentro(candidatos[0], w, h), livre: false };
  let melhorCusto = Infinity;
  for (const pos of candidatos) {
    const r = caixaDoCentro(pos, w, h);
    let custo = 0;
    for (const o of ocupados) {
      custo += areaIntersecao(r, o.caixa, o.folgaX ?? 6, o.folgaY ?? 4);
    }
    if (!dentroDosLimites(r, limites)) custo += 500;
    if (custo < melhorCusto) {
      melhorCusto = custo;
      melhor = { pos, caixa: r, livre: false };
    }
  }
  return melhor;
}

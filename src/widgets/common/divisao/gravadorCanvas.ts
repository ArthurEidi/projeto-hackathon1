// Só para testes (B39b): contexto 2D falso que grava o que foi escrito e pintado.
// measureText devolve 0,6 · tamanho da fonte por caractere (Nunito 900 fica perto disso), para testar se o texto cabe.

export interface TextoGravado {
  s: string;
  /** Extremos horizontais do texto, já considerando textAlign. */
  esq: number;
  dir: number;
  y: number;
  tamanho: number;
}

export interface Gravador {
  ctx: CanvasRenderingContext2D;
  textos: TextoGravado[];
  /** fillStyle de cada fill() (pontos, chips, anéis). */
  preenchimentos: string[];
}

export function gravadorCanvas(): Gravador {
  const textos: TextoGravado[] = [];
  const preenchimentos: string[] = [];
  const estado: Record<string, unknown> = { font: "900 16px Nunito", fillStyle: "", textAlign: "start" };
  const tamanho = () => Number(/(\d+(?:\.\d+)?)px/.exec(String(estado.font))?.[1] ?? 16);
  const largura = (s: string) => s.length * tamanho() * 0.6;
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k: string) => {
      if (k in estado) return estado[k];
      if (k === "measureText") return (s: string) => ({ width: largura(s) });
      if (k === "fillText")
        return (s: string, x: number, y: number) => {
          const w = largura(s);
          const esq = estado.textAlign === "center" ? x - w / 2 : estado.textAlign === "right" ? x - w : x;
          textos.push({ s, esq, dir: esq + w, y, tamanho: tamanho() });
        };
      if (k === "fill") return () => preenchimentos.push(String(estado.fillStyle));
      return () => undefined;
    },
    set: (_, k: string, v) => {
      estado[k] = v;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
  return { ctx, textos, preenchimentos };
}

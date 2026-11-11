// Botões de chave e arraste, compartilhados pelos widgets de geometria.
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { corDoTraco, type CorTraco } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import type { Pt } from "../../canvas";
import { alvoEm, type Alvo } from "./base";

export function Chave({ ligada, onClick, cor = "ink", children }: { ligada: boolean; onClick: () => void; cor?: CorTraco; children: ReactNode }) {
  const k = corDoTraco(cor);
  const estilo: CSSProperties = {
    minHeight: 40,
    padding: "0 14px",
    fontSize: 14,
    ["--c" as string]: ligada ? k.main : palette.bg,
    ["--c-dark" as string]: ligada ? k.dark : palette.lineDark,
    ["--c-text" as string]: ligada ? "#FFFFFF" : palette.ink2,
  };
  return (
    <button type="button" className="btn" style={estilo} aria-pressed={ligada} onClick={onClick}>
      {children}
    </button>
  );
}

export const linhaDeChaves: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, padding: "8px 10px 10px", justifyContent: "center" };

export interface ArrastoProps {
  alvos: () => Alvo[];
  /** Chamado a cada movimento (posição em pixels do canvas); `id` é o alvo agarrado. */
  onMove: (id: string, q: Pt) => void;
  /** Toque fora de qualquer alvo. */
  onToque?: (q: Pt) => void;
  onInteract: () => void;
}

/** Props de ponteiro para um <canvas> com alvos arrastáveis (mouse e toque). */
export function useArrasto({ alvos, onMove, onToque, onInteract }: ArrastoProps) {
  const ativo = useRef<string | null>(null);
  const local = (e: PointerEvent<HTMLCanvasElement>): Pt => {
    const b = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  };
  return {
    onPointerDown: (e: PointerEvent<HTMLCanvasElement>) => {
      const q = local(e);
      const a = alvoEm(alvos(), q);
      onInteract();
      if (!a) {
        onToque?.(q);
        return;
      }
      ativo.current = a.id;
      e.currentTarget.setPointerCapture(e.pointerId);
      onMove(a.id, q);
    },
    onPointerMove: (e: PointerEvent<HTMLCanvasElement>) => {
      if (ativo.current) onMove(ativo.current, local(e));
    },
    onPointerUp: () => {
      ativo.current = null;
    },
    onPointerCancel: () => {
      ativo.current = null;
    },
  };
}

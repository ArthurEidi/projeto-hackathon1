// Ícones desenhados em código, todos na mesma grade 24x24 e mesma espessura de traço.
import type React from "react";
import type { Icone } from "../engine/schema";
type P = { size?: number; color?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function IconClose({ size = 24, color = "currentColor" }: P) {
  return (
    <svg {...base(size)} stroke={color}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconReplay({ size = 22, color = "currentColor" }: P) {
  return (
    <svg {...base(size)} stroke={color}>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v4.5h4.5" />
    </svg>
  );
}

export function IconLock({ size = 26, color = "currentColor" }: P) {
  return (
    <svg {...base(size)} stroke={color}>
      <rect x="5" y="11" width="14" height="10" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function IconCheck({ size = 28, color = "currentColor" }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={3.5}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Cone visto de lado: triângulo com base elíptica. */
export function IconCone({ size = 28, color = "currentColor" }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2.5}>
      <path d="M12 3L4.5 18.5M12 3l7.5 15.5" />
      <ellipse cx="12" cy="18.5" rx="7.5" ry="2.5" />
    </svg>
  );
}

// ---------- Ícones das unidades da trilha (campo "icone" da taxonomia) ----------
const traco = (size: number, color: string, d: string[], extra?: React.ReactNode) => (
  <svg {...base(size)} stroke={color} strokeWidth={2.5}>
    {d.map((p, i) => (
      <path key={i} d={p} />
    ))}
    {extra}
  </svg>
);

const DESENHOS: Record<Exclude<Icone, "cone">, (s: number, c: string) => React.ReactNode> = {
  reta: (s, c) => traco(s, c, ["M4 20V4M4 20h16", "M6 17L19 6"]),
  parabola: (s, c) => traco(s, c, ["M4 20V4M4 20h16", "M6 6c3 14 9 14 12 0"]),
  curva: (s, c) => traco(s, c, ["M4 20V4M4 20h16", "M6 18c6 0 9-2 13-13"]),
  onda: (s, c) => traco(s, c, ["M3 12h18", "M3 12c2.5-7 6.5-7 9 0s6.5 7 9 0"]),
  conjunto: (s, c) => traco(s, c, [], <><circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" /></>),
  triangulo: (s, c) => traco(s, c, ["M5 19L12 5l7 14z"]),
  circulo: (s, c) => traco(s, c, ["M12 12l6-3"], <circle cx="12" cy="12" r="8" />),
  cubo: (s, c) => traco(s, c, ["M4 8l8-4 8 4v8l-8 4-8-4z", "M4 8l8 4 8-4M12 12v8"]),
  barras: (s, c) => traco(s, c, ["M4 20h16", "M7 20v-6M12 20V6M17 20v-9"]),
  matriz: (s, c) => traco(s, c, ["M7 4H4v16h3M17 4h3v16h-3", "M9 9h0M15 9h0M9 15h0M15 15h0"]),
  porcento: (s, c) => traco(s, c, ["M18 6L6 18"], <><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /></>),
  dado: (s, c) => traco(s, c, ["M8.5 8.5h0M15.5 15.5h0M12 12h0"], <rect x="4" y="4" width="16" height="16" rx="3" />),
  sequencia: (s, c) => traco(s, c, ["M4 20h16", "M5 20v-3h4v-4h4V9h4V5"]),
  complexo: (s, c) => traco(s, c, ["M4 12h16M12 4v16", "M12 12l5-5"], <circle cx="17" cy="7" r="1.5" />),
};

/** Ícone da unidade; sem ícone (ou "cone"), o cone de sempre. */
export function IconUnidade({ icone, size = 28, color = "currentColor" }: P & { icone?: Icone }) {
  if (!icone || icone === "cone") return <IconCone size={size} color={color} />;
  return <>{DESENHOS[icone](size, color)}</>;
}

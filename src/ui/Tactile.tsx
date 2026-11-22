import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { Marca } from "./marcas";

type Variant = "primary" | "secondary" | "danger" | Marca;

interface TactileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  block?: boolean;
  children: ReactNode;
}

export function TactileButton({ variant = "primary", block, className = "", children, ...rest }: TactileButtonProps) {
  const cls = ["btn", variant !== "primary" && `btn--${variant}`, block && "btn--block", className]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

export type CardState = "idle" | "selected" | "correct" | "wrong";

interface TactileCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  state?: CardState;
  children: ReactNode;
}

export function TactileCard({ state = "idle", className = "", children, ...rest }: TactileCardProps) {
  const cls = ["card", state !== "idle" && `card--${state}`, className].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} aria-pressed={state === "selected"} {...rest}>
      {children}
    </button>
  );
}

export function ProgressBar({ value, label = "Progresso da aula", etapas }: { value: number; label?: string; etapas?: number }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  // Com `etapas`, a barra vira uma fila de segmentos (um por passo): feitos cheios, o atual marcado.
  const feitas = etapas ? Math.round((pct / 100) * etapas) : 0;
  return (
    <div
      className={`progress${etapas ? " progress--etapas" : ""}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
    >
      {etapas ? (
        Array.from({ length: etapas }, (_, i) => (
          <span key={i} className={`progress__etapa${i < feitas ? " progress__etapa--feita" : i === feitas ? " progress__etapa--atual" : ""}`} />
        ))
      ) : (
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      )}
    </div>
  );
}

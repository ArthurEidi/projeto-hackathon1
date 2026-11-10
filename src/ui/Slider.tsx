import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  color?: string;
  onChange: (v: number) => void;
}

/** Slider tátil próprio: o trilho preenchido é um bloco sólido, sem o truque de gradiente do input range. */
export function Slider({ label, value, min, max, step = 1, unit = "", color, onChange }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const frac = (value - min) / (max - min);
  // Passo fracionário (0,5; 0,1) aparece com vírgula; passo inteiro continua sem casas.
  const casas = Number.isInteger(step) ? 0 : Math.min(2, (String(step).split(".")[1] ?? "").length);
  const texto = (Math.round(value * 1e6) / 1e6)
    .toLocaleString("pt-BR", { maximumFractionDigits: casas })
    .replace("-", "−");

  const clampStep = (v: number) => {
    const s = Math.round((v - min) / step) * step + min;
    return Math.max(min, Math.min(max, s));
  };

  const fromPointer = (e: PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const f = (e.clientX - rect.left - 20) / (rect.width - 40);
    onChange(clampStep(min + f * (max - min)));
  };

  const onKey = (e: KeyboardEvent) => {
    const big = step * 10;
    const map: Record<string, number> = {
      ArrowRight: value + step,
      ArrowUp: value + step,
      ArrowLeft: value - step,
      ArrowDown: value - step,
      PageUp: value + big,
      PageDown: value - big,
      Home: min,
      End: max,
    };
    if (e.key in map) {
      e.preventDefault();
      onChange(clampStep(map[e.key]));
    }
  };

  return (
    <div className={`slider${dragging ? " slider--dragging" : ""}`} style={color ? { ["--slider-color" as string]: color } : undefined}>
      <div className="slider__head">
        <span>{label}</span>
        <span className="slider__value">
          {texto}
          {unit}
        </span>
      </div>
      <div
        ref={trackRef}
        className="slider__track"
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${texto}${unit}`}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          fromPointer(e);
        }}
        onPointerMove={(e) => dragging && fromPointer(e)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <div className="slider__rail" />
        <div className="slider__fill" style={{ width: `calc(20px + ${frac} * (100% - 40px))` }} />
        <div className="slider__thumb" style={{ left: `calc(20px + ${frac} * (100% - 40px))` }} />
      </div>
    </div>
  );
}

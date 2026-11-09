// Ícones desenhados em código, todos na mesma grade 24x24 e mesma espessura de traço.
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

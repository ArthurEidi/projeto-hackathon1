// Geometria do cone reto gerado ao girar o triângulo O-A-B em torno do eixo y.
// O = centro da base (origem), A = vértice (0, h, 0), B = ponta do raio no ângulo t.
import type { Vec3 } from "./project";

export const DEG = Math.PI / 180;

export const apex = (h: number): Vec3 => [0, h, 0];
export const origin: Vec3 = [0, 0, 0];

/** Ponto do aro da base no ângulo t (rad). t = 90° fica do lado da câmera quando yaw = 0. */
export function rim(r: number, t: number): Vec3 {
  return [r * Math.cos(t), 0, r * Math.sin(t)];
}

export function generatrixLength(h: number, r: number): number {
  return Math.hypot(h, r);
}

export function distance(a: Vec3, b: Vec3): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

/** Raio da esfera que envolve o cone, centrada no meio da altura. */
export function boundingRadius(h: number, r: number): number {
  return Math.hypot(r, h / 2);
}

/** Ângulos de 0 até `to` (rad) em passos de no máximo `step`, incluindo o último. */
export function sweepAngles(to: number, step: number): number[] {
  if (to <= 0) return [0];
  const n = Math.max(1, Math.ceil(to / step));
  return Array.from({ length: n + 1 }, (_, i) => (i / n) * to);
}

/** Normaliza ângulo para [0, 2π). */
export function wrapAngle(t: number): number {
  const tau = Math.PI * 2;
  return ((t % tau) + tau) % tau;
}

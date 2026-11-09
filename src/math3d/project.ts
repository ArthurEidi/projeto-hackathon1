// Projeção ortográfica mínima. Mundo: y para cima, eixo do cone em y.
// Câmera: gira em torno de y (yaw) e depois inclina para baixo (pitch).
export type Vec3 = readonly [number, number, number];
export type Vec2 = readonly [number, number];

export interface Camera {
  yaw: number; // rad
  pitch: number; // rad, positivo = câmera acima olhando para baixo
  scale: number; // px por unidade
  cx: number; // px, onde o alvo aparece na tela
  cy: number;
  target: Vec3; // ponto do mundo que fica em (cx, cy)
}

/** Coordenadas de vista: x para a direita, y para cima, z para a câmera. */
export function toView(p: Vec3, yaw: number, pitch: number, target: Vec3 = [0, 0, 0]): Vec3 {
  const x = p[0] - target[0];
  const y = p[1] - target[1];
  const z = p[2] - target[2];
  const cyw = Math.cos(yaw);
  const syw = Math.sin(yaw);
  const x1 = x * cyw + z * syw;
  const z1 = -x * syw + z * cyw;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const y2 = y * cp - z1 * sp;
  const z2 = y * sp + z1 * cp;
  return [x1, y2, z2];
}

export interface Projected {
  x: number;
  y: number;
  depth: number;
}

export function project(p: Vec3, cam: Camera): Projected {
  const [vx, vy, vz] = toView(p, cam.yaw, cam.pitch, cam.target);
  return { x: cam.cx + vx * cam.scale, y: cam.cy - vy * cam.scale, depth: vz };
}

/**
 * Área com sinal do triângulo projetado, em coordenadas de tela (y para baixo).
 * Para os retalhos do cone montados como (vértice, aro(t), aro(t+dt)), positivo = de frente.
 */
export function screenArea(a: Projected, b: Projected, c: Projected): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

/** Escala que mantém uma esfera de raio R inteira na tela, estável em qualquer ângulo de câmera. */
export function fitScale(width: number, height: number, radius: number, margin = 1.18): number {
  return Math.min(width, height) / (2 * radius * margin);
}

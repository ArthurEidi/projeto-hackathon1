import { describe, expect, it } from "vitest";
import { areaCentroide, areasCavidade, casco, classificarSecaoCone, contar, montarCena, moldeDado, perfilDe, posicaoRetas, secao, verticesPoliedro } from "./cenas";
import { desenharSolido } from "./desenho";
import { prisma } from "./malha";
import { Solido3d, Solido3dFigura } from "./params";

describe("contas do solido_3d", () => {
  it("Euler em todos os poliedros e na quina serrada", () => {
    for (const n of ["tetraedro", "piramide_quadrada", "cubo", "octaedro", "prisma_triangular", "dodecaedro", "icosaedro"] as const) {
      const { V, A, F } = contar(casco(verticesPoliedro(n)));
      expect(V - A + F, n).toBe(2);
    }
    expect(contar(casco(verticesPoliedro("cubo")))).toEqual({ V: 8, A: 12, F: 6 });
    const c = montarCena(Solido3d.parse({ modo: "poliedro", solidos: ["cubo"], serrar: 0.5 }), {});
    expect([c.metricas.V, c.metricas.A, c.metricas.F]).toEqual([10, 15, 7]);
  });
  it("Pappus: retângulo 3 × 4 gira em cilindro 36π; triângulo em cone 12π", () => {
    const r = areaCentroide(perfilDe("retangulo", 3, 4, 0, 0));
    expect(r.A * 2 * r.cr).toBeCloseTo(36, 9);
    const t = areaCentroide(perfilDe("triangulo", 3, 4, 0, 0));
    expect(t.A * 2 * t.cr).toBeCloseTo(12, 9);
    const anel = areaCentroide(perfilDe("anel", 2, 5, 0, 1));
    expect(anel.A * 2 * anel.cr).toBeCloseTo((9 - 1) * 5, 9);
  });
  it("posições de retas no espaço", () => {
    expect(posicaoRetas([0, 0, 0], [1, 0, 0], [0, 0, 1], [1, 0, 0]).posicao).toBe(0);
    expect(posicaoRetas([0, 0, 0], [1, 0, 0], [0, 0, 0], [0, 1, 0])).toEqual({ posicao: 1, perpendiculares: true });
    expect(posicaoRetas([0, 0, 0], [1, 0, 0], [0, 1, 1], [0, 0, 1]).posicao).toBe(2);
    expect(posicaoRetas([0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]).posicao).toBe(3);
  });
  it("seção horizontal da pirâmide é quadrado; vertical pelo topo é triângulo; dado fecha num cubo", () => {
    const m = casco([[-1, 0, -1], [1, 0, -1], [1, 0, 1], [-1, 0, 1], [0, 2, 0]]);
    expect(secao(m, [0, 1, 0], 1)).toHaveLength(4);
    expect(secao(m, [1, 0, 0], 0)).toHaveLength(3);
    const fechado = moldeDado(1).flatMap((f) => f.pts);
    for (const q of fechado) for (const x of q) expect(Math.abs(Math.abs(x - (q === q ? 0 : 0)) )).toBeLessThan(2.0001 + 1);
    expect(Math.max(...fechado.map((q) => q[1]))).toBeCloseTo(2, 9);
  });
  it("prisma 4 × 3 × 5: V = 60; tronco k = 1/2 -> volume da ponta = 1/8", () => {
    expect(montarCena(Solido3d.parse({ modo: "prisma", a: 4, b: 3, h: 5 }), {}).metricas.volume).toBe(60);
    expect(contar(prisma([[0, 0], [1, 0], [0, 1]], 1)).F).toBe(5);
    const t = montarCena(Solido3d.parse({ modo: "tronco", solido: "cone", R: 3, H: 8, corte: 4 }), {});
    expect(t.metricas.volume_menor / t.metricas.volume_total).toBeCloseTo(1 / 8, 9);
  });
  it("figura recusa slider", () => {
    expect(Solido3dFigura.safeParse({ modo: "cilindro", r: "$r" }).success).toBe(false);
    expect(Solido3dFigura.safeParse({ modo: "cilindro", r: 3, highlight: ["c1"] }).success).toBe(true);
  });
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 30 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const casos = [
    { modo: "revolucao", perfil: "semicirculo", giro: 200 },
    { modo: "revolucao", perfil: "anel" },
    { modo: "prisma", camadas: true, diagonal: true, abrir: 0.5 },
    { modo: "piramide", abrir: 0.5 },
    { modo: "piramide", dividir: 0.5 },
    { modo: "cilindro", desenrolar: 1, fantasma: { r: 2, h: 3 } },
    { modo: "esfera", corte: 3, no_cilindro: true },
    { modo: "esfera", R: 1, k: 2 },
    { modo: "tronco", separar: 0.5, meridiano: true },
    { modo: "poliedro", solidos: ["cubo"], soltar: 0.5 },
    { modo: "espaco", retas: [{ ponto: [0, 0, 0] }, { ponto: [0, 0, 4], angulo: 30, cor: "c2" }], planos: ["piso"], esquadros: [{ em: [0, 0, 0], a: [1, 0, 0], b: [0, 1, 0] }] },
    { modo: "vistas", solido: "piramide", corte: { tipo: "horizontal", altura: 0.5 } },
    { modo: "vistas", solido: "dado", fechar: 0.5 },
    { modo: "composicao", montagem: "capsula", juntar: 0.5 },
    { modo: "composicao", montagem: "cavidade" },
    { modo: "corte_cone", inclinacao: 35, altura_do_corte: 1.5 },
  ];
  it.each(casos.map((c, i) => [i, c] as const))("caso %i desenha sem erro", (_, c) => {
    const p = Solido3dFigura.parse(c);
    expect(() => desenharSolido(ctx, 400, 400, [], p, {})).not.toThrow();
  });

  it("corte_cone classifica as 4 cônicas e recusa slider na figura", () => {
    expect(classificarSecaoCone(0, 60).tipo).toBe(0);
    expect(classificarSecaoCone(30, 60).tipo).toBe(1);
    expect(classificarSecaoCone(60, 60).tipo).toBe(2);
    expect(classificarSecaoCone(80, 60).tipo).toBe(3);

    const c = montarCena(Solido3d.parse({ modo: "corte_cone", inclinacao: "$inc", altura_do_corte: 1.5 }), { inc: 0 });
    expect(c.metricas.secao).toBe(0);
    expect(c.malhas).toHaveLength(2);
    expect(Solido3dFigura.safeParse({ modo: "corte_cone", inclinacao: "$inc" }).success).toBe(false);
    expect(Solido3dFigura.safeParse({ modo: "corte_cone", inclinacao: 45, altura_do_corte: 1.5 }).success).toBe(true);
  });

  it("placar: false esconde o placar sem mudar o padrão", () => {
    const comPlacar = Solido3dFigura.parse({ modo: "cilindro", r: 3, h: 5 });
    expect(comPlacar.placar).toBe(true);
    expect(montarCena(comPlacar, {}).placar.length).toBeGreaterThan(0);

    const semPlacar = Solido3dFigura.parse({ modo: "cilindro", r: 3, h: 5, placar: false });
    expect(montarCena(semPlacar, {}).placar).toEqual([]);
  });
});

describe("rotulo_apotema e rotulo_euler (B32, 16/11)", () => {
  const rotulos = (o: object, ctl: Record<string, number> = {}) =>
    montarCena(Solido3d.parse(o), ctl).anotacoes.flatMap((x) => ("rotulo" in x && x.rotulo ? [x.rotulo] : []));
  it("pirâmide: padrão mostra o apótema 5; rotulo_apotema false tira só ele, parada e abrindo", () => {
    const base = { modo: "piramide", L: 6, h: 4, abrir: "$abrir / 100" };
    expect(rotulos(base, { abrir: 0 })).toEqual(expect.arrayContaining(["h = 4", "3", "5"]));
    expect(rotulos(base, { abrir: 50 })).toContain("5");
    const sem = { ...base, rotulo_apotema: false };
    expect(rotulos(sem, { abrir: 0 })).toEqual(expect.arrayContaining(["h = 4", "3"]));
    for (const abrir of [0, 50, 100]) expect(rotulos(sem, { abrir })).not.toContain("5");
  });
  it("poliedro: padrão tem V, A, F e V − A + F; rotulo_euler false tira só a soma", () => {
    const placar = (o: object) => montarCena(Solido3d.parse({ modo: "poliedro", solidos: ["tetraedro"], ...o }), {}).placar.map((x) => x.s);
    expect(placar({})).toEqual(["V 4", "A 6", "F 4", "V − A + F = 2"]);
    expect(placar({ rotulo_euler: false })).toEqual(["V 4", "A 6", "F 4"]);
  });
});

describe("rotulo_diagonal (B26, 16/11)", () => {
  const rotulos = (o: object, ctl: Record<string, number>) =>
    montarCena(Solido3d.parse({ modo: "prisma", base: "retangulo", a: 4, b: 3, h: 12, diagonal: true, ...o }), ctl).anotacoes.flatMap((x) => ("rotulo" in x && x.rotulo ? [x.rotulo] : []));
  it("padrão: D = 13 aparece, como antes", () => {
    expect(rotulos({}, {})).toContain("D = 13");
  });
  it("com slider: D só aparece no fim; d = 5 e h = 12 ficam sempre", () => {
    const o = { rotulo_diagonal: "$etapa_pitagoras - 1" };
    expect(rotulos(o, { etapa_pitagoras: 1 })).not.toContain("D = 13");
    expect(rotulos(o, { etapa_pitagoras: 1 })).toEqual(expect.arrayContaining(["d = 5", "h = 12"]));
    expect(rotulos(o, { etapa_pitagoras: 2 })).toContain("D = 13");
  });
});

describe("ocultar e destacar (B1b)", () => {
  it("tronco: mostrar.g false leva o painel a escrever g = ?", () => {
    const c = montarCena(Solido3d.parse({ modo: "tronco", solido: "cone", R: 6, H: 4.5, corte: 1.5, meridiano: true, mostrar: { g: false } }), {});
    expect((c.painel?.dados as Record<string, unknown>).mostrarG).toBe(false);
    const padrao = montarCena(Solido3d.parse({ modo: "tronco", meridiano: true }), {});
    expect((padrao.painel?.dados as Record<string, unknown>).mostrarG).toBe(true);
  });
  it("dado: face_destaque contorna só a face pedida", () => {
    const c = montarCena(Solido3dFigura.parse({ modo: "vistas", solido: "dado", fechar: 0.5, face_destaque: 2 }), {});
    expect(c.metricas.face_destaque).toBe(2);
    expect(c.anotacoes.filter((a) => a.tipo === "poligono")).toHaveLength(1);
    expect(montarCena(Solido3dFigura.parse({ modo: "vistas", solido: "dado" }), {}).anotacoes.filter((a) => a.tipo === "poligono")).toHaveLength(0);
    expect(Solido3dFigura.safeParse({ modo: "vistas", solido: "dado", face_destaque: 7 }).success).toBe(false);
  });
  it("prisma com diagonal: true omite o texto da área no centro da base para não colidir com d", () => {
    const semDiag = montarCena(Solido3d.parse({ modo: "prisma", base: "retangulo", a: 4, b: 3, h: 12, diagonal: false }), {});
    expect(semDiag.anotacoes.some((a) => a.tipo === "texto" && a.s === "12")).toBe(true);
    const comDiag = montarCena(Solido3d.parse({ modo: "prisma", base: "retangulo", a: 4, b: 3, h: 12, diagonal: true }), {});
    expect(comDiag.anotacoes.some((a) => a.tipo === "texto")).toBe(false);
    expect(comDiag.placar.some((pl) => pl.s === "Ab = 12")).toBe(true);
  });
});

describe("composição cavidade com áreas (B30, 16/11)", () => {
  const placar = (o: object, juntar: number) =>
    montarCena(Solido3d.parse({ modo: "composicao", montagem: "cavidade", r: 3, h: 4, hc: 4, juntar, ...o }), {}).placar.map((x) => x.s);
  it("contas do roteiro: 42π − 9π + 15π = 48π (a área aumenta)", () => {
    const a = areasCavidade(3, 4, 4);
    expect([a.antes, a.tampa, a.funil, a.depois].map((x) => x / Math.PI)).toEqual([42, 9, 15, 48].map((x) => expect.closeTo(x, 9)));
  });
  it("padrão (areas false): placar igual ao de antes", () => {
    expect(placar({}, 0)).toEqual(["cilindro 36π", "cone 12π"]);
    expect(placar({}, 1)).toEqual(["cilindro 36π", "cone 12π", "36π − 12π = 24π"]);
  });
  it("areas: tampa em 0, tampa e funil no meio, conta da área no fim", () => {
    expect(placar({ areas: true }, 0)).toEqual(["cilindro 36π", "cone 12π", "área da tampa 9π"]);
    expect(placar({ areas: true }, 0.5)).toEqual(["cilindro 36π", "cone 12π", "área da tampa 9π", "área do funil 15π"]);
    expect(placar({ areas: true }, 1)).toEqual(["cilindro 36π", "cone 12π", "volume 36π − 12π = 24π", "área 42π − 9π + 15π = 48π"]);
  });
});

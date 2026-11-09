"""Aula 01, Tela 3: o cone é cortado pelo plano que contém o eixo e revela o triângulo gerador.

Renderiza com a mesma projeção ortográfica do app (src/math3d/project.ts) e só polígonos
chapados, para o vídeo ter exatamente o visual das telas interativas: sem iluminação 3D,
sem gradiente, sem sombra.
"""

import numpy as np
from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,

    UR,
    BOLD,
    Create,
    FadeIn,
    FadeOut,
    Line,
    Polygon,
    RoundedRectangle,
    Scene,
    Text,
    VGroup,
    VMobject,
    ValueTracker,
    always_redraw,
    config,
    linear,
    smooth,
)

config.pixel_width = 1080
config.pixel_height = 1080
config.frame_width = 8
config.frame_height = 8
config.frame_rate = 30
config.background_color = "#F7F7F7"

H, R = 4.0, 3.0
C = {
    "h": "#1C8BE0",
    "h_dark": "#136AAD",
    "r": "#F28C00",
    "r_dark": "#C06F00",
    "g": "#D62F7A",
    "g_dark": "#A8225F",
    "g_tint": "#F9DDEA",
    "g_strong": "#F2BCD4",
    "ink": "#1B1B1B",
    "ink2": "#4B4B4B",
    "white": "#FFFFFF",
}
SCALE = 8 / (2 * np.hypot(R, H / 2) * 1.2)
DEG = np.pi / 180
APEX = np.array([0.0, H, 0.0])
ORIGIN3 = np.zeros(3)


def rim(t: float) -> np.ndarray:
    return np.array([R * np.cos(t), 0.0, R * np.sin(t)])


def to_view(p, yaw, pitch, target=ORIGIN3):
    x, y, z = np.asarray(p, float) - target
    cy, sy = np.cos(yaw), np.sin(yaw)
    x1 = x * cy + z * sy
    z1 = -x * sy + z * cy
    cp, sp = np.cos(pitch), np.sin(pitch)
    return np.array([x1, y * cp - z1 * sp, y * sp + z1 * cp])


class Cam:
    def __init__(self, yaw, pitch, tz, zoom=1.0):
        self.yaw, self.pitch, self.zoom = yaw, pitch, zoom
        self.target = np.array([0.0, H / 2, tz])

    def P(self, p):
        v = to_view(p, self.yaw, self.pitch, self.target)
        k = SCALE * self.zoom
        return np.array([v[0] * k, v[1] * k, 0.0])

    def depth(self, p):
        return to_view(p, self.yaw, self.pitch, self.target)[2]

    def faces_camera(self, normal):
        return to_view(normal, self.yaw, self.pitch)[2] > 1e-9


def flat(points, fill, opacity=1.0, stroke=None, stroke_width=0):
    poly = Polygon(*points, fill_color=fill, fill_opacity=opacity, stroke_width=stroke_width or 1.5)
    poly.set_stroke(stroke or fill, width=stroke_width or 1.5, opacity=opacity)
    return poly


def half_cone(cam: Cam, side: int, dx: float, surf: float, tri_near: float, tri_far: float, cut: float) -> VGroup:
    """Metade do cone (side=+1: x>=0, side=-1: x<=0) deslocada dx em x. Corte convexo,
    então basta descartar faces de costas: as visíveis não se sobrepõem."""
    off = np.array([dx, 0.0, 0.0])
    t0 = -np.pi / 2 if side > 0 else np.pi / 2
    n = 36
    ts = [t0 + np.pi * i / n for i in range(n + 1)]
    g = VGroup()
    if surf > 0.001:
        for a, b in zip(ts[:-1], ts[1:]):
            m = (a + b) / 2
            normal = np.array([H * np.cos(m), R, H * np.sin(m)])
            if cam.faces_camera(normal):
                g.add(flat([cam.P(APEX + off), cam.P(rim(a) + off), cam.P(rim(b) + off)], C["g_tint"], surf))
        for k in range(12):
            t = k * 30 * DEG + 15 * DEG
            inside = (np.cos(t) >= 0) if side > 0 else (np.cos(t) <= 0)
            normal = np.array([H * np.cos(t), R, H * np.sin(t)])
            if inside and cam.faces_camera(normal):
                ln = Line(cam.P(APEX + off), cam.P(rim(t) + off), color=C["g_strong"], stroke_width=4)
                ln.set_stroke(opacity=surf)
                g.add(ln)
        for a, b in zip(ts[:-1], ts[1:]):
            m = (a + b) / 2
            if cam.faces_camera(np.array([H * np.cos(m), R, H * np.sin(m)])):
                ln = Line(cam.P(rim(a) + off), cam.P(rim(b) + off), color=C["ink2"], stroke_width=5)
                ln.set_stroke(opacity=surf)
                g.add(ln)
    # Face do corte: o triângulo isósceles, em duas metades retângulas.
    if cut > 0.001 and cam.faces_camera(np.array([-side, 0.0, 0.0])):
        near = [APEX, ORIGIN3, np.array([0, 0, R])]
        far = [APEX, ORIGIN3, np.array([0, 0, -R])]
        for pts, op in ((near, tri_near * cut), (far, tri_far * cut)):
            if op > 0.001:
                g.add(flat([cam.P(p + off) for p in pts], C["white"], op, C["ink2"], 4))
    return g


def chip(label: str, color: str, dark: str, at: np.ndarray) -> VGroup:
    txt = Text(label, font="Arial", weight=BOLD, color=C["white"], font_size=40)
    w = max(0.7, txt.width + 0.4)
    base = RoundedRectangle(corner_radius=0.14, width=w, height=0.66, fill_color=dark, fill_opacity=1, stroke_width=0)
    top = RoundedRectangle(corner_radius=0.14, width=w, height=0.66, fill_color=color, fill_opacity=1, stroke_width=0)
    base.shift(DOWN * 0.07)
    g = VGroup(base, top, txt.move_to(top.get_center() + UP * 0.01))
    return g.move_to(at)


class CorteMeridiano(Scene):
    def construct(self):
        yaw = ValueTracker(-10 * DEG)
        pitch = ValueTracker(22 * DEG)
        sep_l = ValueTracker(0.0)
        sep_r = ValueTracker(0.0)
        op_l = ValueTracker(1.0)
        surf = ValueTracker(1.0)
        far_tri = ValueTracker(1.0)
        tz = ValueTracker(0.0)
        zoom = ValueTracker(1.0)

        def scene_now():
            cam = Cam(yaw.get_value(), pitch.get_value(), tz.get_value(), zoom.get_value())
            # Enquanto as metades estão juntas, o cone é inteiro: a face do corte não aparece.
            cut = 1.0 if sep_l.get_value() >= 0.4 or op_l.get_value() < 1 else sep_l.get_value() / 0.4
            left = half_cone(cam, -1, -sep_l.get_value(), surf.get_value() * op_l.get_value(), op_l.get_value(), op_l.get_value(), cut)
            right = half_cone(cam, +1, sep_r.get_value(), surf.get_value(), 1.0, far_tri.get_value(), cut)
            # Pinta primeiro a metade mais distante da câmera.
            dl = cam.depth(np.array([-sep_l.get_value() - R * 0.4, H / 3, 0]))
            dr = cam.depth(np.array([sep_r.get_value() + R * 0.4, H / 3, 0]))
            return VGroup(left, right) if dl < dr else VGroup(right, left)

        cone = always_redraw(scene_now)

        # 1. O cone gira devagar: as linhas da superfície mostram o movimento.
        self.play(FadeIn(cone), run_time=0.6)
        self.play(yaw.animate.set_value(40 * DEG), run_time=2.4, rate_func=linear)

        # 2. Plano que contém o eixo.
        cam = Cam(40 * DEG, 22 * DEG, 0.0)
        corners = [(-0.7, -R - 0.9), (-0.7, R + 0.9), (H + 0.7, R + 0.9), (H + 0.7, -R - 0.9)]
        plane = Polygon(*[cam.P(np.array([0.0, y, z])) for y, z in corners], stroke_color=C["ink"], stroke_width=5, fill_opacity=0)
        self.play(Create(plane), run_time=0.8)
        self.wait(0.3)

        # 3. As metades se afastam e expõem a seção meridiana.
        self.play(sep_l.animate.set_value(1.6), sep_r.animate.set_value(1.6), FadeOut(plane), run_time=1.2, rate_func=smooth)

        # 4. A metade da esquerda sai; a da direita vira de frente para o corte.
        self.play(op_l.animate.set_value(0.0), run_time=0.6)
        self.play(
            sep_r.animate.set_value(0.0),
            yaw.animate.set_value(90 * DEG),
            pitch.animate.set_value(0.0),
            run_time=1.5,
            rate_func=smooth,
        )

        # 5. Sobra só o triângulo isósceles do corte.
        self.play(surf.animate.set_value(0.0), run_time=0.8)

        # 6. Metade dele é o triângulo retângulo do início.
        self.play(far_tri.animate.set_value(0.0), tz.animate.set_value(R / 2), zoom.animate.set_value(1.45), run_time=1.0, rate_func=smooth)

        # 7. Altura, raio e geratriz nas cores fixas da aula.
        cam = Cam(90 * DEG, 0.0, R / 2, 1.45)
        a, o, b = cam.P(APEX), cam.P(ORIGIN3), cam.P(np.array([0.0, 0.0, R]))
        edge = lambda p, q, col: Line(p, q, color=col, stroke_width=14)
        e_h, e_r, e_g = edge(o, a, C["h"]), edge(o, b, C["r"]), edge(a, b, C["g"])
        s = 0.4
        mark = VMobject(stroke_color=C["ink2"], stroke_width=5)
        mark.set_points_as_corners([o + RIGHT * s, o + RIGHT * s + UP * s, o + UP * s])
        self.play(Create(e_h), run_time=0.4)
        self.play(Create(e_r), run_time=0.4)
        self.play(Create(e_g), FadeIn(mark), run_time=0.4)
        labels = VGroup(
            chip("h", C["h"], C["h_dark"], (o + a) / 2 + LEFT * 0.65),
            chip("r", C["r"], C["r_dark"], (o + b) / 2 + DOWN * 0.65),
            chip("g", C["g"], C["g_dark"], (a + b) / 2 + (UR * 0.55)),
        )
        self.play(FadeIn(labels, shift=UP * 0.1), run_time=0.6)
        self.wait(1.5)

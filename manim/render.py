"""Renderiza as cenas Manim e publica em public/videos com um frame de capa.

Uso: python manim/render.py   (ou npm run manim)
"""

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "manim" / "media"
OUT = ROOT / "public" / "videos"

# (arquivo da cena, classe, nome publicado, segundo usado como capa)
SCENES = [
    ("cones_aula01_corte.py", "CorteMeridiano", "cones_aula01_corte", 0.8),
]


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    for file, cls, name, poster_at in SCENES:
        src = ROOT / "manim" / "scenes" / file
        cmd = [sys.executable, "-m", "manim", "render", "--format", "mp4", "--media_dir", str(MEDIA), "--disable_caching", str(src), cls]
        print("$", " ".join(cmd))
        subprocess.run(cmd, check=True, cwd=ROOT)
        rendered = next(MEDIA.glob(f"videos/{src.stem}/**/{cls}.mp4"))
        mp4 = OUT / f"{name}.mp4"
        shutil.copyfile(rendered, mp4)
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-ss", str(poster_at), "-i", str(mp4), "-frames:v", "1", str(OUT / f"{name}.png")],
            check=True,
        )
        print(f"publicado: public/videos/{name}.mp4 (+ .png)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

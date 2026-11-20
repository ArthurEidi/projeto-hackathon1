import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import type { InteractiveCanvasStep } from "../engine/schema";
import { InteractiveCanvas } from "./InteractiveCanvas";

// Executa o efeito de conclusão durante a renderização, sem depender de um DOM.
vi.mock("react", async (importOriginal) => {
  const react = await importOriginal<typeof import("react")>();
  return { ...react, useEffect: (effect: () => void) => effect() };
});

vi.mock("../widgets/registry", () => ({
  widgets: {
    revolution: {
      Widget: () => null,
      metricas: (params: Record<string, unknown>, controls: Record<string, number>) => ({
        total: controls.total + Number(params.ajuste),
      }),
    },
    generatrix: { Widget: () => null },
  },
}));

vi.mock("./StepLayout", () => ({
  StepLayout: ({ footer }: { footer: import("react").ReactNode }) => footer,
  duvidaLiberada: () => undefined,
}));

afterEach(() => vi.unstubAllGlobals());

it.each([
  { widget: "revolution", initial: 4, ajuste: -4, conclui: false },
  { widget: "revolution", initial: 0, ajuste: 4, conclui: true },
  { widget: "generatrix", initial: 4, ajuste: -4, conclui: true },
] as const)(
  "$widget com total bruto $initial e ajuste $ajuste conclui: $conclui",
  ({ widget, initial, ajuste, conclui }) => {
    vi.stubGlobal("navigator", {});
    const step = {
      type: "interactive_canvas",
      id: "metricas",
      widget,
      params: { ajuste: 0 },
      antes_de_concluir: { ajuste },
      controls: [{ id: "total", label: "Total", min: 0, max: 4, step: 1, initial, unit: "", color: "c1" }],
      lines: { intro: "Ajuste o total.", done: "Concluído." },
      complete_when: { metric: "total", gte: 4 },
    } satisfies InteractiveCanvasStep;
    const html = renderToStaticMarkup(<InteractiveCanvas step={step} onNext={() => {}} />);
    expect(html).toContain("Continuar");
    expect(html.includes("disabled")).toBe(!conclui);
  },
);

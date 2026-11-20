import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import type { InteractiveCanvasStep } from "../../../engine/schema";
import { InteractiveCanvas } from "../../../steps/InteractiveCanvas";
import { widgets } from "../../registry";

// Executa o efeito de conclusão durante a renderização, sem depender de um DOM.
vi.mock("react", async (importOriginal) => {
  const react = await importOriginal<typeof import("react")>();
  return { ...react, useEffect: (effect: () => void) => effect() };
});
vi.mock("../../../steps/StepLayout", () => ({
  StepLayout: ({ footer }: { footer: import("react").ReactNode }) => footer,
  duvidaLiberada: () => undefined,
}));

afterEach(() => vi.unstubAllGlobals());

it.each([
  { initial: 11.5, regra: { metric: "m", gte: 11 }, conclui: false },
  { initial: 12, regra: { metric: "m", gte: 11 }, conclui: true },
  { initial: 11.5, regra: { metric: "eh_mmc", gte: 1 }, conclui: false },
  { initial: 12, regra: { metric: "eh_mmc", gte: 1 }, conclui: true },
  { initial: 24, regra: { metric: "eh_mmc", gte: 1 }, conclui: false },
])("MMC com total $initial e regra $regra conclui: $conclui", ({ initial, regra, conclui }) => {
  vi.stubGlobal("navigator", {});
  const step = {
    type: "interactive_canvas",
    id: "mmc",
    widget: "grupos_inteiros",
    params: { modo: "mmc", m: "$m", a: 4, b: 6 },
    controls: [{ id: "m", label: "Total", min: 4, max: 24, step: 0.5, initial, unit: "", color: "c1" }],
    lines: { intro: "Escolha o total.", done: "Concluído." },
    complete_when: regra,
  } satisfies InteractiveCanvasStep;
  const html = renderToStaticMarkup(<InteractiveCanvas step={step} onNext={() => {}} />);
  expect(html).toContain("Continuar");
  expect(html.includes("disabled")).toBe(!conclui);
});

it("expõe um divisor não finito como métrica inválida", () => {
  const metricas = widgets.grupos_inteiros.metricas?.({ modo: "divisao", n: 6, d: "1/0" }, {});
  expect(metricas?.d).toBeNaN();
});

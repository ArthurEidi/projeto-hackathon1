// Utilitários dos testes de conteúdo (capítulos com widget `barras`): carregam a aula e conferem estruturas comuns.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect } from "vitest";
import { Lesson } from "../engine/schema";

export type Aula = ReturnType<typeof Lesson.parse>;

export const carregar = (rel: string): Aula =>
  Lesson.parse(JSON.parse(readFileSync(join(import.meta.dirname, "../../content", rel), "utf8")));

export const certaDe = (L: Aula, id: string): string =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;

export const passo = (L: Aula, id: string) => L.steps.find((s) => s.id === id)!;

/** Métricas que o widget `barras` emite, por modo (GUIA §5.3). */
const METRICAS: Record<string, string[]> = {
  categorias: ["barras_tocadas", "tipo_linha", "tipo_setores", "regua_relativa", "respostas"],
  amostragem: ["amostra_pct", "erro", "vicio_ligado", "amostras"],
  pontos: ["arrastes", "equilibrio", "maior_valor", "media", "mediana", "desvios_ligados", "quadrados_ligados", "somou", "fila_ligada", "meios_tocados"],
  fila: ["ordenou", "q1_certo", "q2_certo", "q3_certo", "cortes_certos", "caixa_desenhada", "maior_valor", "atipicos"],
  sequencia: ["termo_n", "soma_n", "sinal_trocou", "barras_tocadas"],
  parte_todo: ["fracao", "porcento", "pintadas", "partes", "equivalente"],
};

/** Todo interactive_canvas é concluível: slider alcança o alvo ou a métrica existe no modo do widget. */
export function passosConcluiveis(L: Aula) {
  for (const s of L.steps) {
    if (s.type !== "interactive_canvas") continue;
    const { metric, gte, lte } = s.complete_when;
    const sl = s.controls.find((c) => c.id === metric);
    if (sl) {
      if (gte !== undefined) expect(sl.max, s.id).toBeGreaterThanOrEqual(gte);
      if (lte !== undefined) expect(sl.min, s.id).toBeLessThanOrEqual(lte);
      expect(sl.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
      const alvo = (gte ?? lte)!;
      expect(((alvo - sl.min) / sl.step) % 1, `${s.id}: alvo fora do passo do slider`).toBeCloseTo(0, 9);
    } else {
      const modo = (s.params as { modo?: string }).modo ?? "";
      expect(METRICAS[modo], `${s.id}: modo ${modo}`).toContain(metric);
    }
  }
}

/** Cada letra do fechamento tem significado no glossário. */
export function fechamentoOk(L: Aula) {
  const s = L.steps.find((x) => x.type === "concept_lock");
  if (!s || s.type !== "concept_lock") throw new Error("sem fechamento");
  for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
}

export const semVestibular = (L: Aula) => expect(L.treino.vestibular).toEqual([]);

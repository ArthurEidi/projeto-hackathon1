import type { CompleteWhen } from "./schema";

export type Metrics = Record<string, number>;

export function isComplete(rule: CompleteWhen, metrics: Metrics): boolean {
  const v = metrics[rule.metric];
  return typeof v === "number" && v >= rule.gte;
}

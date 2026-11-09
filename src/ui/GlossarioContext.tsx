// Glossário da aula em uso, disponível para qualquer Dica dentro dos widgets e figuras.
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { GLOSSARIO, type Glossario } from "./glossario";

const Ctx = createContext<Glossario>(GLOSSARIO);

/** Soma o glossário da aula ao padrão (as entradas da aula têm prioridade). */
export function GlossarioProvider({ glossario, children }: { glossario?: Glossario; children: ReactNode }) {
  const valor = useMemo(() => ({ ...GLOSSARIO, ...glossario }), [glossario]);
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export const useGlossario = () => useContext(Ctx);

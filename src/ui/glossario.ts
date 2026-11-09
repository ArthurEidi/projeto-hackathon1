// Resumos das grandezas, mostrados na dica ao passar o mouse (ou tocar) em um rótulo.
// Uma frase curta cada: a dica lembra o que é, não ensina de novo.
// O glossário padrão é o do cone (h, r, g). Cada aula pode trazer o seu no JSON ("glossario"),
// que é somado a este pelo GlossarioProvider.
import type { Marca } from "./marcas";

export interface EntradaGlossario {
  nome: string;
  resumo: string;
}
export type Glossario = Partial<Record<Marca, EntradaGlossario>>;

export const GLOSSARIO: Glossario = {
  h: { nome: "Altura", resumo: "Distância do vértice ao centro da base." },
  r: { nome: "Raio", resumo: "Distância do centro da base até a borda." },
  g: { nome: "Geratriz", resumo: "Segmento que liga o vértice à borda da base." },
};

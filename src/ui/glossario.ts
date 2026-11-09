// Resumos das grandezas, mostrados na dica ao passar o mouse (ou tocar) em um rótulo.
// Uma frase curta cada: a dica lembra o que é, não ensina de novo.
import type { Magnitude } from "../widgets/params";

export const GLOSSARIO: Record<Magnitude, { nome: string; resumo: string }> = {
  h: { nome: "Altura", resumo: "Distância do vértice ao centro da base." },
  r: { nome: "Raio", resumo: "Distância do centro da base até a borda." },
  g: { nome: "Geratriz", resumo: "Segmento que liga o vértice à borda da base." },
};

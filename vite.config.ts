import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Build com base relativa: o dist/ funciona em qualquer subcaminho (GitHub Pages, pasta de um servidor).
// As rotas são por hash (#/aula/...), então o servidor não precisa reescrever URL. Ver docs/HOSPEDAGEM.md.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "./" : "/",
  plugins: [react()],
  server: { port: 5173 },
}));

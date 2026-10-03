import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Jonathan-Elbert-HW-3/", // harus sama persis dengan nama repo GitHub
  plugins: [react()],
});

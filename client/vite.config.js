import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/greensocialsite/",
  build: {
    outDir: "dist",
    assetsDir: "assets"
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:4000"
    }
  }
});

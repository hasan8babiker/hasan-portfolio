import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from "@mdx-js/rollup";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/hasan-portfolio/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mdx(),
    react(),
    mode === "development" && componentTagger(),
    {
      name: "copy-404",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "404.html",
          source: fs.readFileSync("./404.html", "utf-8"),
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

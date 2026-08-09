import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "src/public",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});

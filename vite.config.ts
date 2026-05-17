import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["firebase/firestore"],
  },
  build: {
    rollupOptions: {
      plugins: [nodeResolve()],
    },
  },
});

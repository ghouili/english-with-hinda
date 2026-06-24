import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8000,
    hmr: {
      overlay: false,
    },
    proxy:
      mode === "development"
        ? {
            "/api": "http://localhost:4000",
            "/media": "http://localhost:4000",
          }
        : undefined,
  },
  plugins: react().filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split large, stable vendor libraries into their own cached chunks
        // so the app entry stays small and vendor code isn't re-downloaded
        // on every app change.
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          animation: ["framer-motion"],
          i18n: ["i18next", "react-i18next"],
        },
      },
    },
  },
}));

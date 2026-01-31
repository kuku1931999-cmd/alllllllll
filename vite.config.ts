import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  appType: 'spa',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  // نقطة الانطلاق هي مجلد client
  root: path.resolve(__dirname, "client"),
  build: {
    // سيقوم بإنشاء مجلد dist داخل مجلد client
    outDir: "dist", 
    emptyOutDir: true,
  },
  server: {
    historyApiFallback: true,
  },
});
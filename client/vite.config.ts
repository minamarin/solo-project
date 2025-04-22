import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any call to /api/** will be forwarded to port 5000
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
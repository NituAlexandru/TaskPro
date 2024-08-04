import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/TaskPro/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://taskpro-backend-v1ea.onrender.com",
        // target: "http://localhost:4500",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

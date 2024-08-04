import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import API_BASE_URL from "./src/utils/apiConfig";

export default defineConfig({
  base: "/TaskPro",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `${API_BASE_URL}`,
        // target: "https://taskpro-backend-v1ea.onrender.com"
        // target: "http://localhost:4500",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

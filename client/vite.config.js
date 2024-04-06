import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
  },
  assetsInclude: [
    "**/*.svg",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.webp",
    "**/*.ico",
  ],
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      secure: false,
      changeOrigin: true,
    },
    "/img": {
      target: "http://localhost:5000",
      secure: false,
      changeOrigin: true,
    },
  },
});


import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      fs: {
        strict: false,
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    optimizeDeps: {
      include: ["recharts"],
    },
    define: {
      'import.meta.env.VITE_WS_TOKEN': JSON.stringify(env.VITE_WS_TOKEN || "")
    },
    envPrefix: 'VITE_',
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'PURE_COMMENT_HAS_INVALID_ANNOTATION') return;
          warn(warning);
        }
      }
    }
  };
});

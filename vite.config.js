import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'], // Пример за отделяне на външни библиотеки
          },
        },
      },
    },
    plugins: [
      react(),
      visualizer({
        filename: './build/stats.html', // Пътят, където ще се генерира HTML файлът
        open: true, // Автоматично отваряне на файла след билд
        gzipSize: true, // Показване на gzip размера
        brotliSize: true, // Показване на brotli размера
      }),
    ],
    define: {
      'import.meta.env': JSON.stringify(env),
    },
    envPrefix: 'VITE_',
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
        'Cross-Origin-Embedder-Policy': 'unsafe-none',
      },
    },
  };
});
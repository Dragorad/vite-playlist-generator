import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    define: {
      'import.meta.env': JSON.stringify(env)
    },
    envPrefix: 'VITE_'
  }
})
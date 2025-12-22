import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Habilitar Fast Refresh
      fastRefresh: true,
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Optimización del bundle
    minify: 'esbuild', // Cambiar de 'terser' a 'esbuild' (más rápido y compatible)
    // Configuración de chunks para mejor caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar las librerías grandes en chunks individuales
          'react-vendor': ['react', 'react-dom'],
          'pdf-vendor': ['html2canvas', 'jspdf'],
          'ui-vendor': ['lucide-react']
        },
        // Nombres de archivo con hash para mejor caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
      // Excluir componentes UI no utilizados del bundle
      external: [],
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    },
    // Aumentar el límite de tamaño de chunk warning
    chunkSizeWarningLimit: 1000,
    // Optimización de assets
    assetsInlineLimit: 4096, // Inline assets < 4kb
    // Reportar tamaño del bundle comprimido
    reportCompressedSize: true,
    // Sourcemaps deshabilitados en producción
    sourcemap: false
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: ['html2canvas', 'jspdf'] // Lazy load estas librerías pesadas
  },
  // Performance
  server: {
    hmr: true
  }
});
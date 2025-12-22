# 📦 ARCHIVOS PARA COPIAR A TU PC

## ⚠️ IMPORTANTE: ORDEN DE COPIA

Copia estos archivos **EN ESTE ORDEN** desde Figma Make a tu carpeta local:

---

## 1️⃣ `.gitignore` (NUEVO ARCHIVO - Créalo en la raíz)

**Ubicación:** En la raíz del proyecto (mismo nivel que `package.json`)

**Contenido completo:**
```
# Dependencias
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Build output
dist/
build/
.vite/
*.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.production

# Editor directories and files
.vscode/
!.vscode/extensions.json
.idea/
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Testing
coverage/
.nyc_output/

# Misc
.cache/
.temp/
.tmp/
*.tsbuildinfo
```

---

## 2️⃣ `tsconfig.json` (ACTUALIZADO)

**Ubicación:** En la raíz del proyecto

**⚠️ CAMBIO IMPORTANTE:** Eliminada la línea `"figma:asset/*": ["./public/*"]`

**Contenido completo:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["src", "App.tsx", "components"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 3️⃣ `vite.config.ts` (YA DEBERÍA ESTAR CORRECTO)

**Ubicación:** En la raíz del proyecto

**⚠️ VERIFICAR:** La línea 20 debe decir `minify: 'esbuild',` (NO `'terser'`)

**Contenido completo:**
```typescript
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
    minify: 'esbuild', // ⚠️ DEBE SER 'esbuild', NO 'terser'
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
```

---

## 4️⃣ `App.tsx` (YA DEBERÍA ESTAR CORRECTO)

**Ubicación:** En la raíz del proyecto

**⚠️ VERIFICAR:** 
- Línea 1: Debe tener `import { useState, useRef, useMemo, useCallback } from 'react';`
- Línea 338: Debe tener `<img src="/logo-onus.png"` (NO debe tener import de figma:asset)

**El archivo es muy largo (1400+ líneas), así que solo verifica:**

1. **Primeras 7 líneas:**
```typescript
import { useState, useRef, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Truck, Clock, Download, X } from 'lucide-react';

export default function App() {
```

2. **Busca en el archivo (Ctrl+F) la línea que contiene "ONUS Express" en un img tag:**
```typescript
<img src="/logo-onus.png" alt="ONUS Express" className="h-[43px] w-auto" />
```

✅ **Si estas dos cosas están correctas, el archivo está bien.**

---

## 5️⃣ `public/logo-onus.png` (YA EXISTE - NO TOCAR)

**Ubicación:** `public/logo-onus.png`

✅ Este archivo **YA EXISTE** en tu carpeta local. **NO LO BORRES NI LO MODIFIQUES.**

---

## ✅ RESUMEN DE CAMBIOS

| Archivo | Acción | Cambio principal |
|---------|--------|------------------|
| `.gitignore` | **CREAR** | Archivo nuevo que excluye `node_modules/` y `dist/` |
| `tsconfig.json` | **ACTUALIZAR** | Eliminar alias `"figma:asset/*"` |
| `vite.config.ts` | **VERIFICAR** | Debe usar `minify: 'esbuild'` |
| `App.tsx` | **VERIFICAR** | No debe tener `import ... from 'figma:asset/...'` |
| `public/logo-onus.png` | **NO TOCAR** | Ya existe, no modificar |

---

## 🧪 DESPUÉS DE COPIAR, PRUEBA:

```bash
npm install
npm run build
```

✅ Si ves `✓ built in X.XXs` → **¡PERFECTO!**

❌ Si ves algún error → **Copia el error y dímelo**

---

## 📤 LUEGO SUBE A GIT:

```bash
git add .gitignore tsconfig.json vite.config.ts App.tsx
git commit -m "fix: Configuración completa para Vercel deployment"
git push
```

---

¿Todo claro? ¡Avísame cuando hayas copiado los archivos y probado el build! 🚀

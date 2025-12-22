# 🚀 GUÍA RÁPIDA DE DEPLOYMENT - RESUMEN EJECUTIVO

## ⏱️ Tiempo estimado: 5-10 minutos

---

## 📋 PASO 1: DESCARGAR ARCHIVOS ACTUALIZADOS

### ✅ Archivos que DEBES copiar de Figma Make a tu PC:

1. **`.gitignore`** (NUEVO - créalo en la raíz)
2. **`tsconfig.json`** (ACTUALIZADO)
3. **`vite.config.ts`** (ACTUALIZADO)
4. **`App.tsx`** (ACTUALIZADO)

### 📁 ¿Dónde encontrarlos en Figma Make?

- Haz clic en el icono de carpeta 📁 en el panel izquierdo
- Busca cada archivo por nombre
- Copia todo el contenido
- Pégalo en tu editor de código (VSCode, Notepad++, etc.)
- Guarda (Ctrl+S)

### ⚠️ IMPORTANTE:
- **NO toques** `public/logo-onus.png` (ya existe en tu PC)
- **NO borres** ningún otro archivo

---

## 🧪 PASO 2: VERIFICAR (OPCIONAL PERO RECOMENDADO)

### Opción A: Script automático (Windows PowerShell)

```powershell
.\verificar.ps1
```

### Opción B: Manual

```bash
# ¿Existe .gitignore?
dir .gitignore

# ¿Existe el logo?
dir public\logo-onus.png

# ¿tsconfig.json NO tiene "figma:asset"?
findstr "figma:asset" tsconfig.json
# (No debe mostrar nada)

# ¿vite.config.ts usa "esbuild"?
findstr "esbuild" vite.config.ts
# (Debe mostrar: minify: 'esbuild')
```

---

## 🔨 PASO 3: INSTALAR Y BUILD

```bash
# 1. Instalar dependencias (si no lo hiciste antes)
npm install

# 2. Probar el build
npm run build
```

### ✅ Resultado esperado:

```
vite v5.1.0 building for production...
✓ 125 modules transformed.
dist/index.html                   1.45 kB
dist/assets/index-abc123.css     45.23 kB
dist/assets/index-xyz789.js     234.56 kB
✓ built in 3.45s
```

### ❌ Si hay error:

- Copia el mensaje de error completo
- Dímelo para ayudarte

---

## 📤 PASO 4: SUBIR A GIT

```bash
# 1. Ver qué archivos cambiaron
git status

# 2. Agregar archivos
git add .gitignore tsconfig.json vite.config.ts App.tsx

# 3. Commit
git commit -m "fix: Configuración completa para Vercel - esbuild + logo local + gitignore"

# 4. Push
git push origin main
```

**Nota:** Si tu rama se llama `master` en lugar de `main`, usa:
```bash
git push origin master
```

---

## ⏳ PASO 5: ESPERAR DEPLOYMENT EN VERCEL

1. Ve a: https://vercel.com/dashboard
2. Busca tu proyecto
3. Pestaña **"Deployments"**
4. Espera 2-3 minutos
5. Verás: **"Ready"** con ✓ verde

### ✅ Si funciona:

¡Felicidades! Tu aplicación está desplegada.

Puedes verla en la URL que Vercel te da (algo como: `https://tu-proyecto.vercel.app`)

### ❌ Si falla:

1. Haz clic en el deployment fallido
2. Clic en **"View Build Logs"**
3. Copia el error
4. Dímelo para ayudarte

---

## 🆘 PROBLEMAS COMUNES

### Error: "vite no se reconoce como comando"

**Solución:**
```bash
npm install
```

### Error: "Cannot find module..."

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error en Git: "fatal: not a git repository"

**Solución:**
```bash
git init
git remote add origin <TU-URL-DE-GITHUB>
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Error en Vercel: "No Output Directory"

**Solución:**
- Ve a Vercel Dashboard → Settings → Build & Development Settings
- **Output Directory:** `dist`
- **Build Command:** `npm run build`
- Haz un nuevo deployment

---

## 📞 ¿NECESITAS AYUDA?

Si algo no funciona, dime:

1. ¿En qué paso estás?
2. ¿Qué comando ejecutaste?
3. ¿Qué error apareció?

¡Estoy aquí para ayudarte! 🚀

---

## ✅ CHECKLIST FINAL

- [ ] Copié `.gitignore` (nuevo)
- [ ] Copié `tsconfig.json` (actualizado)
- [ ] Copié `vite.config.ts` (actualizado)
- [ ] Copié `App.tsx` (actualizado)
- [ ] Ejecuté `npm install`
- [ ] Ejecuté `npm run build` → ✓ Exitoso
- [ ] Ejecuté `git add`, `git commit`, `git push`
- [ ] Vercel mostró "Ready" ✓

---

¡Éxito! 🎉

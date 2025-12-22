# ✅ CHECKLIST DE VERIFICACIÓN PRE-DEPLOYMENT

## 📋 Pasos a seguir en tu ordenador local:

### 1️⃣ **COPIAR ARCHIVOS ACTUALIZADOS**

Descarga y reemplaza estos archivos en tu carpeta local del proyecto:

- ✅ `/.gitignore` (NUEVO - créalo)
- ✅ `/tsconfig.json` (ACTUALIZADO)
- ✅ `/vite.config.ts` (YA CORRECTO)
- ✅ `/App.tsx` (YA CORRECTO)

### 2️⃣ **VERIFICAR ESTRUCTURA DE CARPETAS**

Tu proyecto debe tener esta estructura:

```
📁 Tarifario Última Milla Onus 2026/
├── 📁 public/
│   └── logo-onus.png ✅ (Este archivo YA existe)
├── 📁 src/
│   └── main.tsx
├── 📁 components/
│   ├── 📁 figma/
│   └── 📁 ui/
├── 📁 styles/
│   └── globals.css
├── .gitignore ✅ (NUEVO)
├── App.tsx ✅ (ACTUALIZADO)
├── index.html
├── package.json
├── tsconfig.json ✅ (ACTUALIZADO)
├── tsconfig.node.json
├── vite.config.ts ✅ (ACTUALIZADO)
└── vercel.json
```

### 3️⃣ **INSTALAR DEPENDENCIAS** (solo si no lo hiciste antes)

```bash
npm install
```

⏳ Esto tardará 1-2 minutos.

### 4️⃣ **PROBAR EL BUILD LOCALMENTE**

```bash
npm run build
```

✅ **Deberías ver algo como:**
```
vite v5.1.0 building for production...
✓ 125 modules transformed.
dist/index.html                   1.45 kB │ gzip: 0.65 kB
dist/assets/index-abc123.css     45.23 kB │ gzip: 9.87 kB
dist/assets/index-xyz789.js     234.56 kB │ gzip: 78.12 kB
✓ built in 3.45s
```

❌ **Si ves algún error, NO CONTINÚES. Dime qué error aparece.**

### 5️⃣ **PROBAR EN MODO DESARROLLO** (opcional pero recomendado)

```bash
npm run dev
```

✅ Abre tu navegador en `http://localhost:5173`
- El logo de ONUS debe aparecer en el header
- El simulador debe funcionar correctamente
- Puedes probar descargar un PDF

Presiona `Ctrl+C` en la terminal para detener el servidor.

### 6️⃣ **VERIFICAR QUE .gitignore FUNCIONE**

```bash
git status
```

✅ **NO deberías ver:**
- `node_modules/`
- `dist/`
- `.env` o `.env.local`

✅ **SÍ deberías ver:**
- `.gitignore` (si es nuevo)
- `tsconfig.json`
- `vite.config.ts`
- `App.tsx`
- Y cualquier otro archivo modificado

### 7️⃣ **SUBIR A GITHUB**

```bash
# 1. Añadir archivos
git add .gitignore tsconfig.json vite.config.ts App.tsx

# 2. Hacer commit
git commit -m "fix: Configuración completa para deployment en Vercel - esbuild + logo local + gitignore"

# 3. Subir a GitHub
git push origin main
```

O si tu rama se llama `master`:

```bash
git push origin master
```

### 8️⃣ **VERIFICAR DEPLOYMENT EN VERCEL**

1. Ve a: https://vercel.com/dashboard
2. Busca tu proyecto: **"Tarifario Última Milla Onus 2026"**
3. Ve a la pestaña **"Deployments"**
4. Espera 2-3 minutos
5. Verás el nuevo deployment en progreso

✅ **Estado exitoso:** "Ready" con ✓ verde
❌ **Si falla:** Haz clic en el deployment fallido → "View Build Logs" → copia el error y dímelo

---

## 🆘 SI ALGO FALLA

### Error: `npm install` falla
```bash
# Borra node_modules y package-lock.json
rm -rf node_modules package-lock.json
# Reinstala
npm install
```

### Error: `npm run build` falla
- Copia el mensaje de error completo y dímelo

### Error: Git dice "no changes to commit"
- Es normal si ya subiste los cambios antes
- Verifica con `git status`

### Error: Vercel sigue fallando
- Ve a Vercel Dashboard → Tu Proyecto → Settings → General
- Verifica:
  - **Framework Preset:** Vite
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`
  - **Install Command:** `npm install`

---

## 📞 CONTACTO

Si encuentras algún problema en cualquiera de estos pasos, dime:
1. ¿En qué paso estás?
2. ¿Qué comando ejecutaste?
3. ¿Qué error apareció? (copia el mensaje completo)

¡Estoy aquí para ayudarte! 🚀

# ✅ CHECKLIST PRE-DEPLOY

## ANTES DE DEPLOYAR, VERIFICA:

### 📦 Archivos Esenciales
- [x] `/App.tsx` - Código optimizado con useMemo
- [x] `/index.html` - SEO y meta tags
- [x] `/package.json` - Dependencias correctas
- [x] `/vite.config.ts` - Build optimizado
- [x] `/vercel.json` - Configuración de Vercel
- [x] `/.vercelignore` - Exclusiones configuradas
- [x] `/styles/globals.css` - Estilos con REM y Raleway
- [x] `/public/logo-onus.png` - Logo corporativo

### 🔧 Configuración
- [x] Node.js >= 18.0.0 instalado
- [x] npm instalado y funcionando
- [x] Git instalado (si usas GitHub)

### 🧪 Test Local
```bash
# Probar que funciona localmente:
npm install
npm run dev
# Abre: http://localhost:5173

# Probar build:
npm run build
npm run preview
```

### ✅ Funcionalidad (en local)
- [ ] El tarifario carga sin errores
- [ ] Puedes hacer click en filas para seleccionar
- [ ] El simulador suma correctamente
- [ ] Puedes subir logo del cliente
- [ ] El botón "Descargar PDF" funciona
- [ ] El PDF se genera con el nombre correcto

---

## DURANTE EL DEPLOY

### Con Vercel CLI
```bash
vercel --prod
```
- [ ] Login exitoso
- [ ] Responder preguntas correctamente
- [ ] Build completo sin errores
- [ ] Recibir URL de producción

### Con GitHub + Vercel
```bash
git push origin main
```
- [ ] Push exitoso a GitHub
- [ ] Importar proyecto en Vercel
- [ ] Auto-deploy completo
- [ ] Recibir URL de producción

---

## DESPUÉS DEL DEPLOY

### ✅ Verificación Inmediata
- [ ] Abrir URL de producción
- [ ] El sitio carga (sin pantalla blanca)
- [ ] Ver logo de ONUS Express
- [ ] Ver las tablas de tarifas
- [ ] Click en filas funciona
- [ ] Simulador calcula total
- [ ] Subir logo cliente funciona
- [ ] Generar PDF funciona

### 📱 Test en Dispositivos
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### 🚀 Test de Rendimiento
1. Ve a: https://pagespeed.web.dev/
2. Pega tu URL de Vercel
3. Verifica scores:
   - [ ] Performance > 85
   - [ ] Accessibility > 90
   - [ ] Best Practices > 90
   - [ ] SEO > 90

### 🔗 Test de Compartir
- [ ] Compartir por WhatsApp (ver preview)
- [ ] Compartir por Email
- [ ] Link funciona en incógnito
- [ ] Link funciona sin estar logueado

---

## 🐛 SI ENCUENTRAS ERRORES

### Error: Pantalla en blanco
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Revisa los logs en Vercel Dashboard

### Error: PDF no se genera
1. Abre consola del navegador
2. Verifica que html2canvas y jsPDF se carguen
3. Prueba en incógnito (sin extensiones)

### Error: Fuentes no se ven
1. Verifica conexión a Google Fonts
2. Revisa que index.html tenga preconnect
3. Recarga con Ctrl+Shift+R

---

## 📊 MÉTRICAS ESPERADAS

| Métrica | Valor Objetivo |
|---------|----------------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.5s |
| Largest Contentful Paint | < 2.5s |
| Bundle Size (gzipped) | ~150-180KB |
| Lighthouse Performance | > 85 |

---

## 🎉 TODO LISTO

Si todos los checks están ✅:
- **Comparte la URL** con tu equipo
- **Añade dominio personalizado** (opcional)
- **Configura Vercel Analytics** (gratis)
- **Monitorea los primeros días**

---

## 📞 RECURSOS

- **Guía Completa**: `/GUIA_VERCEL.md`
- **Deploy Rápido**: `/DEPLOY_RAPIDO.md`
- **Estructura**: `/PROJECT_STRUCTURE.md`
- **Vercel Docs**: https://vercel.com/docs
- **Vercel Status**: https://www.vercel-status.com/

---

**¡ÉXITO CON TU DEPLOY! 🚀**

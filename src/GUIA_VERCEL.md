# 🚀 GUÍA PASO A PASO - DEPLOY A VERCEL

## OPCIÓN 1: VERCEL CLI (Más Rápido - Recomendado)

### Paso 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Paso 2: Verificar instalación
```bash
vercel --version
```
Deberías ver algo como: `Vercel CLI 33.0.0`

### Paso 3: Login en Vercel
```bash
vercel login
```
Se abrirá tu navegador para que confirmes el login.

### Paso 4: Deploy a Producción
```bash
vercel --prod
```

**¿Qué preguntas te hará Vercel?**

1. **"Set up and deploy?"** → Presiona `Y` (Yes)
2. **"Which scope?"** → Selecciona tu cuenta/organización
3. **"Link to existing project?"** → Presiona `N` (No, es nuevo)
4. **"What's your project's name?"** → `onus-express-tarifarios` (o el nombre que prefieras)
5. **"In which directory is your code located?"** → Presiona Enter (usa `.`)
6. **"Want to modify the settings?"** → Presiona `N` (No, Vercel detecta automáticamente Vite)

### Paso 5: ¡Listo! 🎉
Vercel te dará 2 URLs:
- **Preview**: https://onus-express-tarifarios-xxx.vercel.app
- **Production**: https://onus-express-tarifarios.vercel.app

---

## OPCIÓN 2: GITHUB + VERCEL (Recomendado para Producción)

### Paso 1: Preparar Git (si no lo has hecho)
```bash
# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "feat: Tarifario ONUS Express 2026 optimizado para Vercel"

# Crear rama main
git branch -M main
```

### Paso 2: Crear Repositorio en GitHub

1. **Ve a:** https://github.com/new
2. **Nombre del repositorio:** `onus-express-tarifarios`
3. **Descripción:** `Tarifario profesional Última Milla 2026 - ONUS Express`
4. **Visibilidad:** Private o Public (tú decides)
5. **NO marques:** "Initialize with README" (ya tienes uno)
6. **Click:** "Create repository"

### Paso 3: Conectar y Subir a GitHub
```bash
# Copiar y pegar los comandos que GitHub te muestra:
git remote add origin https://github.com/TU_USUARIO/onus-express-tarifarios.git

# Subir el código
git push -u origin main
```

### Paso 4: Deploy en Vercel

1. **Ve a:** https://vercel.com/dashboard
2. **Click en:** "Add New..." → "Project"
3. **Busca tu repositorio:** `onus-express-tarifarios`
4. **Click:** "Import"

**Vercel detectará automáticamente:**
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`

5. **Click:** "Deploy"

### Paso 5: Esperar el Deploy
Vercel mostrará el progreso en tiempo real:
```
⏳ Building...
✓ Build Completed
⏳ Deploying...
✓ Deployment Ready
```

### Paso 6: ¡Listo! 🎉
Tu proyecto estará en:
- **Production**: https://onus-express-tarifarios.vercel.app

---

## 🔧 CONFIGURACIÓN OPCIONAL

### Añadir Dominio Personalizado

1. En Vercel Dashboard → Tu proyecto
2. **Settings** → **Domains**
3. **Add Domain:** `tarifarios.onusexpress.com`
4. Vercel te dará instrucciones para configurar DNS

**Registros DNS necesarios:**
```
Tipo: CNAME
Nombre: tarifarios
Valor: cname.vercel-dns.com
```

### Variables de Entorno (si las necesitas en el futuro)

1. En Vercel Dashboard → Tu proyecto
2. **Settings** → **Environment Variables**
3. Añade las variables necesarias

---

## ✅ VERIFICACIÓN POST-DEPLOY

### Checklist Básico
- [ ] El sitio carga correctamente
- [ ] El logo de ONUS Express se ve
- [ ] Las tablas de tarifas se muestran
- [ ] Puedes seleccionar vehículos (haciendo click en filas)
- [ ] El simulador calcula el total correctamente
- [ ] Puedes subir logo del cliente
- [ ] El botón "Descargar PDF" funciona
- [ ] El PDF se genera correctamente con el nombre del cliente

### Test de Rendimiento
1. **Ve a:** https://pagespeed.web.dev/
2. **Pega tu URL de Vercel**
3. **Verifica que obtienes:**
   - ✅ Performance > 90
   - ✅ Accessibility > 90
   - ✅ Best Practices > 90
   - ✅ SEO > 90

### Test de Compatibilidad
- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

### Test de Compartir
- [ ] Compartir link por WhatsApp (debe verse preview)
- [ ] Compartir link por Email
- [ ] Compartir en redes sociales (debe mostrar Open Graph)

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema: "Command failed: npm run build"
**Causa:** Error en el build
**Solución:**
```bash
# Probar build localmente primero
npm install
npm run build

# Si funciona localmente, limpiar cache de Vercel:
vercel --prod --force
```

### Problema: "404 - Page Not Found" al recargar
**Causa:** Falta configuración de rewrites
**Solución:** Ya está configurado en `vercel.json`, pero si persiste:
1. Vercel Dashboard → Settings → General
2. Verifica que "Output Directory" sea `dist`

### Problema: Las fuentes no se ven bien
**Causa:** Google Fonts bloqueadas o no cargan
**Solución:** Ya tienes `preconnect` configurado en `index.html`

### Problema: El PDF no se genera
**Causa:** html2canvas o jsPDF no se cargan
**Solución:** Verifica en la consola del navegador. Las librerías se cargan dinámicamente.

### Problema: El bundle es muy grande
**Causa:** Archivos no excluidos
**Solución:** Ya tienes `.vercelignore` configurado. Verifica con:
```bash
npm run build
# Revisa el tamaño en la carpeta dist/
```

---

## 🔄 ACTUALIZACIONES FUTURAS

### Con Vercel CLI:
```bash
# Hacer cambios en el código
# Luego:
vercel --prod
```

### Con GitHub + Vercel:
```bash
# Hacer cambios en el código
git add .
git commit -m "feat: Actualización de tarifas 2026"
git push

# Vercel detectará el push y hará auto-deploy
```

---

## 📊 MONITOREO

### Analytics de Vercel
1. Vercel Dashboard → Tu proyecto → **Analytics**
2. Verás métricas en tiempo real:
   - Visitas
   - Core Web Vitals
   - Países
   - Dispositivos

### Logs de Errores
1. Vercel Dashboard → Tu proyecto → **Logs**
2. Verás todos los errores en tiempo real

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DEL DEPLOY

1. **Compartir URL** con el equipo de ONUS Express
2. **Añadir dominio personalizado** (opcional)
3. **Configurar Analytics** (Vercel Analytics es gratis)
4. **Monitorear rendimiento** la primera semana
5. **Recoger feedback** de usuarios

---

## 📞 SOPORTE

- **Documentación Vercel:** https://vercel.com/docs
- **Comunidad Vercel:** https://github.com/vercel/vercel/discussions
- **Status Vercel:** https://www.vercel-status.com/

---

## ✨ ¡ESTÁS LISTO PARA DEPLOYAR!

Elige **OPCIÓN 1** si quieres velocidad (5 minutos).
Elige **OPCIÓN 2** si quieres control total y auto-deploy en cada push.

**Comando más rápido:**
```bash
npm install -g vercel && vercel --prod
```

¡Éxito con tu deployment! 🚀

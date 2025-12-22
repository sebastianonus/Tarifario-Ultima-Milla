# 📋 COMANDOS LISTOS PARA COPIAR Y PEGAR

## 🚀 DEPLOY CON VERCEL CLI (RECOMENDADO)

### 1️⃣ Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2️⃣ Login en Vercel
```bash
vercel login
```
*(Se abrirá tu navegador para confirmar)*

### 3️⃣ Deploy a Producción
```bash
vercel --prod
```

**Responde las preguntas así:**
- Set up and deploy? → `Y` *(Enter)*
- Which scope? → *(Selecciona tu cuenta)*
- Link to existing project? → `N` *(Enter)*
- What's your project's name? → `onus-express-tarifarios` *(Enter)*
- In which directory? → *(Enter - deja el punto)*
- Want to modify settings? → `N` *(Enter)*

**✅ Recibirás tu URL:**
```
✓ Production: https://onus-express-tarifarios.vercel.app
```

---

## 🐙 DEPLOY CON GITHUB + VERCEL

### 1️⃣ Inicializar Git
```bash
git init
```

### 2️⃣ Agregar todos los archivos
```bash
git add .
```

### 3️⃣ Hacer primer commit
```bash
git commit -m "feat: Tarifario ONUS Express 2026 - Deploy inicial"
```

### 4️⃣ Crear rama main
```bash
git branch -M main
```

### 5️⃣ Crear repositorio en GitHub
**Ve a:** https://github.com/new

**Configuración:**
- Repository name: `onus-express-tarifarios`
- Description: `Tarifario profesional Última Milla 2026 - ONUS Express`
- Visibility: Private o Public
- **NO marques:** "Initialize this repository with a README"
- Click: **"Create repository"**

### 6️⃣ Conectar con GitHub
**⚠️ REEMPLAZA `TU_USUARIO` con tu usuario de GitHub:**
```bash
git remote add origin https://github.com/TU_USUARIO/onus-express-tarifarios.git
```

### 7️⃣ Subir código
```bash
git push -u origin main
```

### 8️⃣ Deploy en Vercel
**Ve a:** https://vercel.com/dashboard

**Pasos:**
1. Click: **"Add New..."** → **"Project"**
2. Busca: `onus-express-tarifarios`
3. Click: **"Import"**
4. Click: **"Deploy"**

**✅ Espera 2-3 minutos y recibirás tu URL**

---

## 🔄 ACTUALIZACIONES FUTURAS

### Con Vercel CLI:
```bash
# Después de hacer cambios:
vercel --prod
```

### Con GitHub:
```bash
# Después de hacer cambios:
git add .
git commit -m "feat: Actualización de precios"
git push
# Vercel detecta y hace auto-deploy
```

---

## ✅ VERIFICAR QUE FUNCIONA

### Abre tu URL y prueba:
```bash
# Tu URL será algo como:
https://onus-express-tarifarios.vercel.app
```

**Checklist:**
- [ ] Página carga correctamente
- [ ] Logo ONUS Express visible
- [ ] Tablas de tarifas visibles
- [ ] Click en filas selecciona servicios
- [ ] Simulador calcula total
- [ ] Botón "Descargar PDF" visible
- [ ] Subir logo cliente funciona
- [ ] PDF se genera correctamente

---

## 🧪 TEST DE RENDIMIENTO

```bash
# Copia tu URL y pégala aquí:
https://pagespeed.web.dev/
```

**Verifica:**
- Performance > 85
- Accessibility > 90
- Best Practices > 90
- SEO > 90

---

## 🆘 COMANDOS DE AYUDA

### Ver versión de Vercel CLI
```bash
vercel --version
```

### Ver proyectos en Vercel
```bash
vercel list
```

### Forzar nuevo deploy
```bash
vercel --prod --force
```

### Ver logs de Vercel
```bash
vercel logs
```

### Eliminar proyecto (cuidado)
```bash
vercel remove onus-express-tarifarios
```

---

## 🐛 SOLUCIÓN RÁPIDA DE PROBLEMAS

### Error: "command not found: vercel"
```bash
npm install -g vercel
# Si sigue sin funcionar:
sudo npm install -g vercel
```

### Error: "Build failed"
```bash
# Probar build localmente:
npm install
npm run build
npm run preview
# Si funciona local, hacer:
vercel --prod --force
```

### Error: Git no reconoce origin
```bash
# Ver remotes actuales:
git remote -v
# Eliminar origin si existe:
git remote remove origin
# Agregar de nuevo:
git remote add origin https://github.com/TU_USUARIO/onus-express-tarifarios.git
```

### Error: Push rechazado por GitHub
```bash
# Verificar que estás logueado:
git config --global user.email "tu@email.com"
git config --global user.name "Tu Nombre"
# Intentar de nuevo:
git push -u origin main
```

---

## 📱 COMPARTIR LA URL

Una vez deployado, comparte la URL:

**WhatsApp:**
```
¡Nuevo Tarifario ONUS Express 2026! 🚀
Consulta precios y genera presupuestos:
https://onus-express-tarifarios.vercel.app
```

**Email:**
```
Asunto: Tarifario Última Milla 2026 - ONUS Express

Accede al nuevo tarifario interactivo:
https://onus-express-tarifarios.vercel.app

Características:
✓ Simulador de presupuestos
✓ Generación de PDF
✓ Compatible con móvil
```

---

## 🎯 PRÓXIMOS PASOS

1. **Deploy exitoso** ✅
2. **Verificar funcionalidad** ✅
3. **Test de rendimiento** ✅
4. **Compartir con equipo** ⏳
5. **Configurar dominio personalizado** (opcional)
6. **Monitorear analytics** (Vercel Dashboard)

---

**¡LISTO PARA DEPLOYAR! 🚀**

**Comando más rápido:**
```bash
npm install -g vercel && vercel login && vercel --prod
```

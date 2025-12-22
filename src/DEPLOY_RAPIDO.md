# ⚡ DEPLOY RÁPIDO - 3 COMANDOS

## 🚀 LA FORMA MÁS RÁPIDA (5 minutos)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login (se abre navegador)
vercel login

# 3. Deploy (responde las preguntas)
vercel --prod
```

### Preguntas que te hará Vercel:

| Pregunta | Tu Respuesta |
|----------|--------------|
| Set up and deploy? | `Y` (Enter) |
| Which scope? | Selecciona tu cuenta |
| Link to existing project? | `N` (Enter) |
| What's your project's name? | `onus-express-tarifarios` |
| In which directory? | `.` (Enter) |
| Want to modify settings? | `N` (Enter) |

### ✅ Resultado:
```
✓ Production: https://onus-express-tarifarios.vercel.app
```

---

## 🔄 ALTERNATIVA: GitHub + Vercel

```bash
# 1. Preparar Git
git init
git add .
git commit -m "Deploy inicial"
git branch -M main

# 2. Subir a GitHub (crea el repo primero en github.com/new)
git remote add origin https://github.com/TU_USUARIO/onus-express-tarifarios.git
git push -u origin main

# 3. Vercel Dashboard
# Ve a: https://vercel.com/dashboard
# Click: "Add New" → "Project"
# Importa tu repo → "Deploy"
```

---

## ✅ VERIFICAR QUE FUNCIONA

Abre tu URL de Vercel y prueba:
- ☐ Hacer click en las filas de las tablas (seleccionar servicios)
- ☐ Ver que el total se calcula
- ☐ Subir logo de cliente
- ☐ Descargar PDF con "Descargar PDF"

---

## 🆘 SI ALGO FALLA

### Error: "Command not found: vercel"
```bash
# Reinstalar:
npm install -g vercel
```

### Error: "Build failed"
```bash
# Probar build local:
npm install
npm run build
npm run preview
```

### Error: "404 al recargar página"
Ya está solucionado en `vercel.json`

---

## 📱 CONTACTO

¿Problemas? Revisa `/GUIA_VERCEL.md` (guía completa)

---

**¡ÉXITO! 🎉**

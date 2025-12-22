# 🚀 ONUS Express - Tarifario Última Milla 2026

Aplicación web profesional de tarifario con simulador de presupuestos interactivo.

## ⚡ DEPLOY RÁPIDO A VERCEL

### Opción 1: Vercel CLI (5 minutos)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Opción 2: GitHub + Vercel
```bash
git init && git add . && git commit -m "Deploy inicial"
git remote add origin https://github.com/TU_USUARIO/onus-express-tarifarios.git
git push -u origin main
```
Luego importa en [vercel.com/dashboard](https://vercel.com/dashboard)

---

## 📚 GUÍAS DISPONIBLES

| Archivo | Descripción |
|---------|-------------|
| **[DEPLOY_RAPIDO.md](./DEPLOY_RAPIDO.md)** | ⚡ Deploy en 3 comandos (5 min) |
| **[GUIA_VERCEL.md](./GUIA_VERCEL.md)** | 📖 Guía completa paso a paso |
| **[CHECKLIST_DEPLOY.md](./CHECKLIST_DEPLOY.md)** | ✅ Verificación pre/post deploy |
| **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** | 📁 Estructura del proyecto |
| **[CHECKLIST.md](./CHECKLIST.md)** | 🎯 Optimizaciones implementadas |

---

## ✨ CARACTERÍSTICAS

- ✅ Diseño responsive (móvil y desktop)
- ✅ Simulador interactivo de presupuestos
- ✅ Selección múltiple acumulativa
- ✅ Campos editables (cantidad, precio, concepto)
- ✅ Generación de PDF optimizada (lazy loading)
- ✅ Carga de logo del cliente (PNG)
- ✅ Colores corporativos: #000935 y #00C9CE
- ✅ Tipografía: REM (cuerpo) y Raleway (títulos)
- ✅ Compatible con WhatsApp, email y hosting web
- ✅ SEO completo y Open Graph

---

## 🎯 OPTIMIZACIONES

- ⚡ Bundle inicial: ~150-180KB (gzipped)
- ⚡ Lazy loading de librerías PDF
- ⚡ Code splitting por vendors
- ⚡ Tree-shaking agresivo
- ⚡ 43 componentes UI excluidos del build (89% reducción)
- ⚡ Cache optimization (1 año para assets)
- ⚡ Lighthouse Score esperado: > 90

---

## 💻 DESARROLLO LOCAL

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## 📊 ESTRUCTURA

```
/
├── App.tsx                    # Aplicación principal (optimizada)
├── index.html                 # HTML con SEO completo
├── package.json               # 8 dependencias esenciales
├── vite.config.ts             # Build ultra-optimizado
├── vercel.json                # Config + seguridad + cache
├── /styles/globals.css        # REM + Raleway
├── /public/logo-onus.png      # Logo corporativo
└── /components/ui/            # Solo 5 componentes usados
    ├── card.tsx
    ├── input.tsx
    ├── label.tsx
    ├── table.tsx
    └── utils.ts
```

---

## 🔧 TECNOLOGÍAS

- **Framework**: React 18 + TypeScript
- **Build**: Vite 5 (optimizado)
- **Styling**: Tailwind CSS 4
- **PDF**: html2canvas + jsPDF (lazy loaded)
- **Icons**: Lucide React (4 iconos)
- **Deploy**: Vercel

---

## 📝 TARIFAS 2026

### Vehículos
- **Tipo A** (3m³): 90€ media jornada, 160€ jornada completa
- **Tipo B** (6m³): 95€ media jornada, 170€ jornada completa
- **Tipo C** (12m³): 100€ media jornada, 180€ jornada completa
- **Tipo D** (Carrozado): 120€ media jornada, 220€ jornada completa
- **Tipo E** (Moto): 65€ media jornada, 110€ jornada completa
- **Tipo F** (Bici): 55€ media jornada, 90€ jornada completa

### Extras Operativos
- Hora extra: 20€/h
- Hora nocturna: 5€/h
- Mozo de almacén: 140€
- Jefe de tráfico: 165€

### Tramos de Kilometraje
- 0-100 km: Sin suplemento
- 100-200 km: +10€
- +200 km: +15€
- +300 km: +20€

---

## 📞 CONTACTO

**ONUS Express SL**  
NIF: B72735277  
Web: www.onusexpress.com  
Dirección: Carrer d'Anselm Clavé, s/n, Nave 24 – PI Matacás  
08980 Sant Feliu de Llobregat, Barcelona

---

## 📄 LICENCIA

© 2026 ONUS Express SL. Todos los derechos reservados.

---

**🎉 Proyecto optimizado y listo para producción en Vercel**

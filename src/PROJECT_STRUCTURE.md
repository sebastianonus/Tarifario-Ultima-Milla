# 📁 Estructura del Proyecto - ONUS Express Tarifarios

## ✅ ARCHIVOS ESENCIALES (se incluyen en el build)

```
/
├── App.tsx                          ← Componente principal del tarifario
├── index.html                       ← HTML principal con SEO
├── package.json                     ← Dependencias mínimas
├── vite.config.ts                   ← Build optimizado
├── vercel.json                      ← Config de deployment
├── tsconfig.json                    ← TypeScript config
├── tsconfig.node.json               ← TypeScript config (node)
│
├── /src/
│   └── main.tsx                     ← Entry point de React
│
├── /styles/
│   └── globals.css                  ← Estilos con fuentes REM y Raleway
│
├── /public/
│   └── logo-onus.png                ← Logo corporativo
│
└── /components/
    ├── /figma/
    │   └── ImageWithFallback.tsx    ← Helper de imágenes
    │
    └── /ui/                         ← Solo se usan 4 componentes:
        ├── card.tsx                 ✓ USADO
        ├── input.tsx                ✓ USADO
        ├── label.tsx                ✓ USADO
        ├── table.tsx                ✓ USADO
        └── utils.ts                 ✓ USADO
```

## ⛔ ARCHIVOS EXCLUIDOS DEL BUILD (via .vercelignore)

```
/components/ui/
├── accordion.tsx          ← No usado
├── alert-dialog.tsx       ← No usado
├── alert.tsx              ← No usado
├── aspect-ratio.tsx       ← No usado
├── avatar.tsx             ← No usado
├── badge.tsx              ← No usado
├── breadcrumb.tsx         ← No usado
├── button.tsx             ← No usado
├── calendar.tsx           ← No usado
├── carousel.tsx           ← No usado
├── chart.tsx              ← No usado
├── checkbox.tsx           ← No usado
├── collapsible.tsx        ← No usado
├── command.tsx            ← No usado
├── context-menu.tsx       ← No usado
├── dialog.tsx             ← No usado
├── drawer.tsx             ← No usado
├── dropdown-menu.tsx      ← No usado
├── form.tsx               ← No usado
├── hover-card.tsx         ← No usado
├── input-otp.tsx          ← No usado
├── menubar.tsx            ← No usado
├── navigation-menu.tsx    ← No usado
├── pagination.tsx         ← No usado
├── popover.tsx            ← No usado
├── progress.tsx           ← No usado
├── radio-group.tsx        ← No usado
├── resizable.tsx          ← No usado
├── scroll-area.tsx        ← No usado
├── select.tsx             ← No usado
├── separator.tsx          ← No usado
├── sheet.tsx              ← No usado
├── sidebar.tsx            ← No usado
├── skeleton.tsx           ← No usado
├── slider.tsx             ← No usado
├── sonner.tsx             ← No usado
├── switch.tsx             ← No usado
├── tabs.tsx               ← No usado
├── textarea.tsx           ← No usado
├── toggle-group.tsx       ← No usado
├── toggle.tsx             ← No usado
├── tooltip.tsx            ← No usado
└── use-mobile.ts          ← No usado

/guidelines/               ← Documentación interna
└── Guidelines.md

README.md                  ← Documentación (pero se incluye para GitHub)
Attributions.md            ← Atribuciones del sistema
```

## 📊 RESULTADO

- **Componentes UI totales**: 48
- **Componentes UI usados**: 5 (card, input, label, table, utils)
- **Componentes UI excluidos**: 43 (89% de reducción)
- **Tamaño estimado del bundle**: ~150-180KB (gzipped)
- **Build time**: Reducido significativamente

## 🚀 DEPENDENCIAS DE PRODUCCIÓN

```json
{
  "react": "^18.3.1",              // Core
  "react-dom": "^18.3.1",          // Core
  "lucide-react": "^0.263.1",      // Iconos (solo 4 usados: Truck, Clock, Download, X)
  "html2canvas": "^1.4.1",         // PDF generation (lazy loaded)
  "jspdf": "^2.5.1",               // PDF generation (lazy loaded)
  "class-variance-authority": "^0.7.0",  // Utility
  "clsx": "^2.1.0",                // Utility
  "tailwind-merge": "^2.2.0"       // Utility
}
```

## ✨ OPTIMIZACIONES IMPLEMENTADAS

1. **Tree-shaking agresivo** en vite.config.ts
2. **Lazy loading** de html2canvas y jsPDF
3. **Code splitting** por vendors (react, pdf, ui)
4. **Minificación Terser** con eliminación de console.log
5. **Assets inline** < 4KB
6. **Cache busting** con hashes en filenames
7. **Exclusión explícita** de componentes no usados

---

**Nota**: Los archivos en `/components/ui/` están protegidos por el sistema pero el `.vercelignore` asegura que no se incluyan en el deployment.

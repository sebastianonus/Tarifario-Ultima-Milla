#!/bin/bash

# 🔍 Script de verificación pre-deployment
# Este script verifica que todo esté correcto antes de subir a Git

echo ""
echo "🔍 =============================================="
echo "   VERIFICACIÓN PRE-DEPLOYMENT"
echo "=============================================="
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0

# 1. Verificar que existe .gitignore
echo "1️⃣  Verificando .gitignore..."
if [ -f ".gitignore" ]; then
    if grep -q "node_modules" .gitignore; then
        echo -e "   ${GREEN}✓${NC} .gitignore existe y contiene 'node_modules'"
    else
        echo -e "   ${RED}✗${NC} .gitignore existe pero no contiene 'node_modules'"
        errors=$((errors + 1))
    fi
else
    echo -e "   ${RED}✗${NC} .gitignore NO existe"
    errors=$((errors + 1))
fi

# 2. Verificar que node_modules existe
echo "2️⃣  Verificando node_modules..."
if [ -d "node_modules" ]; then
    echo -e "   ${GREEN}✓${NC} node_modules existe (dependencias instaladas)"
else
    echo -e "   ${YELLOW}⚠${NC}  node_modules NO existe. Ejecuta: npm install"
    errors=$((errors + 1))
fi

# 3. Verificar que el logo existe
echo "3️⃣  Verificando logo..."
if [ -f "public/logo-onus.png" ]; then
    echo -e "   ${GREEN}✓${NC} public/logo-onus.png existe"
else
    echo -e "   ${RED}✗${NC} public/logo-onus.png NO existe"
    errors=$((errors + 1))
fi

# 4. Verificar tsconfig.json
echo "4️⃣  Verificando tsconfig.json..."
if grep -q '"figma:asset' tsconfig.json; then
    echo -e "   ${RED}✗${NC} tsconfig.json contiene alias 'figma:asset' (debe eliminarse)"
    errors=$((errors + 1))
else
    echo -e "   ${GREEN}✓${NC} tsconfig.json NO contiene alias problemáticos"
fi

# 5. Verificar vite.config.ts
echo "5️⃣  Verificando vite.config.ts..."
if grep -q "minify: 'esbuild'" vite.config.ts; then
    echo -e "   ${GREEN}✓${NC} vite.config.ts usa 'esbuild'"
elif grep -q "minify: 'terser'" vite.config.ts; then
    echo -e "   ${RED}✗${NC} vite.config.ts usa 'terser' (debe ser 'esbuild')"
    errors=$((errors + 1))
else
    echo -e "   ${YELLOW}⚠${NC}  No se pudo verificar el minificador"
fi

# 6. Verificar App.tsx
echo "6️⃣  Verificando App.tsx..."
if grep -q "figma:asset" App.tsx; then
    echo -e "   ${RED}✗${NC} App.tsx contiene 'figma:asset' (debe eliminarse)"
    errors=$((errors + 1))
else
    echo -e "   ${GREEN}✓${NC} App.tsx NO contiene 'figma:asset'"
fi

if grep -q 'src="/logo-onus.png"' App.tsx; then
    echo -e "   ${GREEN}✓${NC} App.tsx usa el logo correctamente"
else
    echo -e "   ${YELLOW}⚠${NC}  No se encontró referencia al logo en App.tsx"
fi

# 7. Verificar package.json
echo "7️⃣  Verificando package.json..."
if [ -f "package.json" ]; then
    if grep -q '"build": "vite build"' package.json; then
        echo -e "   ${GREEN}✓${NC} package.json tiene script de build correcto"
    else
        echo -e "   ${RED}✗${NC} package.json no tiene script de build correcto"
        errors=$((errors + 1))
    fi
else
    echo -e "   ${RED}✗${NC} package.json NO existe"
    errors=$((errors + 1))
fi

echo ""
echo "=============================================="

if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✓ TODAS LAS VERIFICACIONES PASARON${NC}"
    echo ""
    echo "🎉 ¡Puedes proceder con el deployment!"
    echo ""
    echo "Siguiente paso:"
    echo "  npm run build"
    echo ""
else
    echo -e "${RED}✗ SE ENCONTRARON $errors ERROR(ES)${NC}"
    echo ""
    echo "⚠️  Corrige los errores antes de continuar"
    echo ""
fi

echo "=============================================="
echo ""

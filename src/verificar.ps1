# 🔍 Script de verificación pre-deployment para Windows
# Ejecuta este script en PowerShell: .\verificar.ps1

Write-Host ""
Write-Host "=============================================="
Write-Host "   VERIFICACIÓN PRE-DEPLOYMENT"
Write-Host "=============================================="
Write-Host ""

$errors = 0

# 1. Verificar que existe .gitignore
Write-Host "1️⃣  Verificando .gitignore..."
if (Test-Path ".gitignore") {
    $content = Get-Content ".gitignore" -Raw
    if ($content -match "node_modules") {
        Write-Host "   ✓ .gitignore existe y contiene 'node_modules'" -ForegroundColor Green
    } else {
        Write-Host "   ✗ .gitignore existe pero no contiene 'node_modules'" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "   ✗ .gitignore NO existe" -ForegroundColor Red
    $errors++
}

# 2. Verificar que node_modules existe
Write-Host "2️⃣  Verificando node_modules..."
if (Test-Path "node_modules") {
    Write-Host "   ✓ node_modules existe (dependencias instaladas)" -ForegroundColor Green
} else {
    Write-Host "   ⚠  node_modules NO existe. Ejecuta: npm install" -ForegroundColor Yellow
    $errors++
}

# 3. Verificar que el logo existe
Write-Host "3️⃣  Verificando logo..."
if (Test-Path "public/logo-onus.png") {
    Write-Host "   ✓ public/logo-onus.png existe" -ForegroundColor Green
} else {
    Write-Host "   ✗ public/logo-onus.png NO existe" -ForegroundColor Red
    $errors++
}

# 4. Verificar tsconfig.json
Write-Host "4️⃣  Verificando tsconfig.json..."
if (Test-Path "tsconfig.json") {
    $content = Get-Content "tsconfig.json" -Raw
    if ($content -match '"figma:asset') {
        Write-Host "   ✗ tsconfig.json contiene alias 'figma:asset' (debe eliminarse)" -ForegroundColor Red
        $errors++
    } else {
        Write-Host "   ✓ tsconfig.json NO contiene alias problemáticos" -ForegroundColor Green
    }
} else {
    Write-Host "   ✗ tsconfig.json NO existe" -ForegroundColor Red
    $errors++
}

# 5. Verificar vite.config.ts
Write-Host "5️⃣  Verificando vite.config.ts..."
if (Test-Path "vite.config.ts") {
    $content = Get-Content "vite.config.ts" -Raw
    if ($content -match "minify: 'esbuild'") {
        Write-Host "   ✓ vite.config.ts usa 'esbuild'" -ForegroundColor Green
    } elseif ($content -match "minify: 'terser'") {
        Write-Host "   ✗ vite.config.ts usa 'terser' (debe ser 'esbuild')" -ForegroundColor Red
        $errors++
    } else {
        Write-Host "   ⚠  No se pudo verificar el minificador" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✗ vite.config.ts NO existe" -ForegroundColor Red
    $errors++
}

# 6. Verificar App.tsx
Write-Host "6️⃣  Verificando App.tsx..."
if (Test-Path "App.tsx") {
    $content = Get-Content "App.tsx" -Raw
    if ($content -match "figma:asset") {
        Write-Host "   ✗ App.tsx contiene 'figma:asset' (debe eliminarse)" -ForegroundColor Red
        $errors++
    } else {
        Write-Host "   ✓ App.tsx NO contiene 'figma:asset'" -ForegroundColor Green
    }
    
    if ($content -match 'src="/logo-onus.png"') {
        Write-Host "   ✓ App.tsx usa el logo correctamente" -ForegroundColor Green
    } else {
        Write-Host "   ⚠  No se encontró referencia al logo en App.tsx" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✗ App.tsx NO existe" -ForegroundColor Red
    $errors++
}

# 7. Verificar package.json
Write-Host "7️⃣  Verificando package.json..."
if (Test-Path "package.json") {
    $content = Get-Content "package.json" -Raw
    if ($content -match '"build": "vite build"') {
        Write-Host "   ✓ package.json tiene script de build correcto" -ForegroundColor Green
    } else {
        Write-Host "   ✗ package.json no tiene script de build correcto" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "   ✗ package.json NO existe" -ForegroundColor Red
    $errors++
}

Write-Host ""
Write-Host "=============================================="

if ($errors -eq 0) {
    Write-Host "✓ TODAS LAS VERIFICACIONES PASARON" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 ¡Puedes proceder con el deployment!"
    Write-Host ""
    Write-Host "Siguiente paso:"
    Write-Host "  npm run build"
    Write-Host ""
} else {
    Write-Host "✗ SE ENCONTRARON $errors ERROR(ES)" -ForegroundColor Red
    Write-Host ""
    Write-Host "⚠️  Corrige los errores antes de continuar"
    Write-Host ""
}

Write-Host "=============================================="
Write-Host ""

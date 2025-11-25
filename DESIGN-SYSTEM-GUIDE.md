# 🎨 SISTEMA DE DISEÑO VISUAL - SIMORAHealth
## Guía Completa de Implementación para Desarrolladores

> **Objetivo**: Replicar el estilo visual completo de SIMORAHealth en cualquier aplicación React + Tailwind CSS

---

## 📋 TABLA DE CONTENIDOS

1. [Sistema de Contenedores y Bordes](#1-sistema-de-contenedores-y-bordes)
2. [Sistema Completo de Botones](#2-sistema-de-botones)
3. [Animaciones y Transiciones](#3-animaciones-y-transiciones)
4. [Colores y Temas](#4-colores-y-temas)
5. [Tipografía](#5-tipografía)
6. [Espaciado](#6-espaciado)
7. [Componentes UI Especiales](#7-componentes-ui-especiales)
8. [Efectos Visuales](#8-efectos-visuales)
9. [Layouts y Estructura](#9-layouts-y-estructura)
10. [Microinteracciones](#10-microinteracciones)
11. [Patrones Especiales](#11-patrones-especiales)
12. [Utilidades y Helpers](#12-utilidades-y-helpers)
13. [Convenciones de Nombres](#13-convenciones-de-nombres)
14. [Conclusiones y Buenas Prácticas](#14-conclusiones-y-buenas-prácticas)

---

## 1. SISTEMA DE CONTENEDORES Y BORDES

### 1.1 Contenedor Principal de Aplicación

**REGLA CRÍTICA**: Este contenedor es UNIFORME en todas las vistas. NUNCA modificar sus dimensiones.

```tsx
<div
  className="bg-white rounded-xl shadow-lg border-2 border-orange-200 w-full max-w-7xl mb-0 flex flex-col overflow-hidden"
  style={{
    animation: 'fadeInDiffuse 0.4s ease-out',
    marginTop: '5px',
    height: '700px'
  }}
>
  <div className="pt-10 px-8 pb-8 flex flex-col h-full overflow-hidden">
    {/* Contenido de vistas aquí */}
  </div>
</div>
```

**Características clave**:
- `rounded-xl` - Bordes redondeados consistentes
- `shadow-lg` - Sombra pronunciada para profundidad
- `border-2 border-orange-200` - Borde naranja distintivo (2px)
- `height: 700px` - Altura fija INVIOLABLE
- `max-w-7xl` - Ancho máximo contenido
- `overflow-hidden` - Evita scroll en el contenedor principal

### 1.2 Patrones de Cards

#### Card Base
```tsx
// Card principal
className="rounded-xl border-2 border-orange-200 bg-white shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden hover:border-orange-300"

// CardHeader
className="flex flex-col space-y-2 px-6 py-5 border-b-2 border-orange-200"

// CardTitle
className="text-base font-semibold text-orange-900"

// CardContent
className="px-6 py-5"
```

#### Variaciones de Cards

**Card con gradiente en header**:
```tsx
// Orange variant
className="bg-gradient-to-r from-orange-50 to-orange-100"

// Blue variant
className="bg-gradient-to-r from-blue-50 to-blue-100"

// Green variant
className="bg-gradient-to-r from-green-50 to-green-100"
```

**Card compacto**:
```tsx
className="py-0.5 bg-zinc-50 rounded-lg border border-gray-200 space-y-0 text-xs w-[270px]"
```

### 1.3 Patrones de Bordes

#### Border Radius
```tsx
// Configuración Tailwind
borderRadius: {
  'lg': '0.75rem',  // 12px - usado en la mayoría de componentes
}

// Patrones comunes:
'rounded-lg'    // 0.75rem - botones, inputs pequeños
'rounded-xl'    // 0.75rem - cards, contenedores principales
'rounded-2xl'   // 1rem - pill selectors
'rounded-3xl'   // 1.5rem - modales glassmorphism
'rounded-full'  // Avatares, badges circulares, botones icon
```

#### Border Width & Colors
```tsx
// Widths
'border'        // 1px - elementos secundarios
'border-2'      // 2px - cards principales y navegación ⭐
'border-4'      // 4px - selección activa

// Colores principales
'border-orange-200'  // Cards y contenedores principales ⭐
'border-orange-300'  // Hover state en cards
'border-gray-200'    // Elementos secundarios
'border-slate-200'   // Fondos de secciones
'border-white/20'    // Glassmorphism
```

### 1.4 Shadows

```tsx
// Sistema de sombras
'shadow-sm'    // Elementos sutiles
'shadow-md'    // Avatares, botones destacados
'shadow-lg'    // Cards, navegación principal ⭐
'shadow-xl'    // Modales
'shadow-2xl'   // Modales glassmorphism

// Sombras con color (hover effects)
'hover:shadow-lg hover:shadow-orange-500/30'
```

---

## 2. SISTEMA DE BOTONES

### 2.1 Button Component Base

#### Base Classes (Todas las variantes)
```tsx
const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
```

#### Variantes Completas

**DEFAULT (Primary Orange)** ⭐
```tsx
variant="default"
className="bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 shadow-sm"
```

**DESTRUCTIVE (Red)**
```tsx
variant="destructive"
className="bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
```

**OUTLINE (Orange bordered)**
```tsx
variant="outline"
className="border-2 border-orange-600 bg-white hover:bg-orange-50 active:bg-orange-100 text-orange-700"
```

**SECONDARY (Amber)**
```tsx
variant="secondary"
className="bg-amber-100 text-amber-900 hover:bg-amber-200 active:bg-amber-300"
```

**GHOST (Transparent with hover)**
```tsx
variant="ghost"
className="hover:bg-orange-50 text-orange-700 active:bg-orange-100"
```

**LINK (Text only)**
```tsx
variant="link"
className="text-orange-700 underline-offset-4 hover:underline"
```

#### Tamaños

```tsx
// DEFAULT
size="default"
className="h-10 px-5 py-2"

// SMALL
size="sm"
className="h-8 rounded-lg px-3 text-xs"

// LARGE
size="lg"
className="h-12 rounded-lg px-6 text-base"

// ICON (Cuadrado)
size="icon"
className="h-10 w-10"
```

### 2.2 Botones Especializados

#### Gradient Button (Hero/Login)
```tsx
className="w-full bg-gradient-to-r from-[#c2703a] to-[#d97b3a] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
```

**Características**:
- Gradiente naranja corporativo (`#c2703a` → `#d97b3a`)
- Efecto "lift" en hover (`-translate-y-0.5`)
- Sombra de color en hover
- Estados disabled claros

#### Navigation Button
```tsx
className={`py-3 px-4 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-lg relative ${
  activeView === item.view
    ? 'bg-orange-100 text-orange-900'
    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-800'
}`}
```

#### Icon Buttons
```tsx
// Botón redondo con hover
className="p-2 rounded-full hover:bg-gray-100 transition-colors"

// Botón de acción pequeño
className="p-1 rounded-full hover:bg-orange-200 transition-colors"

// Botón inline con edición (aparece en hover)
className="opacity-0 group-hover:opacity-100 transition-all p-0.5 rounded hover:bg-zinc-200 text-gray-500 flex-shrink-0"
```

---

## 3. ANIMACIONES Y TRANSICIONES

### 3.1 Keyframes CSS (Agregar a index.css)

```css
/* Fade In con translateY - Animación signature de SIMORAHealth */
@keyframes fadeInDiffuse {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Aplicación */
.main-container {
  animation: fadeInDiffuse 0.4s ease-out;
}
```

### 3.2 Keyframes Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
}
```

### 3.3 Transiciones Comunes

#### Transition Duration Classes
```tsx
'transition-colors'         // Solo colores (más eficiente)
'transition-all'           // Todas las propiedades
'transition-opacity'       // Solo opacidad

// Con duración
'transition-all duration-200'    // Botones, hovers rápidos ⭐
'transition-all duration-300'    // Modales, componentes medianos
'transition-colors duration-150' // Cambios sutiles
```

#### Patrones de Hover
```tsx
// Cards
'hover:shadow-lg transition-all duration-200'
'hover:border-orange-300'

// Botones
'hover:bg-orange-700 transition-all duration-200'
'hover:-translate-y-0.5'  // Lift effect ⭐

// Backgrounds
'hover:bg-gray-50 transition-colors'
'hover:bg-orange-50'
```

### 3.4 Loading States

#### Spinner
```tsx
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
```

#### Skeleton Loader Pattern (Recomendado)
```tsx
className="animate-pulse bg-gray-200 rounded"
```

### 3.5 Animaciones de Entrada

```css
/* Agregar a index.css */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 4. COLORES Y TEMAS

### 4.1 Tailwind Config - Paleta Base

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Prioridad (Alertas)
        'priority-p1': '#dc2626',      // Rojo crítico
        'priority-p2': '#f59e0b',      // Ámbar prioritario
        'priority-p3': '#10b981',      // Verde electivo
        'priority-p3-obs': '#6b7280',  // Gris observado

        // SLA
        'sla-critical': '#dc2626',
        'sla-warning': '#f59e0b',
        'sla-ok': '#10b981',

        // Superficies
        'surface': {
          DEFAULT: '#ffffff',
          hover: '#f9fafb',
          active: '#f3f4f6',
        },
        'background': '#f8fafc',
      },
    },
  },
}
```

### 4.2 Sistema de Theming Dinámico

```typescript
// utils/themeUtils.ts
export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'teal';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export const THEME_PALETTES: Record<ThemeColor, ThemeColors> = {
  blue: {
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryDark: 'bg-blue-800',
    secondary: 'bg-blue-100',
    accent: 'text-blue-600',
    background: 'bg-blue-50',
    text: 'text-blue-900'
  },
  purple: {
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    primaryDark: 'bg-purple-800',
    secondary: 'bg-purple-100',
    accent: 'text-purple-600',
    background: 'bg-purple-50',
    text: 'text-purple-900'
  },
  green: {
    primary: 'bg-green-600',
    primaryHover: 'hover:bg-green-700',
    primaryDark: 'bg-green-800',
    secondary: 'bg-green-100',
    accent: 'text-green-600',
    background: 'bg-green-50',
    text: 'text-green-900'
  },
  orange: {
    primary: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    primaryDark: 'bg-orange-800',
    secondary: 'bg-orange-100',
    accent: 'text-orange-600',
    background: 'bg-orange-50',
    text: 'text-orange-900'
  },
  red: {
    primary: 'bg-red-600',
    primaryHover: 'hover:bg-red-700',
    primaryDark: 'bg-red-800',
    secondary: 'bg-red-100',
    accent: 'text-red-600',
    background: 'bg-red-50',
    text: 'text-red-900'
  },
  teal: {
    primary: 'bg-teal-600',
    primaryHover: 'hover:bg-teal-700',
    primaryDark: 'bg-teal-800',
    secondary: 'bg-teal-100',
    accent: 'text-teal-600',
    background: 'bg-teal-50',
    text: 'text-teal-900'
  }
};
```

### 4.3 Colores Dominantes en UI

#### Orange (Color principal de la app) ⭐

```tsx
// Backgrounds
'bg-orange-50'    // Fondos sutiles
'bg-orange-100'   // Hover states, badges secondary
'bg-orange-500'   // Decorativo (círculos, efectos)
'bg-orange-600'   // Botones primarios ⭐
'bg-orange-700'   // Hover de botones primarios
'bg-orange-800'   // Active state

// Text
'text-orange-700' // Links, botones ghost
'text-orange-900' // Títulos, texto destacado ⭐

// Borders
'border-orange-200' // Cards principales ⭐
'border-orange-300' // Hover borders
```

#### Grays/Neutrals

```tsx
// Backgrounds
'bg-white'       // Contenedores principales ⭐
'bg-gray-50'     // Backgrounds secundarios
'bg-gray-100'    // Export buttons, elementos UI
'bg-zinc-50'     // Fondos de secciones compactas

// Text
'text-gray-500'  // Labels, texto secundario
'text-gray-600'  // Texto normal
'text-gray-700'  // Navegación, texto importante
'text-gray-800'  // Títulos
'text-gray-900'  // Texto principal oscuro
```

#### Slate (Backgrounds globales)

```tsx
// MainApp background
'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900'

// Body (agregar a index.css)
body {
  background-color: #334155; // slate-700
}
```

### 4.4 Gradientes

```tsx
// Login/Hero background
'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900'

// Botones principales
'bg-gradient-to-r from-[#c2703a] to-[#d97b3a]'

// Headers de secciones
'bg-gradient-to-r from-orange-50 to-orange-100'
'bg-gradient-to-r from-blue-50 to-blue-100'
'bg-gradient-to-r from-green-50 to-green-100'

// Cards
'bg-gradient-to-b from-slate-50 to-white'

// Avatares
'bg-gradient-to-br from-orange-500 to-orange-600'
```

---

## 5. TIPOGRAFÍA

### 5.1 Font Family

```css
/* Agregar a index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

html {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 5.2 Font Sizes

```css
/* Base size - IMPORTANTE */
html {
  font-size: 12px !important;
}

body {
  font-size: 12px !important;
}
```

```tsx
// Tailwind classes (con base 12px)
'text-xs'    // 0.75rem (9px)
'text-sm'    // 0.875rem (10.5px)
'text-base'  // 1rem (12px) - BASE SIZE ⭐
'text-lg'    // 1.125rem (13.5px)
'text-xl'    // 1.25rem (15px)
'text-2xl'   // 1.5rem (18px)
'text-3xl'   // 1.875rem (22.5px)
```

**Markdown content** (si usas):
```css
.markdown-content {
  font-size: 14px;
  line-height: 1.7;
}

.markdown-content h1 { font-size: 1.5em; }
.markdown-content h2 { font-size: 1.3em; }
.markdown-content h3 { font-size: 1.1em; }
```

### 5.3 Font Weights

```tsx
'font-light'      // 300 - Texto ligero (poco usado)
'font-normal'     // 400 - Texto normal (default)
'font-medium'     // 500 - Labels, navegación ⭐
'font-semibold'   // 600 - Títulos, botones ⭐
'font-bold'       // 700 - Títulos importantes, énfasis
```

### 5.4 Line Heights

```css
/* Agregar a index.css */
html, body, .bg-white {
  line-height: 1.6 !important;
}
```

### 5.5 Jerarquía Visual

```tsx
// Títulos principales de sección
className="text-base font-semibold text-orange-900"

// Subtítulos
className="text-sm font-medium text-gray-500"

// Texto normal
className="text-xs"   // Datos, labels
className="text-sm"   // Navegación, botones

// Texto secundario
className="text-xs text-gray-500"

// Labels de formulario
className="block text-sm font-medium text-gray-500"
```

---

## 6. ESPACIADO

### 6.1 Sistema de Padding

#### Contenedores Principales
```tsx
// Main container
'pt-10 px-8 pb-8'  // Top: 2.5rem, Horizontal: 2rem, Bottom: 2rem ⭐

// Cards
'px-6 py-5'        // CardHeader, CardContent ⭐

// Modales
'p-6'              // Modal body estándar
'p-8'              // Login modal
'p-10'             // Glassmorphism card
```

#### Botones
```tsx
'px-5 py-2'   // Default button ⭐
'px-3'        // Small button
'px-6'        // Large button
'px-4 py-3.5' // Login inputs
```

#### Inputs
```tsx
'px-4 py-3.5'  // Inputs grandes (Login)
'p-2'          // Textarea estándar
'px-2 py-1.5'  // Inputs compactos
```

### 6.2 Sistema de Margin

```tsx
// Spacing entre elementos
'mb-0'   // Sin margen inferior (contenedor principal)
'mb-2'   // Pequeño (0.5rem)
'mb-4'   // Medio (1rem)
'mb-6'   // Grande (1.5rem)
'mb-8'   // Extra grande (2rem)

// Top margin
'mt-1'   // Labels de formulario
'mt-2'   // Elementos de formulario
'mt-4'   // Secciones
'mt-6'   // Botones submit

// Centrado
'mx-auto'  // Centrado horizontal
```

### 6.3 Sistema de Gap (Flexbox/Grid)

```tsx
'gap-1'   // 0.25rem - Elementos muy juntos
'gap-2'   // 0.5rem - Navegación, botones inline ⭐
'gap-3'   // 0.75rem - Formularios
'gap-6'   // 1.5rem - Secciones
'gap-8'   // 2rem - Contenedores principales
```

### 6.4 Space-Y (Vertical spacing)

```tsx
'space-y-0'   // Sin espacio (layouts compactos)
'space-y-1.5' // Formularios compactos
'space-y-2'   // CardHeader ⭐
'space-y-3'   // Formularios estándar
'space-y-5'   // Login forms
```

---

## 7. COMPONENTES UI ESPECIALES

### 7.1 Modales

#### Modal Base
```tsx
// Backdrop
className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"

// Modal container
className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"

// Header
className="flex items-center justify-between p-6 border-b border-gray-200"

// Title
className="text-xl font-semibold text-gray-900"

// Body
className="p-6"

// Close button
className="text-gray-400 hover:text-gray-600 transition-colors ml-auto"
```

#### Modal Glassmorphism
```tsx
// Backdrop con blur
className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-50"

// Container
className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20"
```

### 7.2 Toasts

```tsx
// Container
className="fixed top-5 right-5 {bgColor} text-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-toast-in z-50 max-w-sm"

// Colors por tipo
type === 'success' ? 'bg-emerald-500'
type === 'error'   ? 'bg-red-500'
type === 'info'    ? 'bg-blue-500'
```

### 7.3 Badges

```tsx
// Base
className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium"

// Variants
default:     'bg-orange-600 text-white shadow-sm'
secondary:   'bg-amber-100 text-amber-900 border border-orange-300'
destructive: 'bg-red-600 text-white'
outline:     'border-2 border-orange-600 text-orange-700 bg-white'
```

#### Pills/Status Badges
```tsx
// Activo
className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full"

// Bloqueado
className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full"

// Badge genérico
className="px-2 py-0.5 bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-full"
```

### 7.4 Pills/Tabs Selector

```tsx
// Container
className="flex bg-white/10 rounded-2xl p-1.5 mb-6"

// Button activo
className="flex-1 py-2.5 px-4 text-sm font-medium rounded-xl transition-all duration-300 bg-white/20 text-white shadow-lg"

// Button inactivo
className="flex-1 py-2.5 px-4 text-sm font-medium rounded-xl transition-all duration-300 text-white/50 hover:text-white/80"
```

### 7.5 Forms (Inputs, Selects)

#### Input Estándar
```tsx
className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-200 text-white placeholder-white/40"
```

#### Input Compacto
```tsx
className="w-full px-2 py-1.5 border border-slate-300 rounded text-[10px] focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:outline-none"
```

#### Textarea
```tsx
className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
```

#### Select
```tsx
className="w-full p-1 border rounded-md bg-white"
```

#### Search Input (con icono)
```tsx
<div className="relative">
  <svg className="h-5 w-5 absolute left-3 top-3 text-stone-400">
    {/* Icono de búsqueda */}
  </svg>
  <input className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
</div>
```

### 7.6 Tables

```tsx
// Container
className="overflow-x-auto"

// Table
className="min-w-full divide-y divide-gray-200 text-sm"

// Thead
className="bg-gray-50"

// Th
className="px-4 py-2 text-left font-medium text-gray-700"

// Tr body
className="hover:bg-gray-50"

// Td
className="px-4 py-2"
```

---

## 8. EFECTOS VISUALES

### 8.1 Shadows Detalladas

```tsx
// Shadows básicas
'shadow-sm'    // Pequeño, sutil
'shadow-md'    // Avatares
'shadow-lg'    // Cards principales, navegación ⭐
'shadow-xl'    // Modales
'shadow-2xl'   // Modales glassmorphism

// Hover shadows con color
'hover:shadow-lg hover:shadow-orange-500/30' ⭐
```

### 8.2 Blur Effects

#### Backdrop Blur
```tsx
'backdrop-blur-sm'   // Blur sutil (backgrounds modales)
'backdrop-blur-xl'   // Blur intenso (glassmorphism cards) ⭐

// Background circles decorativos
'blur-2xl'  // Círculos pequeños
'blur-3xl'  // Círculos grandes ⭐
```

### 8.3 Opacity Patterns

```tsx
// Backgrounds con opacidad
'bg-black/90'      // Tooltips oscuros
'bg-white/10'      // Glassmorphism ⭐
'bg-slate-900/70'  // Modal backdrop con blur
'bg-orange-500/20' // Círculos decorativos

// Text con opacidad
'text-white/40'    // Footer, texto muy secundario
'text-white/50'    // Links secundarios
'text-white/60'    // Subtítulos
'text-white/70'    // Labels

// Border con opacidad
'border-white/20'  // Glassmorphism ⭐
```

### 8.4 Decorative Circles (Background)

```tsx
// Círculos estáticos (fondo de app)
<div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
<div className="absolute top-40 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
<div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl" />

// Círculos animados (login/hero)
<div
  className="absolute top-20 left-20 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl animate-pulse"
  style={{ animationDuration: '4s' }}
/>

<div
  className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl animate-pulse"
  style={{ animationDuration: '6s', animationDelay: '1s' }}
/>
```

---

## 9. LAYOUTS Y ESTRUCTURA

### 9.1 Flex Patterns

#### Contenedores Principales
```tsx
// Vertical stack
'flex flex-col' ⭐

// Horizontal con espacio entre
'flex items-center justify-between' ⭐

// Centrado completo
'flex items-center justify-center'

// Con gap
'flex items-center gap-2'
'flex flex-col gap-6'
```

#### Navegación (Header típico)
```tsx
<header className="flex items-center justify-between p-0">
  <div className="flex items-center gap-8">
    {/* Logo y navegación */}
  </div>
  <div className="flex items-center gap-2">
    {/* Acciones (avatar, settings, etc.) */}
  </div>
</header>
```

### 9.2 Responsive Breakpoints

```css
/* Agregar a index.css si necesitas responsive */
@media (max-width: 768px) {
  main, .main-container {
    max-width: 100% !important;
    padding: 0 1rem !important;
  }
}
```

**Nota**: SIMORAHealth está optimizado para desktop, no es fuertemente responsive.

### 9.3 Scrolling Behavior

#### Custom Scrollbar
```css
/* Agregar a index.css - Essential for SIMORAHealth look */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(43, 43, 43, 0.15) transparent;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(43, 43, 43, 0.15);
  border-radius: 10px;
  transition: background-color 0.2s ease;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(43, 43, 43, 0.3);
}
```

#### Overflow Patterns
```tsx
'overflow-hidden'      // Contenedor principal ⭐
'overflow-y-auto'      // Modales, secciones scrolleables
'overflow-x-auto'      // Tablas
'max-h-[90vh]'        // Modales
'max-h-96'            // Listas de resultados
```

---

## 10. MICROINTERACCIONES

### 10.1 Cursor Changes

```tsx
'cursor-pointer'       // Elementos clickeables ⭐
'cursor-help'          // Tooltip triggers
'cursor-not-allowed'   // Disabled states
```

### 10.2 Focus States

```tsx
// Estándar (botones)
'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'

// Con color personalizado (inputs)
'focus:ring-2 focus:ring-orange-500 focus:border-transparent' ⭐

// Inputs con glassmorphism
'focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50'

// Inputs compactos
'focus:ring-1 focus:ring-orange-400'

// Button (focus-visible para accesibilidad)
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
```

### 10.3 Hover Effects

#### Lift Effect (Botones principales)
```tsx
'hover:-translate-y-0.5' ⭐
```

#### Opacity Changes
```tsx
'hover:opacity-70'   // Logo/avatar
'hover:opacity-80'   // Calendar events
'opacity-0 group-hover:opacity-100'  // Botones inline (edición)
```

#### Background Changes
```tsx
'hover:bg-gray-50'
'hover:bg-orange-50'   ⭐
'hover:bg-orange-100'
'hover:bg-zinc-100'
```

#### Scale
```tsx
'hover:scale-110'  // Botones de ayuda, CTAs
```

### 10.4 Tooltip Behaviors

```tsx
// Tooltip container (aparece en hover del grupo)
className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-pre-wrap text-center"
```

### 10.5 Group Hover Pattern

```tsx
// Parent
className="group flex items-center gap-1 hover:bg-zinc-100"

// Child que aparece en hover del parent
className="opacity-0 group-hover:opacity-100 transition-all"
```

**Ejemplo completo** (botón de edición inline):
```tsx
<div className="group flex items-center gap-1 hover:bg-zinc-100 pl-0.5 pr-1 py-0 rounded transition-colors">
  <span>Contenido</span>
  <button className="opacity-0 group-hover:opacity-100 transition-all p-0.5 rounded hover:bg-zinc-200">
    <PencilIcon className="h-3 w-3" />
  </button>
</div>
```

---

## 11. PATRONES ESPECIALES

### 11.1 Glassmorphism (Login/Hero Pages)

```tsx
// Card principal
className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20"

// Inputs
className="bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-orange-400/50"

// Alerts
className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200"
```

**Fondo recomendado para glassmorphism**:
```tsx
className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
```

### 11.2 Editable Inline Fields

```tsx
// Modo vista (con CopyButton y Edit button)
<div className="group flex items-center gap-1 hover:bg-zinc-100 pl-0.5 pr-1 py-0 rounded transition-colors">
  <CopyButton text={value} />
  <span className="text-xs">{value}</span>
  <button
    onClick={() => setIsEditing(true)}
    className="opacity-0 group-hover:opacity-100 transition-all p-0.5 rounded hover:bg-zinc-200 text-gray-500 flex-shrink-0"
  >
    <PencilIcon className="h-3 w-3" />
  </button>
</div>

// Modo edición
<div className="flex items-center gap-1">
  <input
    className="flex-1 text-xs px-1 py-0.5 border border-gray-300 rounded"
    value={editValue}
    onChange={(e) => setEditValue(e.target.value)}
  />
  <button
    onClick={handleSave}
    className="p-0.5 rounded hover:bg-green-200 text-green-700"
  >
    <CheckIcon className="h-3 w-3" />
  </button>
  <button
    onClick={() => setIsEditing(false)}
    className="p-0.5 rounded hover:bg-red-200 text-red-700"
  >
    <XIcon className="h-3 w-3" />
  </button>
</div>
```

### 11.3 Avatar Pattern

```tsx
// Avatar con iniciales
<div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0 shadow-md">
  {user.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
</div>
```

**Función para obtener iniciales**:
```typescript
function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();
}
```

### 11.4 Carrusel/Carousel

```tsx
// Container
className="h-1/5 relative bg-gradient-to-b from-slate-50 to-white rounded-lg border border-slate-200 overflow-hidden shadow-sm"

// Navigation buttons
<button className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white hover:bg-slate-100 rounded-full shadow-md transition-all duration-200 z-10">
  <ChevronLeftIcon />
</button>

// Dots indicator
<div className="flex gap-2 justify-center mt-3">
  {items.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`transition-all duration-300 rounded-full ${
        index === currentIndex
          ? 'w-8 h-2 bg-slate-600'
          : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
      }`}
    />
  ))}
</div>
```

---

## 12. UTILIDADES Y HELPERS

### 12.1 cn() Function (Class Name Merger)

**ESENCIAL para composición dinámica de clases de Tailwind**

```typescript
// utils/helpers.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Instalación**:
```bash
npm install clsx tailwind-merge
```

**Uso**:
```tsx
// En componentes con variantes
interface ButtonProps {
  variant?: 'default' | 'outline';
  className?: string;
}

export function Button({ variant = 'default', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        className  // Permite override desde props
      )}
      {...props}
    />
  );
}
```

### 12.2 Zoom Global

```css
/* Agregar a index.css */
html {
  zoom: 0.8;  /* 80% del tamaño base */
}
```

**IMPORTANTE**: Esto afecta TODA la aplicación. Considéralo en medidas absolutas (px).

---

## 13. CONVENCIONES DE NOMBRES

### 13.1 Archivos de Componentes

```
✅ PascalCase para componentes:
   Button.tsx, Card.tsx, Modal.tsx

✅ PascalCase para vistas:
   NewsView.tsx, PatientIndexView.tsx

✅ camelCase para utilities:
   helpers.ts, themeUtils.ts

✅ kebab-case para CSS modules (si usas):
   button.module.css
```

### 13.2 Props Interfaces

```typescript
// Nombre del componente + Props
interface ButtonProps {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  children: React.ReactNode;
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
}
```

### 13.3 Prefijos de Funciones

```typescript
// Event handlers
handle*   // handleClick, handleSubmit, handleChange

// Getters
get*      // getInitials, getUser, getTratantes

// Callback props
on*       // onClose, onSelectPatient, onSave

// Boolean checks
is*       // isEditing, isOpen, isActive
has*      // hasAccess, hasPermission

// Setters
set*      // setIsEditing, setCurrentIndex
```

---

## 14. CONCLUSIONES Y BUENAS PRÁCTICAS

### 14.1 Consistencia Visual

1. **Orange (#c2703a - #d97b3a)** es el color principal de identidad ⭐
2. Todos los contenedores principales usan `border-2 border-orange-200`
3. Todos los botones primarios usan gradiente orange
4. Todos los inputs usan `focus:ring-2 focus:ring-orange-400/50`
5. Todas las transiciones son `duration-200` o `duration-300`

### 14.2 Jerarquía Clara

1. Cards con `rounded-xl` y `shadow-lg`
2. Títulos con `font-semibold text-orange-900`
3. Texto secundario con `text-gray-500`
4. Hover states con `transition-all duration-200`
5. Spacing consistente: múltiplos de 0.25rem

### 14.3 Patrones Reutilizables

- **Usar componentes base** (Button, Card, Modal, Badge) siempre que sea posible
- **Aplicar cn()** para composición dinámica de clases
- **Mantener consistencia** en spacing: `px-4`, `py-2`, `gap-2`
- **Evitar valores custom** - usar escala de Tailwind

### 14.4 Animaciones Sutiles

- **Duraciones cortas** (200-300ms) para interactividad
- `transition-all` para cambios múltiples
- `transition-colors` para cambios solo de color (más eficiente)
- Evitar animaciones largas (>500ms) excepto para efectos decorativos

### 14.5 Accesibilidad

- Usar `focus-visible` en lugar de `focus` para botones
- Mantener contraste WCAG AA mínimo (4.5:1 para texto normal)
- Usar `aria-label` en iconos sin texto
- Asegurar `cursor-pointer` en elementos clickeables

### 14.6 Performance

- Preferir `transition-colors` sobre `transition-all` cuando solo cambian colores
- Evitar `backdrop-blur` en elementos que se animan frecuentemente
- Usar `will-change` solo cuando sea necesario
- Limitar número de círculos decorativos animados (3-4 máximo)

---

## 🚀 CHECKLIST DE IMPLEMENTACIÓN

### Setup Inicial
- [ ] Instalar Tailwind CSS
- [ ] Instalar dependencias: `clsx`, `tailwind-merge`
- [ ] Importar fuente Inter desde Google Fonts
- [ ] Configurar `tailwind.config.js` con colores y animaciones
- [ ] Agregar CSS custom a `index.css`:
  - Font-family Inter
  - Font-size base 12px
  - Line-height 1.6
  - Zoom 0.8
  - Custom scrollbar
  - Keyframes (fadeInDiffuse, fadeIn, slideUp)

### Componentes Base
- [ ] Crear `utils/helpers.ts` con función `cn()`
- [ ] Crear `components/ui/Button.tsx` con 6 variantes
- [ ] Crear `components/ui/Card.tsx` con Header, Title, Content
- [ ] Crear `components/ui/Modal.tsx`
- [ ] Crear `components/ui/Badge.tsx`
- [ ] Crear `components/ui/Toast.tsx`

### Theming (Opcional)
- [ ] Crear `utils/themeUtils.ts` con paletas de 6 colores
- [ ] Implementar ThemeContext
- [ ] Agregar theme switcher

### Testing Visual
- [ ] Verificar contenedor principal (700px height)
- [ ] Verificar colores orange en botones y borders
- [ ] Verificar animación fadeInDiffuse al cargar
- [ ] Verificar custom scrollbar
- [ ] Verificar hover effects (lift en botones)
- [ ] Verificar focus rings en inputs

---

## 📚 RECURSOS ADICIONALES

### Dependencias NPM
```bash
npm install clsx tailwind-merge
npm install -D tailwindcss@latest
npm install lucide-react  # Para iconos (opcional)
```

### Tailwind Config Completo
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'priority-p1': '#dc2626',
        'priority-p2': '#f59e0b',
        'priority-p3': '#10b981',
        'sla-critical': '#dc2626',
        'sla-warning': '#f59e0b',
        'sla-ok': '#10b981',
        'surface': {
          DEFAULT: '#ffffff',
          hover: '#f9fafb',
          active: '#f3f4f6',
        },
        'background': '#f8fafc',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
```

### Index.css Completo
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base settings */
html {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px !important;
  zoom: 0.8;
}

body {
  font-size: 12px !important;
  background-color: #334155; /* slate-700 */
}

html, body, .bg-white {
  line-height: 1.6 !important;
}

/* Custom Scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(43, 43, 43, 0.15) transparent;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(43, 43, 43, 0.15);
  border-radius: 10px;
  transition: background-color 0.2s ease;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(43, 43, 43, 0.3);
}

/* Animations */
@keyframes fadeInDiffuse {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Markdown content (si usas) */
.markdown-content {
  font-size: 14px;
  line-height: 1.7;
}

.markdown-content h1 { font-size: 1.5em; }
.markdown-content h2 { font-size: 1.3em; }
.markdown-content h3 { font-size: 1.1em; }

/* Responsive */
@media (max-width: 768px) {
  main, .main-container {
    max-width: 100% !important;
    padding: 0 1rem !important;
  }
}
```

---

## 💡 TIPS FINALES

1. **Mantén la consistencia** - No inventes nuevos valores, usa la escala de Tailwind
2. **Orange es la identidad** - Úsalo en elementos principales (botones, borders, accents)
3. **Animaciones sutiles** - 200-300ms para la mayoría de interacciones
4. **Spacing predecible** - Múltiplos de 0.25rem (4px)
5. **Glassmorphism con moderación** - Solo para login/hero pages
6. **Custom scrollbar** - Define la experiencia premium
7. **Focus rings** - Siempre naranja (`orange-400`)
8. **Lift effect** - Usa en botones principales para feedback táctil

---

**¡Con esta guía tienes todo lo necesario para replicar el look & feel completo de SIMORAHealth!**

Si necesitas aclaraciones sobre algún patrón específico o ejemplos adicionales, no dudes en preguntar.

---

*Documento generado por análisis exhaustivo del codebase de SIMORAHealth*
*Última actualización: 2025-01-23*

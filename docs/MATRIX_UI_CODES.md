# 🟢 MATRIX UI COMPONENT CODES

## Sistema de Nomenclatura Frontend - SIMORAHealth

---

## 🎯 CONTENEDORES PRINCIPALES

### **NEO-001** - Main Container
- **Componente**: `MainApp.tsx`
- **Ubicación**: Línea 473-486
- **Descripción**: Contenedor blanco principal que cambia según la vista activa
- **Altura**: 1050px fija
- **Clases**: `bg-white rounded-xl shadow-lg border-2 border-orange-200`

### **TRINITY-002** - Header Navigation
- **Componente**: `MainApp.tsx`
- **Ubicación**: Línea 394-471
- **Descripción**: Barra de navegación superior con logo y pestañas
- **Clases**: `bg-white border-2 border-orange-200 rounded-xl`

### **MORPHEUS-003** - Content Wrapper
- **Componente**: `MainApp.tsx`
- **Ubicación**: Línea 483
- **Descripción**: Contenedor interno con padding para el contenido
- **Clases**: `pt-10 px-8 pb-8 flex flex-col h-full overflow-hidden`

---

## 📱 VISTAS / VIEWS

### **ZION-101** - Calendar View
- **Componente**: `Calendar.tsx`
- **Descripción**: Vista de calendario con celdas de 150x150px
- **Grid**: 7 columnas × 6 filas

### **ZION-102** - Patient Index View
- **Componente**: `PatientIndexView.tsx`
- **Descripción**: Índice de pacientes con tabla

### **ZION-103** - Statistics View
- **Componente**: `StatisticsView.tsx`
- **Descripción**: Panel de estadísticas

### **ZION-104** - Ingresar Prestacion View
- **Componente**: `IngresarPrestacionView.tsx`
- **Descripción**: Registro de prestaciones múltiples

### **ZION-105** - Ingresar Actividad View
- **Componente**: `IngresarActividadView.tsx`
- **Descripción**: Registro de actividad general

### **ZION-106** - Recent Activity View
- **Componente**: `RecentActivityView.tsx`
- **Descripción**: Actividad reciente

### **ZION-107** - News View
- **Componente**: `NewsView.tsx`
- **Descripción**: Noticias médicas

### **ZION-108** - Anexos View
- **Componente**: `AnexosView.tsx`
- **Descripción**: Recursos y directorio

### **ZION-109** - Admin View
- **Componente**: `AdminView.tsx`
- **Descripción**: Panel de administración

---

## 🎨 COMPONENTES UI BASE

### **ORACLE-201** - Button
- **Componente**: `components/ui/Button.tsx`
- **Variantes**: default, destructive, outline, secondary, ghost, link
- **Color principal**: orange-600

### **ORACLE-202** - Card
- **Componente**: `components/ui/Card.tsx`
- **Partes**: Card, CardHeader, CardTitle, CardContent
- **Border**: border-2 border-orange-200

### **ORACLE-203** - Badge
- **Componente**: `components/ui/Badge.tsx`
- **Variantes**: default, secondary, destructive, outline

---

## 🔘 ELEMENTOS DE NAVEGACIÓN

### **CYPHER-301** - Navigation Tabs
- **Componente**: `MainApp.tsx`
- **Ubicación**: Línea 429-447
- **Descripción**: Pestañas de navegación principal
- **Activo**: `bg-orange-100 text-orange-900`
- **Inactivo**: `text-gray-700 hover:bg-orange-50`

### **CYPHER-302** - User Avatar
- **Componente**: `MainApp.tsx`
- **Ubicación**: Línea 408-410
- **Descripción**: Avatar circular con iniciales
- **Clases**: `bg-gradient-to-br from-orange-500 to-orange-600`

### **CYPHER-303** - Action Icons
- **Componente**: `MainApp.tsx`
- **Ubicación**: Línea 450-469
- **Descripción**: Iconos de acciones (zoom, interacciones, logout)

---

## 🎯 COMPONENTES FLOTANTES

### **AGENT-401** - HotkeysHelp
- **Componente**: `MainApp.tsx`
- **Ubicación**: Línea 41-81
- **Descripción**: Botón flotante de ayuda con atajos
- **Posición**: `fixed bottom-4 left-4`
- **Color**: `bg-gradient-to-br from-orange-500 to-orange-600`

### **AGENT-402** - ThemeSwitcher
- **Componente**: `ThemeSwitcher.tsx`
- **Descripción**: Selector de tema flotante
- **Posición**: `fixed bottom-4 left-4`
- **Color**: Gradiente naranja

---

## 📅 CALENDARIO - ELEMENTOS ESPECÍFICOS

### **ARCHITECT-501** - Calendar Header
- **Componente**: `Calendar.tsx`
- **Ubicación**: Línea 196-218
- **Descripción**: Encabezado con navegación de mes y botón Google Calendar

### **ARCHITECT-502** - Day Headers
- **Componente**: `Calendar.tsx`
- **Ubicación**: Línea 221-223
- **Descripción**: Encabezados de días de la semana
- **Clases**: `bg-gray-100 border-t border-gray-300`

### **ARCHITECT-503** - Calendar Cell
- **Componente**: `Calendar.tsx`
- **Ubicación**: Línea 233
- **Descripción**: Celda individual del calendario
- **Tamaño**: `w-[150px] h-[150px]`

---

## 🎨 ESTILOS GLOBALES

### **SENTINEL-601** - Global Styles
- **Archivo**: `index.css`
- **Background**: `#f4f1ea` (beige cálido)
- **Texto**: `#2c2c2c`

### **SENTINEL-602** - Login Page
- **Componente**: `LoginPage.tsx`
- **Background**: `#f4f1ea`
- **Card**: `bg-white border-2 border-orange-200`

---

## 📝 CÓMO USAR ESTOS CÓDIGOS

Para dar instrucciones, usa el formato:

```
"Modifica NEO-001 para que tenga padding de 20px"
"Cambia el color de ORACLE-201 (Button default) a azul"
"Ajusta ARCHITECT-503 (Calendar Cell) a 200x200px"
"Actualiza CYPHER-301 para que las tabs activas sean rojas"
```

---

**Matrix System Status**: ✅ ONLINE
**Components Mapped**: 21
**Last Updated**: 2025-11-17

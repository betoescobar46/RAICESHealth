# UI Components Library

Esta carpeta contiene componentes UI reutilizables extraídos de duplicaciones en el código base.

## Componentes Disponibles

### ExportButton
Botón estándar para exportar datos a Excel.

**Props:**
- `onClick: () => void` - Función que se ejecuta al hacer click
- `text?: string` - Texto del botón (default: "Exportar")
- `className?: string` - Clases CSS adicionales

**Uso:**
```tsx
import { ExportButton } from './components/ui';

<ExportButton onClick={handleExport} text="Exportar Pacientes" />
```

**Ubicaciones originales:** PatientFileView, AdminView, StatisticsView (6 archivos)

---

### CopyButton
Botón de copiar al portapapeles con indicador visual de estado.

**Props:**
- `value: string` - Valor a copiar
- `label: string` - Etiqueta descriptiva del campo
- `onCopy?: () => void` - Callback opcional después de copiar
- `className?: string` - Clases CSS adicionales
- `iconClassName?: string` - Clases para el icono

**Uso:**
```tsx
import { CopyButton } from './components/ui';

<CopyButton
    value={patient.rut}
    label="RUT"
    onCopy={() => console.log('Copied!')}
/>
```

**Ubicaciones originales:** PatientFileView (repetido 11 veces en líneas 813-891)

---

### Toast
Notificación temporal auto-dismissible.

**Props:**
- `message: string` - Mensaje a mostrar
- `type?: 'success' | 'error' | 'info'` - Tipo de notificación (default: 'success')
- `duration?: number` - Duración en ms (default: 6000)
- `onClose: () => void` - Callback al cerrar

**Uso:**
```tsx
import { Toast } from './components/ui';

{showToast && (
    <Toast
        message="Prestación guardada con éxito"
        type="success"
        onClose={() => setShowToast(false)}
    />
)}
```

**Ubicaciones originales:** IngresarPrestacionView:33-51

---

### Modal
Modal genérico reutilizable con overlay y manejo de escape.

**Props:**
- `isOpen: boolean` - Controla visibilidad
- `onClose: () => void` - Callback al cerrar
- `title?: string` - Título del modal
- `children: ReactNode` - Contenido del modal
- `className?: string` - Clases adicionales para el overlay
- `contentClassName?: string` - Clases adicionales para el contenido
- `showCloseButton?: boolean` - Mostrar botón de cierre (default: true)
- `maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` - Ancho máximo (default: 'lg')

**Uso:**
```tsx
import { Modal } from './components/ui';

<Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Agregar Paciente"
    maxWidth="md"
>
    <form>...</form>
</Modal>
```

**Features:**
- Bloqueo de scroll del body cuando está abierto
- Cierre con tecla Escape
- Click fuera del modal para cerrar
- Animaciones suaves

---

## Componentes Base Existentes

### Badge
Badge para etiquetas y estados.

### Button
Botón con múltiples variantes y tamaños.

### Card, CardHeader, CardTitle, CardContent
Sistema de tarjetas componibles.

---

## Importación

```tsx
// Importar componentes individuales
import { ExportButton, CopyButton, Toast, Modal } from './components/ui';

// O importar todos
import * as UI from './components/ui';
```

## Notas de Implementación

- Todos los componentes están escritos en TypeScript
- Utilizan Tailwind CSS para estilos
- Siguen los patrones de diseño existentes en el proyecto
- Compatibles con React 18+

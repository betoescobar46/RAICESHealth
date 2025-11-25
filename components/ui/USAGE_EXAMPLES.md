# Ejemplos de Uso - UI Components

## ExportButton

### Ejemplo 1: Uso básico
```tsx
import { ExportButton } from './components/ui';

const MyComponent = () => {
    const handleExport = () => {
        // lógica de exportación
        exportToExcel(data, 'mi-archivo');
    };

    return <ExportButton onClick={handleExport} />;
};
```

### Ejemplo 2: Texto personalizado
```tsx
<ExportButton onClick={handleExport} text="Descargar Excel" />
```

### Ejemplo 3: Con clases personalizadas
```tsx
<ExportButton
    onClick={handleExport}
    text="Exportar Reporte"
    className="shadow-md hover:shadow-lg"
/>
```

---

## CopyButton

### Ejemplo 1: Campo simple
```tsx
import { CopyButton } from './components/ui';

const PatientInfo = ({ patient }) => (
    <div className="group flex items-center">
        <CopyButton value={patient.rut} label="RUT" />
        <p><strong>RUT:</strong> {patient.rut}</p>
    </div>
);
```

### Ejemplo 2: Con callback
```tsx
const [lastCopied, setLastCopied] = useState('');

<CopyButton
    value={patient.email}
    label="Email"
    onCopy={() => setLastCopied('Email copiado')}
/>
```

### Ejemplo 3: Integración en lista de datos demográficos
```tsx
const DemographicData = ({ patient }) => {
    const [copiedField, setCopiedField] = useState('');

    const handleCopy = (fieldName: string) => {
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(''), 2000);
    };

    return (
        <div className="space-y-0 text-xs w-[300px]">
            <div className="group flex items-center gap-1 hover:bg-zinc-100 pl-0.5 pr-1 py-0 rounded">
                <CopyButton
                    value={patient.rut}
                    label="RUT"
                    onCopy={() => handleCopy('RUT')}
                />
                <p><strong>RUT:</strong> {patient.rut}</p>
                {copiedField === 'RUT' && <span className="text-xs ml-auto">✓</span>}
            </div>
            {/* Más campos... */}
        </div>
    );
};
```

---

## Toast

### Ejemplo 1: Notificación de éxito
```tsx
import { Toast } from './components/ui';

const MyForm = () => {
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = () => {
        // guardar datos...
        setShowToast(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>...</form>
            {showToast && (
                <Toast
                    message="Datos guardados correctamente"
                    type="success"
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
};
```

### Ejemplo 2: Notificación de error
```tsx
<Toast
    message="Error al guardar los datos"
    type="error"
    duration={8000}
    onClose={() => setShowToast(false)}
/>
```

### Ejemplo 3: Notificación informativa
```tsx
<Toast
    message="Procesando 50 prestaciones..."
    type="info"
    duration={3000}
    onClose={() => setShowToast(false)}
/>
```

### Ejemplo 4: Hook personalizado
```tsx
const useToast = () => {
    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: 'success' | 'error' | 'info';
    }>({
        show: false,
        message: '',
        type: 'success'
    });

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToast({ show: true, message, type });
    };

    const hideToast = () => {
        setToast(prev => ({ ...prev, show: false }));
    };

    const ToastComponent = toast.show ? (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
        />
    ) : null;

    return { showToast, ToastComponent };
};

// Uso:
const MyComponent = () => {
    const { showToast, ToastComponent } = useToast();

    const handleSuccess = () => {
        showToast('Operación exitosa', 'success');
    };

    return (
        <>
            <button onClick={handleSuccess}>Guardar</button>
            {ToastComponent}
        </>
    );
};
```

---

## Modal

### Ejemplo 1: Modal básico
```tsx
import { Modal } from './components/ui';

const MyComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Mi Modal"
            >
                <p>Contenido del modal aquí</p>
            </Modal>
        </>
    );
};
```

### Ejemplo 2: Modal de formulario
```tsx
const AddPatientModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({ nombre: '', rut: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Agregar Nuevo Paciente"
            maxWidth="md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label>RUT</label>
                    <input
                        type="text"
                        value={formData.rut}
                        onChange={e => setFormData({...formData, rut: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose}>Cancelar</button>
                    <button type="submit">Guardar</button>
                </div>
            </form>
        </Modal>
    );
};
```

### Ejemplo 3: Modal de confirmación
```tsx
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Confirmar Eliminación"
        maxWidth="sm"
    >
        <div className="space-y-4">
            <p>¿Está seguro que desea eliminar "{itemName}"?</p>
            <p className="text-sm text-gray-600">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                    Cancelar
                </button>
                <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">
                    Eliminar
                </button>
            </div>
        </div>
    </Modal>
);
```

### Ejemplo 4: Modal de ancho completo
```tsx
<Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Vista Completa"
    maxWidth="2xl"
    className="p-8"
>
    <div className="grid grid-cols-2 gap-6">
        {/* Contenido complejo */}
    </div>
</Modal>
```

### Ejemplo 5: Modal sin botón de cierre
```tsx
<Modal
    isOpen={isLoading}
    onClose={() => {}}
    showCloseButton={false}
    maxWidth="sm"
>
    <div className="text-center py-8">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4">Procesando...</p>
    </div>
</Modal>
```

---

## Combinando Componentes

### Ejemplo: Formulario completo con Toast y Modal
```tsx
const PrestacionForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const handleSave = async (data) => {
        try {
            await savePrestacion(data);
            setIsModalOpen(false);
            setToastMessage('Prestación guardada con éxito');
            setToastType('success');
            setShowToast(true);
        } catch (error) {
            setToastMessage('Error al guardar la prestación');
            setToastType('error');
            setShowToast(true);
        }
    };

    const handleExport = () => {
        exportToExcel(prestaciones, 'prestaciones');
        setToastMessage('Archivo exportado correctamente');
        setToastType('success');
        setShowToast(true);
    };

    return (
        <>
            <div className="flex gap-2">
                <button onClick={() => setIsModalOpen(true)}>
                    Nueva Prestación
                </button>
                <ExportButton onClick={handleExport} />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Agregar Prestación"
            >
                {/* Formulario aquí */}
            </Modal>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
};
```

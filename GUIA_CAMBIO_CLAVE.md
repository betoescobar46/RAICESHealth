# 🔑 Guía Rápida: Cambiar Contraseña

## Paso a Paso con Imágenes

### 1. Iniciar Sesión
```
Login con:
Email: admin@simorahealth.cl
Contraseña: 123456
```

### 2. Ir a "Gestión de Usuarios"
Una vez dentro del panel de administración, verás una sección llamada **"Gestión de Usuarios"**

### 3. Encontrar el Botón "Cambiar Clave"
En la tabla de usuarios, busca la fila de tu usuario (Administrador) y verás varios botones:

```
┌────────────────────────────────────────────────────────────┐
│ Gestión de Usuarios                    [+ Agregar Usuario] │
├────────┬──────────────┬──────┬────────┬───────────────────┤
│ Nombre │ RUT          │ Rol  │ Título │ Acciones          │
├────────┼──────────────┼──────┼────────┼───────────────────┤
│ Admin  │ admin@...cl  │ Admin│ Admin  │ 🔑 ↻ 🗑️          │
└────────┴──────────────┴──────┴────────┴───────────────────┘
                                           │  │  │
                                           │  │  └─ Eliminar
                                           │  └──── Resetear Contraseña
                                           └────────Cambiar Clave ⬅️ ESTE
```

### 4. Click en 🔑 (Cambiar Clave)
Al hacer click, aparecerá un modal/ventana emergente con:
- Campo "Nueva Contraseña"
- Campo "Confirmar Contraseña"
- Botones "Cancelar" y "Guardar"

### 5. Ingresar Nueva Contraseña
- Escribe tu nueva contraseña (mínimo 6 caracteres)
- Confirma escribiéndola nuevamente
- Click en "Guardar"

### 6. Confirmar con Contraseña Actual
El sistema te pedirá tu contraseña actual (`123456`) en un prompt

### 7. ¡Listo!
Tu contraseña ha sido cambiada exitosamente.

---

## ⚠️ Solución de Problemas

### "No veo el botón 🔑"
- Asegúrate de estar en la vista "AdminView" (solo admin puede verla)
- Verifica que estás viendo la tabla de usuarios completa

### "El botón no hace nada"
- Verifica que el servidor de desarrollo esté corriendo
- Revisa la consola del navegador (F12) para ver errores

### "Error: contraseña muy débil"
- Firebase requiere mínimo 6 caracteres
- Usa una combinación de letras, números y símbolos

### "Contraseña actual incorrecta"
- Confirma que estás usando `123456` como contraseña actual
- Si ya la cambiaste antes, usa la contraseña que estableciste

---

## 🎯 Acceso Rápido

**Ruta completa:**
```
http://localhost:5177/
  → Login (admin@simorahealth.cl / 123456)
    → AdminView
      → Gestión de Usuarios (pestaña)
        → Tabla de usuarios
          → Botón 🔑 en tu fila
```

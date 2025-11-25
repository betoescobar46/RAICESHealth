# 🔐 Credenciales de Acceso - RAICESHealth

## ⚠️ PROYECTO FIREBASE ACTUALIZADO

**RAICESHealth ahora usa su propio proyecto Firebase separado:**
- Proyecto anterior: `simorahealth`
- Proyecto nuevo: **`raiceshealth-cl`** ✅
- **Ubicación de datos: Santiago, Chile** 🇨🇱

## Usuario Administrador

### Login con Email
```
Email: admin@raiceshealth.cl
Contraseña: 0558060
UID: hdTIPnXEX1XISYkh5sP4iUZGV0e2
```

### Opción con RUT (Legacy)
```
RUT: 1234-5
Contraseña: 0558060
```

---

## ⚠️ IMPORTANTE

### Para Login con Email (Recomendado)
El sistema ahora acepta **emails directos** además de RUTs. Para el usuario administrador:

1. **Ir a**: http://localhost:3000/
2. **Ingresar en "RUT o Email"**: `admin@raiceshealth.cl`
3. **Ingresar en "Clave"**: `0558060`
4. **Clic en "Ingresar"**

---

## 📝 Cómo Funciona el Sistema de Login

El sistema soporta **dos tipos de autenticación**:

### 1. Login con RUT (Sistema Legacy)
- Formato: `12345678-9`
- El sistema convierte el RUT a email: `00001234-5@simorahealth.local`
- Usa Firebase Auth con email derivado

### 2. Login con Email Directo (Nuevo)
- Formato: `usuario@dominio.com`
- Se usa directamente con Firebase Auth

---

## 🔧 Crear Usuarios Adicionales

Una vez que hayas iniciado sesión como admin:

1. **AdminView** → **Gestión de Usuarios**
2. **Agregar Usuario**
3. **Datos requeridos**:
   - RUT del usuario
   - Nombre
   - Rol (admin/profesional/estadistica)
   - Email (opcional pero recomendado)

El sistema creará automáticamente:
- Usuario en Firebase Authentication
- Documento en Firestore `/users/{uid}`
- Contraseña temporal que el usuario puede cambiar

---

## 🛠️ Troubleshooting

### "Usuario no encontrado"
- Verificar que estás usando el email correcto: `admin@raiceshealth.cl`
- Verificar que el usuario existe en Firebase Console
  - https://console.firebase.google.com/project/raiceshealth-cl/authentication/users

### "Contraseña incorrecta"
- La contraseña actual es: `0558060`

### "RUT inválido"
- Si usas el RUT `1234-5`, el sistema lo acepta como RUT de prueba
- **MEJOR**: Usa el email directo `admin@raiceshealth.cl`

---

## 📊 Estado Actual del Sistema

✅ **Proyecto Firebase**: `raiceshealth-cl` (separado de simorahealth)
✅ **Usuario Admin**: `admin@raiceshealth.cl` (✅ CREADO)
✅ **Firestore Database**: Creado en **Santiago, Chile** (southamerica-west1) 🇨🇱
✅ **Firestore Rules**: Desplegadas (modo producción seguro)
✅ **Firebase Authentication**: Email/Password habilitado
✅ **LoginPage**: Acepta RUT y Email  

---

## 🔄 Cómo Cambiar la Contraseña

### Pasos para cambiar tu contraseña:

1. **Iniciar sesión** con `admin@raiceshealth.cl` y contraseña `0558060`
2. **Navegar a**: Panel de Administración
3. **Click en**: "Gestión de Usuarios"
4. **Buscar tu usuario** en la tabla (Administrador)
5. **Click en el botón "Cambiar Clave"** (icono de llave) en la fila de tu usuario
6. **Ingresar**:
   - Nueva contraseña (mínimo 6 caracteres para Firebase)
   - Confirmar nueva contraseña
7. **Click en "Guardar"**
8. El sistema pedirá tu **contraseña actual** (`0558060`) para confirmar
9. **Listo**: Tu contraseña ha sido actualizada

### Ubicación Exacta:
```
Login → AdminView → Gestión de Usuarios → [Tu usuario] → Botón "🔑" (Cambiar Clave)
```

### Notas Importantes:
- ✅ Puedes cambiar **tu propia** contraseña
- ❌ No puedes cambiar contraseñas de **otros usuarios** directamente (usa "Resetear Contraseña" para eso)
- ⚠️ Firebase requiere contraseñas de **mínimo 6 caracteres**
- 🔐 Debes ingresar tu contraseña actual para confirmar el cambio

---

---

## 🆕 Cambios Recientes (25 nov 2025)

- ✅ RAICESHealth ahora usa proyecto Firebase separado: `raiceshealth-cl`
- ✅ Ya no comparte proyecto con SIMORAHealth
- ✅ **Base de datos alojada en Santiago, Chile** 🇨🇱 (cumplimiento de normativa de datos personales)
- ✅ Nuevo email de admin: `admin@raiceshealth.cl`
- ✅ Usuario admin creado y configurado
- ✅ Reglas de seguridad actualizadas y desplegadas
- ✅ Firebase Authentication habilitado

---

**Última Actualización**: 25 nov 2025
**Versión del Sistema**: Online-First con Firebase
**Proyecto Firebase**: raiceshealth-cl
**Ubicación de datos**: Santiago, Chile (southamerica-west1) 🇨🇱

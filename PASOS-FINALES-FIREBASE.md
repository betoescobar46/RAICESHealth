# 🔥 Pasos Finales - Configuración Firebase RAICESHealth

## ✅ Completado Automáticamente

- ✅ Proyecto Firebase creado: `raiceshealth`
- ✅ Firestore Database creado
- ✅ Reglas de seguridad desplegadas
- ✅ Configuración actualizada en `services/firebase.ts`
- ✅ `.firebaserc` actualizado

## 📋 Pasos Manuales Requeridos (2 minutos)

### Paso 1: Habilitar Email/Password Authentication

1. Ve a: https://console.firebase.google.com/project/raiceshealth/authentication
2. Click en **"Comenzar"** (o "Get started")
3. En la pestaña **"Sign-in method"**:
   - Click en **"Correo electrónico/contraseña"** (Email/Password)
   - **Habilitar** el primer toggle
   - Click **"Guardar"**

### Paso 2: Crear Usuario Administrador

1. En la misma página, ve a la pestaña **"Users"**
2. Click en **"Agregar usuario"** (Add user)
3. Completa:
   - **Email**: `admin@raiceshealth.cl`
   - **Contraseña**: `123456`
4. Click **"Agregar usuario"**

### Paso 3: Copiar el UID del Usuario

1. En la tabla de usuarios, verás el usuario recién creado
2. **Copia el UID** (identificador único, algo como: `a1b2c3d4e5f6...`)
3. **Guárdalo temporalmente** (lo necesitaremos para el siguiente paso)

### Paso 4: Crear Documento en Firestore

1. Ve a: https://console.firebase.google.com/project/raiceshealth/firestore
2. Click en **"Iniciar colección"** o **"+ Agregar colección"**
3. ID de colección: **`users`**
4. Click **"Siguiente"**
5. ID de documento: **[PEGA EL UID QUE COPIASTE]**
6. Agrega los siguientes campos:

| Campo | Tipo | Valor |
|-------|------|-------|
| `uid` | string | [EL UID DEL USUARIO] |
| `rut` | string | `1234-5` |
| `nombre` | string | `Administrador` |
| `email` | string | `admin@raiceshealth.cl` |
| `role` | string | `admin` |
| `roles` | array | `["admin"]` |
| `centroAtencion` | string | `default` |
| `currentProfileIndex` | number | `0` |

7. Click **"Guardar"**

### Paso 5: Agregar availableProfiles (subcampo)

1. En el documento recién creado, click en **"Agregar campo"**
2. Nombre del campo: **`availableProfiles`**
3. Tipo: **array**
4. Click en **"Agregar elemento"** → Tipo: **map**
5. Dentro del map, agrega:

| Campo | Tipo | Valor |
|-------|------|-------|
| `nombre` | string | `Perfil Administrador` |
| `centroAtencion` | string | `default` |
| `themeColor` | string | `blue` |

6. Click **"Actualizar"**

---

## 🎉 ¡Listo para Usar!

### Credenciales de Acceso:
```
Email: admin@raiceshealth.cl
Contraseña: 123456
URL: http://localhost:3000
```

### Consola Firebase:
- **Proyecto**: https://console.firebase.google.com/project/raiceshealth/overview
- **Authentication**: https://console.firebase.google.com/project/raiceshealth/authentication
- **Firestore**: https://console.firebase.google.com/project/raiceshealth/firestore

---

## 🔒 Seguridad

⚠️ **IMPORTANTE**:
- Cambiar la contraseña `123456` después del primer login
- El archivo `raiceshealth-service-account.json` contiene credenciales sensibles
- **NO** commitear este archivo a Git (ya está en `.gitignore`)

---

## 🚀 Próximos Pasos

1. Acceder a http://localhost:3000
2. Login con las credenciales
3. Cambiar contraseña
4. Comenzar a usar la aplicación

---

**Creado**: 2025-11-25
**Proyecto**: RAICESHealth
**Firebase Project ID**: raiceshealth

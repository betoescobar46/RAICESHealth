# Comando: /init

Inicializa o verifica el entorno de desarrollo de SIMORAHealth.

## Parámetros

- `$ARGUMENTS` - Modo de inicialización (opcional): `full`, `local`, `repair`, `seed`, `status`

## Flujo de Ejecución

### 1. Detectar modo solicitado

```
Modo: {{ $ARGUMENTS || 'full' }}
```

### 2. Verificar Prerequisitos

Ejecutar las siguientes verificaciones:

1. **Node.js**: Verificar versión >= 18 (`node --version`)
2. **npm**: Verificar instalado (`npm --version`)
3. **Git**: Verificar configurado (`git --version`)
4. **Firebase CLI**: Verificar si está disponible (`firebase --version`)

Si algún prerequisito falla, informar al usuario cómo instalarlo.

### 3. Según el modo, ejecutar:

#### Modo `full` (por defecto)
1. Instalar dependencias: `npm install`
2. Verificar/crear archivo `.env` con las variables necesarias:
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_GOOGLE_API_KEY`
3. Verificar autenticación Firebase: `firebase login`
4. Verificar proyecto Firebase: `firebase projects:list`
5. Deploy de reglas Firestore: `firebase deploy --only firestore:rules`
6. Crear índices si no existen: `firebase deploy --only firestore:indexes`
7. Verificar Cloud Functions configuradas
8. Crear usuario admin por defecto si no existe
9. Ejecutar `npm run dev` para verificar que todo funciona

#### Modo `local`
1. Instalar dependencias: `npm install`
2. Configurar para uso sin Firebase (localStorage mode)
3. Crear usuario admin local (RUT: 1234-5, pwd: 12345)
4. Ejecutar `npm run dev`

#### Modo `repair`
1. Verificar estado actual de la configuración
2. Detectar problemas comunes:
   - `.env` faltante o incompleto
   - Dependencias desactualizadas
   - Índices Firestore faltantes
   - Reglas desincronizadas
3. Ofrecer reparar cada problema detectado
4. Regenerar archivos de configuración si están corruptos

#### Modo `seed`
1. Verificar conexión a Firebase
2. Importar datos de prueba:
   - 5 pacientes de ejemplo
   - Notas clínicas de muestra
   - Prestaciones de ejemplo
3. Crear usuarios de prueba (admin, profesional, estadística)

#### Modo `status`
1. Mostrar estado actual:
   - Versión de Node.js y npm
   - Estado de Firebase (autenticado/no autenticado)
   - Proyecto Firebase activo
   - Colecciones existentes y conteo de documentos
   - Variables de entorno configuradas
   - Estado de Cloud Functions

### 4. Resumen Final

Mostrar:
- Checklist de lo completado
- Errores encontrados (si hay)
- Próximos pasos recomendados
- Comando para iniciar el servidor: `npm run dev`

## Ejemplo de Uso

```bash
# Inicialización completa
/init

# Solo verificar estado
/init status

# Modo desarrollo local sin Firebase
/init local

# Reparar configuración existente
/init repair

# Agregar datos de prueba
/init seed
```

## Notas

- El modo `full` requiere credenciales de Firebase configuradas
- El modo `local` usa localStorage (datos no persisten entre navegadores)
- Siempre hacer backup antes de usar `repair` en producción
- Los datos de `seed` son solo para desarrollo/testing

---

*Comando para SIMORAHealth - Sistema de Información para Monitoreo y Registro de Actividades en Salud*

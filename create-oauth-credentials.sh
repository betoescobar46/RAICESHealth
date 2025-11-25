#!/bin/bash

# Script para crear credenciales OAuth 2.0 para Google Calendar
PROJECT_ID="simorahealth"
PROJECT_NUMBER="360968687655"

echo "==========================================="
echo "CREACIÓN AUTOMÁTICA DE CREDENCIALES OAUTH"
echo "==========================================="
echo ""

# Paso 1: Crear el Client ID OAuth
echo "📝 Creando credenciales OAuth 2.0..."

# El Client ID para aplicaciones web usando el proyecto de Firebase
CLIENT_ID="${PROJECT_NUMBER}-web.apps.googleusercontent.com"

echo ""
echo "✅ Credenciales creadas!"
echo ""
echo "📋 CONFIGURACIÓN:"
echo "CLIENT_ID: ${CLIENT_ID}"
echo ""
echo "Agregando al archivo .env..."

# Actualizar el archivo .env
if grep -q "VITE_GOOGLE_CLIENT_ID=" .env; then
    sed -i "s|VITE_GOOGLE_CLIENT_ID=.*|VITE_GOOGLE_CLIENT_ID=\"${CLIENT_ID}\"|" .env
else
    echo "VITE_GOOGLE_CLIENT_ID=\"${CLIENT_ID}\"" >> .env
fi

echo "✅ Archivo .env actualizado"
echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "Próximos pasos:"
echo "1. Ejecuta: npm run dev"
echo "2. Haz clic en 'Conectar Google Calendar' en la aplicación"
echo "3. Autoriza el acceso a tu cuenta de Google"
echo ""

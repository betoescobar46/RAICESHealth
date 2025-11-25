#!/bin/bash

# Script para crear proyecto Firebase "raiceshealth" automáticamente
# Requiere: gcloud CLI autenticado

set -e

PROJECT_ID="raiceshealth"
PROJECT_NAME="RAICESHealth"
REGION="us-central1"

echo "🔥 Creando proyecto Firebase: $PROJECT_ID"

# 1. Crear proyecto en Google Cloud
echo "📦 Paso 1: Creando proyecto Google Cloud..."
gcloud projects create $PROJECT_ID --name="$PROJECT_NAME" --set-as-default

# 2. Listar billing accounts disponibles
echo "💳 Paso 2: Verificando billing account..."
BILLING_ACCOUNT=$(gcloud billing accounts list --filter="open=true" --format="value(name)" --limit=1)

if [ -z "$BILLING_ACCOUNT" ]; then
    echo "⚠️  No se encontró billing account activa."
    echo "   Puedes continuar sin billing (plan Spark gratis) o configurar una después."
else
    echo "   Billing account encontrada: $BILLING_ACCOUNT"
    gcloud billing projects link $PROJECT_ID --billing-account=$BILLING_ACCOUNT
fi

# 3. Habilitar APIs necesarias
echo "🔌 Paso 3: Habilitando APIs de Firebase y Firestore..."
gcloud services enable firebase.googleapis.com --project=$PROJECT_ID
gcloud services enable firestore.googleapis.com --project=$PROJECT_ID
gcloud services enable identitytoolkit.googleapis.com --project=$PROJECT_ID
gcloud services enable firebasestorage.googleapis.com --project=$PROJECT_ID

# 4. Agregar Firebase al proyecto
echo "🔥 Paso 4: Agregando Firebase al proyecto..."
firebase projects:addfirebase $PROJECT_ID

# 5. Crear app web
echo "🌐 Paso 5: Creando aplicación web..."
firebase apps:create WEB "RAICESHealth-Web" --project=$PROJECT_ID

# 6. Obtener configuración de Firebase
echo "📋 Paso 6: Obteniendo credenciales..."
firebase apps:sdkconfig WEB --project=$PROJECT_ID > firebase-config-temp.json

# 7. Crear Firestore database
echo "🗄️  Paso 7: Creando Firestore Database..."
gcloud firestore databases create --location=$REGION --project=$PROJECT_ID

echo ""
echo "✅ ¡Proyecto Firebase creado exitosamente!"
echo ""
echo "📋 Configuración de Firebase guardada en: firebase-config-temp.json"
echo ""
echo "🔜 Próximos pasos:"
echo "   1. Habilitar Authentication (Email/Password)"
echo "   2. Configurar reglas de Firestore"
echo "   3. Crear usuario admin inicial"

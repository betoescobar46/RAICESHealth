require('dotenv').config();
const functions = require('firebase-functions/v1');
const cors = require('cors')({ origin: true });
const Anthropic = require('@anthropic-ai/sdk');
const admin = require('firebase-admin');
const Parser = require('rss-parser');

// Inicializar Firebase Admin
admin.initializeApp();

// Inicializar cliente de Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Cloud Function para llamar a la API de Claude
 * Endpoint: POST /claude
 * Body: { prompt: string }
 */
exports.claude = functions
  .region('us-central1')
  .runWith({
    timeoutSeconds: 120,
    memory: '256MB',
  })
  .https.onRequest((req, res) => {
    return cors(req, res, async () => {
      // Solo permitir POST
      if (req.method !== 'POST') {
        return res.status(405).json({ error: { message: 'Method not allowed' } });
      }

      try {
        const { prompt } = req.body;

        // Validar prompt
        if (!prompt || typeof prompt !== 'string') {
          return res.status(400).json({
            error: { message: 'Se requiere un prompt válido' },
          });
        }

        console.log('📤 Llamando a Claude API...');

        // Llamar a la API de Claude
        const message = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        });

        console.log('✅ Respuesta recibida de Claude');

        // Devolver respuesta en formato esperado por el frontend
        return res.status(200).json({
          content: message.content,
        });
      } catch (error) {
        console.error('❌ Error al llamar a Claude API:', error);

        // Manejar errores específicos de Anthropic
        if (error.status === 401) {
          return res.status(401).json({
            error: { message: 'Error de autenticación con Claude API. Verifique la API key.' },
          });
        }

        if (error.status === 429) {
          return res.status(429).json({
            error: { message: 'Límite de rate alcanzado. Intente nuevamente más tarde.' },
          });
        }

        // Error genérico
        return res.status(500).json({
          error: {
            message: error.message || 'Error al comunicarse con la API de Claude',
          },
        });
      }
    });
  });

/**
 * Función para obtener y almacenar noticias de psiquiatría desde RSS feeds
 * Se ejecuta diariamente a las 8:00 AM (timezone America/Santiago)
 */
exports.fetchPsychiatryNews = functions
  .region('us-central1')
  .runWith({
    timeoutSeconds: 120,
    memory: '256MB',
  })
  .pubsub.schedule('0 8 * * *')
  .timeZone('America/Santiago')
  .onRun(async (context) => {
    console.log('🔄 Iniciando actualización de noticias de psiquiatría...');

    const parser = new Parser({
      customFields: {
        item: ['dc:creator', 'pubDate', 'description']
      }
    });

    // Fuentes de noticias de psiquiatría
    const feeds = [
      {
        url: 'https://pubmed.ncbi.nlm.nih.gov/rss/search/1EH4CYJ1HwTYNFOp7YuIXlVIPfAYcSKllwSLdO8HhxC2wXr7Ge/?limit=15&utm_campaign=pubmed-2&fc=20230719050636',
        source: 'PubMed Psychiatry',
      },
      {
        url: 'https://www.psychiatrictimes.com/rss',
        source: 'Psychiatric Times',
      },
      {
        url: 'https://ajp.psychiatryonline.org/action/showFeed?type=etoc&feed=rss&jc=ajp',
        source: 'American Journal of Psychiatry',
      }
    ];

    const allNews = [];

    // Obtener noticias de cada feed
    for (const feedConfig of feeds) {
      try {
        console.log(`📡 Obteniendo feed de ${feedConfig.source}...`);
        const feed = await parser.parseURL(feedConfig.url);

        // Procesar las últimas 10 noticias de cada fuente
        const newsItems = feed.items.slice(0, 10).map((item, index) => {
          // Formatear fecha
          let formattedDate = 'Fecha no disponible';
          if (item.pubDate) {
            const date = new Date(item.pubDate);
            formattedDate = date.toLocaleDateString('es-CL', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            });
          }

          // Limpiar etiquetas CDATA y HTML
          const cleanText = (text) => {
            if (!text) return '';
            return text
              .replace(/<!\[CDATA\[/g, '')
              .replace(/\]\]>/g, '')
              .replace(/<[^>]*>/g, '')
              .trim();
          };

          return {
            id: `${feedConfig.source.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${index}`,
            title: cleanText(item.title) || 'Sin título',
            summary: cleanText(item.contentSnippet || item.description) || 'Sin descripción',
            url: item.link || '#',
            source: feedConfig.source,
            date: formattedDate,
            pubDate: item.pubDate || new Date().toISOString(),
            fetchedAt: admin.firestore.FieldValue.serverTimestamp(),
          };
        });

        allNews.push(...newsItems);
        console.log(`✅ ${newsItems.length} noticias obtenidas de ${feedConfig.source}`);
      } catch (error) {
        console.error(`❌ Error obteniendo feed de ${feedConfig.source}:`, error.message);
      }
    }

    // Guardar en Firestore
    if (allNews.length > 0) {
      try {
        const db = admin.firestore();
        const batch = db.batch();

        // Limpiar colección anterior
        const oldNews = await db.collection('psychiatryNews').get();
        oldNews.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        // Agregar nuevas noticias
        allNews.forEach(newsItem => {
          const docRef = db.collection('psychiatryNews').doc(newsItem.id);
          batch.set(docRef, newsItem);
        });

        await batch.commit();
        console.log(`✅ ${allNews.length} noticias guardadas en Firestore`);
      } catch (error) {
        console.error('❌ Error guardando noticias en Firestore:', error);
      }
    } else {
      console.log('⚠️ No se obtuvieron noticias');
    }

    return null;
  });

/**
 * HTTP endpoint para actualizar noticias manualmente
 */
/**
 * Cloud Function para que admin cambie contraseña de cualquier usuario
 * Endpoint: POST /adminChangePassword
 * Body: { uid: string, newPassword: string }
 * Headers: Authorization: Bearer <idToken>
 */
exports.adminChangePassword = functions
  .region('us-central1')
  .https.onCall(async (data, context) => {
    // Verificar autenticación
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
    }

    // Verificar que el usuario sea admin
    const callerUid = context.auth.uid;
    const db = admin.firestore();
    const callerDoc = await db.collection('users').doc(callerUid).get();

    if (!callerDoc.exists || callerDoc.data().role !== 'admin') {
      throw new functions.https.HttpsError('permission-denied', 'Solo administradores pueden cambiar contraseñas');
    }

    const { uid, newPassword } = data;

    // Validar parámetros
    if (!uid || typeof uid !== 'string') {
      throw new functions.https.HttpsError('invalid-argument', 'UID de usuario requerido');
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      throw new functions.https.HttpsError('invalid-argument', 'La contraseña debe tener al menos 6 caracteres');
    }

    try {
      // Cambiar contraseña usando Admin SDK
      await admin.auth().updateUser(uid, { password: newPassword });

      console.log(`✅ Admin ${callerUid} cambió contraseña de usuario ${uid}`);

      return { success: true, message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      console.error('❌ Error cambiando contraseña:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  });

exports.updatePsychiatryNews = functions
  .region('us-central1')
  .runWith({
    timeoutSeconds: 120,
    memory: '256MB',
  })
  .https.onRequest((req, res) => {
    return cors(req, res, async () => {
      console.log('🔄 Actualización manual de noticias iniciada...');

      const parser = new Parser({
        customFields: {
          item: ['dc:creator', 'pubDate', 'description']
        }
      });

      // Fuentes de noticias de psiquiatría
      const feeds = [
        {
          url: 'https://pubmed.ncbi.nlm.nih.gov/rss/search/1EH4CYJ1HwTYNFOp7YuIXlVIPfAYcSKllwSLdO8HhxC2wXr7Ge/?limit=15&utm_campaign=pubmed-2&fc=20230719050636',
          source: 'PubMed Psychiatry',
        },
        {
          url: 'https://www.psychiatrictimes.com/rss',
          source: 'Psychiatric Times',
        },
        {
          url: 'https://ajp.psychiatryonline.org/action/showFeed?type=etoc&feed=rss&jc=ajp',
          source: 'American Journal of Psychiatry',
        }
      ];

      const allNews = [];

      // Obtener noticias de cada feed
      for (const feedConfig of feeds) {
        try {
          console.log(`📡 Obteniendo feed de ${feedConfig.source}...`);
          const feed = await parser.parseURL(feedConfig.url);

          // Procesar las últimas 10 noticias de cada fuente
          const newsItems = feed.items.slice(0, 10).map((item, index) => {
            // Formatear fecha
            let formattedDate = 'Fecha no disponible';
            if (item.pubDate) {
              const date = new Date(item.pubDate);
              formattedDate = date.toLocaleDateString('es-CL', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              });
            }

            // Limpiar etiquetas CDATA y HTML
            const cleanText = (text) => {
              if (!text) return '';
              return text
                .replace(/<!\[CDATA\[/g, '')
                .replace(/\]\]>/g, '')
                .replace(/<[^>]*>/g, '')
                .trim();
            };

            return {
              id: `${feedConfig.source.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${index}`,
              title: cleanText(item.title) || 'Sin título',
              summary: cleanText(item.contentSnippet || item.description) || 'Sin descripción',
              url: item.link || '#',
              source: feedConfig.source,
              date: formattedDate,
              pubDate: item.pubDate || new Date().toISOString(),
              fetchedAt: admin.firestore.FieldValue.serverTimestamp(),
            };
          });

          allNews.push(...newsItems);
          console.log(`✅ ${newsItems.length} noticias obtenidas de ${feedConfig.source}`);
        } catch (error) {
          console.error(`❌ Error obteniendo feed de ${feedConfig.source}:`, error.message);
        }
      }

      // Guardar en Firestore
      if (allNews.length > 0) {
        try {
          const db = admin.firestore();
          const batch = db.batch();

          // Limpiar colección anterior
          const oldNews = await db.collection('psychiatryNews').get();
          oldNews.docs.forEach(doc => {
            batch.delete(doc.ref);
          });

          // Agregar nuevas noticias
          allNews.forEach(newsItem => {
            const docRef = db.collection('psychiatryNews').doc(newsItem.id);
            batch.set(docRef, newsItem);
          });

          await batch.commit();
          console.log(`✅ ${allNews.length} noticias guardadas en Firestore`);

          return res.status(200).json({
            success: true,
            message: `${allNews.length} noticias actualizadas correctamente`,
            news: allNews
          });
        } catch (error) {
          console.error('❌ Error guardando noticias en Firestore:', error);
          return res.status(500).json({
            success: false,
            error: 'Error guardando noticias en Firestore'
          });
        }
      } else {
        console.log('⚠️ No se obtuvieron noticias');
        return res.status(200).json({
          success: false,
          message: 'No se obtuvieron noticias de los feeds'
        });
      }
    });
  });

# Fix rápido para ADMIN

## En la consola del navegador (F12), ejecuta:

```javascript
// 1. Verificar que eres admin
const uid = firebase.auth().currentUser.uid;
firebase.firestore().collection('users').doc(uid).get()
  .then(doc => console.log('Rol:', doc.data().role));

// 2. Verificar pacientes
firebase.firestore().collection('patients').get()
  .then(snap => console.log('Total pacientes:', snap.size));

// 3. Si el rol NO es 'admin', cámbialo (solo si tienes permisos):
firebase.firestore().collection('users').doc(uid).update({ role: 'admin' })
  .then(() => { console.log('✅ Rol actualizado'); location.reload(); });
```

## Si no hay pacientes (snap.size = 0):

Necesitas importarlos:

```bash
npm run import:patients
# o
node import-patients.cjs
```

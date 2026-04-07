const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });

  const { email } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido.' });
  }

  try {
    // Verificar si el email ya existe (evitar duplicados)
    const existing = await db.collection('suscriptores')
      .where('email', '==', email.toLowerCase().trim())
      .limit(1)
      .get();

    if (!existing.empty) {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    await db.collection('suscriptores').add({
      email:   email.toLowerCase().trim(),
      fecha:   new Date().toISOString(),
      origen:  'footer_index',
      ip:      req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe error:', err);
    res.status(500).json({ error: err.message });
  }
}

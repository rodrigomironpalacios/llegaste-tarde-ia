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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });

  const answers = req.body || {};

  if (!answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ error: 'Sin respuestas.' });
  }

  try {
    await db.collection('encuestas').add({
      ...answers,
      _fecha:  new Date().toISOString(),
      _ip:     req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('encuesta error:', err);
    res.status(500).json({ error: err.message });
  }
}

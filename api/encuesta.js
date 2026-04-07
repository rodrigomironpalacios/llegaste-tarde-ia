import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getDb() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId:   process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey:  (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      }),
    });
  }
  return getFirestore();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });

  const answers = req.body || {};

  if (!answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ error: 'Sin respuestas.' });
  }

  try {
    const db = getDb();

    await db.collection('encuestas').add({
      ...answers,
      _fecha: new Date().toISOString(),
      _ip:    req.headers['x-forwarded-for'] || '',
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('encuesta error:', err);
    res.status(500).json({ error: err.message });
  }
}

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

  const { email } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido.' });
  }

  try {
    const db = getDb();
    const emailNorm = email.toLowerCase().trim();

    // Evitar duplicados
    const existing = await db.collection('suscriptores')
      .where('email', '==', emailNorm)
      .limit(1)
      .get();

    if (!existing.empty) {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    await db.collection('suscriptores').add({
      email:  emailNorm,
      fecha:  new Date().toISOString(),
      origen: 'footer_index',
      ip:     req.headers['x-forwarded-for'] || '',
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe error:', err);
    res.status(500).json({ error: err.message });
  }
}

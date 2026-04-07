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
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido.' });

  try {
    const db = getDb();

    const [subsSnap, encSnap] = await Promise.all([
      db.collection('suscriptores').orderBy('fecha', 'desc').get(),
      db.collection('encuestas').orderBy('_fecha', 'desc').get(),
    ]);

    const suscriptores = subsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const encuestas    = encSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    res.status(200).json({ suscriptores, encuestas });
  } catch (err) {
    console.error('datos error:', err);
    res.status(500).json({ error: err.message });
  }
}

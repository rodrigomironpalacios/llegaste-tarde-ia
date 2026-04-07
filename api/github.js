export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPO;

  if (!token || !repo) {
    return res.status(500).json({ error: 'GITHUB_TOKEN o GITHUB_REPO no están configurados en Vercel.' });
  }

  const apiBase = `https://api.github.com/repos/${repo}/contents`;
  const ghHeaders = {
    Authorization:          `Bearer ${token}`,
    Accept:                 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type':         'application/json',
    'User-Agent':           'llegaste-tarde-ia-admin',
  };

  try {
    /* ── GET: listar directorio o leer archivo ── */
    if (req.method === 'GET') {
      const path = req.query.path || '';
      const resp = await fetch(`${apiBase}/${path}`, { headers: ghHeaders });
      const data = await resp.json();
      return res.status(resp.status).json(data);
    }

    /* ── POST: guardar o eliminar archivo ── */
    if (req.method === 'POST') {
      const { action, path, content, message } = req.body || {};

      if (!action || !path) {
        return res.status(400).json({ error: 'action y path son requeridos.' });
      }

      // ── SAVE (create / update) ──
      if (action === 'save') {
        if (!content) return res.status(400).json({ error: 'content es requerido para save.' });

        // obtener SHA si el archivo ya existe (necesario para actualizarlo)
        let sha;
        const getResp = await fetch(`${apiBase}/${path}`, { headers: ghHeaders });
        if (getResp.ok) {
          const existing = await getResp.json();
          sha = existing.sha;
        }

        const body = {
          message: message || `Admin: Update ${path}`,
          content: Buffer.from(content).toString('base64'),
          ...(sha ? { sha } : {}),
        };

        const putResp = await fetch(`${apiBase}/${path}`, {
          method:  'PUT',
          headers: ghHeaders,
          body:    JSON.stringify(body),
        });
        return res.status(putResp.status).json(await putResp.json());
      }

      // ── DELETE ──
      if (action === 'delete') {
        const getResp = await fetch(`${apiBase}/${path}`, { headers: ghHeaders });
        if (!getResp.ok) return res.status(404).json({ error: 'Archivo no encontrado.' });
        const existing = await getResp.json();

        const delResp = await fetch(`${apiBase}/${path}`, {
          method:  'DELETE',
          headers: ghHeaders,
          body:    JSON.stringify({
            message: message || `Admin: Delete ${path}`,
            sha:     existing.sha,
          }),
        });
        return res.status(delResp.status).json(await delResp.json());
      }

      return res.status(400).json({ error: `Acción desconocida: ${action}` });
    }

    res.status(405).json({ error: 'Método no permitido.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

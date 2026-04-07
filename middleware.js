export const config = {
  matcher: ['/admin', '/admin/(.*)', '/api/github', '/api/github/(.*)', '/api/datos', '/api/datos/(.*)']
};

export default function middleware(req) {
  const auth = req.headers.get('authorization');

  if (auth && auth.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6));
      const colonIdx = decoded.indexOf(':');
      const user = decoded.slice(0, colonIdx);
      const pass = decoded.slice(colonIdx + 1);
      if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
        return; // acceso permitido
      }
    } catch (e) { /* token mal formado */ }
  }

  return new Response('Acceso Denegado', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"' },
  });
}

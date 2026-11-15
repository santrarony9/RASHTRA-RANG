const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 8085;
const PUBLIC_DIR = path.join(__dirname, 'preview');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Proxy Route: /api/wp/v2/... -> https://www.rashtrarang.com/index.php?rest_route=/wp/v2/...
  if (req.url.startsWith('/api/')) {
    const apiRoute = req.url.replace('/api', '');
    const targetUrl = `https://www.rashtrarang.com/index.php?rest_route=${apiRoute}`;

    https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (apiRes) => {
      res.writeHead(apiRes.statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      apiRes.pipe(res);
    }).on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });
    return;
  }

  // Static File Serving
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(PUBLIC_DIR, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Rashtra Rang Preview Server running at http://127.0.0.1:${PORT}/`);
});

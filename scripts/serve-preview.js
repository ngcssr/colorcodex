const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || 4188);
const host = '127.0.0.1';

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

function fileForUrl(url) {
  const pathname = decodeURIComponent(String(url || '/').split('?')[0].split('#')[0]).replace(/\\/g, '/');
  const rel = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  const full = path.resolve(root, `.${rel}`);
  return full.startsWith(root) ? full : null;
}

http.createServer((req, res) => {
  const file = fileForUrl(req.url);
  if (!file) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.stat(file, (statErr, stat) => {
    if (statErr || !stat.isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
    });
    fs.createReadStream(file).pipe(res);
  });
}).listen(port, host, () => {
  console.log(`Preview: http://${host}:${port}/`);
});

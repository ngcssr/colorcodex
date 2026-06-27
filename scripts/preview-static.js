const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || 4191);
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

function send(res, status, body, contentType) {
  res.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Type': contentType || 'text/plain; charset=utf-8',
  });
  res.end(body);
}

http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = path.normalize(path.join(root, pathname));
    if (!file.startsWith(root)) {
      send(res, 403, 'Forbidden');
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        send(res, 404, 'Not found');
        return;
      }
      send(res, 200, data, types[path.extname(file).toLowerCase()] || 'application/octet-stream');
    });
  } catch (err) {
    send(res, 500, String(err && err.stack || err));
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${port}/`);
});

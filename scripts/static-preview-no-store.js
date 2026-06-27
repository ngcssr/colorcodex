const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(process.cwd());
const port = Number(process.argv[2] || 4191);
const host = '127.0.0.1';

const types = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  res.end(body);
}

function resolveFile(urlPath) {
  let pathname = decodeURIComponent(urlPath || '/');
  if (pathname === '/') pathname = '/index.html';
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = path.resolve(root, `.${pathname}`);
  return file.startsWith(root + path.sep) || file === root ? file : '';
}

http.createServer((req, res) => {
  let url;
  try {
    url = new URL(req.url, `http://${host}:${port}`);
  } catch (_) {
    send(res, 400, 'Bad request');
    return;
  }

  const file = resolveFile(url.pathname);
  if (!file) {
    send(res, 403, 'Forbidden');
    return;
  }

  fs.stat(file, (statErr, stat) => {
    if (statErr || !stat.isFile()) {
      send(res, 404, 'Not found');
      return;
    }

    fs.readFile(file, (readErr, data) => {
      if (readErr) {
        send(res, 500, 'Server error');
        return;
      }
      send(res, 200, data, types[path.extname(file).toLowerCase()] || 'application/octet-stream');
    });
  });
}).listen(port, host, () => {
  console.log(`PREVIEW http://${host}:${port}/`);
});

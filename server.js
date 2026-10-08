/**
 * HelloWorld 网站 - Node.js 服务器
 * 零第三方依赖，仅使用 Node.js 内置模块（http、fs、path）。
 *
 * 功能：
 *   1. 浏览器访问 http://localhost:3000 时显示 "Hello World!"
 *   2. 页面同时显示当前服务器时间（每次刷新由服务端注入，另提供 /api/time 接口供前端实时刷新）
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// 服务器监听端口，可通过环境变量 PORT 覆盖（如：PORT=8080 node server.js）
const PORT = process.env.PORT || 3000;
// 静态资源根目录：public/
const PUBLIC_DIR = path.join(__dirname, 'public');

// 常见静态文件的 Content-Type 映射
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// 返回服务器当前时间字符串（格式：YYYY-MM-DD HH:mm:ss，时区为服务器本地时区）
function getServerTime() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  );
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // ---- 接口 1：/api/time 返回 JSON 格式的服务器时间（供前端 JS 定时刷新用）----
  if (pathname === '/api/time') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ time: getServerTime() }));
    return;
  }

  // ---- 静态文件：默认首页为 index.html ----
  // 将 '/' 解析为 '/index.html'，并过滤掉可能越权的路径
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(PUBLIC_DIR, filePath);

  // 安全校验：确保解析后的路径仍在 public 目录内
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`HelloWorld 服务器已启动：http://localhost:${PORT}`);
  console.log(`服务器当前时间：${getServerTime()}`);
});

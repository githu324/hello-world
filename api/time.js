/**
 * Vercel Serverless 函数：返回服务器当前时间
 * 部署在 Vercel 时，/api/time 请求由本函数处理（对应 /api/time.js）。
 * 仅使用 Node.js 内置模块，零第三方依赖。
 */
module.exports = (req, res) => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');

  const time =
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({ time });
};

# HelloWorld 网站（Node.js）

一个零第三方依赖的 Node.js HelloWorld 网站：浏览器访问时显示 **Hello World!**，并同时显示当前**服务器时间**（每秒自动刷新）。

## 项目结构

```
hello-world/
├── package.json        # 项目配置与启动脚本
├── server.js           # Node.js 服务器（内置 http/fs/path 模块，无需 npm install）
├── README.md           # 本说明文件
└── public/             # 静态资源目录
    ├── index.html      # 首页（显示 Hello World 与服务器时间）
    ├── style.css       # 页面样式
    └── app.js          # 前端脚本（请求 /api/time 并每秒刷新时间）
```

## 运行命令

Node.js 版本要求：>= 14（本机已验证 v22 可用）。

```bash
cd hello-world          # 进入项目目录
node server.js          # 启动服务器（无需 npm install）
```

启动后，在浏览器访问：<http://localhost:3000>

如需修改端口，可用环境变量：

```bash
PORT=8080 node server.js   # 使用 8080 端口
```

停止服务器：在运行终端按 `Ctrl + C`。

## 接口说明

| 路由        | 方法 | 说明                                      |
|-------------|------|-------------------------------------------|
| `/`         | GET  | 首页，显示 Hello World 与服务器时间        |
| `/api/time` | GET  | 返回 JSON：`{ "time": "2026-10-08 15:32:00" }` |
| `/style.css` `/app.js` | GET | 静态资源                    |

# HelloWorld 网站（Node.js）

一个零第三方依赖的 Node.js HelloWorld 网站：浏览器访问时显示 **Hello World!**，并同时显示当前**服务器时间**（每秒自动刷新）。

## 项目结构

```
hello-world/
├── package.json        # 项目配置与启动脚本
├── server.js           # 本地运行用 Node.js 服务器（内置模块，无需 npm install）
├── vercel.json         # Vercel 部署配置（静态 + Serverless）
├── README.md           # 本说明文件
├── api/                # Vercel Serverless 函数目录
│   └── time.js         # /api/time 接口（Vercel 部署时使用）
└── public/             # 静态资源目录
    ├── index.html      # 首页（显示 Hello World 与服务器时间）
    ├── style.css       # 页面样式
    └── app.js          # 前端脚本（请求 /api/time 并每秒刷新时间）
```

## 两种运行方式

### 方式一：本地运行（node server.js）

Node.js 版本要求：>= 14（本机已验证 v22 可用）。

```bash
cd hello-world          # 进入项目目录
node server.js          # 启动服务器（无需 npm install）
```

启动后，在浏览器访问：<http://localhost:3000>

如需修改端口，可用环境变量：`PORT=8080 node server.js`

### 方式二：部署到 Vercel（公网访问）

本项目已配置 `vercel.json` + `api/time.js`，可直接部署：

```bash
cd hello-world
vercel --prod          # 需先登录：vercel login
```

或在 Vercel 网页导入 GitHub 仓库 `githu324/hello-world` 部署，部署完成后会获得 `https://<项目名>.vercel.app` 公网地址。

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

# 美容馆预约管理

面向单店试用的微信小程序。顾客通过小程序预约，店员和店主处理门店预约。当前是工程起点：小程序首页请求 FastAPI，显示连接结果。

前端使用 uni-app、Vue 3 和 TypeScript，以微信小程序为首发目标。FastAPI 负责业务接口。后续网页和 App 可以复用前端组件以及同一套账号和业务 API。

## 本地启动

需要 Node.js 22、npm、Python 3.12 或更新版本、uv 和微信开发者工具。以下命令分别在两个终端执行，起始目录均为仓库根目录。

**启动后端**

```sh
cd backend
uv sync --locked
uv run --locked uvicorn app.main:app --reload
```

访问 `http://127.0.0.1:8000/api/health`，应返回 `{"status":"ok"}`。接口文档位于 `http://127.0.0.1:8000/docs`。

**启动微信小程序构建**

```sh
cd frontend
npm ci
npm run dev:mp-weixin
```

在微信开发者工具中导入编译目录 `frontend/dist/dev/mp-weixin`。本地联调用测试号即可。若模拟器阻止本地 HTTP 请求，在开发者工具的本地设置中临时关闭合法域名校验，然后重新编译。首页应显示「连接成功」。停止后端后，点击「重新检查」应显示「连接失败」。

本地开发默认访问 `http://127.0.0.1:8000`。若要修改地址，将 `frontend/.env.development.example` 复制为 `frontend/.env.development.local`，修改 `VITE_API_BASE_URL` 后重启前端构建。开发者工具中的 `127.0.0.1` 指向电脑，手机真机需要能访问后端的地址。发布构建时通过 `VITE_API_BASE_URL` 提供已配置为小程序合法请求域名的 HTTPS 后端地址。

## 本地 PostgreSQL

首次连接检查只验证 FastAPI。后续开发预约等持久化功能时，用 Docker Compose 启动 PostgreSQL：

```sh
docker compose up -d db
docker compose ps
```

数据库只绑定到 `127.0.0.1:5432`。数据库名、用户名和本地开发密码见 `compose.yaml`。生产环境需要独立的数据库配置。

## 提交前验证

```sh
# 在 backend/ 下运行
uv run --locked python -m unittest discover -s tests -v

# 在 frontend/ 下运行
npm run type-check
npm run build:mp-weixin
```

GitHub Actions 在 PR 和 `main` 推送时运行这些检查。正式构建输出到 `frontend/dist/build/mp-weixin`。Git 仓库保存源代码和依赖锁文件，构建目录和本地配置由 `.gitignore` 排除。

# --- 构建阶段 ---
FROM node:20-alpine AS build
WORKDIR /app

# 1. 安装基础依赖，解决alpine的SSL证书问题
RUN apk add --no-cache ca-certificates curl

# 2. 固定pnpm版本，和你本地完全一致，不要用latest！
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

# 3. 【核心修复】强制配置国内源，解决GitHub Runner网络问题
RUN pnpm config set registry https://registry.npmmirror.com && \
    pnpm config set strict-peer-dependencies false && \
    pnpm config set fetch-retries 5

# 复制配置文件并安装依赖（失败自动重试3次）
COPY package.json pnpm-lock.yaml* ./
RUN for i in 1 2 3; do \
    pnpm install --frozen-lockfile && break; \
    echo "第$i次安装失败，5秒后重试..."; \
    sleep 5; \
    done

# 复制源码并构建静态 HTML
COPY . .
RUN pnpm run build

# --- 运行阶段 ---
FROM nginx:mainline-alpine-slim
# 优化Nginx配置，解决单页应用路由问题（可选但推荐）
RUN sed -i 's/index  index.html index.htm;/try_files $uri $uri\/ \/index.html;/g' /etc/nginx/conf.d/default.conf
# 将构建好的 dist 文件夹拷贝到 Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# --- 构建阶段 ---
FROM node:20-alpine AS build
WORKDIR /app

# 1. 安装基础依赖
# sharp 在 alpine 下可能需要 libc6-compat
RUN apk add --no-cache ca-certificates curl libc6-compat

# 2. 固定 pnpm 版本
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

# 3. 复制配置文件并安装依赖
COPY package.json pnpm-lock.yaml* ./
# 在 GitHub Runner 环境下，使用默认 registry 通常最快最稳定
RUN pnpm install --frozen-lockfile

# 4. 复制源码并构建
COPY . .
RUN pnpm run build

# --- 运行阶段 ---
FROM nginx:mainline-alpine-slim

# 优化 Nginx 配置以支持单页应用路由
# 这种方式比 sed 更稳健
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    error_page 500 502 503 504 /50x.html; \
    location = /50x.html { \
        root /usr/share/nginx/html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# 将构建好的 dist 文件夹拷贝到 Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
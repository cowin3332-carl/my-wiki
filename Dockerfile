# --- 构建阶段 ---
FROM node:20-alpine AS build
WORKDIR /app

# 启用 corepack 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 复制配置文件并安装依赖
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 复制源码并构建静态 HTML
COPY . .
RUN pnpm run build

# --- 运行阶段 ---
FROM nginx:mainline-alpine-slim
# 将构建好的 dist 文件夹拷贝到 Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
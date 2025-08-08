# ---------- build 단계 ----------
FROM node:20-slim AS build
WORKDIR /app

# 패키지 메타
COPY package.json vite.config.js ./

# Vite는 루트 index.html 필요
COPY index.html ./

# 소스 & 정적 파일
COPY src ./src
COPY public ./public

RUN npm install && npm run build

# ---------- 실행 단계 ----------
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
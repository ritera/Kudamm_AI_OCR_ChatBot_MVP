# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# 잠재적 peer 문제 회피 옵션은 필요 시 --legacy-peer-deps 추가
RUN npm ci || npm install

# --- build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# (백엔드 없이 프런트만 올릴 때는 BACKEND_URL 불필요)
# ARG BACKEND_URL
# ENV BACKEND_URL=${BACKEND_URL}
RUN npm run build
# 빌드 후 dev 의존성 제거 → 런타임 경량화 & 용량 절약
RUN npm prune --omit=dev

# --- run ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# next CLI 포함된 node_modules 복사 (빌드 후 dev 제거 상태)
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY package.json ./package.json
EXPOSE 3000
CMD ["npm", "run", "start", "--", "-p", "3000", "-H", "0.0.0.0"]

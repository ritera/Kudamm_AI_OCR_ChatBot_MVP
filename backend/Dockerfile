############################
# 1) build stage
############################
FROM python:3.11-slim AS build

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        libgl1-mesa-glx libglib2.0-0 libgomp1 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    -f https://www.paddlepaddle.org.cn/whl/mkl/avx/stable.html

# 앱 소스 복사
COPY app ./app

# ⚠️ 빌드 중 모델 미리받기(캐시) 제거!
#    URL 하나라도 404면 빌드가 실패하므로 런타임 때 지연 다운로드/캐시로 전환

############################
# 2) runtime stage
############################
FROM python:3.11-slim

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        libgl1-mesa-glx libglib2.0-0 libgomp1 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=build /usr/local/bin /usr/local/bin
COPY --from=build /app/app ./app

# 기본 번역 언어: 한국어
ENV DEFAULT_LANG=ko
ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

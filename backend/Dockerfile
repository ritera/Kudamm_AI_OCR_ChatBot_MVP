# syntax=docker/dockerfile:1

# 안정성을 위해 bookworm 고정
FROM python:3.11-slim-bookworm AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# OpenCV/Paddle 런타임 의존성 (GL/X11 계열은 최신에서 libgl1 사용)
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        libgl1 \
        libglib2.0-0 \
        libgomp1 \
        libsm6 \
        libxext6 \
        libxrender1 && \
    rm -rf /var/lib/apt/lists/*

# 가상환경 생성 (빌드/런타임 동일 경로 사용)
ENV VIRTUAL_ENV=/opt/venv
RUN python -m venv "$VIRTUAL_ENV"
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

WORKDIR /app

# --- deps stage: 파이썬 의존성 설치 ---
FROM base AS deps
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# --- runtime stage: 앱만 복사 ---
FROM base AS runtime
WORKDIR /app
COPY --from=deps /opt/venv /opt/venv
COPY app ./app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

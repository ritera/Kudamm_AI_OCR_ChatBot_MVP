from __future__ import annotations

import os
import base64
from typing import List, Dict, Any, Optional

from fastapi import FastAPI, UploadFile, File, Form, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .ocr_engine import ocr_image
from .translator import translate

ALLOWED_LANGS: List[str] = ["ko", "en", "de"]
DEFAULT_LANG = os.getenv("DEFAULT_LANG", "ko").lower()
if DEFAULT_LANG not in ALLOWED_LANGS:
    DEFAULT_LANG = "ko"

app = FastAPI(title="Kudamm OCR API", version="0.2.0")

# 개발 편의를 위해 모두 허용 (배포 시 도메인 제한 권장)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _normalize_lang(lang: Optional[str]) -> str:
    x = (lang or DEFAULT_LANG).lower()
    return x if x in ALLOWED_LANGS else DEFAULT_LANG

def _languages_payload() -> Dict[str, Any]:
    return {
        "default": DEFAULT_LANG,
        "languages": [
            {"code": "ko", "label": "한국어"},
            {"code": "en", "label": "English"},
            {"code": "de", "label": "Deutsch"},
        ],
    }

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/languages")
async def languages():
    return _languages_payload()

@app.get("/api/health")
async def health_alias():
    return await health()

@app.get("/api/languages")
async def languages_alias():
    return await languages()

async def _read_image_bytes_from_request(
    request: Request,
    image: UploadFile | None,
    file: UploadFile | None
) -> bytes:
    """
    아래 우선순위로 이미지를 읽습니다.
    1) multipart: `image` 또는 `file`
    2) JSON: `image_base64` (data URL 허용) 또는 `image_url`
    """
    # 1) multipart/form-data
    if image is not None:
        return await image.read()
    if file is not None:
        return await file.read()

    # 2) application/json
    ct = request.headers.get("content-type", "")
    if "application/json" in ct:
        data = await request.json()
        if not isinstance(data, dict):
            raise HTTPException(status_code=422, detail="잘못된 JSON 형식입니다.")
        # base64 (data URL 포함)
        img_b64 = data.get("image_base64")
        if isinstance(img_b64, str) and img_b64.strip():
            s = img_b64
            if "," in s:  # data:image/png;base64,xxxx
                s = s.split(",", 1)[1]
            try:
                return base64.b64decode(s)
            except Exception:
                raise HTTPException(status_code=422, detail="image_base64 디코딩 실패")
        # 원격 URL
        img_url = data.get("image_url")
        if isinstance(img_url, str) and img_url.strip():
            try:
                import urllib.request
                with urllib.request.urlopen(img_url) as resp:
                    return resp.read()
            except Exception:
                raise HTTPException(status_code=422, detail="image_url 다운로드 실패")

    # 어떤 방식도 주어지지 않음
    raise HTTPException(
        status_code=422,
        detail="이미지를 제공하세요. (multipart: `image` 또는 `file`, "
               "또는 JSON: `image_base64`/`image_url`)"
    )

@app.post("/ocr")
async def run_ocr(
    request: Request,
    image: UploadFile = File(None),
    file: UploadFile = File(None),
    lang: str | None = Form(None),
):
    target_lang = _normalize_lang(lang)
    img_bytes = await _read_image_bytes_from_request(request, image, file)
    text, details = ocr_image(img_bytes, target_lang)
    return {"text": text, "details": details, "lang": target_lang}

# 프론트가 /api/ocr 로 부르는 경우 대응
@app.post("/api/ocr")
async def run_ocr_alias(
    request: Request,
    image: UploadFile = File(None),
    file: UploadFile = File(None),
    lang: str | None = Form(None),
):
    return await run_ocr(request, image, file, lang)

@app.post("/translate")
async def run_translate(
    request: Request,
    text: str | None = Form(None),
    src: str | None = Form(None),
    dst: str | None = Form(None),
):
    # Form이 비어 있으면 JSON도 허용
    if text is None:
        ct = request.headers.get("content-type", "")
        if "application/json" in ct:
            data = await request.json()
            if isinstance(data, dict):
                text = data.get("text")
                src = data.get("src", src)
                dst = data.get("dst", dst)
    if not text:
        return {"text": "", "src": _normalize_lang(src), "dst": _normalize_lang(dst)}
    out = translate(text, src=_normalize_lang(src), dst=_normalize_lang(dst))
    return {"text": out, "src": _normalize_lang(src), "dst": _normalize_lang(dst)}

@app.post("/api/translate")
async def run_translate_alias(
    request: Request,
    text: str | None = Form(None),
    src: str | None = Form(None),
    dst: str | None = Form(None),
):
    return await run_translate(request, text, src, dst)

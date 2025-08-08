from __future__ import annotations

import io
from typing import Dict, List, Tuple, Any

import numpy as np
from PIL import Image
from paddleocr import PaddleOCR

# 지원 언어 매핑: 최소 ko/en/de만 사용
_LANG_ALIAS: Dict[str, str] = {
    "ko": "korean",
    "en": "en",
    "de": "german",
}

# PaddleOCR 인스턴스 캐시
_ocr_cache: Dict[str, PaddleOCR] = {}


def _norm_lang(lang: str | None) -> str:
    if not lang:
        return "ko"
    lang = lang.lower()
    return lang if lang in _LANG_ALIAS else "ko"


def get_ocr(lang: str) -> PaddleOCR:
    """
    PaddleOCR 3.x 초기화.
    - 3.x에서는 show_log/use_gpu 등의 인자 이름이 변경/제거되었습니다.
    - CPU 환경(Windows Docker Desktop) 기준으로 기본값 사용.
    """
    lang = _norm_lang(lang)
    key = _LANG_ALIAS[lang]

    if key not in _ocr_cache:
        # 3.x 호환: 필수 인자만 사용
        # use_angle_cls는 3.x에서도 정상 동작 (문장 회전 보정)
        _ocr_cache[key] = PaddleOCR(
            lang=key,
            use_angle_cls=True,
        )
    return _ocr_cache[key]


def _extract_texts_v2_style(result: Any) -> Tuple[List[str], List[Dict[str, Any]]]:
    """
    PaddleOCR v2/v3의 고전적인 반환형(중첩 리스트) 처리:
    result == [[ [box, (text, score)], ... ]]
    """
    texts: List[str] = []
    details: List[Dict[str, Any]] = []

    if not isinstance(result, list) or not result:
        return texts, details

    first_page = result[0]
    if not isinstance(first_page, list):
        return texts, details

    for item in first_page:
        # item: [box, (text, score)] 형태가 일반적
        if not isinstance(item, (list, tuple)) or len(item) < 2:
            continue

        box = item[0]
        meta = item[1]

        text = None
        score = None

        if isinstance(meta, (list, tuple)) and len(meta) >= 2:
            text = meta[0]
            score = meta[1]
        elif isinstance(meta, dict):
            # 혹시 dict형이면 text/transcription 키를 탐색
            text = meta.get("text") or meta.get("transcription")
            score = meta.get("score")

        if isinstance(text, str) and text.strip():
            texts.append(text)
            details.append(
                {
                    "bbox": box,
                    "text": text,
                    "score": float(score) if isinstance(score, (int, float)) else None,
                }
            )

    return texts, details


def _extract_texts_fallback(result: Any) -> Tuple[List[str], List[Dict[str, Any]]]:
    """
    반환형이 달라졌을 때(딕셔너리/다른 구조) 재귀적으로 문자열을 모아오는 폴백.
    """
    texts: List[str] = []
    details: List[Dict[str, Any]] = []

    def _walk(x: Any):
        if isinstance(x, str):
            if x.strip():
                texts.append(x)
            return
        if isinstance(x, dict):
            # 흔히 쓰는 키 우선적으로 체크
            for k in ("text", "transcription", "rec_text"):
                v = x.get(k)
                if isinstance(v, str) and v.strip():
                    texts.append(v)
            for v in x.values():
                _walk(v)
            return
        try:
            for v in x:
                _walk(v)
        except Exception:
            pass

    _walk(result)
    # details는 구조가 애매하므로 생략/빈배열
    return texts, details


def ocr_image(img_bytes: bytes, lang: str = "ko") -> Tuple[str, List[Dict[str, Any]]]:
    """
    이미지 바이트 → 텍스트/디테일 반환
    - PaddleOCR 3.x에서는 ocr(img)로 호출 (cls 인자 제거됨)
    """
    ocr = get_ocr(lang)

    # PIL로 열고 numpy로 변환
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    np_img = np.array(img)

    # ✅ 3.x 호환: cls 인자 제거
    result = ocr.ocr(np_img)

    # 먼저 v2 스타일 파서로 시도
    texts, details = _extract_texts_v2_style(result)
    if not texts:
        # 구조가 다르면 폴백 파서로 수집
        texts, details = _extract_texts_fallback(result)

    full_text = "\n".join(t for t in texts if t)
    return full_text, details

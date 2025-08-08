from __future__ import annotations
import os

DEFAULT_LANG = os.getenv("DEFAULT_LANG", "ko").lower()

try:
    from deep_translator import GoogleTranslator  # 선택적
except Exception:
    GoogleTranslator = None

def translate(text: str, src: str | None = None, dst: str | None = None) -> str:
    if not text:
        return ""
    src = (src or DEFAULT_LANG).lower()
    dst = (dst or DEFAULT_LANG).lower()
    if GoogleTranslator is None:
        return text
    try:
        return GoogleTranslator(source=src, target=dst).translate(text)
    except Exception:
        return text

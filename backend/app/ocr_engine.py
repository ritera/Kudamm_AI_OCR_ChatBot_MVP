"""
PaddleOCR 래퍼 – 싱글턴으로 초기화하여 메모리 사용 최소화
"""
from functools import lru_cache
from paddleocr import PaddleOCR

@lru_cache
def get_ocr():
    # 'korean' 모델은 한글 + 라틴문자 혼합을 지원
    # use_angle_cls=True → 기울기 자동 보정
    return PaddleOCR(
        use_angle_cls=True,
        lang='korean',
        show_log=False,
        use_gpu=False,          # t2.micro 에서는 반드시 False
    )

def ocr_image(image):
    """
    :param image: PIL.Image
    :return: 추출된 전체 텍스트(str), 세부 정보(list)
    """
    ocr = get_ocr()
    result = ocr.ocr(image, cls=True)
    lines = []
    for line in result[0]:
        text, conf = line[1][0], line[1][1]
        lines.append((text, conf))
    full_text = "\n".join(t for t, _ in lines)
    return full_text, lines

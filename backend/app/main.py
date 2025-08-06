from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import io, os

from .ocr_engine import ocr_image
from openai import OpenAI

app = FastAPI(title="AI OCR + GPT Service")

# CORS – 개발·배포 모두 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    messages: list   # [{'role':'user'|'assistant','content':str}, ...]

def get_openai():
    return OpenAI(api_key=os.environ["OPENAI_API_KEY"])

@app.post("/ocr")
async def run_ocr(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "이미지 파일만 허용됩니다.")
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    text, details = ocr_image(img)
    return {"text": text, "details": details}

@app.post("/chat")
async def chat(req: ChatRequest, client: OpenAI = Depends(get_openai)):
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=req.messages,
        temperature=0.7,
    )
    return {"reply": resp.choices[0].message.content}

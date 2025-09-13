"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import UploadDropzone from "@/components/UploadDropzone";
import OCRResultPanel from "@/components/OCRResultPanel";
import { History, Loader2 } from "lucide-react";

type HistoryItem = {
  id: string;
  filename: string;
  text: string;
  ts: number;
};

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("ocr_history");
    if (raw) {
      setHistory(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ocr_history", JSON.stringify(history.slice(0, 20)));
  }, [history]);

  const canSubmit = useMemo(() => !!file && !loading, [file, loading]);

  const handleUpload = (f: File) => {
    setFile(f);
    setText("");
  };

  const handleClear = () => {
    setFile(null);
    setText("");
    controllerRef.current?.abort();
  };

  const runOCR = async () => {
    if (!file) return;
    setLoading(true);
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
      const fd = new FormData();
      fd.append("file", file);

      // 실제 연동 시: /api/ocr → 내부/외부 OCR 백엔드로 프록시
      const res = await fetch("/api/ocr", {
        method: "POST",
        body: fd,
        signal: controllerRef.current.signal
      });

      if (!res.ok) throw new Error("OCR 요청 실패");
      const data = await res.json();
      const out = (data?.text as string) ?? "";
      setText(out);

      setHistory(prev => [
        { id: crypto.randomUUID(), filename: file.name, text: out, ts: Date.now() },
        ...prev
      ]);
    } catch (e) {
      setText("오류가 발생했습니다. 네트워크 또는 서버 상태를 확인해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const applyHistory = (h: HistoryItem) => {
    setFile(new File([h.text], h.filename, { type: "text/plain" }));
    setText(h.text);
  };

  return (
    <>
      <Header />

      <Section className="bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold">OCR 체험</h1>
            <p className="text-neutral-600 mt-2">
              이미지·PDF 업로드 → 추출 텍스트 확인 · 복사 · 다운로드. (샘플 API 라우트 내장)
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <UploadDropzone onFileSelected={handleUpload} />
              <div className="flex gap-3">
                <button
                  onClick={runOCR}
                  disabled={!canSubmit}
                  className="inline-flex items-center gap-2 rounded-md bg-brand text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {loading && <Loader2 className="animate-spin" size={16} />}
                  OCR 실행
                </button>
                <button
                  onClick={handleClear}
                  className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                >
                  초기화
                </button>
              </div>

              {/* 히스토리 */}
              <div className="rounded-lg border">
                <div className="flex items-center gap-2 border-b px-4 py-3">
                  <History size={16} />
                  <span className="font-medium text-sm">최근 결과 (최대 20개, 로컬 저장)</span>
                </div>
                <div className="max-h-60 overflow-auto divide-y">
                  {history.length === 0 && (
                    <div className="p-4 text-neutral-500 text-sm">아직 기록이 없습니다.</div>
                  )}
                  {history.map(h => (
                    <button
                      key={h.id}
                      onClick={() => applyHistory(h)}
                      className="w-full text-left p-4 hover:bg-neutral-50"
                      title={new Date(h.ts).toLocaleString()}
                    >
                      <div className="text-sm font-medium">{h.filename}</div>
                      <div className="text-xs text-neutral-500 line-clamp-1">{h.text}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <OCRResultPanel text={text} />
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}

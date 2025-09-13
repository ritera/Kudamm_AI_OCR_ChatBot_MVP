"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Download, Text } from "lucide-react";

export default function OCRResultPanel({ text }: { text: string }) {
  const [edited, setEdited] = useState<string>(text);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEdited(text);
  }, [text]);

  const copy = async () => {
    await navigator.clipboard.writeText(edited ?? "");
  };

  const downloadTxt = () => {
    const blob = new Blob([edited ?? ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ocr_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const normalize = () => {
    // 간단한 후처리: 양끝 공백/중복 공백/윈도우 개행 정리
    const cleaned = (edited ?? "")
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map(s => s.trim().replace(/\s+/g, " "))
      .join("\n")
      .trim();
    setEdited(cleaned);
  };

  return (
    <div className="flex flex-col rounded-xl border overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Text size={16} />
          <span className="font-medium text-sm">추출 결과</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={normalize}
            className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-neutral-50"
            title="간단 정리(공백/개행)"
          >
            정리
          </button>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-neutral-50"
            title="클립보드 복사"
          >
            <Copy size={14} /> 복사
          </button>
          <button
            onClick={downloadTxt}
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-neutral-50"
            title="TXT 다운로드"
          >
            <Download size={14} /> TXT
          </button>
        </div>
      </div>

      <textarea
        ref={areaRef}
        value={edited}
        onChange={e => setEdited(e.target.value)}
        placeholder="OCR 실행 후 이곳에 결과가 표시됩니다."
        className="min-h-[420px] w-full resize-none p-4 outline-none"
      />
    </div>
  );
}

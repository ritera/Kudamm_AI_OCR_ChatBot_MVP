"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";

const ACCEPT = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf"
];

export default function UploadDropzone({
  onFileSelected
}: {
  onFileSelected: (file: File) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openFile = () => inputRef.current?.click();

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    if (!ACCEPT.includes(f.type)) {
      alert("PNG / JPG / WEBP / PDF 파일만 지원합니다.");
      return;
    }
    onFileSelected(f);
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }, [onFileSelected]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ACCEPT.includes(f.type)) {
      alert("PNG / JPG / WEBP / PDF 파일만 지원합니다.");
      e.currentTarget.value = "";
      return;
    }
    onFileSelected(f);
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="space-y-3">
      <div
        onDragEnter={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
        onDrop={onDrop}
        className={clsx(
          "rounded-xl border-2 border-dashed p-6 text-center transition",
          dragOver ? "border-brand-accent bg-neutral-50" : "border-neutral-300"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT.join(",")}
          className="hidden"
          onChange={onChange}
        />
        <div className="space-y-2">
          <div className="text-sm text-neutral-600">
            파일을 이 영역에 놓거나, 아래 버튼을 눌러 선택하세요.
          </div>
          <button
            onClick={openFile}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            파일 선택
          </button>
          <div className="text-xs text-neutral-500">지원: PNG, JPG, WEBP, PDF</div>
        </div>
      </div>

      {previewUrl && (
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium mb-2">미리보기</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="preview" className="max-h-[360px] w-auto rounded-md" />
        </div>
      )}
    </div>
  );
}

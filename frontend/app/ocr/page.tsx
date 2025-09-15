"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { useState } from "react";

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");

  const submit = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/ocr", { method: "POST", body: fd });
    const data = await res.json();
    setText(data?.text ?? "");
  };

  return (
    <>
      <Header />
      <PageHeader title="OCR (Beta)" subtitle="Bild oder PDF hochladen und Text extrahieren – internes Tool." />
      <Section glass>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm"
            />
            <button
              onClick={submit}
              disabled={!file}
              className="mt-3 rounded-md bg-brand text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              OCR ausführen
            </button>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Ergebnis erscheint hier…"
            className="min-h-[300px] w-full rounded-xl border p-4"
          />
        </div>
      </Section>
      <Footer />
    </>
  );
}

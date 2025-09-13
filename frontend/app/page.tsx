import Link from "next/link";
import { ArrowRight, ScanText, Sparkles, UploadCloud } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import FeatureCard from "@/components/FeatureCard";

export default function Page() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="section relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <p className="inline-block rounded-full border px-3 py-1 text-xs tracking-wide text-neutral-600">
                빠르고 정확한 OCR
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                이미지와 PDF를 <span className="underline decoration-brand-accent">한번에 텍스트로</span>
              </h1>
              <p className="text-neutral-600">
                스캔본, 영수증, 명함, 표까지—클릭 한 번으로 추출하세요.
                클라우드 API 연동 준비 완료.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/ocr"
                  className="inline-flex items-center gap-2 rounded-md bg-brand text-white px-5 py-3 text-sm font-medium hover:opacity-90 transition"
                >
                  지금 체험하기 <ArrowRight size={16} />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-medium hover:bg-neutral-50 transition"
                >
                  기능 보기
                </a>
              </div>
            </div>

            {/* Hero Mock */}
            <div className="rounded-2xl border bg-neutral-50 p-4 shadow-sm">
              <div className="aspect-[4/3] w-full rounded-lg border bg-white p-6">
                <div className="h-full w-full rounded-md border-dashed border-2 border-neutral-300 grid place-items-center text-neutral-500">
                  OCR 미리보기
                </div>
              </div>
              <div className="mt-3 text-center text-sm text-neutral-500">
                드래그&드롭 업로드 + 실시간 결과 패널
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="hr mx-auto max-w-6xl px-6"></div>

      {/* Features */}
      <Section id="features" className="bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold">핵심 기능</h2>
            <p className="text-neutral-600 mt-2">간결한 UX로 더 빠르게 일하세요.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<UploadCloud />}
              title="드래그&드롭 업로드"
              desc="이미지, PDF를 바로 끌어다 놓기. 실수 방지 파일 유효성 검증 포함."
            />
            <FeatureCard
              icon={<ScanText />}
              title="표/다국어 대응"
              desc="한국어·영어·독일어 등 다국어 텍스트 추출을 위한 백엔드 API 연동 구조."
            />
            <FeatureCard
              icon={<Sparkles />}
              title="후처리 툴"
              desc="복사/다운로드/클립보드/정리(줄바꿈·공백)/히스토리 저장을 모두 UI에서."
            />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTA
        title="지금 바로 OCR을 시작해 보세요"
        subtitle="로컬 테스트용 API 라우트가 내장되어 있으므로 즉시 실행 가능합니다."
        ctaText="OCR 체험"
        href="/ocr"
      />

      <Footer />
    </>
  );
}

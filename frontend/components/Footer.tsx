export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-600">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="logo" className="h-5 w-5" />
            <span className="font-medium text-brand">Kudamm OCR</span>
          </div>
          <div className="text-neutral-500">
            © {new Date().getFullYear()} Kudamm OCR • All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

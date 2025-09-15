/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const target = process.env.BACKEND_URL;
    // OCR 백엔드가 있을 경우에만 프록시. 없으면 Next 라우트(app/api/ocr) 사용
    return target ? [{ source: "/api/ocr", destination: `${target}/api/ocr` }] : [];
  }
};
export default nextConfig;

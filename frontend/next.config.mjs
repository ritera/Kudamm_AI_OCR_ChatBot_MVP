/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Next 서버가 /api/* 요청을 FastAPI로 프록시
    const target = process.env.BACKEND_URL || "http://localhost:8000";
    return [
      { source: "/api/:path*", destination: `${target}/api/:path*` }
    ];
  }
};
export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ursoparvo.com" }],
        destination: "https://ursoparvo.studio/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ursoparvo.com" }],
        destination: "https://ursoparvo.studio/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

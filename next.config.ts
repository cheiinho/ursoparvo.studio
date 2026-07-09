import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    const removedRoutes = [
      "/work",
      "/work/:slug",
      "/about",
      "/legal",
      "/privacy",
      "/terms",
      "/cookies",
    ];

    return [
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "ursoparvo.com" }],
        destination: "https://ursoparvo.studio/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.ursoparvo.com" }],
        destination: "https://ursoparvo.studio/:path*",
        permanent: true,
      },
      ...removedRoutes.map((source) => ({
        source,
        destination: "/",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;

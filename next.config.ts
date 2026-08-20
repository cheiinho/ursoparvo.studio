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
        destination: "/pt",
        permanent: true,
      })),
      { source: "/", destination: "/pt", permanent: true },
      { source: "/pt/studio", destination: "/pt/estudio", permanent: true },
      { source: "/en/estudio", destination: "/en/studio", permanent: true },
      { source: "/pt/project", destination: "/pt/projecto", permanent: true },
      { source: "/en/projecto", destination: "/en/project", permanent: true },
    ];
  },
};

export default nextConfig;

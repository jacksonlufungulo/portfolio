/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow any https image host so URLs entered in the admin UI just work.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Bundle the committed content seed into the serverless functions so it can
  // be read at runtime on Vercel (until the first admin save writes to Blob).
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
    "/api/content": ["./content/**/*"],
  },
};

export default nextConfig;

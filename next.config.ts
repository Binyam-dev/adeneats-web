import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin explicitly — an unrelated lockfile at ~/package-lock.json would
  // otherwise make Next.js guess the workspace root incorrectly.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // cook.photo_url will eventually point at Supabase Storage —
        // next/image throws for any remote host not allow-listed here.
        hostname: new URL(
          process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
        ).hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;

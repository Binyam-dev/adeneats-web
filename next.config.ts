import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin explicitly — an unrelated lockfile at ~/package-lock.json would
  // otherwise make Next.js guess the workspace root incorrectly.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

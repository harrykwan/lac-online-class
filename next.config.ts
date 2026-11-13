import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — all interactivity (Web Audio, quizzes, progress) is client-side.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The root layout lives under a dynamic segment, so there is no single layout to
  // compose a 404 from: this is the case global-not-found.tsx exists for.
  experimental: { globalNotFound: true },
};

export default nextConfig;

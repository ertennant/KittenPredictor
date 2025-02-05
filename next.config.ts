import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  images: {
    unoptimized: true, 
  }, 
  assetPrefix: isProd ? "/KittenPredictor" : "",
  basePath: isProd ? "/KittenPredictor" : "",
  output: "export",
  /* config options here */
};

export default nextConfig;

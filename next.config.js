/** @type {import('next').NextConfig} */

const repo = "abhishek-nagargoje-portfolio";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
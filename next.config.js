/** @type {import('next').NextConfig} */

const repo = "abhishek-nagargoje-portfolio";

const nextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
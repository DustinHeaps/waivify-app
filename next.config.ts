const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "utfs.io",
      "uploadthing.com",
      "j809ylosmw.ufs.sh",
      "api.qrserver.com",
    ],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

module.exports = withMDX(nextConfig);

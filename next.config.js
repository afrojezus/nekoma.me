/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "safebooru.org",
          port: '',
          pathname: "//samples/**"
        },
        {
          protocol: "https",
          hostname: "safebooru.org",
          port: '',
          pathname: "//images/**"
        }
      ]
    }
  }
};

module.exports = nextConfig;

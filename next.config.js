/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/section/cubesat",
        destination: "/trace",
        permanent: true,
      },
      {
        source: "/section/rocket",
        destination: "/rapid",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { hostname: "plus.unsplash.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "mdbcdn.b-cdn.net" },
    ],
  },
};

module.exports = nextConfig;

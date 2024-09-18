/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/sections/cubesat",
        destination: "/trace",
        permanent: true,
      },
      {
        source: "/sections/rocket",
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

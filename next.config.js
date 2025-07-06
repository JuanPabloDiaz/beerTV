/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow YouTube embeds
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'],
  },
};

module.exports = nextConfig;

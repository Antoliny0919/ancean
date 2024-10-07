/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['www.ancean.net', 'localhost']
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
};


module.exports = nextConfig


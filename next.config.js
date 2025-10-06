/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    SITE_ID: process.env.SITE_ID || 'site1',
  },
}

module.exports = nextConfig

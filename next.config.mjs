/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  // Remove allowedDevOrigins for production
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: ['172.20.10.4'],
  }),
}

export default nextConfig

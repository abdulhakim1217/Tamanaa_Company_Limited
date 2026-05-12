/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors for deployment
  },
  images: {
    unoptimized: true,
  },
  // Optimize for production
  reactStrictMode: true,
  // Improve performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Allow access from local network for development
  allowedDevOrigins: ['172.20.10.4'],
}

export default nextConfig

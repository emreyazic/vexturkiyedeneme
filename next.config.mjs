/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // Sanity Studio içeriğini doğru şekilde işle
  experimental: {
    taint: true,
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns', '@radix-ui/react-select', '@radix-ui/react-dialog'],
  },
  async redirects() {
    return [
      {
        source: '/kurumsal/vizyon-misyon',
        destination: '/kurumsal/hakkimizda',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

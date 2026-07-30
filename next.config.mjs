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
      // VEX-nedir redirects
      {
        source: '/vex-nedir/vex-v5',
        destination: '/programlar/recf-achieve',
        permanent: true,
      },
      {
        source: '/vex-nedir/vex-iq',
        destination: '/programlar/recf-engage',
        permanent: true,
      },
      {
        source: '/vex-nedir/vex-u',
        destination: '/programlar/recf-inspire',
        permanent: true,
      },
      {
        source: '/vex-nedir/v5rc',
        destination: '/programlar/aerial-drone-competition',
        permanent: true,
      },
      {
        source: '/vex-nedir/viqrc',
        destination: '/programlar/adc-pro',
        permanent: true,
      },
      {
        source: '/vex-nedir',
        destination: '/programlar',
        permanent: true,
      },
      {
        source: '/vex-nedir/:slug',
        destination: '/programlar/:slug',
        permanent: true,
      },
      // recf-programlari redirects
      {
        source: '/recf-programlari',
        destination: '/programlar',
        permanent: true,
      },
      {
        source: '/recf-programlari/engage',
        destination: '/programlar/recf-engage',
        permanent: true,
      },
      {
        source: '/recf-programlari/achieve',
        destination: '/programlar/recf-achieve',
        permanent: true,
      },
      {
        source: '/recf-programlari/inspire',
        destination: '/programlar/recf-inspire',
        permanent: true,
      },
      {
        source: '/recf-programlari/adc',
        destination: '/programlar/aerial-drone-competition',
        permanent: true,
      },
      {
        source: '/recf-programlari/adc-pro',
        destination: '/programlar/adc-pro',
        permanent: true,
      },
      {
        source: '/recf-programlari/:slug',
        destination: '/programlar/:slug',
        permanent: true,
      },
      // Takım Dizini redirects
      {
        source: '/takim-haritasi',
        destination: '/takimlar/takim-dizini',
        permanent: true,
      },
      {
        source: '/tum-takimlar',
        destination: '/takimlar/takim-dizini',
        permanent: true,
      },
      {
        source: '/takimlar/tum-takimlar',
        destination: '/takimlar/takim-dizini',
        permanent: true,
      },
      {
        source: '/takimlar/tum-takimlar/:slug',
        destination: '/takimlar/takim-dizini/:slug',
        permanent: true,
      },
      // Mentor redirects
      {
        source: '/mentor-kosesi',
        destination: '/takimlar/koc-ve-mentor-merkezi',
        permanent: true,
      },
      {
        source: '/takimlar/mentor',
        destination: '/takimlar/koc-ve-mentor-merkezi',
        permanent: true,
      },
      // Gönüllülük redirects
      {
        source: '/gonullu-olun',
        destination: '/kurumsal/gonulluluk',
        permanent: true,
      },
      {
        source: '/kurumsal/gonullu-olun',
        destination: '/kurumsal/gonulluluk',
        permanent: true,
      },
      // İş Birlikleri redirects
      {
        source: '/sponsorlar-ve-partnerler',
        destination: '/kurumsal/is-birlikleri',
        permanent: true,
      },
      {
        source: '/kurumsal/sponsorlar-ve-partnerler',
        destination: '/kurumsal/is-birlikleri',
        permanent: true,
      },
      // Sezon Oyunları redirects
      {
        source: '/sezon-temasi',
        destination: '/yarismalar/sezon-oyunlari',
        permanent: true,
      },
      {
        source: '/yarismalar/sezon-temasi',
        destination: '/yarismalar/sezon-oyunlari',
        permanent: true,
      },
      // Solo Sıralamaları redirects
      {
        source: '/robot-skills-siralamasi',
        destination: '/yarismalar/solo-siralamalari',
        permanent: true,
      },
      {
        source: '/yarismalar/skills',
        destination: '/yarismalar/solo-siralamalari',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

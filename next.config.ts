import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Resimler için yapılandırma bloğu:
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Genellikle https kullanılır
        hostname: 'images.unsplash.com', // İzin verilecek alan adı
        // port: '', // Gerekirse port
        // pathname: '/account123/**', // Gerekirse belirli bir yol
      },
      // Başka alan adlarına da izin vermek isterseniz buraya ekleyebilirsiniz:
      {
       protocol: 'https',
       hostname: 'miro.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.change.org'
      },
      
    ],
  },
};

export default nextConfig;

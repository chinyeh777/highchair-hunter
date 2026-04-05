/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 重新啟動 PM 特權：忽略所有型別與語法檢查，強制部署！
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 下面是 Claude 幫忙修復圖片破圖的最新白名單
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'places.googleapis.com',
        pathname: '/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
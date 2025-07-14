/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:"www.loft.co.jp"
      },
      {
        protocol: 'https',
        hostname: 'lococo-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },{
        protocol:"https",
        hostname:"m.media-amazon.com"
      },{
        protocol:"https",
        hostname:"encrypted-tbn0.gstatic.com"
      }
    ],
  },
};

export default nextConfig;

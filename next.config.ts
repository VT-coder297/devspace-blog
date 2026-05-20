/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**', // Matches all images from this host
      },
    ],
  },
};

export default nextConfig;

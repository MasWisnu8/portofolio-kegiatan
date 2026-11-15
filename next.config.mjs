/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  basePath: '/portofolio-kegiatan',
  trailingSlash: true,
};

export default nextConfig;

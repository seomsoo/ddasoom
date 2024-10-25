import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./src'),
      '@components': path.resolve('./src/components'),
      '@store': path.resolve('./src/redux'),
      '@assets': path.resolve('./src/assets'),
      '@hooks': path.resolve('./src/hooks'),
      '@utils': path.resolve('./src/utils'),
    };
    return config;
  },
};

export default nextConfig;

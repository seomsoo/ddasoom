import withVideos from 'next-videos';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = withVideos({
  reactStrictMode: true,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./src'),
      '@components': path.resolve('./src/components'),
      '@store': path.resolve('./src/redux'),
      '@hooks': path.resolve('./src/hooks'),
      '@utils': path.resolve('./src/utils'),
    };

    // SVG를 React 컴포넌트로 사용하기 위한 설정 추가
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});

export default nextConfig;

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
    // SVG를 React 컴포넌트로 사용하기 위한 설정 추가
    config.module.rules.push({
      test: /\.svg$/, // SVG 파일에 대해
      use: ['@svgr/webpack'], // @svgr/webpack 사용
    });

    return config;
  },
};

export default nextConfig;

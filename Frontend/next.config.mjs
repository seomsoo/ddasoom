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
  async headers() {
    return [
      // 전체 경로에 대해 기본적으로 캐시하지 않도록 설정
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
        ],
      },
      // public/images/ 경로의 정적 이미지 파일에 대한 장기 캐시 설정
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1년 동안 캐시 유지
          },
        ],
      },
      // public/fonts/ 경로의 정적 폰트 파일에 대한 장기 캐시 설정
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // public/svgs/ 경로의 정적 SVG 파일에 대한 장기 캐시 설정
      {
        source: '/svgs/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // public/videos/ 경로의 정적 비디오 파일에 대한 장기 캐시 설정
      {
        source: '/videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
});

export default nextConfig;

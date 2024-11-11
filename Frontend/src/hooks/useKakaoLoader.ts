import { useEffect } from 'react';

export const useKakaoLoader = () => {
  useEffect(() => {
    // 이미 스크립트가 추가되어 있는지 확인
    const existingScript = document.getElementById('kakao-map-sdk');

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'kakao-map-sdk';
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=clusterer,drawing,services`;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            console.log('Kakao Maps SDK loaded');
          });
        }
      };
      document.head.appendChild(script);
    } else if (window.kakao && window.kakao.maps) {
      // 스크립트가 이미 로드된 경우 바로 load 호출
      window.kakao.maps.load(() => {
        console.log('Kakao Maps SDK already loaded');
      });
    }
  }, []);
};

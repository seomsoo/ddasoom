// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { useGeoLocation } from '@/hooks/useGeoLocation';
// import { useKakaoLoader } from '@/hooks/useKakaoLoader';

// interface Place {
//   id: string;
//   name: string;
//   lat: number;
//   lng: number;
//   distance: number;
// }

// const categories = ['병원', '응급실', '정신건강의학과의원'];

// export default function NearbyHospitalsMap() {
//   const { curLocation, isLoading, errorMsg } = useGeoLocation();
//   const [places, setPlaces] = useState<Place[]>([]);
//   const mapRef = useRef<HTMLDivElement>(null);

//   // Kakao Maps API 로드
//   useKakaoLoader();

//   useEffect(() => {
//     if (!curLocation || !window.kakao || !mapRef.current) return;

//     // 지도를 초기화하고 현재 위치 중심으로 설정
//     const map = new window.kakao.maps.Map(mapRef.current, {
//       center: new window.kakao.maps.LatLng(curLocation.latitude, curLocation.longitude),
//       level: 4,
//     });

//     // 현재 위치에 마커 추가
//     const userMarkerPosition = new window.kakao.maps.LatLng(curLocation.latitude, curLocation.longitude);
//     const userMarker = new window.kakao.maps.Marker({
//       position: userMarkerPosition,
//       map: map,
//     });

//     const placesService = new window.kakao.maps.services.Places(map);

//     // 카테고리별로 장소 검색을 수행하고, 전체 장소 목록을 통합
//     let allPlaces: Place[] = [];

//     const searchPlacesByCategory = (category: string) =>
//       new Promise<void>(resolve => {
//         placesService.keywordSearch(category, (data: PlaceSearchResult[], status: string) => {
//           if (status === window.kakao.maps.services.Status.OK) {
//             const results = data
//               .map(place => ({
//                 id: place.id,
//                 name: place.place_name,
//                 lat: parseFloat(place.y),
//                 lng: parseFloat(place.x),
//                 distance: Number(place.distance),
//               }))
//               .filter(place => place.distance <= 5000);

//             allPlaces = [
//               ...allPlaces,
//               ...results.filter(newPlace => !allPlaces.some(existingPlace => existingPlace.id === newPlace.id)),
//             ];

//             // 검색된 장소마다 마커 생성
//             results.forEach(place => {
//               const markerPosition = new window.kakao.maps.LatLng(place.lat, place.lng);
//               const marker = new window.kakao.maps.Marker({
//                 position: markerPosition,
//                 map: map,
//               });
//             });
//           }
//           resolve();
//         });
//       });

//     // 모든 카테고리 장소 검색을 수행하고 정렬 후 상태 업데이트
//     Promise.all(categories.map(category => searchPlacesByCategory(category))).then(() => {
//       const sortedPlaces = allPlaces.sort((a, b) => a.distance - b.distance).slice(0, 5); // 가까운 순으로 5개만 선택
//       setPlaces(sortedPlaces);
//     });
//   }, [curLocation]);

//   if (isLoading) return <p>위치 정보를 불러오는 중입니다...</p>;
//   if (errorMsg) return <p>{errorMsg}</p>;

//   return (
//     <div>
//       <h1>근처 병원, 응급실, 정신건강의학과 의원 (가까운 순서 5개)</h1>
//       <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
//       <div>
//         {places.map(place => (
//           <div key={`${place.id}-${place.distance}`}>
//             <h2>{place.name}</h2>
//             <p>거리: {place.distance}m</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { useKakaoLoader } from '@/hooks/useKakaoLoader';

interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: number;
}

const categories = ['병원', '응급실', '정신건강의학과의원'];

export default function NearbyHospitalsMap() {
  const { curLocation, isLoading, errorMsg } = useGeoLocation();
  const [places, setPlaces] = useState<Place[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const [receivedLocation, setReceivedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Kakao Maps API 로드
  useKakaoLoader();

  useEffect(() => {
    // WebView에서 메시지 수신
    const handleMessage = (event: MessageEvent) => {
      const receivedMessage = event.data;

      if (receivedMessage.title === 'GPS' && receivedMessage.content) {
        const { 위도, 경도 } = receivedMessage.content;
        setReceivedLocation({ latitude: 위도, longitude: 경도 });
        console.log('Received GPS Data - 위도:', 위도, '경도:', 경도);
      }
    };

    window.addEventListener('message', handleMessage);

    // 컴포넌트 언마운트 시 리스너 정리
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    // 중심 위치 설정: 기본 위치가 없으면 수신된 위치 사용
    const centerLocation = receivedLocation || curLocation;

    // centerLocation이 없으면 초기화하지 않음
    if (!centerLocation || !window.kakao || !mapRef.current) return;

    // 지도를 초기화하고 현재 위치 중심으로 설정
    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(centerLocation.latitude, centerLocation.longitude),
      level: 4,
    } as unknown as kakao.maps.MapOptions);

    // 현재 위치에 마커 추가
    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(centerLocation.latitude, centerLocation.longitude),
      map: map as unknown as kakao.maps.Map, // 강제 캐스팅 사용
    });

    const placesService = new window.kakao.maps.services.Places(map as unknown as kakao.maps.Map); // 강제 캐스팅 사용

    // 카테고리별로 장소 검색을 수행하고, 전체 장소 목록을 통합
    let allPlaces: Place[] = [];

    const searchPlacesByCategory = (category: string) =>
      new Promise<void>(resolve => {
        placesService.keywordSearch(category, (data: PlaceSearchResult[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const results = data
              .map(place => ({
                id: place.id,
                name: place.place_name,
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
                distance: Number(place.distance),
              }))
              .filter(place => place.distance <= 5000);

            allPlaces = [
              ...allPlaces,
              ...results.filter(newPlace => !allPlaces.some(existingPlace => existingPlace.id === newPlace.id)),
            ];

            // 검색된 장소마다 마커 생성
            results.forEach(place => {
              new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(place.lat, place.lng),
                map: map as unknown as kakao.maps.Map, // 강제 캐스팅 사용
              });
            });
          }
          resolve();
        });
      });

    // 모든 카테고리 장소 검색을 수행하고 정렬 후 상태 업데이트
    Promise.all(categories.map(category => searchPlacesByCategory(category))).then(() => {
      const sortedPlaces = allPlaces.sort((a, b) => a.distance - b.distance).slice(0, 5); // 가까운 순으로 5개만 선택
      setPlaces(sortedPlaces);
    });
  }, [curLocation, receivedLocation]);

  if (isLoading) return <p>위치 정보를 불러오는 중입니다...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <div>
      <h1>근처 병원, 응급실, 정신건강의학과 의원 (가까운 순서 5개)</h1>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
      <div>
        {places.map(place => (
          <div key={`${place.id}-${place.distance}`}>
            <h2>{place.name}</h2>
            <p>거리: {place.distance}m</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
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
//   const [places, setPlaces] = useState<Place[]>([]);
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [receivedLocation, setReceivedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   // Kakao Maps API 로드
//   useKakaoLoader();

//   // 페이지 로드 시 앱에 GPS 요청 메시지 보내기
//   useEffect(() => {
//     window.ReactNativeWebView?.postMessage(
//       JSON.stringify({
//         title: 'GPS',
//         content: null,
//       }),
//     );

//     // setTimeout(() => {
//     //   setReceivedLocation({ latitude: 35.2052474, longitude: 126.8117694 });
//     // }, 5000);
//   }, []);

//   // WebView에서 GPS 메시지 수신
//   useEffect(() => {
//     const handleMessage = async (event: MessageEvent) => {
//       // if (typeof event.data !== 'string') {
//       //   console.error('Received non-string data:', event.data);
//       //   return;
//       // }

//       try {
//         const parsedMessage = await JSON.parse(event.data);
//         if (parsedMessage.title === 'CURRENTLOCATION' && parsedMessage.content) {
//           // const { latitude, longitude } = parsedMessage.content;
//           const latitude = parsedMessage.content.latitude;
//           const longitude = parsedMessage.content.longitude;
//           setReceivedLocation({ latitude, longitude });
//           // setReceivedLocation({ latitude: 35.2052474, longitude: 126.8117694 });
//           console.log('Received GPS Data - latitude:', latitude, 'longitude:', longitude);
//         }
//       } catch (error) {
//         console.error('Failed to parse message:', error);
//       }
//     };

//     window.addEventListener('message', handleMessage);

//     return () => {
//       window.removeEventListener('message', handleMessage);
//     };
//   }, []);

//   useEffect(() => {
//     if (!receivedLocation || !window.kakao || !mapRef.current) return;

//     const map = new window.kakao.maps.Map(mapRef.current, {
//       center: new window.kakao.maps.LatLng(receivedLocation.latitude, receivedLocation.longitude),
//       level: 4,
//     } as unknown as kakao.maps.MapOptions);

//     new window.kakao.maps.Marker({
//       position: new window.kakao.maps.LatLng(receivedLocation.latitude, receivedLocation.longitude),
//       map: map as unknown as kakao.maps.Map,
//     });

//     const placesService = new window.kakao.maps.services.Places(map as unknown as kakao.maps.Map);

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

//             results.forEach(place => {
//               new window.kakao.maps.Marker({
//                 position: new window.kakao.maps.LatLng(place.lat, place.lng),
//                 map: map as unknown as kakao.maps.Map,
//               });
//             });
//           }
//           resolve();
//         });
//       });

//     Promise.all(categories.map(category => searchPlacesByCategory(category))).then(() => {
//       const sortedPlaces = allPlaces.sort((a, b) => a.distance - b.distance).slice(0, 5);
//       setPlaces(sortedPlaces);
//     });
//   }, [receivedLocation]);

//   return (
//     <div>
//       <h1>근처 병원, 응급실, 정신건강의학과 의원 (가까운 순서 5개)</h1>
//       <div ref={mapRef} style={{ width: '200px', height: '500px' }} />
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

interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: number;
}

const categories = ['병원', '응급실', '정신건강의학과의원'];

export default function NearbyHospitalsMap() {
  const [places, setPlaces] = useState<Place[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const [receivedLocation, setReceivedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Kakao Maps API 로드
  useEffect(() => {
    const kakaoMapKey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY || '776e8affab113456d6b62b5c1a675605';
    const existingScript = document.getElementById('kakao-map-sdk');

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'kakao-map-sdk';
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=clusterer,drawing,services`;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            console.log('Kakao Maps SDK loaded');
          });
        }
      };
      document.head.appendChild(script);
    } else if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        console.log('Kakao Maps SDK already loaded');
      });
    }
  }, []);

  // 페이지 로드 시 앱에 GPS 요청 메시지 보내기
  useEffect(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'GPS',
        content: null,
      }),
    );
  }, []);

  // WebView에서 GPS 메시지 수신
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        console.log('파싱된 메시지: ', parsedMessage);

        // 모든 DevTools 관련 메시지를 무시 (개발 환경에서만)
        if (parsedMessage.source?.startsWith('devtools') || parsedMessage.source?.startsWith('@devtools')) {
          console.log('DevTools 메시지 무시');
          return;
        }

        // 'CURRENTLOCATION' 메시지 확인
        if (parsedMessage.title === 'CURRENTLOCATION') {
          setReceivedLocation({ latitude: parsedMessage.content.latitude, longitude: parsedMessage.content.longitude });
        } else {
          console.log('필요한 title이 아님 또는 content 없음');
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!receivedLocation || !window.kakao || !mapRef.current) return;

    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(receivedLocation.latitude, receivedLocation.longitude),
      level: 4,
    } as unknown as kakao.maps.MapOptions);

    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(receivedLocation.latitude, receivedLocation.longitude),
      map: map as unknown as kakao.maps.Map,
    });

    const placesService = new window.kakao.maps.services.Places(map as unknown as kakao.maps.Map);

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

            results.forEach(place => {
              new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(place.lat, place.lng),
                map: map as unknown as kakao.maps.Map,
              });
            });
          }
          resolve();
        });
      });

    Promise.all(categories.map(category => searchPlacesByCategory(category))).then(() => {
      const sortedPlaces = allPlaces.sort((a, b) => a.distance - b.distance).slice(0, 5);
      setPlaces(sortedPlaces);
    });
  }, [receivedLocation]);

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

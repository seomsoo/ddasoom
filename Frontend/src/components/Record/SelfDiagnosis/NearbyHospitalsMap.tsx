// 'use client';

// import React, { useEffect, useRef, useState } from 'react';

// interface Place {
//   id: string;
//   name: string;
//   lat: number;
//   lng: number;
//   distance: number;
// }

// export default function NearbyHospitalsMap() {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [places, setPlaces] = useState<Place[]>([]);
//   const [receivedLocation, setReceivedLocation] = useState<{ latitude: number; longitude: number }>({
//     latitude: 35.2052474, // 기본 위치 예시
//     longitude: 126.8117694,
//   });

//   // GPS 요청 메시지 보내기
//   useEffect(() => {
//     window.ReactNativeWebView?.postMessage(
//       JSON.stringify({
//         title: 'GPS',
//         content: null,
//       }),
//     );
//   }, []);

//   // WebView에서 GPS 위치 메시지 수신
//   useEffect(() => {
//     const handleMessage = async (event: MessageEvent) => {
//       try {
//         const parsedMessage = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
//         console.log('파싱된 메시지: ', parsedMessage.title);

//         // DevTools 관련 메시지 무시
//         if (parsedMessage.source?.startsWith('devtools') || parsedMessage.source?.startsWith('@devtools')) {
//           console.log('DevTools 메시지 무시');
//           return;
//         }

//         // 'CURRENTLOCATION' 메시지 확인
//         if (parsedMessage.title === 'CURRENTLOCATION') {
//           setReceivedLocation({
//             latitude: parsedMessage.latitude,
//             longitude: parsedMessage.longitude,
//           });
//           console.log('Received GPS Data - latitude:', parsedMessage.latitude, 'longitude:', parsedMessage.longitude);
//         } else {
//           console.log('필요한 title이 아님 또는 content 없음');
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
//     const kakaoMapKey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY || '776e8affab113456d6b62b5c1a675605';
//     const existingScript = document.getElementById('kakao-map-sdk');

//     if (!existingScript) {
//       const script = document.createElement('script');
//       script.id = 'kakao-map-sdk';
//       script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services`;
//       script.onload = () => {
//         if (window.kakao && window.kakao.maps) {
//           window.kakao.maps.load(() => {
//             console.log('Kakao Maps SDK loaded');
//             initializeMap();
//           });
//         }
//       };
//       document.head.appendChild(script);
//     } else if (window.kakao && window.kakao.maps) {
//       window.kakao.maps.load(() => {
//         console.log('Kakao Maps SDK already loaded');
//         initializeMap();
//       });
//     }
//   }, []);

//   const initializeMap = () => {
//     if (!mapRef.current || !window.kakao) return;

//     const map = new window.kakao.maps.Map(mapRef.current, {
//       center: new window.kakao.maps.LatLng(receivedLocation.latitude, receivedLocation.longitude),
//       level: 4,
//     });

//     new window.kakao.maps.Marker({
//       position: new window.kakao.maps.LatLng(receivedLocation.latitude, receivedLocation.longitude),
//       map: map as any,
//     });
//     console.log('map:', map);

//     const placesService = new window.kakao.maps.services.Places();
//     let allPlaces: Place[] = [];

//     const categories = ['HP8', 'HP9', 'PM9'];

//     const searchPlacesByCategory = (category: string) =>
//       new Promise<void>(resolve => {
//         placesService.categorySearch(
//           category,
//           (data: any[], status: string) => {
//             if (status === window.kakao.maps.services.Status.OK) {
//               const results = data
//                 .map(place => ({
//                   id: place.id,
//                   name: place.place_name,
//                   lat: parseFloat(place.y),
//                   lng: parseFloat(place.x),
//                   distance: calculateDistance(
//                     receivedLocation.latitude,
//                     receivedLocation.longitude,
//                     parseFloat(place.y),
//                     parseFloat(place.x),
//                   ),
//                 }))
//                 .filter(place => place.distance <= 5000);

//               allPlaces = [
//                 ...allPlaces,
//                 ...results.filter(newPlace => !allPlaces.some(existingPlace => existingPlace.id === newPlace.id)),
//               ];

//               results.forEach(place => {
//                 new window.kakao.maps.Marker({
//                   position: new window.kakao.maps.LatLng(place.lat, place.lng),
//                   map: map as any,
//                 });
//               });
//             }
//             resolve();
//           },
//           {
//             location: new window.kakao.maps.LatLng(receivedLocation.latitude, receivedLocation.longitude),
//             radius: 5000,
//           },
//         );
//       });

//     Promise.all(categories.map(category => searchPlacesByCategory(category))).then(() => {
//       const sortedPlaces = allPlaces.sort((a, b) => a.distance - b.distance).slice(0, 5);
//       setPlaces(sortedPlaces);
//     });
//   };

//   const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
//     const toRad = (value: number) => (value * Math.PI) / 180;
//     const R = 6371e3;
//     const φ1 = toRad(lat1);
//     const φ2 = toRad(lat2);
//     const Δφ = toRad(lat2 - lat1);
//     const Δλ = toRad(lng2 - lng1);

//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   return (
//     <div>
//       <h1>근처 병원, 응급실, 정신건강의학과 의원 (가까운 순서 5개)</h1>
//       <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
//       <div>
//         {places.map(place => (
//           <div key={`${place.id}-${place.distance}`}>
//             <h2>{place.name}</h2>
//             <p>거리: {Math.round(place.distance)}m</p>
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

interface PlacesSearchResultItem {
  id: string;
  place_name: string;
  category_name: string;
  category_group_name: string;
  category_group_code: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  distance: string;
}

export default function NearbyHospitalsMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [receivedLocation, setReceivedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const kakaoMapKey = 'db0dd621cffe4388d2816e641f4242d9';

  // 기본 위치 설정
  const defaultLocation = { latitude: 35.2052474, longitude: 126.8117694 };

  // WebView에서 GPS 요청 메시지 보내기
  useEffect(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'GPS',
        content: null,
      }),
    );
  }, []);

  // WebView에서 GPS 위치 메시지 수신
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      try {
        const parsedMessage = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (parsedMessage.title === 'CURRENTLOCATION' && parsedMessage.latitude && parsedMessage.longitude) {
          setReceivedLocation({
            latitude: parsedMessage.latitude,
            longitude: parsedMessage.longitude,
          });
        } else {
          console.log('필요한 title이 아님 또는 content 없음');
          setReceivedLocation(defaultLocation); // 기본 위치 사용
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
        setReceivedLocation(defaultLocation); // 파싱 오류 시 기본 위치 사용
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // 지도 스크립트 로드 및 초기화
  useEffect(() => {
    const existingScript = document.getElementById('kakao-map-sdk');

    const loadMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'kakao-map-sdk';
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services`;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, [receivedLocation]);

  const initializeMap = () => {
    if (!mapRef.current || !window.kakao) return;

    const location = receivedLocation || defaultLocation;

    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
      level: 4,
    });

    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(location.latitude, location.longitude),
      map: map as kakao.maps.Map,
    });

    const placesService = new window.kakao.maps.services.Places();
    let allPlaces: Place[] = [];

    const categories = ['HP8', 'HP9', 'PM9'];

    const searchPlacesByCategory = (category: string) =>
      new Promise<void>(resolve => {
        placesService.categorySearch(
          category,
          (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const results = (data as unknown as PlacesSearchResultItem[])
                .map((place: PlacesSearchResultItem) => ({
                  id: place.id,
                  name: place.place_name,
                  lat: parseFloat(place.y),
                  lng: parseFloat(place.x),
                  distance: calculateDistance(
                    location.latitude,
                    location.longitude,
                    parseFloat(place.y),
                    parseFloat(place.x),
                  ),
                }))
                .filter(place => place.distance <= 5000);

              allPlaces = [
                ...allPlaces,
                ...results.filter(newPlace => !allPlaces.some(existingPlace => existingPlace.id === newPlace.id)),
              ];

              results.forEach(place => {
                new window.kakao.maps.Marker({
                  position: new window.kakao.maps.LatLng(place.lat, place.lng),
                  map: map as kakao.maps.Map,
                });
              });
            }
            resolve();
          },
          {
            location: new window.kakao.maps.LatLng(location.latitude, location.longitude),
            radius: 5000,
          },
        );
      });

    Promise.all(categories.map(category => searchPlacesByCategory(category))).then(() => {
      const sortedPlaces = allPlaces.sort((a, b) => a.distance - b.distance).slice(0, 5);
      setPlaces(sortedPlaces);
    });
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lng2 - lng1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  return (
    <div>
      <h1>근처 병원, 응급실, 정신건강의학과 의원 (가까운 순서 5개)</h1>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
      <div>
        {places.map(place => (
          <div key={`${place.id}-${place.distance}`}>
            <h2>{place.name}</h2>
            <p>거리: {Math.round(place.distance)}m</p>
          </div>
        ))}
      </div>
    </div>
  );
}
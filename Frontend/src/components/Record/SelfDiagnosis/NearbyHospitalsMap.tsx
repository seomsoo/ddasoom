'use client';
import { motion, PanInfo, useDragControls } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import ErrorModal from '@/components/Common/ErrorModal';

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
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState<string>('');
  const mapRef = useRef<HTMLDivElement>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [receivedLocation, setReceivedLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 35.2052474,
    longitude: 126.8117694,
  });

  const kakaoMapKey = 'db0dd621cffe4388d2816e641f4242d9';

  // 기본 위치 설정
  // const defaultLocation = { latitude: 35.2052474, longitude: 126.8117694 };

  const panelHeight = 300; // 패널의 높이를 설정
  const bottomOffset = -100; // 패널이 화면 하단에서 살짝 보이도록 설정
  const maxDragPosition = -100;
  const dragControls = useDragControls();
  const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.y < maxDragPosition) {
      // 패널이 maxDragPosition보다 더 위로 올라가려 하면 원래 위치로 되돌림
      setIsExpanded(false);
    } else if (info.point.y < window.innerHeight / 2) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };
  const startDrag = (event: React.PointerEvent) => {
    if (!isExpanded) {
      dragControls.start(event); // 드래그 시작 시 이벤트 전달
    }
  };

  // WebView에서 GPS 위치 메시지 수신
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      try {
        const parsedMessage = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        setErrorContext(`parsedMessage:  ${parsedMessage}`);
        if (parsedMessage.title === 'GPS' && parsedMessage.content.latitude && parsedMessage.content.longitude) {
          setReceivedLocation({
            latitude: parsedMessage.content.latitude,
            longitude: parsedMessage.content.longitude,
          });
        } else {
          console.log('필요한 title이 아님 또는 content 없음');
          setErrorContext(
            'parsedMessage.title && parsedMessage.content.latitude && parsedMessage.content.longitude 실패',
          );
          // setReceivedLocation(defaultLocation); // 기본 위치 사용
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
        setErrorContext('아예 앱으로부터 못 받아옴, 기본 위치 사용');
        // setReceivedLocation(defaultLocation); // 파싱 오류 시 기본 위치 사용
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

    // const location = receivedLocation || defaultLocation;
    const location = receivedLocation;

    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
      level: 4,
    });
    // 내 위치 마커 이미지 설정
    const myLocationMarkerImage = new window.kakao.maps.MarkerImage(
      '/svgs/marker.svg', // 내 위치 마커 이미지의 URL
      new window.kakao.maps.Size(64, 64), // 이미지 크기
      { offset: new window.kakao.maps.Point(32, 64) }, // 중심점 설정
    );

    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(location.latitude, location.longitude),
      map: map as kakao.maps.Map,
      image: myLocationMarkerImage, // 커스텀 마커 이미지 사용
    });
    // 다른 위치에 대한 마커 추가

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

  const handleRetry = () => {
    return;
  };
  const handleMapClick = () => {
    setIsExpanded(false);
  };

  return (
    <div>
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}
      <div onClick={handleMapClick} className="relative z-0" ref={mapRef} style={{ width: '100%', height: '100vh' }}>
        <motion.div
          drag="y"
          dragConstraints={{ top: maxDragPosition, bottom: 160 }} // 최대로 올라가는 위치 제한
          dragControls={dragControls} // dragControls 사용
          onPointerDown={startDrag} // 드래그 시작 조건 설정
          onDragEnd={handleDragEnd}
          initial={{ y: bottomOffset }} // 초기 위치 설정
          animate={{ y: isExpanded ? maxDragPosition : bottomOffset }} // 드래그 후 위치 설정
          transition={{ type: 'spring', stiffness: 300 }}
          className={`w-full absolute z-10 bottom-[-100px] h-[350px] bg-white rounded-t-3xl flex flex-col items-center ${
            isExpanded ? 'pointer-events-none' : 'pointer-events-auto'
          }`} // 패널이 열렸을 때 클릭 무시
          style={{ touchAction: 'none', height: panelHeight }}>
          <div className="bg-gray-300 my-2 mb-6 flex flex-col rounded-full w-12 h-2 cursor-pointer" />
          <div className="w-full px-6 gap-2 flex flex-col  overflow-y-scroll" style={{ alignItems: 'flex-start' }}>
            {places.map((place, index) => (
              <div key={`${place.id}-${place.distance}`}>
                <div className={`flex items-start ${index === 0 ? 'ml-1.5 gap-1' : ''}`}>
                  <div>
                    <span
                      style={{
                        textShadow: '1px 1px 3px #225722',
                        bottom: '0px',
                        left: '25px',
                      }}
                      className="text-4xl font-hakgyoansimR text-main2   ">
                      {index + 1}.
                    </span>
                  </div>
                  <div className="flex flex-col  ml-5 ">
                    <h2 className="text-xl font-nanumBold">{place.name}</h2>
                    <p className="text-sub3 font-nanumHeavy">{Math.round(place.distance)}m</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

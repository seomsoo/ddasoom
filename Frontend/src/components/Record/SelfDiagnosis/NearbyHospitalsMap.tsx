'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [places, setPlaces] = useState<Place[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const [receivedLocation, setReceivedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Kakao Maps API 로드
  useKakaoLoader();

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
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') {
        console.error('Received non-string data:', event.data);
        return;
      }

      try {
        const parsedMessage = JSON.parse(event.data);
        if (parsedMessage.title === 'CURRENTLOCATION' && parsedMessage.content) {
          const { latitude, longitude } = parsedMessage.content;
          setReceivedLocation({ latitude, longitude });
          console.log('Received GPS Data - latitude:', latitude, 'longitude:', longitude);
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

import React from 'react';
import { Map, MapMarker, useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

interface MapModalProps {
  center: {
    lat: number;
    lng: number;
  };
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ center, onClose }) => {
  useKakaoLoaderOrigin({
    appkey: `${process.env.NEXT_PUBLIC_KAKAONAP_KEY}` || '',
    libraries: ['clusterer', 'drawing', 'services'],
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="flex flex-col bg-main4 w-80 max-w-lg rounded-lg shadow-lg">
        <div className="flex justify-between p-2">
          <p>공황 발생 장소</p>
          <button onClick={onClose} className=" text-gray5 z-10">
            닫기
          </button>
        </div>

        <Map center={center} style={{ width: '100%', height: '200px' }} level={3}>
          <MapMarker position={center} />
        </Map>
      </div>
    </div>
  );
};

export default MapModal;

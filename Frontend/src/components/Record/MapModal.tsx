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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white w-80 max-w-lg p-4 rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10">
          닫기
        </button>
        <Map center={center} style={{ width: '100%', height: '200px' }} level={3}>
          <MapMarker position={center} />
        </Map>
      </div>
    </div>
  );
};

export default MapModal;

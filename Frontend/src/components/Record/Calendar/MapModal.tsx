import { Map, MapMarker, useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

interface MapModalProps {
  center: {
    lat: number;
    lng: number;
  };
}

const MapModal: React.FC<MapModalProps> = ({ center }) => {
  useKakaoLoaderOrigin({
    appkey: 'db0dd621cffe4388d2816e641f4242d9',
    libraries: ['clusterer', 'drawing', 'services'],
  });

  return (
    <div className="flex flex-col border-8 rounded-xl mb-3 mt-2 ">
      <Map center={center} style={{ width: '100%', height: '200px' }} level={3}>
        <MapMarker position={center} />
      </Map>
    </div>
  );
};

export default MapModal;

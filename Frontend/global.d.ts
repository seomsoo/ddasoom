declare module '*.mp4' {
  const src: string;
  export default src;
}

interface Window {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
  kakao: KakaoNamespace;
}

interface KakaoNamespace {
  maps: {
    Map: new (container: HTMLElement, options: MapOptions) => KakaoMap;
    LatLng: new (lat: number, lng: number) => kakao.maps.LatLng;
    Viewpoint: new (pan: number, tilt: number, zoom: number) => kakao.maps.Viewpoint;
    Marker: new (options: MarkerOptions) => Marker;
    InfoWindow: new (options: InfoWindowOptions) => InfoWindow;
    services: {
      Places: new () => KakaoPlacesService;
      Status: {
        OK: string;
        ZERO_RESULT: string;
      };
    };
    event: {
      addListener: (target: any, type: string, handler: (...args: any[]) => void) => void;
    };
  };
}

interface KakaoMap {
  setCenter: (latlng: kakao.maps.LatLng | kakao.maps.Coords) => void;
  setLevel: (level: number) => void;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface Coords {
  latitude: number;
  longitude: number;
}

interface Viewpoint {
  pan: number;
  tilt: number;
  zoom: number;
}

interface MapOptions {
  center: kakao.maps.LatLng | kakao.maps.Coords;
  level: number;
}

interface Marker {
  setMap: (map: kakao.maps.Map | null) => void;
}

interface MarkerOptions {
  position: kakao.maps.LatLng | kakao.maps.Viewpoint;
  map?: kakao.maps.Map | null;
  content?: string;
}

interface InfoWindow {
  open: (map: kakao.maps.Map, marker: Marker) => void;
  close: () => void;
}

interface InfoWindowOptions {
  content: string;
}

interface KakaoPlacesService {
  keywordSearch: (keyword: string, callback: (result: PlaceSearchResult[], status: string) => void) => void;
}

interface PlaceSearchResult {
  id: string;
  place_name: string;
  y: string;
  x: string;
  distance: string;
}

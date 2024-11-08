import { useState } from "react";

const useGeocoding = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 좌표 -> 주소 (역지오코딩)
  const reverseGeocode = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_MAP_API_KEY}&language=ko`,
      );
      const data = await response.json();
      setAddress(data.results[0].formatted_address);
      if (data.results.length > 0) {
      } else {
        setError("주소를 찾지 못했습니다.");
      }
    } catch (err) {
      console.log("지오 코딩 에러");
      setError("Failed to fetch address");
    } finally {
      setLoading(false);
    }
  };

  return { reverseGeocode, address, loading, error };
};

export default useGeocoding;

import { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Network from "expo-network";

type LocationType = {
  latitude: number;
  longitude: number;
};

const useLocation = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("위치 관련 권한이 거부되었습니다.");
        return;
      }

      const networkState = await Network.getNetworkStateAsync();

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: networkState.isConnected ? Location.Accuracy.Balanced : Location.Accuracy.High, // GPS만 사용
        });
        const { latitude, longitude } = location.coords;
        setLocation({ latitude, longitude } as LocationType);
      } catch (error) {
        setErrorMsg("위치를 가져오는 중 오류가 발생했습니다.");
        console.log(error);
      }
    };

    getLocation();
  }, []);

  return { location, errorMsg };
};

export default useLocation;

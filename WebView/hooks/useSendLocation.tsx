import { useEffect } from "react";
import { WebView } from "react-native-webview";
import useLocation from "@/hooks/useLocation";
import WebViewType from "react-native-webview";

const useSendLocation = (webViewRef: React.RefObject<WebViewType>) => {
  const { location } = useLocation();

  const sendLocationToWebView = () => {
    if (!location) return;

    const data = JSON.stringify({
      title: "CURRENTLOCATION",
      longitude: location.longitude,
      latitude: location.latitude,
    });
    webViewRef.current?.injectJavaScript(`window.postMessage(${data});`);
    console.log("위치 정보가 웹으로 전송되었습니다.");
  };

  return sendLocationToWebView;
};

export default useSendLocation;

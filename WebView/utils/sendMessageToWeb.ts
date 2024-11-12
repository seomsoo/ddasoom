import { RefObject } from "react";
import WebViewType from "react-native-webview";

interface SendMessageToWebProps extends WebMessageDto {
  webViewRef: RefObject<WebViewType>;
}

export const sendMessageToWeb = ({ webViewRef, title, content }: SendMessageToWebProps) => {
  const data = JSON.stringify({ title, content });
  webViewRef.current?.injectJavaScript(`
      window.postMessage(${data});
    `);
  console.log(`앱->웹  [title:${title}, content:${content}] 전송 완료`);
};

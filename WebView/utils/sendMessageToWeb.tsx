import { RefObject } from "react";
import WebViewType from "react-native-webview";
import { WebMessageDto } from "@/types/ddasoom";

interface useSendMessageToWebProps extends WebMessageDto {
  webViewRef: RefObject<WebViewType>;
}

export const sendMessageToWeb = ({ webViewRef, title, content }: useSendMessageToWebProps) => {
  const data = JSON.stringify({ title, content });
  webViewRef.current?.injectJavaScript(`
      window.postMessage(${data});
    `);
  console.log(`앱->웹  [title:${title}, content:${content}] 전송 완료`);
};

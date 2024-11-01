declare module '*.mp4' {
  const src: string;
  export default src;
}

interface Window {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
}

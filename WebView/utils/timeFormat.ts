export const timeFormat = (second: number) => {
  const minutes = Math.floor(second / 60);
  const seconds = second % 60;
  return minutes ? `${minutes}분 ${seconds}초` : `${seconds}초`;
};

export const convertToKST = (utcTime: string) => {
  if (!utcTime) return "";
  const date = new Date(utcTime);
  date.setHours(date.getHours() + 9); // 9시간 더하기
  return date.toISOString();
};

// 현지 시간에 맞춘 ISO 문자열 포맷 생성
export const getLocalISOString = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const localTime = new Date(now.getTime() - offsetMs);
  return localTime.toISOString();
};

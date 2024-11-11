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

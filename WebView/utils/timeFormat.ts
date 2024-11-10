export const timeFormat = (second: number) => {
  const minutes = Math.floor(second / 60);
  const seconds = second % 60;
  return minutes ? `${minutes}분 ${seconds}초` : `${seconds}초`;
};

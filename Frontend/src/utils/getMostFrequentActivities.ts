export interface DailyReport {
  caffeine: number;
  smoking: number;
  alcohol: number;
  exercise: number;
}

export const getMostFrequentActivities = (dailyReport: DailyReport) => {
  const maxCount = Math.max(...Object.values(dailyReport));
  return Object.entries(dailyReport)
    .filter(([, count]) => count === maxCount)
    .map(([activity]) => activity);
};

const breathData: Record<"shortTime" | "basicTime" | "longTime", BreathData> = {
  shortTime: {
    type: "shortTime",
    stages: [
      { fileId: 1, duration: 4000, description: "들이마시기" },
      { fileId: 2, duration: 4000, description: "참기" },
      { fileId: 3, duration: 4000, description: "내쉬기" },
      { fileId: 2, duration: 4000, description: "참기" },
    ],
  },
  basicTime: {
    type: "basicTime",
    stages: [
      { fileId: 1, duration: 4000, description: "들이마시기" },
      { fileId: 2, duration: 7000, description: "참기" },
      { fileId: 3, duration: 8000, description: "내쉬기" },
    ],
  },
  longTime: {
    type: "longTime",
    stages: [
      { fileId: 1, duration: 5000, description: "들이마시기" },
      { fileId: 3, duration: 7000, description: "내쉬기" },
      { fileId: 2, duration: 3000, description: "참기" },
    ],
  },
};

export default breathData;

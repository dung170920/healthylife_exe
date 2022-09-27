const difficulty = { 1: "Dễ", 2: "Trung Bình", 3: "Khó" };

export const convertDifficultyToString = (
  difficultyValue: number | undefined
) => {
  switch (difficultyValue) {
    case 1:
      return "Dễ";
    case 2:
      return "Trung Bình";
    case 3:
      return "Khó";
  }
};

export const parseJsonStringToArray = (
  jsonString: string | undefined,
  type: number
) => {
  if (jsonString)
    switch (type) {
      case 1:
        return JSON.parse(jsonString?.replace("\\", "")).filter(
          (item: any) =>
            item.name === "Calories" ||
            item.name === "Protein" ||
            item.name === "protein" ||
            item.name === "fat" ||
            item.name === "Fat" ||
            item.name === "carbs" ||
            item.name === "Carbohydrates"
        );

      case 2:
        return JSON.parse(jsonString?.replace("\\", "")).map(
          (item: any) => item
        );
    }

  return;
};

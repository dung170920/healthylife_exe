export const parseJsonStringToArray = (jsonString: string | undefined) => {
  if (jsonString)
    return JSON.parse(jsonString?.replace("\\", "")).filter(
      (item: any) =>
        item.name === "Calories" ||
        item.name === "Protein" ||
        item.name === "Fat" ||
        item.name === "Carbohydrates"
    );
  return;
};

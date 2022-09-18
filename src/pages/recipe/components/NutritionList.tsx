import { NutritionModel } from "models/NutritionModel";
import NutritionItem from "pages/recipe/components/NutritionItem";
import { Stack } from "@mui/material";
import React from "react";

const NutritionList: React.FC<{ nutritionList: NutritionModel[] }> = ({
  nutritionList,
}) => {
  return (
    <Stack direction="row" gap={4} sx={{ marginTop: "10px" }}>
      {nutritionList.map((item, i) => (
        <NutritionItem key={i} nutrition={item} />
      ))}
    </Stack>
  );
};

export default React.memo(NutritionList);

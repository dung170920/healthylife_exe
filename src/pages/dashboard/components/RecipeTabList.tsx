import { RecipeTab } from "pages/index";
import { RecipePreview } from "models/index";
import { Stack } from "@mui/material";

import React from "react";

const RecipeTabList: React.FC<{ recipes: RecipePreview[] }> = ({ recipes }) => {
  console.log("list");
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      spacing={5}
      sx={{ width: "100%", padding: "0 15px" }}
    >
      {recipes.map((recipe) => (
        <RecipeTab recipe={recipe} />
      ))}
    </Stack>
  );
};

export default RecipeTabList;

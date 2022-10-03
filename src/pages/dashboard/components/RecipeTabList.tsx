import RecipeTab from "./RecipeTab";
import { RecipeModel } from "models";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getRecipeList } from "api";
import moment from "moment";

const RecipeTabList = () => {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    getRecipeList({
      FilterMode: 1,
    }).then((res: RecipeModel[]) => {
      setRecipes(res);
    });
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      spacing={5}
      sx={{ width: "100%", padding: "0 15px" }}
    >
      {recipes?.map((recipe, index) => (
        <RecipeTab recipe={recipe} key={recipe.id} index={index} />
      ))}
    </Stack>
  );
};

export default RecipeTabList;

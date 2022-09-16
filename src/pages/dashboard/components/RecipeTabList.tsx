import RecipeTab from "./RecipeTab";
import { RecipePreviewModel } from "models";
import { Stack } from "@mui/material";

const RecipeTabList = () => {
  const dummyRecipeData: RecipePreviewModel[] = [
    {
      id: 1,
      image:
        "https://cdn.tgdd.vn/2021/07/CookRecipe/Avatar/trung-cuon-ngu-sac-chien-thumbnail-1.jpg",
      name: "Trứng cuộn ngũ sắc",
      level: "Easy",
      time: 30,
      kcal: 587,
    },
    {
      id: 2,
      image:
        "https://cdn.tgdd.vn/2021/07/CookRecipe/Avatar/trung-cuon-ngu-sac-chien-thumbnail-1.jpg",
      name: "Trứng cuộn ngũ sắc",
      level: "Easy",
      time: 30,
      kcal: 587,
    },
    {
      id: 3,
      image:
        "https://cdn.tgdd.vn/2021/07/CookRecipe/Avatar/trung-cuon-ngu-sac-chien-thumbnail-1.jpg",
      name: "Trứng cuộn ngũ sắc",
      level: "Easy",
      time: 30,
      kcal: 587,
    },
    {
      id: 4,
      image:
        "https://cdn.tgdd.vn/2021/07/CookRecipe/Avatar/trung-cuon-ngu-sac-chien-thumbnail-1.jpg",
      name: "Trứng cuộn ngũ sắc",
      level: "Easy",
      time: 30,
      kcal: 587,
    },
  ];

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      spacing={5}
      sx={{ width: "100%", padding: "0 15px" }}
    >
      {dummyRecipeData.map((recipe) => (
        <RecipeTab recipe={recipe} key={recipe.id} />
      ))}
    </Stack>
  );
};

export default RecipeTabList;

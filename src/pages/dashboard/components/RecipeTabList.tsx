import RecipeTab from "./RecipeTab";
import { RecipePreviewModel } from "models";
import { Stack } from "@mui/material";

const RecipeTabList = () => {
  const dummyRecipeData: RecipePreviewModel[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Trứng cuộn ngũ sắc",
      level: "Easy",
      time: 30,
      kcal: 587,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Trứng cuộn ngũ sắc",
      level: "Easy",
      time: 30,
      kcal: 587,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Trứng cuộn ngũ sắc",
      level: "Easy",
      time: 30,
      kcal: 587,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
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
      {dummyRecipeData.map((recipe, index) => (
        <RecipeTab recipe={recipe} key={recipe.id} index={index} />
      ))}
    </Stack>
  );
};

export default RecipeTabList;

import DateBar from "./DateBar";
import DateRecipeBarList from "./DateRecipeBarList";
import { Stack } from "@mui/material";
import { RecipePreviewModel } from "models/index";

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

const MemberAccountInfo = () => {
  return (
    <Stack sx={{ backgroundColor: "white", p: 3, borderRadius: "25px" }}>
      <DateBar />
      <DateRecipeBarList recipes={dummyRecipeData} />
    </Stack>
  );
};

export default MemberAccountInfo;

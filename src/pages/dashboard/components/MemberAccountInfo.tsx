import DateBar from "./DateBar";
import DateRecipeBarList from "./DateRecipeBarList";
import { Stack } from "@mui/material";
import { RecipePreviewModel } from "models/index";

const dummyRecipeData: RecipePreviewModel[] = [
  {
    Id: 1,
    PictureUrl:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 2,
    PictureUrl:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 3,
    PictureUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 4,
    PictureUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
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

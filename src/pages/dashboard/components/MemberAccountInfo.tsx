import DateBar from "./DateBar";
import DateRecipeBarList from "./DateRecipeBarList";
import { Stack } from "@mui/material";
import { RecipeModel } from "models";
import { useEffect, useState } from "react";
import { getMenuByDate } from "api/MenuApi";

const dummyRecipeData: RecipeModel[] = [
  // {
  //   id: "1",
  //   pictureUrl:
  //     "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  //   name: "Trứng cuộn ngũ sắc",
  //   difficulty: 1,
  //   timeCost: 30,
  //   calorie: 587,
  // },
  // {
  //   id: "2",
  //   pictureUrl:
  //     "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  //   name: "Trứng cuộn ngũ sắc",
  //   difficulty: 1,
  //   timeCost: 30,
  //   calorie: 587,
  // },
  // {
  //   id: "3",
  //   pictureUrl:
  //     "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  //   name: "Trứng cuộn ngũ sắc",
  //   difficulty: 1,
  //   timeCost: 30,
  //   calorie: 587,
  // },
  // {
  //   id: "4",
  //   pictureUrl:
  //     "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  //   name: "Trứng cuộn ngũ sắc",
  //   difficulty: 1,
  //   timeCost: 30,
  //   calorie: 587,
  // },
];

const MemberAccountInfo = () => {
  const [foods, setFoods] = useState<RecipeModel[]>([]);

  const getFoodMenu = (foods: any) => {
    setFoods(foods);
  };

  return (
    <Stack sx={{ backgroundColor: "white", p: 3, borderRadius: "25px" }}>
      <DateBar onGetMenuByDate={getFoodMenu} />
      <DateRecipeBarList recipes={foods} />
    </Stack>
  );
};

export default MemberAccountInfo;
